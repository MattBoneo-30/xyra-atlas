import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CURRICULUM_STAGES,CURRICULUM_OBJECTIVES,learningLadder} from '../curriculumpath.js';
test('each subject has coherent three-stage goals backed by actual lessons',()=>{
 assert.deepEqual([...CURRICULUM_STAGES],['Beginner','Intermediate','Advanced']);
 assert.equal(Object.keys(CURRICULUM_OBJECTIVES).length,14);
 assert.deepEqual(new Set(COURSES.map(c=>c.id)),new Set(Object.keys(CURRICULUM_OBJECTIVES)));
 for(const course of COURSES){
  const ladder=learningLadder(course);
  assert.ok(ladder,course.id);
  assert.equal(ladder.levels.length,3);
  for(const level of ladder.levels){
   assert.ok(level.goal.length>=24,course.id+': '+level.stage+' needs a real goal');
   assert.ok(level.evidence.length>=36,course.id+': '+level.stage+' needs a tangible artifact');
   assert.ok(level.total>=1,course.id+': '+level.stage+' needs associated lessons');
   assert.ok(level.nextLesson);
   assert.equal(level.done,0);
  }
 }
});
test('stage progress respects genuine lesson keys but never gates advanced content',()=>{
 const course=COURSES.find(c=>c.id==='psychology');
 const levels=CURRICULUM_STAGES.map(stage=>course.lessons.filter(l=>l.stage===stage).map(l=>course.id+':'+l.id));
 const initial=learningLadder(course,['unknown:fake']);
 assert.equal(initial.levels[0].done,0);
 const partial=learningLadder(course,[...levels[0],...levels[0]]);
 assert.equal(partial.levels[0].state,'complete');
 assert.equal(partial.levels[1].done,0);
 assert.notEqual(initial.next?.id,partial.next?.id);
 const advanced=learningLadder(course,levels[2]);
 assert.equal(advanced.levels[2].done,levels[2].length);
 const all=learningLadder(course,levels.flat());
 assert.equal(all.complete,true);
 assert.equal(all.next,null);
});
test('invalid learning inputs cannot fabricate an outcome',()=>{
 assert.equal(learningLadder(null),null);
 assert.equal(learningLadder({id:'made-up',lessons:[]}),null);
 assert.equal(learningLadder({id:'psychology',lessons:null}),null);
 assert.ok(learningLadder(COURSES[0],null));
});
test('learning ladder ships in offline build and real course pages',()=>{
 const [app,sw,build]=['app.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(app,/learningLadder\(c,saved\.completed\)/);
 assert.match(app,/curriculum-ladder-levels/);
 assert.match(app,/curriculum-world-preview/);
 assert.match(app,/getStageArt\(c\.id,level\.stage\)/);
 assert.match(app,/aria-pressed="\$\{courseStageFilter===level\.stage\}"/);
 assert.match(app,/id="course-lessons-heading" tabindex="-1"/);
 assert.match(app,/heading\?\.focus\(\{preventScroll:true\}\)/);
 const css=fs.readFileSync('styles.css','utf8');
 assert.match(css,/\.curriculum-world-preview/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(sw,/\/curriculumpath\.js/);
 assert.match(build,/'curriculumpath\.js'/);
});
