/** Review packets are a source-accurate handoff to independent editors.
 * No network calls, credentials, learner notes, usage analytics, personal profiles,
 * synthetic reviewer names, inferred credentials or automated expert approval.
 */
import {createHash} from 'node:crypto';
import {practiceGuide} from '../practiceguides.js';
import {authoredCourseLinks} from '../sourcehealth.js';
import {CURRICULUM_OBJECTIVES} from '../curriculumpath.js';
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
   // Reviewers must see what this stage intends the learner to demonstrate.
   // Include objective changes in the signed content hash, just like lesson wording.
   const objective=CURRICULUM_OBJECTIVES[course.id]?.[lesson.stage];
   const content={title:lesson.title,stage:lesson.stage,
    stageLearningObjective:objective?{goal:objective.goal,evidence:objective.evidence}:null,
    intro:lesson.intro,
    sections:lesson.sections.map(s=>({heading:s.heading,body:s.body})),
    // All newly authored teaching is reviewed and hashed, not silently omitted.
    ...(lesson.deepSections?.length?{conceptFirstStudy:{
      studyMinutes:lesson.deepMinutes,
      sections:lesson.deepSections.map(s=>({heading:s.heading,body:s.body})),
      workedCase:lesson.deepExample,independentExercise:lesson.deepTask,
      ...(lesson.deepModelAnswer?{modelResponse:lesson.deepModelAnswer}:{}),
      ...(lesson.deepRubric?.length?{selfReviewRubric:[...lesson.deepRubric]}:{})
    }}:{}),
    ...(lesson.astronomySections?.length?{astronomySupplement:{
      reviewStatus:'pending-independent-review',
      chapters:lesson.astronomySections.map(section=>({heading:section.heading,body:section.body})),
      references:(lesson.astronomySources||[]).map(reference=>({label:reference.label,url:reference.url}))
    }}:{}),
    // All response paths and safer-choice flags require independent subject review.
    ...(lesson.responseSimulation?{interactiveDecisionSimulation:{
      key:lesson.responseSimulation.key,title:lesson.responseSimulation.title,
      scenario:lesson.responseSimulation.situation,
      rounds:lesson.responseSimulation.rounds.map(round=>({
        title:round.title,question:round.prompt,
        options:round.choices.map(choice=>({label:choice[0],consequence:choice[1],preferred:choice[2]}))
      })),transferTask:lesson.responseSimulation.synthesis,
      modelResponse:lesson.responseSimulation.model,
      rubric:[...lesson.responseSimulation.rubric],
      limits:lesson.responseSimulation.caveat,
      reviewStatus:'pending-independent-review'
    }}:{}),
    // Three-stage portfolio artifacts span existing lessons and require review.
    ...(lesson.portfolioJourney?{subjectPortfolioJourney:{
      key:lesson.portfolioJourney.key,reviewStatus:'pending-independent-review',
      title:lesson.portfolioJourney.title,brief:lesson.portfolioJourney.brief,
      artifacts:lesson.portfolioJourney.artifacts.map(a=>({
        stage:a.stage,linkedLessonId:a.lessonId,title:a.name,task:a.build,
        evidenceCriteria:a.test,workedReference:a.example
      })),rubric:[...lesson.portfolioJourney.rubric],
      limitations:lesson.portfolioJourney.limit
    }}:{}),
    // Author-authored supplementary fieldwork is not expert approval.
    ...(lesson.frontierWorkshop?{frontierFieldwork:{
      reviewStatus:'pending-independent-review',
      title:lesson.frontierWorkshop.title,
      method:lesson.frontierWorkshop.method,
      workedCase:lesson.frontierWorkshop.caseStudy,
      evidenceChallenge:lesson.frontierWorkshop.assignment
    }}:{}),
    // Each alternate decision response is public teaching requiring verification.
    ...(lesson.calibrationLab?{evidenceCalibration:{
      reviewStatus:'pending-independent-review',
      title:lesson.calibrationLab.title,situation:lesson.calibrationLab.situation,
      rounds:[lesson.calibrationLab.first,lesson.calibrationLab.second].map(round=>({
       prompt:round.prompt,
       choices:round.options.map(option=>({label:option[0],reason:option[1]})),
       preferredContextualIndex:round.preferred
      })),newEvidence:lesson.calibrationLab.reveal,
      independentExercise:lesson.calibrationLab.transfer,
      selfReviewCriteria:[...lesson.calibrationLab.rubric]
    }}:{}),
    // Advanced written defense, counterargument and rubric all require review.
    ...(lesson.masteryDefense?{advancedMasteryDefense:{
      reviewStatus:'pending-independent-review',
      title:lesson.masteryDefense.title,caseBrief:lesson.masteryDefense.brief,
      independentAssignment:lesson.masteryDefense.assignment,
      workedComparison:lesson.masteryDefense.model,
      strongestCounterargument:lesson.masteryDefense.counter,
      selfReviewCriteria:[...lesson.masteryDefense.checks],
      limits:lesson.masteryDefense.boundary
    }}:{}),
    // Two-step beginner workshops are authored evidence and require signoff.
    ...(lesson.beginnerWorkshop?{guidedBeginnerWorkshop:{
      key:lesson.beginnerWorkshop.key,reviewStatus:'pending-independent-review',
      title:lesson.beginnerWorkshop.title,objective:lesson.beginnerWorkshop.goal,
      scenario:lesson.beginnerWorkshop.case,
      steps:lesson.beginnerWorkshop.steps.map(step=>({title:step.name,
       independentActivity:step.instruction,assumptionCheck:step.diagnostic,
       modelResponse:step.model})),rubric:[...lesson.beginnerWorkshop.rubric],
      limitations:lesson.beginnerWorkshop.limits
    }}:{}),
    // Beginner retrieval prompts, alternatives and feedback are teaching claims.
    ...(lesson.foundationDiagnostic?{foundationActiveRecall:{
      key:lesson.foundationDiagnostic.key,reviewStatus:'pending-independent-review',
      title:lesson.foundationDiagnostic.title,intro:lesson.foundationDiagnostic.intro,
      questions:lesson.foundationDiagnostic.questions.map(q=>({
       prompt:q.prompt,options:[...q.options],correct:q.correct,
       explanation:q.explanation,transfer:q.transfer
      }))
    }}:{}),
    // Transfer labs and their solutions are equally subject to independent review.
    ...(lesson.transferLab?{intermediateTransferLab:{
      key:lesson.transferLab.key,title:lesson.transferLab.title,
      reviewStatus:'pending-independent-review',
      scenario:lesson.transferLab.scenario,independentChallenge:lesson.transferLab.task,
      workedReasoning:lesson.transferLab.worked,counterexample:lesson.transferLab.counterexample,
      selfReviewCriteria:[...lesson.transferLab.rubric],limitations:lesson.transferLab.caveat
    }}:{}),
    // Advanced studio assignments, worked responses and rubrics require review.
    ...(lesson.practicalStudio?{advancedPracticalStudio:{
      key:lesson.practicalStudio.key,reviewStatus:'pending-independent-review',
      title:lesson.practicalStudio.title,situation:lesson.practicalStudio.situation,
      rounds:lesson.practicalStudio.rounds.map(round=>({
        title:round.title,concept:round.focus,evidence:round.evidence,
        independentAssignment:round.assignment,workedResponse:round.model
      })),
      rubric:[...lesson.practicalStudio.rubric]
    }}:{}),
    // Counterfactual decisions, new evidence and revised answers require review.
    ...(lesson.decisionRevision?{decisionRevisionLab:{
      key:lesson.decisionRevision.key,reviewStatus:'pending-independent-review',
      title:lesson.decisionRevision.title,initialCase:lesson.decisionRevision.case,
      initialChallenge:lesson.decisionRevision.firstTask,newEvidence:lesson.decisionRevision.reveal,
      revisedModel:lesson.decisionRevision.revision,independentFollowUp:lesson.decisionRevision.follow,
      rubric:[...lesson.decisionRevision.rubric],limits:lesson.decisionRevision.caveat
    }}:{}),
    // Every cross-subject scenario, answer, and companion link needs review.
    ...(lesson.crossSubjectMission?{interdisciplinaryMission:{
      key:lesson.crossSubjectMission.key,reviewStatus:'pending-independent-review',
      title:lesson.crossSubjectMission.title,
      companion:{course:lesson.crossSubjectMission.peerCourse,lesson:lesson.crossSubjectMission.peerLesson},
      scenario:lesson.crossSubjectMission.scene,
      connection:lesson.crossSubjectMission.bridge,
      challenge:lesson.crossSubjectMission.challenge,
      modelResponse:lesson.crossSubjectMission.model,
      selfReviewRubric:[...lesson.crossSubjectMission.rubric]
    }}:{}),
    // Review original evidence inquiries and each simulated exhibit as teaching claims.
    ...(lesson.evidenceInquiry?{advancedEvidenceInquiry:{
      key:lesson.evidenceInquiry.key,reviewStatus:'pending-independent-review',
      title:lesson.evidenceInquiry.title,scenario:lesson.evidenceInquiry.scenario,
      exhibits:lesson.evidenceInquiry.exhibits.map(ex=>({label:ex.label,detail:ex.detail})),
      independentChallenge:lesson.evidenceInquiry.challenge,
      workedReasoning:lesson.evidenceInquiry.reasoning,
      modelResponse:lesson.evidenceInquiry.model,
      counterexample:lesson.evidenceInquiry.countercase,
      rubric:[...lesson.evidenceInquiry.rubric],limitations:lesson.evidenceInquiry.limits
    }}:{}),
    // Flowchart text is a teaching claim too. Include it in editorial review hashes.
    ...(lesson.flow?{learningFlow:{title:lesson.flow.title,steps:lesson.flow.steps.map(step=>({label:step.label,detail:step.detail})),caption:lesson.flow.caption}}:{}),
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
