import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const names=['atlas-archive-gate','atlas-lantern-library','atlas-starlit-garden'];
const labels=['Archive Gate','Lantern Library','Starlit Garden Path'];
test('all three original cinematic world assets are lightweight, safe and accessible',()=>{
 const sw=fs.readFileSync('sw.js','utf8');
 const xmlTexts=[];
 for(let i=0;i<names.length;i++){
  const filename=names[i]+'.svg',asset=path.join(root,'assets',filename);
  assert.ok(fs.existsSync(asset),'expected original scene '+filename);
  const s=fs.readFileSync(asset,'utf8');
  assert.match(s,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="1400" height="700" viewBox="0 0 1400 700" role="img" aria-label="[^"]+">/);
  assert.ok(s.includes(labels[i]),'scene describes distinct subject '+names[i]);
  assert.match(s,/<\/svg>$/);
  assert.ok((s.match(/<linearGradient\b/g)||[]).length>=2,'multi-layered local gradients');
  assert.ok((s.match(/<path\b/g)||[]).length>=10,'illustrated scenery has actual drawn detail');
  assert.doesNotMatch(s,/<script|<foreignObject|<image\b|<iframe|onload\s*=|javascript:/i,'SVG must not embed scripts or external images');
  assert.doesNotMatch(s,/(?:href|src)="https?:/i,'no external asset dependencies');
  assert.ok(Buffer.byteLength(s,'utf8')<32_000,'scene remains small enough for bundled offline use: '+filename);
  assert.ok(sw.includes('/assets/'+filename),'service worker precaches '+filename);
  xmlTexts.push(s);
 }
 assert.equal(new Set(xmlTexts).size,names.length,'each illustration must be distinct');
});
test('cinematic scenes are integrated with working navigational actions and accessible markup',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const css=fs.readFileSync('styles.css','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/class="hero-landscape hero-archive"/);
 assert.match(app,/fetchpriority="high"/);
 assert.match(app,/Enter the Atlas','goto-explore'/);
 assert.match(app,/Visit Xyra’s Corner','open-corner'/);
 assert.match(app,/See the knowledge map','map'/);
 assert.match(app,/class="atlas-scene-grid"/);
 for(const name of names){
  assert.ok(app.includes('/assets/'+name+'.svg'),'original art is loaded by app: '+name);
 }
 assert.match(css,/\.hero-archive \.landscape-shade/);
 assert.match(css,/\.atlas-scene-grid/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(build,/fs\.cpSync\(path\.join\(root,'assets'\)/,'production builder copies the original scenes');
});
