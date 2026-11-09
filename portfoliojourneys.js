/** Xyra Atlas subject portfolio trails.
 * One original project evolves through the existing Beginner, Intermediate and
 * Advanced lessons; stage artifacts are ungraded and not certifications.
 * No persistence, network, private user input or new lesson identifiers.
 */
import {PORTFOLIO_JOURNEYS_ONE} from './portfoliojourneys1.js';
import {PORTFOLIO_JOURNEYS_TWO} from './portfoliojourneys2.js';
import {skillSpiralPanel} from './skillspirals.js';
import {masteryResearchRoadmap} from './masteryresearch.js';
import {evidencePathPanel} from './evidencepath.js';
export const PORTFOLIO_JOURNEYS=Object.freeze({...PORTFOLIO_JOURNEYS_ONE,...PORTFOLIO_JOURNEYS_TWO});
export const PORTFOLIO_JOURNEY_COUNT=Object.keys(PORTFOLIO_JOURNEYS).length;
const STAGES=Object.freeze(['Beginner','Intermediate','Advanced']);
export function attachPortfolioJourneys(courses){
 if(!Array.isArray(courses))throw Error('Expected Atlas courses');
 const ids=new Set(courses.map(c=>c?.id));
 if(ids.size!==14||PORTFOLIO_JOURNEY_COUNT!==14||
   Object.keys(PORTFOLIO_JOURNEYS).some(id=>!ids.has(id)))
  throw Error('Incomplete portfolio journey coverage');
 const queued=[];
 for(const [id,item] of Object.entries(PORTFOLIO_JOURNEYS)){
  const course=courses.find(c=>c.id===id);
  const stageLessons=STAGES.map(stage=>course?.lessons?.find(l=>l.stage===stage));
  if(stageLessons.some(lesson=>!lesson||!lesson.id))
   throw Error('Missing original staged lesson: '+id);
  for(const [field,min] of Object.entries({title:27,brief:140,limit:45})){
   if(typeof item[field]!=='string'||item[field].length<min)
    throw Error('Incomplete portfolio trail '+id+':'+field);
  }
  if(!Array.isArray(item.artifacts)||item.artifacts.length!==3||
     !Array.isArray(item.rubric)||item.rubric.length!==4||
     item.rubric.some(r=>typeof r!=='string'||r.length<48))
   throw Error('Incomplete artifacts or rubric: '+id);
  for(const artifact of item.artifacts){
   for(const [field,min] of Object.entries({name:23,build:175,test:110,example:115})){
    if(typeof artifact[field]!=='string'||artifact[field].length<min)
     throw Error('Incomplete portfolio stage '+id+':'+field);
   }
  }
  const key=id+':'+stageLessons[0].id;
  if(course.portfolioJourney||stageLessons[0].portfolioJourney){
   if(course.portfolioJourney?.key!==key||stageLessons[0].portfolioJourney?.key!==key)
    throw Error('Conflicting subject portfolio for '+id);
   continue;
  }
  queued.push({course,firstLesson:stageLessons[0],key,item,stageLessons});
 }
 for(const {course,firstLesson,key,item,stageLessons} of queued){
  const journey=Object.freeze({
   key,title:item.title,brief:item.brief,
   artifacts:Object.freeze(item.artifacts.map((stage,i)=>Object.freeze({
    ...stage,stage:STAGES[i],lessonId:stageLessons[i].id
   }))),
   rubric:Object.freeze([...item.rubric]),limit:item.limit,
   reviewStatus:'pending-independent-review'
  });
  course.portfolioJourney=journey;
  firstLesson.portfolioJourney=journey;
 }
 return queued.length;
}
const safe=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function portfolioJourneyPanel(course,{isLessonDone=()=>false,hasFieldNote=()=>false}={}){
 const item=course?.portfolioJourney;
 if(!item)return '';
 const cards=item.artifacts.map((stage,i)=>{
  const done=Boolean(isLessonDone(stage.lessonId));
  const path='#/lesson/'+encodeURIComponent(course.id)+'/'+encodeURIComponent(stage.lessonId);
  return '<li class="portfolio-journey-stage" data-journey-stage="'+i+'">'+
   '<div class="portfolio-journey-step-head"><span class="portfolio-journey-order">0'+(i+1)+'</span>'+
   '<div><small>'+safe(stage.stage.toUpperCase())+' · '+(done?'LINKED LESSON COMPLETE':'LINKED LESSON NOT COMPLETE')+'</small>'+
   '<h3>'+safe(stage.name)+'</h3></div></div>'+
   '<p class="portfolio-journey-task">'+safe(stage.build)+'</p>'+
   '<details class="portfolio-journey-details"><summary>Review test and sample reasoning</summary>'+
    '<p><strong>Evidence check:</strong> '+safe(stage.test)+'</p>'+
    '<p><strong>Illustrative example:</strong> '+safe(stage.example)+'</p></details>'+
   '<a class="portfolio-journey-link" href="'+safe(path)+'">Study the linked '+safe(stage.stage.toLowerCase())+' lesson</a></li>';
 }).join('');
 return '<section class="portfolio-journey" id="portfolio-journey" aria-label="Three-stage subject portfolio journey">'+
  '<span class="overline">ONE PROJECT · THREE LEVELS</span><h2>'+safe(item.title)+'</h2>'+
  '<p class="portfolio-journey-brief">'+safe(item.brief)+'</p>'+
  '<p class="portfolio-journey-guidance">Build one artifact at each level, then revise it using the previous stage. A linked lesson completion is only a navigation cue—it does not verify the artifact or certify mastery. Work can be saved privately in your own notebook.</p>'+
  '<ol class="portfolio-journey-stages">'+cards+'</ol>'+
  '<div class="portfolio-journey-rubric"><h3>Use these checks for the complete portfolio</h3><ul>'+
   item.rubric.map(x=>'<li>'+safe(x)+'</li>').join('')+'</ul></div>'+
  '<p class="fineprint">'+safe(item.limit)+' All authored cases and review criteria await independent subject review.</p></section>'+skillSpiralPanel(course)+evidencePathPanel(course,{isLessonDone,hasFieldNote})+masteryResearchRoadmap(course);
}
