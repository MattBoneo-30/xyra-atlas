import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES } from '../data.js';
import { PATH_GOALS, createLearningPath, normalizeLearningPath, pathProgress } from '../paths.js';
import fs from 'node:fs';

test('seven-day plans use only bundled non-adult lessons and honor a daily time budget',()=>{
  for(const goal of PATH_GOALS){
    for(const minutes of [10,20,30,45]){
      const plan=createLearningPath(COURSES,goal.id,minutes,[],'2026-11-03');
      assert.ok(plan,`${goal.id} ${minutes}`);
      assert.equal(plan.days.length,7);
      const ids=[];
      for(const day of plan.days){
        assert.ok(day.length<=2);
        assert.ok(day.reduce((sum,x)=>sum+x.minutes,0)<=minutes);
        for(const item of day){
          assert.notEqual(item.courseId,'shadow');
          assert.ok(COURSES.find(c=>c.id===item.courseId)?.lessons.some(l=>l.id===item.lessonId));
          ids.push(item.courseId+':'+item.lessonId);
        }
      }
      assert.equal(new Set(ids).size,ids.length);
      assert.deepEqual(normalizeLearningPath(plan,COURSES),plan);
    }
  }
});

test('completed lessons are excluded from newly created plans; progress updates without rebuilding',()=>{
  const created=createLearningPath(COURSES,'money',20,[],'2026-11-03');
  const first=created.days.flat()[0];
  const key=first.courseId+':'+first.lessonId;
  assert.equal(pathProgress(created,[]).done,0);
  assert.equal(pathProgress(created,[key]).done,1);
  assert.notDeepEqual(pathProgress(created,[key]).next,first);
  const again=createLearningPath(COURSES,'money',20,[key],'2026-11-03');
  assert.ok(!again.days.flat().some(x=>x.courseId+':'+x.lessonId===key));
});

test('reject invalid imports, wrong goals, adult injections, duplicate lessons and malformed dates',()=>{
  const plan=createLearningPath(COURSES,'life',20,[],'2026-11-03');
  assert.equal(normalizeLearningPath(null,COURSES),null);
  assert.equal(normalizeLearningPath({...plan, goal:'shadow'},COURSES),null);
  assert.equal(normalizeLearningPath({...plan, created:'2026-02-30'},COURSES),null);
  assert.equal(normalizeLearningPath({...plan,days:[...plan.days.slice(0,6)]},COURSES),null);
  const duplicate=structuredClone(plan);duplicate.days[1].push(duplicate.days[0][0]);
  assert.equal(normalizeLearningPath(duplicate,COURSES),null);
  const adult=structuredClone(plan);adult.days[0][0].courseId='shadow';
  assert.equal(normalizeLearningPath(adult,COURSES),null);
});

test('restored plans cannot exceed the selected daily budget or underreport lesson minutes',()=>{
 const empty=Array.from({length:7},()=>[]);
 const overloaded={
  goal:'life',minutes:10,created:'2026-11-03',
  days:[[
   {courseId:'psychology',lessonId:'thoughts',minutes:1},
   {courseId:'psychology',lessonId:'biases',minutes:1}
  ],...empty.slice(1)]
 };
 assert.equal(normalizeLearningPath(overloaded,COURSES),null,'two 8+10 minute lessons cannot fit a ten-minute budget');
 const valid={...overloaded,minutes:20};
 const normalized=normalizeLearningPath(valid,COURSES);
 assert.ok(normalized);
 assert.equal(normalized.days[0].reduce((n,item)=>n+item.minutes,0),18);
 assert.deepEqual(normalized.days[0].map(item=>item.minutes),[8,10],
  'restored time estimates always use the bundled lesson, not untrusted item values');
});
test('app, build, backup and offline service worker all integrate a guided path',()=>{
  const app=fs.readFileSync('app.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8'),sw=fs.readFileSync('sw.js','utf8');
  assert.match(app,/function pathPage\(/);
  assert.match(app,/learningPath:normalizeLearningPath\(clean.learningPath,COURSES\)/);
  assert.match(app,/action==='create-path'/);
  assert.match(app,/path:pathPage/);
  assert.match(build,/'paths\.js'/);
  assert.match(sw,/\/paths\.js/);
});
