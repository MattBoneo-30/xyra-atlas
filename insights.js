/** On-device learning analytics: completion is not mastery. */
import {localDayKey,validDayKey} from './calendar.js';
export function summarizeLearning(courses,completed=[],answers={},{includeMature=false}={}){
 const learned=new Set(Array.isArray(completed)?completed:[]);
 const chosen=answers&&typeof answers==='object'&&!Array.isArray(answers)?answers:{};
 let total=0,done=0,answered=0,correct=0;const subjects=[];
 for(const c of Array.isArray(courses)?courses:[]){
  if(c.dark&&!includeMature)continue;
  const ls=Array.isArray(c.lessons)?c.lessons:[];
  const count=ls.filter(l=>learned.has(c.id+':'+l.id)).length;
  subjects.push({id:c.id,title:c.title,art:c.art,total:ls.length,done:count,percent:ls.length?Math.round(count/ls.length*100):0});
  total+=ls.length;done+=count;
  for(const l of ls){const v=chosen[c.id+':'+l.id];if(Number.isInteger(v)&&v>=0&&v<(l.quiz?.options?.length||0)){answered++;if(v===l.quiz.correct)correct++;}}
 }
 subjects.sort((a,b)=>b.done-a.done||a.title.localeCompare(b.title));
 return {subjects,total,done,percent:total?Math.round(done/total*100):0,answered,correct,quizAccuracy:answered?Math.round(correct/answered*100):null};
}
export function activityCalendar(days=[],now=new Date(),span=14){
 if(!(now instanceof Date)||!Number.isFinite(now.getTime()))return [];
 const visited=new Set((Array.isArray(days)?days:[]).filter(validDayKey));
 const count=Number.isInteger(span)?Math.max(1,Math.min(31,span)):14;
 return Array.from({length:count},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth(),now.getDate()-count+1+i,12);const date=localDayKey(d);return {date,label:d.toLocaleDateString('en',{month:'short',day:'numeric'}),visited:visited.has(date)};});
}
