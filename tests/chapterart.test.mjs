import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {COURSES,findLesson} from '../data.js';
import {CHAPTER_ART,CHAPTER_ART_COUNT,getChapterArt} from '../chapterart.js';

const names=[
 'chapter-privacy-observatory.svg','chapter-security-sanctum.svg',
 'chapter-business-atelier.svg','chapter-science-glasshouse.svg',
 'chapter-interpretation-crossroads.svg','chapter-cash-weatherhouse.svg',
 'chapter-clockwork-schedule.svg','chapter-language-teahouse.svg',
 'chapter-feedback-bridge.svg','chapter-evidence-prism.svg',
 'chapter-portfolio-forge.svg','chapter-boundary-garden.svg',
 'chapter-offer-market.svg','chapter-protective-lantern.svg'
];
test('every capstone has its own accessible original offline illustration',()=>{
 assert.equal(CHAPTER_ART_COUNT,14);
 assert.equal(new Set(Object.values(CHAPTER_ART).map(a=>a.src)).size,14);
 const sw=fs.readFileSync('sw.js','utf8');
 for(const [key,item] of Object.entries(CHAPTER_ART)){
  const [courseId,lessonId]=key.split(':');
  const lesson=findLesson(courseId,lessonId);
  assert.ok(lesson,'mapped case exists: '+key);
  assert.equal(lesson.isCapstone,true,'chapter art must map to a capstone');
  assert.equal(getChapterArt(courseId,lessonId),item);
  assert.match(item.src,/^\/assets\/chapter-[a-z-]+\.svg$/);
  assert.ok(item.title.length>=12&&item.caption.length>=45&&item.alt.length>=75,key+' accessible narrative');
  assert.ok(sw.includes(item.src),'offline cache must include scene '+key);
  const svg=fs.readFileSync(path.join('assets',item.file),'utf8');
  assert.match(svg,/^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="1400" height="700" viewBox="0 0 1400 700" role="img" aria-label="[^"]+">/);
  assert.match(svg,/<\/svg>$/);
  assert.ok((svg.match(/<path\b/g)||[]).length>=10,key+' hand-drawn visual detail');
  assert.ok((svg.match(/<linearGradient\b/g)||[]).length>=2,key+' richly shaded chapter art');
  assert.doesNotMatch(svg,/<script|<foreignObject|<image\b|<iframe|onload\s*=|javascript:/i,key+' embeds no script or external images');
  assert.doesNotMatch(svg,/(?:href|src)="https?:/i,key+' loads no remote dependencies');
  assert.ok(Buffer.byteLength(svg,'utf8')<32_000,key+' fits lightweight offline budget');
 }
 assert.deepEqual(new Set(Object.values(CHAPTER_ART).map(a=>a.file)),new Set(names));
 for(const course of COURSES){
  const cases=course.lessons.filter(l=>l.isCapstone);
  assert.equal(cases.length,1,'one required case per course: '+course.id);
  for(const lesson of cases){
   const key=course.id+':'+lesson.id;
   assert.ok(Object.hasOwn(CHAPTER_ART,key),'missing case-specific artwork for '+key);
  }
 }
});
test('ordinary lessons fall back safely while mature capstones have gated artwork',()=>{
 assert.equal(getChapterArt('psychology','thoughts'),null);
 assert.equal(getChapterArt('laws','unknown'),null);
 assert.equal(getChapterArt('shadow','case-pressure-defenses')?.file,'chapter-protective-lantern.svg');
 assert.equal(getChapterArt('__proto__','toString'),null);
 assert.equal(getChapterArt('psychology','case-ph-data-access'),null);
 assert.ok(COURSES.every(course=>course.lessons.some(l=>!getChapterArt(course.id,l.id))),'ordinary curriculum remains supported');
});
test('reader and production build use locally bundled, descriptive chapter visuals',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const css=fs.readFileSync('styles.css','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/chapterart\.js'/);
 assert.match(app,/const chapterArt=getChapterArt\(c\.id,l\.id\)/);
 assert.match(app,/chapterArt\?esc\(chapterArt\.src\)/);
 assert.match(app,/chapterArt\?esc\(chapterArt\.alt\)/);
 assert.match(app,/class="chapter-art-caption"/);
 assert.match(app,/esc\(c\.art\)\+'\.svg'/,'normal course illustration fallback is preserved');
 assert.match(app,/c\.dark && !shadowUnlocked/,'mature chapter reader remains gated');
 assert.match(css,/\.chapter-art-feature::after/,'text readability overlay is present');
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(build,/'chapterart\.js'/);
 assert.match(build,/fs\.cpSync\(path\.join\(root,'assets'\)/);
});
