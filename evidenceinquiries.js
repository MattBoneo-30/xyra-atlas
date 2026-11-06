/** Advanced evidence inquiry integration.
 * One subject-specific investigation per existing advanced lesson.
 * Does not change IDs, source inventory, quiz keys, stored progress, or approvals.
 */
import {ADVANCED_DEPTH} from './advanceddepth.js';
import {EVIDENCE_INQUIRIES_A} from './evidenceinquiries1.js';
import {EVIDENCE_INQUIRIES_B} from './evidenceinquiries2.js';
export const EVIDENCE_INQUIRIES=Object.freeze({...EVIDENCE_INQUIRIES_A,...EVIDENCE_INQUIRIES_B});
export const EVIDENCE_INQUIRY_COUNT=Object.keys(EVIDENCE_INQUIRIES).length;

export function attachEvidenceInquiries(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas course list');
 const courseIds=new Set(courses.map(course=>course?.id));
 if(EVIDENCE_INQUIRY_COUNT!==14||courseIds.size!==14||
   Object.keys(EVIDENCE_INQUIRIES).some(id=>!courseIds.has(id)))
   throw Error('Advanced inquiry subject coverage incomplete');
 const pending=[];
 for(const [courseId,entry] of Object.entries(EVIDENCE_INQUIRIES)){
  const lessonId=ADVANCED_DEPTH[courseId]?.id;
  const lesson=courses.find(course=>course.id===courseId)?.lessons?.find(item=>item.id===lessonId);
  if(!lesson||lesson.stage!=='Advanced'||!Array.isArray(lesson.deepSections)||lesson.deepSections.length!==4)
   throw Error('Advanced inquiry prerequisite missing: '+courseId);
  for(const key of ['title','scenario','reasoning','countercase','challenge','model','limits']){
   const floor={title:20,scenario:150,reasoning:390,countercase:120,challenge:160,model:220,limits:55}[key];
   if(typeof entry[key]!=='string'||entry[key].length<floor)
    throw Error('Incomplete inquiry '+courseId+': '+key);
  }
  if(!Array.isArray(entry.exhibits)||entry.exhibits.length!==3||
     entry.exhibits.some(pair=>!Array.isArray(pair)||pair.length!==2||
      typeof pair[0]!=='string'||pair[0].length<10||
      typeof pair[1]!=='string'||pair[1].length<65))
   throw Error('Incomplete source exhibits: '+courseId);
  if(!Array.isArray(entry.rubric)||entry.rubric.length!==4||
     entry.rubric.some(item=>typeof item!=='string'||item.length<50))
   throw Error('Incomplete reasoning rubric: '+courseId);
  const key=courseId+':'+lessonId;
  if(lesson.evidenceInquiry){
   if(lesson.evidenceInquiry.key!==key)throw Error('Incompatible existing inquiry: '+key);
   continue;
  }
  pending.push({lesson,entry,key});
 }
 // Validate the whole collection before mutating a single lesson.
 for(const {lesson,entry,key} of pending){
  lesson.evidenceInquiry=Object.freeze({
   key,title:entry.title,scenario:entry.scenario,
   exhibits:Object.freeze(entry.exhibits.map(([label,detail])=>Object.freeze({label,detail}))),
   reasoning:entry.reasoning,countercase:entry.countercase,
   challenge:entry.challenge,model:entry.model,
   rubric:Object.freeze([...entry.rubric]),limits:entry.limits,
   reviewStatus:'pending-independent-review'
  });
 }
 return pending.length;
}
