/** DOM-only Mastery Defense writer.
 * Delegates to the existing Field Notebook input listener for local saving;
 * does not create new data stores, network calls or completion records.
 */
import {MASTERY_DEFENSES,masteryDefenseTemplate,composeDefenseNote} from './masterydefenses.js';
import {MAX_FIELD_NOTE_LENGTH} from './fieldnotes.js';

document.addEventListener('click',event=>{
 const button=event.target.closest?.('[data-action="mastery-insert-template"]');
 if(!button)return;
 const panel=button.closest('#mastery-defense');
 if(!panel||!panel.closest('.reading-page'))return;
 const courseId=panel.dataset.masteryCourse,lessonId=panel.dataset.masteryLesson;
 if(!courseId||!lessonId||!Object.hasOwn(MASTERY_DEFENSES,courseId))return;
 const field=document.getElementById('field-note-input');
 if(!field||field.dataset.fieldNote!==courseId+':'+lessonId)return;
 const status=panel.querySelector('.mastery-defense-status');
 const template=masteryDefenseTemplate(MASTERY_DEFENSES[courseId]);
 const result=composeDefenseNote(field.value,template,MAX_FIELD_NOTE_LENGTH);
 if(!result.ok){
  if(status)status.textContent=result.reason==='already-added'?
   'The writing scaffold is already in your notebook.':
   'Your notebook does not have enough room for this scaffold. Export or shorten notes before inserting it.';
  return;
 }
 field.value=result.value;
 field.dispatchEvent(new Event('input',{bubbles:true}));
 if(status)status.textContent='Writing scaffold inserted and saved locally. Complete each field with your own evidence.';
 field.focus({preventScroll:true});
 field.scrollIntoView({block:'center',behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
});
