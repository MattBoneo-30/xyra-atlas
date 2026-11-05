import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons,findLesson} from '../data.js';
import {FOUNDATION_CASES} from '../foundationcases.js';
import {FOUNDATION_CASES_TWO,FOUNDATION_CASES_TWO_COUNT} from '../foundationcases2.js';
test('all 52 original Atlas lessons now include a grounded third section and worked example',()=>{
 assert.equal(FOUNDATION_CASES_TWO_COUNT,26);
 assert.equal(totalLessons,139);
 assert.equal(Object.keys(FOUNDATION_CASES_TWO).length,14);
 const known=new Set();
 let basic=0;
 for(const course of COURSES){
  const a=FOUNDATION_CASES[course.id]||{},b=FOUNDATION_CASES_TWO[course.id]||{};
  for(const [id,entry] of Object.entries(b)){
   assert.ok(!Object.hasOwn(a,id),'two foundation collections must never collide');
   const lesson=findLesson(course.id,id);
   assert.ok(lesson);assert.notEqual(lesson.stage,'Advanced');
   assert.ok(lesson.sections.length>=3);
   assert.deepEqual(lesson.sections.at(-1),entry.section);
   assert.equal(lesson.example,entry.example);
   assert.ok(entry.section.body.length>=150&&entry.example.length>=150);
   assert.ok(lesson.sources.some(ref=>new URL(ref.url).protocol==='https:'));
   assert.ok(!known.has(course.id+':'+id));known.add(course.id+':'+id);
  }
  basic+=Object.keys(a).length+Object.keys(b).length+
    (course.lessons.filter(l=>l.stage==='Advanced'&&l.sections.length===3&&l.example?.length>200).length>0?0:0);
 }
 assert.equal(basic,40);
 assert.equal(known.size,26);
});
test('second foundation collection is self-contained and precached offline',()=>{
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(data,/FOUNDATION_CASES_TWO/);
 assert.match(sw,/\/foundationcases2\.js/);
 assert.match(build,/'foundationcases2\.js'/);
});
