import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons,findLesson} from '../data.js';
import {FOUNDATION_DEPTH_UPGRADES,deepenOriginalFoundations} from '../foundationdepth.js';
import {auditCurriculum} from '../curriculumaudit.js';

const ids=Object.keys(FOUNDATION_DEPTH_UPGRADES);
test('every original subject has an accurately linked, meaningful first learning foundation',()=>{
 assert.equal(ids.length,14);
 assert.equal(new Set(ids).size,14);
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139,'enhancement is not an artificial lesson-count increase');
 for(const course of COURSES){
  const authored=FOUNDATION_DEPTH_UPGRADES[course.id];
  assert.ok(authored,'all courses including the adult literacy library receive depth');
  const lesson=findLesson(course.id,authored.id);
  assert.equal(course.lessons[0],lesson,course.id+' should upgrade its actual first lesson');
  assert.equal(lesson.title,authored.title);
  assert.equal(lesson.foundationalDepth,'concept-first-2026');
  assert.ok(lesson.deepMinutes>=24,'full study estimate must be distinguishable from short study plans');
  assert.equal(lesson.sections.length,3,'existing reviewed foundation/case sections stay intact');
  assert.equal(lesson.deepSections.length,5,'full study adds real teaching without replacing older casework');
  for(const section of authored.sections){
   assert.ok(section.heading.length>=12);
   assert.ok(section.body.length>=340,course.id+': each explanation must teach more than a slogan');
   assert.ok(lesson.deepSections.some(x=>x.heading===section.heading&&x.body===section.body));
  }
  assert.ok(lesson.deepExample.length>=400,'deep case must show real reasoning');
  assert.ok(lesson.deepTask.length>=320,'extended practice must require evidence or application');
  assert.ok(lesson.example.length>100&&lesson.task.length>100,'original authored case and exercise survive');
  assert.equal(lesson.flow.steps.length,4);
  assert.ok(lesson.flow.steps.every(x=>x.label.length>8&&x.detail.length>=45));
  assert.equal(lesson.flow.title,authored.flow.title);
  assert.ok(lesson.quiz&&lesson.quiz.options.length===3,'existing graded question and progress remain intact');
  assert.ok(lesson.sources?.length>=1,'original references are retained, not falsely replaced');
 }
});
test('content covers real disciplinary concepts instead of one-size-fits-all reassurance',()=>{
 const lesson=(course)=>findLesson(course,FOUNDATION_DEPTH_UPGRADES[course].id);
 const psychology=lesson('psychology').deepSections.map(x=>x.body).join(' ');
 assert.match(psychology,/correlational|experiment/i);
 assert.match(psychology,/manipulat|coercion/i);
 const law=lesson('laws').deepSections.map(x=>x.body).join(' ');
 for(const phrase of ['Article III','Article VI','Article VII','Article VIII','Republic Act'])assert.ok(law.includes(phrase),phrase);
 const cash=lesson('savings').deepSections.map(x=>x.body).join(' ');
 assert.match(cash,/₱28,000/);
 assert.match(cash,/₱6,000/);
 assert.match(lesson('science').intro,/Science is an evidence-based/);
 assert.match(lesson('languages').deepExample,/こんにちは/);
 assert.match(lesson('digital').deepSections.map(x=>x.body).join(' '),/authentication/);
 assert.match(lesson('relationships').deepSections.map(x=>x.heading+' '+x.body).join(' '),/coercive control/i);
 assert.match(lesson('shadow').deepTask,/safe boundary|support path/i);
});
test('new foundations preserve structural audit, source inventory and reviewer requirements',()=>{
 const report=auditCurriculum(COURSES);
 assert.equal(report.valid,true);
 assert.equal(report.totals.lessons,139);
 assert.equal(report.totals.lessonsWithEditorialFlags,0);
 const stage=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(stage.gates[0].complete,false,'authoring more material never grants external approval');
 const app=fs.readFileSync('app.js','utf8'),worker=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/\$\{learningFlow\(l\.flow\)\}/);
 assert.match(app,/foundationalDeepStudy\(l\)/);
 assert.match(app,/l\.deepTask/);
 for(const file of ['foundationdepth.js','foundationdepth1.js','foundationdepth2.js']){
  assert.ok(worker.includes('/'+file),'new depth must work offline: '+file);
  assert.ok(build.includes("'"+file+"'"),'new depth must reach build: '+file);
 }
});
test('editorial changes fail loudly if a course foundation becomes disconnected',()=>{
 assert.throws(()=>deepenOriginalFoundations(null),/course list/);
 const fake=[{id:'psychology',lessons:[{id:'wrong',sections:[{},{}],quiz:{}}]}];
 assert.throws(()=>deepenOriginalFoundations(fake),/Missing original lesson/);
});
