import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {TRANSFER_LABS} from '../transferlabs.js';
import {CROSS_SUBJECT_MISSIONS,CROSS_SUBJECT_MISSION_COUNT,attachCrossSubjectMissions} from '../crosssubjectmissions.js';
import {createChapterMap} from '../visualmap.js';
import {buildLessonNarration} from '../narration.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('every subject has one meaningful, valid interdisciplinary practice link',()=>{
 assert.equal(CROSS_SUBJECT_MISSION_COUNT,14);
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139,'historical course progress keys must remain unchanged');
 assert.deepEqual(new Set(Object.keys(CROSS_SUBJECT_MISSIONS)),new Set(COURSES.map(c=>c.id)));
 const titles=new Set(),scenarios=new Set(),peers=new Set();
 for(const course of COURSES){
  const spec=CROSS_SUBJECT_MISSIONS[course.id],lesson=findLesson(course.id,TRANSFER_LABS[course.id].lessonId);
  assert.ok(lesson.crossSubjectMission,course.id);
  assert.equal(lesson.crossSubjectMission.reviewStatus,'pending-independent-review');
  assert.equal(lesson.crossSubjectMission.key,course.id+':'+lesson.id);
  assert.ok(Object.isFrozen(lesson.crossSubjectMission));
  assert.ok(Object.isFrozen(lesson.crossSubjectMission.rubric));
  assert.equal(lesson.stage,'Intermediate');
  assert.ok(lesson.transferLab,'original independent lab remains intact');
  assert.equal(lesson.crossSubjectMission.rubric.length,4);
  const peer=findLesson(spec.peerCourse,spec.peerLesson);
  assert.ok(peer,'destination lesson must exist: '+course.id);
  assert.notEqual(spec.peerCourse,course.id);
  assert.ok(spec.scene.length>=160&&spec.bridge.length>=170&&spec.challenge.length>=150&&spec.model.length>=150);
  titles.add(spec.title);scenarios.add(spec.scene);peers.add(spec.peerCourse);
 }
 assert.equal(titles.size,14);
 assert.equal(scenarios.size,14);
 assert.ok(peers.size>=8,'bridges must reach across the subject collection');
 assert.equal(attachCrossSubjectMissions(COURSES),0,'repeat wiring must not duplicate a lab');
 assert.throws(()=>attachCrossSubjectMissions([]),/coverage incomplete/);
});

test('cross-subject lesson content is navigable, narrated and visibly optional',()=>{
 for(const course of COURSES){
  const lesson=findLesson(course.id,TRANSFER_LABS[course.id].lessonId),mission=lesson.crossSubjectMission;
  const map=createChapterMap(course,lesson);
  assert.equal(map.bridge.id,'cross-subject-mission');
  assert.equal(map.bridge.heading,mission.title);
  const text=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(text.includes('Cross-subject mission: '+mission.title),course.id);
  assert.ok(text.includes('Independent challenge.'),course.id);
 }
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/function crossSubjectMissionView\(item\)/);
 assert.match(app,/\$\{crossSubjectMissionView\(l\.crossSubjectMission\)\}/);
 assert.match(app,/data-index="bridge"/);
 assert.match(app,/id="cross-subject-mission"/);
 assert.match(app,/index==='bridge'\?'cross-subject-mission'/);
 assert.match(app,/class="cross-subject-answer"/);
 assert.match(app,/href="\'+esc\(companion\)/);
});
test('independent reviewer packet hashes cross-subject cases and leaves approvals pending',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.uniqueSourceURLs,52);
 const rows=packet.lessons.filter(row=>row.content.interdisciplinaryMission);
 assert.equal(rows.length,14);
 for(const row of rows){
  const item=row.content.interdisciplinaryMission;
  assert.equal(item.reviewStatus,'pending-independent-review');
  assert.equal(item.selfReviewRubric.length,4);
  assert.equal(row.reviewerAttestation,null);
  assert.equal(row.contentHash,reviewHash(row.content));
  assert.notEqual(row.contentHash,reviewHash({...row.content,interdisciplinaryMission:{
   ...item,modelResponse:item.modelResponse+' reviewed amendment'}}));
 }
 assert.equal(packet.totals.expertApprovedLessons,0);
});
test('cross-subject content and CSS remain locally accessible in offline build',()=>{
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const file of ['crosssubjectmissions.js','crosssubjectmissions1.js','crosssubjectmissions2.js','study-bridges.css']){
  assert.ok(sw.includes('/'+file),'offline missing '+file);
  assert.ok(build.includes("'"+file+"'"),'build missing '+file);
 }
 assert.match(fs.readFileSync('index.html','utf8'),/href="\/study-bridges\.css"/);
 assert.match(fs.readFileSync('data.js','utf8'),/attachCrossSubjectMissions\(COURSES\)/);
});
