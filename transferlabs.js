/** Integrates original, subject-specific intermediate transfer labs into Xyra Atlas.
 * Never adds or renames lessons, changes graded quiz keys, alters learner storage,
 * or treats authored content as externally approved.
 */
import {TRANSFER_LABS_ONE} from './transferlabs1.js';
import {TRANSFER_LABS_TWO} from './transferlabs2.js';

export const TRANSFER_LABS=Object.freeze({...TRANSFER_LABS_ONE,...TRANSFER_LABS_TWO});
export const TRANSFER_LAB_COUNT=Object.keys(TRANSFER_LABS).length;

export function attachTransferLabs(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas course list');
 const names=new Set(courses.map(x=>x?.id));
 if(TRANSFER_LAB_COUNT!==14 || names.size!==14 ||
  Object.keys(TRANSFER_LABS).some(name=>!names.has(name)))
  throw Error('Intermediate transfer lab subject coverage incomplete');
 const changes=[];
 for(const [courseId,lab] of Object.entries(TRANSFER_LABS)){
  const course=courses.find(item=>item.id===courseId);
  const lesson=course?.lessons?.find(item=>item.id===lab.lessonId);
  if(!lesson||lesson.stage!=='Intermediate'||!Array.isArray(lesson.sections))
   throw Error('Missing intermediate prerequisite for '+courseId+':'+lab.lessonId);
  for(const field of ['title','scenario','worked','counterexample','task','caveat']){
   if(typeof lab[field]!=='string'||lab[field].length<({title:12,scenario:180,worked:480,counterexample:120,task:170,caveat:60}[field]))
    throw Error('Incomplete '+field+' in transfer lab '+courseId);
  }
  if(!Array.isArray(lab.rubric)||lab.rubric.length!==4||
   !lab.rubric.every(line=>typeof line==='string'&&line.length>45))
   throw Error('Transfer lab needs four explicit assessment criteria: '+courseId);
  if(lesson.transferLab){
   if(lesson.transferLab.key!==courseId+':'+lab.lessonId)
    throw Error('Transfer lab conflict for '+courseId);
   continue;
  }
  changes.push({lesson,lab,courseId});
 }
 // Validate every entry before assigning any content so failed integrations
 // never partially extend the curriculum.
 for(const {lesson,lab,courseId} of changes){
  lesson.transferLab=Object.freeze({
   key:courseId+':'+lab.lessonId,
   title:lab.title,scenario:lab.scenario,worked:lab.worked,
   counterexample:lab.counterexample,task:lab.task,
   rubric:Object.freeze([...lab.rubric]),caveat:lab.caveat,
   reviewStatus:'pending-independent-review'
  });
 }
 return changes.length;
}
