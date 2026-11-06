import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,findLesson,totalLessons} from '../data.js';
import {PH_CASEWORK,PH_CASEWORK_COUNT,PH_CASE_DECISION_FLOWS} from '../phcasework.js';
test('three substantial advanced Philippine case studies include trusted agency references',()=>{
 assert.equal(PH_CASEWORK_COUNT,3);
 assert.equal(totalLessons,139);
 const known=new Set(),domains=new Set();
 for(const item of PH_CASEWORK.laws){
  assert.equal(item.stage,'Advanced');assert.ok(item.intro.length>100);
  assert.ok(!known.has(item.id));known.add(item.id);
  assert.equal(findLesson('laws',item.id),item);
  assert.equal(item.sections.length,3);
  assert.ok(item.sections.every(s=>s.heading.length>10&&s.body.length>170));
  assert.ok(item.example.length>150&&item.task.length>145);
  assert.equal(item.quiz.options.length,3);
  assert.ok(item.quiz.correct>=0&&item.quiz.correct<=2);
  assert.ok(item.quiz.explanation.length>80);
  for(const ref of item.sources){const u=new URL(ref.url);assert.equal(u.protocol,'https:');domains.add(u.hostname);}
 }
 assert.ok(domains.has('privacy.gov.ph')&&domains.has('www.bsp.gov.ph')&&domains.has('fairtrade.dti.gov.ph'));
 assert.equal(COURSES.length,14);
});
test('three Philippine complaint pathways teach safe regulator-aware decision order',()=>{
 assert.equal(Object.keys(PH_CASE_DECISION_FLOWS).length,3);
 for(const item of PH_CASEWORK.laws){
  const map=item.flow;
  assert.equal(map,PH_CASE_DECISION_FLOWS[item.id]);
  assert.equal(map.steps.length,4);
  assert.ok(map.title.length>=25&&map.caption.length>=70);
  assert.ok(map.steps.every(x=>x.label.length>=12&&x.detail.length>65));
  assert.ok(map.steps.every(x=>!(/guaranteed refund/i).test(x.detail)));
 }
 const bank=PH_CASEWORK.laws.find(x=>x.id==='ph-bank-assistance-case').flow;
 assert.match(bank.steps[0].detail,/OTP/);
 assert.match(bank.steps[2].detail,/first|institution/i);
 assert.match(bank.steps[3].detail,/BSP/);
 const privacy=PH_CASEWORK.laws.find(x=>x.id==='ph-data-access-case').flow;
 assert.match(privacy.steps[0].detail,/own records/);
 const dti=PH_CASEWORK.laws.find(x=>x.id==='ph-consumer-dti-case').flow;
 assert.match(dti.steps[3].detail,/Mediation/);
});
test('Philippine casework ships in both build and offline precache',()=>{
 const [data,sw,build]=['data.js','sw.js','scripts/build.mjs'].map(p=>fs.readFileSync(p,'utf8'));
 assert.match(data,/PH_CASEWORK\[entry\.id\]/);
 assert.match(sw,/\/phcasework\.js/);
 assert.match(build,/'phcasework\.js'/);
});
