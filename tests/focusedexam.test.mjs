import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {createExam,currentExamQuestion,answerExam,advanceExam,normalizeExam,examPool} from '../exam.js';
import {recordExamHistory} from '../examhistory.js';
import {focusQuestionPool,createFocusedExam} from '../focusedexam.js';

function attempt({seed=13,startedAt=1730000000000,wrongCount=2,courseId='psychology'}={}){
 let session={...createExam(COURSES,{courseId,size:5,seed}),startedAt};
 while(session.position<session.ids.length){
  const q=currentExamQuestion(session,COURSES),index=session.position;
  const selected=index<wrongCount?(q.correct+1)%q.options.length:q.correct;
  session=advanceExam(answerExam(session,selected,COURSES),COURSES);
 }
 return session;
}
test('focus exams contain only validated, previously missed questions',()=>{
 const original=attempt();
 const history=recordExamHistory([],original,COURSES,1730000001000);
 const focus=createFocusedExam(COURSES,history,{size:5,seed:7,now:1730000002000});
 assert.ok(focus);
 assert.equal(focus.position,0);
 assert.deepEqual(focus.responses,{});
 assert.deepEqual(new Set(focus.ids),new Set(history[0].missed));
 assert.equal(focus.ids.length,2,'never invent filler when only two questions were missed');
 assert.ok(focus.ids.every(key=>key.startsWith('psychology:')));
 assert.deepEqual(normalizeExam(JSON.parse(JSON.stringify(focus)),COURSES),focus);
 assert.ok(focus.ids.every(key=>examPool(COURSES).some(q=>q.id===key)));
});
test('more frequently missed lessons rank ahead of less frequently missed ones',()=>{
 const first=attempt({startedAt:1730000000000,wrongCount:3,seed:17});
 const second=attempt({startedAt:1730000000001,wrongCount:1,seed:17});
 let history=recordExamHistory([],first,COURSES,1730000001000);
 history=recordExamHistory(history,second,COURSES,1730000002000);
 const pool=focusQuestionPool(COURSES,history);
 assert.equal(pool[0].misses,2);
 assert.ok(pool.slice(1).every(item=>item.misses===1));
 const focus=createFocusedExam(COURSES,history,{size:5,seed:2,now:1730000003000});
 assert.equal(focus.ids[0],pool[0].id);
 assert.equal(focus.ids.length,3);
 assert.equal(new Set(focus.ids).size,3);
 const again=createFocusedExam(COURSES,history,{size:5,seed:2,now:1730000003000});
 assert.deepEqual(again,focus,'session is deterministic for a fixed seed and timestamp');
});
test('focused exam respects the selected maximum and retains the standard answer flow',()=>{
 const row=attempt({startedAt:1730000000000,wrongCount:5,seed:25});
 const history=recordExamHistory([],row,COURSES,1730000001000);
 let focused=createFocusedExam(COURSES,history,{size:5,seed:123,now:1730000002000});
 assert.equal(focused.ids.length,5);
 assert.equal(advanceExam(focused,COURSES).position,0,'unanswered questions cannot be skipped');
 const question=currentExamQuestion(focused,COURSES);
 focused=answerExam(focused,question.correct,COURSES);
 assert.equal(advanceExam(focused,COURSES).position,1);
 assert.deepEqual(Object.keys(focused.responses),[question.id]);
});
test('empty, invalid and mature-content histories cannot generate focus exams',()=>{
 assert.equal(createFocusedExam(COURSES,[]),null);
 assert.equal(createFocusedExam(COURSES,[{id:'evil',missed:['shadow:exploit']}]),null);
 const base=recordExamHistory([],attempt({wrongCount:2}),COURSES,1730000001000);
 assert.equal(createFocusedExam(COURSES,base,{size:0}),null);
 assert.equal(createFocusedExam(COURSES,base,{now:Infinity}),null);
 assert.equal(createFocusedExam(COURSES,base,{seed:NaN}),null);
 const forged=base.map(row=>({...row,missed:['shadow:secret','shadow:another']}));
 assert.deepEqual(focusQuestionPool(COURSES,forged),[]);
});
test('focus module is fully wired into production bundle and PWA offline cache',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/focusedexam\.js'/);
 assert.match(app,/exam-focus-start/);
 assert.match(sw,/\/focusedexam\.js/);
 assert.match(build,/'focusedexam\.js'/);
});
