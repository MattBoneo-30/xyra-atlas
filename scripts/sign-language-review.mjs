/** Sign a genuine external editor review without committing their private key. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createPrivateKey,sign} from 'node:crypto';
import {signedLanguagePayload,LANGUAGE_REVIEW_SCOPE} from './language-attestations.mjs';
const args=process.argv.slice(2);
if(args.length!==2)throw Error('Usage: npm run sign:language -- <review.json> <outside-repo-private.pem>');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=fs.realpathSync(args[0]),keyPath=fs.realpathSync(args[1]);
if(keyPath===root||keyPath.startsWith(root+path.sep))throw Error('Private signing key must remain OUTSIDE repository');
const p=JSON.parse(fs.readFileSync(source,'utf8'));
if(p.schemaVersion!==1||p.kind!=='language-phrase'||!/^[-\w]+:[-\w]+$/.test(p.itemId||'')||
 !/^[a-f0-9]{64}$/.test(p.contentHash||'')||
 typeof p.reviewerId!=='string'||!p.reviewerId.trim()||
 !/^\d{4}-\d{2}-\d{2}$/.test(p.reviewDate||'')||
 !['approved','changes-requested'].includes(p.verdict)||
 !Array.isArray(p.scope)||p.scope.length!==LANGUAGE_REVIEW_SCOPE.length||
 new Set(p.scope).size!==LANGUAGE_REVIEW_SCOPE.length||
 !LANGUAGE_REVIEW_SCOPE.every(s=>p.scope.includes(s))||
 typeof p.notes!=='string'||p.notes.trim().length<40||p.notes.length>10000)
 throw Error('Review is incomplete; editor must substantively assess all required scopes.');
const key=createPrivateKey(fs.readFileSync(keyPath,'utf8'));
if(key.asymmetricKeyType!=='ed25519')throw Error('Expected Ed25519 private key');
const signed={payload:p,signature:sign(null,signedLanguagePayload(p),key).toString('base64')};
const dir=path.join(root,'artifacts');fs.mkdirSync(dir,{recursive:true});
const output=path.join(dir,'language-signed-'+p.itemId.replace(/[^a-z0-9-]/gi,'-').slice(0,100)+'.json');
fs.writeFileSync(output,JSON.stringify(signed,null,2)+'\n',{mode:0o600,flag:'wx'});
console.log('Review signed:',output,'— owner must separately verify reviewer qualifications.');
