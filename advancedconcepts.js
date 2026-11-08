/**
 * Specialist concept-first lessons across all 14 Atlas subjects.
 * Deepens original advanced lesson IDs in place: no extra progress, review or
 * quiz IDs; does not assert independent expert or legal/clinical approval.
 */
import {ADVANCED_CONCEPTS_A} from './advancedconcepts1.js';
import {ADVANCED_CONCEPTS_B} from './advancedconcepts2.js';
const raw={...ADVANCED_CONCEPTS_A,...ADVANCED_CONCEPTS_B};
export const ADVANCED_CONCEPT_STUDIES=Object.freeze(Object.fromEntries(
 Object.entries(raw).map(([subject,item])=>[subject,Object.freeze({
  ...item,
  sections:Object.freeze(item.sections.map(([heading,body])=>Object.freeze({heading,body}))),
  rubric:Object.freeze([...item.rubric]),
  reviewStatus:'pending-independent-review'
 })])
));
export function attachAdvancedConceptStudies(courses){
 if(!Array.isArray(courses)||courses.length!==14||new Set(courses.map(c=>c?.id)).size!==14||
   Object.keys(ADVANCED_CONCEPT_STUDIES).length!==14||
   courses.some(course=>!Object.hasOwn(ADVANCED_CONCEPT_STUDIES,course.id)))
  throw Error('Advanced concept study requires all fourteen subjects');
 const changes=[];
 for(const course of courses){
  const item=ADVANCED_CONCEPT_STUDIES[course.id];
  const lesson=course.lessons.find(lesson=>lesson.id===item.id&&lesson.stage==='Advanced');
  if(!lesson||!lesson.quiz||!Array.isArray(lesson.sections)||lesson.sections.length<3)
   throw Error('Missing advanced source lesson: '+course.id+':'+item.id);
  if(item.sections.length!==3||item.sections.some(s=>s.heading.length<15||s.body.length<300)||
    item.case.length<350||item.task.length<250||item.model.length<350||
    item.rubric.length!==4||item.rubric.some(s=>s.length<50)||item.minutes<=lesson.minutes)
   throw Error('Incomplete specialist teaching: '+course.id);
  if(lesson.specialistConceptStudy){
   if(lesson.specialistConceptStudy!==item)throw Error('Specialist study conflict: '+course.id);
   continue;
  }
  // Some subjects have an original flagship study on another advanced lesson.
  // Extend the authored target without moving or replacing that flagship.
  if(lesson.deepSections?.length&&(!lesson.deepModelAnswer||!lesson.deepTask))
   throw Error('Existing lesson depth is incomplete: '+course.id);
  changes.push({lesson,item});
 }
 // Validate before attaching, so an invalid course cannot result in a partial upgrade.
 for(const {lesson,item} of changes)lesson.specialistConceptStudy=item;
 return changes.length;
}
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
export function specialistConceptPanel(item){
 if(!item||item.reviewStatus!=='pending-independent-review')return '';
 const sections=item.sections.map((section,index)=>
   '<section class="specialist-concept-section" id="specialist-concept-section-'+index+'">'+
   '<span class="article-section-num">0'+(index+1)+' / SPECIALIST CONCEPT</span>'+
   '<h3>'+esc(section.heading)+'</h3><p>'+esc(section.body)+'</p></section>'
 ).join('');
 return '<section class="specialist-concept-study" id="specialist-concept-study" aria-label="Specialist concept continuation">'+
  '<div class="specialist-study-head"><span class="overline">SPECIALIST CONTINUATION · EXTEND THE METHOD</span>'+
  '<h2>'+esc(item.title)+'</h2><p>Explore three additional connected concepts, an applied case and a reasoned comparison. This material remains unreviewed and does not change the original study or completion record.</p></div>'+
  sections+
  '<aside class="specialist-worked-case"><span class="overline">APPLIED SPECIALIST CASE</span>'+
  '<h3>Trace the method</h3><p>'+esc(item.case)+'</p></aside>'+
  '<section class="specialist-concept-task"><h3>Your independent challenge</h3><p>'+esc(item.task)+'</p>'+
  '<details class="specialist-concept-answer"><summary>Reveal worked comparison after trying</summary><p>'+esc(item.model)+'</p></details>'+
  '<h3>Check your evidence</h3><ol>'+item.rubric.map(value=>'<li>'+esc(value)+'</li>').join('')+'</ol></section>'+
  '<p class="fineprint">Educational authoring pending qualified specialist review; no assessment certification or individualized advice.</p></section>';
}
