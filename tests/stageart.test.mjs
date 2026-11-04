import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {STAGE_ART,STAGE_ART_COUNT,getStageArt} from '../stageart.js';
import {renderStageArtwork,stageArtworkFiles} from '../scripts/render-stage-art.mjs';
import {svgViolations,shellPaths} from '../scripts/static-asset-audit.mjs';

test('all 14 learning subjects have 3 distinct, meaningful original illustrated chapter levels',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(STAGE_ART_COUNT,42);
 const files=stageArtworkFiles();
 assert.equal(files.length,42);
 assert.equal(new Set(files.map(x=>x.filename)).size,42);
 const sw=shellPaths(fs.readFileSync('sw.js','utf8'));
 const visualDigests=new Set();
 for(const course of COURSES){
  for(const stage of ['Beginner','Intermediate','Advanced']){
   const item=getStageArt(course.id,stage);
   assert.ok(item,course.id+' stage '+stage+' missing');
   assert.ok(course.lessons.some(lesson=>lesson.stage===stage&&!lesson.isCapstone),
    'each learning path must have non-case material for its stage');
   assert.ok(item.src.endsWith(item.file));
   assert.match(item.src,/^\/assets\/world-[a-z]+-(beginner|intermediate|advanced)\.svg$/);
   assert.ok(sw.includes(item.src),'all stage worlds must work offline');
   assert.ok(item.title.length>15&&item.caption.length>65&&item.alt.length>80,
    'art is a narrative, not decorative empty wallpaper');
   const source=renderStageArtwork(item);
   assert.match(source,/^<svg xmlns="http:\/\/www.w3.org\/2000\/svg" width="1400" height="700" viewBox="0 0 1400 700" role="img" aria-label="[^"]+">/);
   assert.match(source,/<\/svg>$/);
   assert.deepEqual(svgViolations(source),[]);
   assert.doesNotMatch(source,/<script|<foreignObject|<iframe|<image\b|onload\s*=|javascript:/i);
   assert.ok((source.match(/<path\b/g)||[]).length>=15);
   assert.ok(source.length<32000,'art fits offline loading and smooth scrolling');
   assert.ok(source.includes('stroke-width')&&source.includes('linearGradient'));
   visualDigests.add(source);
  }
 }
 assert.equal(visualDigests.size,42,'each subject and level image is uniquely illustrated');
});
test('unsupported or malicious stage identifiers never resolve artwork',()=>{
 assert.equal(getStageArt('psychology','Unknown'),null);
 assert.equal(getStageArt('__proto__','Beginner'),null);
 assert.equal(getStageArt('shadow','__proto__'),null);
 assert.throws(()=>renderStageArtwork({motif:'unknown',tone:'dawn'}),/Unknown stage/);
});
test('build, service worker, lesson UI, and Chapter 14 case illustrations integrate cleanly',()=>{
 const script=fs.readFileSync('scripts/build.mjs','utf8');
 const app=fs.readFileSync('app.js','utf8');
 const chapter=fs.readFileSync('chapterart.js','utf8');
 const css=fs.readFileSync('styles.css','utf8');
 assert.match(script,/stageArtworkFiles\(\)/);
 assert.match(script,/'stageart\.js'/);
 assert.match(app,/getStageArt\(c\.id,l\.stage\)/);
 assert.match(app,/nextWorldStage=ladder\?\.complete\?'Advanced':firstUnfinished\.stage/);
 assert.match(app,/class="course-hero-art course-world-hero"/);
 assert.match(app,/nextWorld\?\.src/);
 assert.ok(app.indexOf('<figure class="reading-illustration')<app.indexOf('<div class="reader-toolbar"'),
  'narrative illustration appears before reading and voice controls');
 assert.match(app,/chapterArt\?null:getStageArt/);
 assert.match(app,/chapterArt\?esc\(chapterArt\.src\):stageArt\?esc\(stageArt\.src\)/);
 assert.match(app,/YOUR \$\{esc\(l\.stage\.toUpperCase\(\)\)\} WORLD/);
 assert.match(css,/\.stage-art-feature/);
 assert.match(chapter,/getChapterArt/);
 const expected=new Set(Object.keys(STAGE_ART).map(k=>STAGE_ART[k].src));
 const sw=new Set(shellPaths(fs.readFileSync('sw.js','utf8')));
 assert.ok([...expected].every(p=>sw.has(p)));
});
