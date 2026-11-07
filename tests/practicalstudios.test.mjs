import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {ADVANCED_DEPTH} from '../advanceddepth.js';
import {PRACTICAL_STUDIOS,PRACTICAL_STUDIO_COUNT,attachPracticalStudios,practicalStudioPanel} from '../practicalstudios.js';
import {createChapterMap} from '../visualmap.js';
import {buildLessonNarration} from '../narration.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';

test('all 14 subjects include two substantive advanced practice rounds without adding lesson IDs',()=>{
 assert.equal(totalLessons,139);
 assert.equal(COURSES.length,14);
 assert.equal(PRACTICAL_STUDIO_COUNT,14);
 assert.deepEqual(new Set(Object.keys(PRACTICAL_STUDIOS)),new Set(COURSES.map(c=>c.id)));
 const titles=new Set(),prompts=new Set();
 for(const course of COURSES){
  const lesson=findLesson(course.id,ADVANCED_DEPTH[course.id].id);
  assert.equal(lesson.stage,'Advanced');
  assert.ok(lesson.evidenceInquiry,'previous advanced reasoning material must remain');
  const x=lesson.practicalStudio;
  assert.ok(x,'missing practical studio for '+course.id);
  assert.equal(x.key,course.id+':'+lesson.id);
  assert.equal(x.reviewStatus,'pending-independent-review');
  assert.equal(x.rounds.length,2);
  assert.equal(x.rubric.length,4);
  assert.ok(Object.isFrozen(x)&&Object.isFrozen(x.rounds)&&Object.isFrozen(x.rubric));
  assert.ok(x.situation.length>=130);
  titles.add(x.title);
  for(const round of x.rounds){
   assert.ok(Object.isFrozen(round));
   for(const [k,min] of Object.entries({title:16,focus:170,evidence:125,assignment:135,model:145}))
    assert.ok(round[k].length>=min,course.id+' '+k+' too shallow');
   assert.ok(!prompts.has(round.assignment),'duplicate advanced assignment '+course.id);
   prompts.add(round.assignment);
  }
  const markup=practicalStudioPanel(x);
  assert.equal((markup.match(/class="practical-studio-round"/g)||[]).length,2);
  assert.equal((markup.match(/class="practical-studio-model"/g)||[]).length,2);
  assert.match(markup,/Reveal and compare an illustrative worked response/);
  const map=createChapterMap(course,lesson);
  assert.equal(map.studio.id,'practical-studio');
  assert.equal(map.studio.heading,x.title);
  const speech=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(speech.includes('Advanced practical studio: '+x.title),course.id+' missing audio');
 }
 assert.equal(titles.size,14);
 assert.equal(prompts.size,28);
 assert.equal(attachPracticalStudios(COURSES),0,'repeated integration must not duplicate any round');
 assert.throws(()=>attachPracticalStudios([]),/coverage incomplete/);
});

test('all practical studio claims are hashed for independent review, with no fabricated approval',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.uniqueSourceURLs,52);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const records=packet.lessons.filter(x=>x.content.advancedPracticalStudio);
 assert.equal(records.length,14);
 for(const record of records){
  const x=record.content.advancedPracticalStudio;
  assert.equal(x.reviewStatus,'pending-independent-review');
  assert.equal(x.rounds.length,2);
  assert.equal(x.rubric.length,4);
  assert.equal(record.reviewerAttestation,null);
  assert.equal(record.contentHash,reviewHash(record.content));
  assert.notEqual(record.contentHash,reviewHash({...record.content,
   advancedPracticalStudio:{...x,rounds:[{...x.rounds[0],workedResponse:x.rounds[0].workedResponse+' updated'},x.rounds[1]]}}));
 }
});

test('advanced practice is navigable, accessible and bundled for offline use without changing grading',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/\$\{practicalStudioPanel\(l\.practicalStudio\)\}/);
 assert.match(app,/data-index="studio"/);
 assert.match(app,/index==='studio'\?'practical-studio'/);
 assert.match(app,/\+\(chapterMap\.studio\?1:0\)/);
 const renderer=fs.readFileSync('practicalstudios.js','utf8');
 assert.match(renderer,/class="practical-studio-model"/);
 assert.match(renderer,/practical-studio-rubric/);
 assert.doesNotMatch(renderer,/localStorage|sessionStorage|\bfetch\(|\bpersist\(/);
 const sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const file of ['practicalstudios.js','practicalstudios1.js','practicalstudios2.js','practical-studio.css']){
  assert.ok(sw.includes('/'+file),'offline missing '+file);
  assert.ok(build.includes("'"+file+"'"),'build missing '+file);
 }
 assert.ok(fs.readFileSync('index.html','utf8').includes('href="/practical-studio.css"'));
});
