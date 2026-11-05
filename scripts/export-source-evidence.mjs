/** Export public authored content only; no learner state or network access. */
import fs from 'node:fs';
import path from 'node:path';
import {COURSES} from '../data.js';
import {CLINICS} from '../clinics.js';
import {buildEditorialReviewPacket} from './editorial-review-packet.mjs';
import {buildSourceEvidenceMatrix,renderSourceEvidenceWorkbook} from './source-evidence-matrix.mjs';
const packet=buildEditorialReviewPacket(COURSES,CLINICS);
const matrix=buildSourceEvidenceMatrix(packet);
if(matrix.summary.distinctURLs!==51||packet.lessons.length!==139||packet.decisions.length!==42)
 throw Error('Source/course inventory changed: update and revalidate review coverage');
const dir=path.join(process.cwd(),'artifacts');
fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'source-evidence-matrix.json'),JSON.stringify(matrix,null,2)+'\n');
fs.writeFileSync(path.join(dir,'source-evidence-workbook.md'),renderSourceEvidenceWorkbook(matrix));
console.log('Atlas source evidence inventory:',JSON.stringify(matrix.summary));
console.log('All source-claim accuracy review remains pending independent qualified editors.');
