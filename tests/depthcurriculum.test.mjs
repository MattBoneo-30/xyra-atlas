import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {DEEPER_FOUNDATIONS} from '../depthcurriculum.js';
import {COURSES,findLesson,totalLessons} from '../data.js';

test('source-linked astronomy and Philippine law chapters are integrated as genuine lessons',()=>{
 assert.equal(DEEPER_FOUNDATIONS.science.length,3);
 assert.equal(DEEPER_FOUNDATIONS.laws.length,2);
 const all=[...DEEPER_FOUNDATIONS.science,...DEEPER_FOUNDATIONS.laws];
 assert.equal(new Set(all.map(l=>l.id)).size,5);
 assert.ok(totalLessons>=139,'new lessons augment, not replace, earlier curriculum');
 for(const [courseId,entries] of Object.entries(DEEPER_FOUNDATIONS)){
  assert.ok(COURSES.some(c=>c.id===courseId),'destination subject exists');
  for(const entry of entries){
   assert.equal(findLesson(courseId,entry.id),entry,'new lesson is reachable in course pages');
   assert.ok(entry.sections.length>=5,'each lesson needs multiple substantial teaching sections');
   assert.ok(entry.sections.every(s=>s.body.length>=260),'avoid one-line topic summaries');
   assert.ok(entry.task.length>=175,'applied task should require explanation, evidence or analysis');
   assert.ok(entry.example.length>=230,'worked example shows reasoning');
   assert.ok(entry.quiz.question.length>50&&entry.quiz.explanation.length>=65);
   assert.ok(entry.quiz.options.length===3);
   assert.ok(entry.sources.length>=1&&entry.sources.every(s=>s.url.startsWith('https://')&&s.label));
   assert.ok(entry.flow?.title?.length>10&&entry.flow.steps.length===4,'reasoning map is substantive');
   assert.ok(entry.flow.steps.every(x=>x.detail.length>=35));
  }
 }
});
test('astronomy explicitly challenges misleading models and cites NASA',()=>{
 const [seasons,moon,stars]=DEEPER_FOUNDATIONS.science;
 assert.match(seasons.sections.map(x=>x.body).join(' '),/axial|tilt|hemisphere/gi);
 assert.match(moon.sections.map(x=>x.body).join(' '),/shadow|eclipse|orbit/gi);
 assert.match(stars.sections.map(x=>x.body).join(' '),/fusion|mass|white dwarf/gi);
 assert.ok(DEEPER_FOUNDATIONS.science.every(x=>x.sources.every(s=>new URL(s.url).hostname==='science.nasa.gov')));
});
test('Philippine legal lessons teach actual Republic Acts and qualify conclusions',()=>{
 const [privacy,consumer]=DEEPER_FOUNDATIONS.laws;
 assert.match(privacy.title,/RA 10173/);
 assert.match(consumer.title,/RA 7394/);
 const p=privacy.sections.map(x=>x.body).join(' ');
 const c=consumer.sections.map(x=>x.body).join(' ');
 for(const section of ['Section 11','Section 12','Section 13','Section 16'])assert.ok(p.includes(section),section);
 for(const article of ['Article 2','Article 50','Article 52'])assert.ok(c.includes(article),article);
 assert.match(p,/lawful basis|proportion/);
 assert.match(c,/evidence|verify|representation/);
 assert.ok(privacy.sources.some(s=>s.url.startsWith('https://privacy.gov.ph/')));
 assert.ok(consumer.sources.some(s=>s.url.startsWith('https://elibrary.judiciary.gov.ph/')));
});
test('reading page preserves safe escaped text while displaying reasoning flowchart',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/function learningFlow\(flow\)/);
 assert.match(app,/class="learning-flow-track"/);
 assert.match(app,/\$\{learningFlow\(l\.flow\)\}/);
 assert.match(app,/esc\(item\.label\)/);
 assert.match(app,/esc\(item\.detail\)/);
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(sw,/\/depthcurriculum\.js/);
 assert.match(build,/'depthcurriculum\.js'/);
});
