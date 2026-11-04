/** Offline audit of independently signed source-to-teaching claim receipts. */
import fs from 'node:fs';
import path from 'node:path';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from './editorial-review-packet.mjs';
import {buildSourceEvidenceMatrix} from './source-evidence-matrix.mjs';
import {auditSourceClaimAttestations} from './source-claim-attestations.mjs';
const packet=buildEditorialReviewPacket(COURSES,CLINICS);
const matrix=buildSourceEvidenceMatrix(packet);
const roster=JSON.parse(fs.readFileSync('docs/editorial-reviewers.json','utf8'));
const ledger=JSON.parse(fs.readFileSync('docs/source-claim-attestations.json','utf8'));
const audit=auditSourceClaimAttestations(matrix,roster,ledger);
if(audit.totals.distinctSourceURLs!==42||packet.lessons.length!==134||
 packet.decisions.length!==42)
 throw Error('Source inventory changed: source-claim review process requires revalidation.');
const dest=path.join(process.cwd(),'artifacts','source-claim-attestation-audit.json');
fs.mkdirSync(path.dirname(dest),{recursive:true});
fs.writeFileSync(dest,JSON.stringify(audit,null,2)+'\n');
console.log('Independent source-claim evidence:',JSON.stringify(audit.totals));
console.log('Full evidence coverage:',audit.reviewEvidenceComplete,'— no stage gate is automatically approved.');
if(audit.rejections.length){
 console.error('Invalid external claims:',JSON.stringify(audit.rejections));
 process.exitCode=1;
}
