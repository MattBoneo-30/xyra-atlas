/** Protect a local progress payload from accidental overwrite after JSON corruption. */
export function parseStoredEnvelope(raw){
 if(raw===null||raw===undefined||raw==='')return {status:'empty',value:{}};
 try{
  const value=JSON.parse(String(raw));
  if(value&&typeof value==='object'&&!Array.isArray(value))return {status:'loaded',value};
 }catch{}
 return {status:'corrupt',value:null};
}
export function storageHealthMessage(issue){
 switch(issue){
  case 'corrupt':return 'Saved learning data could not be read. Atlas has NOT overwritten it. Download the recovery copy before importing a backup or resetting.';
  case 'read-failed':return 'Browser storage is not readable. Atlas is not saving new progress until you explicitly restore a backup or reset.';
  case 'write-failed':return 'The browser rejected the latest save. Your current progress may exist only in this open session. Export a backup before leaving.';
  default:return '';
 }
}
