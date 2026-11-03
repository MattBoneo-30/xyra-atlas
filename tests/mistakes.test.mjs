import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES} from '../data.js';
import {normalizeMistakes,recordQuizAttempt,buildMistakeQueue} from '../mistakes.js';
const normal=COURSES.find(c=>!c.dark),lesson=normal.lessons[0],key=normal.id+':'+lesson.id;
const wrong=lesson.quiz.options.findIndex((_,i)=>i!==lesson.quiz.correct),correct=lesson.quiz.correct,now=Date.UTC(2026,10,3);
test('mistake queue counts incorrect answers and clears after re-practice',()=>{
 let q=recordQuizAttempt({},COURSES,key,wrong,now);
 assert.equal(q[key].wrong,1);assert.equal(buildMistakeQueue(COURSES,q).length,1);
 q=recordQuizAttempt(q,COURSES,key,wrong,now+1000);assert.equal(q[key].wrong,2);
 q=recordQuizAttempt(q,COURSES,key,correct,now+2000);assert.deepEqual(q,{});
});
test('mistake import rejects unknown keys, impossible answers and invalid dates',()=>{
 assert.deepEqual(normalizeMistakes({'unknown:id':{wrong:1,lastChoice:0,lastWrongAt:new Date(now).toISOString()}},COURSES),{});
 assert.deepEqual(normalizeMistakes({[key]:{wrong:1,lastChoice:correct,lastWrongAt:new Date(now).toISOString()}},COURSES),{});
 assert.deepEqual(normalizeMistakes({[key]:{wrong:2,lastChoice:wrong,lastWrongAt:'invalid'}},COURSES),{});
 assert.deepEqual(recordQuizAttempt({},COURSES,key,999,now),{});
});
test('Shadow Library quiz mistakes stay behind the adult content acknowledgment',()=>{
 const c=COURSES.find(c=>c.dark),l=c.lessons[0],k=c.id+':'+l.id,w=l.quiz.options.findIndex((_,i)=>i!==l.quiz.correct);
 const progress=recordQuizAttempt({},COURSES,k,w,now);
 assert.equal(buildMistakeQueue(COURSES,progress).length,0);
 assert.equal(buildMistakeQueue(COURSES,progress,{includeMature:true}).length,1);
});
test('Mistake Lab route and backup work from offline bundle',()=>{
 const a=fs.readFileSync('app.js','utf8'),s=fs.readFileSync('sw.js','utf8'),b=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(a,/function mistakesPage\(/);assert.match(a,/mistakes:mistakesPage/);
 assert.match(a,/mistakes:normalizeMistakes\(clean.mistakes,COURSES\)/);
 assert.match(a,/mistakes:normalizeMistakes\(data.mistakes,COURSES\)/);
 assert.match(a,/action==='mistake-answer'/);
 assert.match(s,/\/mistakes\.js/);assert.match(b,/'mistakes\.js'/);
});

test('the practice lab includes navigation controls for queues of multiple questions',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/mistakeIndex%questions\.length/);
 assert.match(app,/data-id="next"/);
 assert.match(app,/data-id="prev"/);
 assert.match(app,/action==='mistake-cycle'/);
});
