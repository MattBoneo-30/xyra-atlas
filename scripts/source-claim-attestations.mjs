/** Human claim-by-claim source-use approval intake (offline, no learner data).
 * Signed attestations are external evidence; a signature alone cannot prove
 * expertise, source correctness or exhaustive claim extraction.
 */
import {createHash,createPublicKey,verify} from 'node:crypto';
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const nonempty=(x,min=1)=>typeof x==='string'&&x.trim()===x&&x.length>=min;
const hash=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const signedFields=['schemaVersion','kind','itemId','contentHash','sourceId',
 'reviewerId','reviewDate','sourceAccessedOn','verdict','scope',
 'jurisdiction','allMaterialClaimsReviewed','allAnswerKeysReviewed','claims','notes'];
export const SOURCE_CLAIM_SCOPE=Object.freeze([
 'claim-to-passage-attribution','publisher-and-evidence-quality',
 'date-and-jurisdiction-applicability','quiz-and-scenario-answer-consistency'
]);
export function signedSourceClaimPayload(payload){
 if(!object(payload)||signedFields.some(k=>!Object.hasOwn(payload,k)))
  throw Error('Incomplete signed source claim review payload');
 return Buffer.from(JSON.stringify(Object.fromEntries(signedFields.map(k=>[k,payload[k]]))),'utf8');
}
function day(s,now){
 if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;
 const date=new Date(s+'T00:00:00Z');
 return Number.isFinite(date.valueOf())&&date.toISOString().slice(0,10)===s&&
 date.valueOf()<=now+86400000;
}
function daysBetween(a,b){return (Date.parse(a+'T00:00:00Z')-Date.parse(b+'T00:00:00Z'))/86400000;}
function flatText(value){
 if(typeof value==='string')return value;
 if(Array.isArray(value))return value.map(flatText).join('\n');
 if(object(value))return Object.values(value).map(flatText).join('\n');
 return '';
}
function checkSignature(payload,signature,pem){
 if(typeof signature!=='string'||!/^[A-Za-z0-9+/]+={0,2}$/.test(signature))return false;
 const raw=Buffer.from(signature,'base64');
 if(raw.length!==64||raw.toString('base64')!==signature)return false;
 try{
  const key=createPublicKey(pem);
  return key.asymmetricKeyType==='ed25519'&&verify(null,signedSourceClaimPayload(payload),key,raw);
 }catch{return false;}
}
function checkClaims(p,content){
 if(!Array.isArray(p.claims)||p.claims.length<1||p.claims.length>200)return false;
 const authored=flatText(content),seen=new Set();
 for(const claim of p.claims){
  if(!object(claim)||!nonempty(claim.claimText,12)||claim.claimText.length>1800||
    !authored.includes(claim.claimText)||seen.has(claim.claimText)||
    !nonempty(claim.sourcePassage,24)||claim.sourcePassage.length>700||
    !nonempty(claim.sourceLocation,8)||claim.sourceLocation.length>600||
    !nonempty(claim.contextualNotes,30)||claim.contextualNotes.length>6000||
    !['supported','partially-supported','unsupported','outdated','unverifiable'].includes(claim.finding))
    return false;
  seen.add(claim.claimText);
 }
 return true;
}
function vettedReviewer(r,subject,reviewDate,now){
 return object(r)&&nonempty(r.id)&&r.independentIdentityVerified===true&&
 r.qualificationsChecked===true&&day(r.verifiedOn,now)&&
 Array.isArray(r.subjects)&&r.subjects.includes(subject)&&
 nonempty(r.qualificationEvidence,15)&&
 typeof r.publicKeyPem==='string'&&r.publicKeyPem.startsWith('-----BEGIN PUBLIC KEY-----')&&
 reviewDate>=r.verifiedOn;
}
export function auditSourceClaimAttestations(matrix,roster,ledger,now=new Date()){
 const clock=now instanceof Date?now.valueOf():NaN;
 if(!Number.isFinite(clock))throw Error('Invalid review clock');
 if(!object(matrix)||matrix.status!=='source-usage-inventory-unreviewed'||
  !Array.isArray(matrix.sources))throw Error('Invalid source-use matrix');
 if(!object(roster)||roster.schemaVersion!==1||!Array.isArray(roster.reviewers))
  throw Error('Invalid verified editor roster');
 if(!object(ledger)||ledger.schemaVersion!==1||!Array.isArray(ledger.attestations))
  throw Error('Invalid source claim review ledger');
 const targets=new Map(),perSource=new Map();
 for(const source of matrix.sources){
  if(!object(source)||!hash(source.id)||!nonempty(source.url)||
   createHash('sha256').update(source.url).digest('hex')!==source.id||
   !Array.isArray(source.usages))throw Error('Invalid source entry');
  if(perSource.has(source.id))throw Error('Duplicate source digest');
  perSource.set(source.id,[]);
  for(const usage of source.usages){
   if(!object(usage)||!['lesson','decision'].includes(usage.kind)||
    !nonempty(usage.itemId)||!hash(usage.contentHash)||!object(usage.authoredContext))
    throw Error('Invalid source-use record');
   const key=[source.id,usage.kind,usage.itemId].join('|');
   if(targets.has(key))throw Error('Duplicate source usage');
   targets.set(key,{source,usage});
   perSource.get(source.id).push(key);
  }
 }
 const editors=new Map();
 for(const editor of roster.reviewers){
  if(!object(editor)||!nonempty(editor.id)||editors.has(editor.id))
   throw Error('Missing or duplicate qualified reviewer ID');
  editors.set(editor.id,editor);
 }
 const approved=new Set(),seen=new Set(),rejections=[];
 for(const [index,entry] of ledger.attestations.entries()){
  const reject=reason=>rejections.push({index,reason});
  if(!object(entry)||!object(entry.payload)){reject('malformed-attestation');continue;}
  const p=entry.payload;
  if(p.schemaVersion!==1||!['lesson','decision'].includes(p.kind)||
   !nonempty(p.itemId)||!hash(p.contentHash)||!hash(p.sourceId)||
   !nonempty(p.reviewerId)||!day(p.reviewDate,clock)||
   !day(p.sourceAccessedOn,clock)||daysBetween(p.reviewDate,p.sourceAccessedOn)<0||
   daysBetween(p.reviewDate,p.sourceAccessedOn)>30||
   !['approved','changes-requested'].includes(p.verdict)||
   !Array.isArray(p.scope)||p.scope.length!==SOURCE_CLAIM_SCOPE.length||
   new Set(p.scope).size!==SOURCE_CLAIM_SCOPE.length||
   !SOURCE_CLAIM_SCOPE.every(x=>p.scope.includes(x))||
   !nonempty(p.jurisdiction,2)||p.jurisdiction.length>120||
   !nonempty(p.notes,50)||p.notes.length>10000||
   p.allMaterialClaimsReviewed!==true||p.allAnswerKeysReviewed!==true){
   reject('invalid-review-details');continue;
  }
  const key=[p.sourceId,p.kind,p.itemId].join('|');
  const target=targets.get(key);
  if(!target){reject('source-usage-not-found');continue;}
  if(target.usage.contentHash!==p.contentHash){reject('stale-authored-content');continue;}
  const subject=target.usage.itemId.split(':')[0];
  const reviewer=editors.get(p.reviewerId);
  if(!vettedReviewer(reviewer,subject,p.reviewDate,clock)){
   reject('reviewer-not-independently-vetted-for-subject');continue;
  }
  const age=daysBetween(new Date(clock).toISOString().slice(0,10),p.reviewDate);
  if(age>(target.usage.highStakes?366:731)){
   reject('expired-review');continue;
  }
  if(!checkClaims(p,target.usage.authoredContext)){
   reject('incomplete-or-untraceable-claim-findings');continue;
  }
  if(!checkSignature(p,entry.signature,reviewer.publicKeyPem)){
   reject('invalid-cryptographic-signature');continue;
  }
  if(seen.has(key)){reject('duplicate-review-of-source-usage');continue;}
  seen.add(key);
  if(p.verdict==='approved'){
   if(p.claims.some(c=>c.finding!=='supported')){
    reject('unsupported-finding-cannot-be-approved');continue;
   }
   approved.add(key);
  }
 }
 const fullyReviewedURLs=[...perSource.values()].filter(keys=>
  keys.length>0&&keys.every(key=>approved.has(key))).length;
 const highStakes=Array.from(targets.entries()).filter(([,value])=>value.usage.highStakes);
 const totals={distinctSourceURLs:perSource.size,sourceUseSites:targets.size,
  fullyReviewedURLs,approvedSourceUseSites:approved.size,
  pendingSourceUseSites:targets.size-approved.size,
  highStakesSourceUseSites:highStakes.length,
  approvedHighStakesUseSites:highStakes.filter(([key])=>approved.has(key)).length,
  rejectedAttestations:rejections.length};
 return {schemaVersion:1,status:'independent-claim-evidence-intake',
  totals,rejections,
  reviewEvidenceComplete:targets.size>0&&approved.size===targets.size&&
   fullyReviewedURLs===perSource.size&&rejections.length===0,
  stageGateAutomaticallyChanged:false,
  limitations:[
   'This verifies reviewer-signed source-use documentation, not the truth of the quoted publisher content.',
   'An externally credential-verified reviewer must extract ALL material claims; a checklist alone cannot prove exhaustiveness.',
   'A signed source-use record never substitutes for separate editorial lesson and assessment approval or stage-gate authorization.'
  ]};
}
