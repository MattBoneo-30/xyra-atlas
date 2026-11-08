import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {RECOVERY_STUDIO,RECOVERY_STAGES,getRecoveryCase,validateRecoveryCases,recoveryStudioPanel} from '../recoverystudio.js';
import {buildMistakeQueue,recordQuizAttempt} from '../mistakes.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';

test('every level in all fourteen subjects has a distinct, substantive new transfer case',()=>{
 assert.equal(totalLessons,139,'stable lesson identifiers remain intact');
 assert.equal(COURSES.length,14);
 assert.deepEqual(RECOVERY_STAGES,['Beginner','Intermediate','Advanced']);
 assert.equal(Object.keys(RECOVERY_STUDIO).length,14);
 assert.equal(validateRecoveryCases(COURSES),42);
 const prompts=new Set(),methods=new Set();
 for(const c of COURSES){
  const rows=RECOVERY_STUDIO[c.id];
  assert.ok(Object.isFrozen(rows));
  assert.equal(rows.length,3);
  for(const [i,item] of rows.entries()){
   assert.ok(Object.isFrozen(item));
   assert.equal(item.reviewStatus,'pending-independent-review');
   assert.equal(item.stage,RECOVERY_STAGES[i]);
   assert.strictEqual(getRecoveryCase(c.id,item.stage),item);
   assert.ok(item.prompt.length>=100&&item.method.length>=130&&item.trap.length>=52&&item.verify.length>=75);
   assert.ok(!prompts.has(item.prompt),'reused case '+c.id);
   assert.ok(!methods.has(item.method),'reused worked solution '+c.id);
   prompts.add(item.prompt);methods.add(item.method);
   const html=recoveryStudioPanel({courseId:c.id,stage:item.stage});
   assert.match(html,/RECOVERY STUDIO/);
   assert.match(html,/not a diagnosis of your specific mistake/i);
   assert.match(html,/review/i);
   assert.equal((html.match(/<details/g)||[]).length,1);
   assert.match(html,/<summary>Compare a reasoned approach after attempting/);
   assert.doesNotMatch(html,/data-action="complete"|data-action="answer"|automatically awards/);
  }
 }
 assert.equal(prompts.size,42);assert.equal(methods.size,42);
 assert.equal(getRecoveryCase('missing','Beginner'),null);
 assert.equal(getRecoveryCase('business','NoStage'),null);
 assert.equal(recoveryStudioPanel(null),'');
 assert.throws(()=>validateRecoveryCases([]),/fourteen subjects/);
});
test('every missed lesson in all 14 subjects receives its level-specific case, behind mature gate',()=>{
 for(const c of COURSES){
  for(const stage of RECOVERY_STAGES){
   const lesson=c.lessons.find(l=>l.stage===stage);
   const key=c.id+':'+lesson.id;
   const wrong=lesson.quiz.options.findIndex((_,i)=>i!==lesson.quiz.correct);
   const mistakes=recordQuizAttempt({},COURSES,key,wrong,Date.UTC(2026,10,8));
   const locked=buildMistakeQueue(COURSES,mistakes);
   assert.equal(locked.length,c.dark?0:1);
   const queue=buildMistakeQueue(COURSES,mistakes,{includeMature:true});
   assert.equal(queue.length,1);
   assert.equal(queue[0].stage,stage);
   assert.strictEqual(queue[0].recovery,getRecoveryCase(c.id,stage));
   assert.equal(queue[0].id,key);
   const after=recordQuizAttempt(mistakes,COURSES,key,lesson.quiz.correct,Date.UTC(2026,10,8,1));
   assert.equal(buildMistakeQueue(COURSES,after,{includeMature:true}).length,0);
  }
 }
});
test('forty-two recovery cases enter the signed-content review packet without false approvals',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const rows=packet.lessons.filter(l=>l.content.mistakeRecoveryStage);
 assert.equal(rows.length,42);
 for(const row of rows){
  const stage=row.content.mistakeRecoveryStage;
  assert.equal(stage.reviewStatus,'pending-independent-review');
  assert.equal(row.contentHash,reviewHash(row.content));
  const changed=structuredClone(row.content);
  changed.mistakeRecoveryStage.method+=' Reviewer correction.';
  assert.notEqual(reviewHash(changed),row.contentHash);
 }
});
test('transfer explanations are ungraded, offline, private, and small enough to keep the app budget',()=>{
 const read=path=>fs.readFileSync(path,'utf8');
 for(const name of ['recoverystudio.js','recoverystudio1.js','recoverystudio2.js','recovery-studio.css']){
  assert.ok(read('sw.js').includes('/'+name),'precache omission: '+name);
  assert.ok(read('scripts/build.mjs').includes("'"+name+"'"),'bundle omission: '+name);
 }
 const app=read('app.js');
 assert.match(app,/mistakeFeedback\?\.id===first\.id\?recoveryStudioPanel\(first\):''/);
 assert.match(app,/import \{recoveryStudioPanel\} from '\.\/recoverystudio\.js'/);
 assert.ok(Buffer.byteLength(app)<240000,'main app byte budget preserved');
 assert.match(read('index.html'),/recovery-studio\.css/);
 assert.match(read('recovery-studio.css'),/focus-visible/);
 assert.doesNotMatch(read('recoverystudio.js'),/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 assert.ok(JSON.parse(read('docs/stage-gates.json')).gates.every(g=>g.complete===false));
});
