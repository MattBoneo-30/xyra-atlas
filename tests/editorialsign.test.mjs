import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync} from 'node:crypto';
import fs from 'node:fs';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from '../scripts/editorial-review-packet.mjs';
import {createSignedReview} from '../scripts/editorial-sign.mjs';
import {auditEditorialAttestations,REQUIRED_REVIEW_SCOPE} from '../scripts/editorial-attestations.mjs';
test('offline signer produces a verifiable exact-content Ed25519 review without storing private keys',()=>{
 const keys=generateKeyPairSync('ed25519');
 const packet=buildEditorialReviewPacket(COURSES,CLINICS);
 const target=packet.lessons.find(x=>x.course==='psychology');
 const payload={schemaVersion:1,kind:'lesson',itemId:target.id,contentHash:target.contentHash,
  reviewerId:'independent-test',reviewDate:'2026-11-01',verdict:'approved',
  scope:[...REQUIRED_REVIEW_SCOPE],
  notes:'An independently written toy review in a unit test. Not a real professional review or public qualification.'};
 const entry=createSignedReview(payload,keys.privateKey.export({type:'pkcs8',format:'pem'}));
 assert.equal(entry.signature.length,88);
 assert.equal(entry.payload.contentHash,target.contentHash);
 const roster={schemaVersion:1,reviewers:[{id:'independent-test',independentIdentityVerified:true,
   qualificationsChecked:true,verifiedOn:'2026-10-25',subjects:['psychology'],
   qualificationEvidence:'Review qualifications checked for this unit test only',
   publicKeyPem:keys.publicKey.export({type:'spki',format:'pem'})}]};
 const status=auditEditorialAttestations(packet,roster,{schemaVersion:1,attestations:[entry]});
 assert.equal(status.totals.approvedLessons,1);
 assert.equal(status.reviewEvidenceComplete,false);
 const tampered={...entry,payload:{...payload,notes:'This changed note is not part of the original signed statement and must fail.'}};
 const failed=auditEditorialAttestations(packet,roster,{schemaVersion:1,attestations:[tampered]});
 assert.equal(failed.rejections[0].reason,'invalid-cryptographic-signature');
});
test('signer rejects incomplete reviews, non-Ed25519 keys and in-repo key leakage in CLI',()=>{
 const keys=generateKeyPairSync('ed25519');
 const payload={schemaVersion:1,kind:'lesson',itemId:'psychology:thoughts',
   contentHash:'a'.repeat(64),reviewerId:'x',reviewDate:'2026-11-01',verdict:'approved',
   scope:[...REQUIRED_REVIEW_SCOPE],notes:'This is merely a long sample for an intentionally invalid signing test.'};
 assert.throws(()=>createSignedReview({...payload,scope:[]},keys.privateKey.export({type:'pkcs8',format:'pem'})),/incomplete/);
 const rsa=generateKeyPairSync('rsa',{modulusLength:2048});
 assert.throws(()=>createSignedReview(payload,rsa.privateKey.export({type:'pkcs8',format:'pem'})),/Ed25519/);
 const source=fs.readFileSync('scripts/sign-editorial-review.mjs','utf8');
 assert.match(source,/keyPath\.startsWith\(root\+path\.sep\)/);
 assert.match(source,/flag:'wx'/);
 assert.match(source,/0o600/);
 const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
 assert.match(pkg.scripts['sign:editorial'],/sign-editorial-review\.mjs/);
});
