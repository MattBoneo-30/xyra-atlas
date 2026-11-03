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
    return {id:c.id,title:c.title,art:c.art,tag:c.tag||'',x,y,done,total:lessons.length,percent:lessons.length?Math.round(done/lessons.length*100):0,dark:!!c.dark};
  });
  const byId=new Map(nodes.map(n=>[n.id,n]));
  const links=RELATED.filter(([a,b])=>byId.has(a)&&byId.has(b)).map(([a,b])=>({from:a,to:b,x1:byId.get(a).x,y1:byId.get(a).y,x2:byId.get(b).x,y2:byId.get(b).y}));
  return {nodes,links,completed: nodes.reduce((sum,n)=>sum+n.done,0),total:nodes.reduce((sum,n)=>sum+n.total,0)};
}
