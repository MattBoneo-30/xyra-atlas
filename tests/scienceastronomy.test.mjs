import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {ASTRONOMY_CASE_STUDY,extendScienceWithAstronomy} from '../scienceastronomy.js';

test('astronomy integrates into the existing advanced systems lesson without changing identities',()=>{
 assert.equal(totalLessons,139);
 const lesson=findLesson('science','systems');
 assert.ok(lesson);
 assert.equal(lesson.stage,'Advanced');
 for(const section of ASTRONOMY_CASE_STUDY.sections){
  assert.ok(lesson.sections.some(item=>item.heading===section.heading&&item.body===section.body));
  assert.ok(section.body.length>180,'each astronomical explanation must be substantive');
 }
 assert.ok(lesson.task.includes(ASTRONOMY_CASE_STUDY.task));
 for(const ref of ASTRONOMY_CASE_STUDY.sources)
  assert.ok(lesson.sources.some(s=>s.url===ref.url&&s.label===ref.label));
 assert.equal(extendScienceWithAstronomy(COURSES),false,'the extension must be idempotent');
 assert.equal(lesson.sections.filter(s=>s.heading===ASTRONOMY_CASE_STUDY.sections[0].heading).length,1);
});
test('Moon phases, axial tilt and the scientific method are taught without common misconceptions',()=>{
 const text=ASTRONOMY_CASE_STUDY.sections.map(s=>s.body).join(' ').toLowerCase();
 for(const concept of ['29.5 days','27.3 days','lunar eclipse','tilt','philippines','limitations']){
  assert.ok(text.includes(concept),concept+' is explicitly taught');
 }
 assert.ok(ASTRONOMY_CASE_STUDY.task.includes('Transfer challenge'));
 assert.ok(ASTRONOMY_CASE_STUDY.sources.every(s=>s.url.startsWith('https://')));
});
test('astronomy remains in offline static output and service worker precache',()=>{
 assert.match(fs.readFileSync('scripts/build.mjs','utf8'),/'scienceastronomy.js'/);
 assert.match(fs.readFileSync('sw.js','utf8'),/\/scienceastronomy\.js/);
 assert.match(fs.readFileSync('data.js','utf8'),/extendScienceWithAstronomy\(COURSES\)/);
});
