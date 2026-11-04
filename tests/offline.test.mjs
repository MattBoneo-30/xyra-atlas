import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import vm from 'node:vm';
import {normalizeOfflineReport,offlineAdvice} from '../offline.js';
test('offline readiness requires a complete and verified cache',()=>{
 assert.deepEqual(normalizeOfflineReport({total:50,cached:50,ready:true,version:'xyra-atlas-v27'}),{total:50,cached:50,ready:true,percent:100,version:'xyra-atlas-v27'});
 assert.equal(normalizeOfflineReport({total:50,cached:49,ready:true}).ready,false);
 assert.equal(normalizeOfflineReport({total:0,cached:0,ready:true}).ready,false);
 assert.equal(normalizeOfflineReport({total:10,cached:20,ready:false}).cached,10);
 assert.equal(normalizeOfflineReport({total:'20',cached:-1,ready:true}).ready,false);
});
test('readiness messages distinguish success from missing or unsupported offline data',()=>{
 assert.match(offlineAdvice('ready'),/cached for offline/);
 assert.match(offlineAdvice('incomplete'),/missing/);
 assert.match(offlineAdvice('unsupported'),/does not support/);
});
test('worker inspection sees missing files and repair fills them',async()=>{
 const code=fs.readFileSync('sw.js','utf8');const listeners={};const existing=new Set(['/index.html','/app.js']);
 const cache={match:async p=>existing.has(p)?{ok:true}:undefined,add:async p=>{existing.add(p);},addAll:async paths=>paths.forEach(p=>existing.add(p))};
 const caches={open:async()=>cache,keys:async()=>[],delete:async()=>true};
 const self={location:{origin:'https://example.test'},clients:{claim:async()=>true},skipWaiting:async()=>{},addEventListener:(n,fn)=>{listeners[n]=fn;}};
 vm.runInNewContext(code,{self,caches,Promise,URL,fetch:async()=>({ok:true})});
 async function request(type){let reply,pending;listeners.message({data:{type},ports:[{postMessage:v=>{reply=v;}}],waitUntil:p=>{pending=p;}});await pending;return reply;}
 const first=await request('ATLAS_OFFLINE_STATUS');assert.equal(first.ready,false);assert.ok(first.total>40);
 const after=await request('ATLAS_REPAIR_OFFLINE');assert.equal(after.cached,after.total);assert.equal(after.ready,true);
});
test('offline management is bundled and connected to user settings',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),b=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/function offlinePage\(/);assert.match(app,/offline:offlinePage/);
 assert.match(app,/offline-verify/);assert.match(app,/offline-repair/);assert.match(app,/offline-update/);
 assert.match(sw,/\/offline\.js/);assert.match(b,/'offline\.js'/);
});

test('offline diagnostics list only safe static paths and refuse false readiness',()=>{
 const good=normalizeOfflineReport({total:5,cached:3,ready:false,version:'xyra-atlas-v70',
  missing:['/assets/course-library.svg','/data.js','/data.js','https://bad.site/collect','/api/private','/../secret']});
 assert.deepEqual(good.missing,['/assets/course-library.svg','/data.js']);
 assert.equal(good.ready,false);
 assert.equal(normalizeOfflineReport({total:5,cached:5,ready:true,missing:['/app.js']}).ready,false);
 assert.deepEqual(normalizeOfflineReport({total:5,cached:5,ready:true,missing:[]}).missing,[]);
});
test('missing-file inventory is visible in the offline UI without exposing learner state',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 assert.match(app,/offline-missing/);
 assert.match(app,/missing required file/);
 assert.match(app,/repair\?60000:8000/);
 assert.match(sw,/const missing=results\.filter/);
 assert.match(sw,/ready:missing\.length===0/);
});

test('offline status and fetch handlers tolerate a transient CacheStorage exception',()=>{
 const source=fs.readFileSync('sw.js','utf8');
 assert.match(source,/async function readCached\(cache,path\)/);
 assert.match(source,/async function openCurrentCache\(\)/);
 assert.match(source,/const current=await openCurrentCache\(\)/);
 assert.match(source,/return Response\.error\(\)/);
});
