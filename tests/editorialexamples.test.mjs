import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES,findLesson} from '../data.js';
import {DEEP_TRACKS} from '../deeptracks.js';
import {MASTERY_TRACKS} from '../masterytracks.js';
import {LIFE_PRACTICE} from '../lifepractice.js';
import {auditCurriculum} from '../curriculumaudit.js';
const cases=["psychology:habit-lab","psychology:relationship-inference","psychology:evidence-before-labels","laws:ph-data-rights","laws:ph-consumer-evidence","laws:privacy-access-request-ph","business:customer-evidence","business:unit-economics","business:ph-launch-checklist","business:interview-before-building","business:contribution-margin-scenario","savings:cash-flow-map","savings:emergency-fund-scenario","savings:investment-pressure","savings:emergency-buffer-scenarios","time:field-rest","languages:phrase-retrieval-loop","communication:clarifying-questions-before-advice","career:proof-driven-portfolio","career:resume-role-matching","science:measurement-and-uncertainty","relationships:boundary-request-and-response","shadow:consent-and-digital-boundaries"];
const reasons=["laws:ph-data-rights","business:unit-economics","business:contribution-margin-scenario","time:priorities","time:focus","languages:chunks","languages:conversation","communication:listen","communication:boundaries","communication:conflict","thinking:causation","thinking:arguments","digital:ai","career:portfolio","science:probability","relationships:trust","relationships:wellbeing","shadow:manipulation","shadow:mind-games","shadow:sex-consent"];
test('twenty-three previously brief lessons now have substantive worked examples',()=>{
 assert.equal(cases.length,23);
 for(const key of cases){
  const [courseId,lessonId]=key.split(':');
  const item=findLesson(courseId,lessonId);
  assert.ok(item,'missing '+key);
  assert.ok(item.example.length>=170,'worked example still too brief '+key);
  assert.ok(!item.example.includes('<script>'),'examples must not include HTML');
 }
});
test('twenty short answer rationales now give clearer subject-specific reasoning',()=>{
 assert.equal(reasons.length,20);
 for(const key of reasons){
  const [courseId,lessonId]=key.split(':');
  const item=findLesson(courseId,lessonId);
  assert.ok(item);
  assert.ok(item.quiz.explanation.length>=50,'quiz explanation still too brief '+key);
  assert.ok(item.quiz.options[item.quiz.correct].length>0);
 }
});
test('offline course identities and original mastering assessments remain unchanged',()=>{
 for(const [courseId,lessons] of Object.entries(DEEP_TRACKS))for(const l of lessons)assert.equal(findLesson(courseId,l.id),l);
 for(const [courseId,lessons] of Object.entries(MASTERY_TRACKS))for(const l of lessons)assert.equal(findLesson(courseId,l.id),l);
 for(const [courseId,lessons] of Object.entries(LIFE_PRACTICE))for(const l of lessons)assert.equal(findLesson(courseId,l.id),l);
 const audit=auditCurriculum(COURSES);
 assert.equal(audit.valid,true);
 assert.equal(audit.totals.workedExamples,139);
 assert.equal(audit.totals.answerRationales,139);
});
