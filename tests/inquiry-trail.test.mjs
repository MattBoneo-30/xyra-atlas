import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {getStageArt} from '../stageart.js';
import {
 INQUIRY_TRAILS,INQUIRY_SUBJECT_COUNT,INQUIRY_STATION_COUNT,INQUIRY_STEPS,
 validateInquiryTrails,inquiryLinkedLessons,inquiryProgress,renderAtlasInquiryTrail
} from '../atlas-inquiry.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';

const source=file=>fs.readFileSync(new URL('../'+file,import.meta.url),'utf8');

test('every Atlas world has a coherent four-step inquiry map and substantive instructional content',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(INQUIRY_SUBJECT_COUNT,14);
 assert.equal(INQUIRY_STATION_COUNT,56);
 assert.equal(validateInquiryTrails(COURSES.map(c=>c.id)),true);
 assert.deepEqual(INQUIRY_STEPS.map(x=>x.label),['Observe','Explain','Challenge','Transfer']);
 for(const course of COURSES){
  const item=INQUIRY_TRAILS[course.id];
  assert.ok(item,'Missing inquiry trail '+course.id);
  assert.equal(item.stations.length,4);
  assert.equal(new Set(item.stations.map(x=>x.heading)).size,4);
  assert.ok(item.context.length>=150);
  for(const unit of item.stations){
   assert.ok(unit.concept.length>=140);
   assert.ok(unit.challenge.length>=105);
   assert.ok(unit.worked.length>=140);
   assert.ok(unit.trap.length>=70);
   assert.ok(unit.evidence.length>=70);
  }
 }
});

test('four stations link to existing Beginner, Intermediate and Advanced lesson identities',()=>{
 for(const course of COURSES){
  const lessons=inquiryLinkedLessons(course);
  assert.equal(lessons.length,4,course.id);
  assert.deepEqual(lessons.map(x=>x.stage),['Beginner','Intermediate','Advanced','Advanced']);
  assert.ok(lessons.every(x=>course.lessons.some(l=>l.id===x.id)));
  const html=renderAtlasInquiryTrail(course,{isLessonDone:()=>false,getStageArt});
  assert.equal((html.match(/class="atlas-inquiry-stop"/g)||[]).length,4);
  assert.equal((html.match(/class="atlas-inquiry-answer"/g)||[]).length,4);
  assert.equal((html.match(/class="atlas-inquiry-link"/g)||[]).length,4);
  for(const lesson of lessons){
   assert.ok(html.includes('#/lesson/'+course.id+'/'+lesson.id),course.id+':'+lesson.id);
  }
  assert.match(html,/aria-label="Visual inquiry trail/);
  assert.match(html,/Try before revealing/);
  assert.match(html,/Evidence that your reasoning holds/);
  assert.match(html,/pending independent expert review/);
 }
 assert.equal(COURSES.reduce((n,c)=>n+c.lessons.length,0),139);
});

test('linked lesson completion is only a read-only cue and never an inquiry grade',()=>{
 const course=COURSES.find(c=>c.id==='business');
 const linked=inquiryLinkedLessons(course);
 const completed=new Set([linked[0].id,linked[1].id]);
 const snapshot=JSON.stringify(course.lessons.map(x=>({id:x.id,stage:x.stage})));
 const progress=inquiryProgress(course,id=>completed.has(id));
 assert.equal(progress.linkedComplete,2);
 assert.equal(progress.total,4);
 assert.deepEqual(progress.done,[true,true,false,false]);
 const html=renderAtlasInquiryTrail(course,{isLessonDone:id=>completed.has(id),getStageArt});
 assert.equal((html.match(/Linked lesson completed/g)||[]).length,2);
 assert.equal((html.match(/Linked lesson not completed/g)||[]).length,2);
 assert.match(html,/Linked lesson completion is a navigation cue, not a grade/);
 assert.equal(snapshot,JSON.stringify(course.lessons.map(x=>({id:x.id,stage:x.stage}))));
 assert.equal(renderAtlasInquiryTrail({id:'not-real',title:'Missing',lessons:[]}), '');
});

test('original visual scenes, accessible disclosures and safe markup are used',()=>{
 for(const c of COURSES){
  const html=renderAtlasInquiryTrail(c,{getStageArt});
  assert.ok(html.includes(getStageArt(c.id,'Advanced').src));
  assert.equal((html.match(/<details class="atlas-inquiry-answer"/g)||[]).length,4);
  assert.ok(!html.includes('onclick='));
 }
 const sample=COURSES[0];
 const modified={...sample,title:'<img src=x onerror=alert(1)>'};
 const safe=renderAtlasInquiryTrail(modified,{getStageArt});
 assert.match(safe,/&lt;img src=x onerror=alert\(1\)&gt;/);
 assert.doesNotMatch(safe,/<img src=x onerror/);
 const invalidArt=renderAtlasInquiryTrail(sample,{getStageArt:()=>({src:'javascript:alert(1)'})});
 assert.match(invalidArt,/\/assets\/atlas-mark.svg/);
});

test('editorial exact-content packet and printable review include 56 authored stations',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 const rows=packet.lessons.filter(row=>row.content.subjectInquiryTrail);
 assert.equal(rows.length,14);
 assert.equal(rows.reduce((n,row)=>n+row.content.subjectInquiryTrail.stations.length,0),56);
 assert.equal(packet.totals.lessons,139);
 for(const course of COURSES){
  const unit=rows.find(row=>row.course===course.id);
  assert.ok(unit,course.id+' missing review record');
  assert.equal(unit.content.subjectInquiryTrail.reviewStatus,'pending-independent-review');
  assert.equal(unit.content.subjectInquiryTrail.title,INQUIRY_TRAILS[course.id].title);
  assert.equal(unit.content.subjectInquiryTrail.stations[3].worked,INQUIRY_TRAILS[course.id].stations[3].worked);
 }
 const html=renderEditorialReviewHTML(packet);
 assert.ok(html.includes(INQUIRY_TRAILS.psychology.title));
 assert.ok(html.includes(INQUIRY_TRAILS.shadow.title));
 assert.ok(html.includes('Four-stop visual inquiry trail'));
 assert.ok(html.includes('Worked comparison, pending independent review'));
});

test('inquiry course cards have CSS focus, contrast, small-screen and offline support',()=>{
 const app=source('app.js'),build=source('scripts/build.mjs'),sw=source('sw.js');
 const index=source('index.html'),styles=source('atlas-inquiry.css');
 const code=source('atlas-inquiry.js');
 assert.match(app,/renderAtlasInquiryTrail\(c,\{isLessonDone:/);
 assert.ok(app.indexOf('renderAtlasInquiryTrail(')<app.indexOf('portfolioJourneyPanel(c,'));
 for(const filename of ['atlas-inquiry.js','inquirytrails1.js','inquirytrails2.js','atlas-inquiry.css']){
  assert.ok(build.includes("'"+filename+"'"),'Missing build asset '+filename);
  assert.ok(sw.includes("'/"+filename+"'"),'Missing offline precache '+filename);
 }
 assert.match(index,/href="\/atlas-inquiry.css"/);
 for(const rule of [':focus-visible','@media(max-width:360px)','@media(max-width:680px)',
  '@media(prefers-contrast:more)','@media(prefers-reduced-motion:reduce)','html[data-theme=light]']){
  assert.ok(styles.includes(rule),'Missing accessibility style '+rule);
 }
 assert.doesNotMatch(code,/localStorage|sessionStorage|indexedDB|fetch\s*\(|navigator\.sendBeacon|XMLHttpRequest/);
 assert.ok(Buffer.byteLength(app,'utf8')<240000,'Main app exceeds performance budget');
});
