/**
 * Atlas Choice Coach: answer-specific explanations for 42 existing lessons.
 *
 * A selected distractor is NOT a psychological diagnosis; this teaches why
 * that option fails in this question. Every authored explanation is awaiting
 * independent subject review, and quizzes/grades remain unchanged.
 */
import {MISCONCEPTIONS_A} from './misconceptions1.js';
import {MISCONCEPTIONS_B} from './misconceptions2.js';
const material={...MISCONCEPTIONS_A,...MISCONCEPTIONS_B};
export const MISCONCEPTION_COACH=Object.freeze(Object.fromEntries(
 Object.entries(material).map(([courseId,stages])=>[courseId,Object.freeze(
  Object.fromEntries(Object.entries(stages).map(([stage,parts])=>[
   stage,Object.freeze({lessonId:parts[0],stage,
    wrongOptions:Object.freeze(parts.slice(1).map(([option,reason])=>Object.freeze({option,reason}))),
    reviewStatus:'pending-independent-review'})
  ])))])
));
const STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
const safe=text=>String(text??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function misconceptionUnit(courseId,lesson){
 const record=MISCONCEPTION_COACH[courseId]?.[lesson?.stage];
 if(!record||record.lessonId!==lesson.id)return null;
 const quiz=lesson.quiz||lesson;
 if(!Array.isArray(quiz?.options)||!Number.isInteger(quiz.correct))return null;
 const wrong=quiz.options.filter((_,i)=>i!==quiz.correct);
 if(wrong.length!==2||record.wrongOptions.length!==2||
    wrong.some(option=>!record.wrongOptions.some(row=>row.option===option)))return null;
 return record;
}
export function misconceptionReason(courseId,lesson,choice){
 const quiz=lesson?.quiz||lesson;
 if(!Number.isInteger(choice)||!Array.isArray(quiz?.options)||choice<0||
    choice>=quiz.options.length||choice===quiz.correct)return null;
 const record=misconceptionUnit(courseId,lesson);
 return record?.wrongOptions.find(row=>row.option===quiz.options[choice])?.reason||null;
}
export function quizChoiceFeedback(courseId,lesson,choice){
 const reason=misconceptionReason(courseId,lesson,choice);
 if(!reason)return '';
 return '<span class="choice-coach"><strong>Why this particular option falls short</strong> '+
  safe(reason)+' <small>Choice-specific teaching is pending independent specialist review.</small></span>';
}
export function validateMisconceptionCoach(courses){
 if(!Array.isArray(courses)||courses.length!==14||Object.keys(MISCONCEPTION_COACH).length!==14||
    new Set(courses.map(c=>c?.id)).size!==14||
    courses.some(c=>!Object.hasOwn(MISCONCEPTION_COACH,c.id)))
  throw Error('All fourteen subjects need choice-specific lessons');
 let count=0;
 for(const course of courses){
  const stages=MISCONCEPTION_COACH[course.id];
  if(Object.keys(stages).length!==3)throw Error('Three stage coach required: '+course.id);
  for(const stage of STAGES){
   const item=stages[stage];
   const lesson=course.lessons.find(l=>l.id===item?.lessonId&&l.stage===stage);
   if(!lesson||!misconceptionUnit(course.id,lesson))throw Error('Distractor mismatch: '+course.id+'/'+stage);
   for(const entry of item.wrongOptions){
    if(entry.option.length<8||entry.reason.length<90||typeof entry.reason!=='string')
     throw Error('Shallow distractor reasoning: '+course.id+'/'+stage);
   }
   count+=2;
  }
 }
 return count;
}
