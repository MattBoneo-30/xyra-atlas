import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {generateKeyPairSync,sign} from 'node:crypto';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {buildSourceEvidenceMatrix} from '../scripts/source-evidence-matrix.mjs';
import {auditSourceClaimAttestations,signedSourceClaimPayload,SOURCE_CLAIM_SCOPE} from '../scripts/source-claim-attestations.mjs';

const packet=buildEditorialReviewPacket(COURSES,CLINICS);
const matrix=buildSourceEvidenceMatrix(packet);
const source=matrix.sources[0],usage=source.usages[0];
const subject=usage.itemId.split(':')[0];
const context=usage.authoredContext;
const authored=context.introduction||context.scenario;
assert.equal(typeof authored,'string');
const excerpt=authored.slice(0,Math.min(80,authored.length));
const today='2026-11-04',now=new Date('2026-11-04T12:00:00Z');
const keys=generateKeyPairSync('ed25519');
const reviewer={id:'qualified-source-editor-fixture',independentIdentityVerified:true,
 qualificationsChecked:true,verifiedOn:'2026-10-24',subjects:[subject],
 qualificationEvidence:'Externally verified domain credentials; mock test fixture only',
 publicKeyPem:keys.publicKey.export({format:'pem',type:'spki'})};
const review={schemaVersion:1,kind:usage.kind,itemId:usage.itemId,
 contentHash:usage.contentHash,sourceId:source.id,reviewerId:reviewer.id,
 reviewDate:today,sourceAccessedOn:today,verdict:'approved',
 scope:[...SOURCE_CLAIM_SCOPE],jurisdiction:'Global educational context',
 allMaterialClaimsReviewed:true,allAnswerKeysReviewed:true,
 claims:[{claimText:excerpt,sourcePassage:'Mock factual passage from a test-only publication; not an actual sourced quotation.',
 sourceLocation:'Publisher article section on relevant research',finding:'supported',
 contextualNotes:'Test fixture: evaluated a purported source with actual evidence strictly outside this artificial test.'}],
 notes:'Test-only evidence demonstrating a signed, attributed source-use finding; no independent person has reviewed Atlas.'};
const signed=(payload,privateKey=keys.privateKey)=>({
 payload,signature:sign(null,signedSourceClaimPayload(payload),privateKey).toString('base64')
});
const audit=(entries,roster=[reviewer],sourceMatrix=matrix)=>
 auditSourceClaimAttestations(sourceMatrix,{schemaVersion:1,reviewers:roster},
 {schemaVersion:1,attestations:entries},now);

test('default real inventory stays pending and never implies approvals',()=>{
 const output=audit([],[]);
 assert.equal(output.totals.distinctSourceURLs,42);
 assert.equal(output.totals.approvedSourceUseSites,0);
 assert.ok(output.totals.sourceUseSites>=176);
 assert.equal(output.totals.pendingSourceUseSites,output.totals.sourceUseSites);
 assert.equal(output.reviewEvidenceComplete,false);
 assert.equal(output.stageGateAutomaticallyChanged,false);
 assert.deepEqual(JSON.parse(fs.readFileSync('docs/source-claim-attestations.json','utf8')),
  {schemaVersion:1,attestations:[]});
});

test('a genuine-form signed precise source use can receive partial provisional evidence credit',()=>{
 const result=audit([signed(review)]);
 assert.equal(result.totals.approvedSourceUseSites,1);
 assert.equal(result.totals.pendingSourceUseSites,result.totals.sourceUseSites-1);
 assert.equal(result.reviewEvidenceComplete,false);
});

test('changed lesson hash, wrong subject and tampered notes revoke review',()=>{
 const altered=structuredClone(matrix);
 const i=altered.sources.findIndex(s=>s.id===source.id);
 altered.sources[i].usages[0].contentHash='b'.repeat(64);
 const stale=audit([signed(review)],[reviewer],altered);
 assert.deepEqual(stale.rejections.map(x=>x.reason),['stale-authored-content']);
 const wrong=audit([signed(review)],[{...reviewer,subjects:['wrong-course']}]);
 assert.deepEqual(wrong.rejections.map(x=>x.reason),['reviewer-not-independently-vetted-for-subject']);
 const tampered=signed(review);
 tampered.payload={...review,notes:'Changed signed findings to simulate an untrusted modification made after publication.'};
 assert.deepEqual(audit([tampered]).rejections.map(x=>x.reason),['invalid-cryptographic-signature']);
});

test('unsupported findings cannot be approved, corrections are not signoff',()=>{
 const withUnsupported={...review,claims:[{...review.claims[0],finding:'unsupported'}]};
 assert.deepEqual(audit([signed(withUnsupported)]).rejections.map(x=>x.reason),
 ['unsupported-finding-cannot-be-approved']);
 const corrections={...withUnsupported,verdict:'changes-requested'};
 const result=audit([signed(corrections)]);
 assert.equal(result.totals.approvedSourceUseSites,0);
 assert.equal(result.totals.rejectedAttestations,0);
});

test('duplicate, absent exact author excerpt and outdated source access fail closed',()=>{
 const duplicate=audit([signed(review),signed(review)]);
 assert.deepEqual(duplicate.rejections.map(x=>x.reason),['duplicate-review-of-source-usage']);
 const fabricated={...review,claims:[{...review.claims[0],
 claimText:'This nonexistent claim is not present within the authored material anywhere'}]};
 assert.deepEqual(audit([signed(fabricated)]).rejections.map(x=>x.reason),
 ['incomplete-or-untraceable-claim-findings']);
 const old={...review,sourceAccessedOn:'2026-09-01'};
 assert.deepEqual(audit([signed(old)]).rejections.map(x=>x.reason),['invalid-review-details']);
});

test('duplicate reviewer IDs and inconsistent source URLs are rejected',()=>{
 assert.throws(()=>audit([signed(review)],[reviewer,reviewer]),/Duplicate|duplicate/);
 const altered=structuredClone(matrix);altered.sources[0].url='https://a-different-source.example';
 assert.throws(()=>audit([],[],altered),/Invalid source entry/);
});

test('CI archives claim audit but does not approve the Advanced Curriculum gate',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const ci=fs.readFileSync('.github/workflows/verify.yml','utf8');
 const gate=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8')).gates[0];
 assert.match(pkg.scripts['audit:claims'],/audit-source-claims/);
 assert.match(pkg.scripts['sign:claims'],/sign-source-claim-review/);
 assert.match(ci,/Audit verified source-use claim reviews/);
 assert.match(ci,/artifacts\/source-claim-attestation-audit\.json/);
 assert.equal(gate.complete,false);
});
