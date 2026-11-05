/** Device-only privacy inventory and selective progress clearing.
 * No personal values leave local storage. Avoid sharing personal notes in reports.
 */
export const DATA_GROUPS=Object.freeze([
 {id:'study',label:'Learning records',description:'Completed lessons, quiz attempts, reviews, exams, study paths and activity history.',
  fields:['completed','answers','reviews','mistakes','exam','examHistory','learningPath','capstoneChecks','clinicAnswers','dailyVisits','lastOpened']},
 {id:'writing',label:'Private notes & study cards',description:'Field Notebook writing and custom Study Card Workshop questions and answers.',
  fields:['fieldNotes','personalCards']},
 {id:'language',label:'Language practice',description:'Learned phrases, recall schedules, sprint checks and both kinds of language challenges.',
  fields:['languageDays','japaneseFoundationDone','japaneseKanaReviews','phrases','phraseReviews','languageChallenge','languageChallengeHistory','conversationQuest','conversationQuestHistory']},
 {id:'practice',label:'Practice experiments',description:'Scenario Lab choices, branching Case Files and Practice Studio inputs.',
  fields:['studio','scenarios','casebook']},
 {id:'saved',label:'Saved references',description:'Favorite subject worlds and bookmarked lessons.',
  fields:['favorites','bookmarks']}
].map(group=>Object.freeze({...group,fields:Object.freeze([...group.fields])})));
const known=new Map(DATA_GROUPS.map(group=>[group.id,group]));
const count=value=>Array.isArray(value)?value.length:value&&typeof value==='object'?Object.keys(value).length:0;
export function describeDataGroups(state){
 const data=state&&typeof state==='object'&&!Array.isArray(state)?state:{};
 return DATA_GROUPS.map(group=>{
  let records=0;
  for(const key of group.fields){
   const value=data[key];
   if(key==='studio')continue; // A default studio object exists even when unused.
   if(key==='learningPath'||key==='exam'||key==='languageChallenge'||key==='conversationQuest'||key==='lastOpened')records+=value?1:0;
   else if(key==='phrases'||key==='phraseReviews'){
    records+=Object.values(value&&typeof value==='object'&&!Array.isArray(value)?value:{}).reduce((n,x)=>n+count(x),0);
   }else records+=count(value);
  }
  return {...group,records};
 });
}
export function clearDataGroup(state,defaults,groupId){
 const group=known.get(groupId);
 if(!group||!state||typeof state!=='object'||Array.isArray(state)||!defaults||typeof defaults!=='object'||Array.isArray(defaults))return null;
 const clean={...state};
 for(const key of group.fields){
  if(!Object.hasOwn(defaults,key))return null;
  const value=defaults[key];
  clean[key]=Array.isArray(value)?[...value]:value&&typeof value==='object'?{...value}:value;
 }
 return clean;
}
