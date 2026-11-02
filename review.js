/**
 * Offline spaced review scheduling for Xyra Atlas.
 * Learning records are stored in the existing local backup.
 */
export const REVIEW_DAYS = Object.freeze([1, 3, 7, 14, 30, 60]);
const DAY_MS=86400000;
export function normalizeReviews(raw) {
  if(!raw||typeof raw!=='object'||Array.isArray(raw)) return {};
  const clean={};
  for(const [id,r] of Object.entries(raw)) {
    if(!/^[a-z\d-]+:[a-z\d-]+$/.test(id)||!r||typeof r!=='object'||Array.isArray(r)) continue;
    if(!Number.isInteger(r.step)||r.step < -1||r.step >= REVIEW_DAYS.length) continue;
    if(typeof r.dueAt!=='string'||!Number.isFinite(Date.parse(r.dueAt))) continue;
    const attempts=Number.isInteger(r.attempts)?Math.max(0,Math.min(r.attempts,10000)):0;
    const successes=Number.isInteger(r.successes)?Math.max(0,Math.min(r.successes,attempts)):0;
    clean[id]={step:r.step,dueAt:new Date(r.dueAt).toISOString(),attempts,successes};
  }
  return clean;
}
export function makeReviewCards(courses) {
  return courses.flatMap(c=>c.lessons.map(l=>({
    id:c.id+':'+l.id,courseId:c.id,lessonId:l.id,courseTitle:c.title,title:l.title,
    question:l.quiz.question,answer:l.quiz.options[l.quiz.correct],
    explanation:l.quiz.explanation,dark:Boolean(c.dark)
  })));
}
export function dueReviewCards(cards, completed, reviews, now=Date.now(), includeDark=false) {
  const learned=new Set(completed);
  return cards.filter(c=>learned.has(c.id)&&(includeDark||!c.dark))
    .filter(c=>!reviews[c.id]||Date.parse(reviews[c.id].dueAt)<=now)
    .sort((a,b)=>(reviews[a.id]?Date.parse(reviews[a.id].dueAt):0)-(reviews[b.id]?Date.parse(reviews[b.id].dueAt):0)||a.id.localeCompare(b.id));
}
export function recordReview(previous, outcome, now=Date.now()) {
  if(!['again','remembered'].includes(outcome)||!Number.isFinite(now)) throw new Error('Invalid review result');
  const step=outcome==='again'?-1:Math.min((previous?.step??-1)+1,REVIEW_DAYS.length-1);
  return {
    step,dueAt:new Date(now+(outcome==='again'?600000:REVIEW_DAYS[step]*DAY_MS)).toISOString(),
    attempts:(previous?.attempts??0)+1,
    successes:(previous?.successes??0)+(outcome==='remembered'?1:0)
  };
}
