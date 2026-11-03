/** Offline language recognition practice using only Atlas' authored starter phrases.
 * This checks phrase recognition, not pronunciation or fluency.
 */
export const LANGUAGE_CHALLENGE_MODES=Object.freeze(['recognition','meaning']);
const owns=(obj,key)=>Object.prototype.hasOwnProperty.call(obj,key);
const isObject=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const finiteTime=value=>typeof value==='string'&&Number.isFinite(Date.parse(value))?new Date(value).toISOString():null;
function shuffle(items,seed){
 const out=[...items];let state=seed>>>0;
 for(let i=out.length-1;i>0;i--){
  state=(Math.imul(state,1664525)+1013904223)>>>0;
  const n=state%(i+1);[out[i],out[n]]=[out[n],out[i]];
 }
 return out;
}
export function createLanguageChallenge(packs,code,{mode='recognition',seed=Date.now(),now=Date.now()}={}){
 const pack=packs?.[code];
 if(!pack||!Array.isArray(pack.phrases)||pack.phrases.length<4||!LANGUAGE_CHALLENGE_MODES.includes(mode))return null;
 const ids=pack.phrases.map(p=>p.id);
 if(ids.some(id=>typeof id!=='string')||new Set(ids).size!==ids.length||
  ids.length>24||!Number.isFinite(seed)||!Number.isFinite(now))return null;
 return {version:1,code,mode,seed:seed>>>0,ids:shuffle(ids,seed),
  answers:{},position:0,startedAt:new Date(now).toISOString()};
}
function questionAt(session,packs,index){
 if(!session||index<0||index>=session.ids.length)return null;
 const pack=packs[session.code],id=session.ids[index],entry=pack.phrases.find(p=>p.id===id);
 if(!entry)return null;
 const others=pack.phrases.filter(p=>p.id!==id);
 const distractors=shuffle(others,session.seed ^ Math.imul(index+1,2246822519)).slice(0,3);
 const options=shuffle([entry,...distractors],session.seed ^ Math.imul(index+1,3266489917))
  .map(p=>({id:p.id,label:session.mode==='recognition'?p.target:p.english}));
 return {id,prompt:session.mode==='recognition'?entry.english:entry.target,
  mode:session.mode,locale:pack.locale,options,correctId:id,
  correctText:session.mode==='recognition'?entry.target:entry.english,
  translation:entry.english,phrase:entry.target,pronunciation:entry.pronunciation||''};
}
export function normalizeLanguageChallenge(raw,packs){
 if(!isObject(raw)||raw.version!==1||typeof raw.code!=='string'||!owns(packs||{},raw.code)||
  !LANGUAGE_CHALLENGE_MODES.includes(raw.mode)||!Number.isInteger(raw.seed)||
  raw.seed<0||raw.seed>4294967295||!Array.isArray(raw.ids)||
  !isObject(raw.answers)||!Number.isInteger(raw.position))return null;
 const pack=packs[raw.code],allowed=pack.phrases.map(p=>p.id),ids=raw.ids;
 if(ids.length!==allowed.length||ids.length<4||ids.length>24||new Set(ids).size!==ids.length||
  ids.some(id=>typeof id!=='string'||!allowed.includes(id))||
  raw.position<0||raw.position>ids.length)return null;
 const clean={version:1,code:raw.code,mode:raw.mode,seed:raw.seed,ids:[...ids],answers:{},position:raw.position,
  startedAt:finiteTime(raw.startedAt)||new Date(0).toISOString()};
 for(const [id,choice] of Object.entries(raw.answers)){
  if(!ids.includes(id)||typeof choice!=='string'||!allowed.includes(choice))return null;
  const index=ids.indexOf(id);
  if(index>raw.position)return null;
  const shown=questionAt(clean,packs,index);
  if(!shown?.options.some(o=>o.id===choice))return null;
  Object.defineProperty(clean.answers,id,{value:choice,enumerable:true,writable:true,configurable:true});
 }
 if(ids.slice(0,raw.position).some(id=>!owns(clean.answers,id)))return null;
 return clean;
}
export function currentLanguageQuestion(session,packs){
 const state=normalizeLanguageChallenge(session,packs);
 return state?questionAt(state,packs,state.position):null;
}
export function answerLanguageChallenge(session,choiceId,packs){
 const state=normalizeLanguageChallenge(session,packs);
 if(!state||state.position>=state.ids.length)return state;
 const q=questionAt(state,packs,state.position);
 if(owns(state.answers,q.id)||!q.options.some(o=>o.id===choiceId))return state;
 return {...state,answers:{...state.answers,[q.id]:choiceId}};
}
export function advanceLanguageChallenge(session,packs){
 const state=normalizeLanguageChallenge(session,packs);
 if(!state||state.position===state.ids.length||!owns(state.answers,state.ids[state.position]))return state;
 return {...state,position:state.position+1};
}
export function languageChallengeResults(session,packs){
 const state=normalizeLanguageChallenge(session,packs);
 if(!state)return null;
 const entries=state.ids.map((id,index)=>{
  const question=questionAt(state,packs,index),answered=owns(state.answers,id);
  return {...question,answered,selectedId:answered?state.answers[id]:null,isCorrect:answered&&state.answers[id]===id,
   selectedText:answered?question.options.find(o=>o.id===state.answers[id])?.label||'':''};
 });
 const correct=entries.filter(e=>e.isCorrect).length;
 return {done:state.position===state.ids.length,correct,answered:entries.filter(e=>e.answered).length,
  total:entries.length,entries,percent:Math.round(100*correct/entries.length)};
}
export function normalizeLanguageChallengeHistory(raw,packs){
 if(!isObject(raw))return {};
 const clean={};
 for(const [code,r] of Object.entries(raw)){
  if(!owns(packs||{},code)||!isObject(r))continue;
  const max=packs[code].phrases.length;
  if(!Number.isInteger(r.attempts)||r.attempts<1||r.attempts>10000||
   !Number.isInteger(r.best)||r.best<0||r.best>max||
   !Number.isInteger(r.last)||r.last<0||r.last>max||r.best<r.last)continue;
  const at=finiteTime(r.lastAt);
  if(!at)continue;
  Object.defineProperty(clean,code,{value:{attempts:r.attempts,best:r.best,last:r.last,lastAt:at},
   enumerable:true,writable:true,configurable:true});
 }
 return clean;
}
export function recordLanguageChallengeHistory(previous,session,packs,now=Date.now()){
 const results=languageChallengeResults(session,packs);
 if(!results?.done||!Number.isFinite(now))return normalizeLanguageChallengeHistory(previous,packs);
 const clean=normalizeLanguageChallengeHistory(previous,packs),code=session.code,old=clean[code];
 return {...clean,[code]:{attempts:Math.min(10000,(old?.attempts||0)+1),
  best:Math.max(old?.best||0,results.correct),last:results.correct,lastAt:new Date(now).toISOString()}};
}
