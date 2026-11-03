/** Private offline spaced-recall scheduling for authored Language Lab phrase packs.
 * Learners self-report recall; this is not a test of speaking, listening, or fluency.
 * Uses the same intervals as the lesson Review Deck but separate, validated records.
 */
import {normalizeReviews,recordReview} from './review.js';

const validPack=(packs,code)=>Object.hasOwn(packs||{},code)&&Array.isArray(packs[code]?.phrases);
const keyFor=(code,id)=>code+':'+id;
const validNow=now=>Number.isFinite(now)&&now>=0;

export function normalizePhraseReviews(raw,packs){
 const normalized=normalizeReviews(raw),clean={};
 for(const [code,pack] of Object.entries(packs||{})){
  if(!validPack(packs,code))continue;
  for(const phrase of pack.phrases){
   const key=keyFor(code,phrase.id);
   if(Object.hasOwn(normalized,key))clean[key]=normalized[key];
  }
 }
 return clean;
}
export function duePhraseReviews(raw,code,packs,now=Date.now()){
 if(!validPack(packs,code)||!validNow(now))return [];
 const records=normalizePhraseReviews(raw,packs),pack=packs[code];
 return pack.phrases.filter(p=>{
  const review=records[keyFor(code,p.id)];
  return !review||Date.parse(review.dueAt)<=now;
 }).sort((a,b)=>{
  const left=records[keyFor(code,a.id)],right=records[keyFor(code,b.id)];
  const first=left?Date.parse(left.dueAt):0,second=right?Date.parse(right.dueAt):0;
  return first-second||pack.phrases.indexOf(a)-pack.phrases.indexOf(b);
 });
}
export function phraseReviewStats(raw,code,packs,now=Date.now()){
 if(!validPack(packs,code)||!validNow(now))return null;
 const pack=packs[code],clean=normalizePhraseReviews(raw,packs);
 const entries=pack.phrases.map(p=>clean[keyFor(code,p.id)]).filter(Boolean);
 const due=duePhraseReviews(clean,code,packs,now).length;
 const scheduled=entries.filter(r=>Date.parse(r.dueAt)>now);
 const nextAt=scheduled.length?new Date(Math.min(...scheduled.map(r=>Date.parse(r.dueAt)))).toISOString():null;
 return {total:pack.phrases.length,due,reviewed:entries.length,scheduled:scheduled.length,nextAt};
}
export function ratePhraseReview(raw,code,id,outcome,packs,now=Date.now()){
 const clean=normalizePhraseReviews(raw,packs);
 if(!validPack(packs,code)||!validNow(now)||!['again','remembered'].includes(outcome)||
  !duePhraseReviews(clean,code,packs,now).some(p=>p.id===id))return clean;
 const key=keyFor(code,id);
 return {...clean,[key]:recordReview(clean[key],outcome,now)};
}
export function clearPhraseReviews(raw,code,packs){
 const clean=normalizePhraseReviews(raw,packs);
 if(!validPack(packs,code))return clean;
 for(const phrase of packs[code].phrases)delete clean[keyFor(code,phrase.id)];
 return clean;
}
