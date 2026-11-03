/** Locally sign an independently completed editorial review without uploading secrets.
 * Usage: npm run sign:editorial -- review.json /outside/repo/private.pem
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createSignedReview} from './editorial-sign.mjs';
const args=process.argv.slice(2);
if(args.length!==2)throw Error('Usage: npm run sign:editorial -- <review-payload.json> <private-key.pem>');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const input=fs.realpathSync(args[0]),keyPath=fs.realpathSync(args[1]);
if(keyPath===root||keyPath.startsWith(root+path.sep))
 throw Error('Private reviewer key must be stored OUTSIDE the repository, not inside a project or artifacts folder.');
const payload=JSON.parse(fs.readFileSync(input,'utf8'));
const signed=createSignedReview(payload,fs.readFileSync(keyPath,'utf8'));
const outDir=path.join(root,'artifacts');
fs.mkdirSync(outDir,{recursive:true});
const name=payload.kind+'-'+payload.itemId.replace(/[^a-z0-9-]/gi,'-').slice(0,120);
const output=path.join(outDir,'editorial-signed-'+name+'.json');
fs.writeFileSync(output,JSON.stringify(signed,null,2)+'\n',{mode:0o600,flag:'wx'});
console.log('Signed editorial record written to '+output);
console.log('No private key was copied. The owner must independently verify the reviewer and import this record into the ledger.');
