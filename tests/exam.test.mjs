import test from 'node:test';
import assert from 'node:assert/strict';
import {COURSES} from '../data.js';
import {EXAM_SIZES,examPool,createExam,normalizeExam,currentExamQuestion,answerExam,advanceExam,examResults} from '../exam.js';

test('practice exams include valid lesson quizzes but never mature-content questions',()=>{
 const pool=examPool(COURSES);
 assert.ok(pool.length>=50);
 assert.ok(!pool.some(q=>q.courseId==='shadow'));
 assert.ok(examPool(COURSES,{courseId:'shadow'}).length===0);
 assert.ok(examPool(COURSES,{courseId:'psychology'}).every(q=>q.courseId==='psychology'));
 assert.deepEqual(EXAM_SIZES,[5,10,20]);
});
test('exam generation is seeded, unique, limited, and scoped to selected subject',()=>{
 const a=createExam(COURSES,{size:10,seed:17});
 const b=createExam(COURSES,{size:10,seed:17});
 assert.deepEqual(a.ids,b.ids);
 assert.equal(a.ids.length,10);
 assert.equal(new Set(a.ids).size,a.ids.length);
 assert.ok(a.ids.every(id=>!id.startsWith('shadow:')));
 const subject=createExam(COURSES,{size:20,courseId:'psychology',seed:17});
 assert.ok(subject.ids.length>0&&subject.ids.length<=20);
 assert.ok(subject.ids.every(id=>id.startsWith('psychology:')));
});
test('exam questions cannot be skipped, changed after answering, or marked complete before finishing',()=>{
 const session=createExam(COURSES,{size:5,seed:12});
 assert.equal(advanceExam(session,COURSES).position,0);
 const q=currentExamQuestion(session,COURSES);
 assert.equal(answerExam(session,-1,COURSES).responses[q.id],undefined);
 const answered=answerExam(session,q.correct,COURSES);
 assert.equal(answerExam(answered,(q.correct+1)%q.options.length,COURSES).responses[q.id],q.correct);
 assert.equal(examResults(answered,COURSES).correct,1);
 let state=advanceExam(answered,COURSES);
 assert.equal(state.position,1);
 while(state.position<state.ids.length){
  const next=currentExamQuestion(state,COURSES);
  state=advanceExam(answerExam(state,next.correct,COURSES),COURSES);
 }
 assert.equal(examResults(state,COURSES).done,true);
 assert.equal(examResults(state,COURSES).correct,5);
 assert.equal(examResults(state,COURSES).answered,5);
 assert.equal(currentExamQuestion(state,COURSES),null);
});
test('unfinished exams survive JSON round-trips; tampered or mature IDs are rejected',()=>{
 let session=createExam(COURSES,{size:5,seed:42});
 const q=currentExamQuestion(session,COURSES);
 session=answerExam(session,(q.correct+1)%q.options.length,COURSES);
 const resumed=normalizeExam(JSON.parse(JSON.stringify(session)),COURSES);
 assert.equal(resumed.responses[q.id],session.responses[q.id]);
 assert.equal(examResults(resumed,COURSES).correct,0);
 assert.equal(normalizeExam({...session,ids:['shadow:secret']},COURSES),null);
 assert.equal(normalizeExam({...session,ids:[session.ids[0],session.ids[0]]},COURSES),null);
 assert.equal(normalizeExam({...session,responses:{...session.responses,'fake:lesson':1}},COURSES),null);
 assert.equal(normalizeExam({...session,position:5},COURSES),null);
 assert.equal(normalizeExam({...session,responses:{[q.id]:99}},COURSES),null);
});
test('offline practice module is included in built app and precache source',async()=>{
 const fs=await import('node:fs');
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/exam\.js'/);
 assert.match(app,/exam:examPage/);
 assert.match(sw,/\/exam\.js/);
 assert.match(build,/'exam\.js'/);
});
