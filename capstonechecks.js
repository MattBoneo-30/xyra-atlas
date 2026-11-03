/** Local-only self-assessment checks for the fourteen applied Capstone Labs.
 * Checking a criterion is a learner's reflection, never an independently graded result.
 * Notes, rubric checks, and quiz completion remain deliberately separate.
 */
export const CAPSTONE_CRITERIA_COUNT=3;
const validCourseChecks=courses=>new Map(
 (Array.isArray(courses)?courses:[]).flatMap(c=>
  (Array.isArray(c.lessons)?c.lessons:[])
   .filter(l=>l?.isCapstone===true&&Array.isArray(l.rubric)&&l.rubric.length===CAPSTONE_CRITERIA_COUNT)
   .map(l=>[c.id+':'+l.id,l.rubric.length])
 )
);
export function normalizeCapstoneChecks(raw,courses){
 const valid=validCourseChecks(courses),clean={};
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return clean;
 for(const [key,flags] of Object.entries(raw).slice(0,100)){
  if(!valid.has(key)||!Array.isArray(flags)||flags.length!==CAPSTONE_CRITERIA_COUNT||
   !flags.every(flag=>typeof flag==='boolean')||!flags.some(Boolean))continue;
  Object.defineProperty(clean,key,{value:[...flags],enumerable:true,writable:true,configurable:true});
 }
 return clean;
}
export function capstoneCheckProgress(raw,key,courses){
 if(!validCourseChecks(courses).has(key))return null;
 const clean=normalizeCapstoneChecks(raw,courses);
 const checked=clean[key]?[...clean[key]]:Array(CAPSTONE_CRITERIA_COUNT).fill(false);
 const count=checked.filter(Boolean).length;
 return {checked,count,total:CAPSTONE_CRITERIA_COUNT,reviewed:count===CAPSTONE_CRITERIA_COUNT};
}
export function setCapstoneCheck(raw,key,index,value,courses){
 const clean=normalizeCapstoneChecks(raw,courses),valid=validCourseChecks(courses);
 if(!valid.has(key)||!Number.isInteger(index)||index<0||index>=CAPSTONE_CRITERIA_COUNT||
  typeof value!=='boolean')return clean;
 const checked=clean[key]?[...clean[key]]:Array(CAPSTONE_CRITERIA_COUNT).fill(false);
 checked[index]=value;
 if(checked.some(Boolean))clean[key]=checked;
 else delete clean[key];
 return clean;
}
export function clearCapstoneChecks(raw,key,courses){
 const clean=normalizeCapstoneChecks(raw,courses);
 if(validCourseChecks(courses).has(key))delete clean[key];
 return clean;
}
