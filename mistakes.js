/** Local-only practice queue, not a proficiency estimate. */
function quizLookup(courses){
 const out=new Map();
 for(const course of Array.isArray(courses)?courses:[])for(const lesson of course.lessons||[])
  if(Array.isArray(lesson.quiz?.options))out.set(course.id+':'+lesson.id,{course,lesson});
 return out;
}
export function normalizeMistakes(raw,courses){
 const out={};if(!raw||typeof raw!=='object'||Array.isArray(raw))return out;
 const known=quizLookup(courses);
 for(const [key,row] of Object.entries(raw).slice(0,300)){
  const quiz=known.get(key)?.lesson.quiz;
  if(!quiz||!row||typeof row!=='object'||Array.isArray(row))continue;
  const {wrong,lastChoice,lastWrongAt}=row;
  if(!Number.isInteger(wrong)||wrong<1||wrong>10000||!Number.isInteger(lastChoice)||lastChoice<0||
    lastChoice>=quiz.options.length||lastChoice===quiz.correct||typeof lastWrongAt!=='string'||
    !/^\d{4}-\d\d-\d\dT/.test(lastWrongAt)||!Number.isFinite(Date.parse(lastWrongAt)))continue;
  Object.defineProperty(out,key,{value:{wrong,lastChoice,lastWrongAt:new Date(lastWrongAt).toISOString()},enumerable:true,writable:true,configurable:true});
 }
 return out;
}
export function recordQuizAttempt(raw,courses,key,choice,now=Date.now()){
 const out=normalizeMistakes(raw,courses),row=quizLookup(courses).get(key);
 if(!row||!Number.isInteger(choice)||choice<0||choice>=row.lesson.quiz.options.length||!Number.isFinite(now))return out;
 if(choice===row.lesson.quiz.correct){delete out[key];return out;}
 Object.defineProperty(out,key,{value:{wrong:Math.min(10000,(out[key]?.wrong||0)+1),lastChoice:choice,lastWrongAt:new Date(now).toISOString()},enumerable:true,writable:true,configurable:true});
 return out;
}
export function buildMistakeQueue(courses,raw,{includeMature=false}={}){
 const data=normalizeMistakes(raw,courses),items=[];
 for(const c of Array.isArray(courses)?courses:[]){
  if(c.dark&&!includeMature)continue;
  for(const l of c.lessons||[]){
   const id=c.id+':'+l.id,m=data[id];
   if(m)items.push({id,courseId:c.id,lessonId:l.id,courseTitle:c.title,title:l.title,question:l.quiz.question,
      options:l.quiz.options,correct:l.quiz.correct,explanation:l.quiz.explanation,wrong:m.wrong,lastWrongAt:m.lastWrongAt});
  }
 }
 return items.sort((a,b)=>b.lastWrongAt.localeCompare(a.lastWrongAt)||b.wrong-a.wrong||a.id.localeCompare(b.id));
}
