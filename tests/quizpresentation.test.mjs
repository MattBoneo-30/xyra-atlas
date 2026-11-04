import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {orderedQuizOptions} from '../reader.js';

test('all lesson answer options have stable unique presentation, original indices intact',()=>{
 const positions=new Set();
 for(const course of COURSES)for(const lesson of course.lessons){
  const quiz=lesson.quiz,key=course.id+':'+lesson.id;
  const displayed=orderedQuizOptions(quiz,key);
  assert.deepEqual(displayed,orderedQuizOptions(quiz,key));
  assert.equal(displayed.length,quiz.options.length);
  assert.deepEqual(new Set(displayed.map(x=>x.sourceIndex)),
   new Set(quiz.options.map((_,i)=>i)));
  assert.notDeepEqual(displayed.map(x=>x.sourceIndex),quiz.options.map((_,i)=>i));
  assert.deepEqual(displayed.map(x=>x.text).sort(),[...quiz.options].sort());
  const correct=displayed.findIndex(x=>x.sourceIndex===quiz.correct);
  assert.ok(correct>=0);
  assert.equal(displayed[correct].text,quiz.options[quiz.correct]);
  positions.add(correct);
 }
 assert.ok(positions.size>=3,'answer locations should vary between questions');
});
test('invalid input cannot change authored options',()=>{
 assert.deepEqual(orderedQuizOptions(null,'sample:a'),[]);
 assert.deepEqual(orderedQuizOptions({options:['A']},'sample:a'),[]);
 assert.deepEqual(orderedQuizOptions({options:['A','B']},''),[]);
 const q={options:['A','B','C'],correct:1},backup=structuredClone(q);
 const result=orderedQuizOptions(q,'sample:a');
 result[0].sourceIndex=1000;
 assert.deepEqual(q,backup);
});
test('lesson view stores canonical indices and restores keyboard focus to answer feedback',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/orderedQuizOptions\(l\.quiz,key\)/);
 assert.match(app,/data-index="\$\{sourceIndex\}"/);
 assert.match(app,/String\.fromCharCode\(65\+displayIndex\)/);
 assert.match(app,/saved\.answers\[key\]=choice/);
 assert.match(app,/id="lesson-quiz-feedback" tabindex="-1" role="status"/);
 assert.match(app,/document\.getElementById\('lesson-quiz-feedback'\)\?\.focus/);
 assert.match(fs.readFileSync('sw.js','utf8'),/\/reader\.js/);
 const stage=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(stage.gates[0].complete,false);
});
