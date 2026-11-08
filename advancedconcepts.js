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
  if(lesson.deepSections?.length||lesson.deepExample||lesson.deepTask||
    lesson.deepModelAnswer||lesson.deepRubric?.length)
   throw Error('Specialist study would overwrite published depth: '+course.id);
  changes.push({lesson,item});
 }
 // Validate before attaching, so an invalid course cannot result in a partial upgrade.
 for(const {lesson,item} of changes){
  lesson.specialistConceptStudy=item;
  lesson.deepTitle=item.title;
  lesson.deepMinutes=item.minutes;
  lesson.deepSections=item.sections.map(section=>({...section}));
  lesson.deepExample=item.case;
  lesson.deepTask=item.task;
  lesson.deepModelAnswer=item.model;
  lesson.deepRubric=[...item.rubric];
 }
 return changes.length;
}
