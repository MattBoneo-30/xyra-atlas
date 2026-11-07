import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES,totalLessons} from '../data.js';
import {RESPONSE_SIMULATIONS,RESPONSE_SIMULATION_COUNT,validateResponseSimulations,evaluateResponseChoice,responseSimulationPanel,activateResponseSimulationChoice} from '../responsesimulations.js';
import {buildEditorialReviewPacket,reviewHash} from '../scripts/editorial-review-packet.mjs';
import {CLINICS} from '../clinics.js';
import {buildLessonNarration} from '../narration.js';

test('fourteen subjects have two consequential decisions and eighty-four reviewed explanations',()=>{
 assert.equal(COURSES.length,14);
 assert.equal(totalLessons,139);
 assert.equal(RESPONSE_SIMULATION_COUNT,14);
 assert.deepEqual(new Set(Object.keys(RESPONSE_SIMULATIONS)),new Set(COURSES.map(c=>c.id)));
 assert.equal(validateResponseSimulations(COURSES),0,'repeat attachment must preserve existing objects');
 const titles=new Set(),questions=new Set(),paths=new Set();
 for(const course of COURSES){
  const sim=course.responseSimulation;
  assert.ok(sim,course.id+' missing interactive decisions');
  assert.equal(sim.reviewStatus,'pending-independent-review');
  assert.equal(sim.rounds.length,2);
  assert.equal(sim.rubric.length,4);
  assert.ok(Object.isFrozen(sim)&&Object.isFrozen(sim.rounds)&&Object.isFrozen(sim.rubric));
  const lesson=course.lessons.find(l=>l.stage==='Intermediate');
  assert.equal(lesson.responseSimulation,sim,'editorial attachment must match the live case');
  assert.equal(sim.key,course.id+':'+lesson.id);
  assert.ok(sim.situation.length>=170);
  titles.add(sim.title);
  for(const [step,round] of sim.rounds.entries()){
   assert.ok(Object.isFrozen(round)&&Object.isFrozen(round.choices));
   assert.ok(!questions.has(round.prompt));
   questions.add(round.prompt);
   assert.equal(round.choices.length,3);
   assert.equal(round.choices.filter(choice=>choice[2]).length,1);
   const labels=new Set();
   for(const [i,choice] of round.choices.entries()){
    assert.ok(Object.isFrozen(choice));
    assert.ok(choice[0].length>=27&&choice[1].length>=65,course.id+' too little decision feedback');
    assert.ok(!labels.has(choice[0]));
    labels.add(choice[0]);
    assert.ok(!paths.has(choice[1]),course.id+' repeated consequence');
    paths.add(choice[1]);
    assert.deepEqual(evaluateResponseChoice(sim,step,i),{
     stronger:choice[2],consequence:choice[1],
     next:step===0?'Review the new evidence below.':'Complete the independent synthesis below.'
    });
   }
  }
  assert.ok(sim.synthesis.length>=120&&sim.model.length>=140);
 }
 assert.equal(titles.size,14);
 assert.equal(questions.size,28);
 assert.equal(paths.size,84);
 assert.throws(()=>validateResponseSimulations([]),/subject coverage/);
});

test('simulations are progressive, accessible and safe under invalid choices',()=>{
 for(const course of COURSES){
  const html=responseSimulationPanel(course);
  assert.match(html,/data-simulation-course="/);
  assert.equal((html.match(/class="response-simulation-round"/g)||[]).length,2);
  assert.equal((html.match(/data-sim-choice="/g)||[]).length,6);
  assert.match(html,/data-sim-step="1" hidden/);
  assert.match(html,/class="response-simulation-final" hidden/);
  assert.match(html,/aria-pressed="false"/);
  assert.match(html,/aria-live="polite"/);
  assert.match(html,/class="response-simulation-shell"/);
  assert.match(html,/Compare with an illustrative worked response/);
  assert.match(html,/None of these choices is recorded, scored/);
 }
 assert.equal(evaluateResponseChoice(null,0,1),null);
 assert.equal(evaluateResponseChoice(COURSES[0].responseSimulation,-1,0),null);
 assert.equal(evaluateResponseChoice(COURSES[0].responseSimulation,2,0),null);
 assert.equal(evaluateResponseChoice(COURSES[0].responseSimulation,0,3),null);
 assert.equal(evaluateResponseChoice(COURSES[0].responseSimulation,0,NaN),null);
 assert.equal(activateResponseSimulationChoice(null,0,0),false);
 const renderer=fs.readFileSync('responsesimulations.js','utf8');
 assert.doesNotMatch(renderer,/\bfetch\(|\blocalStorage\b|\bsessionStorage\b|\bpersist\(/);
 assert.doesNotMatch(renderer,/\.innerHTML\s*=/,'no user-triggered HTML injection');
});

test('qualified reviewers see exact scenarios, every alternative and changed evidence in hash',()=>{
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.equal(packet.totals.subjects,14);
 assert.equal(packet.totals.lessons,139);
 assert.equal(packet.totals.uniqueSourceURLs,52);
 assert.equal(packet.totals.expertApprovedLessons,0);
 const rows=packet.lessons.filter(x=>x.content.interactiveDecisionSimulation);
 assert.equal(rows.length,14);
 for(const row of rows){
  const sim=row.content.interactiveDecisionSimulation;
  assert.equal(sim.reviewStatus,'pending-independent-review');
  assert.equal(sim.rounds.length,2);
  assert.equal(sim.rounds[0].options.length,3);
  assert.equal(sim.rounds[1].options.length,3);
  assert.equal(row.reviewerAttestation,null);
  assert.equal(row.contentHash,reviewHash(row.content));
  const modified={...row.content,interactiveDecisionSimulation:{...sim,rounds:[
   {...sim.rounds[0],options:[{...sim.rounds[0].options[0],consequence:'Revised specialist feedback'},...sim.rounds[0].options.slice(1)]},
   sim.rounds[1]
  ]}};
  assert.notEqual(row.contentHash,reviewHash(modified));
 }
});
test('decision alternatives also join intermediate lesson narration and the offline bundle',()=>{
 for(const course of COURSES){
  const lesson=course.lessons.find(l=>l.stage==='Intermediate');
  const simulation=course.responseSimulation;
  const speech=buildLessonNarration(course,lesson,{maxLength:240}).join(' ');
  assert.ok(speech.includes('Interactive decision simulation: '+simulation.title),course.id+' narration missing');
 }
 const app=fs.readFileSync('app.js','utf8');
 assert.match(app,/responseSimulationPanel\(c\)/);
 assert.ok(app.length<240000,'main script must remain under the fixed asset budget');
 const sw=fs.readFileSync('sw.js','utf8');
 const build=fs.readFileSync('scripts/build.mjs','utf8');
 for(const file of ['responsesimulations.js','responsesimulations1.js','responsesimulations2.js','response-simulations.css']){
  assert.ok(sw.includes('/'+file),file+' missing from PWA');
  assert.ok(build.includes("'"+file+"'"),file+' missing from static output');
 }
 assert.ok(fs.readFileSync('index.html','utf8').includes('href="/response-simulations.css"'));
});
