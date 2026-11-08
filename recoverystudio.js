/**
 * Atlas Recovery Studio
 * 14 subjects x 3 stage-level, independently authored transfer cases.
 * These reinforce a level after an incorrect quiz attempt; they do not
 * diagnose why a specific multiple-choice option was chosen.
 * No extra grade, new completion identity, storage, or network requests.
 */
export {quizChoiceFeedback} from './misconceptioncoach.js';
import {RECOVERY_CASES_A} from './recoverystudio1.js';
import {RECOVERY_CASES_B} from './recoverystudio2.js';

export const RECOVERY_STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
const source={...RECOVERY_CASES_A,...RECOVERY_CASES_B};
export const RECOVERY_STUDIO=Object.freeze(Object.fromEntries(
 Object.entries(source).map(([id,rows])=>[id,Object.freeze(rows.map(([prompt,method,trap,verify],i)=>
  Object.freeze({stage:RECOVERY_STAGES[i],prompt,method,trap,verify,reviewStatus:'pending-independent-review'})))])
));
export function getRecoveryCase(courseId,stage){
 if(typeof courseId!=='string'||!RECOVERY_STAGES.includes(stage)||!Object.hasOwn(RECOVERY_STUDIO,courseId))return null;
 return RECOVERY_STUDIO[courseId][RECOVERY_STAGES.indexOf(stage)]||null;
}
export function validateRecoveryCases(courses){
 if(!Array.isArray(courses)||courses.length!==14||new Set(courses.map(c=>c?.id)).size!==14||
  Object.keys(RECOVERY_STUDIO).length!==14||courses.some(c=>!Object.hasOwn(RECOVERY_STUDIO,c.id)))
  throw Error('All fourteen subjects require recovery cases');
 let count=0;
 for(const course of courses){
  const rows=RECOVERY_STUDIO[course.id];
  if(rows.length!==3)throw Error('Missing stage in recovery studio: '+course.id);
  for(let i=0;i<3;i++){
   const row=rows[i];
   if(row.stage!==RECOVERY_STAGES[i]||row.prompt.length<100||row.method.length<130||
      row.trap.length<52||row.verify.length<75||row.reviewStatus!=='pending-independent-review'||
      !course.lessons.some(l=>l.stage===row.stage))
    throw Error('Invalid recovery instruction: '+course.id+'/'+row.stage);
   count++;
  }
 }
 return count;
}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function recoveryStudioPanel(item){
 const lessonStage=item?.stage,entry=getRecoveryCase(item?.courseId,lessonStage);
 if(!entry)return '';
 return '<section class="recovery-studio" id="recovery-studio" aria-label="Level-specific mistake recovery practice">'+
  '<span class="overline">RECOVERY STUDIO · '+esc(lessonStage.toUpperCase())+' TRANSFER</span>'+
  '<h3>A new problem, not the same answer</h3>'+
  '<p class="recovery-studio-warning">You missed the lesson question again. This is broader '+esc(lessonStage.toLowerCase())+' practice, not a diagnosis of your specific mistake. Try the fresh case before reading the model.</p>'+
  '<p class="recovery-studio-prompt">'+esc(entry.prompt)+'</p>'+
  '<details class="recovery-studio-method"><summary>Compare a reasoned approach after attempting</summary>'+
   '<p>'+esc(entry.method)+'</p>'+
   '<p><strong>Watch for:</strong> '+esc(entry.trap)+'</p></details>'+
  '<p class="recovery-studio-verify"><strong>Independent check:</strong> '+esc(entry.verify)+'</p>'+
  '<p class="fineprint">Practice only. This authored guidance still requires specialist editorial review. Opening the example never changes a grade, marks a lesson complete, or certifies competence.</p></section>';
}
