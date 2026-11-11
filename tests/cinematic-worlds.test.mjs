import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {visualScenePanel} from '../atlas-visual-experience.js';

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
 const scene=visualScenePanel((label,action,cls)=>`<button type="button" class="${cls}" data-action="${action}">${label}</button>`);
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/class="hero-landscape hero-archive"/);
 assert.match(app,/fetchpriority="high"/);
 assert.match(app,/Enter the Atlas','goto-explore'/);
 assert.match(scene,/Visit Xyra’s Corner/);
 assert.match(scene,/data-action="open-corner"/);
 assert.match(scene,/See the knowledge map/);
 assert.match(scene,/data-action="map"/);
 assert.match(app,/visualScenePanel\(button\)/);
 assert.match(scene,/class="atlas-scene-grid"/);
 assert.match(scene,/class="atlas-guide-medallion" aria-hidden="true"/);
 assert.match(scene,/src="\/assets\/xyra-guide.svg" alt="" loading="lazy"/);
 assert.match(css,/\.atlas-scene-card \.atlas-guide-medallion/);
 assert.ok(fs.readFileSync('sw.js','utf8').includes('/assets/xyra-guide.svg'),
  'character cameo is included in the offline bundle');
 for(const name of names){
  assert.ok((app+scene).includes('/assets/'+name+'.svg'),'original art is loaded by the app or extracted scene renderer: '+name);
 }
 assert.match(css,/\.hero-archive \.landscape-shade/);
 assert.match(css,/\.atlas-scene-grid/);
 assert.match(css,/Mobile utility invites/);
 assert.match(css,/grid-template-columns:46px minmax\(0,1fr\)/);
 assert.match(css,/\.home-page :is\(\.review-invite,\.path-invite/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(build,/fs\.cpSync\(path\.join\(root,'assets'\)/,'production builder copies the original scenes');
});
