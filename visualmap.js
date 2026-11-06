/** Xyra Atlas visual chapter maps; derived from bundled lessons, always offline. */
function summarize(text,limit=142){
 const value=String(text??'').replace(/\s+/g,' ').trim();
 if(value.length<=limit)return value;
 const boundary=value.slice(0,limit+1);
 const last=boundary.lastIndexOf(' ');
 return (last>limit*.5?boundary.slice(0,last):value.slice(0,limit)).trimEnd()+'…';
}
export function createChapterMap(course,lesson){
 if(!course||!lesson||!Array.isArray(lesson.sections))return null;
 const topics=lesson.sections.filter(s=>s && typeof s.heading==='string' && typeof s.body==='string');
 const steps=topics.map((s,i)=>({
  id:'lesson-section-'+i,
  index:i,
  heading:s.heading.trim(),
  preview:summarize(s.body,135),
  label:String(i+1).padStart(2,'0')
 }));
 const deepSteps=(Array.isArray(lesson.deepSections)?lesson.deepSections:[])
  .filter(section=>section&&typeof section.heading==='string'&&typeof section.body==='string')
  .map((section,i)=>({
   id:'deep-study-section-'+i,
   index:i,
   heading:section.heading.trim(),
   preview:summarize(section.body,135),
   label:String(i+1).padStart(2,'0')
  }));
 const astronomySteps=(Array.isArray(lesson.astronomySections)?lesson.astronomySections:[])
  .filter(section=>section&&typeof section.heading==='string'&&typeof section.body==='string')
  .map((section,i)=>({
   id:'astronomy-section-'+i,index:i,heading:section.heading.trim(),
   preview:summarize(section.body,135),label:String(i+1).padStart(2,'0')
  }));
 const transfer=lesson.transferLab&&typeof lesson.transferLab.title==='string'?
  {id:'transfer-lab',heading:lesson.transferLab.title,preview:summarize(lesson.transferLab.scenario,135)}:null;
 const inquiry=lesson.evidenceInquiry&&typeof lesson.evidenceInquiry.title==='string'?
  {id:'evidence-inquiry',heading:lesson.evidenceInquiry.title,preview:summarize(lesson.evidenceInquiry.scenario,135)}:null;
 return {title:lesson.title||'',course:course.title||'',steps,deepSteps,astronomySteps,transfer,inquiry,
  practice:typeof lesson.task==='string'&&lesson.task.trim()?{id:'lesson-practice',heading:'Apply what you learned',preview:summarize(lesson.task,140)}:null};
}
