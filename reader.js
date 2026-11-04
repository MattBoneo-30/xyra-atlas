/** Local-only accessibility preferences; no remote collection or syncing. */
export const READER_SIZES=Object.freeze([
 {id:'compact',label:'Compact'},
 {id:'comfortable',label:'Comfortable'},
 {id:'large',label:'Large type'}
]);
export function normalizeReaderPreferences(value){
 const input=value&&typeof value==='object'&&!Array.isArray(value)?value:{};
 return {size:READER_SIZES.some(x=>x.id===input.size)?input.size:'comfortable',focus:input.focus===true};
}
export function setReaderSize(value,size){
 const safe=normalizeReaderPreferences(value);
 return READER_SIZES.some(x=>x.id===size)?{...safe,size}:safe;
}
export function toggleReaderFocus(value){
 const safe=normalizeReaderPreferences(value);
 return {...safe,focus:!safe.focus};
}

/** Deterministic visual option order. Persist canonical answer indices. */
export function orderedQuizOptions(quiz,lessonKey){
 const opts=Array.isArray(quiz?.options)?quiz.options:[];
 if(opts.length<2||opts.length>8||typeof lessonKey!=='string'||!lessonKey.trim())return [];
 let seed=2166136261;
 for(const char of lessonKey)seed=Math.imul(seed^char.codePointAt(0),16777619)>>>0;
 const entries=opts.map((text,sourceIndex)=>({text,sourceIndex}));
 for(let i=entries.length-1;i>0;i--){
  seed^=seed<<13;seed^=seed>>>17;seed^=seed<<5;
  const j=(seed>>>0)%(i+1);
  [entries[i],entries[j]]=[entries[j],entries[i]];
 }
 if(entries.every((e,i)=>e.sourceIndex===i))entries.push(entries.shift());
 return entries;
}
