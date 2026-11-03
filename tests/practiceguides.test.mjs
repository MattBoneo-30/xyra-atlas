import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {PRACTICE_GUIDES,practiceGuide,practiceGuideCoverage} from '../practiceguides.js';
test('42 distinct evidence-led practice guides support every existing Atlas lesson',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,134);
 assert.deepEqual(new Set(Object.keys(PRACTICE_GUIDES)),new Set(COURSES.map(c=>c.id)));
 const seen=new Set();
 for(const course of COURSES){
  for(const stage of ['Beginner','Intermediate','Advanced']){
   const prompts=practiceGuide(course.id,stage);
   assert.equal(prompts.length,2,course.id+':'+stage);
   for(const line of prompts){
    assert.ok(line.length>=75,course.id+':'+stage+' needs a substantial practice step');
    assert.ok(!/<|>/.test(line),'practice step is untrusted-text safe');
    assert.ok(!seen.has(line),'repeated practice prompts must not be generic filler');
    seen.add(line);
   }
  }
  for(const lesson of course.lessons){
   assert.deepEqual(lesson.practiceGuide,practiceGuide(course.id,lesson.stage));
  }
 }
 assert.equal(seen.size,84);
 assert.deepEqual(practiceGuideCoverage(COURSES),{lessons:134,guided:134});
 assert.equal(practiceGuide('unknown','Beginner'),null);
 assert.equal(practiceGuide('laws','unknown'),null);
});
test('guided practice is additive to lesson-specific task and stays offline',()=>{
 const [app,data,sw,build]=['app.js','data.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(data,/practiceGuide\(entry\.id,item\.stage\)/);
 assert.match(app,/practice-guide-steps/);
 assert.match(app,/esc\(step\)/);
 assert.match(sw,/\/practiceguides\.js/);
 assert.match(build,/'practiceguides\.js'/);
});
