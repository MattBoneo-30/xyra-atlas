/** Review packets are a source-accurate handoff to independent editors.
 * No network calls, credentials, learner notes, usage analytics, personal profiles,
 * synthetic reviewer names, inferred credentials or automated expert approval.
 */
import {createHash} from 'node:crypto';
import {practiceGuide} from '../practiceguides.js';
import {authoredCourseLinks} from '../sourcehealth.js';
const toRecord=value=>value!==null&&typeof value==='object'&&!Array.isArray(value);
const highStakes=new Set(['laws','savings','science','relationships','digital','shadow']);
export function reviewHash(content){
 return createHash('sha256').update(JSON.stringify(content)).digest('hex');
}
export function buildEditorialReviewPacket(courses,clinics){
 if(!Array.isArray(courses)||!toRecord(clinics))throw new Error('Invalid author content');
 const lessons=[],seen=new Set();
 for(const course of courses){
  if(!toRecord(course)||typeof course.id!=='string'||!Array.isArray(course.lessons))throw new Error('Invalid course');
  for(const lesson of course.lessons){
   const id=course.id+':'+lesson.id;
   if(seen.has(id))throw new Error('Duplicate lesson: '+id);
   seen.add(id);
   const content={title:lesson.title,stage:lesson.stage,intro:lesson.intro,
    sections:lesson.sections.map(s=>({heading:s.heading,body:s.body})),
    workedExample:lesson.example,task:lesson.task,
    stagePractice:[...(practiceGuide(course.id,lesson.stage)||[])],
    quiz:{question:lesson.quiz.question,options:[...lesson.quiz.options],correct:lesson.quiz.correct,explanation:lesson.quiz.explanation},
    references:(lesson.sources||[]).map(r=>({label:r.label,url:r.url}))};
   lessons.push({id,course:course.id,stage:lesson.stage,highStakes:highStakes.has(course.id),
    contentHash:reviewHash(content),reviewStatus:'pending-independent-review',
    reviewerAttestation:null,content,
    checklist:['Learning objectives and prerequisite accuracy','Evidence and example correctness',
    'All answer options and explanation independently reviewed','Exercise is ethical, feasible and safe',
    'Sources substantively support the claims and jurisdiction is current',
    'Language, accessibility and cultural context independently inspected']});
  }
 }
 const decisions=[];
 for(const [courseId,clinic] of Object.entries(clinics))for(const q of clinic.questions||[]){
  const content={courseId,question:q.prompt,options:[...q.options],correct:q.correct,
   explanation:q.explanation,stage:q.stage||'Applied',sources:clinic.references.map(r=>({label:r.label,url:r.url}))};
  decisions.push({id:courseId+':'+q.id,highStakes:highStakes.has(courseId),
    contentHash:reviewHash(content),reviewStatus:'pending-independent-review',
    reviewerAttestation:null,content});
 }
 const references=authoredCourseLinks(courses,clinics);
 const totals={subjects:courses.length,lessons:lessons.length,decisions:decisions.length,
  uniqueSourceURLs:references.length,expertApprovedLessons:0,expertApprovedDecisions:0};
 return {schemaVersion:1,status:'review-packet-not-independent-signoff',totals,
  lessons,decisions,references,
  reviewPolicy:{
   sourceChangeInvalidatesPriorApproval:true,
   independentIdentityAndQualificationsMustBeVerified:true,
   anyHumanReviewRequiresDocumentedScopeAndDate:true,
   notes:'The packet only prepares evidence for qualified reviewers. A text field that says approved is not itself independent review, and no stage completion is granted.'
  }};
}
