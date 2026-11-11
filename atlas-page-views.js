/**
 * Stateless page views extracted from the app shell.
 * This module renders only provided model data. It does not touch persistence,
 * DOM, window, analytics or network and preserves existing event-action hooks.
 */
export function renderExamHistoryPanel({report,available,COURSES,EXAM_SIZES,button,esc}){
 if(!report.attempts)return `<section class="exam-insights exam-insights-empty"><span class="overline">PRACTICE HISTORY</span><h2>Your progress through practice</h2><p>Completed challenges appear here with private subject scores and lessons worth revisiting. Scores are study signals, not qualifications.</p></section>`;
 const subjects=report.subjects.slice(0,6),focus=report.focus;
 return `<section class="exam-insights" aria-label="Practice history"><div class="exam-insights-heading"><div><span class="overline">YOUR PRIVATE PRACTICE HISTORY</span><h2>Patterns worth noticing</h2><p>Based only on completed practice exams in this browser. Lower scores identify questions to revisit, not your overall ability.</p></div>${button('Clear history','exam-history-clear','secondary-button')}</div>
 <div class="exam-insights-metrics"><div><strong>${report.attempts}</strong><span>Recent exams</span></div><div><strong>${report.correct}/${report.total}</strong><span>Answers correct</span></div><div><strong>${report.percent}%</strong><span>Across recorded questions</span></div></div>
 <div class="exam-insights-columns"><div><h3>Practice by subject</h3><div class="exam-insights-subjects">${subjects.map(a=>`<div class="exam-insights-subject"><div class="exam-insights-subject-label"><span>${esc(a.title)}</span><strong>${a.correct}/${a.total} · ${a.percent}%</strong></div><div class="exam-insights-track"><span style="width:${a.percent}%"></span></div></div>`).join('')}</div></div>
 <div><h3>Questions to revisit</h3>${focus.length?`<div class="exam-insights-focus">${focus.map(q=>`<div class="exam-insights-focus-item"><div><strong>${esc(q.title)}</strong><small>${esc(q.courseTitle)} · Missed ${q.count} ${q.count===1?'time':'times'}</small></div>${button('Review','open-lesson','secondary-button',`data-course="${esc(q.courseId)}" data-lesson="${esc(q.lessonId)}"`)}</div>`).join('')}</div>`:'<p class="fineprint">No missed questions in your saved results. Keep exploring new topics.</p>'}</div></div>
 ${available?`<div class="exam-focus-action"><div><span class="overline">FROM INSIGHT TO PRACTICE</span><h3>Retest missed questions</h3><p>Revisit up to ${available} distinct questions you previously missed, prioritized by repeat misses. No unrelated questions are added.</p></div><div class="exam-focus-controls"><label for="exam-focus-size">Maximum questions</label><select id="exam-focus-size" class="styled-select">${EXAM_SIZES.map(n=>`<option value="${n}">${n} questions</option>`).join('')}</select>${button('Start focused revision','exam-focus-start','primary-button')}</div></div>`:''}
 <div class="exam-insights-recent"><h3>Recent challenges</h3>${report.recent.slice(0,5).map(r=>`<div class="exam-insights-recent-row"><span>${esc(new Date(r.endedAt).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}))}</span><span>${r.areas.length===1?esc(COURSES.find(c=>c.id===r.areas[0].courseId)?.title||r.areas[0].courseId):'Mixed subjects'}</span><strong>${r.correct}/${r.total}</strong></div>`).join('')}</div>
 <p class="fineprint">Only scores and missed lesson identifiers are retained—not raw answers. Up to 12 completed exams can be backed up or cleared. This history does not change lesson completion.</p></section>`;
}


export function renderAtlasMapView({atlas,trails,button,icon,esc}){
 const spots=atlas.nodes.map(n=>`<button type="button" class="atlas-star-node ${n.done?'has-progress':''} ${n.percent===100?'is-mastered':''} ${n.dark?'is-shadow':''}" style="--node-x:${n.x}%;--node-y:${n.y}%" data-action="open-course" data-id="${esc(n.id)}" aria-label="Open ${esc(n.title)}. ${n.done} of ${n.total} lessons complete">
   <span class="atlas-node-art"><img src="/assets/${esc(n.art)}.svg" alt="" loading="lazy" decoding="async"/></span>
   <span class="atlas-node-label"><strong>${esc(n.title)}</strong><small>${n.dark?'18+ · content acknowledgment required':`${n.done}/${n.total} lessons`}</small><span class="atlas-node-track"><span style="width:${n.percent}%"></span></span></span>
 </button>`).join('');
 const links=atlas.links.map(l=>`<line x1="${l.x1}%" y1="${l.y1}%" x2="${l.x2}%" y2="${l.y2}%"/>`).join('');
 return `<main class="page atlas-map-page"><div class="subnav">${button(`${icon('back',18)} Back to learning`,'goto-explore','back-link')}</div><div class="page-title"><span class="overline">A UNIVERSE OF QUESTIONS</span><h1>Your Knowledge <em>Constellation.</em></h1><p>Fourteen connected worlds of learning. Choose any illustrated star to open a subject and follow your curiosity.</p></div>
  <section class="atlas-map-wrap" aria-label="Interactive knowledge map of ${atlas.nodes.length} subjects">
   <div class="atlas-sky" aria-hidden="true"><div class="atlas-sky-nebula"></div><svg viewBox="0 0 100 100" preserveAspectRatio="none"><g class="atlas-connections">${links}</g><g class="atlas-background-stars"><circle cx="8" cy="9" r=".12"/><circle cx="23" cy="35" r=".16"/><circle cx="69" cy="7" r=".12"/><circle cx="94" cy="29" r=".16"/><circle cx="31" cy="77" r=".14"/><circle cx="77" cy="77" r=".12"/><circle cx="53" cy="52" r=".2"/></g></svg></div>
   <div class="atlas-map-orbit">${spots}</div>
  </section>
  <section class="atlas-map-summary"><span>${icon('spark',20)} ${atlas.nodes.length} learning worlds</span><span>${icon('book',20)} ${atlas.completed} of ${atlas.total} lessons finished</span><span>${icon('compass',20)} Follow your own path</span></section>
  <section class="atlas-learning-trails" aria-label="Suggested connections between learning subjects">
   <div class="atlas-trails-heading"><div><span class="overline">FOLLOW THE THREADS</span><h2>Where curiosity leads next</h2><p>These optional connections use your completed lessons. They are invitations to explore, never required prerequisites or measures of expertise.</p></div><span class="atlas-trails-count">${trails.length} paths</span></div>
   <div class="atlas-trails-grid">${trails.map(trail=>`<article class="atlas-trail-card">
    <div class="atlas-trail-scene"><img src="/assets/${esc(trail.to.art)}.svg" alt="" loading="lazy" decoding="async"/><span class="atlas-trail-compass" aria-hidden="true">${icon('compass',20)}</span></div>
    <div class="atlas-trail-body"><span class="overline">FROM ${esc(trail.from.title)} TO</span><h3>${esc(trail.to.title)}</h3><p>${esc(trail.reason)}</p>
    <span class="atlas-trail-next">Start with: ${esc(trail.to.nextLesson.title)}</span>
    ${button(`Explore this connection ${icon('arrow',17)}`,'open-lesson','atlas-trail-button',`data-course="${esc(trail.to.id)}" data-lesson="${esc(trail.to.nextLesson.id)}"`)}
    </div></article>`).join('')||'<p class="atlas-trail-empty">You have explored every connected subject. Revisit any star to practice what you learned.</p>'}</div>
  </section>
  <p class="info-line">${icon('info',16)} Lines show suggested topic connections—not required prerequisites. Mature subjects still require acknowledgment.</p>
 </main>`;
}

