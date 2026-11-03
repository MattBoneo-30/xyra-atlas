import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const stages=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
const expected=['advanced-curriculum','final-visual-experience','language-quality','release-readiness'];
test('four stage completion gates remain ordered and evidence based',()=>{
 assert.equal(stages.schemaVersion,1);
 assert.deepEqual(stages.order,expected);
 assert.deepEqual(stages.gates.map(g=>g.id),expected);
 assert.ok(stages.gates.every(g=>typeof g.complete==='boolean'&&typeof g.reportSent==='boolean'));
 for(let i=0;i<stages.gates.length;i++){
  const stage=stages.gates[i];
  assert.ok(stage.criteria.length>=3);
  assert.ok(Array.isArray(stage.evidence));
  assert.ok(Array.isArray(stage.blockers));
  if(stage.complete){
   assert.equal(stage.blockers.length,0,'no blockers can remain on completed gate');
   assert.ok(stage.evidence.length>=3,'stage completion must have evidence');
   assert.ok(stages.gates.slice(0,i).every(g=>g.complete),'earlier gates cannot be incomplete');
  }
  if(stage.reportSent)assert.equal(stage.complete,true,'report may not precede completion');
 }
});
test('curriculum editorial review is evidence-based and does not falsely claim expert signoff',()=>{
 const doc=fs.readFileSync('docs/curriculum-editorial-verification.md','utf8');
 assert.match(doc,/still in progress/);
 assert.match(doc,/National Privacy Commission/);
 assert.match(doc,/Bangko Sentral/);
 assert.match(doc,/Department of Trade and Industry/);
 assert.match(doc,/lesson-by-lesson content audit/);
 assert.equal(stages.gates[0].complete,false,'structural coverage is not full independent review');
 assert.equal(stages.gates[0].reportSent,false);
});
