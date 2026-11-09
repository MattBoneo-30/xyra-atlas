import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {getStageArt} from '../stageart.js';
import {readingPosition,syncVisualReaderProgress,installVisualExperience,visualHorizonsPanel,visualScenePanel,visualStageCompass} from '../atlas-visual-experience.js';

const source=name=>fs.readFileSync(new URL('../'+name,import.meta.url),'utf8');

test('reading position is bounded, finite and never represents a lesson grade',()=>{
 assert.equal(readingPosition(0,1600,600),0);
 assert.equal(readingPosition(500,1600,600),.5);
 assert.equal(readingPosition(1000,1600,600),1);
 assert.equal(readingPosition(2000,1600,600),1);
 assert.equal(readingPosition(-12,1600,600),0);
 assert.equal(readingPosition(Infinity,1600,600),0);
 assert.equal(readingPosition(150,300,600),0);
 assert.equal(readingPosition(150,0,600),0);
});

test('reader indicator updates only the ephemeral visual transform',()=>{
 const fill={style:{transform:''}};
 const doc={
  querySelector(selector){assert.equal(selector,'.atlas-reader-progress-fill');return fill;},
  scrollingElement:{scrollTop:240,scrollHeight:1280}
 };
 const win={innerHeight:800};
 assert.equal(syncVisualReaderProgress(doc,win),.5);
 assert.equal(fill.style.transform,'scaleX(0.5)');
 assert.equal(syncVisualReaderProgress({querySelector:()=>null,scrollingElement:{}},win),0);
});

test('one passive scroll handler and a resize handler are installed',()=>{
 const events=[];
 const doc={
  addEventListener:(type,handler,opts)=>events.push({type,handler,opts}),
  querySelector:()=>null,
  scrollingElement:{scrollTop:0,scrollHeight:1000}
 };
 const win={
  addEventListener:(type,handler,opts)=>events.push({type,handler,opts}),
  requestAnimationFrame:fn=>fn(),
  innerHeight:600
 };
 assert.equal(installVisualExperience(doc,win),true);
 assert.equal(installVisualExperience(doc,win),false);
 assert.deepEqual(events.map(item=>item.type),['scroll','resize','visibilitychange']);
 assert.equal(events[0].opts.passive,true);
 assert.equal(events[1].opts.passive,true);
});

test('the scenic horizon triptych uses real stage illustrations and real course routes',()=>{
 const app=source('app.js');
 const horizons=[
  ['psychology','Beginner'],
  ['business','Intermediate'],
  ['science','Advanced']
 ];
 for(const [id,stage] of horizons){
  assert.ok(COURSES.some(c=>c.id===id));
  const art=getStageArt(id,stage);
  assert.ok(art?.src, 'No original illustration for '+id+' '+stage);
 }
 const gallery=visualHorizonsPanel(horizons.map(([id,stage],i)=>({id,stage,number:String(i+1).padStart(2,'0'),subtitle:'Explore',course:COURSES.find(c=>c.id===id),art:getStageArt(id,stage)})),String);
 assert.equal((gallery.match(/class="atlas-horizon-card"/g)||[]).length,3);
 assert.match(gallery,/data-action="open-course" data-id="psychology"/);
 assert.match(gallery,/aria-label="Open .* learning world"/);
 assert.match(gallery,/loading="lazy" decoding="async"/);
 assert.match(app,/visualHorizonsPanel\(horizons,esc\)/);
 const scene=visualScenePanel((label,action)=>'<button data-action="'+action+'">'+label+'</button>');
 assert.match(scene,/atlas-lantern-library.svg/);
 assert.match(scene,/data-action="open-corner"/);
});

test('lesson reader shows stage path, honest position ribbon and existing illustration',()=>{
 const app=source('app.js');
 assert.match(app,/data-atlas-stage="\$\{esc\(l\.stage\.toLowerCase\(\)\)\}"/);
 assert.match(app,/class="atlas-reader-progress" aria-hidden="true"/);
 const compass=visualStageCompass(1,8,'Intermediate');
 assert.match(app,/visualStageCompass\(idx,c.lessons.length,l.stage\)/);
 assert.match(compass,/class="atlas-reader-compass"/);
 assert.equal((compass.match(/class="atlas-compass-number"/g)||[]).length,3);
 assert.equal((compass.match(/aria-current="step"/g)||[]).length,1);
 assert.match(compass,/Lesson 2 of 8/);
 assert.match(app,/class="reading-illustration/);
 assert.match(app,/syncVisualReaderProgress\(\);/);
 assert.match(app,/WORLD \$\{String\(COURSES\.findIndex/);
});

test('visual layer is local, included in PWA cache and preserves accessibility options',()=>{
 const build=source('scripts/build.mjs');
 const sw=source('sw.js');
 const html=source('index.html');
 const css=source('atlas-visual-experience.css');
 const js=source('atlas-visual-experience.js');
 for(const name of ['atlas-visual-experience.js','atlas-visual-experience.css']){
  assert.ok(build.includes("'"+name+"'"),'Missing build dependency '+name);
  assert.ok(sw.includes("'/"+name+"'"),'Missing service-worker precache '+name);
 }
 assert.match(html,/href="\/atlas-visual-experience\.css"/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css, /@media\(prefers-contrast:more\)/);
 assert.match(css, /html\[data-theme=light\]/);
 assert.match(css, /@media\(max-width:360px\)/);
 assert.match(css,/font-size:16px/,'iOS fields should not force viewport zoom');
 assert.match(css,/min-height:44px/,'mobile reading interactions need touch-size targets');
 assert.match(css,/overscroll-behavior-x:contain/);
 assert.match(css, /focus-visible/);
 assert.doesNotMatch(js,/localStorage|sessionStorage|fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon/);
 assert.ok(Buffer.byteLength(css,'utf8')<18000,'Visual layer exceeds lightweight source budget');
 assert.ok(Buffer.byteLength(source('app.js'),'utf8')<240000,'Main script exceeds existing performance budget');
});
