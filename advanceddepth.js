/** Advanced-depth integration, preserves existing lesson IDs, original cases,
 * graded quiz keys, source inventories and plan estimates.
 * Authored instruction remains pending qualified external editorial review.
 */
import {ADVANCED_CASES_ONE} from './advancedcases1.js';
import {ADVANCED_CASES_TWO} from './advancedcases2.js';
export const ADVANCED_DEPTH=Object.freeze({...ADVANCED_CASES_ONE,...ADVANCED_CASES_TWO});
const OFFICIAL_REFERENCES=Object.freeze({
 laws:{label:'National Privacy Commission — Right to Access',url:'https://privacy.gov.ph/right-to-access/'},
 digital:{label:'NIST SP 800-63B — Digital Authentication',url:'https://pages.nist.gov/800-63-4/sp800-63b.html'},
 science:{label:'NASA Science — Moon Phases',url:'https://science.nasa.gov/moon/moon-phases/'}
});
export function deepenAdvancedLessons(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas course list');
 const enriched=new Set();
 for(const course of courses){
  const entry=ADVANCED_DEPTH[course.id];
  if(!entry)continue;
  const lesson=course.lessons.find(item=>item.id===entry.id);
  if(!lesson||lesson.stage!=='Advanced')throw Error('Missing advanced lesson: '+course.id);
  if(!Array.isArray(lesson.sections)||lesson.sections.length<3||!lesson.quiz||
     Array.isArray(lesson.deepSections)&&lesson.deepSections.length)
   throw Error('Invalid advanced teaching prerequisite: '+course.id);
  if(entry.sections.length!==4||entry.rubric.length!==4||entry.flow.length!==4)
   throw Error('Advanced lesson has missing evidence or assessment: '+course.id);
  lesson.deepTitle=entry.title;
  lesson.deepSections=entry.sections.map(s=>({heading:s.title,body:s.part}));
  lesson.deepExample=entry.case;
  lesson.deepTask=entry.task;
  lesson.deepModelAnswer=entry.answer;
  lesson.deepRubric=[...entry.rubric];
  lesson.deepMinutes=entry.minutes;
  lesson.flow={
   title:'Advanced reasoning — trace the evidence',
   steps:entry.flow.map(([label,detail])=>({label,detail})),
   caption:'Work through the full case before comparing your answer. Self-review is not certification.'
  };
  lesson.advancedDepth='case-and-counterexample-2026';
  const official=OFFICIAL_REFERENCES[course.id];
  if(official&&!(lesson.sources||[]).some(s=>s.url===official.url)){
   lesson.sources=[...(lesson.sources||[]),{...official}];
  }
  enriched.add(course.id);
 }
 if(enriched.size!==14)throw Error('Advanced subject coverage incomplete: '+enriched.size);
 return enriched.size;
}
