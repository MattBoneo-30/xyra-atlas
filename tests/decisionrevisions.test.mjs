import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {TRANSFER_LABS} from '../transferlabs.js';
import {DECISION_REVISIONS,DECISION_REVISION_COUNT,attachDecisionRevisions,decisionRevisionPanel} from '../decisionrevisions.js';
import {createChapterMap} from '../visualmap.js';
import {buildLessonNarration} from '../narration.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('fourteen existing intermediate lessons teach evidence-based decision revision',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139);
 assert.equal(DECISION_REVISION_COUNT,14);
 assert.deepEqual(new Set(Object.keys(DECISION_REVISIONS)),new Set(COURSES.map(c=>c.id)));
 const titles=new Set(),initials=new Set(),reveals=new Set();
 for(const course of COURSES){
  const lesson=findLesson(course.id,TRANSFER_LABS[course.id].lessonId);
  const item=lesson.decisionRevision;
  assert.ok(item,course.id+' missing decision revision');
  assert.equal(item.key,course.id+':'+lesson.id);
  assert.equal(item.reviewStatus,'pending-independent-review');
  assert.equal(lesson.stage,'Intermediate');
  assert.ok(lesson.transferLab&&lesson.crossSubjectMission,'previous intermediate work preserved');
  assert.ok(Object.isFrozen(item)&&Object.isFrozen(item.rubric));
  assert.equal(item.rubric.length,4);
  for(const [field,min] of Object.entries({case:155,firstTask:160,reveal:165,revision:160,follow:115,caveat:45}))
   assert.ok(item[field].length>=min,course.id+':'+field);
  titles.add(item.title);initials.add(item.case);reveals.add(item.reveal);
  const html=decisionRevisionPanel(item);
  assert.match(html,/class="decision-revision-reveal"/);
  assert.match(html,/Reveal the new evidence and reconsider/);
  assert.match(html,/New evidence/);
  const map=createChapterMap(course,lesson);
  assert.equal(map.decision.id,'decision-revision');
  assert.equal(map.decision.heading,item.title);
  const speech=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(speech.includes('Evidence-reversal lab: '+item.title),course.id+' missing narration');
 }
 assert.equal(titles.size,14);
 assert.equal(initials.size,14);
 assert.equal(reveals.size,14);
 assert.equal(attachDecisionRevisions(COURSES),0,'integration remains idempotent');
 assert.throws(()=>attachDecisionRevisions([]),/coverage incomplete/);
});

test('all fourteen revised claims are included in hash-sensitive independent review packets',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.uniqueSourceURLs,52);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const rows=packet.lessons.filter(x=>x.content.decisionRevisionLab);
 assert.equal(rows.length,14);
 for(const row of rows){
  const info=row.content.decisionRevisionLab;
  assert.equal(info.reviewStatus,'pending-independent-review');
  assert.equal(info.rubric.length,4);
  assert.equal(row.reviewerAttestation,null);
  assert.equal(row.contentHash,reviewHash(row.content));
  assert.notEqual(row.contentHash,reviewHash({...row.content,decisionRevisionLab:{
   ...info,newEvidence:info.newEvidence+' corrected by reviewer'
  }}));
 }
});

test('new missions are discoverable, accessible, offline and never modify quiz storage',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/\$\{decisionRevisionPanel\(l\.decisionRevision\)\}/);
 assert.match(app,/data-index="decision"/);
 assert.match(app,/index==='decision'\?'decision-revision'/);
 assert.match(app,/\+\(chapterMap\.decision\?1:0\)/);
 const reader=fs.readFileSync('decisionrevisions.js','utf8');
 assert.match(reader,/class="decision-revision-reveal"/);
 assert.match(reader,/decision-revision-rubric/);
 assert.doesNotMatch(reader,/localStorage|sessionStorage|\bpersist\(|\bfetch\(/);
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const asset of ['decisionrevisions.js','decisionrevisions1.js','decisionrevisions2.js','decision-revisions.css']){
  assert.ok(sw.includes('/'+asset),'offline missing '+asset);
  assert.ok(build.includes("'"+asset+"'"),'build missing '+asset);
 }
 assert.ok(fs.readFileSync('index.html','utf8').includes('href="/decision-revisions.css"'));
});
