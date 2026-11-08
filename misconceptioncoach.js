/**
 * Atlas Choice Coach: answer-specific explanations for 42 existing lessons.
 *
 * A selected distractor is NOT a psychological diagnosis; this teaches why
 * that option fails in this question. Every authored explanation is awaiting
 * independent subject review, and quizzes/grades remain unchanged.
 */
import {MISCONCEPTIONS_A} from './misconceptions1.js';
import {MISCONCEPTIONS_B} from './misconceptions2.js';
import {MISCONCEPTION_EXTENSIONS} from './misconceptions3.js';
const material={...MISCONCEPTIONS_A,...MISCONCEPTIONS_B};
export const MISCONCEPTION_COACH=Object.freeze(Object.fromEntries(
 Object.entries(material).map(([courseId,stages])=>[courseId,Object.freeze(
  Object.fromEntries(Object.entries(stages).map(([stage,parts])=>[
   stage,Object.freeze({lessonId:parts[0],stage,
    wrongOptions:Object.freeze(parts.slice(1).map(([option,reason])=>Object.freeze({option,reason}))),
    reviewStatus:'pending-independent-review'})
  ])))])
));
export const EXTENDED_MISCONCEPTIONS=Object.freeze(Object.fromEntries(
 Object.entries(MISCONCEPTION_EXTENSIONS).map(([courseId,raw])=>[courseId,Object.freeze({
  lessonId:raw[0],
  wrongOptions:Object.freeze(raw.slice(1).map(([option,reason])=>Object.freeze({option,reason}))),
  reviewStatus:'pending-independent-review'
 })])
));
const STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
const safe=text=>String(text??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
export function misconceptionUnit(courseId,lesson){
 const lessonId=lesson?.lessonId||lesson?.id;
 const original=MISCONCEPTION_COACH[courseId]?.[lesson?.stage];
 const record=original?.lessonId===lessonId?original:EXTENDED_MISCONCEPTIONS[courseId];
 if(!record||record.lessonId!==lessonId)return null;
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
 const quiz=lesson?.quiz||lesson;
 if(!Number.isInteger(choice)||!Array.isArray(quiz?.options)||
    !Number.isInteger(quiz.correct)||choice<0||choice>=quiz.options.length||
    choice===quiz.correct)return '';
 const reason=misconceptionReason(courseId,lesson,choice);
 if(reason)return '<span class="choice-coach"><strong>Why this particular option falls short</strong> '+
  safe(reason)+' <small>Choice-specific teaching is pending independent specialist review.</small></span>';
 return '<span class="choice-coach choice-coach-compare"><strong>Compare the two answers</strong>'+
  '<span><b>You chose:</b> '+safe(quiz.options[choice])+'</span>'+
  '<span><b>Lesson answer:</b> '+safe(quiz.options[quiz.correct])+'</span>'+
  '<small>Use the lesson explanation above to identify the difference. This is a basic comparison, not an individually authored analysis of this distractor or proof of mastery.</small></span>';
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

/** Every original lesson has either authored option guidance or a faithful
 * comparison of that lesson's current answer key. Do not label the latter
 * as independently reviewed, option-specific instruction.
 */
export function validateExtendedMisconceptions(courses){
 if(!Array.isArray(courses)||courses.length!==14||
    Object.keys(EXTENDED_MISCONCEPTIONS).length!==14)throw Error('All fourteen extensions required');
 let count=0;
 for(const course of courses){
  const record=EXTENDED_MISCONCEPTIONS[course.id];
  const lesson=course.lessons.find(l=>l.id===record?.lessonId);
  if(!lesson||!misconceptionUnit(course.id,lesson)||
    record.wrongOptions.length!==2||
    (MISCONCEPTION_COACH[course.id]?.[lesson.stage]?.lessonId===lesson.id))
   throw Error('Misaligned extra misconception: '+course.id);
  for(const [i,option] of lesson.quiz.options.entries()){
   if(i===lesson.quiz.correct)continue;
   const reason=misconceptionReason(course.id,lesson,i);
   if(!reason||reason.length<95||!record.wrongOptions.some(x=>x.option===option&&x.reason===reason))
    throw Error('Missing specific rationale: '+course.id+'/'+lesson.id+'/'+i);
   count++;
  }
 }
 return count;
}
export function validateQuizChoiceCoverage(courses){
 let lessons=0,tailored=0,comparisons=0;
 for(const course of courses){
  for(const lesson of course.lessons){
   const q=lesson.quiz;
   if(!Array.isArray(q?.options)||q.options.length!==3||!Number.isInteger(q.correct)||
      q.correct<0||q.correct>2)throw Error('Invalid quiz answer key: '+course.id+'/'+lesson.id);
   lessons++;
   for(let i=0;i<3;i++){
    const html=quizChoiceFeedback(course.id,lesson,i);
    if(i===q.correct){if(html)throw Error('Coaching on correct answer');continue;}
    if(!html)throw Error('Missing feedback: '+course.id+'/'+lesson.id+'/'+i);
    if(misconceptionReason(course.id,lesson,i)){if(!html.includes('Why this particular option'))throw Error('Missing specific guidance');tailored++;}
    else {if(!html.includes('Compare the two answers'))throw Error('Missing transparent comparison');comparisons++;}
   }
  }
 }
 return {lessons,tailored,comparisons};
}
