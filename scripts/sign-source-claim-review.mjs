/** Private-key-side signer for genuine external reviews; writes outside app bundle. */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createPrivateKey,sign} from 'node:crypto';
import {signedSourceClaimPayload} from './source-claim-attestations.mjs';
const args=process.argv.slice(2);
if(args.length!==2)throw Error('Usage: npm run sign:claims -- <completed-source-review.json> <outside-repo-ed25519.pem>');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const keyPath=fs.realpathSync(args[1]);
if(keyPath===root||keyPath.startsWith(root+path.sep))
 throw Error('Never keep a private signing key inside the repository');
const payload=JSON.parse(fs.readFileSync(args[0],'utf8'));
if(payload.schemaVersion!==1||!['lesson','decision'].includes(payload.kind)||
 !Array.isArray(payload.claims)||payload.claims.length===0||
 payload.allMaterialClaimsReviewed!==true||payload.allAnswerKeysReviewed!==true)
 throw Error('The reviewer must finish all genuine claim and answer-key examination first');
const key=createPrivateKey(fs.readFileSync(keyPath,'utf8'));
if(key.asymmetricKeyType!=='ed25519')throw Error('Expected Ed25519 private key');
const signature=sign(null,signedSourceClaimPayload(payload),key).toString('base64');
const dir=path.join(root,'artifacts');fs.mkdirSync(dir,{recursive:true});
const label=[payload.sourceId,payload.kind,payload.itemId].join('-').replace(/[^a-z0-9-]/gi,'-').slice(0,110);
const file=path.join(dir,'source-claim-signed-'+label+'.json');
fs.writeFileSync(file,JSON.stringify({payload,signature},null,2)+'\n',{mode:0o600,flag:'wx'});
console.log('Signed source-use review:',file,'— verify real external reviewer credentials before importing.');
