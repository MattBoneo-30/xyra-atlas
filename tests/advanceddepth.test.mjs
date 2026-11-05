import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons,findLesson} from '../data.js';
import {ADVANCED_DEPTH,deepenAdvancedLessons} from '../advanceddepth.js';
import {auditCurriculum} from '../curriculumaudit.js';

test('all 14 subjects teach advanced concepts, reasoning and a worked answer',()=>{
 assert.equal(Object.keys(ADVANCED_DEPTH).length,14);
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139,'advanced learning must not invent lesson identities');
 for(const course of COURSES){
  const entry=ADVANCED_DEPTH[course.id];
  assert.ok(entry,course.id+' is missing advanced authoring');
  const lesson=findLesson(course.id,entry.id);
  assert.ok(lesson,course.id+' has no corresponding advanced lesson');
  assert.equal(lesson.stage,'Advanced',course.id+' lesson should actually be advanced');
  assert.equal(lesson.advancedDepth,'case-and-counterexample-2026');
  assert.equal(lesson.deepTitle,entry.title);
  assert.equal(lesson.deepSections.length,4,'four independent explanations are required');
  for(const section of lesson.deepSections){
   assert.ok(section.heading.length>12,course.id+' needs an actual concept name');
   assert.ok(section.body.length>=320,course.id+' has a shallow advanced explanation');
  }
  assert.ok(lesson.deepExample.length>=430,'the case needs detailed reasoning');
  assert.ok(lesson.deepTask.length>=310,'the exercise needs real independent work');
  assert.ok(lesson.deepModelAnswer.length>=350,'a model answer needs a traceable resolution');
  assert.equal(lesson.deepRubric.length,4);
  assert.equal(lesson.flow.steps.length,4,'a four-step reasoning flow is required');
  assert.ok(lesson.sections.length>=3,'the original advanced teaching must remain');
  assert.equal(lesson.quiz.options.length,3,'original answer options stay unchanged');
  assert.ok(lesson.sources.length>=1,'prior further reading must remain');
  assert.equal(lesson.minutes,21,'existing shorter study-plan estimate must stay intact');
 }
});

test('advanced cases include real calculations, disciplines, boundary conditions and evidence',()=>{
 const entry=id=>findLesson(id,ADVANCED_DEPTH[id].id);
 assert.match(entry('thinking').deepSections.map(x=>x.body).join(' '),/Simpson.s paradox/i);
 assert.match(entry('thinking').deepModelAnswer,/33\/50=66 percent/);
 assert.match(entry('business').deepModelAnswer,/49 whole units/);
 assert.match(entry('savings').deepModelAnswer,/₱5,000 shortfall/);
 assert.match(entry('time').deepModelAnswer,/13-day critical path/);
 assert.match(entry('science').deepSections.map(x=>x.body).join(' '),/Moon phases|Moon's illuminated/);
 assert.match(entry('languages').deepSections.map(x=>x.body).join(' '),/きって/);
 assert.match(entry('psychology').deepTask,/hypothesis/i);
 assert.match(entry('digital').deepSections.map(x=>x.body).join(' '),/NIST SP 800-63B/);
 assert.match(entry('career').deepTask,/Laravel/);
 assert.match(entry('relationships').deepTask,/coercive case/i);
 assert.match(entry('negotiation').deepModelAnswer,/₱457 per hour/);
 assert.match(entry('shadow').deepTask,/coercion|coercive/);
});

test('current authoritative sources supplement existing reference inventories',()=>{
 const refs=id=>findLesson(id,ADVANCED_DEPTH[id].id).sources.map(s=>s.url);
 assert.ok(refs('laws').includes('https://privacy.gov.ph/right-to-access/'));
 assert.ok(refs('digital').includes('https://pages.nist.gov/800-63-4/sp800-63b.html'));
 assert.ok(refs('science').includes('https://science.nasa.gov/moon/moon-phases/'));
});
test('advanced lessons, worked resolutions and evidence are in PWA, narration and review packet',()=>{
 const read=path=>fs.readFileSync(path,'utf8');
 const report=auditCurriculum(COURSES);
 assert.equal(report.valid,true);
 for(const asset of ['advanceddepth.js','advancedcases1.js','advancedcases2.js']){
  assert.ok(read('sw.js').includes('/'+asset),'offline cache missing '+asset);
  assert.ok(read('scripts/build.mjs').includes("'"+asset+"'"),'build missing '+asset);
 }
 assert.match(read('app.js'),/deep-model-answer/);
 assert.match(read('app.js'),/deepModelAnswer/);
 assert.match(read('narration.js'),/lesson.deepModelAnswer/);
 assert.match(read('scripts/editorial-review-packet.mjs'),/modelResponse:lesson.deepModelAnswer/);
 assert.equal(JSON.parse(read('docs/stage-gates.json')).gates[0].complete,false,
  'authoring new material must never mark the external reviewer gate complete');
 assert.throws(()=>deepenAdvancedLessons(null),/Expected Atlas course list/);
});
