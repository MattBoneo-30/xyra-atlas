/** Ed25519-backed external editorial review intake for Atlas.
 * A real reviewer must be independently credential-verified by the owner and
 * sign the exact source revision; running this code never manufactures approval.
 * Approvals do not update the stage gate automatically.
 */
import {verify,createPublicKey} from 'node:crypto';
const isRecord=x=>x!==null&&typeof x==='object'&&!Array.isArray(x);
const valid=s=>typeof s==='string'&&s.trim()===s&&s.length>0;
const hex64=s=>typeof s==='string'&&/^[0-9a-f]{64}$/.test(s);
const SIGNED_FIELDS=['schemaVersion','kind','itemId','contentHash','reviewerId','reviewDate','verdict','scope','notes'];
export const REQUIRED_REVIEW_SCOPE=Object.freeze(['learning-objectives','factual-accuracy','exercise-safety','assessment-quality','reference-support','cultural-context']);
export function signedReviewPayload(payload){
 if(!isRecord(payload)||SIGNED_FIELDS.some(k=>!Object.hasOwn(payload,k)))throw Error('Incomplete signed review payload');
 return Buffer.from(JSON.stringify(Object.fromEntries(SIGNED_FIELDS.map(k=>[k,payload[k]]))),'utf8');
}
function timeIsPlausible(day){
 if(typeof day!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(day))return false;
 const d=new Date(day+'T00:00:00Z');
 return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===day&&
 d.valueOf()<=Date.now()+86400000;
}
const base64=s=>typeof s==='string'&&s.length>40&&s.length<300&&
 /^[A-Za-z0-9+/]+={0,2}$/.test(s)&&Buffer.from(s,'base64').toString('base64')===s;
function reviewerRecord(item){
 return isRecord(item)&&valid(item.id)&&item.id.length<=80&&
 item.independentIdentityVerified===true&&item.qualificationsChecked===true&&
 timeIsPlausible(item.verifiedOn)&&Array.isArray(item.subjects)&&item.subjects.every(valid)&&
 typeof item.publicKeyPem==='string'&&item.publicKeyPem.startsWith('-----BEGIN PUBLIC KEY-----')&&
 valid(item.qualificationEvidence)&&item.qualificationEvidence.length>=15;
}
function verifySignature(payload,signature,pem){
 if(!base64(signature))return false;
 try{
  const key=createPublicKey(pem);
  if(key.asymmetricKeyType!=='ed25519')return false;
  return verify(null,signedReviewPayload(payload),key,Buffer.from(signature,'base64'));
 }catch{return false;}
}
export function auditEditorialAttestations(packet,roster,ledger){
 if(!isRecord(packet)||!Array.isArray(packet.lessons)||!Array.isArray(packet.decisions))throw Error('Invalid author packet');
 if(!isRecord(roster)||roster.schemaVersion!==1||!Array.isArray(roster.reviewers))throw Error('Invalid reviewer roster');
 if(!isRecord(ledger)||ledger.schemaVersion!==1||!Array.isArray(ledger.attestations))throw Error('Invalid review ledger');
 const targets=new Map([...packet.lessons.map(x=>['lesson:'+x.id,x]),...packet.decisions.map(x=>['decision:'+x.id,x])]);
 const reviewers=new Map(roster.reviewers.filter(x=>isRecord(x)&&valid(x.id)).map(x=>[x.id,x]));
 const approvals=new Map(),rejections=[],seen=new Set();
 for(const [index,record] of ledger.attestations.entries()){
  const fail=reason=>{rejections.push({index,reason});};
  if(!isRecord(record)||!isRecord(record.payload)){fail('malformed');continue;}
  const p=record.payload;
  if(p.schemaVersion!==1||!['lesson','decision'].includes(p.kind)||!valid(p.itemId)||!hex64(p.contentHash)||
    !valid(p.reviewerId)||!timeIsPlausible(p.reviewDate)||
    !['approved','changes-requested'].includes(p.verdict)||
    !Array.isArray(p.scope)||new Set(p.scope).size!==REQUIRED_REVIEW_SCOPE.length||
    !REQUIRED_REVIEW_SCOPE.every(x=>p.scope.includes(x))||
    !valid(p.notes)||p.notes.length<40||p.notes.length>10000){fail('invalid-review-details');continue;}
  const target=targets.get(p.kind+':'+p.itemId);
  if(!target){fail('unrecognized-content');continue;}
  if(target.contentHash!==p.contentHash){fail('stale-content-hash');continue;}
  const reviewer=reviewers.get(p.reviewerId);
  if(!reviewerRecord(reviewer)){fail('reviewer-not-independently-vetted');continue;}
  const courseId=(p.kind==='lesson'?target.course:target.content.courseId);
  if(!reviewer.subjects.includes(courseId)){fail('reviewer-not-vetted-for-subject');continue;}
  // Genuine reviewers may sign only after vetting, not before.
  if(p.reviewDate<reviewer.verifiedOn){fail('review-predates-vetting');continue;}
  // Time-sensitive material must receive recent independent attention.
  const ageDays=(Date.now()-new Date(p.reviewDate+'T00:00:00Z').valueOf())/86400000;
  const maxAge=target.highStakes?366:731;
  if(ageDays>maxAge){fail('stale-review-date');continue;}
  if(!verifySignature(p,record.signature,reviewer.publicKeyPem)){fail('invalid-cryptographic-signature');continue;}
  const id=p.kind+':'+p.itemId;
  if(seen.has(id)){fail('duplicate-review-for-content');continue;}
  seen.add(id);
  if(p.verdict==='approved')approvals.set(id,{reviewerId:p.reviewerId,date:p.reviewDate});
 }
 const approvedLessons=packet.lessons.filter(l=>approvals.has('lesson:'+l.id)).length;
 const approvedDecisions=packet.decisions.filter(q=>approvals.has('decision:'+q.id)).length;
 const totals={lessons:packet.lessons.length,decisions:packet.decisions.length,
  approvedLessons,approvedDecisions,pendingLessons:packet.lessons.length-approvedLessons,
  pendingDecisions:packet.decisions.length-approvedDecisions,rejectedAttestations:rejections.length};
 return {schemaVersion:1,totals,rejections,reviewEvidenceComplete:
  approvedLessons===packet.lessons.length&&approvedDecisions===packet.decisions.length&&
  rejections.length===0,
  stageGateAutomaticallyChanged:false,
  limitations:['Cryptographic signatures prove control of a registered key, not an editor\'s real-world expertise.',
   'The owner must independently verify identities, credentials and published review scope before trusting a roster entry.',
   'No release stage is approved automatically: accuracy, claim provenance and other stage criteria require actual review.']};
}
