import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {FOUNDATION_DEPTH_UPGRADES} from '../foundationdepth.js';
import {FOUNDATION_DIAGNOSTICS,FOUNDATION_DIAGNOSTIC_COUNT,attachFoundationDiagnostics} from '../foundationdiagnostics.js';
import {createChapterMap} from '../visualmap.js';
import {buildLessonNarration} from '../narration.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('every subject teaches three distinct prerequisite-aware beginner questions',()=>{
 assert.equal(totalLessons,139,'published lesson identities remain stable');
 assert.equal(COURSES.length,14);
 assert.equal(FOUNDATION_DIAGNOSTIC_COUNT,14);
 assert.deepEqual(new Set(Object.keys(FOUNDATION_DIAGNOSTICS)),new Set(COURSES.map(c=>c.id)));
 const prompts=new Set();
 for(const c of COURSES){
  const spec=FOUNDATION_DIAGNOSTICS[c.id];
  assert.equal(spec.lessonId,FOUNDATION_DEPTH_UPGRADES[c.id].id,'checkpoint belongs to the original beginner foundation');
  const l=findLesson(c.id,spec.lessonId);
  assert.equal(l.stage,'Beginner');
  assert.equal(l.foundationDiagnostic.key,c.id+':'+l.id);
  assert.equal(l.foundationDiagnostic.reviewStatus,'pending-independent-review');
  assert.ok(Object.isFrozen(l.foundationDiagnostic));
  assert.ok(Object.isFrozen(l.foundationDiagnostic.questions));
  assert.ok(l.deepSections.length>=5,'existing long-form foundation content stays intact');
  assert.equal(l.foundationDiagnostic.questions.length,3);
  for(const q of l.foundationDiagnostic.questions){
   assert.ok(q.prompt.length>=60,c.id+' needs an actual reasoning prompt');
   assert.equal(q.options.length,3);
   assert.equal(new Set(q.options).size,3);
   assert.ok(q.options.every(s=>s.length>=5));
   assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<3);
   assert.ok(q.explanation.length>=110,c.id+' needs an explanation, not just a correct letter');
   assert.ok(q.transfer.length>=65,c.id+' needs a second independent application');
   assert.ok(Object.isFrozen(q)&&Object.isFrozen(q.options));
   prompts.add(q.prompt);
  }
 }
 assert.equal(prompts.size,42,'each of the forty-two questions must be distinctive');
 assert.equal(attachFoundationDiagnostics(COURSES),0,'repeat integration is safe and idempotent');
 assert.throws(()=>attachFoundationDiagnostics(null),/Expected Atlas course list/);
 assert.throws(()=>attachFoundationDiagnostics([{id:'science',lessons:[]}]),/subject coverage incomplete/);
});

test('beginner diagnostics appear in chapter navigation and speech preparation',()=>{
 for(const course of COURSES){
  const lesson=findLesson(course.id,FOUNDATION_DIAGNOSTICS[course.id].lessonId);
  const map=createChapterMap(course,lesson);
  assert.equal(map.diagnostic.id,'foundation-diagnostic');
  assert.equal(map.diagnostic.heading,lesson.foundationDiagnostic.title);
  assert.ok(map.diagnostic.preview.length>35&&map.diagnostic.preview.length<=140);
  const spoken=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(spoken.includes('Foundation active recall:'),course.id);
  assert.ok(spoken.includes(lesson.foundationDiagnostic.title),course.id);
  assert.ok(spoken.includes('Question 1.'),course.id);
  assert.ok(spoken.includes('Transfer challenge.'),course.id);
 }
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/function foundationDiagnosticView\(item\)/);
 assert.match(app,/\$\{foundationDiagnosticView\(l\.foundationDiagnostic\)\}/);
 assert.match(app,/id="foundation-diagnostic"/);
 assert.match(app,/data-index="diagnostic"/);
 assert.match(app,/foundation-diagnostic-answer/);
 assert.match(app,/feedback\.textContent=/);
 assert.match(app,/index==='diagnostic'\?'foundation-diagnostic'/);
 assert.match(app,/aria-live="polite"/);
 assert.match(app,/aria-pressed="false"/);
});

test('all new diagnostic choices are source-hashed for independent specialist review',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.decisions,42);
 assert.equal(packet.totals.uniqueSourceURLs,52);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const records=packet.lessons.filter(item=>item.content.foundationActiveRecall);
 assert.equal(records.length,14);
 for(const record of records){
  const section=record.content.foundationActiveRecall;
  assert.equal(section.reviewStatus,'pending-independent-review');
  assert.equal(section.questions.length,3);
  assert.equal(record.reviewerAttestation,null);
  assert.equal(record.contentHash,reviewHash(record.content));
  assert.notEqual(record.contentHash,reviewHash({...record.content,
   foundationActiveRecall:{...section,questions:[
    {...section.questions[0],explanation:section.questions[0].explanation+' reviewed change'},
    ...section.questions.slice(1)]}}));
 }
});

test('beginner checks ship offline without creating a new grade or storage schema',()=>{
 const data=fs.readFileSync('data.js','utf8');
 assert.match(data,/attachFoundationDiagnostics\(COURSES\)/);
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const name of ['foundationdiagnostics.js','foundationdiagnostics1.js','foundationdiagnostics2.js']){
  assert.ok(sw.includes('/'+name),'missing offline asset '+name);
  assert.ok(build.includes("'"+name+"'"),'missing static asset '+name);
 }
 const app=fs.readFileSync('app.js','utf8');
 const start=app.indexOf("else if(action==='foundation-diagnostic-answer')");
 const end=app.indexOf("else if(action==='lesson-audio-start')",start);
 assert.ok(start>=0&&end>start);
 const handler=app.slice(start,end);
 assert.match(handler,/foundationDiagnostic\.questions/);
 assert.doesNotMatch(handler,/\bpersist\(/,'checking a diagnostic must not save progress');
 assert.doesNotMatch(handler,/saved\.answers|saved\.completed/,'checking a diagnostic must not update scored answers');
 assert.match(fs.readFileSync('narration.js','utf8'),/lesson\.foundationDiagnostic/);
 assert.match(fs.readFileSync('styles.css','utf8'),/\.foundation-diagnostic-option:focus-visible/);
});
