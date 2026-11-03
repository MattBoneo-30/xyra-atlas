/** Xyra Atlas curriculum content audit.
 * Mechanical checks identify gaps but NEVER certify legal accuracy, citations,
 * accessibility, educational outcomes or native-speaker expertise.
 */
const expectedStages=Object.freeze(['Beginner','Intermediate','Advanced']);
const valid=v=>typeof v==='string'&&v.trim().length>0;
const wordLength=v=>typeof v==='string'?v.trim().length:0;
const isObject=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
function checkSource(ref){
 if(!isObject(ref)||!valid(ref.label)||!valid(ref.url))return false;
 try{return new URL(ref.url).protocol==='https:';}catch{return false;}
}
export function auditCurriculum(courses){
 const lessons=[],subjects=[],criticalIssues=[],used=new Set();
 if(!Array.isArray(courses))return {valid:false,subjects:[],lessons:[],criticalIssues:['invalid-course-input'],totals:null};
 for(const course of courses){
  if(!isObject(course)||!valid(course.id)||!Array.isArray(course.lessons)){
   criticalIssues.push('invalid-course-record');continue;
  }
  const levels=Object.fromEntries(expectedStages.map(stage=>[stage,0]));
  const checks={subject:course.id,lessonCount:course.lessons.length,stages:levels};
  subjects.push(checks);
  if(!expectedStages.every(stage=>course.lessons.some(l=>l?.stage===stage)))criticalIssues.push(course.id+':missing-stage');
  for(const lesson of course.lessons){
   if(!isObject(lesson)||!valid(lesson.id)){criticalIssues.push(course.id+':invalid-lesson');continue;}
   const id=course.id+':'+lesson.id;
   if(used.has(id))criticalIssues.push(id+':duplicate-id');
   used.add(id);
   if(Object.hasOwn(levels,lesson.stage))levels[lesson.stage]++;
   else criticalIssues.push(id+':invalid-stage');
   const quiz=lesson.quiz,options=Array.isArray(quiz?.options)?quiz.options:[];
   const usableOptions=options.length>=3&&options.length<=8&&options.every(valid)&&
      new Set(options.map(x=>x.trim().toLocaleLowerCase('en'))).size===options.length;
   const quizValid=valid(quiz?.question)&&usableOptions&&Number.isInteger(quiz.correct)&&
     quiz.correct>=0&&quiz.correct<options.length;
   if(!quizValid)criticalIssues.push(id+':invalid-quiz');
   const sections=Array.isArray(lesson.sections)?lesson.sections:[];
   if(!sections.length||!sections.every(s=>isObject(s)&&valid(s.heading)&&valid(s.body)))criticalIssues.push(id+':invalid-teaching');
   if(!valid(lesson.task))criticalIssues.push(id+':missing-practice');
   const refs=Array.isArray(lesson.sources)?lesson.sources:[];
   if(refs.some(ref=>!checkSource(ref)))criticalIssues.push(id+':unsafe-reference');
   const missing=[];
   if(sections.length<3||sections.some(s=>wordLength(s.body)<160))missing.push('deeper-sections');
   if(wordLength(lesson.example)<170)missing.push('worked-example');
   if(wordLength(lesson.task)<90)missing.push('applied-exercise');
   if(wordLength(quiz?.explanation)<50)missing.push('answer-rationale');
   if(refs.length===0)missing.push('further-reading-source');
   const guide=Array.isArray(lesson.practiceGuide)?lesson.practiceGuide:[];
   if(guide.length!==2||guide.some(line=>wordLength(line)<75))missing.push('structured-evidence-practice');
   lessons.push({id,courseId:course.id,title:valid(lesson.title)?lesson.title:id,stage:lesson.stage,
     teachingSections:sections.length,hasWorkedExample:wordLength(lesson.example)>=170,
     hasSource:refs.length>0,editorialNeeds:missing});
  }
 }
 const coverage=name=>lessons.filter(l=>!l.editorialNeeds.includes(name)).length;
 const sourceSet=new Set();
 for(const course of courses)for(const l of course?.lessons||[])for(const r of l?.sources||[])if(checkSource(r))sourceSet.add(r.url);
 return {
  schemaVersion:1,valid:criticalIssues.length===0,criticalIssues,subjects,lessons,
  totals:{subjects:subjects.length,lessons:lessons.length,
   threeSectionDepth:coverage('deeper-sections'),workedExamples:coverage('worked-example'),
   structuredEvidencePractice:coverage('structured-evidence-practice'),
   appliedExercises:coverage('applied-exercise'),answerRationales:coverage('answer-rationale'),
   furtherReading:coverage('further-reading-source'),uniqueSourceURLs:sourceSet.size,
   lessonsWithEditorialFlags:lessons.filter(l=>l.editorialNeeds.length).length},
  limitations:['Automated checks cannot verify whether sources substantively support claims.',
   'Human specialist editorial signoff remains required before completing Advanced Curriculum.',
   'Lesson completion, decision drills and question counts are not evidence of professional competence.']
 };
}
