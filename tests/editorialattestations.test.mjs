import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,sign} from 'node:crypto';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {auditEditorialAttestations,signedReviewPayload,REQUIRED_REVIEW_SCOPE} from '../scripts/editorial-attestations.mjs';
const packet=buildEditorialReviewPacket(COURSES,CLINICS);
const blankRoster={schemaVersion:1,reviewers:[]},blankLedger={schemaVersion:1,attestations:[]};
test('no independent editor is silently invented or auto-approved',()=>{
 const a=auditEditorialAttestations(packet,blankRoster,blankLedger);
 assert.equal(a.totals.approvedLessons,0);
 assert.equal(a.totals.approvedDecisions,0);
 assert.equal(a.totals.pendingLessons,134);
 assert.equal(a.totals.pendingDecisions,42);
 assert.equal(a.totals.rejectedAttestations,0);
 assert.equal(a.reviewEvidenceComplete,false);
 assert.equal(a.stageGateAutomaticallyChanged,false);
 assert.deepEqual(JSON.parse(fs.readFileSync('docs/editorial-reviewers.json','utf8')),blankRoster);
 assert.deepEqual(JSON.parse(fs.readFileSync('docs/editorial-attestations.json','utf8')),blankLedger);
});
test('valid signed source hash is accepted only for a separately vetted reviewer and exact subject',()=>{
 const {privateKey,publicKey}=generateKeyPairSync('ed25519');
 const lesson=packet.lessons.find(l=>l.course==='laws');
 const roster={schemaVersion:1,reviewers:[{id:'external-reviewer-test',independentIdentityVerified:true,
  qualificationsChecked:true,verifiedOn:'2026-10-25',subjects:['laws'],
  qualificationEvidence:'external-review-evidence-verified-for-test',
  publicKeyPem:publicKey.export({type:'spki',format:'pem'})}]};
 const payload={schemaVersion:1,kind:'lesson',itemId:lesson.id,contentHash:lesson.contentHash,
  reviewerId:'external-reviewer-test',reviewDate:'2026-11-01',verdict:'approved',
  scope:[...REQUIRED_REVIEW_SCOPE],notes:'Test-only example of an independent review. This is not a real editor approval.'};
 const sig=p=>sign(null,signedReviewPayload(p),privateKey).toString('base64');
 const entry={payload,signature:sig(payload)};
 const original=auditEditorialAttestations(packet,roster,{schemaVersion:1,attestations:[entry]});
 assert.equal(original.totals.approvedLessons,1);
 assert.equal(original.totals.pendingLessons,133);
 assert.equal(original.reviewEvidenceComplete,false);
 const modified={...payload,contentHash:'f'.repeat(64)};
 assert.deepEqual(auditEditorialAttestations(packet,roster,{schemaVersion:1,attestations:[{payload:modified,signature:sig(modified)}]}).rejections.map(x=>x.reason),['stale-content-hash']);
 const wrong={...payload,notes:'Tampered editorial comments after signing the record; no trust should remain.'};
 assert.deepEqual(auditEditorialAttestations(packet,roster,{schemaVersion:1,attestations:[{payload:wrong,signature:entry.signature}]}).rejections.map(x=>x.reason),['invalid-cryptographic-signature']);
 const unverified=structuredClone(roster);unverified.reviewers[0].qualificationsChecked=false;
 assert.deepEqual(auditEditorialAttestations(packet,unverified,{schemaVersion:1,attestations:[entry]}).rejections.map(x=>x.reason),['reviewer-not-independently-vetted']);
 const badScope=structuredClone(roster);badScope.reviewers[0].subjects=['business'];
 assert.deepEqual(auditEditorialAttestations(packet,badScope,{schemaVersion:1,attestations:[entry]}).rejections.map(x=>x.reason),['reviewer-not-vetted-for-subject']);
});
test('unsigned, repeated or future attestations cannot manufacture stage completion',()=>{
 const p=packet.decisions[0];const payload={schemaVersion:1,kind:'decision',itemId:p.id,
 contentHash:p.contentHash,reviewerId:'fake',reviewDate:'2026-11-01',verdict:'approved',
 scope:[...REQUIRED_REVIEW_SCOPE],notes:'A note with sufficient text to be accepted by structural validators.'};
 const r=auditEditorialAttestations(packet,blankRoster,{schemaVersion:1,attestations:[{payload,signature:'fake'}]});
 assert.deepEqual(r.rejections.map(x=>x.reason),['reviewer-not-independently-vetted']);
 const late={...payload,reviewDate:'2099-01-01'};
 assert.deepEqual(auditEditorialAttestations(packet,blankRoster,{schemaVersion:1,attestations:[{payload:late,signature:'fake'}]}).rejections.map(x=>x.reason),['invalid-review-details']);
});
test('audit is wired into CI without gating normal learning on absent independent reviews',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const workflow=fs.readFileSync('.github/workflows/verify.yml','utf8');
 assert.match(pkg.scripts['audit:editorial'],/audit-editorial-attestations/);
 assert.match(workflow,/Audit supplied independent editorial attestations/);
 assert.match(workflow,/xyra-atlas-editorial-attestation-audit/);
 const stages=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8'));
 assert.equal(stages.gates[0].complete,false);
});
