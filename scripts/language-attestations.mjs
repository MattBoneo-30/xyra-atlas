/** Exact-source, Ed25519-backed human language review intake.
 * A cryptographic signature does not independently establish reviewer expertise.
 */
import {createPublicKey,verify} from 'node:crypto';
const object=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const nonempty=x=>typeof x==='string'&&x.trim()===x&&x.length>0;
const sha=x=>typeof x==='string'&&/^[0-9a-f]{64}$/.test(x);
const fields=['schemaVersion','kind','itemId','contentHash','reviewerId','reviewDate','verdict','scope','notes'];
export const LANGUAGE_REVIEW_SCOPE=Object.freeze([
 'meaning-accuracy','register-politeness','regional-cultural-use',
 'script-transliteration','pronunciation-provenance','safety-naturalness'
]);
export function signedLanguagePayload(p){
 if(!object(p)||fields.some(x=>!Object.hasOwn(p,x)))throw Error('Incomplete signed language payload');
 return Buffer.from(JSON.stringify(Object.fromEntries(fields.map(x=>[x,p[x]]))),'utf8');
}
function validDay(s,now){
 if(typeof s!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(s))return false;
 const d=new Date(s+'T00:00:00Z');
 return Number.isFinite(d.valueOf())&&d.toISOString().slice(0,10)===s&&d.valueOf()<=now+86400000;
}
function verifySigned(p,signature,pem){
 if(typeof signature!=='string'||!/^[A-Za-z0-9+/]+={0,2}$/.test(signature))return false;
 const bytes=Buffer.from(signature,'base64');
 if(bytes.length!==64||bytes.toString('base64')!==signature)return false;
 try{
  const key=createPublicKey(pem);
  return key.asymmetricKeyType==='ed25519'&&verify(null,signedLanguagePayload(p),key,bytes);
 }catch{return false;}
}
export function auditLanguageAttestations(packet,roster,ledger,now=new Date()){
 const ts=now instanceof Date?now.valueOf():NaN;
 if(!Number.isFinite(ts))throw Error('Invalid audit clock');
 if(!object(packet)||!Array.isArray(packet.records))throw Error('Invalid language packet');
 if(!object(roster)||roster.schemaVersion!==1||!Array.isArray(roster.reviewers))throw Error('Invalid reviewer roster');
 if(!object(ledger)||ledger.schemaVersion!==1||!Array.isArray(ledger.attestations))throw Error('Invalid attestation ledger');
 const targets=new Map();
 for(const row of packet.records){
  if(!object(row)||!nonempty(row.id)||!sha(row.contentHash)||
   !object(row.content)||!nonempty(row.content.locale)||targets.has(row.id))
    throw Error('Invalid or duplicate phrase in source packet');
  targets.set(row.id,row);
 }
 const reviewers=new Map();
 for(const r of roster.reviewers){
  if(!object(r)||!nonempty(r.id)||r.id.length>80||reviewers.has(r.id)||
    r.independentIdentityVerified!==true||r.qualificationsChecked!==true||
    !validDay(r.verifiedOn,ts)||!Array.isArray(r.verifiedLocales)||
    !r.verifiedLocales.length||!r.verifiedLocales.every(nonempty)||
    new Set(r.verifiedLocales).size!==r.verifiedLocales.length||
    !nonempty(r.qualificationEvidence)||r.qualificationEvidence.length<15||
    typeof r.publicKeyPem!=='string'||!r.publicKeyPem.startsWith('-----BEGIN PUBLIC KEY-----'))
    throw Error('Unverified, duplicated, or malformed language reviewer');
  reviewers.set(r.id,r);
 }
 const approved=new Map(),seen=new Set(),rejections=[];
 for(const [index,entry] of ledger.attestations.entries()){
  const reject=reason=>rejections.push({index,reason});
  if(!object(entry)||!object(entry.payload)){reject('malformed-attestation');continue;}
  const p=entry.payload;
  if(p.schemaVersion!==1||p.kind!=='language-phrase'||!nonempty(p.itemId)||
    !sha(p.contentHash)||!nonempty(p.reviewerId)||!validDay(p.reviewDate,ts)||
    !['approved','changes-requested'].includes(p.verdict)||!Array.isArray(p.scope)||
    p.scope.length!==LANGUAGE_REVIEW_SCOPE.length||
    new Set(p.scope).size!==LANGUAGE_REVIEW_SCOPE.length||
    !LANGUAGE_REVIEW_SCOPE.every(s=>p.scope.includes(s))||
    !nonempty(p.notes)||p.notes.length<40||p.notes.length>10000){
    reject('invalid-review-details');continue;
  }
  const phrase=targets.get(p.itemId);
  if(!phrase){reject('unknown-phrase');continue;}
  if(phrase.contentHash!==p.contentHash){reject('stale-source-hash');continue;}
  const editor=reviewers.get(p.reviewerId);
  if(!editor){reject('reviewer-not-independently-vetted');continue;}
  if(!editor.verifiedLocales.includes(phrase.content.locale)){
    reject('reviewer-not-vetted-for-locale');continue;
  }
  if(p.reviewDate<editor.verifiedOn){reject('review-predates-vetting');continue;}
  if((ts-Date.parse(p.reviewDate+'T00:00:00Z'))/86400000>366){
    reject('expired-review');continue;
  }
  if(!verifySigned(p,entry.signature,editor.publicKeyPem)){
    reject('invalid-signature');continue;
  }
  if(seen.has(p.itemId)){reject('duplicate-phrase-review');continue;}
  seen.add(p.itemId);
  if(p.verdict==='approved')approved.set(p.itemId,{reviewerId:p.reviewerId,date:p.reviewDate});
 }
 const byLocale={};
 for(const row of packet.records){
  const locale=row.content.locale;
  if(!Object.hasOwn(byLocale,locale))byLocale[locale]={total:0,approved:0,pending:0};
  byLocale[locale].total++;
  if(approved.has(row.id))byLocale[locale].approved++;
  else byLocale[locale].pending++;
 }
 return {schemaVersion:1,
  totals:{phrases:targets.size,approvedPhrases:approved.size,
    pendingPhrases:targets.size-approved.size,rejectedAttestations:rejections.length},
  byLocale,rejections,
  reviewEvidenceComplete:targets.size>0&&approved.size===targets.size&&rejections.length===0,
  stageGateAutomaticallyChanged:false,
  limitations:[
   'Ed25519 proves possession of a key, not a reviewer\'s qualifications or honest assessment.',
   'The owner must independently confirm native or qualified regional linguistic expertise.',
   'Neither signed review nor synthesized device speech proves authentic pronunciation quality.'
  ]};
}
