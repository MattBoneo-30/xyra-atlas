import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {ADVANCED_DECISIONS} from '../advanceddecisions.js';
import {CLINICS,answerClinic,clinicStats,normalizeClinicAnswers,resetClinic} from '../clinics.js';
test('each subject has an advanced, safe, original scenario with robust alternatives',()=>{
 assert.deepEqual(new Set(Object.keys(ADVANCED_DECISIONS)),new Set(COURSES.map(c=>c.id)));
 for(const course of COURSES){
  const q=ADVANCED_DECISIONS[course.id];
  assert.equal(q.stage,'Advanced');
  assert.equal(q.id,'decision-3');
  assert.ok(q.prompt.length>=100&&q.explanation.length>=100);
  assert.equal(q.options.length,3);
  assert.ok(q.options.every(o=>o.length>=45));
  assert.ok(Object.isFrozen(q)&&Object.isFrozen(q.options));
  assert.equal(CLINICS[course.id].questions[2].prompt,q.prompt);
  assert.deepEqual(clinicStats({},course.id),{answered:0,correct:0,total:3,done:false});
  const old={'laws:decision-1':2};
  assert.equal(normalizeClinicAnswers(old)['laws:decision-1'],2);
  const answers=answerClinic(old,course.id,'decision-3',q.correct);
  assert.equal(answers[course.id+':decision-3'],q.correct);
  const next=resetClinic(answers,course.id);
  assert.ok(!Object.hasOwn(next,course.id+':decision-3'));
  if(course.id!=='laws')assert.equal(next['laws:decision-1'],2);
 }
});
test('original scenarios are bundled and available offline',()=>{
 assert.match(fs.readFileSync('clinics.js','utf8'),/ADVANCED_DECISIONS\[id\]/);
 assert.match(fs.readFileSync('sw.js','utf8'),/\/advanceddecisions\.js/);
 assert.match(fs.readFileSync('scripts/build.mjs','utf8'),/'advanceddecisions\.js'/);
});
