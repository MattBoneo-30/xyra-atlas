/** Audit externally verified exact-phrase review evidence without reading learner state. */
import fs from 'node:fs';
import path from 'node:path';
import {PHRASEBOOK} from '../phrasebook.js';
import {LANGUAGES} from '../data.js';
import {buildLanguageReviewPacket} from './language-review-packet.mjs';
import {auditLanguageAttestations} from './language-attestations.mjs';
const packet=buildLanguageReviewPacket(PHRASEBOOK,LANGUAGES);
if(packet.summary.languages!==20||packet.summary.phrases!==160)
 throw Error('Phrase inventory changed: revalidate language review coverage');
const roster=JSON.parse(fs.readFileSync('docs/language-reviewers.json','utf8'));
const ledger=JSON.parse(fs.readFileSync('docs/language-attestations.json','utf8'));
const report=auditLanguageAttestations(packet,roster,ledger);
fs.mkdirSync('artifacts',{recursive:true});
fs.writeFileSync(path.join('artifacts','language-attestation-audit.json'),JSON.stringify(report,null,2)+'\n');
console.log('Independent language evidence:',JSON.stringify(report.totals));
console.log('Review complete:',report.reviewEvidenceComplete,'— no automatic stage approval.');
if(report.rejections.length){
 console.error('Rejected attestations:',JSON.stringify(report.rejections));
 process.exitCode=1;
}
