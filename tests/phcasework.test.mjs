import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {PH_CASEWORK,PH_CASEWORK_COUNT} from '../phcasework.js';
test('three substantial advanced Philippine case studies include trusted agency references',()=>{
 assert.equal(PH_CASEWORK_COUNT,3);
 assert.equal(totalLessons,134);
 const known=new Set(),domains=new Set();
 for(const item of PH_CASEWORK.laws){
  assert.equal(item.stage,'Advanced');assert.ok(item.intro.length>100);
  assert.ok(!known.has(item.id));known.add(item.id);
  assert.equal(findLesson('laws',item.id),item);
  assert.equal(item.sections.length,3);
  assert.ok(item.sections.every(s=>s.heading.length>10&&s.body.length>170));
  assert.ok(item.example.length>150&&item.task.length>145);
  assert.equal(item.quiz.options.length,3);
  assert.ok(item.quiz.correct>=0&&item.quiz.correct<=2);
  assert.ok(item.quiz.explanation.length>80);
  for(const ref of item.sources){const u=new URL(ref.url);assert.equal(u.protocol,'https:');domains.add(u.hostname);}
 }
 assert.ok(domains.has('privacy.gov.ph')&&domains.has('www.bsp.gov.ph')&&domains.has('fairtrade.dti.gov.ph'));
 assert.equal(COURSES.length,14);
});
test('Philippine casework ships in both build and offline precache',()=>{
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(data,/PH_CASEWORK\[entry\.id\]/);
 assert.match(sw,/\/phcasework\.js/);
 assert.match(build,/'phcasework\.js'/);
});
