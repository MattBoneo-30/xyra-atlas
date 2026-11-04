/** Offline print-friendly review copy of authored curriculum; no learner notes or telemetry. */
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const slug=x=>String(x).replace(/[^a-z0-9-]/gi,'-');
const p=x=>'<p>'+esc(x)+'</p>';
function list(items,ordered=false){
 const tag=ordered?'ol':'ul';
 return '<'+tag+'>'+items.map(x=>'<li>'+esc(x)+'</li>').join('')+'</'+tag+'>';
}
function sources(items){
 return '<h4>References — validate each material claim</h4><ul>'+
 (items||[]).map(x=>'<li><a href="'+esc(x.url)+'" target="_blank" rel="noreferrer noopener">'+esc(x.label)+'</a></li>').join('')+'</ul>';
}
function answers(options,correct){
 return '<ol class="choices">'+options.map((x,i)=>'<li'+(i===correct?' class="answer"':'')+'>'+
 esc(x)+(i===correct?' <strong>(authored answer — verify independently)</strong>':'')+'</li>').join('')+'</ol>';
}
function lesson(item){
 const c=item.content;
 return '<details id="lesson-'+slug(item.id)+'" class="review-item"><summary><strong>'+esc(c.title)+
 '</strong><span>'+esc(c.stage)+' · Pending review</span></summary><div class="detail">'+
 '<p class="hash">SHA-256 source hash: <code>'+esc(item.contentHash)+'</code></p>'+
 '<h4>Introduction</h4>'+p(c.intro)+
 (c.sections||[]).map((s,i)=>'<h4>Teaching section '+(i+1)+': '+esc(s.heading)+'</h4>'+p(s.body)).join('')+
 '<h4>Worked example</h4>'+p(c.workedExample)+
 '<h4>Applied assignment</h4>'+p(c.task)+
 '<h4>Evidence and transfer practice</h4>'+list(c.stagePractice||[],true)+
 '<h4>Assessment question</h4>'+p(c.quiz.question)+answers(c.quiz.options,c.quiz.correct)+
 '<h4>Assessment rationale</h4>'+p(c.quiz.explanation)+sources(c.references)+
 '<h4>Human review checklist</h4>'+list(item.checklist||[])+
 '<p class="disclaimer">This author-supplied copy is not an independent expert approval. Review actual evidence, applicability, context and safety before signing.</p>'+
 '</div></details>';
}
function decision(item){
 const c=item.content;
 return '<details id="decision-'+slug(item.id)+'" class="review-item"><summary><strong>'+esc(item.id)+
 '</strong><span>Pending review</span></summary><div class="detail">'+
 '<p class="hash">SHA-256 source hash: <code>'+esc(item.contentHash)+'</code></p>'+
 '<h4>Scenario</h4>'+p(c.question)+answers(c.options,c.correct)+
 '<h4>Decision rationale</h4>'+p(c.explanation)+sources(c.sources)+
 '<p class="disclaimer">An authored answer is not validated expertise. Inspect each alternative and the reasoning.</p>'+
 '</div></details>';
}
const style=[
 '*,*:before,*:after{box-sizing:border-box}',
 'body{margin:0;color:#20192e;background:#f5f2fa;font:16px/1.65 system-ui,Arial,sans-serif}',
 'header{padding:30px 5%;background:#211333;color:#fff}main{max-width:1080px;margin:auto;padding:24px}',
 'nav,.intro,.review-item{background:#fff;border:1px solid #d9cfe6;border-radius:10px}',
 'nav,.intro{padding:18px}nav ul{columns:2}.group{margin:28px 0}',
 '.review-item{margin:9px 0}summary{cursor:pointer;padding:13px 16px;display:flex;gap:10px;justify-content:space-between}',
 'summary span,.hash,.disclaimer{font-size:.86rem;color:#645575}',
 '.detail{padding:0 18px 22px;border-top:1px solid #e5dfec}',
 '.detail p,code{overflow-wrap:anywhere}h2,h3,h4{line-height:1.3}',
 '.choices .answer{background:#eff9e9;padding:4px}',
 'a{color:#49318c}a:focus-visible,summary:focus-visible{outline:3px solid #7350aa;outline-offset:3px}',
 '.flag{background:#fff0c9;color:#6b3b10;border-radius:5px;padding:3px;font-size:.74rem}',
 '@media(max-width:600px){nav ul{columns:1}main{padding:12px}summary{flex-direction:column}}',
 '@media print{body{background:white}header{color:#20192e;background:white}nav{display:none}.group{break-before:page}summary{display:block}}'
].join('');
export function renderEditorialReviewHTML(packet){
 if(!packet||packet.status!=='review-packet-not-independent-signoff'||
 !Array.isArray(packet.lessons)||!Array.isArray(packet.decisions)||!Array.isArray(packet.references))
 throw Error('Invalid author review packet');
 const subjects=[...new Set(packet.lessons.map(x=>x.course))];
 const nav=subjects.map(s=>'<li><a href="#subject-'+slug(s)+'">'+esc(s)+
 ' ('+packet.lessons.filter(x=>x.course===s).length+')</a></li>').join('');
 const content=subjects.map(s=>{
  const ls=packet.lessons.filter(x=>x.course===s);
  const ds=packet.decisions.filter(x=>x.content.courseId===s);
  return '<section id="subject-'+slug(s)+'" class="group"><h2>'+esc(s)+
  (ls.some(x=>x.highStakes)?' <span class="flag">Expert safety review prioritized</span>':'')+'</h2>'+
  '<p>'+ls.length+' lessons · '+ds.length+' decision cases</p>'+
  '<h3>Full lessons</h3>'+ls.map(lesson).join('')+
  '<h3>Applied decisions</h3>'+ds.map(decision).join('')+'</section>';
 }).join('');
 return '<!doctype html><html lang="en"><head><meta charset="utf-8">'+
 '<meta name="viewport" content="width=device-width,initial-scale=1">'+
 '<meta name="robots" content="noindex,nofollow"><title>Xyra Atlas — Independent Editorial Review Copy</title>'+
 '<style>'+style+'</style></head><body><header><h1>Xyra Atlas · Editorial Review Copy</h1>'+
 '<p>Full authored curriculum for externally credential-verified reviewers. Never an automatic certification.</p></header>'+
 '<main><aside role="note" class="intro"><strong>All items pending independent review.</strong>'+
 '<p>'+packet.lessons.length+' lessons, '+packet.decisions.length+' decisions and '+
 packet.references.length+' unique references. Source hashes match the companion machine-readable packet.'+
 ' Verify every factual statement and answer, with special care for high-stakes and Philippine jurisdiction-specific claims.</p>'+
 '<p>No personal notes, analytics or passwords are included. Reference links open only when selected.</p></aside>'+
 '<nav aria-label="Review subjects"><h2>Subject index</h2><ul>'+nav+'</ul></nav>'+
 content+'</main></body></html>';
}
