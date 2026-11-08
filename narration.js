/** Browser speech content preparation. No audio is stored or uploaded by Atlas. */
function chunks(text,maxLength) {
 const value=String(text??'').replace(/\s+/g,' ').trim();if(!value)return [];
 const words=value.split(' '),out=[];let current='';
 for(const word of words) {
  if(!word)continue;
  if(word.length>maxLength) {
   if(current){out.push(current);current='';}
   for(let i=0;i<word.length;i+=maxLength)out.push(word.slice(i,i+maxLength));
   continue;
  }
  if(current && current.length+word.length+1>maxLength){out.push(current);current='';}
  current+=(current?' ':'')+word;
 }
 if(current)out.push(current);
 return out;
}
export function buildLessonNarration(course,lesson,{maxLength=175}={}){
 if(!course||!lesson||!Array.isArray(lesson.sections))return [];
 const max=Number.isInteger(maxLength)?Math.max(80,Math.min(240,maxLength)):175;
 const paragraphs=[lesson.title,lesson.intro];
 // Full conceptual teaching comes first in both visual and spoken reading modes.
 for(const section of lesson.deepSections||[])if(section)paragraphs.push(section.heading,section.body);
 if(lesson.specialistConceptStudy){
  const study=lesson.specialistConceptStudy;
  paragraphs.push('Specialist continuation: '+study.title);
  for(const section of study.sections)paragraphs.push(section.heading,section.body);
  paragraphs.push('Applied specialist case.',study.case,'Independent challenge.',study.task,
   'Worked comparison after your attempt.',study.model,
   'Specialist self-review checklist.',...study.rubric,
   'Independent specialist review is pending.');
 }
 for(const section of lesson.sections) if(section) paragraphs.push(section.heading,section.body);
 for(const section of lesson.astronomySections||[])if(section)paragraphs.push(section.heading,section.body);
 if(lesson.example)paragraphs.push('Worked example.',lesson.example);
 if(lesson.deepExample)paragraphs.push('Detailed case analysis.',lesson.deepExample);
 if(lesson.deepRubric?.length)paragraphs.push('Self-review criteria.',...lesson.deepRubric);
 if(lesson.task)paragraphs.push('Practice exercise.',lesson.task);
 if(lesson.deepTask)paragraphs.push('Independent application.',lesson.deepTask);
 if(lesson.deepModelAnswer)paragraphs.push('Model response for comparison after you attempt the exercise.',lesson.deepModelAnswer);
 if(lesson.practicalStudio){
  const studio=lesson.practicalStudio;
  paragraphs.push('Advanced practical studio: '+studio.title,'Starting brief.',studio.situation);
  for(const [i,round] of studio.rounds.entries()){
    paragraphs.push('Studio round '+(i+1)+': '+round.title,
      'Concept to apply.',round.focus,'Evidence available.',round.evidence,
      'Your independent assignment.',round.assignment,'Worked comparison.',round.model);
  }
  paragraphs.push('Studio self-review checklist.',...studio.rubric);
 }
 if(lesson.beginnerWorkshop){
  const lab=lesson.beginnerWorkshop;
  paragraphs.push('Guided beginner workshop: '+lab.title,'Learning objective.',lab.goal,'Starting case.',lab.case);
  for(const [i,step] of lab.steps.entries())
   paragraphs.push('Workshop step '+(i+1)+': '+step.name,'Independent activity.',step.instruction,
    'Assumption check.',step.diagnostic,'Worked comparison.',step.model);
  paragraphs.push('Independent quality checklist.',...lab.rubric,lab.limits);
 }
 if(lesson.foundationDiagnostic){
  const check=lesson.foundationDiagnostic;
  paragraphs.push('Foundation active recall: '+check.title,check.intro);
  for(const [i,q] of check.questions.entries()){
   paragraphs.push('Question '+(i+1)+'.',q.prompt,
    'Possible responses.',...q.options,
    'Reasoning after your attempt.',q.explanation,
    'Transfer challenge.',q.transfer);
  }
 }
 if(lesson.transferLab){
  const lab=lesson.transferLab;
  paragraphs.push('Transfer lab: '+lab.title,'Case to investigate.',lab.scenario,
   'Independent challenge.',lab.task,'Worked reasoning.',lab.worked,
   'Counterexample.',lab.counterexample,'Self-review checklist.',...lab.rubric,lab.caveat);
 }
 if(lesson.responseSimulation){
  const sim=lesson.responseSimulation;
  paragraphs.push('Interactive decision simulation: '+sim.title,'Starting scenario.',sim.situation);
  for(const [index,round] of sim.rounds.entries()){
   paragraphs.push('Decision '+(index+1)+': '+round.title,round.prompt);
   for(const choice of round.choices)paragraphs.push('Option. '+choice[0], 'Consequence. '+choice[1]);
  }
  paragraphs.push('Independent synthesis.',sim.synthesis,'Illustrative model.',sim.model,
   'Self-review criteria.',...sim.rubric,sim.caveat);
 }
 if(lesson.decisionRevision){
  const decision=lesson.decisionRevision;
  paragraphs.push('Evidence-reversal lab: '+decision.title,'Initial case.',decision.case,
   'First judgment.',decision.firstTask,'New evidence.',decision.reveal,
   'Revised interpretation.',decision.revision,'Follow-up exercise.',decision.follow,
   'Self-review rubric.',...decision.rubric,decision.caveat);
 }
 if(lesson.crossSubjectMission){
  const bridge=lesson.crossSubjectMission;
  paragraphs.push('Cross-subject mission: '+bridge.title,'Case to solve.',bridge.scene,
   'How the subjects connect.',bridge.bridge,'Independent challenge.',bridge.challenge,
   'Worked interdisciplinary response.',bridge.model,
   'Self-review checklist.',...bridge.rubric);
 }
 if(lesson.evidenceInquiry){
  const inquiry=lesson.evidenceInquiry;
  paragraphs.push('Advanced evidence inquiry: '+inquiry.title,'Case brief.',inquiry.scenario,
   'Evidence exhibits.',...inquiry.exhibits.flatMap(exhibit=>[exhibit.label,exhibit.detail]),
   'Independent investigation.',inquiry.challenge,
   'One reasoned interpretation.',inquiry.reasoning,
   'Model response.',inquiry.model,'Counterexample.',inquiry.countercase,
   'Evidence-quality self-check.',...inquiry.rubric,inquiry.limits);
 }
 return paragraphs.flatMap(text=>chunks(text,max)).filter(Boolean).slice(0,200);
}
