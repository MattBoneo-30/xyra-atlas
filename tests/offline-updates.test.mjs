import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const script=fs.readFileSync('sw.js','utf8');
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
 const pre=await f.caches.open('xyra-atlas-v44');
 pre.entries.set('/styles.css',f.result('old-css'));
 await f.caches.open('unrelated-site-cache');
 await f.event('install');
 assert.equal(f.counts().skipped,0,'installation must not force a worker swap');
 const current=await f.caches.open('xyra-atlas-v45');
 assert.ok(current.entries.size>50,'complete shell must be downloaded before activation');
 await f.event('activate');
 assert.equal(f.counts().claimed,1);
 assert.deepEqual(await f.caches.keys(),['unrelated-site-cache','xyra-atlas-v45']);
 assert.equal(f.counts().skipped,0,'activation alone does not request skipWaiting');
 await f.event('message',{data:{type:'ATLAS_ACTIVATE_UPDATE'}});
 assert.equal(f.counts().skipped,1,'only explicit update request calls skipWaiting');
});
test('offline fetches use the active release cache and exclude unrelated requests',async()=>{
 const f=fixture(),current=await f.caches.open('xyra-atlas-v45');
 current.entries.set('/index.html',f.result('current-html'));
 current.entries.set('/styles.css',f.result('current-css'));
 await f.caches.open('xyra-atlas-v44').then(c=>c.entries.set('/styles.css',f.result('stale-css')));
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
 const c=await f.caches.open('xyra-atlas-v45');
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
 const restored=await message('ATLAS_REPAIR_OFFLINE');
 assert.equal(restored.cached,restored.total);
 assert.equal(restored.ready,true);
 assert.equal(restored.version,'xyra-atlas-v45');
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
