/** Situational speaking-sequence rehearsals built only from authored starter phrases.
 * No new foreign-language translations are invented: each task references phrasebook IDs.
 * This does not evaluate listening, pronunciation, actual dialogue or fluency.
 */
const QUESTS=[
 {id:'directions',title:'Find the station',summary:'Get someone’s attention, ask for directions, and recover when the answer is unclear.',steps:[
  ['3','Politely get someone’s attention before asking a question.'],
  ['5','Ask where the train station is.'],
  ['6','Explain that you do not understand the answer.'],
  ['4','Ask the person to say it again.'],
  ['2','Thank them for helping you.']
 ]},
 {id:'market',title:'At a market stall',summary:'Open politely, ask about a price, and confirm what you heard.',steps:[
  ['1','Greet the seller before beginning the purchase.'],
  ['3','Politely ask for their attention.'],
  ['7','Ask how much the item costs.'],
  ['4','Request a repeat when you miss the reply.'],
  ['2','Thank the seller before leaving.']
 ]},
 {id:'meeting',title:'A first introduction',summary:'Introduce yourself, then ask for clarification if you miss part of the exchange.',steps:[
  ['1','Greet someone you are meeting.'],
  ['8','Say it is nice to meet them.'],
  ['6','Let them know you did not understand something.'],
  ['4','Politely ask them to repeat their words.'],
  ['2','Thank them for repeating the information.']
 ]}
];
export const CONVERSATION_QUESTS=Object.freeze(QUESTS.map(q=>Object.freeze({
 id:q.id,title:q.title,summary:q.summary,
 steps:Object.freeze(q.steps.map(([phraseId,cue])=>Object.freeze({phraseId,cue})))
})));
export const CONVERSATION_QUEST_VERSION=1;
const questFor=id=>CONVERSATION_QUESTS.find(q=>q.id===id)||null;
const packFor=(packs,code)=>Object.hasOwn(packs||{},code)&&Array.isArray(packs[code]?.phrases)&&packs[code].phrases.length>=4?packs[code]:null;
const validTime=time=>Number.isSafeInteger(time)&&time>=0;
function hash(value){
 let n=2166136261;
 for(const c of String(value))n=Math.imul(n^c.charCodeAt(0),16777619)>>>0;
 return n;
}
function optionsFor(pack,phraseId,seed,position){
 const correct=pack.phrases.find(p=>p.id===phraseId);
 if(!correct)return [];
 const others=pack.phrases.filter(p=>p.id!==phraseId)
  .sort((a,b)=>hash(seed+':'+position+':'+a.id)-hash(seed+':'+position+':'+b.id));
 return [correct,...others.slice(0,3)].sort((a,b)=>hash(seed+':option:'+position+':'+a.id)-hash(seed+':option:'+position+':'+b.id))
  .map(p=>({id:p.id,label:p.target}));
}
export function createConversationQuest(packs,code,{questId='directions',seed=0,now=Date.now()}={}){
 const pack=packFor(packs,code),quest=questFor(questId);
 if(!pack||!quest||!Number.isSafeInteger(seed)||seed<0||seed>4294967295||!validTime(now))return null;
 if(!quest.steps.every(step=>pack.phrases.some(p=>p.id===step.phraseId)))return null;
 return {version:CONVERSATION_QUEST_VERSION,code,questId,position:0,answers:{},seed,startedAt:now};
}
export function normalizeConversationQuest(raw,packs){
 if(!raw||typeof raw!=='object'||Array.isArray(raw)||raw.version!==CONVERSATION_QUEST_VERSION||
 typeof raw.code!=='string'||typeof raw.questId!=='string')return null;
 const base=createConversationQuest(packs,raw.code,{questId:raw.questId,seed:raw.seed,now:raw.startedAt});
 const quest=questFor(raw.questId),pack=packFor(packs,raw.code);
 if(!base||!Number.isInteger(raw.position)||raw.position<0||raw.position>quest.steps.length||
 !raw.answers||typeof raw.answers!=='object'||Array.isArray(raw.answers))return null;
 const entries=Object.entries(raw.answers);
 if(entries.length>quest.steps.length)return null;
 const clean={};
 for(const [key,choice] of entries){
  const n=Number(key);
  if(!/^(0|[1-9][0-9]*)$/.test(key)||!Number.isInteger(n)||n<0||n>=quest.steps.length||
    n>raw.position||(n===raw.position&&raw.position===quest.steps.length)||
    typeof choice!=='string'||!optionsFor(pack,quest.steps[n].phraseId,raw.seed,n).some(x=>x.id===choice))return null;
  clean[key]=choice;
 }
 for(let i=0;i<raw.position;i++)if(!Object.hasOwn(clean,String(i)))return null;
 return {...base,position:raw.position,answers:clean};
}
export function currentConversationQuestion(raw,packs){
 const s=normalizeConversationQuest(raw,packs);
 if(!s)return null;
 const quest=questFor(s.questId);
 if(s.position>=quest.steps.length)return null;
 const step=quest.steps[s.position],pack=packFor(packs,s.code),p=pack.phrases.find(x=>x.id===step.phraseId);
 return {id:String(s.position),cue:step.cue,phraseId:p.id,english:p.english,target:p.target,pronunciation:p.pronunciation,
  locale:pack.locale,options:optionsFor(pack,p.id,s.seed,s.position)};
}
export function answerConversationQuestion(raw,choiceId,packs){
 const s=normalizeConversationQuest(raw,packs),q=s?currentConversationQuestion(s,packs):null;
 if(!q||Object.hasOwn(s.answers,q.id)||!q.options.some(x=>x.id===choiceId))return s;
 return {...s,answers:{...s.answers,[q.id]:choiceId}};
}
export function advanceConversationQuest(raw,packs){
 const s=normalizeConversationQuest(raw,packs),q=s?currentConversationQuestion(s,packs):null;
 if(!q||!Object.hasOwn(s.answers,q.id))return s;
 return {...s,position:s.position+1};
}
export function conversationQuestResults(raw,packs){
 const s=normalizeConversationQuest(raw,packs);
 if(!s)return null;
 const quest=questFor(s.questId),pack=packFor(packs,s.code);
 const entries=quest.steps.map((step,i)=>{
  const phrase=pack.phrases.find(p=>p.id===step.phraseId),choice=s.answers[String(i)];
  const selected=pack.phrases.find(p=>p.id===choice);
  return {cue:step.cue,phraseId:phrase.id,english:phrase.english,phrase:phrase.target,pronunciation:phrase.pronunciation,
   locale:pack.locale,selected:choice,selectedText:selected?.target||'',correct:choice===phrase.id};
 });
 const answered=entries.filter(e=>e.selected!==undefined).length;
 const correct=entries.filter(e=>e.correct).length;
 return {done:s.position===quest.steps.length,total:entries.length,answered,correct,percent:Math.round(100*correct/entries.length),entries};
}
export function normalizeConversationQuestHistory(raw,packs){
 const clean={};
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return clean;
 for(const [code,value] of Object.entries(raw).slice(0,30)){
  if(!packFor(packs,code)||!value||typeof value!=='object'||Array.isArray(value))continue;
  const result={};
  for(const [questId,entry] of Object.entries(value).slice(0,10)){
   const quest=questFor(questId),total=quest?.steps.length;
   if(!quest||!entry||typeof entry!=='object'||Array.isArray(entry)||
    !Number.isInteger(entry.attempts)||entry.attempts<1||entry.attempts>100000||
    !Number.isInteger(entry.best)||entry.best<0||entry.best>total||
    !Number.isInteger(entry.last)||entry.last<0||entry.last>total||
    entry.last>entry.best||!validTime(entry.lastStartedAt))continue;
   Object.defineProperty(result,questId,{value:{attempts:entry.attempts,best:entry.best,last:entry.last,lastStartedAt:entry.lastStartedAt},enumerable:true,writable:true,configurable:true});
  }
  if(Object.keys(result).length)Object.defineProperty(clean,code,{value:result,enumerable:true,writable:true,configurable:true});
 }
 return clean;
}
export function recordConversationQuestHistory(rawHistory,rawSession,packs){
 const clean=normalizeConversationQuestHistory(rawHistory,packs);
 const s=normalizeConversationQuest(rawSession,packs),results=s?conversationQuestResults(s,packs):null;
 if(!results?.done)return clean;
 const prev=clean[s.code]?.[s.questId];
 if(prev&&prev.lastStartedAt===s.startedAt)return clean;
 const entry={attempts:Math.min(100000,(prev?.attempts||0)+1),best:Math.max(prev?.best||0,results.correct),
  last:results.correct,lastStartedAt:s.startedAt};
 return {...clean,[s.code]:{...(clean[s.code]||{}),[s.questId]:entry}};
}
