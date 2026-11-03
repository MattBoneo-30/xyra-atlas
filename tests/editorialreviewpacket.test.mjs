import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {reviewHash,buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
test('independent editorial handoff includes stable source hashes for all authored teaching and questions',()=>{
 const pack=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.deepEqual(pack.totals,{subjects:14,lessons:134,decisions:42,uniqueSourceURLs:42,
   expertApprovedLessons:0,expertApprovedDecisions:0});
 assert.equal(pack.lessons.length,134);
 assert.equal(pack.decisions.length,42);
 assert.equal(new Set(pack.lessons.map(x=>x.id)).size,134);
 assert.equal(new Set(pack.decisions.map(x=>x.id)).size,42);
 assert.ok(pack.lessons.every(x=>x.contentHash===reviewHash(x.content)));
 assert.ok(pack.decisions.every(x=>x.contentHash===reviewHash(x.content)));
 assert.ok(pack.lessons.every(x=>x.reviewStatus==='pending-independent-review'&&x.reviewerAttestation===null));
 assert.ok(pack.decisions.every(x=>x.reviewStatus==='pending-independent-review'&&x.reviewerAttestation===null));
 assert.ok(pack.lessons.filter(x=>x.highStakes).length>0);
 assert.ok(pack.lessons.every(x=>x.content.stagePractice.length===2&&x.content.quiz.options.length>=3));
 assert.ok(pack.references.every(x=>x.url.startsWith('https://')));
 assert.equal(pack.reviewPolicy.independentIdentityAndQualificationsMustBeVerified,true);
});
test('changing a teaching claim or answer necessarily changes its verification digest',()=>{
 const pack=buildEditorialReviewPacket(COURSES,CLINICS);
 const a=pack.lessons[0].content;
 const changed={...a,workedExample:a.workedExample+' editorial correction'};
 assert.notEqual(reviewHash(changed),pack.lessons[0].contentHash);
 const exam=pack.decisions[0].content;
 assert.notEqual(reviewHash({...exam,correct:(exam.correct+1)%exam.options.length}),pack.decisions[0].contentHash);
 const second=buildEditorialReviewPacket(COURSES,CLINICS);
 assert.deepEqual(pack,second);
});
test('CI produces a reviewer artifact but never treats self-generated evidence as expert approval',()=>{
 const flow=fs.readFileSync('.github/workflows/verify.yml','utf8');
 const packageData=JSON.parse(fs.readFileSync('package.json','utf8'));
 assert.match(packageData.scripts['export:editorial'],/export-editorial-review/);
 assert.match(flow,/Export independent editorial review packet/);
 assert.match(flow,/xyra-atlas-editorial-review-packet/);
 const gates=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(gates.gates[0].complete,false);
 assert.equal(gates.gates[0].reportSent,false);
});
