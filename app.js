import { COURSES, LANGUAGES, LEARNING_SPRINT, DAILY_NOTES, findCourse, findLesson, totalLessons } from './data.js';
import { makeReviewCards, dueReviewCards, recordReview, normalizeReviews } from './review.js';
import { STUDIO_DEFAULTS, sanitizeStudio, calculateSavings, calculateBusiness, calculateTime } from './studio.js';
import { getPhrasePack, sanitizePhraseProgress } from './phrasebook.js';
import { normalizeFieldNotes, setFieldNote, MAX_FIELD_NOTE_LENGTH } from './fieldnotes.js';

import { PATH_GOALS, PATH_BUDGETS, createLearningPath, normalizeLearningPath, pathProgress } from './paths.js';

const STORAGE_KEY = 'xyra-atlas-state-v1';
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const plain = text => esc(text).replace(/\n/g, '<br>');
const initial = { completed: [], bookmarks: [], favorites: [], answers: {}, reviews: {}, fieldNotes: {}, lastOpened: null, dailyVisits: [], theme: 'dark', language: 'ja', languageDays: [], phrases: {}, studio: sanitizeStudio(null), userName: '', welcomeDismissed: false, learningPath: null };
function readStored() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!data || typeof data !== 'object') return {...initial};
    return {
      ...initial,
      ...data,
      completed: Array.isArray(data.completed) ? data.completed.filter(x => typeof x === 'string') : [],
      bookmarks: Array.isArray(data.bookmarks) ? data.bookmarks.filter(x => typeof x === 'string') : [],
      favorites: Array.isArray(data.favorites) ? data.favorites.filter(x => typeof x === 'string') : [],
      dailyVisits: Array.isArray(data.dailyVisits) ? data.dailyVisits.filter(x => /^\d{4}-\d{2}-\d{2}$/.test(x)) : [],
      languageDays: Array.isArray(data.languageDays) ? data.languageDays.filter(x => typeof x === 'string') : [],
      phrases: sanitizePhraseProgress(data.phrases),
      answers: data.answers && typeof data.answers === 'object' && !Array.isArray(data.answers) ? data.answers : {},
      reviews: normalizeReviews(data.reviews),
      studio: sanitizeStudio(data.studio),
      learningPath: normalizeLearningPath(data.learningPath,COURSES),
      fieldNotes: normalizeFieldNotes(data.fieldNotes),
      theme: data.theme === 'light' ? 'light' : 'dark',
      language: LANGUAGES.some(x => x.code === data.language) ? data.language : 'ja',
      userName: typeof data.userName === 'string' ? data.userName.slice(0,40) : ''
    };
  } catch { return {...initial}; }
}
let saved = readStored();
const reviewCards = makeReviewCards(COURSES);
let reviewRevealed = false;
let phraseRevealed = false, phraseIndex = 0;
let studioTab = 'savings';
const getDueReviews = () => dueReviewCards(reviewCards, saved.completed, saved.reviews, Date.now(), shadowUnlocked);
let route = parseHash();
let filter = 'all';
let query = '';
let modal = '';
let gateConfirmed = false;
let shadowUnlocked = false; // A content acknowledgment, not a secure identity or age verification system.
let installEvent = null;
let toastTimer;
let currentToast = '';
const today = () => new Date().toLocaleDateString('en-CA');
const idFor = (courseId, lessonId) => `${courseId}:${lessonId}`;
const isCompleted = key => saved.completed.includes(key);
const isBookmarked = key => saved.bookmarks.includes(key);
const courseProgress = c => c.lessons.filter(l => isCompleted(idFor(c.id,l.id))).length;
const finished = () => saved.completed.filter(id => COURSES.some(c => c.lessons.some(l => id === idFor(c.id,l.id)))).length;
const actualName = () => saved.userName?.trim() || 'curious learner';
const percent = (num, max) => max ? Math.round(num / max * 100) : 0;
const plural = (n, noun) => `${n} ${noun}${n === 1 ? '' : 's'}`;
const wasVisited = date => saved.dailyVisits.includes(date);
let storageWarningShown = false;
function persist() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }
  catch {
    // Some private/locked-down browsers reject storage. Never render synchronously
    // while the module is still initializing (or recursively show warnings).
    if (!storageWarningShown) {
      storageWarningShown = true;
      queueMicrotask(() => flash('This browser could not save progress. Export a backup before closing the app.'));
    }
  }
}
function visitToday() {
  const date = today();
  if (!wasVisited(date)) { saved.dailyVisits = [...new Set([...saved.dailyVisits, date])].slice(-400); persist(); }
}
visitToday();
function streak() {
  const dates = new Set(saved.dailyVisits);
  let cursor = new Date();
  if (!dates.has(today())) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while(n < 400) {
    const key = cursor.toLocaleDateString('en-CA');
    if (!dates.has(key)) break;
    n++; cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}
function icon(name,size=20) {
  const p = {
    menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4.2 4.2"/>',
    arrow:'<path d="m9 18 6-6-6-6"/>', back:'<path d="m15 18-6-6 6-6"/>',
    down:'<path d="m6 9 6 6 6-6"/>',
    home:'<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.7 5.1-5.3 2.9 2.7-5.3z"/>',
    chart:'<path d="M4 20V4M4 20h16M8 16v-4M13 16V8M18 16V5"/>',
    bookmark:'<path d="M6 4h12v17l-6-4-6 4z"/>',
    user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1-5 5-7 8-7s7 2 8 7"/>',
    bell:'<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5z"/><path d="M10 20h4"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4m0-14.2-1.4 1.4M6.3 17.7l-1.4 1.4"/>',
    moon:'<path d="M20 15a8 8 0 0 1-11-11 8 8 0 1 0 11 11"/>',
    spark:'<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/>',
    flame:'<path d="M12 22c5 0 8-3.5 8-8 0-3-1.6-6.1-5-9-.2 3-1.9 4.3-3 5-1-4-3.1-6-4-7C8 8 4 10 4 15c0 4 3 7 8 7Z"/>',
    brain:'<path d="M12 7a4 4 0 0 0-7-2c-3 1-3 5-1 7-2 3 0 6 3 6 0 3 5 4 5 0V7zm0 0a4 4 0 0 1 7-2c3 1 3 5 1 7 2 3 0 6-3 6 0 3-5 4-5 0V7zM8 9c3 0 4 2 4 4m4-4c-3 0-4 2-4 4"/>',
    scale:'<path d="M12 3v18M4 7h16M6 7l-4 8c2 2 6 2 8 0L6 7Zm12 0-4 8c2 2 6 2 8 0l-4-8ZM7 21h10"/>',
    briefcase:'<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M9 7V4h6v3M3 12c6 4 12 4 18 0M12 12v4"/>',
    wallet:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 9h18M15 15h6M17 15h.1"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/>',
    languages:'<path d="M4 5h13M11 3v3M6 9c2 5 6 8 11 10M15 9c-1 3-6 8-11 11M15 19l3-9 3 9m-5-3h4"/>',
    message:'<path d="M4 5h16v12H9l-5 4z"/><path d="M8 10h8M8 13h5"/>',
    shield:'<path d="M12 2 20 5v6c0 6-4 9-8 11-4-2-8-5-8-11V5z"/><path d="m8 12 3 3 5-6"/>',
    heart:'<path d="M20.8 8.2c0 5-8.8 11.2-8.8 11.2S3.2 13.2 3.2 8.2a4.8 4.8 0 0 1 8.8-2.4 4.8 4.8 0 0 1 8.8 2.4Z"/>',
    rocket:'<path d="M6 14c-2-6 6-12 14-12 0 8-6 16-12 14l-2-2Zm4-1 1 1M5 19l-2 2m3-2 2-2M9 6 6 4 4 6v3M15 15l3 3v3h-3"/>',
    orbit:'<circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-35 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(35 12 12)"/>',
    check:'<path d="m5 12 5 5 9-10"/>', close:'<path d="M5 5 19 19M19 5 5 19"/>',
    play:'<path d="m8 5 11 7-11 7z"/>',
    book:'<path d="M12 6c-3-2-6-2-10-1v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-4-1-7-1-10 1Zm0 0v14"/>',
    lock:'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
    download:'<path d="M12 3v13m-5-5 5 5 5-5M4 18v3h16v-3"/>',
    upload:'<path d="M12 17V4m-5 5 5-5 5 5M4 17v4h16v-4"/>',
    trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6m4-6v6"/>',
    info:'<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10v.2"/>',
    wifi:'<path d="M2 8c6-5 14-5 20 0M5 12c4-4 10-4 14 0m-11 4c3-3 5-3 8 0M12 20h.1"/>',
    'wifi-off':'<path d="m2 2 20 20M2 8c2-2 5-3 7-3m4 0c3 0 6 1 9 3M6 12c2-1 4-2 6-2m5 2 2 0m-11 4c2-2 4-2 5-2M12 20h.1"/>',
    alert:'<path d="m12 2 10 19H2zM12 8v5m0 4v.2"/>',
    external:'<path d="M14 4h6v6m0-6-9 9M20 14v6H4V4h6"/>',
    dots:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'
  };
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${p[name] || p.spark}</svg>`;
}
const mark = `<img src="/assets/atlas-mark.svg" alt="" class="brand-mark" />`;
const chevron = icon('arrow',17);
const button = (label,action,extra='',attrs='') => `<button type="button" class="${extra}" data-action="${action}" ${attrs}>${label}</button>`;
const bars = (done,total) => `<div class="progress-track" role="progressbar" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${done}"><span style="width:${percent(done,total)}%"></span></div>`;
function parseHash() {
  const segments = decodeURIComponent(location.hash.replace(/^#\/?/, '')).split('/').filter(Boolean);
  if (segments[0] === 'course' && segments[1]) return {view:'course', courseId:segments[1]};
  if (segments[0] === 'lesson' && segments[1] && segments[2]) return {view:'lesson', courseId:segments[1], lessonId:segments[2]};
  if (segments[0] === 'language') return {view:'language'};
  if (segments[0] === 'review') return {view:'review'};
  if (segments[0] === 'studio') return {view:'studio'};
  if (segments[0] === 'path') return {view:'path'};
  if (['home','explore','journey','saved','you'].includes(segments[0])) return {view:segments[0]};
  return {view:'home'};
}
function nav(path) { const next = '#/' + path; if (location.hash === next) { route = parseHash(); render(); } else location.hash = next; window.scrollTo({top:0,behavior:'instant'}); }
function flash(text) { currentToast = text; clearTimeout(toastTimer); render(); toastTimer = setTimeout(() => {currentToast = '';render();},3200); }
function tabForRoute() { return ['review','studio','path'].includes(route.view) ? 'journey' : ['course','lesson','language'].includes(route.view) ? 'explore' : route.view; }
function topbar() {
  return `<header class="topbar"><div class="topbar-inner">
    <button type="button" class="wordmark" data-action="goto-home" aria-label="Xyra Atlas home">${mark}<span>Xyra <em>Atlas</em></span></button>
    <div class="top-actions"><span class="status-dot" title="${navigator.onLine ? 'Online' : 'Offline'}"></span>${button(icon('search',21),'search','icon-button','aria-label="Search courses"')}${button(icon(saved.theme === 'dark' ? 'sun':'moon',21),'theme','icon-button','aria-label="Toggle appearance"')}${button(icon('bell',20),'open-updates','icon-button','aria-label="About the app"')}</div>
  </div></header>`;
}
function navBar() {
  const active = tabForRoute();
  const tabs = [['home','Home','home'],['explore','Learn','compass'],['journey','Journey','spark'],['saved','Saved','bookmark'],['you','You','user']];
  return `<nav class="bottom-nav" aria-label="Main navigation"><div class="bottom-nav-inner">${tabs.map(([id,label,ico])=>`<button type="button" class="nav-item ${id===active?'active':''}" aria-current="${id===active?'page':'false'}" data-action="nav" data-id="${id}"><span class="nav-symbol">${icon(ico,21)}</span><span>${label}</span></button>`).join('')}</div></nav>`;
}
function card(c,mode='tile') {
  const progress = courseProgress(c);
  const at = mode === 'horizontal' ? 'course-line' : 'course-tile';
  return `<button type="button" data-action="open-course" data-id="${esc(c.id)}" class="${at} ${c.dark?'shadow-course':''}">
    <span class="course-card-image ${mode==='horizontal'?'compact-image':''}" style="background-image:url('/assets/${esc(c.art)}.svg')"><span class="image-sheen"></span></span>
    <span class="course-card-content"><span class="course-label">${esc(c.tag)}</span><strong>${esc(c.title)}</strong><small>${esc(c.subtitle)}</small><span class="course-bottom">${c.dark ? `${icon('lock',13)} 18+` : `${icon('book',13)} ${plural(c.lessons.length,'lesson')}`} ${progress ? ` · ${progress} done` : ''}</span></span>
    ${mode==='horizontal' ? `<span class="course-card-arrow">${chevron}</span>` : ''}
  </button>`;
}
function home() {
  const done = finished();
  const reviewsDue = getDueReviews().length;
  const featured = COURSES.filter(c=>c.featured && !c.dark).slice(0,3);
  const last = saved.lastOpened && findCourse(saved.lastOpened.courseId) && findLesson(saved.lastOpened.courseId,saved.lastOpened.lessonId) ? saved.lastOpened : null;
  const note = DAILY_NOTES[Math.floor(new Date().getTime()/86400000)%DAILY_NOTES.length];
  return `<main class="page home-page">
    <section class="greeting"><div><div class="eyebrow"><span class="gold-spark">✦</span> YOUR PERSONAL ATLAS</div><p class="hello">Good ${partOfDay()}, ${esc(actualName())} <span class="mini-heart">♡</span></p><h1>Ready to grow<br/><em>today?</em></h1><p class="lead">A little curiosity can change everything.</p></div></section>
    <section class="hero-landscape" aria-label="The journey begins"><img src="/assets/atlas-horizon.svg" alt="Dreamlike lavender mountains beneath a glowing moon" /><div class="landscape-shade"></div><div class="hero-caption"><span class="tiny-star">✧ YOUR JOURNEY</span><strong>Every great story begins<br/>with a curious mind.</strong></div><div class="hero-moon">✦</div></section>
    <section class="stats-strip" aria-label="Your learning summary"><div class="stat-persona"><span class="flame-icon">${icon('flame',24)}</span><div><strong>Level ${Math.floor(done/6)+1} · ${done < 6?'Curious Learner':done < 24?'Knowledge Seeker':'Atlas Explorer'}</strong><span>${done} lessons finished</span></div></div>${bars(done % 6,6)}<span class="stat-next">${done%6}/6</span></section>
    ${last ? `<section class="resume-card"><div class="section-heading compact"><div><span class="overline">PICK UP WHERE YOU LEFT OFF</span><h2>Keep going</h2></div></div><button type="button" data-action="open-lesson" data-course="${esc(last.courseId)}" data-lesson="${esc(last.lessonId)}" class="resume-inner"><span class="resume-icon">${icon('play',22)}</span><span><strong>${esc(findLesson(last.courseId,last.lessonId).title)}</strong><small>${esc(findCourse(last.courseId).title)}</small></span>${chevron}</button></section>`:''}
    <section class="review-invite"><div class="review-invite-icon">${icon('orbit',27)}</div><div><span class="overline">MAKE KNOWLEDGE STICK</span><h2>Your Review Deck</h2><p>${reviewsDue ? `${plural(reviewsDue,'flashcard')} ready to practice.` : 'Complete a lesson to unlock its flashcard.'}</p></div>${button(`Practice ${icon('arrow',17)}`,'review','small-button')}</section>
    <section class="path-invite"><div class="path-invite-icon">${icon('compass',27)}</div><div><span class="overline">YOUR OWN ROADMAP</span><h2>Guided Learning Paths</h2><p>Pick a goal and get a seven-session plan that follows your progress.</p></div>${button('Plan my week','path','small-button')}</section>
    <section class="studio-invite"><div class="studio-invite-icon">${icon('briefcase',27)}</div><div><span class="overline">LEARN BY DOING</span><h2>The Practice Studio</h2><p>Build a savings goal, test a business, or map your week.</p></div>${button('Try a tool','studio','small-button')}</section>
    <section class="section"><div class="section-heading"><div><span class="overline">DISCOVER NEW WORLDS</span><h2>Explore & learn</h2></div>${button(`See all ${chevron}`,'goto-explore','text-action')}</div><div class="topic-grid">${COURSES.filter(c=>!c.dark).slice(0,6).map(c=>`<button type="button" class="topic-tile" data-action="open-course" data-id="${esc(c.id)}"><img class="topic-image" src="/assets/${esc(c.art)}.svg" alt="" loading="lazy" decoding="async"/><span class="topic-icon">${icon(c.icon,24)}</span><strong>${esc(c.title)}</strong></button>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><div><span class="overline">HANDPICKED FOR YOU</span><h2>Begin your journey</h2></div></div><div class="feature-scroller">${featured.map(c=>card(c)).join('')}</div></section>
    <section class="xyra-note"><div class="note-art"><img src="/assets/xyra-corner.svg" alt="Illustrated glowing book from Xyra's corner" loading="lazy" decoding="async" /></div><div><span class="overline">A LITTLE NOTE FROM XYRA</span><h2>From my corner to yours</h2><p>“${esc(note)}”</p>${button(`Explore my corner ${chevron}`,'open-corner','text-action')}</div></section>
    <section class="shadow-preview" data-action="open-course" data-id="shadow" role="button" tabindex="0" aria-label="Explore the Shadow Library, age 18 and older"><span class="shadow-thumb">${icon('moon',31)}</span><div><span class="overline">FOR GROWN-UP QUESTIONS</span><h3>The Shadow Library</h3><p>Power, deception, manipulation and adult realities—studied without illusions.</p></div><span>${chevron}</span></section>
  </main>`;
}
function partOfDay() { const h = new Date().getHours(); return h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'; }
function explore() {
  const matches = COURSES.filter(c=>{
    const haystack = `${c.title} ${c.subtitle} ${c.tag} ${c.lessons.map(l=>l.title).join(' ')}`.toLowerCase();
    const searchPass = haystack.includes(query.toLowerCase().trim());
    const typePass = filter==='all' || (filter==='mind' && ['psychology','relationships','thinking','communication'].includes(c.id)) || (filter==='skills' && ['business','savings','time','languages','career','digital','negotiation'].includes(c.id)) || (filter==='shadow' && c.dark);
    return searchPass && typePass;
  });
  return `<main class="page"><div class="page-title"><span class="overline">EXPLORE THE UNKNOWN</span><h1>What will you <em>learn?</em></h1><p>Your curiosity deserves somewhere beautiful to go.</p></div>
    <label class="search-box">${icon('search',19)}<input id="course-search" type="search" placeholder="Search knowledge, skills, lessons..." autocomplete="off" value="${esc(query)}" aria-label="Search courses"/></label>
    <div class="filter-row" aria-label="Filter subjects">${[['all','All'],['mind','Mindset'],['skills','Life skills'],['shadow','The shadows']].map(([id,label])=>button(esc(label),'filter',`filter-pill ${filter===id?'active':''}`,`data-id="${id}" aria-pressed="${filter===id}"`)).join('')}</div>
    <div class="section-heading list-title"><div><span class="overline">YOUR KNOWLEDGE LIBRARY</span><h2>${filter==='shadow'?'The hidden side':filter==='all'?'All subjects':'Subjects for you'}</h2></div><span class="result-count">${matches.length} ${matches.length===1?'subject':'subjects'}</span></div>
    <div class="course-list">${matches.length?matches.map(c=>card(c,'horizontal')).join(''):`<div class="empty-state">${icon('search',35)}<h3>No matches found</h3><p>Try another word, or browse all subjects.</p>${button('Show all subjects','reset-search','primary-button')}</div>`}</div>
    <div class="learning-invite"><div class="learning-invite-icon">${icon('languages',25)}</div><div><strong>Learning a new language?</strong><p>Choose one of 20 starting paths and try a seven-day sprint.</p></div>${button(chevron,'language','icon-button','aria-label="Open Language Lab"')}</div>
  </main>`;
}
function coursePage() {
  const c=findCourse(route.courseId);
  if(!c) return errorView();
  if(c.dark && !shadowUnlocked) { modal='shadow'; return explore(); }
  const done=courseProgress(c);
  const firstUnfinished=c.lessons.find(l=>!isCompleted(idFor(c.id,l.id))) || c.lessons[0];
  return `<main class="page course-page"><div class="subnav">${button(`${icon('back',18)} Back to learning`,'goto-explore','back-link')}${button(icon('heart',22),'favorite',`icon-button ${saved.favorites.includes(c.id)?'is-favorite':''}`,`data-id="${c.id}" aria-label="${saved.favorites.includes(c.id)?'Remove from':'Add to'} favorites"`)}</div>
    <div class="course-hero-art"><img src="/assets/${esc(c.art)}.svg" alt="Decorative illustration for ${esc(c.title)}"/><span class="hero-art-overlay"></span><span class="art-ornament">✦</span></div>
    <div class="course-meta"><span class="overline">${esc(c.tag)}</span>${c.dark?'<span class="adult-mini">18+</span>':''}</div>
    <h1 class="course-heading">${esc(c.title)}</h1><p class="course-lead">${esc(c.subtitle)}</p>
    <div class="course-facts"><span>${icon('book',17)} ${plural(c.lessons.length,'lesson')}</span><span>${icon('clock',17)} ${c.lessons.reduce((n,l)=>n+l.minutes,0)} min</span><span>${icon('chart',17)} Beginner → Advanced</span></div>
    <div class="course-progress"><div><strong>Your progress</strong><span>${done}/${c.lessons.length} lessons</span></div>${bars(done,c.lessons.length)}</div>
    ${button(`${icon('play',18)} ${done ? 'Continue learning' : 'Start learning'}`,'open-lesson','primary-button course-start',`data-course="${esc(c.id)}" data-lesson="${esc(firstUnfinished.id)}"`)}
    <div class="section-heading lesson-list-title"><div><span class="overline">A PATH WORTH TAKING</span><h2>Your lessons</h2></div></div>
    <div class="lesson-list">${c.lessons.map((l,i)=>`<button type="button" data-action="open-lesson" data-course="${esc(c.id)}" data-lesson="${esc(l.id)}" class="lesson-row"><span class="lesson-number ${isCompleted(idFor(c.id,l.id))?'done':''}">${isCompleted(idFor(c.id,l.id))?icon('check',19):String(i+1).padStart(2,'0')}</span><span class="lesson-info"><strong>${esc(l.title)}</strong><small>${esc(l.stage)} · ${l.minutes} min</small></span><span>${chevron}</span></button>`).join('')}</div>
    <p class="info-line">${icon('info',16)} Educational guidance, not a substitute for individualized legal, medical, financial or mental-health advice.</p>
  </main>`;
}
function lessonPage() {
  const c = findCourse(route.courseId), l = findLesson(route.courseId,route.lessonId);
  if (!c || !l) return errorView();
  if (c.dark && !shadowUnlocked) { modal='shadow'; return explore(); }
  const key=idFor(c.id,l.id), done=isCompleted(key);
  const idx=c.lessons.findIndex(item=>item.id===l.id);
  const next=c.lessons[idx+1];
  const chosen = saved.answers[key];
  return `<main class="page reading-page"><div class="subnav">${button(`${icon('back',18)} ${esc(c.title)}`,'open-course','back-link',`data-id="${esc(c.id)}"`)}${button(icon('bookmark',21),'bookmark',`icon-button ${isBookmarked(key)?'is-favorite':''}`,`data-key="${esc(key)}" aria-label="${isBookmarked(key)?'Remove bookmark':'Bookmark lesson'}"`)}</div>
    <div class="reading-head"><span class="overline">${esc(c.title)} · ${esc(l.stage)}</span><div class="reading-num">LESSON ${String(idx+1).padStart(2,'0')} OF ${String(c.lessons.length).padStart(2,'0')}</div><h1>${esc(l.title)}</h1><p>${esc(l.intro)}</p><span class="reading-time">${icon('clock',17)} ${l.minutes} min read & practice</span></div>
    <div class="reading-illustration"><img src="/assets/${esc(c.art)}.svg" alt=""/><span class="reading-illustration-glow">✧</span></div>
    <article class="lesson-content">${l.sections.map((s,i)=>`<section><div class="article-section-num">0${i+1} / LEARN</div><h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p></section>`).join('')}
      ${l.example ? `<aside class="worked-example"><span class="overline">WORKED EXAMPLE</span><h3>See it in action</h3><p>${esc(l.example)}</p></aside>` : ''}
      ${l.sources?.length ? `<aside class="lesson-sources"><span class="overline">CHECK THE ORIGINAL SOURCES</span><h3>Sources and further reading</h3><p>Lesson content works offline. Opening references requires internet. Check current legal and financial rules before relying on them.</p><ul>${l.sources.map(ref=>`<li><a href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">${esc(ref.label)} ↗</a></li>`).join('')}</ul></aside>` : ''}
      <div class="practice-box"><span class="overline">${icon('spark',16)} PUT IT INTO PRACTICE</span><h3>Try this today</h3><p>${esc(l.task)}</p></div>
      <section class="field-notebook"><span class="overline">${icon('book',16)} YOUR PRIVATE FIELD NOTEBOOK</span><h3>Write what you learned</h3><p>Respond to the exercise in your own words. Notes save automatically on this device, work offline, and are included in your JSON backup.</p><label for="field-note-input">Your exercise notes</label><textarea id="field-note-input" data-field-note="${esc(key)}" maxlength="${MAX_FIELD_NOTE_LENGTH}" rows="5" placeholder="Your thoughts, calculations, practice answers…">${esc(saved.fieldNotes[key]||'')}</textarea><small id="field-note-status" role="status">Private · Stored locally</small></section>
      <section class="quiz-box"><div class="article-section-num">CHECK YOUR UNDERSTANDING</div><h2>One small question</h2><p>${esc(l.quiz.question)}</p><div class="quiz-options">${l.quiz.options.map((option,i)=>`<button type="button" class="quiz-option ${chosen===i?'selected':''} ${chosen!==undefined && chosen===i && i===l.quiz.correct?'correct':''}" data-action="answer" data-key="${esc(key)}" data-index="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${esc(option)}</span>${chosen===i?icon('check',17):''}</button>`).join('')}</div>${chosen!==undefined?`<div class="quiz-feedback ${chosen===l.quiz.correct?'good':'retry'}">${icon(chosen===l.quiz.correct?'check':'info',19)}<span><strong>${chosen===l.quiz.correct?'Well done.':'Not quite—try again.'}</strong><br/>${esc(l.quiz.explanation)}</span></div>`:''}</section>
      ${done ? `<div class="complete-banner">${icon('check',22)} <span>You completed this lesson. Beautiful progress.</span></div>` : button(`${icon('check',18)} Mark lesson complete`,'complete',`primary-button complete-btn`, `data-key="${esc(key)}" ${chosen !== l.quiz.correct?'disabled title="Answer the check correctly to complete"':''}`)}
      ${next ? button(`Next lesson ${icon('arrow',18)}`,'open-lesson','secondary-button next-lesson',`data-course="${esc(c.id)}" data-lesson="${esc(next.id)}"`) : button(`Back to ${esc(c.title)} ${icon('arrow',18)}`,'open-course','secondary-button next-lesson',`data-id="${esc(c.id)}"`)}
    </article>
  </main>`;
}
function journey() {
  const done=finished(), active = COURSES.filter(c=>courseProgress(c)>0).sort((a,b)=>courseProgress(b)-courseProgress(a));
  const xp=done*60;
  return `<main class="page journey-page"><div class="page-title"><span class="overline">YOUR GROWTH IS YOURS</span><h1>Every step <em>counts.</em></h1><p>Not a race. A beautiful habit of becoming.</p></div>
    <div class="journey-banner"><div class="journey-aura">✧</div><span class="overline">YOUR ATLAS RANK</span><div class="journey-level">${Math.floor(done/6)+1}</div><h2>${done < 6?'Curious Learner':done<24?'Knowledge Seeker':'Atlas Explorer'}</h2><p>Keep exploring, one honest lesson at a time.</p>${bars(done%6,6)}<span class="subtle-count">${done%6} / 6 to next level</span></div>
    <div class="metrics-grid"><div><span class="metric-icon">${icon('book',22)}</span><strong>${done}</strong><small>Lessons learned</small></div><div><span class="metric-icon">${icon('flame',22)}</span><strong>${streak()}</strong><small>Day streak</small></div><div><span class="metric-icon">${icon('spark',22)}</span><strong>${xp}</strong><small>Knowledge XP</small></div></div>
    <section class="review-invite"><div class="review-invite-icon">${icon('orbit',27)}</div><div><span class="overline">ACTIVE RECALL</span><h2>Your Review Deck</h2><p>${plural(getDueReviews().length,'card')} due now, from your completed lessons.</p></div>${button('Open deck','review','small-button')}</section>
    <section class="studio-invite"><div class="studio-invite-icon">${icon('briefcase',27)}</div><div><span class="overline">APPLIED LEARNING</span><h2>Practice Studio</h2><p>Financial and time-planning experiments you can repeat.</p></div>${button('Open studio','studio','small-button')}</section>
    <section class="section"><div class="section-heading"><div><span class="overline">MOMENTS WORTH REMEMBERING</span><h2>Your milestones</h2></div></div><div class="badge-grid">${[['First Spark','Complete one lesson',done>=1,'spark'],['The Explorer','Complete six lessons',done>=6,'compass'],['Bookworm','Complete twenty lessons',done>=20,'book'],['The Constant','Visit for seven days',saved.dailyVisits.length>=7,'flame']].map(([name,desc,unlock,ico])=>`<div class="achievement ${unlock?'unlocked':''}"><div>${icon(ico,26)}</div><strong>${name}</strong><small>${desc}</small><span>${unlock?'Unlocked':'Locked'}</span></div>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><div><span class="overline">YOUR ONGOING JOURNEYS</span><h2>Learning paths</h2></div></div><div class="learning-paths">${active.length?active.map(c=>`<button type="button" class="path-row" data-action="open-course" data-id="${esc(c.id)}"><span class="path-icon">${icon(c.icon,23)}</span><span><strong>${esc(c.title)}</strong><small>${courseProgress(c)} of ${c.lessons.length} lessons</small>${bars(courseProgress(c),c.lessons.length)}</span>${chevron}</button>`).join(''):`<div class="empty-state">${icon('compass',34)}<h3>Your journey begins here</h3><p>Pick a subject, finish one lesson, and your path will appear here.</p>${button('Explore subjects','goto-explore','primary-button')}</div>`}</div></section>
  </main>`;
}
const peso = n => new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(n);
function pathPage() {
  const plan=saved.learningPath;
  const goal=PATH_GOALS.find(x=>x.id===plan?.goal);
  const progress=pathProgress(plan,saved.completed);
  const goalOptions=PATH_GOALS.map(x=>`<option value="${x.id}" ${plan?.goal===x.id?'selected':''}>${esc(x.title)}</option>`).join('');
  const budgetOptions=PATH_BUDGETS.map(n=>`<option value="${n}" ${plan?.minutes===n||(!plan&&n===20)?'selected':''}>${n} minutes per day</option>`).join('');
  return `<main class="page path-page"><div class="subnav">${button(`${icon('back',18)} Back to journey`,'goto-journey','back-link')}</div>
    <section class="path-hero"><img src="/assets/course-library.svg" alt=""/><div><span class="overline">SEVEN SESSIONS, ONE PURPOSE</span><h1>Find your <em>path.</em></h1><p>A personal study map made from real Atlas lessons. No rigid streaks, no account, no internet.</p></div></section>
    <div class="path-config"><h2>Shape your journey</h2><div class="path-fields"><label><span>Your learning focus</span><select id="path-goal" class="styled-select">${goalOptions}</select></label><label><span>Time you can give each day</span><select id="path-minutes" class="styled-select">${budgetOptions}</select></label></div>${button(`${icon('spark',17)} ${plan?'Build a fresh path':'Create my path'}`,'create-path','primary-button')}<p class="fineprint">Plans use the lessons you haven't finished. Rebuilding replaces your current schedule, but never erases lesson progress or notes.</p></div>
    ${plan ? `<section class="path-progress"><span class="overline">${esc(goal?.title||'YOUR LEARNING PATH')}</span><h2>${progress.done} of ${progress.total} lessons completed</h2>${bars(progress.done,progress.total)}<p>${progress.total?`${progress.percent}% of your roadmap. Your progress updates when you finish a lesson quiz.`:"You have completed the available lessons for this focus."}</p></section>
      <div class="path-days">${plan.days.map((day,i)=>`<section class="path-day"><div class="path-day-heading"><span class="path-day-number">${String(i+1).padStart(2,'0')}</span><div><span class="overline">SESSION ${i+1}</span><h3>${day.length?'A little further':'A moment to reflect'}</h3></div><small>${day.reduce((sum,x)=>sum+x.minutes,0)} min</small></div>
        ${day.length?day.map(item=>{const course=findCourse(item.courseId),lesson=findLesson(item.courseId,item.lessonId),done=isCompleted(idFor(item.courseId,item.lessonId));return `<button type="button" class="path-lesson ${done?'path-done':''}" data-action="open-lesson" data-course="${esc(item.courseId)}" data-lesson="${esc(item.lessonId)}"><span class="path-lesson-icon">${done?icon('check',18):icon(course?.icon||'book',20)}</span><span><strong>${esc(lesson?.title||'Lesson')}</strong><small>${esc(course?.title||'Atlas')} · ${item.minutes} min</small></span><span>${done?'Done':chevron}</span></button>`;}).join(''):`<p class="fineprint">You have already completed the available lessons in this area. Choose another focus or review earlier material.</p>`}</section>`).join('')}</div>` : `<div class="path-empty">${icon('compass',36)}<h2>Your first map awaits.</h2><p>Choose what matters to you and the time available. Atlas will turn it into a realistic seven-session learning plan.</p></div>`}
    <p class="info-line">${icon('info',16)} A learning plan is a flexible guide, not a promise of mastery in seven days. Plans and progress remain on your device and are included in backups.</p>
  </main>`;
}

function studioPage(){
  const kind=studioTab, values=saved.studio[kind];
  const config={
    savings:[["expenses","Monthly essential expenses","Necessary monthly living costs",100000000],["current","Current emergency savings","Money available for emergencies",1000000000],["contribution","Saved each month","Realistic recurring contribution",100000000],["coverage","Months to cover","A goal between 1 and 24",24]],
    business:[["price","Selling price per item","Revenue from one unit",100000000],["variable","Variable cost per item","Materials, packaging and fees",100000000],["fixed","Monthly fixed costs","Rent and recurring overhead",1000000000],["units","Monthly units sold","Your scenario, not a demand forecast",10000000]],
    time:[["sleep","Sleep per night","Hours multiplied by seven",24],["work","Work per week","Include school or employment",168],["commute","Travel per week","Travel and waiting time",168],["care","Care and chores","Meals, household and care needs",168],["study","Planned learning","Weekly hours for learning",168]]
  };
  const titles={savings:"Your emergency fund",business:"Business break-even",time:"Your weekly time map"};
  const art={savings:"course-savings",business:"course-business",time:"course-time"};
  const field=([key,title,hint,max])=>`<label class="studio-field" for="studio-${key}"><span>${esc(title)}</span><input type="number" inputmode="decimal" id="studio-${key}" name="${key}" data-studio-field="${kind}" value="${values[key]}" min="${kind==='savings'&&key==='coverage'?1:0}" max="${max}" step="any" required /><small>${esc(hint)}</small></label>`;
  const metric=(name,value,help)=>`<div class="studio-metric"><small>${esc(name)}</small><strong>${esc(value)}</strong><span>${esc(help)}</span></div>`;
  let details="";
  if(kind==="savings"){
    const r=calculateSavings(values);
    details=metric("Target",peso(r.goal),"Essential monthly costs × target months")+metric("Remaining",peso(r.gap),"Target minus available savings")+metric("Months to goal",r.months===null?"Not scheduled":String(r.months),r.months===null?"Choose a regular contribution":"Assumes steady saving and no withdrawals")+`<div class="studio-meter-label"><span>Funded so far</span><strong>${Math.round(r.percent)}%</strong></div><div class="studio-meter"><span style="width:${r.percent}%"></span></div><p class="studio-reading">${r.monthsCovered===null?'Enter monthly expenses to calculate coverage.':`Your current money covers roughly ${r.monthsCovered.toFixed(1)} months of these expenses.`} Keep emergency funds accessible; this estimate is not a guarantee.</p>`;
  }else if(kind==="business"){
    const r=calculateBusiness(values);
    details=metric("Contribution per unit",peso(r.contribution),"Price minus variable cost")+metric("Break-even units",r.breakEvenUnits===null?"Not possible":`${r.breakEvenUnits.toLocaleString("en-PH")}`,"Units needed to cover fixed costs")+metric("Operating result",peso(r.profit),r.profit>=0?"Before taxes and omitted costs":"Projected shortfall")+`<p class="studio-reading">This model assumes a constant price, cost and units sold. Validate actual demand, fees, taxes and cash flow separately.</p>`;
  }else{
    const r=calculateTime(values);
    details=metric("Allocated",`${r.allocated.toFixed(1)} h`,"Includes seven nights of sleep")+metric("Unallocated",`${r.remaining.toFixed(1)} h`,"Not automatically leisure time")+metric("Overbooked",`${r.overbooked.toFixed(1)} h`,"Over the 168-hour weekly limit")+`<div class="studio-meter-label"><span>Weekly hours planned</span><strong>${Math.round(r.percent)}%</strong></div><div class="studio-meter"><span style="width:${r.percent}%"></span></div><p class="studio-reading">Leave buffer time for rest, relationships and surprises. This is a planning aid, not a productivity score.</p>`;
  }
  return `<main class="page studio-page"><div class="subnav">${button(`${icon('back',18)} Back to journey`,'goto-journey','back-link')}</div>
    <div class="studio-hero"><img src="/assets/${art[kind]}.svg" alt=""/><div class="studio-hero-copy"><span class="overline">LEARN BY DOING</span><h1>Practice <em>Studio.</em></h1><p>Turn ideas into real scenarios. Everything works offline and stays on your device.</p></div></div>
    <div class="studio-tabs" aria-label="Practice tools">${[['savings','Savings'],['business','Business'],['time','Time']].map(([id,label])=>button(label,'studio-tab',`studio-tab ${kind===id?'active':''}`,`data-id="${id}" aria-pressed="${kind===id}"`)).join('')}</div>
    <section class="studio-workspace"><div class="studio-workspace-intro"><span class="overline">PRACTICAL EXERCISE</span><h2>${titles[kind]}</h2><p>Adjust the numbers and update the scenario to see how the outcome changes.</p></div>
    <div id="atlas-studio" class="studio-fields">${config[kind].map(field).join('')}</div><div class="studio-actions">${button(`${icon('check',17)} Update scenario`,'studio-calc','primary-button')}${button('Restore example','studio-reset','secondary-button')}</div><div class="studio-results" aria-live="polite"><span class="overline">YOUR SCENARIO</span><div class="studio-metrics">${details}</div></div></section>
    <p class="info-line">${icon('info',16)} Educational estimates only; not personalized financial or professional advice. Your entries are saved locally and included in JSON backups.</p></main>`;
}
function reviewPage() {
  const learned = new Set(saved.completed);
  const unlockedCards = reviewCards.filter(card => learned.has(card.id) && (!card.dark || shadowUnlocked));
  const due = getDueReviews();
  const card = due[0];
  return `<main class="page review-page"><div class="subnav">${button(`${icon('back',18)} Back to journey`,'goto-journey','back-link')}</div>
    <div class="page-title"><span class="overline">KNOWLEDGE THAT STAYS</span><h1>Your <em>Review Deck.</em></h1><p>Recall what you learned, then check the answer. The next review is scheduled automatically—entirely on this device.</p></div>
    <div class="review-metrics"><div><strong>${due.length}</strong><small>Due now</small></div><div><strong>${unlockedCards.length}</strong><small>Unlocked cards</small></div><div><strong>${unlockedCards.length - due.length}</strong><small>Scheduled later</small></div></div>
    ${card ? `<div class="review-flashcard"><span class="overline">${esc(card.courseTitle)} · ${esc(card.title)}</span><span class="review-card-counter">${plural(due.length,'card')} ready</span><h2>${esc(card.question)}</h2>
       ${reviewRevealed ? `<div class="review-answer"><span class="overline">THE ANSWER</span><h3>${esc(card.answer)}</h3><p>${esc(card.explanation)}</p></div>
         <p class="review-guidance">Did you remember it before revealing the answer?</p><div class="review-actions">${button(`${icon('clock',18)} Practice again`,'rate-review','secondary-button',`data-outcome="again" data-id="${esc(card.id)}"`)}${button(`${icon('check',18)} I remembered`,'rate-review','primary-button',`data-outcome="remembered" data-id="${esc(card.id)}"`)}</div>` : button(`${icon('book',19)} Reveal answer`,'reveal-review','primary-button review-reveal')}
    </div>` : `<div class="review-empty"><span class="review-empty-orbit">✦</span><h2>${unlockedCards.length ? 'All caught up!' : 'Your first flashcard awaits.'}</h2><p>${unlockedCards.length ? 'You have reviewed everything due for now. Return when the next card is ready.' : 'Complete a lesson and its quiz to unlock your first practice card.'}</p>${button('Explore lessons','goto-explore','primary-button')}</div>`}
    <div class="review-info">${icon('info',20)}<span>Forgotten cards return after 10 minutes. Remembered cards return after 1, 3, 7, 14, 30 and 60 days. Your answers and next review times are saved in your local backup.</span></div>
  </main>`;
}
function savedPage() {
  const favorites=COURSES.filter(c=>saved.favorites.includes(c.id) && (!c.dark || shadowUnlocked));
  const entries=saved.bookmarks.map(key=>{ const [cid,...rest]=key.split(':');const lid=rest.join(':');const c=findCourse(cid),l=findLesson(cid,lid);return c&&l&&(!c.dark||shadowUnlocked)?{c,l,key}:null;}).filter(Boolean);
  return `<main class="page"><div class="page-title"><span class="overline">A LIBRARY THAT REMEMBERS</span><h1>Your <em>saved</em> pages.</h1><p>Keep the knowledge you want to return to.</p></div>
    <section class="section"><div class="section-heading"><div><span class="overline">BACK TO WHAT MATTERS</span><h2>Favorite subjects</h2></div></div><div class="course-list">${favorites.length?favorites.map(c=>card(c,'horizontal')).join(''):`<p class="empty-text">Tap the heart on a subject to keep it here.</p>`}</div></section>
    <section class="section"><div class="section-heading"><div><span class="overline">YOUR PERSONAL REFERENCES</span><h2>Bookmarked lessons</h2></div></div><div class="lesson-list">${entries.length?entries.map(({c,l,key})=>`<button type="button" class="lesson-row" data-action="open-lesson" data-course="${esc(c.id)}" data-lesson="${esc(l.id)}"><span class="lesson-number">${icon('bookmark',19)}</span><span class="lesson-info"><strong>${esc(l.title)}</strong><small>${esc(c.title)} · ${l.minutes} min</small></span>${chevron}</button>`).join(''):`<p class="empty-text">Bookmark a lesson while reading to find it here later.</p>`}</div></section>
  </main>`;
}
function languagePage() {
  const language=LANGUAGES.find(x=>x.code===saved.language)||LANGUAGES[1];
  const completedDays=LEARNING_SPRINT.filter((_,i)=>saved.languageDays.includes(`${saved.language}:${i}`)).length;
  return `<main class="page language-page"><div class="subnav">${button(`${icon('back',18)} Back to learning`,'goto-explore','back-link')}</div>
    <div class="language-hero"><img src="/assets/course-languages.svg" alt="Decorative travel-inspired landscape"/><div><span class="overline">LET THE WORLD IN</span><h1>Language <em>Lab.</em></h1><p>One small conversation at a time.</p></div></div>
    <div class="section"><div class="section-heading"><div><span class="overline">CHOOSE YOUR STARTING POINT</span><h2>Pick a language</h2></div></div><label class="field-label" for="language-select">Your learning language</label><select id="language-select" aria-label="Choose a language" class="styled-select">${LANGUAGES.map(x=>`<option value="${x.code}" ${saved.language===x.code?'selected':''}>${x.flag} ${esc(x.name)}</option>`).join('')}</select><p class="fineprint">This is a reusable practice plan, not a translated course or a promise of native-level fluency. Verified lessons and audio for each language will be added in later content releases.</p></div>
    <div class="sprint-head"><div><span class="overline">YOUR SEVEN-DAY LAUNCH</span><h2>${language.flag} ${esc(language.name)} sprint</h2><p>Practice 20–30 minutes daily. Build a practical foundation.</p></div><strong>${completedDays}/7</strong></div>${bars(completedDays,7)}
    <div class="sprint-list">${LEARNING_SPRINT.map(([title,description],i)=>`<button type="button" class="sprint-day ${saved.languageDays.includes(`${saved.language}:${i}`)?'complete':''}" data-action="toggle-day" data-id="${i}"><span class="day-check">${saved.languageDays.includes(`${saved.language}:${i}`)?icon('check',17):`0${i+1}`}</span><span><small>DAY ${i+1}</small><strong>${esc(title)}</strong><em>${esc(description)}</em></span></button>`).join('')}</div>
    ${(() => { const pack=getPhrasePack(saved.language);if(!pack)return `<section class="phrase-lab"><h2>Phrase pack coming soon</h2><p>The seven-day practice plan remains available while this language's lessons are prepared.</p></section>`;const words=pack.phrases,word=words[phraseIndex%words.length],known=saved.phrases[saved.language]||[];return `<section class="phrase-lab"><div class="phrase-head"><span class="overline">OFFLINE PHRASE PRACTICE</span><h2>Practice for real</h2><p>${known.length} of ${words.length} learned</p></div>${bars(known.length,words.length)}<div class="phrase-card"><small>CARD ${phraseIndex%words.length+1} OF ${words.length}</small><h3>${esc(word.english)}</h3>${phraseRevealed?`<div class="phrase-answer" lang="${esc(pack.locale)}"><strong>${esc(word.target)}</strong><small>${esc(word.pronunciation)}</small></div><div class="phrase-buttons">${button(`${icon('play',17)} Listen`,'phrase-speak','secondary-button')}${button(known.includes(word.id)?'Learned ✓':'Mark learned','phrase-known','secondary-button')}</div>`:button('Reveal translation','phrase-reveal','primary-button')}<div class="phrase-controls">${button('Previous','phrase-prev','text-action')}${button(`Next phrase ${icon('arrow',16)}`,'phrase-next','text-action')}</div></div><p class="fineprint">Speak before revealing. Playback requires a compatible installed device voice. Marking learned is a self-assessment.</p></section>`;})()}
    <div class="language-callout">${icon('info',22)}<p><strong>From beginner to native-like?</strong> That's a long-term journey. In one week, target greetings, essential questions and short conversations. Real proficiency grows through months and years of meaningful use.</p></div>
  </main>`;
}
function you() {
  return `<main class="page you-page"><div class="page-title"><span class="overline">YOUR LITTLE CORNER OF THE WORLD</span><h1>Made for <em>you.</em></h1><p>Private progress. Your pace. Your rules.</p></div>
    <div class="profile-card"><div class="profile-avatar">✦</div><div><span class="overline">ATLAS EXPLORER</span><h2>${esc(actualName())}</h2><p>Level ${Math.floor(finished()/6)+1} · ${finished()} lessons completed</p></div></div>
    <div class="settings-panel"><h2>Make it yours</h2><label class="field-label" for="profile-name">What should Atlas call you?</label><div class="name-row"><input id="profile-name" value="${esc(saved.userName)}" maxlength="40" placeholder="Curious learner"/>${button('Save','save-name','small-button')}</div><div class="settings-row"><span class="setting-icon">${icon(saved.theme==='dark'?'moon':'sun',21)}</span><div><strong>Appearance</strong><small>Switch between twilight and daylight</small></div>${button(saved.theme==='dark'?'Dark':'Light','theme','small-button')}</div><div class="settings-row"><span class="setting-icon">${icon(navigator.onLine?'wifi':'wifi-off',21)}</span><div><strong>Connection</strong><small>Lessons are included in your offline app</small></div><span class="setting-value">${navigator.onLine?'Online':'Offline'}</span></div><div class="settings-row"><span class="setting-icon">${icon('download',21)}</span><div><strong>Install Xyra Atlas</strong><small>Keep it on your phone's home screen</small></div>${button('How?','install','small-button')}</div></div>
    <div class="settings-panel"><h2>Your data, your choice</h2><p class="settings-description">Progress is stored only in this browser on this device. It is not synced to a server. Export a backup before switching phones or clearing browser data.</p><div class="data-actions">${button(`${icon('download',18)} Export backup`,'export','secondary-button')}${button(`${icon('upload',18)} Import backup`,'import','secondary-button')}${button(`${icon('trash',18)} Reset progress`,'reset-dialog','outline-danger')}</div><input type="file" id="backup-file" accept=".json,application/json" hidden /></div>
    <div class="settings-panel"><h2>About Xyra Atlas</h2><p class="settings-description">A pocket atlas for the art of living—designed for curiosity, independence and the courage to learn difficult things.</p><p class="fineprint">Foundation 0.4 · Language Lab edition. Some subjects are introductions, not complete professional courses. Laws vary by jurisdiction. Adult content is educational. There are no ads, trackers or accounts in this edition.</p>${button(`A note from Xyra ${chevron}`,'open-corner','text-action')}</div>
  </main>`;
}
function errorView() { return `<main class="page"><div class="empty-state">${icon('compass',34)}<h2>This page wandered off the map.</h2><p>Let's find your way back.</p>${button('Go home','goto-home','primary-button')}</div></main>`; }
function modalView() {
  if (!modal) return '';
  const inner = modal==='shadow' ? `<div class="modal-icon dark-icon">${icon('moon',28)}</div><span class="overline">A DIFFERENT KIND OF LESSON</span><h2>Enter the Shadow Library?</h2><p>This section explores manipulation, coercive behavior, psychological pressure, deception, adult intimacy, and sexual health. The purpose is understanding and informed choice—not abuse or exploitation.</p><div class="age-warning">${icon('info',19)} Contains mature educational discussions intended for adults 18+.</div><label class="checkbox-label"><input type="checkbox" id="age-agree" ${gateConfirmed?'checked':''}/><span>I am at least 18, and I understand the purpose of this material.</span></label>${button(`Enter the library ${icon('arrow',18)}`,'enter-shadow','primary-button',gateConfirmed?'':'disabled')}` :
  modal==='install' ? `<div class="modal-icon">${icon('download',26)}</div><span class="overline">TAKE YOUR ATLAS WITH YOU</span><h2>Install Xyra Atlas</h2><p>After the first successful online visit, the app shell and included lessons can work offline once fully cached.</p><div class="install-steps"><strong>On iPhone / iPad</strong><p>Open this website in Safari. Tap Share, then “Add to Home Screen” and enable “Open as Web App”.</p><strong>On Android</strong><p>Open in Chrome. Use the browser menu and select “Install app” or “Add to Home screen”, when available.</p></div>${installEvent?button(`Install now ${icon('download',18)}`,'install-prompt','primary-button'):''}<p class="fineprint">Installing does not automatically sync data across phones. Use Export/Import backup to transfer progress.</p>` :
  modal==='reset' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Reset your Atlas?</h2><p>All lesson progress, saved lessons, language sprint checks and preferences on this browser will be erased. Export a backup first if you need it.</p>${button('Cancel','close-modal','secondary-button')}${button('Erase my local progress','confirm-reset','outline-danger')}` :
  modal==='corner' ? `<div class="modal-icon">${icon('spark',26)}</div><span class="overline">XYRA'S CORNER</span><h2>A little note, just for you ♡</h2><p>“You are allowed to be new at something. You are allowed to ask strange questions. And you are allowed to change your mind when you learn more.”</p><div class="xyra-signature">With curiosity, Xyra ✦</div><p class="fineprint">One thought I want to leave you with: knowledge is power, but wisdom is knowing when and how to use it.</p>` :
  modal==='updates' ? `<div class="modal-icon">${icon('book',26)}</div><span class="overline">ABOUT THIS EDITION</span><h2>Welcome to your pocket atlas</h2><p>This first release includes ${COURSES.length} subjects and ${totalLessons} interactive lessons, quizzes, a language sprint, bookmarks, progress tracking and offline caching.</p><p>More detailed lessons, original illustrations, interactive simulations and referenced materials will be built into later releases. You can export your progress at any time.</p>` : '';
  return `<div class="modal-backdrop" data-action="close-modal"><div class="modal-card" role="dialog" aria-modal="true" aria-label="Xyra Atlas dialog" data-stop="true">${button(icon('close',21),'close-modal','modal-close','aria-label="Close dialog"')}${inner}</div></div>`;
}
function render() {
  document.documentElement.dataset.theme=saved.theme;
  document.body.classList.toggle('dialog-open',Boolean(modal));
  const view = route.view;
  const content = ({home,explore,journey,review:reviewPage,studio:studioPage,path:pathPage,saved:savedPage,you,course:coursePage,lesson:lessonPage,language:languagePage}[view] || errorView)();
  document.getElementById('app').innerHTML = `${topbar()}<div class="shell"><aside class="desktop-rail"><div class="rail-title">YOUR ATLAS <span>✧</span></div>${[['home','Home','home'],['explore','Explore & Learn','compass'],['journey','My Journey','spark'],['saved','Saved Library','bookmark'],['you','Your Space','user']].map(([id,label,ico])=>`<button type="button" data-action="nav" data-id="${id}" class="rail-link ${tabForRoute()===id?'active':''}">${icon(ico,20)} ${label}</button>`).join('')}<div class="rail-divider"></div><button type="button" class="rail-link" data-action="review">${icon('orbit',20)} Review Deck</button><button type="button" class="rail-link" data-action="path">${icon('compass',20)} Guided Path</button><button type="button" class="rail-link" data-action="studio">${icon('briefcase',20)} Practice Studio</button><button type="button" class="rail-link" data-action="language">${icon('languages',20)} Language Lab</button><button type="button" class="rail-link" data-action="open-course" data-id="shadow">${icon('moon',20)} Shadow Library</button><div class="rail-note">✦<p>The world is a little bigger every time you learn.</p></div></aside><div class="main-column">${content}<footer class="app-footer">Made with curiosity, for a life still unfolding. <span>✧ Xyra Atlas</span></footer></div></div>${navBar()}${modalView()}${currentToast?`<div class="toast" role="status">${icon('spark',19)} ${esc(currentToast)}</div>`:''}`;
  document.title = `${view==='course' ? findCourse(route.courseId)?.title+' · ':view==='lesson' ? findLesson(route.courseId,route.lessonId)?.title+' · ' : ''}Xyra Atlas`;
}
function toggle(list,value) { saved[list]=saved[list].includes(value)?saved[list].filter(x=>x!==value):[...saved[list],value];persist();render(); }
function answerBackup(e) {
  const file=e.target.files?.[0]; if (!file) return;
  if (file.size > 1024*1024) {flash('Backup is too large.');return;}
  const reader=new FileReader();
  reader.onload=()=>{
    try {
      const data=JSON.parse(String(reader.result));
      if(data.format!=='xyra-atlas-backup' || data.version!==1 || !data.state || !Array.isArray(data.state.completed)) throw new Error('Not a compatible Xyra Atlas backup.');
      const clean=data.state;
      saved={...initial,
        completed:clean.completed.filter(x=>typeof x==='string'),
        bookmarks:Array.isArray(clean.bookmarks)?clean.bookmarks.filter(x=>typeof x==='string'):[],
        favorites:Array.isArray(clean.favorites)?clean.favorites.filter(x=>typeof x==='string'):[],
        answers:clean.answers && typeof clean.answers==='object'&&!Array.isArray(clean.answers)?clean.answers:{},
        reviews:normalizeReviews(clean.reviews),
        studio:sanitizeStudio(clean.studio),
        learningPath:normalizeLearningPath(clean.learningPath,COURSES),
        fieldNotes:normalizeFieldNotes(clean.fieldNotes),
        dailyVisits:Array.isArray(clean.dailyVisits)?clean.dailyVisits.filter(x=>/^\d{4}-\d{2}-\d{2}$/.test(x)):[],
        lastOpened:clean.lastOpened&&typeof clean.lastOpened==='object'?clean.lastOpened:null,
        theme:clean.theme==='light'?'light':'dark',
        language:LANGUAGES.some(x=>x.code===clean.language)?clean.language:'ja',
        languageDays:Array.isArray(clean.languageDays)?clean.languageDays.filter(x=>typeof x==='string'):[],
        phrases:sanitizePhraseProgress(clean.phrases),
        userName:typeof clean.userName==='string'?clean.userName.slice(0,40):''
      };
      visitToday(); persist();flash('Backup imported successfully.');
    }catch(err){flash('Import failed: '+(err instanceof Error?err.message:'Invalid file'));}
  };
  reader.readAsText(file);
}
function exportBackup() {
  const blob=new Blob([JSON.stringify({format:'xyra-atlas-backup',version:1,exportedAt:new Date().toISOString(),state:saved},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=`xyra-atlas-backup-${today()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);flash('Backup exported. Store it somewhere safe.');
}
async function handleAction(e) {
  const button=e.target.closest('[data-action]'); if(!button) return;
  if(e.target.closest('[data-stop]') && button.dataset.action==='close-modal' && !button.classList.contains('modal-close')) return;
  const action=button.dataset.action, id=button.dataset.id;
  if(action==='goto-home') nav('home');
  else if(action==='goto-explore'||action==='search') {query='';filter='all';nav('explore'); if(action==='search') requestAnimationFrame(()=>document.getElementById('course-search')?.focus());}
  else if(action==='nav') {if(id==='explore') {query='';filter='all';}nav(id);}
  else if(action==='theme') {saved.theme=saved.theme==='dark'?'light':'dark';persist();render();}
  else if(action==='filter') {filter=id;render();}
  else if(action==='reset-search') {query='';filter='all';render();}
  else if(action==='open-course') {const c=findCourse(id);if(!c)return; if(c.dark&&!shadowUnlocked){gateConfirmed=false;modal='shadow';render();return;}nav(`course/${c.id}`);}
  else if(action==='open-lesson') {const cid=button.dataset.course, lid=button.dataset.lesson;const c=findCourse(cid);if(c?.dark&&!shadowUnlocked){gateConfirmed=false;modal='shadow';render();return;} if(findLesson(cid,lid)){saved.lastOpened={courseId:cid,lessonId:lid};persist();nav(`lesson/${cid}/${lid}`);}}
  else if(action==='favorite') toggle('favorites',id);
  else if(action==='bookmark') toggle('bookmarks',button.dataset.key);
  else if(action==='answer') {saved.answers[button.dataset.key]=Number(button.dataset.index);persist();render();}
  else if(action==='complete') {if(button.disabled)return;const key=button.dataset.key;const [cid,lid]=key.split(':');const l=findLesson(cid,lid);if(l && saved.answers[key]===l.quiz.correct && !isCompleted(key)){saved.completed.push(key);persist();flash('Lesson complete. You earned 60 XP ✦');}}
  else if(action==='language') nav('language');
  else if(action==='goto-journey') nav('journey');
  else if(action==='review') {reviewRevealed=false;nav('review');}
  else if(action==='path') nav('path');
  else if(action==='create-path') {const goal=document.getElementById('path-goal')?.value;const minutes=Number(document.getElementById('path-minutes')?.value);const stamp=new Date().toISOString().slice(0,10);const next=createLearningPath(COURSES,goal,minutes,saved.completed,stamp);if(!next){flash('No unfinished lessons fit this focus and study time. Try another goal.');return;}saved.learningPath=next;persist();flash('Your seven-session learning path is ready!');}
  else if(action==='studio') nav('studio');
  else if(action==='studio-tab') {if(['savings','business','time'].includes(id)){studioTab=id;render();}}
  else if(action==='studio-reset') {saved.studio[studioTab]={...STUDIO_DEFAULTS[studioTab]};persist();flash('Restored this practice example.');}
  else if(action==='studio-calc') {const fields=[...document.querySelectorAll('[data-studio-field]')];const invalid=fields.find(el=>!el.checkValidity());if(invalid){invalid.reportValidity();return;}const values=Object.fromEntries(fields.map(el=>[el.name,el.value]));saved.studio[studioTab]=sanitizeStudio({[studioTab]:values})[studioTab];persist();flash('Your scenario is updated.');}
  else if(action==='reveal-review') {reviewRevealed=true;render();}
  else if(action==='rate-review') {const card=getDueReviews()[0];if(!card||!reviewRevealed||id!==card.id)return;const outcome=button.dataset.outcome;if(!['again','remembered'].includes(outcome))return;saved.reviews[card.id]=recordReview(saved.reviews[card.id],outcome);reviewRevealed=false;persist();flash(outcome==='remembered'?'Nice recall! Your next review is scheduled.':'Good practice. This card returns in 10 minutes.');}
  else if(action==='toggle-day') toggle('languageDays',`${saved.language}:${id}`);
  else if(action==='phrase-reveal'){phraseRevealed=true;render();}
  else if(action==='phrase-next'||action==='phrase-prev'){const p=getPhrasePack(saved.language);if(!p)return;phraseIndex=(phraseIndex+(action==='phrase-next'?1:p.phrases.length-1))%p.phrases.length;phraseRevealed=false;render();}
  else if(action==='phrase-known'){const p=getPhrasePack(saved.language);if(!p)return;const word=p.phrases[phraseIndex%p.phrases.length];const known=new Set(saved.phrases[saved.language]||[]);known.has(word.id)?known.delete(word.id):known.add(word.id);saved.phrases[saved.language]=[...known];persist();render();}
  else if(action==='phrase-speak'){const p=getPhrasePack(saved.language);if(!p)return;const w=p.phrases[phraseIndex%p.phrases.length];if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){flash('Speech is not available on this device.');return;}try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(w.target);u.lang=p.locale;u.rate=.85;speechSynthesis.speak(u);}catch{flash('Speech is not available on this device.');}}
  else if(action==='save-name') {saved.userName=(document.getElementById('profile-name')?.value||'').trim().slice(0,40);persist();flash('Your name is saved on this device.');}
  else if(action==='install') {modal='install';render();}
  else if(action==='install-prompt' && installEvent) {const prompt=installEvent;installEvent=null;modal='';render();try{await prompt.prompt();}catch{flash('Use your browser menu to install.');}}
  else if(action==='import') document.getElementById('backup-file')?.click();
  else if(action==='export') exportBackup();
  else if(action==='reset-dialog') {modal='reset';render();}
  else if(action==='confirm-reset') {saved={...initial};visitToday();persist();modal='';nav('home');flash('Local progress reset.');}
  else if(action==='close-modal') {modal='';if(['course','lesson'].includes(route.view)&&route.courseId==='shadow'&&!shadowUnlocked)nav('explore');else render();}
  else if(action==='enter-shadow') {if(!gateConfirmed)return;shadowUnlocked=true;modal='';nav('course/shadow');}
  else if(action==='open-corner') {modal='corner';render();}
  else if(action==='open-updates') {modal='updates';render();}
}
document.addEventListener('click',handleAction);
document.addEventListener('change',e=>{
  if(e.target.id==='language-select') {saved.language=e.target.value;phraseIndex=0;phraseRevealed=false;persist();render();}
  if(e.target.id==='age-agree') {gateConfirmed=e.target.checked;const btn=document.querySelector('[data-action="enter-shadow"]');if(btn)btn.disabled=!gateConfirmed;}
  if(e.target.id==='backup-file') answerBackup(e);
});
document.addEventListener('input',e=>{
  if (e.target.matches?.('textarea[data-field-note]')) {
    const key=e.target.dataset.fieldNote;
    const [cid,lid] = (key || '').split(':');
    if (findLesson(cid,lid)) {
      saved.fieldNotes=setFieldNote(saved.fieldNotes,key,e.target.value);
      persist();
      const status=document.getElementById('field-note-status');
      if(status) status.textContent='Saved on this device · Export a backup to keep it safe';
    }
  }
  if(e.target.id==='course-search') {const pos=e.target.selectionStart;query=e.target.value;render();const input=document.getElementById('course-search');if(input){input.focus();try{input.setSelectionRange(pos,pos);}catch{}}}
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal){modal='';if(['course','lesson'].includes(route.view)&&route.courseId==='shadow'&&!shadowUnlocked)nav('explore');else render();} if((e.key==='Enter'||e.key===' ')&&e.target.classList?.contains('shadow-preview')) {e.preventDefault();gateConfirmed=false;modal='shadow';render();}});
window.addEventListener('hashchange',()=>{reviewRevealed=false;route=parseHash();if(route.view==='course'&&route.courseId==='shadow'&&!shadowUnlocked)modal='shadow';if(route.view==='lesson'&&route.courseId==='shadow'&&!shadowUnlocked)modal='shadow';render();});
window.addEventListener('online',render);window.addEventListener('offline',render);
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e;});
if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  window.addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{/* App remains usable online */}));
}
if(route.view==='course'&&route.courseId==='shadow') modal='shadow';
if(route.view==='lesson'&&route.courseId==='shadow') modal='shadow';
render();
