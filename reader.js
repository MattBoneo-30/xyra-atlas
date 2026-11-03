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
