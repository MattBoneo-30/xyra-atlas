/** Private, offline-only learner-authored cards. No external account or tracking. */
import {recordReview,normalizeReviews} from './review.js';

export const PERSONAL_CARD_LIMIT=120;
export const CARD_FRONT_LIMIT=240;
export const CARD_BACK_LIMIT=1200;
const validId=/^pc-[a-f\d]{8}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{4}-[a-f\d]{12}$/i;
const isRecord=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const validDate=v=>typeof v==='string'&&Number.isFinite(Date.parse(v))?new Date(v).toISOString():null;
const allowedCourse=(id,courses)=>id==='general'||courses.some(c=>c.id===id&&!c.dark);
function safeReview(review,id){
 if(!isRecord(review))return null;
 return normalizeReviews({['personal:'+id]:review})['personal:'+id]||null;
}
export function normalizePersonalCards(input,courses){
 if(!Array.isArray(input))return [];
 const out=[],ids=new Set();
 for(const raw of input.slice(0,PERSONAL_CARD_LIMIT*3)){
  if(!isRecord(raw)||!validId.test(raw.id)||ids.has(raw.id)||
   typeof raw.front!=='string'||typeof raw.back!=='string')continue;
  const front=raw.front.trim(),back=raw.back.trim();
  const courseId=typeof raw.courseId==='string'?raw.courseId:'general';
  if(!front||front.length>CARD_FRONT_LIMIT||!back||back.length>CARD_BACK_LIMIT||
   !allowedCourse(courseId,courses))continue;
  const createdAt=validDate(raw.createdAt)||new Date(0).toISOString();
  out.push({id:raw.id,front,back,courseId,createdAt,
   updatedAt:validDate(raw.updatedAt)||createdAt,review:safeReview(raw.review,raw.id)});
  ids.add(raw.id);
  if(out.length>=PERSONAL_CARD_LIMIT)break;
 }
 return out;
}
export function newPersonalCardId(crypto=globalThis.crypto){
 if(crypto?.randomUUID)return 'pc-'+crypto.randomUUID();
 if(!crypto?.getRandomValues)throw Error('Secure card IDs are unavailable in this browser.');
 const bytes=crypto.getRandomValues(new Uint8Array(16));bytes[6]=(bytes[6]&15)|64;bytes[8]=(bytes[8]&63)|128;
 const hex=[...bytes].map(x=>x.toString(16).padStart(2,'0')).join('');
 return 'pc-'+[hex.slice(0,8),hex.slice(8,12),hex.slice(12,16),hex.slice(16,20),hex.slice(20)].join('-');
}
function checkedFields({front,back,courseId='general'},courses){
 if(typeof front!=='string'||!front.trim()||front.trim().length>CARD_FRONT_LIMIT)
  throw Error('Question must be 1–240 characters.');
 if(typeof back!=='string'||!back.trim()||back.trim().length>CARD_BACK_LIMIT)
  throw Error('Answer must be 1–1,200 characters.');
 if(!allowedCourse(courseId,courses))throw Error('Choose a valid subject.');
 return {front:front.trim(),back:back.trim(),courseId};
}
export function createPersonalCard(cards,fields,courses,{id=newPersonalCardId(),now=Date.now()}={}){
 const existing=normalizePersonalCards(cards,courses);
 const data=checkedFields(fields,courses);
 if(existing.length>=PERSONAL_CARD_LIMIT)throw Error('The card workshop is full. Delete a card before creating another.');
 if(!validId.test(id)||existing.some(c=>c.id===id))throw Error('Card ID is invalid or already in use.');
 if(!Number.isFinite(now))throw Error('Invalid creation time.');
 const time=new Date(now).toISOString();
 return [{id,...data,createdAt:time,updatedAt:time,review:null},...existing];
}
export function updatePersonalCard(cards,id,fields,courses,{now=Date.now()}={}){
 const existing=normalizePersonalCards(cards,courses),data=checkedFields(fields,courses);
 if(!existing.some(c=>c.id===id))throw Error('Study card not found.');
 if(!Number.isFinite(now))throw Error('Invalid update time.');
 return existing.map(c=>c.id!==id?c:{...c,...data,
  updatedAt:new Date(now).toISOString(),
  review:c.front===data.front&&c.back===data.back&&c.courseId===data.courseId?c.review:null});
}
export function deletePersonalCard(cards,id,courses){
 return normalizePersonalCards(cards,courses).filter(c=>c.id!==id);
}
export function duePersonalCards(cards,courses,now=Date.now()){
 if(!Number.isFinite(now))return [];
 return normalizePersonalCards(cards,courses)
  .filter(c=>!c.review||Date.parse(c.review.dueAt)<=now)
  .sort((a,b)=>(a.review?Date.parse(a.review.dueAt):0)-(b.review?Date.parse(b.review.dueAt):0)||a.createdAt.localeCompare(b.createdAt));
}
export function ratePersonalCard(cards,id,outcome,courses,now=Date.now()){
 const existing=normalizePersonalCards(cards,courses);
 if(!existing.some(c=>c.id===id))throw Error('Study card not found.');
 return existing.map(c=>c.id===id?{...c,review:recordReview(c.review,outcome,now)}:c);
}
export function searchPersonalCards(cards,query,courses){
 const q=String(query||'').trim().toLocaleLowerCase().slice(0,100);
 const clean=normalizePersonalCards(cards,courses);
 if(!q)return clean;
 return clean.filter(card=>[card.front,card.back,courses.find(c=>c.id===card.courseId)?.title||'General'].some(v=>v.toLocaleLowerCase().includes(q)));
}
