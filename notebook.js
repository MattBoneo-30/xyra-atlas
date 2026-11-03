/** Private, offline Field Notebook discovery; notes never leave browser storage. */
import {normalizeFieldNotes} from './fieldnotes.js';
function cleanText(value){
 return String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/\s+/g,' ').trim();
}
export function buildNotebookIndex(courses,notes,{allowMature=false}={}){
 const stored=normalizeFieldNotes(notes),items=[];
 for(const c of Array.isArray(courses)?courses:[]){
  if(c.dark&&!allowMature)continue;
  for(const l of c.lessons||[]){
   const key=c.id+':'+l.id;
   const body=stored[key];
   if(!body)continue;
   items.push({key,courseId:c.id,lessonId:l.id,course:c.title,lesson:l.title,
     content:body,preview:body.replace(/\s+/g,' ').trim().slice(0,190),
     normalized:cleanText([c.title,l.title,body].join(' '))});
  }
 }
 return items.sort((a,b)=>a.course.localeCompare(b.course)||a.lesson.localeCompare(b.lesson));
}
export function searchNotebook(index,query){
 const words=cleanText(query).slice(0,100).split(' ').filter(Boolean).slice(0,8);
 if(!words.length)return index;
 return index.filter(item=>words.every(w=>item.normalized.includes(w)));
}
