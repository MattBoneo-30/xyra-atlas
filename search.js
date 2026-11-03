/** Offline cross-library search. Does not transmit a learner's query anywhere. */
export const SEARCH_KINDS=Object.freeze([
  {id:'all',label:'Everything'}, {id:'course',label:'Subjects'},
  {id:'lesson',label:'Lessons'}, {id:'term',label:'Glossary'},
  {id:'scenario',label:'Scenarios'}
]);
export function normalizeSearchText(value) {
  return String(value??'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase().replace(/\s+/g,' ').trim();
}
export function buildSearchIndex(courses=[],glossary=[],scenarios=[]) {
  const items=[];
  for(const c of courses){
    const hidden=Boolean(c.dark);
    items.push({key:'course:'+c.id,kind:'course',id:c.id,courseId:c.id,title:c.title,
      category:c.tag||'Subject',description:c.subtitle||'',context:c.title+' '+(c.tag||''),hidden,
      searchable:[c.title,c.subtitle,c.tag].filter(Boolean).join(' ')});
    for(const l of c.lessons||[]){
      const body=(l.sections||[]).map(s=>(s.heading||'')+' '+(s.body||'')).join(' ');
      items.push({key:'lesson:'+c.id+':'+l.id,kind:'lesson',id:l.id,courseId:c.id,title:l.title,
        category:c.title,description:l.intro||'',context:c.title+' '+(c.tag||''),hidden,
        searchable:[l.title,c.title,c.tag,l.intro,body,l.example,l.task,l.quiz?.question].filter(Boolean).join(' ')});
    }
  }
  for(const term of glossary){
    items.push({key:'term:'+term.id,kind:'term',id:term.id,courseId:term.courseId,title:term.term,
      category:term.category,description:term.definition,context:term.category||'',hidden:Boolean(term.adult),
      searchable:[term.term,term.category,term.definition,term.example].filter(Boolean).join(' ')});
  }
  for(const s of scenarios){
    items.push({key:'scenario:'+s.id,kind:'scenario',id:s.id,title:s.title,
      category:s.category,description:s.setup,context:s.category||'',hidden:Boolean(s.adult),
      searchable:[s.title,s.category,s.setup,s.question,s.takeaway].filter(Boolean).join(' ')});
  }
  return items.map(item=>({...item,normalizedTitle:normalizeSearchText(item.title),
    normalizedContext:normalizeSearchText(item.context),
    normalizedContent:normalizeSearchText(item.searchable)}));
}
export function searchAtlas(index,query,{kind='all',allowMature=false,limit=80}={}){
  const normalized=normalizeSearchText(query).slice(0,100);
  if(!normalized)return [];
  const words=normalized.split(' ').filter(Boolean).slice(0,8);
  if(!words.length)return [];
  const kinds=new Set(SEARCH_KINDS.map(k=>k.id));
  if(!kinds.has(kind))kind='all';
  const max=Number.isInteger(limit)?Math.max(0,Math.min(200,limit)):80;
  const scores=[];
  for(const item of index){
    if(item.hidden&&!allowMature)continue;
    if(kind!=='all'&&item.kind!==kind)continue;
    if(!words.every(word=>item.normalizedContent.includes(word)))continue;
    let score=0;
    if(item.normalizedTitle===normalized)score+=140;
    if(item.normalizedTitle.startsWith(normalized))score+=90;
    if(item.normalizedTitle.includes(normalized))score+=60;
    for(const word of words) {
      if(item.normalizedTitle.includes(word))score+=28;
      else if(item.normalizedContext.includes(word))score+=13;
      else score+=2;
    }
    if(item.kind==='lesson')score+=4;
    scores.push({...item,score});
  }
  scores.sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)||a.key.localeCompare(b.key));
  return scores.slice(0,max);
}
