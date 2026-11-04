import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {generateKeyPairSync,sign} from 'node:crypto';
import {auditLanguageAttestations,signedLanguagePayload,LANGUAGE_REVIEW_SCOPE} from '../scripts/language-attestations.mjs';
const {privateKey,publicKey}=generateKeyPairSync('ed25519');
const date='2026-11-04',now=new Date('2026-11-04T12:00:00Z');
const phrase={id:'es:hello',contentHash:'a'.repeat(64),content:{locale:'es-ES'}};
const reviewer={id:'independent-test-editor',independentIdentityVerified:true,qualificationsChecked:true,
 verifiedOn:date,verifiedLocales:['es-ES'],
 qualificationEvidence:'Independently verified external language credentials, test only',
 publicKeyPem:publicKey.export({type:'spki',format:'pem'})};
const p={schemaVersion:1,kind:'language-phrase',itemId:phrase.id,contentHash:phrase.contentHash,
 reviewerId:reviewer.id,reviewDate:date,verdict:'approved',scope:[...LANGUAGE_REVIEW_SCOPE],
 notes:'Independent test-only editorial assessment of accuracy, register, script and authentic pronunciation.'};
const entry=q=>({payload:q,signature:sign(null,signedLanguagePayload(q),privateKey).toString('base64')});
const audit=(list,reviewers=[reviewer],phrases=[phrase])=>
 auditLanguageAttestations({records:phrases},{schemaVersion:1,reviewers},{schemaVersion:1,attestations:list},now);
test('empty review evidence remains 0 approved, not release-final',()=>{
 const r=audit([]);assert.equal(r.totals.approvedPhrases,0);
 assert.equal(r.reviewEvidenceComplete,false);assert.equal(r.stageGateAutomaticallyChanged,false);
 assert.deepEqual(JSON.parse(fs.readFileSync('docs/language-reviewers.json','utf8')).reviewers,[]);
 assert.deepEqual(JSON.parse(fs.readFileSync('docs/language-attestations.json','utf8')).attestations,[]);
});
test('only a valid real signed exact-locale review receives provisional credit',()=>{
 const r=audit([entry(p)]);assert.equal(r.reviewEvidenceComplete,true);
 assert.deepEqual(r.byLocale['es-ES'],{total:1,approved:1,pending:0});
});
test('corrections do not constitute approval',()=>{
 assert.equal(audit([entry({...p,verdict:'changes-requested'})]).totals.approvedPhrases,0);
});
test('source changes revoke old review',()=>{
 assert.equal(audit([entry(p)],[reviewer],[{...phrase,contentHash:'b'.repeat(64)}]).rejections[0].reason,'stale-source-hash');
});
test('mismatched locale and unverified editor cannot claim approval',()=>{
 assert.equal(audit([entry(p)],[{...reviewer,verifiedLocales:['es-MX']}]).rejections[0].reason,'reviewer-not-vetted-for-locale');
 assert.throws(()=>audit([entry(p)],[{...reviewer,qualificationsChecked:false}]),/Unverified/);
});
test('tampered signatures and duplicate submissions fail closed',()=>{
 const edited=entry(p);edited.payload={...p,notes:'Altered full text, after signing, deliberately not authorized by this editor.'};
 assert.equal(audit([edited]).rejections[0].reason,'invalid-signature');
 const repeated=audit([entry(p),entry(p)]);
 assert.equal(repeated.rejections[0].reason,'duplicate-phrase-review');
 assert.equal(repeated.reviewEvidenceComplete,false);
});
test('missing required scope and future date cannot be approved',()=>{
 assert.equal(audit([entry({...p,scope:p.scope.slice(0,5)})]).rejections[0].reason,'invalid-review-details');
 assert.equal(audit([entry({...p,reviewDate:'2099-01-01'})]).rejections[0].reason,'invalid-review-details');
});
test('CI integration creates audit and never pre-approves editorial stage',()=>{
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 const ci=fs.readFileSync('.github/workflows/verify.yml','utf8');
 assert.match(pkg.scripts['audit:language'],/audit-language-attestations/);
 assert.match(ci,/Audit qualified language reviewer signatures/);
 const gate=JSON.parse(fs.readFileSync('docs/stage-gates.json','utf8')).gates.find(x=>x.id==='language-quality');
 assert.equal(gate.complete,false);
});
