import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {getStageArt} from '../stageart.js';
import {inquiryLinkedLessons,renderAtlasInquiryTrail} from '../atlas-inquiry.js';
import {CROSSROAD_CASES,CROSSROAD_COUNT,validateCrossroads,renderAtlasCrossroads,crossroadNodeRoutes} from '../atlas-crossroads.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {renderEditorialReviewHTML} from '../scripts/editorial-review-html.mjs';

const source=path=>fs.readFileSync(new URL('../'+path,import.meta.url),'utf8');

test('fourteen actual Atlas subjects each have one original cross-disciplinary challenge',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(CROSSROAD_COUNT,14);
 assert.equal(validateCrossroads(COURSES.map(course=>course.id)),true);
 for(const course of COURSES){
  const mission=CROSSROAD_CASES[course.id];
  assert.ok(mission,'Missing subject '+course.id);
  assert.notEqual(mission.partner,course.id);
  assert.ok(COURSES.some(other=>other.id===mission.partner));
  assert.equal(mission.models.length,2);
  assert.ok(mission.challenge.length>=100);
  assert.ok(mission.worked.length>=145);
  assert.ok(mission.falsifier.length>=90);
 }
});

test('each six-node map routes only to existing real course and lesson IDs',()=>{
 for(const course of COURSES){
  const partner=COURSES.find(c=>c.id===CROSSROAD_CASES[course.id].partner);
  const lessons=inquiryLinkedLessons(course);
  const nodes=crossroadNodeRoutes(course,partner,lessons);
  assert.equal(nodes.length,6,course.id);
  assert.equal(nodes[0].url,'#/course/'+course.id);
  assert.equal(nodes[5].url,'#/course/'+partner.id);
  assert.equal(nodes.filter(n=>n.kind==='lesson').length,4);
  for(const node of nodes.filter(n=>n.kind==='lesson')){
   assert.ok(course.lessons.some(l=>l.id===node.lessonId));
   assert.ok(node.url.includes('#/lesson/'+course.id+'/'));
  }
 }
 assert.equal(COURSES.reduce((n,c)=>n+c.lessons.length,0),139);
});

test('visual map is native-keyboard navigable and only displays existing lesson completion',()=>{
 for(const course of COURSES){
  const lessons=inquiryLinkedLessons(course);
  const completed=new Set([lessons[0].id,lessons[1].id]);
  const html=renderAtlasCrossroads(course,COURSES,{lessonNodes:lessons,getStageArt,isLessonDone:id=>completed.has(id)});
  assert.equal((html.match(/class="atlas-crossroads-node"/g)||[]).length,6);
  assert.equal((html.match(/class="atlas-crossroads-link"/g)||[]).length,6);
  assert.equal((html.match(/class="atlas-crossroads-answer"/g)||[]).length,1);
  assert.ok(html.includes(CROSSROAD_CASES[course.id].title));
  assert.ok(html.includes(getStageArt(CROSSROAD_CASES[course.id].partner,'Advanced').src));
  assert.equal((html.match(/Linked lesson complete</g)||[]).length,2);
  assert.equal((html.match(/Linked lesson not complete</g)||[]).length,2);
  assert.match(html,/This optional mission is not graded/);
  assert.ok(!html.includes('onclick='));
  const whole=renderAtlasInquiryTrail(course,{allCourses:COURSES,isLessonDone:()=>false,getStageArt});
  assert.ok(whole.includes('atlas-inquiry-disclosure'));
  assert.ok(whole.includes('atlas-crossroads-disclosure'));
  assert.ok(whole.indexOf('atlas-inquiry-disclosure')<whole.indexOf('atlas-crossroads-disclosure'));
 }
});

test('invalid routes, unsupported art sources and HTML injection are rejected',()=>{
 const sourceCourse=COURSES[0];
 const partner=COURSES.find(c=>c.id===CROSSROAD_CASES[sourceCourse.id].partner);
 assert.deepEqual(crossroadNodeRoutes(sourceCourse,partner,[]),[]);
 assert.equal(renderAtlasCrossroads({id:'missing',lessons:[]},COURSES),'');
 const fake={...sourceCourse,title:'<img src=x onerror=alert(1)>'};
 const linked=inquiryLinkedLessons(fake);
 const html=renderAtlasCrossroads(fake,COURSES,{lessonNodes:linked,getStageArt:()=>({src:'javascript:alert(1)'})});
 assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
 assert.doesNotMatch(html,/<img src=x onerror/);
 assert.match(html,/\/assets\/atlas-mark.svg/);
 const restricted=COURSES.find(x=>x.id==='shadow');
 assert.ok(restricted.dark);
 assert.ok(!Object.entries(CROSSROAD_CASES).some(([id,unit])=>id!=='shadow'&&unit.partner==='shadow'),
  'Restricted world should not be auto-promoted to other-world learners');
});

test('all interdisciplinary author content is in the exact-source reviewer packet and printable copy',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 const units=packet.lessons.filter(x=>x.content.crossWorldAppliedMission);
 assert.equal(units.length,14);
 for(const course of COURSES){
  const row=units.find(x=>x.course===course.id);
  assert.ok(row,course.id);
  assert.equal(row.content.crossWorldAppliedMission.reviewStatus,'pending-independent-review');
  assert.equal(row.content.crossWorldAppliedMission.worked,CROSSROAD_CASES[course.id].worked);
  assert.equal(row.content.crossWorldAppliedMission.partner,CROSSROAD_CASES[course.id].partner);
 }
 const html=renderEditorialReviewHTML(packet);
 assert.ok(html.includes(CROSSROAD_CASES.psychology.title));
 assert.ok(html.includes(CROSSROAD_CASES.digital.title));
 assert.ok(html.includes('Cross-world transfer studio'));
});

test('offline package, mobile visibility, no tracking and no main-script regression',()=>{
 const build=source('scripts/build.mjs'),sw=source('sw.js');
 const index=source('index.html'),css=source('atlas-crossroads.css');
 const code=source('atlas-crossroads.js'),app=source('app.js');
 for(const name of ['atlas-crossroads.js','atlascrossroads1.js','atlascrossroads2.js','atlas-crossroads.css']){
  assert.ok(build.includes("'"+name+"'"),'Build missing '+name);
  assert.ok(sw.includes("'/"+name+"'"),'Precache missing '+name);
 }
 assert.match(index,/href="\/atlas-crossroads.css"/);
 for(const item of [':focus-visible','@media(max-width:680px)','@media(max-width:360px)','prefers-contrast:more','prefers-reduced-motion','html[data-theme=light]']){
  assert.ok(css.includes(item),'Missing accessibility rule '+item);
 }
 assert.doesNotMatch(code,/localStorage|sessionStorage|indexedDB|XMLHttpRequest|fetch\s*\(|navigator\.sendBeacon/);
 assert.match(app,/allCourses:COURSES/);
 assert.ok(Buffer.byteLength(app,'utf8')<240000);
});

test('the continuing branch remains isolated and automatic previews stay disabled',()=>{
 const vercel=JSON.parse(source('vercel.json'));
 assert.equal(vercel.git.deploymentEnabled['dev/atlas-visual-experience'],false);
 assert.notEqual(vercel.git.deploymentEnabled.main,false);
});
