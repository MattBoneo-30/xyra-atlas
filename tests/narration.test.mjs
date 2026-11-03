import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES} from '../data.js';import {buildLessonNarration} from '../narration.js';
test('all lessons offer a complete read-aloud text in safe short browser speech chunks',()=>{
 for(const c of COURSES)for(const l of c.lessons){
  const chunks=buildLessonNarration(c,l);assert.ok(chunks.length>=5);
  assert.equal(chunks[0],l.title);assert.ok(chunks.every(s=>s.length>0&&s.length<=175));
  assert.ok(chunks.join(' ').includes('Practice exercise.'));
 }
});
test('narration safely handles irregular content and rates',()=>{
 assert.deepEqual(buildLessonNarration(null,null),[]);
 assert.deepEqual(buildLessonNarration({},{}),[]);
 const parts=buildLessonNarration({title:'x'},{title:'A',sections:[{heading:'B',body:'long '.repeat(90)}],task:'Do this'},{maxLength:120});
 assert.ok(parts.every(p=>p.length<=120));assert.ok(parts.length>3);
});
test('lesson narration controls and navigation cancellation are wired',()=>{
 const app=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),build=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(app,/data-action="lesson-audio-start"/);
 assert.match(app,/lesson-audio-pause/);assert.match(app,/lesson-audio-stop/);
 assert.match(app,/speechSynthesis\.pause\(\)/);assert.match(app,/speechSynthesis\.resume\(\)/);
 assert.match(app,/stopLessonAudio\(\);route=parseHash\(\)/);
 assert.match(sw,/\/narration\.js/);assert.match(build,/'narration\.js'/);
});
