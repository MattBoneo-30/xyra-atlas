import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {createExam,currentExamQuestion,answerExam,advanceExam} from '../exam.js';
import {EXAM_HISTORY_LIMIT,normalizeExamHistory,recordExamHistory,examHistoryInsights} from '../examhistory.js';

function finish({courseId='all',size=5,seed=11,missFirst=true}={}){
 let state=createExam(COURSES,{courseId,size,seed});
 while(state.position<state.ids.length){
  const q=currentExamQuestion(state,COURSES);
  const chosen=missFirst&&state.position===0?(q.correct+1)%q.options.length:q.correct;
  state=advanceExam(answerExam(state,chosen,COURSES),COURSES);
 }
 return state;
}
test('only completed exams become history and repeated recording is idempotent',()=>{
 const unfinished=createExam(COURSES,{size:5});
 assert.deepEqual(recordExamHistory([],unfinished,COURSES),[]);
 const completed=finish({courseId:'psychology'});
 const saved=recordExamHistory([],completed,COURSES,1730000000000);
 assert.equal(saved.length,1);
 assert.equal(saved[0].total,5);
 assert.equal(saved[0].correct,4);
 assert.equal(saved[0].areas.length,1);
 assert.equal(saved[0].areas[0].courseId,'psychology');
 assert.equal(saved[0].missed.length,1);
 assert.ok(saved[0].missed[0].startsWith('psychology:'));
 assert.deepEqual(recordExamHistory(saved,completed,COURSES,1730000001000),saved);
 assert.deepEqual(normalizeExamHistory(JSON.parse(JSON.stringify(saved)),COURSES),saved);
});
test('history produces actionable strengths and misses without exposing mature lessons',()=>{
 const finished=finish({size:10,seed:15});
 const records=recordExamHistory([],finished,COURSES,1730000000000);
 const insights=examHistoryInsights(records,COURSES);
 assert.equal(insights.attempts,1);
 assert.equal(insights.total,10);
 assert.equal(insights.correct,9);
 assert.equal(insights.percent,90);
 assert.equal(insights.subjects.reduce((n,a)=>n+a.total,0),10);
 assert.equal(insights.focus.length,1);
 assert.equal(insights.focus[0].count,1);
 assert.ok(insights.focus[0].lessonId);
 assert.ok(insights.focus.every(q=>q.courseId!=='shadow'));
 assert.deepEqual(examHistoryInsights([],COURSES).subjects,[]);
});
test('invalid imported summaries, forged mature IDs and inconsistent counts are rejected',()=>{
 const result=recordExamHistory([],finish({courseId:'psychology'}),COURSES,1730000000000)[0];
 const invalids=[
  {...result,correct:20},
  {...result,id:'broken-id'},
  {...result,endedAt:'not a date'},
  {...result,areas:[{...result.areas[0],correct:5}]},
  {...result,missed:['shadow:coercion']},
  {...result,missed:['nonsense:lesson']},
  {...result,missed:[result.missed[0],result.missed[0]]},
  {...result,areas:[...result.areas,result.areas[0]]},
  {...result,areas:[{...result.areas[0],courseId:'shadow'}]},
  {...result,areas:[{...result.areas[0],total:0}]}
 ];
 assert.deepEqual(normalizeExamHistory(invalids,COURSES),[]);
 assert.deepEqual(normalizeExamHistory([result,result],COURSES),[result]);
 assert.deepEqual(normalizeExamHistory({},COURSES),[]);
});
test('history retains at most twelve self-contained summaries in latest-first order',()=>{
 const base=finish({courseId:'business',seed:32});
 let history=[];
 for(let i=0;i<EXAM_HISTORY_LIMIT+3;i++){
  history=recordExamHistory(history,{...base,startedAt:1730000000000+i},COURSES,1730000001000+i);
 }
 assert.equal(history.length,EXAM_HISTORY_LIMIT);
 assert.ok(history[0].id.startsWith('1730000000014:'));
 assert.ok(!JSON.stringify(history).includes('"responses"'));
 assert.ok(!JSON.stringify(history).includes('"answers"'));
});
test('history is connected to offline app shell, persisted state and backup normalization',()=>{
 const app=fs.readFileSync('app.js','utf8'),
  sw=fs.readFileSync('sw.js','utf8'),
  build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/from '\.\/examhistory\.js'/);
 assert.match(app,/examHistory:normalizeExamHistory\(data\.examHistory,COURSES\)/);
 assert.match(app,/examHistory:normalizeExamHistory\(clean\.examHistory,COURSES\)/);
 assert.match(sw,/\/examhistory\.js/);
 assert.match(build,/'examhistory\.js'/);
});
