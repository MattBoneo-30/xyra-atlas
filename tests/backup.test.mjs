import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';
import {COURSES} from '../data.js';
import {parseBackupEnvelope,normalizeLessonKeys,normalizeQuizAnswers,normalizeLastOpened,backupCounts} from '../backup.js';
const sample={format:'xyra-atlas-backup',version:1,exportedAt:'2026-11-03T08:00:00Z',
 state:{completed:[],fieldNotes:{'psychology:one':'example'},bookmarks:[],answers:{}}};
test('valid backup requires a structured Atlas V1 envelope',()=>{
 const parsed=parseBackupEnvelope(JSON.stringify(sample));assert.equal(parsed.exportedAt,'2026-11-03');
 for(const bad of ['x','[]','null','{}',JSON.stringify({...sample,version:2}),JSON.stringify({...sample,state:{completed:'bad'}})]){
  assert.throws(()=>parseBackupEnvelope(bad));
 }
});
test('imported lesson and course IDs must actually exist',()=>{
 const c=COURSES[0],id=c.id+':'+c.lessons[0].id;
 assert.deepEqual(normalizeLessonKeys([id,id,'invalid:lesson',42],COURSES),[id]);
 assert.deepEqual(normalizeLessonKeys([c.id,c.id,'not-a-course'],COURSES,'course'),[c.id]);
 assert.deepEqual(normalizeLastOpened({courseId:c.id,lessonId:c.lessons[0].id},COURSES),{courseId:c.id,lessonId:c.lessons[0].id});
 assert.equal(normalizeLastOpened({courseId:'fake',lessonId:'x'},COURSES),null);
});
test('quiz sanitization rejects invalid answers and unknown keys',()=>{
 const c=COURSES[0],id=c.id+':'+c.lessons[0].id;
 const result=normalizeQuizAnswers({[id]:c.lessons[0].quiz.correct,'evil:quiz':1,'__proto__':3},COURSES);
 assert.equal(result[id],c.lessons[0].quiz.correct);assert.equal(Object.keys(result).length,1);
 assert.equal(normalizeQuizAnswers({[id]:999},COURSES)[id],undefined);
});
test('backup counts safely describe learning data',()=>{
 assert.deepEqual(backupCounts({completed:['a'],bookmarks:[],fieldNotes:{a:'x'},answers:{x:2},casebook:{}}),{
 lessons:1,bookmarks:0,notes:1,quizzes:1,cases:0
 });
});
test('import is a confirmation flow and bundled with the PWA',()=>{
 const a=fs.readFileSync('app.js','utf8'),sw=fs.readFileSync('sw.js','utf8'),b=fs.readFileSync('scripts/build.mjs','utf8');
 assert.match(a,/pendingBackup=/);assert.match(a,/modal='backup-preview'/);
 assert.match(a,/action==='backup-confirm'/);assert.match(a,/action==='backup-cancel'/);
 assert.match(a,/localStorage\.setItem\(STORAGE_KEY,JSON\.stringify\(candidate\)\)/);
 assert.match(sw,/\/backup\.js/);assert.match(b,/'backup\.js'/);
});
