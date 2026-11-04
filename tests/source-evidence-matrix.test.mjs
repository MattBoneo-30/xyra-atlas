import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {buildSourceEvidenceMatrix,renderSourceEvidenceWorkbook} from '../scripts/source-evidence-matrix.mjs';
const packet=buildEditorialReviewPacket(COURSES,CLINICS);
test('all 42 authored reference URLs map every source-use context without expert claims',()=>{
 const matrix=buildSourceEvidenceMatrix(packet);
 assert.equal(matrix.summary.distinctURLs,42);
 assert.equal(matrix.summary.independentlyApprovedURLs,0);
 assert.equal(matrix.summary.independentlyApprovedUseSites,0);
 assert.ok(matrix.summary.sourceUseSites>=176);
 assert.ok(matrix.summary.highStakesUseSites>0);
 const expected=new Set([...packet.lessons.map(x=>'lesson:'+x.id),
   ...packet.decisions.map(x=>'decision:'+x.id)]);
 const actual=new Set(matrix.sources.flatMap(x=>x.usages.map(u=>u.kind+':'+u.itemId)));
 assert.deepEqual(actual,expected);
 for(const source of matrix.sources)for(const u of source.usages){
  const target=u.kind==='lesson'?packet.lessons.find(x=>x.id===u.itemId):
    packet.decisions.find(x=>x.id===u.itemId);
  assert.equal(u.contentHash,target.contentHash);
  assert.equal(u.humanClaimExtractionRequired,true);
  assert.equal(u.independentClaimValidation,false);
  assert.ok(u.authoredContext.authoredAnswer);
 }
});
test('readable workbook contains 42 source sections with review checklists, never approval',()=>{
 const x=buildSourceEvidenceMatrix(packet);
 const md=renderSourceEvidenceWorkbook(x);
 assert.equal((md.match(/URL SHA-256:/g)||[]).length,42);
 assert.ok(md.includes('No approvals are generated'));
 assert.ok(md.includes('not fact checked'));
 assert.deepEqual(x,buildSourceEvidenceMatrix(packet));
});
test('unreferenced, malformed and unsafe URLs fail closed',()=>{
 const a=structuredClone(packet);a.lessons[0].content.references=[];
 assert.throws(()=>buildSourceEvidenceMatrix(a),/Missing cited reference/);
 const b=structuredClone(packet);b.lessons[0].content.references[0].url='http://localhost/test';
 assert.throws(()=>buildSourceEvidenceMatrix(b),/Invalid author URL/);
 const c=structuredClone(packet);c.references.pop();
 assert.throws(()=>buildSourceEvidenceMatrix(c),/catalog differs/);
});
test('CI builds review artifacts without changing stage completion',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const workflow=fs.readFileSync('.github/workflows/verify.yml','utf8');
 const stage=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.match(pkg.scripts['export:source-evidence'],/export-source-evidence/);
 assert.match(workflow,/Export source-to-teaching review matrix/);
 assert.match(workflow,/source-evidence-matrix\.json/);
 assert.equal(stage.gates[0].complete,false);
});
