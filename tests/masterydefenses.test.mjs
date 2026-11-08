import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {CLINICS} from '../clinics.js';
import {MASTERY_DEFENSES,attachMasteryDefenses,masteryDefenseTemplate,composeDefenseNote,masteryDefensePanel} from '../masterydefenses.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';

test('all fourteen advanced subjects include a distinct written evidence defense',()=>{
 assert.equal(COURSES.length,14);assert.equal(totalLessons,139);
 assert.equal(Object.keys(MASTERY_DEFENSES).length,14);
 const titles=new Set(),briefs=new Set();
 for(const course of COURSES){
  const defense=MASTERY_DEFENSES[course.id],advanced=course.lessons.find(l=>l.stage==='Advanced');
  assert.ok(advanced&&advanced.masteryDefense===defense,course.id);
  assert.equal(defense.reviewStatus,'pending-independent-review');
  assert.ok(defense.title.length>=35&&defense.brief.length>=120,course.id);
  assert.ok(defense.assignment.length>=115&&defense.model.length>=200,course.id);
  assert.ok(defense.counter.length>=85&&defense.boundary.length>=45,course.id);
  assert.equal(defense.checks.length,4);assert.ok(defense.checks.every(x=>x.length>=30));
  assert.ok(!titles.has(defense.title)&&!briefs.has(defense.brief),course.id+' duplicated');
  titles.add(defense.title);briefs.add(defense.brief);
  const panel=masteryDefensePanel(defense,course.id,advanced.id);
  assert.match(panel,/data-action="mastery-insert-template"/);
  assert.match(panel,/data-mastery-lesson=/);
  assert.match(panel,/Advanced mastery defense assignment/);
  assert.doesNotMatch(panel,/Mark lesson complete|mastery achieved/);
  assert.match(panel,/No automatic grade/);
 }
 assert.equal(titles.size,14);
 assert.equal(attachMasteryDefenses(COURSES),0,'re-attach is idempotent');
 assert.equal(masteryDefensePanel(null,'business','systems'),'');
});
test('safe scaffold insertion preserves existing notes, prevents duplicate and never truncates silently',()=>{
 const defense=MASTERY_DEFENSES.business,template=masteryDefenseTemplate(defense);
 assert.ok(template.includes('Best opposing explanation'));
 assert.ok(template.length<650);
 const blank=composeDefenseNote('',template);
 assert.equal(blank.ok,true);assert.equal(blank.value,template);
 const withExisting=composeDefenseNote('My earlier analysis',template);
 assert.equal(withExisting.ok,true);
 assert.ok(withExisting.value.startsWith('My earlier analysis\n\nMASTERY'));
 assert.deepEqual(composeDefenseNote(withExisting.value,template),{ok:false,reason:'already-added'});
 assert.deepEqual(composeDefenseNote('x'.repeat(2000),template),{ok:false,reason:'full'});
 assert.deepEqual(composeDefenseNote('text','',2000),{ok:false,reason:'invalid'});
 assert.deepEqual(composeDefenseNote('a',template,0),{ok:false,reason:'invalid'});
});
test('each authored defense and counterargument are source-hashed for independent review',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.expertApprovedLessons,0);
 for(const c of COURSES){
  const lesson=c.lessons.find(l=>l.stage==='Advanced');
  const record=packet.lessons.find(row=>row.id===c.id+':'+lesson.id);
  const field=record?.content.advancedMasteryDefense;
  assert.ok(field,c.id);
  assert.equal(field.reviewStatus,'pending-independent-review');
  assert.equal(field.selfReviewCriteria.length,4);
  assert.equal(record.contentHash,reviewHash(record.content));
  assert.notEqual(reviewHash({...record.content,advancedMasteryDefense:{...field,strongestCounterargument:'Reviewer correction'}}),record.contentHash);
 }
});
test('mastery interface joins offline build without external calls or separate progress records',()=>{
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/masteryDefensePanel\(l\.masteryDefense,c\.id,l\.id\)/);
 assert.match(app,/composeDefenseNote\(field\.value/);
 assert.match(app,/field\.dispatchEvent\(new Event\('input'/);
 assert.match(app,/route\.courseId!==courseId/);
 assert.match(app,/field\.dataset\.fieldNote!==idFor/);
 const module=fs.readFileSync('masterydefenses.js','utf8');
 assert.doesNotMatch(module,/\b(fetch|localStorage|sessionStorage|persist)\s*\(/);
 for(const file of ['masterydefenses.js','mastery-defenses.css']){
  assert.ok(fs.readFileSync('sw.js','utf8').includes('/'+file));
  assert.ok(fs.readFileSync('scripts/build.mjs','utf8').includes("'"+file+"'"));
 }
 assert.match(fs.readFileSync('index.html','utf8'),/mastery-defenses\.css/);
 assert.equal(JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8')).gates[0].complete,false);
});
