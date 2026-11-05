import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {ADVANCED_ENRICHMENTS,ADVANCED_ENRICHMENT_COUNT} from '../advancedenrichments.js';
test('twelve original advanced lessons gain distinct applied sections and worked examples',()=>{
 assert.equal(ADVANCED_ENRICHMENT_COUNT,12);
 assert.equal(totalLessons,139);
 const cases=new Set();
 for(const [courseId,records] of Object.entries(ADVANCED_ENRICHMENTS)){
  for(const [lessonId,addition] of Object.entries(records)){
   const lesson=findLesson(courseId,lessonId);
   assert.ok(lesson,courseId+' '+lessonId);
   assert.equal(lesson.stage,'Advanced');
   assert.equal(lesson.sections.length,3);
   assert.deepEqual(lesson.sections[2],addition.section);
   assert.equal(lesson.example,addition.example);
   assert.ok(lesson.sections[2].body.length>300);
   assert.ok(lesson.example.length>250);
   assert.ok(lesson.sources?.length);
   for(const src of lesson.sources){assert.equal(new URL(src.url).protocol,'https:');assert.ok(src.label.length>12);}
   assert.ok(!cases.has(addition.example));
   cases.add(addition.example);
  }
 }
 assert.equal(cases.size,12);
});
test('enrichment is an offline reading improvement, not a new professional certification',()=>{
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(path=>fs.readFileSync(path,'utf8'));
 assert.match(data,/ADVANCED_ENRICHMENTS/);
 assert.match(sw,/\/advancedenrichments\.js/);
 assert.match(build,/'advancedenrichments\.js'/);
 assert.equal(COURSES.find(c=>c.id==='shadow')?.dark,true);
});
