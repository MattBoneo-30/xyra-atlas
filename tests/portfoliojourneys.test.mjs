import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {PORTFOLIO_JOURNEYS,PORTFOLIO_JOURNEY_COUNT,attachPortfolioJourneys,portfolioJourneyPanel} from '../portfoliojourneys.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('all subjects have a three-stage portfolio with real existing prerequisites',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139);
 assert.equal(PORTFOLIO_JOURNEY_COUNT,14);
 assert.deepEqual(new Set(Object.keys(PORTFOLIO_JOURNEYS)),new Set(COURSES.map(c=>c.id)));
 const names=new Set(),tasks=new Set(),examples=new Set();
 for(const c of COURSES){
  const item=c.portfolioJourney;
  assert.ok(item,c.id+' missing the portfolio');
  assert.equal(item.key,c.id+':'+c.lessons.find(l=>l.stage==='Beginner').id);
  assert.strictEqual(c.lessons.find(l=>l.id===item.artifacts[0].lessonId).portfolioJourney,item);
  assert.equal(item.reviewStatus,'pending-independent-review');
  assert.ok(Object.isFrozen(item)&&Object.isFrozen(item.artifacts)&&Object.isFrozen(item.rubric));
  assert.equal(item.artifacts.length,3);
  assert.equal(item.rubric.length,4);
  assert.ok(item.brief.length>=140);
  names.add(item.title);
  for(const [i,artifact] of item.artifacts.entries()){
   assert.ok(Object.isFrozen(artifact));
   assert.equal(artifact.stage,['Beginner','Intermediate','Advanced'][i]);
   assert.ok(c.lessons.some(l=>l.id===artifact.lessonId&&l.stage===artifact.stage),'invalid prerequisite '+c.id+':'+artifact.stage);
   assert.ok(artifact.build.length>=175&&artifact.test.length>=110&&artifact.example.length>=115,'too shallow '+c.id);
   assert.ok(!tasks.has(artifact.build));
   assert.ok(!examples.has(artifact.example));
   tasks.add(artifact.build);examples.add(artifact.example);
  }
  const rendered=portfolioJourneyPanel(c);
  assert.equal((rendered.match(/class="portfolio-journey-stage"/g)||[]).length,3);
  assert.equal((rendered.match(/class="portfolio-journey-details"/g)||[]).length,3);
  assert.match(rendered,/navigation cue/);
  assert.doesNotMatch(rendered,/data-action="complete-lesson"/);
  for(const stage of item.artifacts)assert.ok(rendered.includes('#/lesson/'+c.id+'/'+stage.lessonId));
 }
 assert.equal(names.size,14);
 assert.equal(tasks.size,42);
 assert.equal(examples.size,42);
 assert.equal(attachPortfolioJourneys(COURSES),0,'reattach must be idempotent');
 assert.throws(()=>attachPortfolioJourneys([]),/coverage/);
});

test('linked lesson status is informational and does not become a skill grade',()=>{
 const course=COURSES.find(c=>c.id==='business');
 const [beginner,intermediate,advanced]=course.portfolioJourney.artifacts.map(a=>a.lessonId);
 const no=portfolioJourneyPanel(course);
 const one=portfolioJourneyPanel(course,{isLessonDone:id=>id===beginner});
 assert.equal((no.match(/LINKED LESSON COMPLETE/g)||[]).length,0);
 assert.equal((one.match(/LINKED LESSON COMPLETE/g)||[]).length,1);
 assert.ok(one.includes('#/lesson/business/'+intermediate));
 assert.ok(one.includes('#/lesson/business/'+advanced));
 assert.equal((one.match(/LINKED LESSON NOT COMPLETE/g)||[]).length,2);
 assert.match(one,/does not verify the artifact/);
 const src=fs.readFileSync('portfoliojourneys.js','utf8');
 assert.doesNotMatch(src,/localStorage|sessionStorage|\bpersist\(|\bfetch\(/);
});

test('all forty-two new artifact claims are included in independent review hashes',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.uniqueSourceURLs,52);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const entries=packet.lessons.filter(record=>record.content.subjectPortfolioJourney);
 assert.equal(entries.length,14);
 for(const entry of entries){
  const p=entry.content.subjectPortfolioJourney;
  assert.equal(p.reviewStatus,'pending-independent-review');
  assert.equal(p.artifacts.length,3);
  assert.equal(p.rubric.length,4);
  assert.equal(entry.reviewerAttestation,null);
  assert.equal(entry.contentHash,reviewHash(entry.content));
  const amended={...entry.content,subjectPortfolioJourney:{...p,artifacts:[
   {...p.artifacts[0],evidenceCriteria:p.artifacts[0].evidenceCriteria+' updated after review'},
   ...p.artifacts.slice(1)
  ]}};
  assert.notEqual(entry.contentHash,reviewHash(amended));
 }
});

test('portfolio assets, navigation and existing course state remain unchanged offline',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/portfolioJourneyPanel\(c,\{isLessonDone:id=>isCompleted\(idFor\(c\.id,id\)\),hasFieldNote:/);
 assert.ok(app.length<240000,'base app remains inside maintained file-size constraint');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const name of ['portfoliojourneys.js','portfoliojourneys1.js','portfoliojourneys2.js','portfolio-journeys.css']){
  assert.ok(sw.includes('/'+name),'offline precache missing '+name);
  assert.ok(build.includes("'"+name+"'"),'static build missing '+name);
 }
 assert.ok(fs.readFileSync('index.html','utf8').includes('href="/portfolio-journeys.css"'));
});
