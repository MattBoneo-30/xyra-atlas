import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import path from 'node:path';
const source=fs.readFileSync('sw.js','utf8');
const shellSource=source.match(/const APP_SHELL = \[([\s\S]*?)\];/)?.[1];
const assets=[...(shellSource||'').matchAll(/'([^']+)'/g)].map(x=>x[1]);
test('service-worker precache list has no duplicate URLs (required by cache.addAll)',()=>{
 assert.ok(shellSource,'precache declaration is present');
 assert.ok(assets.length>=40,'offline shell has expected modules and illustrations');
 const seen=new Set();
 for(const asset of assets){assert.ok(!seen.has(asset),'duplicate precache entry: '+asset);seen.add(asset);}
});
test('service-worker precaches only available source files or known build-generated images',()=>{
 const generated=new Set(['/icon-192.png','/icon-512.png','/apple-touch-icon.png']);
 for(const asset of assets){
  assert.ok(asset.startsWith('/'),'relative origin pathname: '+asset);
  if(asset==='/')continue;
  assert.ok(generated.has(asset)||fs.existsSync(path.join(process.cwd(),asset.slice(1))),'missing precache file: '+asset);
 }
});
test('offline navigation fallback uses the cached HTML and preserves foreign caches',()=>{
 assert.match(source,/caches\.match\('\/index\.html'\)/);
 assert.match(source,/key\.startsWith\(CACHE_PREFIX\)/);
 assert.match(source,/cache\.addAll\(APP_SHELL\)/);
});
