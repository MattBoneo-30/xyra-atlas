import {validDayKey} from './calendar.js';
/** Stable, offline daily learning invitations. No tracking or forced streaks. */
export function createDailyQuest(courses,scenarios,date) {
 if(!validDayKey(date)||!Array.isArray(courses)||!Array.isArray(scenarios))return null;
 const seed=Number(date.replace(/-/g,''));
 const regular=courses.filter(c=>!c.dark&&Array.isArray(c.lessons)&&c.lessons.length);
 if(regular.length<2||scenarios.length===0)return null;
 const first=regular[seed%regular.length];
 const second=regular[(seed+1+Math.floor(seed/7)%(regular.length-1))%regular.length];
 return {date,tasks:[
   {type:'lesson',courseId:first.id,lessonId:first.lessons[Math.floor(seed/regular.length)%first.lessons.length].id},
   {type:'lesson',courseId:second.id,lessonId:second.lessons[Math.floor(seed/13)%second.lessons.length].id},
   {type:'scenario',id:scenarios[seed%scenarios.length].id}
 ]};
}
export function dailyQuestProgress(quest,completed,scenariosAnswered,availableScenarios=[]) {
 if(!quest||!Array.isArray(quest.tasks))return {done:0,total:0};
 const learned=new Set(Array.isArray(completed)?completed.filter(x=>typeof x==='string'):[]);
 const answers=scenariosAnswered&&typeof scenariosAnswered==='object'&&!Array.isArray(scenariosAnswered)?scenariosAnswered:{};
 const scenarios=new Map((Array.isArray(availableScenarios)?availableScenarios:[])
  .filter(s=>s&&typeof s.id==='string'&&Array.isArray(s.choices))
  .map(s=>[s.id,s]));
 const done=quest.tasks.filter(task=>{
  if(task.type==='lesson')return learned.has(task.courseId+':'+task.lessonId);
  if(task.type!=='scenario')return false;
  const options=scenarios.get(task.id)?.choices;
  const answer=answers[task.id];
  return Boolean(options&&Number.isInteger(answer)&&answer>=0&&answer<options.length);
 }).length;
 return {done,total:quest.tasks.length};
}
