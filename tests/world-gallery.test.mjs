import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {getStageArt,STAGE_ART_COUNT} from '../stageart.js';
import {
  stageForWorld,visualWorldProgress,renderAtlasExploreBanner,
  renderAtlasWorldGallery,renderAtlasJourneyConstellation
} from '../atlas-world-gallery.js';

const read=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('the illustrated catalogue covers fourteen existing course identities and stage art',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(STAGE_ART_COUNT,42);
 const gallery=renderAtlasWorldGallery(COURSES,()=>0,()=> 'Beginner',getStageArt,c=>COURSES.indexOf(c)+1);
 assert.equal((gallery.match(/class="atlas-world-portal /g)||[]).length,14);
 assert.equal((gallery.match(/data-action="open-course"/g)||[]).length,14);
 for(const [index,course] of COURSES.entries()){
  assert.ok(gallery.includes('data-id="'+course.id+'"'),course.id+' route missing');
  assert.ok(gallery.includes(getStageArt(course.id,'Beginner').src),course.id+' artwork missing');
  assert.ok(gallery.includes('WORLD '+String(index+1).padStart(2,'0')),course.id+' index missing');
 }
 assert.match(gallery,/loading="lazy" decoding="async"/);
 assert.match(gallery,/World completion reflects finished lessons, not verified professional competence/);
});

test('filtering preserves the canonical number instead of renumbering world one',()=>{
 const course=COURSES[7];
 const markup=renderAtlasWorldGallery([course],()=>2,()=> 'Intermediate',getStageArt,c=>COURSES.indexOf(c)+1);
 assert.match(markup,/WORLD 08/);
 assert.ok(markup.includes('data-id="'+course.id+'"'));
 assert.ok(markup.includes(getStageArt(course.id,'Intermediate').src));
 assert.match(markup,/NEXT · INTERMEDIATE/);
});

test('progress is clamped and precisely reflects completed lessons, never predicted mastery',()=>{
 const course=COURSES[0],total=course.lessons.length;
 assert.deepEqual(visualWorldProgress(course,()=>Infinity),{finished:0,total,percentage:0});
 assert.deepEqual(visualWorldProgress(course,()=>-5),{finished:0,total,percentage:0});
 assert.deepEqual(visualWorldProgress(course,()=>999),{finished:total,total,percentage:100});
 assert.deepEqual(visualWorldProgress(course,()=>2.9).finished,2);
 assert.equal(stageForWorld(course,()=> 'Wrong'),'Beginner');
 assert.equal(stageForWorld(course,()=> 'Advanced'),'Advanced');
 assert.equal(renderAtlasWorldGallery([],()=>0,()=> 'Beginner',getStageArt),'');
 assert.equal(renderAtlasJourneyConstellation([],()=>0),'');
});

test('all progress changes remain derived, no new completion state or network requests',()=>{
 const source=read('atlas-world-gallery.js');
 assert.doesNotMatch(source,/localStorage|sessionStorage|indexedDB|fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon/);
 const before=COURSES.map(c=>c.lessons.length);
 const overview=renderAtlasJourneyConstellation(COURSES,c=>c.id==='psychology'?c.lessons.length:0);
 assert.match(overview,/Your learning constellation/);
 assert.equal((overview.match(/class="atlas-constellation-node"/g)||[]).length,14);
 assert.match(overview,/1 \/ 14 worlds explored/);
 assert.deepEqual(COURSES.map(c=>c.lessons.length),before);
 assert.equal(COURSES.reduce((n,c)=>n+c.lessons.length,0),139);
});

test('every world button has an accessible label and shadow-world age disclosure',()=>{
 const html=renderAtlasWorldGallery(COURSES,()=>0,()=> 'Beginner',getStageArt,c=>COURSES.indexOf(c)+1);
 assert.equal((html.match(/aria-label="Open /g)||[]).length,14);
 const dark=COURSES.find(c=>c.dark);
 assert.ok(dark,'Expected the existing restricted world');
 assert.ok(html.includes('data-id="'+dark.id+'"'));
 assert.match(html,/18 plus/);
 assert.match(html,/data-action="open-course"/);
 const special={
  id:'unsafe" onclick="alert(1)',art:'x',
  title:'<script>name</script>',subtitle:'<img onerror=alert(1)>',
  tag:'&',dark:false,lessons:[{id:'one'}]
 };
 const safe=renderAtlasWorldGallery([special],()=>0,()=> 'Beginner',()=>({src:'javascript:alert(1)'}));
 assert.doesNotMatch(safe,/<script>|<img onerror|javascript:alert/);
 assert.match(safe,/\/assets\/atlas-mark.svg/);
 assert.match(safe,/&lt;script&gt;/);
});

test('Explore search, filters and empty states remain wired into the existing application',()=>{
 const app=read('app.js');
 assert.match(app,/const matches = COURSES.filter/);
 assert.match(app,/const searchPass = haystack.includes/);
 assert.match(app,/const typePass = filter==='all'/);
 assert.match(app,/renderAtlasWorldGallery\(matches,courseProgress/);
 assert.match(app,/c=>COURSES.indexOf\(c\)\+1/);
 assert.match(app,/Show all subjects/);
 assert.match(app,/renderAtlasJourneyConstellation\(COURSES,courseProgress\)/);
 const banner=renderAtlasExploreBanner(COURSES.length);
 assert.match(banner,/14 LEARNING WORLDS/);
 assert.match(banner,/atlas-starlit-garden.svg/);
 assert.match(banner,/<h1/);
});

test('all branch-only visual assets are bundled offline and preserve mobile accessibility',()=>{
 const build=read('scripts/build.mjs'),sw=read('sw.js');
 const html=read('index.html'),css=read('atlas-world-gallery.css');
 const app=read('app.js');
 for(const item of ['atlas-world-gallery.js','atlas-world-gallery.css']){
  assert.ok(build.includes("'"+item+"'"),'Missing build asset: '+item);
  assert.ok(sw.includes("'/"+item+"'"),'Missing offline asset: '+item);
 }
 assert.ok(html.includes('href="/atlas-world-gallery.css"'));
 for(const token of ['@media(max-width:510px)','@media(max-width:360px)',
 '@media(prefers-contrast:more)','@media(prefers-reduced-motion:reduce)',
 ':focus-visible','html[data-theme=light]']){
  assert.ok(css.includes(token),'Missing visual accessibility rule '+token);
 }
 assert.ok(Buffer.byteLength(css,'utf8')<18000);
 assert.ok(Buffer.byteLength(app,'utf8')<240000,'Main app exceeds static audit limit');
});

test('the visual branch disables its preview deployments without disabling production',()=>{
 const config=JSON.parse(read('vercel.json'));
 assert.equal(config.git.deploymentEnabled['dev/atlas-visual-experience'],false);
 assert.notEqual(config.git.deploymentEnabled.main,false);
 assert.ok(config.headers.length>=2,'Existing security headers retained');
});
