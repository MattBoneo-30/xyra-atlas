import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {MISCONCEPTION_COACH,misconceptionUnit,misconceptionReason,quizChoiceFeedback,validateMisconceptionCoach} from '../misconceptioncoach.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';

test('each of 14 subjects and three stages has two accurate wrong-option explanations',()=>{
 assert.equal(totalLessons,139);
 assert.equal(validateMisconceptionCoach(COURSES),84);
 assert.equal(Object.keys(MISCONCEPTION_COACH).length,14);
 const reasons=new Set(),selected=new Set();
 for(const course of COURSES){
  for(const stage of ['Beginner','Intermediate','Advanced']){
   const item=MISCONCEPTION_COACH[course.id][stage];
   const lesson=course.lessons.find(l=>l.id===item.lessonId&&l.stage===stage);
   assert.ok(lesson,'missing target '+course.id+'/'+stage);
   assert.strictEqual(misconceptionUnit(course.id,lesson),item);
   assert.ok(Object.isFrozen(item)&&Object.isFrozen(item.wrongOptions));
   assert.equal(item.reviewStatus,'pending-independent-review');
   assert.equal(item.wrongOptions.length,2);
   const quiz=lesson.quiz;
   assert.equal(quiz.options.length,3);
   for(const [i,option] of quiz.options.entries()){
    if(i===quiz.correct){
     assert.equal(misconceptionReason(course.id,lesson,i),null);
     assert.equal(quizChoiceFeedback(course.id,lesson,i),'');
     continue;
    }
    const explanation=misconceptionReason(course.id,lesson,i);
    assert.ok(typeof explanation==='string'&&explanation.length>=90,course.id+'/'+stage+' index '+i);
    assert.ok(!reasons.has(explanation),'repeated incorrect-answer explanation');
    reasons.add(explanation);
    assert.ok(item.wrongOptions.some(x=>x.option===option&&x.reason===explanation));
    assert.match(quizChoiceFeedback(course.id,lesson,i),/Why this particular option falls short/);
    assert.match(quizChoiceFeedback(course.id,lesson,i),/pending independent specialist review/);
   }
   selected.add(course.id+':'+lesson.id);
  }
 }
 assert.equal(selected.size,42);
 assert.equal(reasons.size,84);
 assert.equal(misconceptionUnit('unknown',{}),null);
 assert.equal(misconceptionReason('business',null,1),null);
 assert.equal(misconceptionReason('business',COURSES.find(c=>c.id==='business').lessons[0],-1),null);
 assert.throws(()=>validateMisconceptionCoach([]),/fourteen subjects/);
});
test('never attach a wrong-choice explanation to a changed quiz, answer index or other lesson',()=>{
 const course=COURSES.find(c=>c.id==='psychology');
 const lesson=course.lessons.find(l=>l.id==='thoughts');
 const quiz={...lesson.quiz,options:[...lesson.quiz.options]};
 quiz.options[0]='Unexpected edited distractor';
 const edited={...lesson,quiz};
 assert.equal(misconceptionUnit('psychology',edited),null);
 assert.equal(misconceptionReason('psychology',edited,0),null);
 assert.equal(quizChoiceFeedback('psychology',edited,0),'');
 assert.equal(misconceptionUnit('psychology',{...lesson,id:'another-lesson'}),null);
 assert.equal(quizChoiceFeedback('psychology',lesson,3),'');
});
test('all 84 feedback claims join exact content hashes for independent editorial review',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const records=packet.lessons.filter(l=>l.content.choiceSpecificMisconceptions);
 assert.equal(records.length,42);
 for(const record of records){
  const field=record.content.choiceSpecificMisconceptions;
  assert.equal(field.reviewStatus,'pending-independent-review');
  assert.equal(field.wrongOptions.length,2);
  assert.equal(record.contentHash,reviewHash(record.content));
  const altered=structuredClone(record.content);
  altered.choiceSpecificMisconceptions.wrongOptions[0].reason+=' Qualified reviewer correction.';
  assert.notEqual(reviewHash(altered),record.contentHash);
 }
});
test('choice coach is private, offline and only appears after selecting an incorrect answer',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/quizChoiceFeedback\(c\.id,l,chosen\)/);
 assert.match(app,/quizChoiceFeedback\(first\.courseId,first,mistakeFeedback\.choice\)/);
 assert.match(app,/mistakeFeedback=\{id,choice\}/);
 assert.match(app,/chosen===l\.quiz\.correct\?'':quizChoiceFeedback/);
 const source=fs.readFileSync('misconceptioncoach.js','utf8');
 assert.doesNotMatch(source,/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 for(const name of ['misconceptioncoach.js','misconceptions1.js','misconceptions2.js']){
  assert.ok(fs.readFileSync('sw.js','utf8').includes('/'+name),'offline cache missing '+name);
  assert.ok(fs.readFileSync('scripts/build.mjs','utf8').includes("'"+name+"'"),'build inventory missing '+name);
 }
 const css=fs.readFileSync('recovery-studio.css','utf8');
 assert.match(css,/choice-coach/);
 assert.ok(Buffer.byteLength(app)<240000,'main app size budget maintained');
 assert.ok(JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8')).gates.every(g=>!g.complete));
});
