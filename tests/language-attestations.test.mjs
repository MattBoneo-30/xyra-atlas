import {test} from 'node:test';
import {strict as assert} from 'node:assert';
import {generateKeyPairSync,sign} from 'node:crypto';
import {buildLanguageReviewPacket} from '../scripts/language-review-packet.mjs';
import {auditLanguageAttestations,LANGUAGE_REVIEW_SCOPE,signedLanguagePayload} from '../scripts/language-attestations.mjs';
const {publicKey,privateKey}=generateKeyPairSync('ed25519');
const packet=buildLanguageReviewPacket({
 es:{locale:'es-ES',phrases:[{id:'hello',english:'Hello',target:'Hola'}]},
 fr:{locale:'fr-FR',phrases:[{id:'hello',english:'Hello',target:'Bonjour'}]}
},[{code:'es',name:'Spanish'},{code:'fr',name:'French'}]);
const clock=new Date('2026-11-04T12:00:00Z');
const reviewer={id:'verified-linguist',independentIdentityVerified:true,qualificationsChecked:true,
 verifiedOn:'2026-10-01',verifiedLocales:['es-ES','fr-FR'],
 qualificationEvidence:'Verified external credential and native language portfolio',
 publicKeyPem:publicKey.export({format:'pem',type:'spki'})};
const roster=()=>({schemaVersion:1,reviewers:[structuredClone(reviewer)]});
const ledger=()=>({schemaVersion:1,attestations:[]});
const row=packet.records[0];
const payload=(item=row,overrides={})=>({
 schemaVersion:1,kind:'language-phrase',itemId:item.id,contentHash:item.contentHash,
 reviewerId:reviewer.id,reviewDate:'2026-11-04',verdict:'approved',
 scope:[...LANGUAGE_REVIEW_SCOPE],
 notes:'Reviewed translation, context, dialect and romanization against native regional usage.',
 ...overrides
});
const signed=p=>({payload:p,signature:sign(null,signedLanguagePayload(p),privateKey).toString('base64')});
const audit=(r=roster(),l=ledger())=>auditLanguageAttestations(packet,r,l,clock);
test('empty evidence never implies independent language approval',()=>{
 const report=audit();
 assert.deepEqual(report.totals,{phrases:2,approvedPhrases:0,pendingPhrases:2,rejectedAttestations:0});
 assert.equal(report.reviewEvidenceComplete,false);
 assert.equal(report.stageGateAutomaticallyChanged,false);
});
test('all independently vetted signed phrase approvals count only with exact hashes',()=>{
 const l=ledger();l.attestations=packet.records.map(item=>signed(payload(item)));
 const report=audit(roster(),l);
 assert.equal(report.reviewEvidenceComplete,true);
 assert.equal(report.totals.approvedPhrases,2);
 assert.equal(report.byLocale['fr-FR'].approved,1);
 assert.equal(report.stageGateAutomaticallyChanged,false);
});
test('changed source hashes invalidate even valid signatures',()=>{
 const l=ledger();l.attestations=[signed(payload(row,{contentHash:'a'.repeat(64)}))];
 assert.deepEqual(audit(roster(),l).rejections.map(x=>x.reason),['stale-source-hash']);
});
test('tampering after signing is rejected',()=>{
 const entry=signed(payload());entry.payload.notes+=' tampered';
 const l=ledger();l.attestations=[entry];
 assert.deepEqual(audit(roster(),l).rejections.map(x=>x.reason),['invalid-signature']);
});
test('reviewer must be vetted for the exact locale',()=>{
 const r=roster();r.reviewers[0].verifiedLocales=['fr-FR'];
 const l=ledger();l.attestations=[signed(payload())];
 assert.deepEqual(audit(r,l).rejections.map(x=>x.reason),['reviewer-not-vetted-for-locale']);
 r.reviewers[0].qualificationsChecked=false;
 assert.throws(()=>audit(r,l),/Unverified/);
});
test('changes requested cannot count as approval',()=>{
 const l=ledger();l.attestations=[signed(payload(row,{verdict:'changes-requested'}))];
 assert.equal(audit(roster(),l).totals.approvedPhrases,0);
});
test('duplicate signed reviews are rejected',()=>{
 const entry=signed(payload()),l=ledger();l.attestations=[entry,entry];
 assert.deepEqual(audit(roster(),l).rejections.map(x=>x.reason),['duplicate-phrase-review']);
});
test('incomplete scopes and future-dated reviews are rejected',()=>{
 const l=ledger();l.attestations=[signed(payload(row,{scope:['meaning-accuracy']}))];
 assert.deepEqual(audit(roster(),l).rejections.map(x=>x.reason),['invalid-review-details']);
 l.attestations=[signed(payload(row,{reviewDate:'2026-12-01'}))];
 assert.deepEqual(audit(roster(),l).rejections.map(x=>x.reason),['invalid-review-details']);
});
