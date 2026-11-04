/** Original stage-world atlas: 14 subjects × three narrative levels.
 * Every entry refers only to local, build-generated SVG. No private learner data.
 */
const SCENES=Object.freeze({
 psychology:['The Reflection Gallery','Thought and emotion reflected in a quiet, lantern-lit hall','A moonlit gallery of mirrors and floating memory lights, for learning about thought and behavior','mind'],
 laws:['The Civic Observatory','Rights and responsibilities beneath the city lights','A grand illuminated hall with balanced justice scales and architectural columns','law'],
 business:['The Makers’ Atelier','A workshop where ideas meet real costs','A candlelit artisan workshop, plans and measured materials beneath a vaulted observatory','business'],
 savings:['The Golden Treasury','The quiet power of planning for uncertainty','A glass savings jar with warm golden coins inside a softly lit archive chamber','savings'],
 time:['The Clockwork Conservatory','Make room for focus, buffers and rest','An astronomical clock floating over a calm garden and delicate brass cogs','time'],
 languages:['The Lantern Teahouse','Every language opens a new doorway','Two ornate conversation scrolls and a glowing lantern in a quiet teahouse','language'],
 communication:['The Listening Bridge','A place where ideas can meet','A graceful bridge connecting two glowing conversation lanterns across reflective water','communication'],
 thinking:['The Evidence Prism','Look again before deciding','A crystal prism splitting several beams of light across pages of evidence','thinking'],
 digital:['The Security Sanctuary','Careful choices in connected worlds','A polished protective lock and glowing circuit paths within an amethyst hall','digital'],
 career:['The Portfolio Forge','Build a story backed by real work','An illuminated project portfolio, planning diagrams and a warm studio lamp','career'],
 science:['The Glasshouse Observatory','Curiosity guided by experiment','An astronomical telescope and carefully measured glass flask under a violet moon','science'],
 relationships:['The Boundary Garden','Connection grows alongside respect','Two gentle lanterns among flowering branches and a welcoming garden path','relationship'],
 negotiation:['The Fair Exchange Pavilion','See the whole agreement','A pair of ornate weighing scales and two offer scrolls beneath a pavilion','negotiation'],
 shadow:['The Protective Lantern','Understand pressure without becoming its author','A protective golden lantern in a safe refuge behind a quiet open gate','shadow']
});
const LEVELS=Object.freeze({
 Beginner:{title:'First Light',caption:'Build a steady foundation, one clear idea at a time.',tone:'dawn'},
 Intermediate:{title:'The Crossing',caption:'Practice the idea in context and notice what changes.',tone:'dusk'},
 Advanced:{title:'The Observatory',caption:'Examine assumptions, uncertainty and consequences.',tone:'night'}
});
const entries={};
for(const [id,[place,tagline,description,motif]] of Object.entries(SCENES))
 for(const [stage,level] of Object.entries(LEVELS)){
  const file='world-'+id+'-'+stage.toLowerCase()+'.svg';
  entries[id+':'+stage]=Object.freeze({
   courseId:id,stage,place,motif,tone:level.tone,file,
   src:'/assets/'+file,title:stage==='Advanced'?place:level.title+' · '+place,
   caption:tagline+'. '+level.caption,
   alt:description+'. '+stage+' learning scene with atmospheric purple-and-gold illustration.'
  });
 }
export const STAGE_ART=Object.freeze(entries);
export const STAGE_ART_COUNT=Object.keys(entries).length;
export function getStageArt(courseId,stage){
 const key=String(courseId)+':'+String(stage);
 return Object.hasOwn(STAGE_ART,key)?STAGE_ART[key]:null;
}
