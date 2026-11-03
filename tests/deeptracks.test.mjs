import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { COURSES, findLesson, totalLessons } from '../data.js';
import { DEEP_TRACKS, DEEP_TRACK_COUNT } from '../deeptracks.js';
test('four advanced tracks add twelve complete and sourced lessons',()=>{
 assert.equal(DEEP_TRACK_COUNT,12);assert.equal(totalLessons,64);
 assert.deepEqual(Object.keys(DEEP_TRACKS).sort(),['business','laws','psychology','savings']);
 for(const [id,lessons] of Object.entries(DEEP_TRACKS)) {assert.equal(lessons.length,3);for(const lesson of lessons){
  assert.equal(findLesson(id,lesson.id),lesson);
  assert.equal(lesson.sections.length,3);
  assert.ok(lesson.sections.every(s=>s.body.length>90));
  assert.ok(lesson.example.length>65&&lesson.task.length>65);
  assert.ok(lesson.quiz.options.length>=3&&lesson.quiz.correct<lesson.quiz.options.length);
  assert.ok(lesson.sources.length>0&&lesson.sources.every(s=>s.url.startsWith('https://')));
 }}
});
test('sources are safe links and deep curriculum precaches offline',()=>{
 const app=fs.readFileSync('app.js','utf8');
 const worker=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.ok(app.includes('CHECK THE ORIGINAL SOURCES'));
 assert.ok(app.includes('rel="noopener noreferrer"'));
 assert.ok(worker.includes('/deeptracks.js'));
 assert.ok(worker.includes('/phrasebook.js'));
 assert.ok(build.includes("'deeptracks.js'"));
});
