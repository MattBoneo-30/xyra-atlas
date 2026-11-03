/** Curated, offline chapter illustrations for individual Atlas case studies.
 * Sources are local-only, human-authored SVG illustrations. Unknown lessons
 * intentionally fall back to their subject's existing original artwork.
 */
const scenes={
 'laws:case-ph-data-access':{
  file:'chapter-privacy-observatory.svg',
  title:'The Privacy Observatory',
  caption:'A sealed record invites a careful question about personal information.',
  alt:'An illuminated records hall overlooking a city at dusk, with a sealed personal document resting on an open book'
 },
 'digital:case-account-takeover-drill':{
  file:'chapter-security-sanctum.svg',
  title:'The Security Sanctum',
  caption:'Verified doors and secure recovery paths matter more than urgency.',
  alt:'A monumental amethyst portal with glowing concentric wards surrounding a closed lock, framed by archive towers'
 },
 'business:case-pilot-unit-economics':{
  file:'chapter-business-atelier.svg',
  title:"The Maker’s Atelier",
  caption:'Every material, revision, and delivery promise has a real cost.',
  alt:'A warmly lit craft workshop with shelves of supplies, a fabric tote bag, and an open cost ledger on a workbench'
 },
 'science:case-study-causality':{
  file:'chapter-science-glasshouse.svg',
  title:'The Research Glasshouse',
  caption:'Observe carefully before drawing a conclusion about cause and effect.',
  alt:'A glowing glass observatory with a telescope, laboratory plants, and an open notebook for scientific observations'
 }
};
export const CHAPTER_ART=Object.freeze(Object.fromEntries(
 Object.entries(scenes).map(([key,item])=>[key,Object.freeze({...item,src:'/assets/'+item.file})])
));
export function getChapterArt(courseId,lessonId){
 const key=String(courseId)+':'+String(lessonId);
 return Object.hasOwn(CHAPTER_ART,key)?CHAPTER_ART[key]:null;
}
export const CHAPTER_ART_COUNT=Object.keys(CHAPTER_ART).length;
