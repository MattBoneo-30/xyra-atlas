/** Compact, privacy-first history of completed Atlas practice exams.
 * Historical scores are a self-study signal, not proof of professional competence.
 * Stores summary counts and missed lesson IDs, never raw exam answers.
 */
import {examPool,examResults,normalizeExam} from './exam.js';

export const EXAM_HISTORY_LIMIT=12;
const isRecord=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const isInt=v=>Number.isInteger(v);
const validTime=v=>typeof v==='string'&&Number.isFinite(Date.parse(v))?new Date(v).toISOString():null;
const stableId=exam=>{
 let hash=2166136261;
 for(const char of exam.ids.join('|')){
  hash=Math.imul(hash^char.charCodeAt(0),16777619)>>>0;
 }
 return String(exam.startedAt)+':'+hash.toString(16).padStart(8,'0');
};
export function normalizeExamHistory(raw,courses){
 if(!Array.isArray(raw))return [];
 const allowed=new Map(examPool(courses).map(q=>[q.id,q]));
 const courseIds=new Set((courses||[]).filter(c=>!c.dark).map(c=>c.id));
 const records=[],used=new Set();
 for(const item of raw.slice(0,EXAM_HISTORY_LIMIT*4)){
  if(!isRecord(item)||typeof item.id!=='string'||
   !/^\d{10,15}:[0-9a-f]{8}$/.test(item.id)||used.has(item.id)||
   !isInt(item.total)||item.total<1||item.total>20||
   !isInt(item.correct)||item.correct<0||item.correct>item.total||
   !Array.isArray(item.areas)||item.areas.length<1||item.areas.length>20||
   !Array.isArray(item.missed)||item.missed.length!==item.total-item.correct||
   item.missed.length>20)continue;
  const endedAt=validTime(item.endedAt);
  if(!endedAt)continue;
  let total=0,correct=0,valid=true;
  const areaSeen=new Set(),areas=[];
  for(const a of item.areas){
   if(!isRecord(a)||typeof a.courseId!=='string'||!courseIds.has(a.courseId)||
    areaSeen.has(a.courseId)||!isInt(a.total)||a.total<1||a.total>20||
    !isInt(a.correct)||a.correct<0||a.correct>a.total){valid=false;break;}
   areaSeen.add(a.courseId);total+=a.total;correct+=a.correct;
   areas.push({courseId:a.courseId,total:a.total,correct:a.correct});
  }
  if(!valid||total!==item.total||correct!==item.correct)continue;
  const missed=[],missedSeen=new Set(),missedByCourse={};
  for(const key of item.missed){
   const q=typeof key==='string'?allowed.get(key):null;
   if(!q||missedSeen.has(key)||!areaSeen.has(q.courseId)){valid=false;break;}
   missed.push(key);missedSeen.add(key);
   missedByCourse[q.courseId]=(missedByCourse[q.courseId]||0)+1;
  }
  if(!valid||areas.some(a=>(missedByCourse[a.courseId]||0)!==a.total-a.correct))continue;
  records.push({id:item.id,endedAt,total:item.total,correct:item.correct,areas,missed});
  used.add(item.id);
  if(records.length>=EXAM_HISTORY_LIMIT)break;
 }
 return records;
}
export function recordExamHistory(raw,exam,courses,now=Date.now()){
 const history=normalizeExamHistory(raw,courses),session=normalizeExam(exam,courses);
 const result=session?examResults(session,courses):null;
 if(!result?.done||!Number.isFinite(now)||now<0)return history;
 const id=stableId(session);
 if(history.some(item=>item.id===id))return history;
 const areaMap=new Map(),missed=[];
 for(const q of result.entries){
  const area=areaMap.get(q.courseId)||{courseId:q.courseId,total:0,correct:0};
  area.total++;
  if(q.isCorrect)area.correct++;
  else missed.push(q.id);
  areaMap.set(q.courseId,area);
 }
 const record={id,endedAt:new Date(now).toISOString(),total:result.total,correct:result.correct,
  areas:[...areaMap.values()],missed};
 return normalizeExamHistory([record,...history],courses);
}
export function examHistoryInsights(raw,courses){
 const history=normalizeExamHistory(raw,courses);
 const allowed=new Map(examPool(courses).map(q=>[q.id,q]));
 const areas=new Map(),misses=new Map();
 let total=0,correct=0;
 for(const record of history){
  total+=record.total;correct+=record.correct;
  for(const area of record.areas){
   const current=areas.get(area.courseId)||{courseId:area.courseId,total:0,correct:0};
   current.total+=area.total;current.correct+=area.correct;areas.set(area.courseId,current);
  }
  for(const key of record.missed)misses.set(key,(misses.get(key)||0)+1);
 }
 const subjects=[...areas.values()].map(a=>({...a,
  title:courses.find(c=>c.id===a.courseId)?.title||a.courseId,
  percent:Math.round(a.correct/a.total*100)})).sort((a,b)=>(a.correct/a.total)-(b.correct/b.total)||b.total-a.total);
 const focus=[...misses.entries()].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]))
  .slice(0,4).map(([id,count])=>({id,count,...allowed.get(id)})).filter(x=>x.courseId);
 return {attempts:history.length,total,correct,percent:total?Math.round(correct/total*100):0,
  recent:history.slice(0,EXAM_HISTORY_LIMIT),subjects,focus};
}
