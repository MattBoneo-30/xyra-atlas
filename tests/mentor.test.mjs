import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES} from '../data.js';import {mentorMoment,XYRA_REFLECTIONS} from '../mentor.js';
test('daily mentor reflection is stable, varied and never recommends mature content',()=>{
 assert.ok(XYRA_REFLECTIONS.length>=14);
 for(const date of ['2026-11-03','2026-11-04','2026-11-05']){const m=mentorMoment(date,COURSES,[]);assert.ok(m.reflection.prompt.length>30);assert.ok(m.lesson);assert.notEqual(m.lesson.courseId,'shadow');assert.deepEqual(mentorMoment(date,COURSES,[]),m);}
 assert.equal(mentorMoment('2026-02-30',COURSES,[]),null);
});
test('completed lessons are skipped when recommending what to study',()=>{
 const m=mentorMoment('2026-11-03',COURSES,[]);
 const skip=m.lesson.courseId+':'+m.lesson.lessonId;
 assert.notEqual(mentorMoment('2026-11-03',COURSES,[skip]).lesson.lessonId,m.lesson.lessonId);
});
test('Xyra visual is original local vector art and is cached for offline',()=>{
 const art=fs.readFileSync('assets/xyra-guide.svg','utf8'),app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(art,/<svg/);assert.match(art,/<desc/);assert.match(art,/amethyst/);assert.ok(art.length>4000);
 assert.match(app,/function mentorPage\(/);assert.match(app,/mentor:mentorPage/);assert.match(app,/assets\/xyra-guide\.svg/);
 assert.match(sw,/\/assets\/xyra-guide\.svg/);assert.match(sw,/\/mentor\.js/);assert.match(build,/'mentor\.js'/);
});
