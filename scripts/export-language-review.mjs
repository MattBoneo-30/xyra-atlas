/** Produce source-accurate reviewer copies without exporting learner state. */
import fs from 'node:fs';
import path from 'node:path';
import {PHRASEBOOK} from '../phrasebook.js';
import {LANGUAGES} from '../data.js';
import {buildLanguageReviewPacket,renderLanguageReviewMarkdown} from './language-review-packet.mjs';
const pack=buildLanguageReviewPacket(PHRASEBOOK,LANGUAGES);
if(pack.summary.languages!==20||pack.summary.phrases!==160)
 throw Error('Phrase inventory changed: explicit review packet revalidation required');
const dir=path.join(process.cwd(),'artifacts');
fs.mkdirSync(dir,{recursive:true});
const json=path.join(dir,'language-review-packet.json');
const markdown=path.join(dir,'language-review-workbook.md');
fs.writeFileSync(json,JSON.stringify(pack,null,2)+'\n');
fs.writeFileSync(markdown,renderLanguageReviewMarkdown(pack));
console.log('Language review inventory:',JSON.stringify(pack.summary));
console.log('No independent native-speaker/editor approvals. Files: '+json+' and '+markdown);
