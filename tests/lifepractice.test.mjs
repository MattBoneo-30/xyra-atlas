import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';import {LIFE_PRACTICE,LIFE_PRACTICE_COUNT} from '../lifepractice.js';
test('twelve fully structured field guides extend four practical subjects',()=>{
 assert.equal(LIFE_PRACTICE_COUNT,12);assert.ok(totalLessons>=88,'existing curriculum preserved as new tracks are added');
 assert.deepEqual(Object.keys(LIFE_PRACTICE).sort(),['negotiation','relationships','science','time']);
 for(const [cid,lessons] of Object.entries(LIFE_PRACTICE)){
  assert.equal(lessons.length,3);
  assert.ok(COURSES.some(c=>c.id===cid&&!c.dark));
  for(const l of lessons){
   assert.equal(findLesson(cid,l.id),l);assert.equal(l.sections.length,3);
   assert.ok(l.sections.every(s=>s.body.length>90));assert.ok(l.example.length>65&&l.task.length>65);
   assert.equal(l.quiz.options.length,3);assert.ok(l.quiz.correct>=0&&l.quiz.correct<3);
   assert.ok(l.sources.every(s=>s.url.startsWith('https://')));
  }
 }
});
test('new guides are bundled, precached and visible in offline search',()=>{
 const data=fs.readFileSync('data.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8'),sw=fs.readFileSync('sw.js','utf8');
 assert.match(data,/LIFE_PRACTICE\[entry.id\]/);assert.match(build,/'lifepractice\.js'/);assert.match(sw,/\/lifepractice\.js/);
});
