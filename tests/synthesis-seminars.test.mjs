import test from 'node:test';
import assert from 'node:assert/strict';
import {SYNTHESIS_SEMINARS,SYNTHESIS_SEMINAR_COUNT,validateSynthesisSeminars,synthesisSeminarPanel} from '../synthesisseminars.js';
import {DECISION_REVISIONS,decisionRevisionPanel} from '../decisionrevisions.js';
import {COURSES} from '../data.js';

test('all fourteen course worlds have distinct deep seminars',()=>{
 const ids=COURSES.map(course=>course.id);
 assert.equal(SYNTHESIS_SEMINAR_COUNT,14);
 assert.equal(validateSynthesisSeminars(ids),true);
 for(const course of COURSES){
  const seminar=SYNTHESIS_SEMINARS[course.id];
  assert.equal(seminar.lenses.length,3);
  assert.match(seminar.transfer,/\S/);
  assert.ok(course.lessons.some(lesson=>lesson.stage==='Intermediate'&&lesson.decisionRevision));
 }
});

test('each intermediate decision revision exposes a deep synthesis activity',()=>{
 for(const course of COURSES){
  const revision=course.lessons.find(lesson=>lesson.decisionRevision)?.decisionRevision;
  assert.ok(revision,'Missing revision '+course.id);
  const html=decisionRevisionPanel(revision);
  assert.match(html,/class="synthesis-seminar"/);
  assert.match(html,/Reveal one worked explanation/);
  assert.match(html,/Independent work/);
  assert.match(html,/Not graded/);
  assert.ok(html.includes(SYNTHESIS_SEMINARS[course.id].title));
 }
});

test('seminar rendering escapes HTML-like text',()=>{
 const seminar=SYNTHESIS_SEMINARS.psychology;
 const html=synthesisSeminarPanel({...seminar,thesis:'<img src=x onerror=alert(1)>'});
 assert.ok(!html.includes('<img'));
 assert.ok(html.includes('&lt;img'));
});

test('new seminars do not alter published lesson count or IDs',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(COURSES.reduce((total,course)=>total+course.lessons.length,0),139);
 assert.equal(Object.keys(DECISION_REVISIONS).length,14);
});
