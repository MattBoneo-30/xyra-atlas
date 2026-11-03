/** Optional local Ed25519 reviewer signing helper. Never stores keys or automates approval. */
import {createPrivateKey,sign} from 'node:crypto';
import {signedReviewPayload,REQUIRED_REVIEW_SCOPE} from './editorial-attestations.mjs';
export function createSignedReview(payload,privateKeyPem){
 if(!payload||typeof payload!=='object'||Array.isArray(payload))throw Error('Invalid review payload');
 if(payload.schemaVersion!==1||!['lesson','decision'].includes(payload.kind)||
  typeof payload.itemId!=='string'||!payload.itemId.trim()||
  typeof payload.contentHash!=='string'||!/^[0-9a-f]{64}$/.test(payload.contentHash)||
  typeof payload.reviewerId!=='string'||!payload.reviewerId.trim()||
  !['approved','changes-requested'].includes(payload.verdict)||
  typeof payload.reviewDate!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(payload.reviewDate)||
  !Array.isArray(payload.scope)||payload.scope.length!==REQUIRED_REVIEW_SCOPE.length||
  !REQUIRED_REVIEW_SCOPE.every(s=>payload.scope.includes(s))||
  typeof payload.notes!=='string'||payload.notes.length<40)
  throw Error('Cannot sign incomplete editorial review');
 const key=createPrivateKey(privateKeyPem);
 if(key.asymmetricKeyType!=='ed25519')throw Error('Reviewer key must be Ed25519');
 return {payload,signature:sign(null,signedReviewPayload(payload),key).toString('base64')};
}
