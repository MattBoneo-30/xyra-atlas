import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const register=JSON.parse(fs.readFileSync('docs/claim-review-register.json','utf8'));
const stages=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
test('specific Philippine agency spot checks are documented without claiming professional approval',()=>{
 assert.equal(register.schemaVersion,1);
 assert.equal(register.primaryLinksChecked,4);
 assert.equal(register.totalDistinctCourseURLs,41);
 assert.equal(register.expertReviewRequired,true);
 assert.equal(register.claims.length,4);
 assert.ok(register.claims.every(x=>x.checkDate==='2026-11-04'&&x.jurisdiction==='Philippines'&&!x.independentExpertSignoff));
 assert.ok(register.claims.every(x=>new URL(x.url).protocol==='https:'&&x.limitation.length>45));
 assert.ok(new Set(register.claims.map(x=>x.key)).size===4);
 assert.equal(stages.gates[0].complete,false);
 assert.equal(stages.gates[0].reportSent,false);
 assert.ok(stages.gates[0].blockers.length>=2);
});
