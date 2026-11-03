/** Public source-content editorial handoff — never exports user notes. */
import fs from 'node:fs';
import path from 'node:path';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from './editorial-review-packet.mjs';
const packet=buildEditorialReviewPacket(COURSES,CLINICS);
if(packet.totals.subjects!==14||packet.totals.lessons!==134||packet.totals.decisions!==42)
 throw Error('Curriculum changed: reviewer inventory must be explicitly revalidated');
const output=path.join(process.cwd(),'artifacts','editorial-review-packet.json');
fs.mkdirSync(path.dirname(output),{recursive:true});
fs.writeFileSync(output,JSON.stringify(packet,null,2)+'\n');
console.log('Reviewer-ready author content:',JSON.stringify(packet.totals));
console.log('Pending independent human signoff for all lessons and decisions. File: '+output);
