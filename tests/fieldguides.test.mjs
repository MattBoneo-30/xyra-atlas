import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';import {FIELD_GUIDES,FIELD_GUIDE_COUNT} from '../fieldguides.js';
test('twelve substantial field guides integrate into four existing subjects',()=>{
 assert.equal(FIELD_GUIDE_COUNT,12);assert.ok(totalLessons>=88,'existing curriculum preserved as new tracks are added');
 assert.deepEqual(Object.keys(FIELD_GUIDES).sort(),['career','communication','digital','thinking']);
 for(const [cid,lessons] of Object.entries(FIELD_GUIDES)){assert.equal(lessons.length,3);
  assert.ok(COURSES.some(c=>c.id===cid&&!c.dark));
  for(const l of lessons){assert.equal(findLesson(cid,l.id),l);assert.equal(l.sections.length,3);
   assert.ok(l.sections.every(s=>s.body.length>90));assert.ok(l.example.length>65);assert.ok(l.task.length>65);
   assert.ok(l.quiz.options.length>=3&&l.quiz.correct>=0&&l.quiz.correct<l.quiz.options.length);
   assert.ok(l.sources.every(s=>s.url.startsWith('https://')));
  }
 }
});
test('new guides are cached, built, and searchable offline',()=>{
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8'),source=fs.readFileSync('data.js','utf8');
 assert.match(source,/FIELD_GUIDES\[entry.id\]/);assert.match(sw,/\/fieldguides\.js/);assert.match(build,/'fieldguides\.js'/);
});
