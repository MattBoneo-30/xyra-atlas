import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {auditCurriculum} from '../curriculumaudit.js';
const finalKeys=["business:customer-evidence","business:ph-launch-checklist","savings:cash-flow-map","business:interview-before-building","savings:irregular-income-savings","time:design-a-sleep-protected-week","time:bottleneck-and-buffer-planning","thinking:claim-evidence-audit","thinking:base-rate-and-selection-bias","communication:feedback-with-observable-evidence","science:measurement-and-uncertainty"];
test('all 11 previously short advanced/personal applied lessons now teach full methods',()=>{
 assert.equal(finalKeys.length,11);
 for(const key of finalKeys){
  const [courseId,lessonId]=key.split(':');
  const lesson=findLesson(courseId,lessonId);
  assert.ok(lesson,key);
  assert.ok(lesson.sections.every(s=>s.body.length>=160),key+' missing complete explanations');
  assert.ok(lesson.task.length>=90,key+' missing meaningful independent task');
 }
});
test('entire 139-lesson educational collection meets transparent structural depth checks',()=>{
 const report=auditCurriculum(COURSES);
 assert.equal(totalLessons,139);
 assert.equal(report.valid,true);
 assert.equal(report.totals.threeSectionDepth,139);
 assert.equal(report.totals.appliedExercises,139);
 assert.equal(report.totals.workedExamples,139);
 assert.equal(report.totals.answerRationales,139);
 assert.equal(report.totals.furtherReading,139);
 assert.equal(report.totals.lessonsWithEditorialFlags,0);
 assert.ok(report.limitations.some(x=>/Human specialist/.test(x)));
});
