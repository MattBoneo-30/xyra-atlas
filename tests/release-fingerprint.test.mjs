import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {staticContentFingerprint,stampServiceWorker} from '../scripts/release-fingerprint.mjs';
import {normalizeOfflineReport} from '../offline.js';

function tempSite(){
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'xyra-atlas-offline-fingerprint-'));
 const worker="const CACHE_PREFIX = 'xyra-atlas-';\nconst CACHE = CACHE_PREFIX + 'v73';\n";
 for(const [filename,contents] of Object.entries({
  'index.html':'<main>Welcome</main>','app.js':'console.log("revision one")',
  'styles.css':'.app{color:gold}', 'sw.js':worker,
  'assets/world.svg':'<svg xmlns="http://www.w3.org/2000/svg"></svg>'
 })){
  const dest=path.join(root,filename);fs.mkdirSync(path.dirname(dest),{recursive:true});
  fs.writeFileSync(dest,contents);
 }
 return {root,worker};
}
test('deployable worker always fingerprints all resources and is stable on identical builds',()=>{
 const {root,worker}=tempSite();
 try{
  const initial=staticContentFingerprint(root);
  assert.equal(initial.fileCount,4);
  assert.match(initial.sha256,/^[0-9a-f]{64}$/);
  const first=stampServiceWorker(root);
  assert.equal(first.fileCount,4);
  assert.equal(first.sha256,initial.sha256);
  assert.match(first.version,/^v73-[0-9a-f]{12}$/);
  const dist=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  assert.match(dist,/CACHE_PREFIX \+ 'v73-[a-f0-9]{12}'/);
  assert.equal(normalizeOfflineReport({cached:3,total:3,ready:true,
   version:'xyra-atlas-'+first.version}).version,'xyra-atlas-'+first.version);
  // Restamping a fresh copy of the same source yields identical bytes.
  fs.writeFileSync(path.join(root,'sw.js'),worker);
  assert.deepEqual(stampServiceWorker(root),first);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('changing lessons, CSS or generated images invalidates the old offline release',()=>{
 const {root,worker}=tempSite();
 try{
  const previous=stampServiceWorker(root).version;
  fs.writeFileSync(path.join(root,'app.js'),'console.log("revision two")');
  fs.writeFileSync(path.join(root,'sw.js'),worker);
  const afterApp=stampServiceWorker(root).version;
  assert.notEqual(afterApp,previous);
  fs.writeFileSync(path.join(root,'assets/world.svg'),'<svg><path d="M0 0h1"/></svg>');
  fs.writeFileSync(path.join(root,'sw.js'),worker);
  const afterArt=stampServiceWorker(root).version;
  assert.notEqual(afterArt,afterApp);
  fs.writeFileSync(path.join(root,'styles.css'),'.app{color:violet}');
  fs.writeFileSync(path.join(root,'sw.js'),worker);
  assert.notEqual(stampServiceWorker(root).version,afterArt);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('unsafe input or missing vital files cannot yield a release signature',()=>{
 const {root,worker}=tempSite();
 try{
  fs.writeFileSync(path.join(root,'sw.js'),worker.replace("'v73'","'v73-"+'a'.repeat(12)+"'"));
  assert.throws(()=>stampServiceWorker(root),/base version/);
  fs.rmSync(path.join(root,'app.js'));
  assert.throws(()=>staticContentFingerprint(root),/Incomplete release/);
  fs.writeFileSync(path.join(root,'app.js'),'ok');
  fs.symlinkSync('app.js',path.join(root,'linked.js'));
  assert.throws(()=>staticContentFingerprint(root),/Unexpected non-file/);
 }finally{fs.rmSync(root,{recursive:true,force:true});}
});
test('code and build wire fingerprint changes into every deploy without touching source worker',()=>{
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const rootWorker=fs.readFileSync('sw.js','utf8');
 const normalized=fs.readFileSync('offline.js','utf8');
 assert.match(build,/stampServiceWorker\(out\)/);
 assert.match(build,/release-fingerprint\.mjs/);
 assert.match(rootWorker,/const CACHE = CACHE_PREFIX \+ 'v\d+'/);
 assert.match(normalized,/\\d\+\(\?:-\[a-f0-9\]\{12\}\)\?/);
 assert.match(fs.readFileSync('docs/RELEASE_HANDOFF.md','utf8'),/content-fingerprinted/);
});
