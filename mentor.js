/** A gentle daily guide, selected deterministically without personal tracking. */
import { validDayKey } from './calendar.js';
export const XYRA_REFLECTIONS=Object.freeze([
 {title:'Notice what you know',prompt:'Which belief felt certain today? What evidence would honestly change your mind?',message:'Curiosity is strongest when you can change your mind.'},
 {title:'Start with one useful step',prompt:'What tiny action would make tomorrow easier? Choose something possible in ten minutes.',message:'You do not need a perfect day to make real progress.'},
 {title:'Practice a clear boundary',prompt:'What is one request you could state more clearly without blaming another person?',message:'Clarity can be kind. A boundary is not a punishment.'},
 {title:'Follow the source',prompt:'What claim did you hear recently? Can you find its original context?',message:'A good question can be worth more than a confident guess.'},
 {title:'Spend with intention',prompt:'Before a purchase, what need are you solving, and what would you give up?',message:'Money is a tool for choosing what matters to you.'},
 {title:'Protect your attention',prompt:'Which unnecessary interruption can you reduce during your next learning session?',message:'Give your attention a place where it can grow.'},
 {title:'Learn something uncomfortable',prompt:'Is there a subject you have avoided because you are not yet good at it?',message:'Being new is not a weakness. It is the beginning.'},
 {title:'Remember with practice',prompt:'Which concept can you explain from memory, without looking at the lesson?',message:'Knowledge becomes yours when you can use it.'},
 {title:'Observe before assuming',prompt:'Which interpretation did you make today without checking the facts?',message:'There is room between an event and your first story about it.'},
 {title:'Strengthen a connection',prompt:'Who might benefit from a sincere question instead of an assumption?',message:'You can be clear and gentle at the same time.'},
 {title:'Explore another world',prompt:'Which subject outside your usual interests could help your current goal?',message:'Your next insight might be waiting outside your routine.'},
 {title:'Appreciate slow growth',prompt:'What small thing is easier now than it was one month ago?',message:'Progress often arrives quietly.'},
 {title:'Try a real experiment',prompt:'What idea could you test safely this week instead of merely debating it?',message:'Experiments turn curiosity into understanding.'},
 {title:'Make room for rest',prompt:'What does an achievable plan look like if you also protect time to rest?',message:'Your worth is not measured by how busy you are.'}
]);
export function mentorMoment(date,courses=[],completed=[]){
 if(!validDayKey(date)||!Array.isArray(courses))return null;
 const seed=Number(date.replace(/-/g,''));
 const reflection=XYRA_REFLECTIONS[seed%XYRA_REFLECTIONS.length];
 const unlocked=courses.filter(c=>!c.dark&&Array.isArray(c.lessons)&&c.lessons.length);
 if(!unlocked.length)return {reflection,lesson:null,date};
 const seen=new Set(Array.isArray(completed)?completed:[]);
 const start=seed%unlocked.length;
 let lesson=null;
 for(let i=0;i<unlocked.length;i++){
  const c=unlocked[(start+i)%unlocked.length];
  const l=c.lessons.find(item=>!seen.has(c.id+':'+item.id));
  if(l){lesson={courseId:c.id,lessonId:l.id,course:c.title,title:l.title,minutes:l.minutes};break;}
 }
 if(!lesson){const c=unlocked[start],l=c.lessons[0];lesson={courseId:c.id,lessonId:l.id,course:c.title,title:l.title,minutes:l.minutes};}
 return {reflection,lesson,date};
}
