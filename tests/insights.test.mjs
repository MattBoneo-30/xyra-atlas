import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES} from '../data.js';import {summarizeLearning,activityCalendar} from '../insights.js';
test('completion and latest quiz selection are counted exactly once',()=>{
 const c=COURSES.find(x=>!x.dark),l=c.lessons[0],k=c.id+':'+l.id;
 const r=summarizeLearning(COURSES,[k,k,'notreal:thing'],{[k]:l.quiz.correct});
 assert.equal(r.done,1);assert.equal(r.answered,1);assert.equal(r.correct,1);assert.equal(r.quizAccuracy,100);
 assert.equal(r.subjects.find(x=>x.id===c.id).done,1);
});
test('mature subjects stay excluded without acknowledgment',()=>{
 const r=summarizeLearning(COURSES,[]),all=summarizeLearning(COURSES,[],{},{includeMature:true});
 assert.equal(r.subjects.some(x=>x.id==='shadow'),false);
 assert.ok(all.subjects.some(x=>x.id==='shadow'));assert.ok(all.total>r.total);
});
test('empty quizzes and malformed answers do not invent accuracy',()=>{
 const c=COURSES[0],key=c.id+':'+c.lessons[0].id;
 const r=summarizeLearning(COURSES,[],{[key]:999});
 assert.equal(r.answered,0);assert.equal(r.quizAccuracy,null);
});
test('the activity calendar respects local dates across new year',()=>{
 const days=activityCalendar(['2026-12-31','2027-01-01','2027-01-02','2027-02-30'],new Date(2027,0,2,11));
 assert.equal(days.length,14);assert.equal(days.at(-1).date,'2027-01-02');
 assert.equal(days.filter(x=>x.visited).length,3);
});
test('insights page and offline modules are integrated',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/function insightsPage\(/);assert.match(app,/insights:insightsPage/);
 assert.match(app,/aria-label="Completed lessons by subject"/);
 assert.match(sw,/\/insights\.js/);assert.match(build,/'insights\.js'/);
});
