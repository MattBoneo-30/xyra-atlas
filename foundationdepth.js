/**
 * Stronger opening lessons for every Atlas course. Mutates the existing lesson
 * objects in place, retaining lesson IDs, quiz answer indices, references and progress.
 * No source or approval claim is automatically granted to authored material.
 */
import {FOUNDATION_DEPTH_ONE} from './foundationdepth1.js';
import {FOUNDATION_DEPTH_TWO} from './foundationdepth2.js';

export const FOUNDATION_DEPTH_UPGRADES=Object.freeze({...FOUNDATION_DEPTH_ONE,...FOUNDATION_DEPTH_TWO});
export function deepenOriginalFoundations(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas course list');
 const actual=new Set();
 for(const course of courses){
  const upgrade=FOUNDATION_DEPTH_UPGRADES[course.id];
  if(!upgrade)continue;
  const lesson=course.lessons.find(item=>item.id===upgrade.id);
  if(!lesson)throw Error('Missing original lesson for '+course.id);
  if(!Array.isArray(lesson.sections)||lesson.sections.length<2||!lesson.quiz)
   throw Error('Invalid course lesson for '+course.id);
  if(!Array.isArray(upgrade.sections)||upgrade.sections.length<5||
   !upgrade.flow||!Array.isArray(upgrade.flow.steps)||upgrade.flow.steps.length!==4)
   throw Error('Incomplete authored teaching foundation for '+course.id);
  actual.add(course.id);
  // Preserve the original supplemental case/reference sections from prior editorial passes.
  // The first two short sections are replaced by explanatory teaching, not duplicated.
  lesson.sections=[...upgrade.sections.map(s=>({...s})),...lesson.sections.slice(2)];
  lesson.title=upgrade.title;
  lesson.intro=upgrade.intro;
  lesson.minutes=Math.max(lesson.minutes||0,upgrade.minutes);
  lesson.example=upgrade.example;
  lesson.task=upgrade.task;
  lesson.flow={title:upgrade.flow.title,steps:upgrade.flow.steps.map(x=>({...x})),caption:upgrade.flow.caption};
  lesson.foundationalDepth='concept-first-2026';
 }
 if(actual.size!==Object.keys(FOUNDATION_DEPTH_UPGRADES).length)
  throw Error('A course foundation was missing from the curriculum');
 return actual.size;
}
