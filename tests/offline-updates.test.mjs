import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const script=fs.readFileSync('sw.js','utf8');
const version=Number(script.match(/CACHE_PREFIX \+ 'v(\d+)'/)?.[1]);
assert.ok(Number.isInteger(version)&&version>1,'worker has a release cache version');
const CURRENT='xyra-atlas-v'+version,PREVIOUS='xyra-atlas-v'+(version-1);
function fixture(){
 const listeners=new Map(),stores=new Map();
 let skipped=0,claimed=0,networkDown=false,networkCalls=0;
 const result=(marker)=>({ok:true,marker,clone(){return result(marker);}});
 const makeCache=()=>({
  entries:new Map(),
  async match(key){return this.entries.get(String(key));},
  async add(key){this.entries.set(key,result('download:'+key));},
  async addAll(keys){for(const key of keys)await this.add(key);},
  async put(key,value){this.entries.set(key,value);}
 });
 const caches={
  async open(name){if(!stores.has(name))stores.set(name,makeCache());return stores.get(name);},
  async keys(){return [...stores.keys()];},
  async delete(name){return stores.delete(name);}
 };
 const self={location:{origin:'https://atlas.test'},clients:{claim:async()=>{claimed++;}},
  skipWaiting:async()=>{skipped++;},addEventListener:(type,listener)=>listeners.set(type,listener)};
 const fetch=async req=>{
  networkCalls++;
  if(networkDown)throw Error('offline');
  return result('network:'+req.url);
 };
 vm.runInNewContext(script,{self,caches,fetch,URL,Promise,Response:{error:()=>({ok:false,marker:'network-error'})}});
 const event=async(type,properties={})=>{
  const tasks=[];
  const e={...properties,waitUntil:p=>tasks.push(Promise.resolve(p)),respondWith:p=>{e.response=Promise.resolve(p);}};
  listeners.get(type)(e);
  await Promise.all(tasks);
  return e;
 };
 return {listeners,stores,caches,result,event,
  setOffline:v=>{networkDown=v;},counts:()=>({skipped,claimed,networkCalls})};
}
test('update lifecycle stages complete assets and requires an explicit activation message',async()=>{
 const f=fixture();
 const pre=await f.caches.open(PREVIOUS);
 pre.entries.set('/styles.css',f.result('old-css'));
 await f.caches.open('unrelated-site-cache');
 await f.event('install');
 assert.equal(f.counts().skipped,0,'installation must not force a worker swap');
 const current=await f.caches.open(CURRENT);
 assert.ok(current.entries.size>50,'complete shell must be downloaded before activation');
 await f.event('activate');
 assert.equal(f.counts().claimed,1);
 assert.deepEqual(await f.caches.keys(),['unrelated-site-cache',CURRENT]);
 assert.equal(f.counts().skipped,0,'activation alone does not request skipWaiting');
 await f.event('message',{data:{type:'ATLAS_ACTIVATE_UPDATE'}});
 assert.equal(f.counts().skipped,1,'only explicit update request calls skipWaiting');
});
test('offline fetches use the active release cache and exclude unrelated requests',async()=>{
 const f=fixture(),current=await f.caches.open(CURRENT);
 current.entries.set('/index.html',f.result('current-html'));
 current.entries.set('/styles.css',f.result('current-css'));
 await f.caches.open(PREVIOUS).then(c=>c.entries.set('/styles.css',f.result('stale-css')));
 const style=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/styles.css',mode:'cors'}});
 assert.equal((await style.response).marker,'current-css','old cache must never serve a new release asset');
 assert.equal(f.counts().networkCalls,0,'a cached static module needs no network');
 const privateRequest=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/api/private-notes',mode:'cors'}});
 assert.equal(privateRequest.response,undefined,'unknown same-origin paths must bypass caching');
 const external=await f.event('fetch',{request:{method:'GET',url:'https://other.test/styles.css',mode:'cors'}});
 assert.equal(external.response,undefined,'foreign domains remain unhandled');
 f.setOffline(true);
 const deepLink=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/some/deep/route',mode:'navigate'}});
 assert.equal((await deepLink.response).marker,'current-html','navigation fallback uses current HTML');
 current.entries.delete('/index.html');
 const missing=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/some/deep/route',mode:'navigate'}});
 assert.equal((await missing.response).ok,false,'missing HTML returns a network error rather than stale release markup');
});
test('offline repair works with broken or incomplete caches while preserving unrelated stores',async()=>{
 const f=fixture();
 const c=await f.caches.open(CURRENT);
 c.entries.set('/index.html',f.result('html'));
 let reply,pending;
 async function message(type){
  reply=undefined;pending=undefined;
  await f.event('message',{data:{type},ports:[{postMessage:value=>{reply=value;}}]});
  return reply;
 }
 const first=await message('ATLAS_OFFLINE_STATUS');
 assert.equal(first.ready,false);
 assert.equal(first.cached,1);
 assert.equal(first.missing.length,first.total-1);
 assert.ok(first.missing.includes('/app.js'));
 const restored=await message('ATLAS_REPAIR_OFFLINE');
 assert.equal(restored.cached,restored.total);
 assert.equal(restored.ready,true);
 assert.deepEqual(Array.from(restored.missing),[]);
 assert.equal(restored.version,CURRENT);
});
test('app offers explicit update consent and controller-based reload, not automatic install reload',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/watchOfflineRegistration\(reg\)/);
 assert.match(app,/offlineUpdateWaiting/);
 assert.match(app,/offline-apply-update/);
 assert.match(app,/ATLAS_ACTIVATE_UPDATE/);
 assert.match(app,/controllerchange/);
 assert.match(app,/if\(offlineUpdateApplying\)\{location\.reload\(\)/);
 assert.doesNotMatch(script,/cache\.addAll\(APP_SHELL\)\)\.then\(\(\)\s*=>\s*self\.skipWaiting/);
 assert.match(script,/SHELL_PATHS\.has\(url\.pathname\)/);
});

test('broken asset cache reads recover through the live network and repair',async()=>{
 const f=fixture(),cache=await f.caches.open(CURRENT);
 cache.entries.set('/styles.css',f.result('previous-stylesheet'));
 const actualMatch=cache.match.bind(cache);
 let readsFailed=true;
 cache.match=async path=>{
  if(path==='/styles.css'&&readsFailed)throw new Error('transient CacheStorage read failure');
  return actualMatch(path);
 };
 const online=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/styles.css',mode:'cors'}});
 assert.equal((await online.response).marker,'network:https://atlas.test/styles.css',
  'a broken cache read should use a healthy same-origin network response');
 assert.equal(f.counts().networkCalls,1);
 readsFailed=false;
 const cached=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/styles.css',mode:'cors'}});
 assert.equal((await cached.response).marker,'network:https://atlas.test/styles.css',
  'successful network fallback repairs the current cache');
 assert.equal(f.counts().networkCalls,1,'a subsequent load avoids network access');
});
test('broken offline cache reads and cache-store failures return safe network errors',async()=>{
 const f=fixture(),cache=await f.caches.open(CURRENT);
 cache.match=async()=>{throw new Error('unreadable cached data')};
 f.setOffline(true);
 const asset=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/app.js',mode:'cors'}});
 assert.equal((await asset.response).ok,false,'offline failures resolve to explicit error responses');
 const navigation=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/offline/route',mode:'navigate'}});
 assert.equal((await navigation.response).ok,false,'broken offline navigation avoids unhandled rejection');
 let message;
 await f.event('message',{data:{type:'ATLAS_OFFLINE_STATUS'},ports:[{postMessage:value=>{message=value;}}]});
 assert.equal(message.ready,false,'unreadable required files never count as complete cache');
 assert.equal(message.cached,0);
});
test('unavailable CacheStorage still allows same-origin online assets to load',async()=>{
 const f=fixture();
 f.caches.open=async()=>{throw new Error('quota or storage system outage')};
 const css=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/styles.css',mode:'cors'}});
 assert.equal((await css.response).marker,'network:https://atlas.test/styles.css');
 const navigation=await f.event('fetch',{request:{method:'GET',url:'https://atlas.test/',mode:'navigate'}});
 assert.equal((await navigation.response).marker,'network:https://atlas.test/');
});
