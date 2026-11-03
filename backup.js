/** Device-only backup inspection. No backup content is uploaded or logged. */
export const BACKUP_MAX_BYTES=1024*1024;
export function parseBackupEnvelope(text){
 if(typeof text!=='string'||text.length>BACKUP_MAX_BYTES*2)throw Error('Backup exceeds safe size limits.');
 let data;
 try{data=JSON.parse(text);}catch{throw Error('This file does not contain valid JSON.');}
 if(!data||typeof data!=='object'||Array.isArray(data)||data.format!=='xyra-atlas-backup'||data.version!==1||
    !data.state||typeof data.state!=='object'||Array.isArray(data.state)||!Array.isArray(data.state.completed)){
   throw Error('Not a compatible Xyra Atlas backup.');
 }
 if(data.state.completed.length>2000)throw Error('Backup contains too many completed lessons.');
 const exportedAt=typeof data.exportedAt==='string'&&Number.isFinite(Date.parse(data.exportedAt))?
  new Date(data.exportedAt).toISOString().slice(0,10):null;
 return {state:data.state,exportedAt};
}
export function normalizeLessonKeys(value,courses,kind='lesson'){
 const allowed=new Set(kind==='course'?courses.map(c=>c.id):
  courses.flatMap(c=>c.lessons.map(l=>c.id+':'+l.id)));
 return [...new Set((Array.isArray(value)?value:[]).filter(v=>typeof v==='string'&&allowed.has(v)))].slice(0,1000);
}
export function normalizeQuizAnswers(value,courses){
 const allowed=new Map(courses.flatMap(c=>c.lessons.map(l=>[c.id+':'+l.id,l.quiz?.options?.length||0])));
 const result={};
 if(!value||typeof value!=='object'||Array.isArray(value))return result;
 for(const [key,answer] of Object.entries(value).slice(0,1000)){
  if(!allowed.has(key)||!Number.isInteger(answer)||answer<0||answer>=allowed.get(key))continue;
  Object.defineProperty(result,key,{value:answer,enumerable:true,writable:true,configurable:true});
 }
 return result;
}
export function normalizeLastOpened(value,courses){
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const c=courses.find(c=>c.id===value.courseId);
 return c?.lessons?.some(l=>l.id===value.lessonId)?{courseId:c.id,lessonId:value.lessonId}:null;
}
export function backupCounts(state){
 const data=state&&typeof state==='object'&&!Array.isArray(state)?state:{};
 const length=value=>Array.isArray(value)?value.length:0;
 const objectSize=value=>value&&typeof value==='object'&&!Array.isArray(value)?Object.keys(value).length:0;
 return {lessons:length(data.completed),bookmarks:length(data.bookmarks),notes:objectSize(data.fieldNotes),
  quizzes:objectSize(data.answers),cases:objectSize(data.casebook)};
}
