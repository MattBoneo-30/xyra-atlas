/** Accessible, purely local visual overview of the Atlas curriculum.
 * Connections are suggested learning relationships, NOT prerequisites. */
const ORDER=['psychology','thinking','communication','relationships','laws','digital','business','savings','time','career','negotiation','languages','science','shadow'];
const SLOTS=[
 [17,16],[50,12],[83,16],
 [12,39],[37,36],[63,36],[88,39],
 [12,64],[37,63],[63,63],[88,64],
 [17,86],[50,88],[83,86]
];
const RELATED=[
 ['psychology','thinking'],['psychology','relationships'],['thinking','digital'],
 ['communication','relationships'],['communication','negotiation'],['laws','digital'],
 ['laws','business'],['business','savings'],['business','career'],['savings','time'],
 ['time','career'],['career','languages'],['science','thinking'],['negotiation','shadow']
];
export function buildKnowledgeMap(courses, completed=[]) {
  const safeCourses=Array.isArray(courses)?courses.filter(x=>x && typeof x.id==='string'):[];
  const completedSet=new Set(Array.isArray(completed)?completed:[]);
  const ordered=[...safeCourses].sort((a,b)=>{
    const ai=ORDER.indexOf(a.id),bi=ORDER.indexOf(b.id);
    return (ai<0?ORDER.length:ai)-(bi<0?ORDER.length:bi);
  });
  const nodes=ordered.map((c,i)=>{
    const [x,y]=SLOTS[i]||[15+(i%4)*23,20+Math.floor(i/4)*17];
    const lessons=Array.isArray(c.lessons)?c.lessons:[];
    const done=lessons.filter(l=>completedSet.has(c.id+':'+l.id)).length;
    const nextLesson=lessons.find(l=>!completedSet.has(c.id+':'+l.id));
    return {id:c.id,title:c.title,art:c.art,tag:c.tag||'',x,y,done,total:lessons.length,percent:lessons.length?Math.round(done/lessons.length*100):0,dark:!!c.dark,
      nextLesson:nextLesson?{id:nextLesson.id,title:nextLesson.title,stage:nextLesson.stage}:null};
  });
  const byId=new Map(nodes.map(n=>[n.id,n]));
  const links=RELATED.filter(([a,b])=>byId.has(a)&&byId.has(b)).map(([a,b])=>({from:a,to:b,x1:byId.get(a).x,y1:byId.get(a).y,x2:byId.get(b).x,y2:byId.get(b).y}));
  return {nodes,links,completed: nodes.reduce((sum,n)=>sum+n.done,0),total:nodes.reduce((sum,n)=>sum+n.total,0)};
}

/** Short, educational bridges between genuinely linked subjects. None are prerequisites.
 * Suggestions use only local progress, and exclude the age-gated library.
 */
const LINK_STORIES=Object.freeze({
 'psychology:thinking':'Separate what you feel or infer from what the available evidence actually shows.',
 'psychology:relationships':'Turn awareness of your reactions into thoughtful requests, listening and boundaries.',
 'thinking:digital':'Apply evidence checks to online claims, suspicious links and security choices.',
 'communication:relationships':'Practice asking, listening and repairing disagreements without guessing intent.',
 'communication:negotiation':'Use clear questions and reflective listening before comparing terms and trade-offs.',
 'laws:digital':'Connect privacy rights with practical choices about accounts and personal information.',
 'laws:business':'Explore how legal obligations can affect contracts, offers and customer promises.',
 'business:savings':'Compare the costs of a plan with the cash reserves needed when conditions change.',
 'business:career':'Translate project decisions into concrete evidence of skills and useful work.',
 'savings:time':'Build plans that account for both limited money and the hours needed to sustain them.',
 'time:career':'Balance meaningful practice and a portfolio with available time, rest and energy.',
 'career:languages':'Practice explaining your experience and asking useful questions across languages.',
 'science:thinking':'Examine what an experiment measures before concluding why an outcome occurred.',
 'negotiation:shadow':'Recognize manipulative pressure and protect your choice to disengage.'
});
const STARTER_TRAILS=Object.freeze(['psychology:thinking','business:savings','communication:relationships']);
export function suggestKnowledgeTrails(map,limit=3){
 if(!map||!Array.isArray(map.nodes))return [];
 const count=Number.isInteger(limit)?Math.max(0,Math.min(limit,6)):3;
 if(!count)return [];
 const byId=new Map(map.nodes.filter(n=>n&&typeof n.id==='string').map(n=>[n.id,n]));
 const hasProgress=map.nodes.some(n=>!n.dark&&n.done>0);
 const candidates=[];
 for(const [a,b] of RELATED){
  const left=byId.get(a),right=byId.get(b),key=a+':'+b;
  if(!left||!right||left.dark||right.dark)continue;
  if(!left.nextLesson&&!right.nextLesson)continue;
  let source=left,target=right;
  if(right.done>0&&left.done===0){source=right;target=left;}
  else if(left.done>0&&right.done===0){source=left;target=right;}
  else if(right.done>left.done&&left.nextLesson){source=right;target=left;}
  else if(!right.nextLesson&&left.nextLesson){source=right;target=left;}
  if(!target.nextLesson)continue;
  const starter=STARTER_TRAILS.indexOf(key);
  const weight=hasProgress
   ?(source.done>0?(target.done===0?200:100)+Math.min(source.done,30):10)
   :(starter>=0?100-starter*20:5);
  candidates.push({from:source,to:target,reason:LINK_STORIES[key],score:weight});
 }
 candidates.sort((a,b)=>b.score-a.score||a.to.title.localeCompare(b.to.title));
 const chosen=[],used=new Set();
 for(const candidate of candidates){
  if(used.has(candidate.to.id))continue;
  chosen.push(candidate);used.add(candidate.to.id);
  if(chosen.length>=count)break;
 }
 return chosen;
}
