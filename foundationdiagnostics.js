/** Beginner diagnostics: retrieval, application and boundary checks.
 * One three-question self-check per original concept-first lesson.
 * Optional practice only: never changes published quizzes, grades or learner data.
 */
import {FOUNDATION_DEPTH_UPGRADES} from './foundationdepth.js';
import {FOUNDATION_DIAGNOSTICS_ONE} from './foundationdiagnostics1.js';
import {FOUNDATION_DIAGNOSTICS_TWO} from './foundationdiagnostics2.js';
export const FOUNDATION_DIAGNOSTICS=Object.freeze({...FOUNDATION_DIAGNOSTICS_ONE,...FOUNDATION_DIAGNOSTICS_TWO});
export const FOUNDATION_DIAGNOSTIC_COUNT=Object.keys(FOUNDATION_DIAGNOSTICS).length;
export function attachFoundationDiagnostics(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas course list');
 const ids=new Set(courses.map(course=>course?.id));
 if(ids.size!==14||FOUNDATION_DIAGNOSTIC_COUNT!==14||
  Object.keys(FOUNDATION_DIAGNOSTICS).some(id=>!ids.has(id)))
  throw Error('Foundation diagnostic subject coverage incomplete');
 const staged=[];
 for(const [courseId,entry] of Object.entries(FOUNDATION_DIAGNOSTICS)){
  const expected=FOUNDATION_DEPTH_UPGRADES[courseId]?.id;
  const lesson=courses.find(c=>c.id===courseId)?.lessons?.find(l=>l.id===entry.lessonId);
  if(expected!==entry.lessonId||!lesson||lesson.stage!=='Beginner'||!Array.isArray(lesson.deepSections))
   throw Error('Original beginner teaching prerequisite missing: '+courseId);
  if(typeof entry.title!=='string'||entry.title.length<22||
   typeof entry.intro!=='string'||entry.intro.length<65||
   !Array.isArray(entry.questions)||entry.questions.length!==3)
   throw Error('Incomplete foundation diagnostic: '+courseId);
  for(const [i,q] of entry.questions.entries()){
   if(typeof q.prompt!=='string'||q.prompt.length<60||
    !Array.isArray(q.options)||q.options.length!==3||
    !q.options.every(x=>typeof x==='string'&&x.length>=5)||new Set(q.options).size!==3||
    !Number.isInteger(q.correct)||q.correct<0||q.correct>2||
    typeof q.explanation!=='string'||q.explanation.length<110||
    typeof q.transfer!=='string'||q.transfer.length<65)
    throw Error('Incomplete foundation question '+courseId+':'+i);
  }
  if(lesson.foundationDiagnostic){
   if(lesson.foundationDiagnostic.key!==courseId+':'+entry.lessonId)
    throw Error('Conflicting diagnostic in '+courseId);
   continue;
  }
  staged.push({courseId,entry,lesson});
 }
 // Validate the whole corpus before altering a single published lesson.
 for(const {courseId,entry,lesson} of staged){
  lesson.foundationDiagnostic=Object.freeze({
   key:courseId+':'+entry.lessonId,title:entry.title,intro:entry.intro,
   questions:Object.freeze(entry.questions.map(q=>Object.freeze({
    prompt:q.prompt,options:Object.freeze([...q.options]),correct:q.correct,
    explanation:q.explanation,transfer:q.transfer
   }))),reviewStatus:'pending-independent-review'
  });
 }
 return staged.length;
}
