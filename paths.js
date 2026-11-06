/** Offline seven-session learning paths built entirely from the bundled curriculum. */
export const PATH_GOALS = Object.freeze([
  { id:'life', title:'Life Essentials', description:'Understand decisions, rights, money, and everyday communication.', courses:['psychology','savings','laws','time','communication','thinking','digital','relationships'] },
  { id:'money', title:'Money & Business', description:'Practice money decisions and turn useful ideas into responsible ventures.', courses:['savings','business','thinking','laws','digital','negotiation'] },
  { id:'career', title:'Career & Confidence', description:'Strengthen career skills, communication, and constructive negotiation.', courses:['career','communication','time','negotiation','business','digital'] },
  { id:'mind', title:'Mind & Relationships', description:'Learn emotional skills, thoughtful habits, and healthier connections.', courses:['psychology','relationships','thinking','communication','time'] },
  { id:'world', title:'Curious Explorer', description:'Explore languages, science, digital literacy, and civic life.', courses:['languages','science','digital','thinking','laws'] }
]);
export const PATH_BUDGETS = Object.freeze([10, 20, 30, 45]);
const validGoal = goal => PATH_GOALS.some(item => item.id === goal);
const validDate = date => typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date + 'T12:00:00Z')) && new Date(date + 'T12:00:00Z').toISOString().slice(0,10) === date;
const lessonKey = (courseId,lessonId) => `${courseId}:${lessonId}`;
const availableLessons = courses => new Map(courses.filter(c=>!c.dark).map(c=>[c.id,c.lessons]));

/** A plan is a snapshot: completed lessons change its progress, not its identity. */
export function createLearningPath(courses, goal='life', minutes=20, completed=[], created='2026-01-01') {
  if (!validGoal(goal) || !PATH_BUDGETS.includes(minutes) || !validDate(created) || !Array.isArray(courses)) return null;
  const known = new Set(Array.isArray(completed)?completed.filter(x=>typeof x==='string'):[]);
  const goals = PATH_GOALS.find(x=>x.id===goal).courses;
  const available = availableLessons(courses);
  const queues = goals.map(id=>({id, lessons:(available.get(id)||[]).filter(l=>!known.has(lessonKey(id,l.id)))}));
  const days=[];
  for(let day=0;day<7;day++) {
    const items=[];
    let remaining=minutes;
    // Prioritize a different subject each day, without skipping prerequisites within a subject.
    for(let step=0;step<2;step++) {
      let pick=null;
      for(let offset=0;offset<queues.length;offset++) {
        const slot=(day+step+offset)%queues.length;
        const q=queues[slot];
        const candidate=q.lessons[0];
        if(!candidate)continue;
        const duration=Math.max(1,Math.min(90,Number(candidate.minutes)||15));
        if(duration<=remaining){pick={q,duration};break;}
      }
      if(!pick)break;
      const item=pick.q.lessons.shift();
      items.push({courseId:pick.q.id,lessonId:item.id,minutes:pick.duration});
      remaining-=pick.duration;
    }
    days.push(items);
  }
  if(!days.some(day=>day.length))return null;
  return {goal,minutes,created,days};
}

/** Validate imports before rendering or persisting untrusted identifiers. */
export function normalizeLearningPath(input,courses) {
  if(!input || typeof input !== 'object' || Array.isArray(input) || !validGoal(input.goal) || !PATH_BUDGETS.includes(input.minutes) || !validDate(input.created) || !Array.isArray(input.days) || input.days.length!==7 || !Array.isArray(courses))return null;
  const available=availableLessons(courses);
  const seen=new Set();
  const days=[];
  for(const day of input.days) {
    if(!Array.isArray(day)||day.length>2)return null;
    const clean=[];
    for(const item of day) {
      if(!item || typeof item!=='object' || typeof item.courseId!=='string' || typeof item.lessonId!=='string')return null;
      if(!PATH_GOALS.find(g=>g.id===input.goal).courses.includes(item.courseId))return null;
      const lesson=available.get(item.courseId)?.find(l=>l.id===item.lessonId);
      const key=lessonKey(item.courseId,item.lessonId);
      if(!lesson||seen.has(key))return null;
      seen.add(key);
      clean.push({courseId:item.courseId,lessonId:item.lessonId,minutes:Math.max(1,Math.min(90,Number(lesson.minutes)||15))});
    }
    // Imported plans are untrusted: use actual lesson durations, never the
    // user's claimed item.minutes, and reject impossible daily study budgets.
    if(clean.reduce((total,item)=>total+item.minutes,0)>input.minutes)return null;
    days.push(clean);
  }
  if(!days.some(day=>day.length))return null;
  return {goal:input.goal,minutes:input.minutes,created:input.created,days};
}
export function pathProgress(plan, completed=[]) {
  if(!plan)return {done:0,total:0,percent:0,next:null};
  const set=new Set(Array.isArray(completed)?completed:[]);
  const items=plan.days.flat();
  const done=items.filter(x=>set.has(lessonKey(x.courseId,x.lessonId))).length;
  return {done,total:items.length,percent:items.length?Math.round(100*done/items.length):0,next:items.find(x=>!set.has(lessonKey(x.courseId,x.lessonId)))||null};
}
