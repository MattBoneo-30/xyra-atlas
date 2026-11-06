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
 for(const section of lesson.sections) if(section) paragraphs.push(section.heading,section.body);
 for(const section of lesson.astronomySections||[])if(section)paragraphs.push(section.heading,section.body);
 if(lesson.example)paragraphs.push('Worked example.',lesson.example);
 if(lesson.deepExample)paragraphs.push('Detailed case analysis.',lesson.deepExample);
 if(lesson.deepRubric?.length)paragraphs.push('Self-review criteria.',...lesson.deepRubric);
 if(lesson.task)paragraphs.push('Practice exercise.',lesson.task);
 if(lesson.deepTask)paragraphs.push('Independent application.',lesson.deepTask);
 if(lesson.deepModelAnswer)paragraphs.push('Model response for comparison after you attempt the exercise.',lesson.deepModelAnswer);
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
