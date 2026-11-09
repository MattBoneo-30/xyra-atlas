/**
 * Atlas World Gallery — three cohesive visual surfaces.
 *
 * The Explore gallery and Journey constellation reuse the existing course data,
 * published lesson IDs and local stage artwork. There are no network requests,
 * stored states, exam claims or fabricated progress values.
 */
const LEVELS = Object.freeze(['Beginner','Intermediate','Advanced']);

const esc = value => String(value ?? '').replace(/[&<>"']/g,character=>({
 '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
}[character]));

const localArt = value => {
 const path=String(value||'');
 return /^\/assets\/[a-z0-9_-]+\.svg$/.test(path) ? path : '/assets/atlas-mark.svg';
};

export function stageForWorld(course,nextStageFor){
 const stage=typeof nextStageFor==='function'?nextStageFor(course):'Beginner';
 return LEVELS.includes(stage)?stage:'Beginner';
}

export function visualWorldProgress(course,progressFor){
 const total=Array.isArray(course?.lessons)?course.lessons.length:0;
 const raw=typeof progressFor==='function'?Number(progressFor(course)):0;
 const finished=Number.isFinite(raw)?Math.max(0,Math.min(total,Math.floor(raw))):0;
 const percentage=total?Math.round(finished/total*100):0;
 return {finished,total,percentage};
}

export function renderAtlasExploreBanner(total){
 const count=Math.max(0,Math.floor(Number(total)||0));
 return `<section class="atlas-worlds-entrance" aria-labelledby="atlas-worlds-entrance-title">
   <img src="/assets/atlas-starlit-garden.svg" alt="" decoding="async" fetchpriority="high"/>
   <div class="atlas-worlds-entrance-shade" aria-hidden="true"></div>
   <div class="atlas-worlds-entrance-copy">
     <span class="overline">THE LIVING ATLAS · ${count} LEARNING WORLDS</span>
     <h1 id="atlas-worlds-entrance-title">Every world begins <em>with a question.</em></h1>
     <p>Walk through the ideas, build practical understanding and return to the places that still challenge you.</p>
   </div>
   <span class="atlas-worlds-entrance-sigil" aria-hidden="true">✧</span>
 </section>`;
}

export function renderAtlasWorldGallery(courses,progressFor,nextStageFor,getStageArt){
 if(!Array.isArray(courses)||!courses.length)return '';
 const cards=courses.map((course,index)=>{
  const progress=visualWorldProgress(course,progressFor);
  const stage=stageForWorld(course,nextStageFor);
  const scene=typeof getStageArt==='function'?getStageArt(course.id,stage):null;
  const img=localArt(scene?.src || '/assets/'+course.art+'.svg');
  const stageName=progress.total && progress.finished===progress.total?'WORLD EXPLORED':'NEXT · '+stage.toUpperCase();
  const label='Open '+course.title+(course.dark?' (restricted 18 plus)':'')+
    '. '+progress.finished+' of '+progress.total+' lessons complete.';
  return `<button type="button" class="atlas-world-portal ${course.dark?'is-shadow-world':''}"
       data-action="open-course" data-id="${esc(course.id)}"
       data-atlas-world="${esc(course.id)}" aria-label="${esc(label)}">
     <span class="atlas-world-portal-visual">
       <img src="${esc(img)}" alt="" loading="lazy" decoding="async"/>
       <span class="atlas-world-portal-shade" aria-hidden="true"></span>
       <span class="atlas-world-portal-index" aria-hidden="true">WORLD ${String(index+1).padStart(2,'0')}</span>
       <span class="atlas-world-portal-stage">${esc(stageName)}</span>
     </span>
     <span class="atlas-world-portal-content">
       <span class="atlas-world-portal-eyebrow">${esc(course.tag)}${course.dark?' · 18+':''}</span>
       <strong>${esc(course.title)}</strong>
       <span class="atlas-world-portal-description">${esc(course.subtitle)}</span>
       <span class="atlas-world-portal-bottom">
         <span>${progress.finished} / ${progress.total} lessons</span>
         <span aria-hidden="true">↗</span>
       </span>
       <span class="atlas-world-portal-meter" aria-hidden="true">
         <span style="width:${progress.percentage}%"></span>
       </span>
     </span>
   </button>`;
 }).join('');
 return '<section class="atlas-world-gallery" aria-label="Illustrated learning world catalogue">'+
   '<div class="atlas-world-gallery-grid">'+cards+'</div>'+
   '<p class="fineprint">World completion reflects finished lessons, not verified professional competence. Artwork and study content are available offline after caching.</p>'+
   '</section>';
}

export function renderAtlasJourneyConstellation(courses,progressFor){
 if(!Array.isArray(courses)||!courses.length)return '';
 const nodes=courses.map((course,index)=>{
  const progress=visualWorldProgress(course,progressFor);
  const full=progress.total>0&&progress.finished===progress.total;
  const state=full?'explored':progress.finished?'in-progress':'unvisited';
  return `<button type="button" class="atlas-constellation-node" data-action="open-course"
    data-id="${esc(course.id)}" data-atlas-node="${esc(course.id)}"
    aria-label="${esc('Open '+course.title+(course.dark?' (18 plus)':'')+
      ', '+progress.finished+' of '+progress.total+' lessons complete')}">
    <span class="atlas-constellation-orbit" data-state="${state}" style="--atlas-completion:${progress.percentage}%">
      <span class="atlas-constellation-star" aria-hidden="true">${full?'✦':'✧'}</span>
    </span>
    <span class="atlas-constellation-name">${esc(course.title)}</span>
    <span class="atlas-constellation-count">${progress.finished}/${progress.total}</span>
  </button>`;
 }).join('');
 const explored=courses.filter(course=>{
  const p=visualWorldProgress(course,progressFor);
  return p.total>0&&p.finished===p.total;
 }).length;
 return `<section class="atlas-constellation" aria-labelledby="atlas-constellation-heading">
    <div class="atlas-constellation-heading">
      <div><span class="overline">THE WORLDS YOU ARE EXPLORING</span>
        <h2 id="atlas-constellation-heading">Your learning constellation</h2>
        <p>Every light is a world you can revisit. The ring shows finished lessons—not mastery or a credential.</p>
      </div>
      <span class="atlas-constellation-total">${explored} / ${courses.length} worlds explored</span>
    </div>
    <div class="atlas-constellation-sky">${nodes}</div>
  </section>`;
}
