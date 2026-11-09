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
