import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS,getClinic,normalizeClinicAnswers,answerClinic,clinicStats,resetClinic} from '../clinics.js';
test('every subject has two distinct contextual challenges with explanations and references',()=>{
 assert.equal(COURSES.length,14);
 assert.deepEqual(new Set(Object.keys(CLINICS)),new Set(COURSES.map(c=>c.id)));
 const prompts=new Set();
 for(const course of COURSES){
  const clinic=getClinic(course.id);
  assert.ok(clinic);
  assert.equal(clinic.questions.length,2);
  assert.ok(clinic.intro.length>75);
  assert.ok(clinic.references.length>0);
  for(const ref of clinic.references){
   const url=new URL(ref.url);assert.equal(url.protocol,'https:');
   assert.ok(ref.label.length>10);
  }
  for(const q of clinic.questions){
   assert.ok(q.prompt.length>60);
   assert.ok(q.explanation.length>70);
   assert.equal(q.options.length,3);
   assert.ok(q.options.every(s=>s.length>25));
   assert.ok(Number.isInteger(q.correct)&&q.correct>=0&&q.correct<3);
   assert.ok(!prompts.has(q.prompt));prompts.add(q.prompt);
  }
 }
 assert.equal(prompts.size,28);
});
test('offline response grading is first-answer locked and does not mutate unrelated study data',()=>{
 let answers={};
 for(const [courseId,clinic] of Object.entries(CLINICS)){
  for(const q of clinic.questions){
   answers=answerClinic(answers,courseId,q.id,q.correct);
   answers=answerClinic(answers,courseId,q.id,(q.correct+1)%q.options.length);
  }
  const stats=clinicStats(answers,courseId);
  assert.deepEqual(stats,{answered:2,correct:2,total:2,done:true});
 }
 assert.equal(Object.keys(answers).length,28);
 const old={...answers};
 answers=resetClinic(answers,'laws');
 assert.equal(clinicStats(answers,'laws').answered,0);
 assert.equal(clinicStats(answers,'thinking').correct,2);
 assert.equal(clinicStats(old,'laws').correct,2,'reset never mutates old state');
 assert.equal(getClinic('bogus'),null);
});
test('untrusted backup values and forged keys are rejected without prototype pollution',()=>{
 const x=normalizeClinicAnswers({'laws:decision-1':1,'laws:decision-2':'2','nope:decision-1':0,
   'psychology:decision-1':99,'__proto__':3});
 assert.equal(x['laws:decision-1'],1);
 assert.equal(Object.keys(x).length,1);
 assert.equal(Object.getPrototypeOf(x),Object.prototype);
 assert.deepEqual(normalizeClinicAnswers([]),{});
 assert.deepEqual(normalizeClinicAnswers(null),{});
 assert.deepEqual(answerClinic({},'unknown','decision-1',2),{});
 assert.deepEqual(answerClinic({},'laws','decision-1',-1),{});
});
test('clinics are integrated into the locally backed learner and offline package',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const controls=fs.readFileSync('datacontrols.js','utf8');
 assert.match(app,/clinicPanel\(c\)/);
 assert.match(app,/action==='clinic-answer'/);
 assert.match(app,/clinicAnswers:normalizeClinicAnswers\(clean\.clinicAnswers\)/);
 assert.match(controls,/'clinicAnswers'/);
 assert.match(sw,/\/clinics\.js/);
 assert.match(build,/'clinics\.js'/);
});
