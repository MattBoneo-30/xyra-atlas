import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const config=JSON.parse(fs.readFileSync('vercel.json','utf8'));
const site=Object.fromEntries(config.headers.find(item=>item.source==='/(.*)').headers.map(({key,value})=>[key.toLowerCase(),value]));
const worker=Object.fromEntries(config.headers.find(item=>item.source==='/sw.js').headers.map(({key,value})=>[key.toLowerCase(),value]));

test('release sends a restrictive CSP without inline scripts, remote scripts or unsafe object embedding',()=>{
 const csp=site['content-security-policy'];
 assert.ok(csp);
 assert.match(csp,/default-src 'self'/);
 assert.match(csp,/script-src 'self'(?:;|$)/);
 assert.match(csp,/connect-src 'self'(?:;|$)/);
 assert.match(csp,/worker-src 'self'(?:;|$)/);
 assert.match(csp,/frame-ancestors 'none'/);
 assert.match(csp,/object-src 'none'/);
 assert.match(csp,/base-uri 'none'/);
 assert.doesNotMatch(csp,/unsafe-eval|script-src[^;]*unsafe-inline|https?:\/\//);
 assert.equal(site['x-frame-options'],'DENY');
 assert.equal(site['x-content-type-options'],'nosniff');
 assert.equal(site['cross-origin-opener-policy'],'same-origin');
 assert.equal(worker['cache-control'],'public, max-age=0, must-revalidate');
});
test('local preview reuses deployed response headers and never gives index.html for missing assets',()=>{
 const serve=fs.readFileSync('scripts/serve.mjs','utf8');
 assert.match(serve,/readFileSync\(path\.join\(root,'vercel\.json'\)/);
 assert.match(serve,/siteHeaders/);
 assert.match(serve,/path\.extname\(pathname\)/);
 assert.match(serve,/res\.writeHead\(404\)/);
});
test('no production dependency or unsafe dynamic code evaluation is required',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 assert.equal(pkg.dependencies,undefined);
 for(const path of ['app.js','data.js','backup.js','sw.js']){
  const source=fs.readFileSync(path,'utf8');
  assert.doesNotMatch(source,/\bnew Function\s*\(|\beval\s*\(/);
 }
});
