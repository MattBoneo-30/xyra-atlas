/** Lightweight mentor UI view, without local state or browser side effects.
 * The caller provides the genuine local-date reflection and route helpers.
 */
export function renderMentorPage({todayNote,day,button,icon,esc}){
 const entry=todayNote?.reflection,guide=todayNote?.lesson;
 return `<main class="page mentor-page"><div class="subnav">${button(`${icon('back',18)} Back to home`,'goto-home','back-link')}</div>
 <section class="mentor-hero"><div class="mentor-portrait"><img src="/assets/xyra-guide.svg" alt="Illustrated Xyra with violet eyes, dark hair, human ears, amethyst crown and lavender clothing" loading="eager"/></div><div class="mentor-hero-copy"><span class="overline">THE AMETHYST GUIDE OF ATLAS</span><h1>Welcome to <em>my corner.</em></h1><p>I'm Xyra, your fictional guide through this library. Think of this place as a gentle invitation to be curious, question what you know and keep moving at your own pace.</p><p class="mentor-signature">With curiosity, Xyra ✦</p></div></section>
 <div class="mentor-content"><section class="mentor-reflection"><span class="overline">TODAY'S REFLECTION · ${esc(day)}</span><h2>${esc(entry?.title||'Follow your curiosity')}</h2><p class="mentor-quote">“${esc(entry?.message||'Every question has a place here.')}”</p><div class="mentor-prompt"><strong>A question for today</strong><p>${esc(entry?.prompt||'What would you like to understand?')}</p></div><p class="fineprint">Reflections rotate with the local date. They are invitations, not psychological evaluations or personal predictions.</p></section>
 ${guide?`<section class="mentor-lesson"><span class="overline">A LITTLE LEARNING TO TRY</span><h2>${esc(guide.title)}</h2><p>${esc(guide.course)} · ${guide.minutes} minutes</p><p>Open this lesson for an explanation, a practical exercise and your private Field Notebook.</p>${button(`Explore this lesson ${icon('arrow',17)}`,'open-lesson','primary-button',`data-course="${esc(guide.courseId)}" data-lesson="${esc(guide.lessonId)}"`)}</section>`:''}</div>
 <section class="mentor-outro"><span class="overline">TAKE YOUR TIME</span><p>There is no finish line to understanding the world. Go wherever the next thoughtful question takes you.</p>${button(`Explore the Atlas ${icon('compass',17)}`,'map','secondary-button')}</section>
 </main>`;
}
