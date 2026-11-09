/**
 * Lightweight visual-only enhancements for Xyra Atlas.
 * Progress represents viewport position in the current lesson page,
 * never mastery or lesson completion. No network, analytics or storage.
 */
export function readingPosition(scrollTop, scrollHeight, viewportHeight){
 const n=Number(scrollTop),h=Number(scrollHeight),v=Number(viewportHeight);
 if(!Number.isFinite(n)||!Number.isFinite(h)||!Number.isFinite(v)||h<=0||v<=0)return 0;
 const distance=Math.max(0,h-v);
 if(distance===0)return 0;
 return Math.min(1,Math.max(0,n/distance));
}

let pending=false;
let installed=false;

export function syncVisualReaderProgress(doc=typeof document==='undefined'?null:document,win=typeof window==='undefined'?null:window){
 if(!doc||!win)return 0;
 const fill=doc.querySelector?.('.atlas-reader-progress-fill');
 if(!fill)return 0;
 const scrolling=doc.scrollingElement||doc.documentElement;
 const ratio=readingPosition(scrolling?.scrollTop||0,scrolling?.scrollHeight||0,win.innerHeight||0);
 fill.style.transform='scaleX('+ratio+')';
 return ratio;
}

function schedule(){
 if(pending)return;
 pending=true;
 const frame=typeof window!=='undefined'&&typeof window.requestAnimationFrame==='function'
  ?window.requestAnimationFrame.bind(window)
  :fn=>fn();
 frame(()=>{
  pending=false;
  syncVisualReaderProgress();
 });
}

export function installVisualExperience(doc=typeof document==='undefined'?null:document,win=typeof window==='undefined'?null:window){
 if(installed||!doc?.addEventListener||!win?.addEventListener)return false;
 installed=true;
 doc.addEventListener('scroll',schedule,{passive:true});
 win.addEventListener('resize',schedule,{passive:true});
 doc.addEventListener('visibilitychange',schedule);
 schedule();
 return true;
}
if(typeof document!=='undefined'&&typeof window!=='undefined')installVisualExperience();

/** Illustrated discovery cards are kept outside the main application bundle. */
export function visualHorizonsPanel(horizons,esc){
 return `<section class="atlas-horizons" aria-labelledby="atlas-horizons-heading">
      <div class="atlas-horizons-heading">
        <div><span class="overline">THREE HORIZONS · FOURTEEN WORLDS</span><h2 id="atlas-horizons-heading">A world for every curiosity.</h2><p>Every world offers a journey from foundations to independent understanding. These are three illustrated places to begin.</p></div>
        <span class="atlas-horizons-ornament" aria-hidden="true">✦</span>
      </div>
      <div class="atlas-horizons-grid">${horizons.map(h=>`<button type="button" class="atlas-horizon-card" data-action="open-course" data-id="${esc(h.id)}" aria-label="Open ${esc(h.course.title)} learning world">
        <img src="${esc(h.art?.src||'/assets/'+h.course.art+'.svg')}" alt="" loading="lazy" decoding="async"/>
        <span class="atlas-horizon-shade" aria-hidden="true"></span>
        <span class="atlas-horizon-content"><span class="atlas-horizon-label">HORIZON ${esc(h.number)} · ${esc(h.stage.toUpperCase())}</span><strong>${esc(h.course.title)}</strong><small>${esc(h.subtitle)}</small></span>
        <span class="atlas-horizon-arrow" aria-hidden="true">↗</span>
      </button>`).join('')}</div>
    </section>`;
}
export function visualScenePanel(button){
 return `<section class="atlas-scene-section" aria-labelledby="atlas-scene-heading"><div class="section-heading"><div><span class="overline">FOLLOW THE LIGHT</span><h2 id="atlas-scene-heading">Choose your next doorway</h2><p class="atlas-scene-lead">Original illustrated worlds woven into the Atlas. Wander, discover, and return whenever you're ready.</p></div></div>
     <div class="atlas-scene-grid">
      <article class="atlas-scene-card"><img src="/assets/atlas-lantern-library.svg" alt="Starlit library interior with a glowing manuscript, grand arched window and bookshelves" loading="lazy" decoding="async"/><span class="atlas-guide-medallion" aria-hidden="true"><img src="/assets/xyra-guide.svg" alt="" loading="lazy" decoding="async"/></span><div class="atlas-scene-overlay" aria-hidden="true"></div><div class="atlas-scene-copy"><span class="overline">THE LANTERN LIBRARY</span><h3>Meet your guide</h3><p>Quiet moments and a note from Xyra.</p>${button('Visit Xyra’s Corner','open-corner','scene-link')}</div></article>
      <article class="atlas-scene-card"><img src="/assets/atlas-starlit-garden.svg" alt="Twilight flowering garden with a winding path toward a glowing stone observatory" loading="lazy" decoding="async"/><div class="atlas-scene-overlay" aria-hidden="true"></div><div class="atlas-scene-copy"><span class="overline">THE STARLIT PATH</span><h3>Find your constellation</h3><p>Explore how fourteen learning worlds connect.</p>${button('See the knowledge map','map','scene-link')}</div></article>
     </div>
    </section>`;
}
export function visualStageCompass(idx,totalLessons,currentStage){
 return `<section class="atlas-reader-compass" aria-label="Current learning level">
      <div class="atlas-reader-compass-caption"><span class="overline">YOUR PLACE IN THE ATLAS</span><span>Lesson ${idx+1} of ${totalLessons}</span></div>
      <ol class="atlas-reader-compass-steps">${["Beginner","Intermediate","Advanced"].map((stage,index)=>`<li class="${currentStage===stage?"is-current":""}" ${currentStage===stage?'aria-current="step"':""}><span class="atlas-compass-number">0${index+1}</span><strong>${stage}</strong></li>`).join("")}</ol>
    </section>`;
}
