import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {COURSES} from '../data.js';import {SCENARIOS} from '../scenarios.js';import {createDailyQuest,dailyQuestProgress} from '../dailyquest.js';
test('daily quest is stable, varied and excludes the mature library',()=>{for(const date of ['2026-11-03','2026-11-04','2026-11-05']){const q=createDailyQuest(COURSES,SCENARIOS,date);assert.equal(q.tasks.length,3);assert.equal(q.tasks.filter(t=>t.type==='lesson').length,2);assert.equal(q.tasks.filter(t=>t.type==='scenario').length,1);assert.ok(q.tasks.every(t=>t.type!=='lesson'||t.courseId!=='shadow'));assert.notEqual(q.tasks[0].courseId,q.tasks[1].courseId);assert.deepEqual(createDailyQuest(COURSES,SCENARIOS,date),q);}});
test('progress follows quiz and scenario answers without a separate fragile state',()=>{const q=createDailyQuest(COURSES,SCENARIOS,'2026-11-03');const t=q.tasks;assert.deepEqual(dailyQuestProgress(q,[],{},SCENARIOS),{done:0,total:3});assert.deepEqual(dailyQuestProgress(q,[t[0].courseId+':'+t[0].lessonId],{[t[2].id]:1},SCENARIOS),{done:2,total:3});});
test('page, route and offline build include Daily Quest',()=>{const a=fs.readFileSync('app.js','utf8');assert.match(a,/function questPage\(/);assert.match(a,/quest:questPage/);assert.match(fs.readFileSync('scripts/build.mjs','utf8'),/'dailyquest\.js'/);assert.match(fs.readFileSync('sw.js','utf8'),/\/dailyquest\.js/);});

test('malformed or unsupported answer indices never fabricate daily challenge progress',()=>{
 const q=createDailyQuest(COURSES,SCENARIOS,'2026-11-03');
 const id=q.tasks.find(t=>t.type==='scenario').id;
 for(const answer of [-1,999,1.5,'1',null]){
  assert.deepEqual(dailyQuestProgress(q,[],{[id]:answer},SCENARIOS),{done:0,total:3});
 }
 assert.deepEqual(dailyQuestProgress(q,[],{[id]:1},[]),{done:0,total:3},'unknown metadata is never accepted');
 assert.deepEqual(dailyQuestProgress({tasks:[{type:'unknown',id}]},[],{[id]:1},SCENARIOS),{done:0,total:1});
 assert.deepEqual(dailyQuestProgress({tasks:null},[],{},SCENARIOS),{done:0,total:0});
 assert.deepEqual(dailyQuestProgress(null,[],{},SCENARIOS),{done:0,total:0});
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/dailyQuestProgress\(q,saved.completed,saved.scenarios,SCENARIOS\)/);
});
