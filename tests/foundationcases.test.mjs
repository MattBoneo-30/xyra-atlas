import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {FOUNDATION_CASES,FOUNDATION_CASE_COUNT} from '../foundationcases.js';
test('14 introductory or intermediate subjects receive substantive applied case examples',()=>{
 assert.equal(FOUNDATION_CASE_COUNT,14);
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139);
 assert.deepEqual(new Set(Object.keys(FOUNDATION_CASES)),new Set(COURSES.map(c=>c.id)));
 const examples=new Set();
 for(const [id,records] of Object.entries(FOUNDATION_CASES)){
  assert.equal(Object.keys(records).length,1,id);
  for(const [lessonId,addition] of Object.entries(records)){
   const lesson=findLesson(id,lessonId);
   assert.ok(lesson,id+':'+lessonId);
   assert.notEqual(lesson.stage,'Advanced');
   assert.equal(lesson.sections.length,3);
   assert.deepEqual(lesson.sections[2],addition.section);
   assert.equal(lesson.example,addition.example);
   assert.ok(addition.section.body.length>=260);
   assert.ok(addition.example.length>=235);
   assert.ok(!examples.has(lesson.example));
   examples.add(lesson.example);
   for(const ref of lesson.sources)assert.equal(new URL(ref.url).protocol,'https:');
  }
 }
 assert.equal(examples.size,14);
});
test('applied foundation examples are available in the offline production build',()=>{
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(path=>fs.readFileSync(path,'utf8'));
 assert.match(data,/FOUNDATION_CASES\[entry\.id\]/);
 assert.match(sw,/\/foundationcases\.js/);
 assert.match(build,/'foundationcases\.js'/);
});
