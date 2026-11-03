/** Self-contained offline practice exams. Exam answers never mark lessons complete. */
export const EXAM_SIZES=Object.freeze([5,10,20]);
export const EXAM_STAGES=Object.freeze(['all','Beginner','Intermediate','Advanced']);

export function examPool(courses,{courseId='all',stage='all'}={}){
 if(!Array.isArray(courses)||!EXAM_STAGES.includes(stage))return [];
 return courses.filter(c=>c&&!c.dark&&(courseId==='all'||c.id===courseId))
  .flatMap(c=>(Array.isArray(c.lessons)?c.lessons:[]).filter(l=>
   l&&(stage==='all'||l.stage===stage)&&typeof l.id==='string'&&l.quiz&&typeof l.quiz.question==='string'&&
   Array.isArray(l.quiz.options)&&l.quiz.options.length>=2&&l.quiz.options.length<=8&&
   l.quiz.options.every(o=>typeof o==='string')&&Number.isInteger(l.quiz.correct)&&
   l.quiz.correct>=0&&l.quiz.correct<l.quiz.options.length)
   .map(l=>({id:c.id+':'+l.id,courseId:c.id,lessonId:l.id,courseTitle:c.title,
    title:l.title,question:l.quiz.question,options:l.quiz.options,
    correct:l.quiz.correct,explanation:l.quiz.explanation||''})));
}
function shuffled(items,seed){
 const out=[...items];let state=seed>>>0;
 for(let i=out.length-1;i>0;i--){
  state=(Math.imul(state,1664525)+1013904223)>>>0;
  const j=state%(i+1);[out[i],out[j]]=[out[j],out[i]];
 }
 return out;
}
export function createExam(courses,{size=10,courseId='all',stage='all',seed=Date.now()}={}){
 const pool=examPool(courses,{courseId,stage});
 if(!pool.length)return null;
 const count=EXAM_SIZES.includes(size)?size:10;
 return {version:1,ids:shuffled(pool.map(q=>q.id),Number(seed)||0).slice(0,count),
  responses:{},position:0,startedAt:Date.now()};
}
export function normalizeExam(input,courses){
 if(!input||typeof input!=='object'||Array.isArray(input)||input.version!==1||
  !Array.isArray(input.ids)||input.ids.length===0||input.ids.length>20||
  !Number.isInteger(input.position)||input.position<0||input.position>input.ids.length||
  !input.responses||typeof input.responses!=='object'||Array.isArray(input.responses))return null;
 const pool=new Map(examPool(courses).map(q=>[q.id,q]));
 if(new Set(input.ids).size!==input.ids.length||
  input.ids.some(id=>typeof id!=='string'||!pool.has(id)))return null;
 const responses={};
 for(const [id,value] of Object.entries(input.responses)){
  const q=pool.get(id);
  if(!input.ids.includes(id)||!q||!Number.isInteger(value)||value<0||value>=q.options.length)return null;
  responses[id]=value;
 }
 if(input.ids.slice(0,input.position).some(id=>!Object.hasOwn(responses,id))||
  (input.position===input.ids.length&&input.ids.some(id=>!Object.hasOwn(responses,id))))return null;
 return {version:1,ids:[...input.ids],responses,position:input.position,
  startedAt:Number.isFinite(input.startedAt)&&input.startedAt>0?input.startedAt:Date.now()};
}
export function currentExamQuestion(exam,courses){
 const session=normalizeExam(exam,courses);
 if(!session||session.position===session.ids.length)return null;
 return examPool(courses).find(q=>q.id===session.ids[session.position])||null;
}
export function answerExam(exam,choice,courses){
 const session=normalizeExam(exam,courses),question=currentExamQuestion(session,courses);
 if(!session||!question||Object.hasOwn(session.responses,question.id)||
  !Number.isInteger(choice)||choice<0||choice>=question.options.length)return session;
 return {...session,responses:{...session.responses,[question.id]:choice}};
}
export function advanceExam(exam,courses){
 const session=normalizeExam(exam,courses);
 if(!session||session.position>=session.ids.length||
  !Object.hasOwn(session.responses,session.ids[session.position]))return session;
 return {...session,position:session.position+1};
}
export function examResults(exam,courses){
 const session=normalizeExam(exam,courses);
 if(!session)return null;
 const pool=new Map(examPool(courses).map(q=>[q.id,q]));
 const entries=session.ids.map(id=>{
  const question=pool.get(id),selected=session.responses[id];
  return {...question,selected,answered:Object.hasOwn(session.responses,id),
   correctAnswer:question.options[question.correct],isCorrect:selected===question.correct};
 });
 return {done:session.position===session.ids.length,correct:entries.filter(q=>q.answered&&q.isCorrect).length,
  answered:entries.filter(q=>q.answered).length,total:entries.length,entries};
}
