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
 },
 'psychology:case-ambiguity-audit':{
  file:'chapter-interpretation-crossroads.svg',
  title:'The Interpretation Crossroads',
  caption:'Three possible meanings appear, but only one careful question can test them.',
  alt:'A starlit observatory at a crossroads with three illuminated paths, a glass compass, and quiet signposts for uncertain interpretations'
 },
 'savings:case-three-month-cash':{
  file:'chapter-cash-weatherhouse.svg',
  title:'The Cash Weatherhouse',
  caption:'A small reserve shelters the essentials when tomorrow\'s income changes.',
  alt:'A warm glowing house beneath a violet storm sky, with an emergency savings jar and a dated planning calendar nearby'
 },
 'time:case-dependency-release':{
  file:'chapter-clockwork-schedule.svg',
  title:'The Clockwork Workshop',
  caption:'Realistic schedules keep dependencies, buffers, and rest visible.',
  alt:'A grand brass clock above a violet workshop table with linked work cards and a carefully arranged timeline of tasks'
 },
 'languages:case-restaurant-dialogue':{
  file:'chapter-language-teahouse.svg',
  title:'The Lantern Teahouse',
  caption:'A question, a clarification, and a kind reply turn phrases into dialogue.',
  alt:'A cozy lantern-lit teahouse with two open dialogue scrolls, a cup of tea, and a table ready for language practice'
 },
 'communication:case-repair-feedback':{
  file:'chapter-feedback-bridge.svg',
  title:'The Listening Bridge',
  caption:'Observable feedback and genuine listening make a difficult conversation safer.',
  alt:'Two figures on separate sides of a graceful lit bridge, with a shared conversation note suspended over twilight water'
 },
 'thinking:case-viral-number-audit':{
  file:'chapter-evidence-prism.svg',
  title:'The Evidence Prism',
  caption:'A striking number becomes clearer when its sample and method are visible.',
  alt:'A luminous translucent prism separating a dramatic claim into data charts, a written source, and a cautious conclusion'
 },
 'career:case-project-evidence':{
  file:'chapter-portfolio-forge.svg',
  title:'The Portfolio Forge',
  caption:'A credible project story is built from decisions, evidence, and limitations.',
  alt:'A violet-lit developer workstation with a code editor, an architecture blueprint, and checked project-evidence notes'
 },
 'relationships:case-boundary-repair':{
  file:'chapter-boundary-garden.svg',
  title:'The Boundary Garden',
  caption:'A respectful boundary names your own next action and leaves others their choice.',
  alt:'Two softly illuminated garden paths divided by a low gate with flowering trees and space for personal boundaries'
 },
 'negotiation:case-three-offers':{
  file:'chapter-offer-market.svg',
  title:'The Fair Exchange Market',
  caption:'Compare the full terms of each offer before agreeing to the price.',
  alt:'A lantern-lit market pavilion with balanced brass scales and three written work offers for comparing contract terms'
 },
 'shadow:case-pressure-defenses':{
  file:'chapter-protective-lantern.svg',
  title:'The Protective Lantern',
  caption:'Recognize pressure and find support without escalating danger.',
  alt:'A bright protective lantern in a peaceful refuge behind an open safety gate, with the darkness of a distant storm outside'
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
