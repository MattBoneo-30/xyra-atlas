import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {SKILL_SPIRALS,SKILL_SPIRAL_STAGES,attachSkillSpirals,skillSpiralPanel} from '../skillspirals.js';
import {portfolioJourneyPanel} from '../portfoliojourneys.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('forty-two distinct exercises form a three-stage progression for every subject',()=>{
 assert.equal(totalLessons,139);
 assert.deepEqual(SKILL_SPIRAL_STAGES,['Beginner','Intermediate','Advanced']);
 assert.equal(Object.keys(SKILL_SPIRALS).length,14);
 const cases=new Set(),models=new Set(),titles=new Set();
 for(const course of COURSES){
  const items=SKILL_SPIRALS[course.id];
  assert.strictEqual(course.skillSpiral,items,'course link missing '+course.id);
  assert.strictEqual(course.lessons.find(l=>l.stage==='Beginner').skillSpiral,items);
  assert.equal(items.length,3);
  assert.ok(Object.isFrozen(items));
  for(const [i,item] of items.entries()){
   assert.ok(Object.isFrozen(item));
   assert.equal(item.stage,SKILL_SPIRAL_STAGES[i]);
   assert.equal(item.reviewStatus,'pending-independent-review');
   assert.ok(item.title.length>=15);
   assert.ok(item.scenario.length>=75);
   assert.ok(item.challenge.length>=65);
   assert.ok(item.worked.length>=125);
   assert.ok(item.misconception.length>=40);
   assert.ok(item.proof.length>=55);
   assert.ok(!cases.has(item.scenario),'duplicate case');
   assert.ok(!models.has(item.worked),'duplicate worked reasoning');
   assert.ok(!titles.has(item.title),'duplicate exercise name');
   cases.add(item.scenario);models.add(item.worked);titles.add(item.title);
   const linked=course.portfolioJourney.artifacts[i];
   assert.ok(course.lessons.some(l=>l.stage===item.stage&&l.id===linked.lessonId));
  }
  const courseMarkup=portfolioJourneyPanel(course);
  assert.equal((courseMarkup.match(/class="skill-spiral-stage"/g)||[]).length,3);
  assert.equal((courseMarkup.match(/class="skill-spiral-response"/g)||[]).length,3);
  assert.match(courseMarkup,/class="skill-spiral-fold"/);
  for(const linked of course.portfolioJourney.artifacts){
   assert.ok(courseMarkup.includes('#/lesson/'+course.id+'/'+linked.lessonId));
  }
  assert.doesNotMatch(courseMarkup,/data-action="complete-lesson"/);
 }
 assert.equal(cases.size,42);
 assert.equal(models.size,42);
 assert.equal(titles.size,42);
 assert.equal(attachSkillSpirals(COURSES),0);
 assert.throws(()=>attachSkillSpirals([]),/Expected all fourteen/);
 assert.equal(skillSpiralPanel(null),'');
});
test('independent review digests include all 42 new original practice cases and misconceptions',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 const records=packet.lessons.filter(row=>row.content.progressiveSkillSpiral);
 assert.equal(records.length,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.expertApprovedLessons,0);
 for(const item of records){
  assert.equal(item.content.progressiveSkillSpiral.reviewStatus,'pending-independent-review');
  assert.deepEqual(item.content.progressiveSkillSpiral.stages.map(s=>s.stage),SKILL_SPIRAL_STAGES);
  assert.equal(item.reviewStatus,'pending-independent-review');
  assert.equal(item.reviewerAttestation,null);
  assert.equal(item.contentHash,reviewHash(item.content));
  const changed=structuredClone(item.content);
  changed.progressiveSkillSpiral.stages[1].commonMisconception+=' Editor correction.';
  assert.notEqual(reviewHash(changed),item.contentHash);
 }
});
test('spirals are offline-only, keyboard accessible, and maintain a 240 KB app budget',()=>{
 const read=name=>fs.readFileSync(name,'utf8');
 for(const name of ['skillspirals.js','skillspirals1.js','skillspirals2.js','skill-spirals.css']){
  assert.ok(read('sw.js').includes('/'+name),'precache missing '+name);
  assert.ok(read('scripts/build.mjs').includes("'"+name+"'"),'build missing '+name);
 }
 assert.match(read('index.html'),/skill-spirals\.css/);
 assert.match(read('skill-spirals.css'),/focus-visible/);
 assert.match(read('portfoliojourneys.js'),/skillSpiralPanel\(course\)/);
 assert.doesNotMatch(read('skillspirals.js'),/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 assert.ok(Buffer.byteLength(read('app.js'))<240000,'do not inflate main app to accommodate course content');
 const gates=JSON.parse(read('docs/stage-gates.json')).gates;
 assert.ok(gates.every(g=>g.complete===false),'authoring is not reviewer approval');
});
