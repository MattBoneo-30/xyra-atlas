import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons,findCourse,findLesson} from '../data.js';
import {MASTERY_TRACKS,MASTERY_TRACK_COUNT} from '../masterytracks.js';

test('mastery release includes 29 sourced advanced lessons across every Atlas subject',()=>{
 assert.equal(MASTERY_TRACK_COUNT,29);
 assert.equal(COURSES.length,14);
 assert.equal(Object.keys(MASTERY_TRACKS).length,14);
 assert.ok(totalLessons>=117,'full curriculum should contain the original 88 plus 29 new guides');
 for(const course of COURSES){
  const guides=MASTERY_TRACKS[course.id];
  assert.ok(Array.isArray(guides)&&guides.length>=2,course.id+' has multiple applied lessons');
  for(const lesson of guides)assert.equal(findLesson(course.id,lesson.id),lesson);
 }
 assert.equal(MASTERY_TRACKS.laws.length,3,'PH laws have consumer, privacy, and banking workflows');
 assert.equal(findCourse('shadow').dark,true,'adult safety lessons stay within mature-course gate');
});
test('every advanced guide includes serious pedagogy, worked problem and accountable references',()=>{
 const sourceDomains=new Set();
 for(const [courseId,guides] of Object.entries(MASTERY_TRACKS)){
  assert.ok(guides.length>=2);
  for(const lesson of guides){
   assert.match(lesson.id,/^[a-z0-9-]+$/);
   assert.equal(lesson.stage,'Advanced');
   assert.ok(lesson.intro.length>=45,lesson.id+' intro');
   assert.equal(lesson.sections.length,3,lesson.id+' teaching sections');
   assert.ok(lesson.sections.every(s=>s.heading.length>=8&&s.body.length>=95),lesson.id+' narrative depth');
   assert.ok(lesson.example.length>=90,lesson.id+' worked example');
   assert.ok(lesson.task.length>=80,lesson.id+' applied task');
   assert.ok(lesson.quiz.options.length===3&&lesson.quiz.options.every(x=>x.length>3));
   assert.ok(Number.isInteger(lesson.quiz.correct)&&lesson.quiz.correct>=0&&lesson.quiz.correct<3);
   assert.ok(lesson.quiz.explanation.length>=35);
   assert.ok(lesson.sources.length>=1);
   for(const ref of lesson.sources){
    const url=new URL(ref.url);
    assert.equal(url.protocol,'https:');
    assert.ok(ref.label.length>15);
    sourceDomains.add(url.hostname);
   }
  }
 }
 assert.ok(sourceDomains.has('privacy.gov.ph'));
 assert.ok(sourceDomains.has('www.bsp.gov.ph'));
 assert.ok(sourceDomains.has('fairtrade.dti.gov.ph'));
 assert.ok(sourceDomains.has('www.nih.gov'));
});
test('new advanced content is included in production build and offline precache',()=>{
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 const sw=fs.readFileSync('sw.js','utf8');
 const data=fs.readFileSync('data.js','utf8');
 assert.match(build,/'masterytracks\.js'/);
 assert.match(sw,/\/masterytracks\.js/);
 assert.match(data,/MASTERY_TRACKS/);
});
