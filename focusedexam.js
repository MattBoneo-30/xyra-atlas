/** Build a private, offline revision exam from lessons actually missed in prior exams.
 * Uses only sanitized summary history; never imports raw answers or mature topics.
 * Returns the existing version-1 Exam session shape for normal resume/backup behavior.
 */
import {EXAM_SIZES,examPool,normalizeExam} from './exam.js';
import {normalizeExamHistory} from './examhistory.js';

function tieBreak(key,seed){
 let value=(2166136261^(seed>>>0))>>>0;
 for(const char of key){
  value=Math.imul(value^char.charCodeAt(0),16777619)>>>0;
 }
 return value;
}
export function focusQuestionPool(courses,history){
 const rows=normalizeExamHistory(history,courses);
 const allowed=new Map(examPool(courses).map(q=>[q.id,q]));
 const ranked=new Map();
 for(let index=0;index<rows.length;index++){
  for(const key of rows[index].missed){
   if(!allowed.has(key))continue;
   const earlier=ranked.get(key);
   if(earlier)earlier.misses++;
   else ranked.set(key,{id:key,misses:1,recent:index,question:allowed.get(key)});
  }
 }
 return [...ranked.values()].sort((a,b)=>b.misses-a.misses||a.recent-b.recent||a.id.localeCompare(b.id));
}
export function createFocusedExam(courses,history,{size=5,seed=Date.now(),now=Date.now()}={}){
 if(!EXAM_SIZES.includes(size)||!Number.isFinite(seed)||!Number.isFinite(now)||now<=0)return null;
 const pool=focusQuestionPool(courses,history);
 if(!pool.length)return null;
 // Repeated misses outrank single misses. Seeded ties make repeat revision sessions varied.
 const ids=pool.map(item=>({...item,tie:tieBreak(item.id,seed)}))
  .sort((a,b)=>b.misses-a.misses||a.recent-b.recent||a.tie-b.tie||a.id.localeCompare(b.id))
  .slice(0,size).map(item=>item.id);
 return normalizeExam({version:1,ids,responses:{},position:0,startedAt:now},courses);
}
