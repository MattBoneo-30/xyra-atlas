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
export function dailyQuestProgress(quest,completed,scenariosAnswered) {
 if(!quest)return {done:0,total:0};
 const learned=new Set(Array.isArray(completed)?completed:[]);
 const answers=scenariosAnswered&&typeof scenariosAnswered==='object'?scenariosAnswered:{};
 const done=quest.tasks.filter(t=>t.type==='lesson'?learned.has(t.courseId+':'+t.lessonId):Number.isInteger(answers[t.id])).length;
 return {done,total:quest.tasks.length};
}
