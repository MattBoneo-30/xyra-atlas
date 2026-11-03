import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons,findLesson,findCourse} from '../data.js';
import {CAPSTONE_LABS,CAPSTONE_LAB_COUNT} from '../capstonelabs.js';
import {examPool} from '../exam.js';

test('every subject has one distinct applied capstone and all original lessons and casework remain accessible',()=>{
 assert.equal(CAPSTONE_LAB_COUNT,14);
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,134);
 assert.deepEqual(new Set(Object.keys(CAPSTONE_LABS)),new Set(COURSES.map(c=>c.id)));
 for(const course of COURSES){
  const labs=CAPSTONE_LABS[course.id];
  assert.equal(labs.length,1,'exactly one new applied case per subject: '+course.id);
  assert.strictEqual(findLesson(course.id,labs[0].id),labs[0]);
  assert.equal(labs[0].isCapstone,true);
  assert.equal(labs[0].stage,'Advanced');
  const allIds=course.lessons.map(l=>l.id);
  assert.equal(new Set(allIds).size,allIds.length,'no duplicated lesson ID in '+course.id);
 }
 assert.equal(findCourse('shadow').dark,true);
 assert.ok(!examPool(COURSES).some(q=>q.courseId==='shadow'),'mature course stays excluded from general exams');
});
test('case-based pedagogy has substantial explanations, specific worked examples and self-check rubrics',()=>{
 const sources=new Set(),distinctTasks=new Set(),distinctPrompts=new Set();
 for(const [courseId,labs] of Object.entries(CAPSTONE_LABS)){
  const lesson=labs[0],key=courseId+'/'+lesson.id;
  assert.match(lesson.id,/^case-[a-z0-9-]+$/);
  assert.ok(lesson.title.length>=30,key+' title');
  assert.ok(lesson.intro.length>=90,key+' learning objective');
  assert.ok(lesson.minutes>=15&&lesson.minutes<=45);
  assert.equal(lesson.sections.length,3,key+' learning structure');
  for(const section of lesson.sections){
   assert.ok(section.heading.length>=12,key+' section heading');
   assert.ok(section.body.length>=130,key+' serious explanations');
  }
  assert.ok(lesson.example.length>=90,key+' worked scenario');
  assert.ok(lesson.task.length>=90,key+' concrete exercise');
  assert.ok(!distinctTasks.has(lesson.task),key+' task must be original');
  distinctTasks.add(lesson.task);
  assert.equal(lesson.rubric.length,3,key+' self-check count');
  assert.ok(lesson.rubric.every(line=>line.length>=45),key+' actionable rubric');
  assert.equal(new Set(lesson.rubric).size,3,key+' rubric distinct');
  assert.equal(lesson.quiz.options.length,3,key+' three answer choices');
  assert.ok(Number.isInteger(lesson.quiz.correct)&&lesson.quiz.correct>=0&&lesson.quiz.correct<3);
  assert.ok(lesson.quiz.explanation.length>=45,key+' correct-answer explanation');
  assert.ok(!distinctPrompts.has(lesson.quiz.question),key+' unique check');
  distinctPrompts.add(lesson.quiz.question);
  assert.equal(lesson.sources.length,1,key+' source');
  for(const source of lesson.sources){
   const url=new URL(source.url);
   assert.equal(url.protocol,'https:');
   assert.ok(source.label.trim().length>=12,key+' meaningful source label');
   sources.add(url.hostname);
  }
 }
 assert.ok(sources.has('privacy.gov.ph'),'PH privacy example cites the NPC');
 assert.ok(sources.has('pages.nist.gov'),'account-recovery example cites NIST');
 assert.ok(sources.has('www.cdc.gov'),'safety material cites CDC');
});
test('capstone lessons are integrated in reader and bundled for offline learning',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const data=fs.readFileSync('data.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(data,/CAPSTONE_LABS\[entry\.id\]/);
 assert.match(app,/class="capstone-rubric"/);
 assert.match(app,/l\.rubric/);
 assert.match(sw,/\/capstonelabs\.js/);
 assert.match(build,/'capstonelabs\.js'/);
});
