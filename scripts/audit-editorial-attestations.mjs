/** CLI audit of externally signed reviews. No user data or private keys. */
import fs from 'node:fs';
import path from 'node:path';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from './editorial-review-packet.mjs';
import {auditEditorialAttestations} from './editorial-attestations.mjs';
const packet=buildEditorialReviewPacket(COURSES,CLINICS);
const roster=JSON.parse(fs.readFileSync('docs/editorial-reviewers.json','utf8'));
const ledger=JSON.parse(fs.readFileSync('docs/editorial-attestations.json','utf8'));
const audit=auditEditorialAttestations(packet,roster,ledger);
const out=path.join(process.cwd(),'artifacts','editorial-attestation-audit.json');
fs.mkdirSync(path.dirname(out),{recursive:true});
fs.writeFileSync(out,JSON.stringify(audit,null,2)+'\n');
console.log('Independent editorial signoff:',JSON.stringify(audit.totals));
console.log('Evidence complete:',audit.reviewEvidenceComplete,'— stage gates require separate human approval.');
if(audit.rejections.length){console.error('Invalid supplied editorial attestations:',JSON.stringify(audit.rejections));process.exitCode=1;}
