import { COURSES, LANGUAGES, LEARNING_SPRINT, DAILY_NOTES, findCourse, findLesson, totalLessons } from './data.js';
import { makeReviewCards, dueReviewCards, recordReview, normalizeReviews } from './review.js';
import { searchGlossary,GLOSSARY } from './glossary.js';
import { SEARCH_KINDS,buildSearchIndex,searchAtlas } from './search.js';
import { localDayKey,validDayKey,countVisitStreak } from './calendar.js';
import { summarizeLearning,activityCalendar } from './insights.js';
import { mentorMoment } from './mentor.js';
import { READER_SIZES,normalizeReaderPreferences,setReaderSize,toggleReaderFocus } from './reader.js';
import {createChapterMap} from './visualmap.js';
import {getChapterArt} from './chapterart.js';
import {buildLessonNarration} from './narration.js';
import {parseStoredEnvelope,storageHealthMessage} from './storagehealth.js';
import {normalizeOfflineReport,offlineAdvice} from './offline.js';
import {parseBackupEnvelope,normalizeLessonKeys,normalizeQuizAnswers,normalizeLastOpened,backupCounts} from './backup.js';
import {encryptBackup,decryptBackup,isEncryptedBackup} from './backupcrypto.js';
import {EXAM_SIZES,examPool,createExam,normalizeExam,currentExamQuestion,answerExam,advanceExam,examResults} from './exam.js';
import {normalizeExamHistory,recordExamHistory,examHistoryInsights} from './examhistory.js';
import {focusQuestionPool,createFocusedExam} from './focusedexam.js';
import {PERSONAL_CARD_LIMIT,CARD_FRONT_LIMIT,CARD_BACK_LIMIT,normalizePersonalCards,createPersonalCard,updatePersonalCard,deletePersonalCard,duePersonalCards,ratePersonalCard,searchPersonalCards} from './personalcards.js';
import {buildNotebookIndex,searchNotebook} from './notebook.js';
import {normalizeMistakes,recordQuizAttempt,buildMistakeQueue} from './mistakes.js';
import { createDailyQuest,dailyQuestProgress } from './dailyquest.js';
import { buildKnowledgeMap } from './atlasmap.js';
import { SCENARIOS,normalizeScenarioAnswers,recordScenarioAnswer,scenarioProgress } from './scenarios.js';
import { CASE_FILES,getCaseFile,evaluateCase,normalizeCasebook,advanceCase,resetCase,casebookStats } from './casebook.js';
import { STUDIO_DEFAULTS, sanitizeStudio, calculateSavings, calculateBusiness, calculateTime } from './studio.js';
import { PHRASEBOOK,getPhrasePack, sanitizePhraseProgress } from './phrasebook.js';
import {normalizeLanguageSpeechRate,matchingLanguageVoices,languageVoiceAvailability,chooseOfflineLanguageVoice,languageVoiceMessage} from './voicecoach.js';
import {normalizePhraseReviews,duePhraseReviews,phraseReviewStats,ratePhraseReview,clearPhraseReviews} from './phrasereview.js';
import {LANGUAGE_CHALLENGE_MODES,createLanguageChallenge,normalizeLanguageChallenge,currentLanguageQuestion,answerLanguageChallenge,advanceLanguageChallenge,languageChallengeResults,normalizeLanguageChallengeHistory,recordLanguageChallengeHistory} from './languagechallenge.js';
import {CONVERSATION_QUESTS,createConversationQuest,normalizeConversationQuest,currentConversationQuestion,answerConversationQuestion,advanceConversationQuest,conversationQuestResults,normalizeConversationQuestHistory,recordConversationQuestHistory} from './conversationquest.js';
import { normalizeFieldNotes, setFieldNote, MAX_FIELD_NOTE_LENGTH } from './fieldnotes.js';
import {normalizeCapstoneChecks,capstoneCheckProgress,setCapstoneCheck,clearCapstoneChecks} from './capstonechecks.js';

import { PATH_GOALS, PATH_BUDGETS, createLearningPath, normalizeLearningPath, pathProgress } from './paths.js';

const STORAGE_KEY = 'xyra-atlas-state-v1';
let storageProblem=null;
let recoveryRaw=null;
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const plain = text => esc(text).replace(/\n/g, '<br>');
function createInitialState(){return { completed: [], bookmarks: [], favorites: [], answers: {}, reviews: {}, fieldNotes: {}, capstoneChecks: {}, lastOpened: null, dailyVisits: [], theme: 'dark', language: 'ja', languageSpeechRate:0.9, languageDays: [], phrases: {}, phraseReviews:{}, languageChallenge:null, languageChallengeHistory:{}, conversationQuest:null, conversationQuestHistory:{}, studio: sanitizeStudio(null), userName: '', welcomeDismissed: false, learningPath: null, scenarios: {}, casebook: {}, mistakes:{}, exam:null, examHistory:[], personalCards:[], reader:normalizeReaderPreferences(null) };}
function readStored() {
  try {
    const raw=localStorage.getItem(STORAGE_KEY);
    const envelope=parseStoredEnvelope(raw);
    if(envelope.status==='corrupt'){storageProblem='corrupt';recoveryRaw=raw;return createInitialState();}
    const data=envelope.value;
    return {
      ...createInitialState(),
      ...data,
      completed: Array.isArray(data.completed) ? data.completed.filter(x => typeof x === 'string') : [],
      bookmarks: Array.isArray(data.bookmarks) ? data.bookmarks.filter(x => typeof x === 'string') : [],
      favorites: Array.isArray(data.favorites) ? data.favorites.filter(x => typeof x === 'string') : [],
      dailyVisits: Array.isArray(data.dailyVisits) ? data.dailyVisits.filter(validDayKey).slice(-400) : [],
      languageDays: Array.isArray(data.languageDays) ? data.languageDays.filter(x => typeof x === 'string') : [],
      languageSpeechRate:normalizeLanguageSpeechRate(data.languageSpeechRate),
      phrases: sanitizePhraseProgress(data.phrases),
      phraseReviews:normalizePhraseReviews(data.phraseReviews,PHRASEBOOK),
      languageChallenge:normalizeLanguageChallenge(data.languageChallenge,PHRASEBOOK),
      languageChallengeHistory:normalizeLanguageChallengeHistory(data.languageChallengeHistory,PHRASEBOOK),
      conversationQuest:normalizeConversationQuest(data.conversationQuest,PHRASEBOOK),
      conversationQuestHistory:normalizeConversationQuestHistory(data.conversationQuestHistory,PHRASEBOOK),
      answers: data.answers && typeof data.answers === 'object' && !Array.isArray(data.answers) ? data.answers : {},
      reviews: normalizeReviews(data.reviews),
      studio: sanitizeStudio(data.studio),
      scenarios: normalizeScenarioAnswers(data.scenarios),
      casebook: normalizeCasebook(data.casebook),
      mistakes:normalizeMistakes(data.mistakes,COURSES),
      exam:normalizeExam(data.exam,COURSES),
      examHistory:normalizeExamHistory(data.examHistory,COURSES),
      personalCards:normalizePersonalCards(data.personalCards,COURSES),
      reader: normalizeReaderPreferences(data.reader),
      learningPath: normalizeLearningPath(data.learningPath,COURSES),
      fieldNotes: normalizeFieldNotes(data.fieldNotes),
       capstoneChecks:normalizeCapstoneChecks(data.capstoneChecks,COURSES),
      theme: data.theme === 'light' ? 'light' : 'dark',
      language: LANGUAGES.some(x => x.code === data.language) ? data.language : 'ja',
      userName: typeof data.userName === 'string' ? data.userName.slice(0,40) : ''
    };
  } catch {storageProblem='read-failed';return createInitialState();}
}
let saved = readStored();
const reviewCards = makeReviewCards(COURSES);
const atlasSearchIndex = buildSearchIndex(COURSES,GLOSSARY,SCENARIOS,CASE_FILES);
let reviewRevealed = false;
let mistakeFeedback=null;
let mistakeIndex=0;
let phraseRevealed = false, phraseIndex = 0;
let phraseReviewRevealed=false;
let languageVoiceURI='';
let languageAudioToken=0;
let languageChallengePendingMode='recognition';
let conversationQuestPendingId='directions';
let studioTab = 'savings';
const getDueReviews = () => dueReviewCards(reviewCards, saved.completed, saved.reviews, Date.now(), shadowUnlocked);
let route = parseHash();
let filter = 'all';
let courseStageFilter='all';
let query = '';
let glossaryQuery = '';
let globalQuery = '';
let globalSearchKind = 'all';
let notebookQuery='';
let personalCardQuery='';
let personalCardEditingId=null;
let personalCardRevealed=false;
let personalCardPendingDelete=null;
let modal = '';
let pendingBackup=null;
let encryptedFile=null;
let unlockBusy=false;
let gateConfirmed = false;
let shadowUnlocked = false; // A content acknowledgment, not a secure identity or age verification system.
let installEvent = null;
let toastTimer;
let currentToast = '';
let lessonAudio = null;
let offlinePack={state:'idle',cached:0,total:0,ready:false,percent:0,version:'unknown'};
let offlineJob=0;
let offlineUpdateWaiting=false;
let offlineUpdateApplying=false;
const watchedOfflineRegistrations=new WeakSet();
const today = () => localDayKey(new Date());
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
  // Preserve unreadable original storage until the person explicitly imports or resets.
  if(storageProblem==='corrupt'||storageProblem==='read-failed')return false;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));storageProblem=null;return true; }
  catch {
    storageProblem='write-failed';
    if(!storageWarningShown){
      storageWarningShown=true;
      queueMicrotask(() => flash('Progress could not be saved. Export a backup before closing the app.'));
    }
    return false;
  }
}
function visitToday() {
  const date = today();
  if (!wasVisited(date)) { saved.dailyVisits = [...new Set([...saved.dailyVisits, date])].slice(-400); persist(); }
}
visitToday();
function streak() { return countVisitStreak(saved.dailyVisits); }
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
  let decoded;
  try { decoded=decodeURIComponent(location.hash.replace(/^#\/?/, '')); }
  catch { return {view:'home'}; } // Broken percent-encoding must not blank the application.
  const segments=decoded.split('/').filter(Boolean);
  if (segments[0] === 'course' && segments[1]) return {view:'course', courseId:segments[1]};
  if (segments[0] === 'lesson' && segments[1] && segments[2]) return {view:'lesson', courseId:segments[1], lessonId:segments[2]};
  if (segments[0] === 'language') return {view:'language'};
  if (segments[0] === 'review') return {view:'review'};
  if (segments[0] === 'exam') return {view:'exam'};
  if (segments[0] === 'studio') return {view:'studio'};
  if (segments[0] === 'map') return {view:'map'};
  if (segments[0] === 'quest') return {view:'quest'};
  if (segments[0] === 'glossary') return {view:'glossary'};
  if (segments[0] === 'insights') return {view:'insights'};
  if (segments[0] === 'mentor') return {view:'mentor'};
  if (segments[0] === 'search') return {view:'search'};
  if (segments[0] === 'offline') return {view:'offline'};
  if (segments[0] === 'notebook') return {view:'notebook'};
  if (segments[0] === 'personalcards') return {view:'personalcards'};
  if (segments[0] === 'mistakes') return {view:'mistakes'};
  if (segments[0] === 'scenario') return {view:'scenario'};
  if (segments[0] === 'casebook') return {view:'casebook',caseId:segments[1]||null};
  if (segments[0] === 'path') return {view:'path'};
  if (['home','explore','journey','saved','you'].includes(segments[0])) return {view:segments[0]};
  return {view:'home'};
}
function nav(path) { const next = '#/' + path; if (location.hash === next) { route = parseHash(); render(); } else location.hash = next; window.scrollTo({top:0,behavior:'instant'}); }
function flash(text) { currentToast = text; clearTimeout(toastTimer); render(); toastTimer = setTimeout(() => {currentToast = '';render();},3200); }
function tabForRoute() { return ['notebook','personalcards'].includes(route.view)?'saved':route.view==='offline'?'you':['review','studio','path','scenario','casebook','quest','insights','mistakes','exam'].includes(route.view) ? 'journey' : ['course','lesson','language','map','glossary','search','mentor'].includes(route.view) ? 'explore' : route.view; }
function topbar() {
  return `<header class="topbar"><div class="topbar-inner">
    <button type="button" class="wordmark" data-action="goto-home" aria-label="Xyra Atlas home">${mark}<span>Xyra <em>Atlas</em></span></button>
    <div class="top-actions"><span class="status-dot" title="${navigator.onLine ? 'Online' : 'Offline'}"></span>${button(icon('search',21),'search','icon-button','aria-label="Search courses"')}${button(icon(saved.theme === 'dark' ? 'sun':'moon',21),'theme','icon-button','aria-label="Toggle appearance"')}${offlineUpdateWaiting?button(icon('download',19),'offline-open','icon-button update-ready-topbar','aria-label="Atlas update ready to install"'):''}${button(icon('bell',20),'open-updates','icon-button','aria-label="About the app"')}</div>
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
    <section class="hero-landscape hero-archive" aria-label="The Celestial Archive Gate">
    <img src="/assets/atlas-archive-gate.svg" alt="An illuminated celestial arch above purple mountains and a moonlit lake" fetchpriority="high" decoding="async"/>
    <div class="landscape-shade" aria-hidden="true"></div>
    <div class="hero-caption"><span class="tiny-star">✦ THE ARCHIVE IS OPEN</span><strong>Every question is<br/>a doorway.</strong><p>Thirteen worlds of everyday discovery, and one hidden library of difficult questions.</p>${button('Enter the Atlas','goto-explore','hero-enter-button')}</div>
    <div class="hero-moon" aria-hidden="true">✧</div>
  </section>
    <section class="stats-strip" aria-label="Your learning summary"><div class="stat-persona"><span class="flame-icon">${icon('flame',24)}</span><div><strong>Level ${Math.floor(done/6)+1} · ${done < 6?'Curious Learner':done < 24?'Knowledge Seeker':'Atlas Explorer'}</strong><span>${done} lessons finished</span></div></div>${bars(done % 6,6)}<span class="stat-next">${done%6}/6</span></section>
    <section class="atlas-scene-section" aria-labelledby="atlas-scene-heading"><div class="section-heading"><div><span class="overline">FOLLOW THE LIGHT</span><h2 id="atlas-scene-heading">Choose your next doorway</h2><p class="atlas-scene-lead">Original illustrated worlds woven into the Atlas. Wander, discover, and return whenever you're ready.</p></div></div>
     <div class="atlas-scene-grid">
      <article class="atlas-scene-card"><img src="/assets/atlas-lantern-library.svg" alt="Starlit library interior with a glowing manuscript, grand arched window and bookshelves" loading="lazy" decoding="async"/><div class="atlas-scene-overlay" aria-hidden="true"></div><div class="atlas-scene-copy"><span class="overline">THE LANTERN LIBRARY</span><h3>Meet your guide</h3><p>Quiet moments and a note from Xyra.</p>${button('Visit Xyra’s Corner','open-corner','scene-link')}</div></article>
      <article class="atlas-scene-card"><img src="/assets/atlas-starlit-garden.svg" alt="Twilight flowering garden with a winding path toward a glowing stone observatory" loading="lazy" decoding="async"/><div class="atlas-scene-overlay" aria-hidden="true"></div><div class="atlas-scene-copy"><span class="overline">THE STARLIT PATH</span><h3>Find your constellation</h3><p>Explore how fourteen learning worlds connect.</p>${button('See the knowledge map','map','scene-link')}</div></article>
     </div>
    </section>
    ${last ? `<section class="resume-card"><div class="section-heading compact"><div><span class="overline">PICK UP WHERE YOU LEFT OFF</span><h2>Keep going</h2></div></div><button type="button" data-action="open-lesson" data-course="${esc(last.courseId)}" data-lesson="${esc(last.lessonId)}" class="resume-inner"><span class="resume-icon">${icon('play',22)}</span><span><strong>${esc(findLesson(last.courseId,last.lessonId).title)}</strong><small>${esc(findCourse(last.courseId).title)}</small></span>${chevron}</button></section>`:''}
    <section class="review-invite"><div class="review-invite-icon">${icon('orbit',27)}</div><div><span class="overline">MAKE KNOWLEDGE STICK</span><h2>Your Review Deck</h2><p>${reviewsDue ? `${plural(reviewsDue,'flashcard')} ready to practice.` : 'Complete a lesson to unlock its flashcard.'}</p></div>${button(`Practice ${icon('arrow',17)}`,'review','small-button')}</section>
    <section class="path-invite"><div class="path-invite-icon">${icon('compass',27)}</div><div><span class="overline">YOUR OWN ROADMAP</span><h2>Guided Learning Paths</h2><p>Pick a goal and get a seven-session plan that follows your progress.</p></div>${button('Plan my week','path','small-button')}</section>
    <section class="casebook-invite"><span class="casebook-icon">✧</span><div><span class="overline">STORIES SHAPED BY YOUR CHOICES</span><h2>Interactive Case Files</h2><p>Practice decisions through branching stories with different outcomes.</p></div>${button('Explore cases','casebook','small-button')}</section>
    <section class="scenario-invite"><div class="studio-invite-icon">${icon('compass',27)}</div><div><span class="overline">THINK BEFORE YOU ACT</span><h2>Scenario Lab</h2><p>Six real-life decisions with feedback and explanations.</p></div>${button('Open lab','scenario','small-button')}</section>
    <section class="studio-invite"><div class="studio-invite-icon">${icon('briefcase',27)}</div><div><span class="overline">LEARN BY DOING</span><h2>The Practice Studio</h2><p>Build a savings goal, test a business, or map your week.</p></div>${button('Try a tool','studio','small-button')}</section>
    <section class="daily-quest-invite"><div class="quest-gem">✦</div><div><span class="overline">THREE SMALL STEPS</span><h2>Today's Quest</h2><p>Two lessons and one practical decision. Learn at your pace.</p></div>${button('Start quest','quest','small-button')}</section>
    <section class="glossary-invite"><div><span class="overline">WORDS THAT OPEN DOORS</span><h2>The Knowledge Glossary</h2><p>Understand useful ideas quickly, with real examples.</p></div>${button('Explore terms','glossary','small-button')}</section>
    <section class="atlas-map-invite"><div><span class="overline">EXPLORE THE CONSTELLATION</span><h2>See the worlds of learning</h2><p>Navigate all fourteen illustrated subjects as a connected knowledge map.</p></div>${button('Open map','map','small-button')}</section>
    <section class="section"><div class="section-heading"><div><span class="overline">DISCOVER NEW WORLDS</span><h2>Explore & learn</h2></div>${button(`See all ${chevron}`,'goto-explore','text-action')}</div><div class="topic-grid">${COURSES.filter(c=>!c.dark).slice(0,6).map(c=>`<button type="button" class="topic-tile" data-action="open-course" data-id="${esc(c.id)}"><img class="topic-image" src="/assets/${esc(c.art)}.svg" alt="" loading="lazy" decoding="async"/><span class="topic-icon">${icon(c.icon,24)}</span><strong>${esc(c.title)}</strong></button>`).join('')}</div></section>
    <section class="section"><div class="section-heading"><div><span class="overline">HANDPICKED FOR YOU</span><h2>Begin your journey</h2></div></div><div class="feature-scroller">${featured.map(c=>card(c)).join('')}</div></section>
    <section class="xyra-note"><div class="note-art"><img src="/assets/xyra-guide.svg" alt="Illustration of Xyra, the amethyst guide" loading="lazy" decoding="async" /></div><div><span class="overline">A LITTLE NOTE FROM XYRA</span><h2>From my corner to yours</h2><p>“${esc(note)}”</p>${button(`Explore my corner ${chevron}`,'open-corner','text-action')}</div></section>
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
  const stages=['Beginner','Intermediate','Advanced'];
  const stageCount=stage=>c.lessons.filter(l=>l.stage===stage).length;
  const visible=c.lessons.map((lesson,index)=>({lesson,index})).filter(item=>courseStageFilter==='all'||item.lesson.stage===courseStageFilter);
  return `<main class="page course-page"><div class="subnav">${button(`${icon('back',18)} Back to learning`,'goto-explore','back-link')}${button(icon('heart',22),'favorite',`icon-button ${saved.favorites.includes(c.id)?'is-favorite':''}`,`data-id="${c.id}" aria-label="${saved.favorites.includes(c.id)?'Remove from':'Add to'} favorites"`)}</div>
    <div class="course-hero-art"><img src="/assets/${esc(c.art)}.svg" alt="Decorative illustration for ${esc(c.title)}"/><span class="hero-art-overlay"></span><span class="art-ornament">✦</span></div>
    <div class="course-meta"><span class="overline">${esc(c.tag)}</span>${c.dark?'<span class="adult-mini">18+</span>':''}</div>
    <h1 class="course-heading">${esc(c.title)}</h1><p class="course-lead">${esc(c.subtitle)}</p>
    <div class="course-facts"><span>${icon('book',17)} ${plural(c.lessons.length,'lesson')}</span><span>${icon('clock',17)} ${c.lessons.reduce((n,l)=>n+l.minutes,0)} min</span><span>${icon('chart',17)} Beginner → Advanced</span></div>
    <div class="course-progress"><div><strong>Your progress</strong><span>${done}/${c.lessons.length} lessons</span></div>${bars(done,c.lessons.length)}</div>
    ${button(`${icon('play',18)} ${done ? 'Continue learning' : 'Start learning'}`,'open-lesson','primary-button course-start',`data-course="${esc(c.id)}" data-lesson="${esc(firstUnfinished.id)}"`)}
    <div class="section-heading lesson-list-title"><div><span class="overline">A PATH WORTH TAKING</span><h2>Your lessons</h2></div></div>
    <div class="course-stage-tabs" role="group" aria-label="Filter lessons by learning level">${[['all','All levels',c.lessons.length],...stages.map(stage=>[stage,stage,stageCount(stage)])].map(([id,label,count])=>button(`${esc(label)} <span>${count}</span>`,'course-stage-filter',`course-stage-button ${courseStageFilter===id?'selected':''}`,`data-id="${esc(id)}" aria-pressed="${courseStageFilter===id}"`)).join('')}</div>
    <div class="lesson-list">${visible.map(({lesson:l,index:i})=>`<button type="button" data-action="open-lesson" data-course="${esc(c.id)}" data-lesson="${esc(l.id)}" class="lesson-row"><span class="lesson-number ${isCompleted(idFor(c.id,l.id))?'done':''}">${isCompleted(idFor(c.id,l.id))?icon('check',19):String(i+1).padStart(2,'0')}</span><span class="lesson-info"><strong>${esc(l.title)}</strong><small>${esc(l.stage)} · ${l.minutes} min${l.isCapstone?" · Applied lab":""}</small></span><span>${chevron}</span></button>`).join('')}</div>
    <p class="info-line">${icon('info',16)} Educational guidance, not a substitute for individualized legal, medical, financial or mental-health advice.</p>
  </main>`;
}
function lessonAudioAvailable(){return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;}
function syncLessonAudioUI(){
 if(route.view!=='lesson')return;
 const key=idFor(route.courseId,route.lessonId),active=lessonAudio?.key===key;
 const start=document.getElementById('lesson-audio-start'),pause=document.getElementById('lesson-audio-pause'),stop=document.getElementById('lesson-audio-stop'),status=document.getElementById('lesson-audio-status');
 if(start)start.hidden=active;
 if(pause){pause.hidden=!active;pause.textContent=lessonAudio?.paused?'Resume listening':'Pause listening';pause.setAttribute('aria-pressed',String(Boolean(lessonAudio?.paused)));}
 if(stop)stop.hidden=!active;
 if(status)status.textContent=active?(lessonAudio.paused?'Narration paused':`Listening to part ${lessonAudio.index+1} of ${lessonAudio.parts.length}`):lessonAudioAvailable()?'Uses an available browser speech voice. Playback quality varies by device.':'Speech playback is not supported by this browser.';
}
function stopLessonAudio(){
 lessonAudio=null;
 if(lessonAudioAvailable())try{window.speechSynthesis.cancel();}catch{}
 syncLessonAudioUI();
}
function speakNextLessonChunk(){
 const context=lessonAudio;
 if(!context||context.paused)return;
 if(context.index>=context.parts.length){stopLessonAudio();return;}
 const u=new SpeechSynthesisUtterance(context.parts[context.index]);
 u.lang='en-US';u.rate=.94;
 context.utterance=u;
 u.onend=()=>{if(lessonAudio!==context||context.utterance!==u)return;context.index++;speakNextLessonChunk();};
 u.onerror=(event)=>{if(lessonAudio!==context||context.utterance!==u)return;stopLessonAudio();if(event.error!=='interrupted'&&event.error!=='canceled')flash('Narration stopped. Try another browser voice.');};
 try{window.speechSynthesis.speak(u);syncLessonAudioUI();}catch{stopLessonAudio();flash('Speech playback is unavailable on this device.');}
}
function startLessonAudio(){
 if(!lessonAudioAvailable()){flash('Speech playback is unavailable in this browser.');return;}
 const c=findCourse(route.courseId),l=findLesson(route.courseId,route.lessonId);
 if(!c||!l||c.dark&&!shadowUnlocked)return;
 const parts=buildLessonNarration(c,l);
 if(!parts.length){flash('This lesson has no narration content.');return;}
 stopLessonAudio();lessonAudio={key:idFor(c.id,l.id),parts,index:0,utterance:null,paused:false};
 speakNextLessonChunk();
}

function lessonPage() {
  const c = findCourse(route.courseId), l = findLesson(route.courseId,route.lessonId);
  if (!c || !l) return errorView();
  if (c.dark && !shadowUnlocked) { modal='shadow'; return explore(); }
  const key=idFor(c.id,l.id), done=isCompleted(key);
  const idx=c.lessons.findIndex(item=>item.id===l.id);
  const next=c.lessons[idx+1];
  const chosen = saved.answers[key];
  const chapterMap=createChapterMap(c,l);
  const chapterArt=getChapterArt(c.id,l.id);
  const capstoneReview=l.isCapstone?capstoneCheckProgress(saved.capstoneChecks,key,COURSES):null;
  return `<main class="page reading-page" data-reader-size="${esc(saved.reader.size)}"><div class="subnav">${button(`${icon('back',18)} ${esc(c.title)}`,'open-course','back-link',`data-id="${esc(c.id)}"`)}${button(icon('bookmark',21),'bookmark',`icon-button ${isBookmarked(key)?'is-favorite':''}`,`data-key="${esc(key)}" aria-label="${isBookmarked(key)?'Remove bookmark':'Bookmark lesson'}"`)}</div>
    <div class="reading-head"><span class="overline">${esc(c.title)} · ${esc(l.stage)}${l.isCapstone?" · APPLIED CAPSTONE":""}</span><div class="reading-num">LESSON ${String(idx+1).padStart(2,'0')} OF ${String(c.lessons.length).padStart(2,'0')}</div><h1>${esc(l.title)}</h1><p>${esc(l.intro)}</p><span class="reading-time">${icon('clock',17)} ${l.minutes} min read & practice</span></div>
    <div class="reader-toolbar" role="group" aria-label="Reading preferences"><div class="reader-toolbar-label">${icon('book',18)} Reading comfort</div><div class="reader-size-group" role="group" aria-label="Text size">${READER_SIZES.map(item=>button(esc(item.label),'reader-size',`reader-size-button ${saved.reader.size===item.id?'selected':''}`,`data-id="${item.id}" aria-pressed="${saved.reader.size===item.id}"`)).join('')}</div>${button(saved.reader.focus?`${icon('check',16)} Focus on`:`${icon('spark',16)} Focus mode`,'reader-focus',`reader-focus-button ${saved.reader.focus?'selected':''}`,`aria-pressed="${saved.reader.focus}"`)}</div>
    <section class="lesson-audio-panel" aria-label="Listen to this lesson"><span class="lesson-audio-symbol">${icon('play',20)}</span><div class="lesson-audio-description"><strong>Listen to this lesson</strong><small id="lesson-audio-status" role="status">Uses an available browser speech voice. Playback quality varies by device.</small></div><div class="lesson-audio-actions"><button type="button" data-action="lesson-audio-start" id="lesson-audio-start" class="reader-audio-button" ${lessonAudioAvailable()?'':'disabled aria-disabled="true"'}>Listen</button><button type="button" data-action="lesson-audio-pause" id="lesson-audio-pause" class="reader-audio-button" hidden aria-pressed="false">Pause listening</button><button type="button" data-action="lesson-audio-stop" id="lesson-audio-stop" class="reader-audio-stop" hidden>Stop</button></div></section>
    <figure class="reading-illustration ${chapterArt?'chapter-art-feature':''}">
      <img src="${chapterArt?esc(chapterArt.src):'/assets/'+esc(c.art)+'.svg'}" alt="${chapterArt?esc(chapterArt.alt):''}" decoding="async"/>
      <span class="reading-illustration-glow" aria-hidden="true">✧</span>
      ${chapterArt?`<figcaption class="chapter-art-caption"><span class="overline">AN ILLUSTRATED CASE</span><strong>${esc(chapterArt.title)}</strong><span>${esc(chapterArt.caption)}</span></figcaption>`:''}
    </figure>
    <section class="chapter-map" aria-label="Visual chapter map"><div class="chapter-map-heading"><div><span class="overline">SEE THE BIG PICTURE</span><h2>Your learning constellation</h2><p>Follow the connected ideas, or jump straight to a section.</p></div><span class="chapter-map-count">${chapterMap.steps.length} insights</span></div><div class="chapter-map-track">${chapterMap.steps.map((step,i)=>`<button type="button" class="chapter-map-node" data-action="jump-chapter" data-index="${i}" aria-label="Jump to section ${i+1}: ${esc(step.heading)}"><span class="chapter-map-bubble">${step.label}</span><span class="chapter-map-node-text"><strong>${esc(step.heading)}</strong><small>${esc(step.preview)}</small></span><span class="chapter-map-go">${icon('arrow',16)}</span></button>`).join('')}</div>${chapterMap.practice?`<button type="button" class="chapter-map-practice" data-action="jump-chapter" data-index="practice"><span class="chapter-map-practice-icon">${icon('spark',18)}</span><span><strong>${esc(chapterMap.practice.heading)}</strong><small>${esc(chapterMap.practice.preview)}</small></span><span>${icon('arrow',16)}</span></button>`:''}</section>
    <article class="lesson-content">${l.sections.map((s,i)=>`<section id="lesson-section-${i}"><div class="article-section-num">0${i+1} / LEARN</div><h2>${esc(s.heading)}</h2><p>${esc(s.body)}</p></section>`).join('')}
      ${l.example ? `<aside class="worked-example"><span class="overline">WORKED EXAMPLE</span><h3>See it in action</h3><p>${esc(l.example)}</p></aside>` : ''}
      ${l.sources?.length ? `<aside class="lesson-sources"><span class="overline">CHECK THE ORIGINAL SOURCES</span><h3>Sources and further reading</h3><p>Lesson content works offline. Opening references requires internet. Check current legal and financial rules before relying on them.</p><ul>${l.sources.map(ref=>`<li><a href="${esc(ref.url)}" target="_blank" rel="noopener noreferrer">${esc(ref.label)} ↗</a></li>`).join('')}</ul></aside>` : ''}
      <div class="practice-box" id="lesson-practice"><span class="overline">${icon('spark',16)} ${l.isCapstone?'YOUR CAPSTONE CASE':'PUT IT INTO PRACTICE'}</span><h3>${l.isCapstone?'Complete the case exercise':'Try this today'}</h3><p>${esc(l.task)}</p></div>
      ${capstoneReview && Array.isArray(l.rubric) ? `<aside class="capstone-rubric" aria-label="Self-check your capstone"><div class="capstone-rubric-head"><span class="overline">PROOF OF UNDERSTANDING</span><h3>Check your work before finishing</h3><p>Use these criteria to improve the response in your private notebook. These are self-reported checks, not an automatically graded assessment or professional certification.</p><p id="capstone-check-status" role="status">${capstoneReview.count} of ${capstoneReview.total} criteria reviewed · Saved on this device</p></div><ol>${l.rubric.map((item,i)=>`<li class="${capstoneReview.checked[i]?'is-reviewed':''}"><label class="capstone-rubric-check"><input type="checkbox" data-capstone-check data-key="${esc(key)}" data-index="${i}" ${capstoneReview.checked[i]?'checked':''}/><span>${esc(item)}</span></label></li>`).join('')}</ol><div class="capstone-rubric-actions">${button('Clear my checks','capstone-checks-clear','secondary-button',`data-key="${esc(key)}"`)}</div><p class="fineprint">Your checklist and written notes are saved separately, and included in your Atlas progress backup. Checking all criteria never automatically completes a lesson.</p></aside>` : ''}
      <section class="field-notebook"><span class="overline">${icon('book',16)} YOUR PRIVATE FIELD NOTEBOOK</span><h3>Write what you learned</h3><p>Respond to the exercise in your own words. Notes save automatically on this device, work offline, and are included in your JSON backup.</p><label for="field-note-input">Your exercise notes</label><textarea id="field-note-input" data-field-note="${esc(key)}" maxlength="${MAX_FIELD_NOTE_LENGTH}" rows="5" placeholder="Your thoughts, calculations, practice answers…">${esc(saved.fieldNotes[key]||'')}</textarea><small id="field-note-status" role="status">Private · Stored locally</small></section>
      <section class="quiz-box"><div class="article-section-num">CHECK YOUR UNDERSTANDING</div><h2>One small question</h2><p>${esc(l.quiz.question)}</p><div class="quiz-options">${l.quiz.options.map((option,i)=>`<button type="button" class="quiz-option ${chosen===i?'selected':''} ${chosen!==undefined && chosen===i && i===l.quiz.correct?'correct':''}" data-action="answer" data-key="${esc(key)}" data-index="${i}"><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${esc(option)}</span>${chosen===i?icon('check',17):''}</button>`).join('')}</div>${chosen!==undefined?`<div class="quiz-feedback ${chosen===l.quiz.correct?'good':'retry'}">${icon(chosen===l.quiz.correct?'check':'info',19)}<span><strong>${chosen===l.quiz.correct?'Well done.':'Not quite—try again.'}</strong><br/>${esc(l.quiz.explanation)}</span></div>`:''}</section>
      ${done ? `<div class="complete-banner">${icon('check',22)} <span>You completed this lesson. Beautiful progress.</span></div>` : button(`${icon('check',18)} Mark lesson complete`,'complete',`primary-button complete-btn`, `data-key="${esc(key)}" ${chosen !== l.quiz.correct?'disabled title="Answer the check correctly to complete"':''}`)}
      ${next ? button(`Next lesson ${icon('arrow',18)}`,'open-lesson','secondary-button next-lesson',`data-course="${esc(c.id)}" data-lesson="${esc(next.id)}"`) : button(`Back to ${esc(c.title)} ${icon('arrow',18)}`,'open-course','secondary-button next-lesson',`data-id="${esc(c.id)}"`)}
    </article>
  </main>`;
}


function examHistoryPanel(){
 const report=examHistoryInsights(saved.examHistory,COURSES);
 if(!report.attempts)return `<section class="exam-insights exam-insights-empty"><span class="overline">PRACTICE HISTORY</span><h2>Your progress through practice</h2><p>Completed challenges appear here with private subject scores and lessons worth revisiting. Scores are study signals, not qualifications.</p></section>`;
 const subjects=report.subjects.slice(0,6),focus=report.focus;
 const available=focusQuestionPool(COURSES,saved.examHistory).length;
 return `<section class="exam-insights" aria-label="Practice history"><div class="exam-insights-heading"><div><span class="overline">YOUR PRIVATE PRACTICE HISTORY</span><h2>Patterns worth noticing</h2><p>Based only on completed practice exams in this browser. Lower scores identify questions to revisit, not your overall ability.</p></div>${button('Clear history','exam-history-clear','secondary-button')}</div>
 <div class="exam-insights-metrics"><div><strong>${report.attempts}</strong><span>Recent exams</span></div><div><strong>${report.correct}/${report.total}</strong><span>Answers correct</span></div><div><strong>${report.percent}%</strong><span>Across recorded questions</span></div></div>
 <div class="exam-insights-columns"><div><h3>Practice by subject</h3><div class="exam-insights-subjects">${subjects.map(a=>`<div class="exam-insights-subject"><div class="exam-insights-subject-label"><span>${esc(a.title)}</span><strong>${a.correct}/${a.total} · ${a.percent}%</strong></div><div class="exam-insights-track"><span style="width:${a.percent}%"></span></div></div>`).join('')}</div></div>
 <div><h3>Questions to revisit</h3>${focus.length?`<div class="exam-insights-focus">${focus.map(q=>`<div class="exam-insights-focus-item"><div><strong>${esc(q.title)}</strong><small>${esc(q.courseTitle)} · Missed ${q.count} ${q.count===1?'time':'times'}</small></div>${button('Review','open-lesson','secondary-button',`data-course="${esc(q.courseId)}" data-lesson="${esc(q.lessonId)}"`)}</div>`).join('')}</div>`:'<p class="fineprint">No missed questions in your saved results. Keep exploring new topics.</p>'}</div></div>
 ${available?`<div class="exam-focus-action"><div><span class="overline">FROM INSIGHT TO PRACTICE</span><h3>Retest missed questions</h3><p>Revisit up to ${available} distinct questions you previously missed, prioritized by repeat misses. No unrelated questions are added.</p></div><div class="exam-focus-controls"><label for="exam-focus-size">Maximum questions</label><select id="exam-focus-size" class="styled-select">${EXAM_SIZES.map(n=>`<option value="${n}">${n} questions</option>`).join('')}</select>${button('Start focused revision','exam-focus-start','primary-button')}</div></div>`:''}
 <div class="exam-insights-recent"><h3>Recent challenges</h3>${report.recent.slice(0,5).map(r=>`<div class="exam-insights-recent-row"><span>${esc(new Date(r.endedAt).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}))}</span><span>${r.areas.length===1?esc(COURSES.find(c=>c.id===r.areas[0].courseId)?.title||r.areas[0].courseId):'Mixed subjects'}</span><strong>${r.correct}/${r.total}</strong></div>`).join('')}</div>
 <p class="fineprint">Only scores and missed lesson identifiers are retained—not raw answers. Up to 12 completed exams can be backed up or cleared. This history does not change lesson completion.</p></section>`;
}

function examPage(){
 const session=normalizeExam(saved.exam,COURSES);
 const results=examResults(session,COURSES);
 const header=`<main class="page exam-page"><div class="subnav">${button('Back to journey','goto-journey','back-link')}</div><header class="exam-hero"><span class="overline">TEST WHAT YOU HAVE LEARNED</span><h1>Practice <em>Exam.</em></h1><p>Every question teaches you something. Offline, private and at your own pace.</p></header>`;
 if(!session){
  const subjects=COURSES.filter(c=>!c.dark&&examPool(COURSES,{courseId:c.id}).length>0);
  return header+`<section class="exam-panel"><h2>Shape your challenge</h2><label class="field-label" for="exam-course">Subject</label><select id="exam-course" class="styled-select"><option value="all">All subjects (excluding 18+)</option>${subjects.map(c=>`<option value="${esc(c.id)}">${esc(c.title)}</option>`).join('')}</select><label class="field-label" for="exam-size">Questions</label><select id="exam-size" class="styled-select">${EXAM_SIZES.map(n=>`<option value="${n}" ${n===10?'selected':''}>${n} questions</option>`).join('')}</select>${button('Begin practice','exam-start','primary-button')}<p class="fineprint">Practice exams do not grant qualifications or change lesson completions and Mistake Lab records. Mature-content lessons are excluded.</p></section>${examHistoryPanel()}</main>`;
 }
 if(results.done){
  return header+`<section class="exam-panel exam-finished"><span class="overline">CHALLENGE COMPLETE</span><div class="exam-score">${results.correct}<span> / ${results.total}</span></div><h2>${results.correct===results.total?'Every answer correct!':'Discover what to revisit.'}</h2><p>Review your explanations and return to any lesson to study further.</p>${button('Create another exam','exam-new','primary-button')}</section><section class="exam-review"><h2>Answer review</h2>${results.entries.map((q,i)=>`<article class="exam-review-item"><span class="overline">QUESTION ${i+1} · ${esc(q.courseTitle)}</span><h3>${esc(q.question)}</h3><p class="${q.isCorrect?'exam-right':'exam-wrong'}">${q.isCorrect?'Correct':'Needs another look'} · Your answer: ${esc(q.options[q.selected])}</p>${!q.isCorrect?`<p><strong>Correct answer:</strong> ${esc(q.correctAnswer)}</p>`:''}<p>${esc(q.explanation)}</p>${button('Revisit lesson','open-lesson','secondary-button',`data-course="${esc(q.courseId)}" data-lesson="${esc(q.lessonId)}"`)}</article>`).join('')}</section>${examHistoryPanel()}</main>`;
 }
 const q=currentExamQuestion(session,COURSES);
 if(!q)return header+`<div class="empty-state"><h2>This practice session needs a restart.</h2>${button('Start again','exam-new','primary-button')}</div></main>`;
 const answered=Object.hasOwn(session.responses,q.id),chosen=session.responses[q.id];
 return header+`<section class="exam-panel"><div class="exam-progress-row"><span class="overline">${esc(q.courseTitle)} · ${esc(q.title)}</span><strong>Question ${session.position+1} of ${session.ids.length}</strong></div>${bars(session.position,session.ids.length)}<h2 class="exam-question">${esc(q.question)}</h2><div class="exam-options">${q.options.map((option,i)=>`<button type="button" class="exam-option ${answered&&(i===q.correct?'exam-option-correct':i===chosen?'exam-option-wrong':'')}" data-action="exam-answer" data-index="${i}" ${answered?'disabled':''}><span>${String.fromCharCode(65+i)}</span><strong>${esc(option)}</strong></button>`).join('')}</div>${answered?`<div class="exam-explanation" role="status"><strong>${chosen===q.correct?'Well done — correct!':'Not quite — here is why.'}</strong><p>${esc(q.explanation)}</p></div>${button(session.position===session.ids.length-1?'See my results':'Next question','exam-next','primary-button')}`:`<p class="fineprint">Choose an answer to see the explanation. Leave and return any time.</p>`}<div class="exam-control-row">${button('Discard and change challenge','exam-discard','secondary-button')}</div></section></main>`;
}

function journey() {
  const done=finished(), active = COURSES.filter(c=>courseProgress(c)>0).sort((a,b)=>courseProgress(b)-courseProgress(a));
  const xp=done*60;
  return `<main class="page journey-page"><div class="page-title"><span class="overline">YOUR GROWTH IS YOURS</span><h1>Every step <em>counts.</em></h1><p>Not a race. A beautiful habit of becoming.</p></div>
    <div class="journey-banner"><div class="journey-aura">✧</div><span class="overline">YOUR ATLAS RANK</span><div class="journey-level">${Math.floor(done/6)+1}</div><h2>${done < 6?'Curious Learner':done<24?'Knowledge Seeker':'Atlas Explorer'}</h2><p>Keep exploring, one honest lesson at a time.</p>${bars(done%6,6)}<span class="subtle-count">${done%6} / 6 to next level</span></div>
    <div class="metrics-grid"><div><span class="metric-icon">${icon('book',22)}</span><strong>${done}</strong><small>Lessons learned</small></div><div><span class="metric-icon">${icon('flame',22)}</span><strong>${streak()}</strong><small>Day streak</small></div><div><span class="metric-icon">${icon('spark',22)}</span><strong>${xp}</strong><small>Knowledge XP</small></div></div>
    <section class="personal-cards-invite"><div class="personal-cards-invite-icon">${icon('book',24)}</div><div><span class="overline">YOUR IDEAS, YOUR OWN FLASHCARDS</span><h2>Study Card Workshop</h2><p>Create private recall cards and review them on a spaced schedule.</p></div>${button('Open workshop','personal-cards-open','small-button')}</section>
    <section class="insights-invite"><div><span class="overline">YOUR LEARNING LANDSCAPE</span><h2>Learning Insights</h2><p>See activity, quiz practice and illustrated subject progress.</p></div>${button('View insights','insights','small-button')}</section>
    <section class="daily-quest-invite"><div class="quest-gem">✦</div><div><span class="overline">A DAILY INVITATION</span><h2>Today's Quest</h2><p>Three thoughtful steps, with no pressure to keep a streak.</p></div>${button('Open quest','quest','small-button')}</section>
    <section class="exam-invite"><div class="exam-invite-icon">${icon('book',27)}</div><div><span class="overline">TEST WHAT STAYS WITH YOU</span><h2>Practice Exam</h2><p>Take an offline 5, 10 or 20-question challenge. Save your place as you go.</p></div>${button('Open exam','exam-open','small-button')}</section>
    <section class="mistakes-invite"><span class="mistakes-invite-mark">✧</span><div><span class="overline">QUESTIONS TO REVISIT</span><h2>Mistake Lab</h2><p>${buildMistakeQueue(COURSES,saved.mistakes,{includeMature:shadowUnlocked}).length} missed questions ready for practice.</p></div>${button('Practice now','mistakes-open','small-button')}</section>
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

function casebookPage(){
 const file=route.caseId?getCaseFile(route.caseId):null;
 if(route.caseId&&!file)return errorView();
 if(!file){const s=casebookStats(saved.casebook);return `<main class="page casebook-page"><div class="subnav">${button('Back to journey','goto-journey','back-link')}</div><header class="casebook-hero"><span class="overline">THINK BEYOND THE FIRST CHOICE</span><h1>Interactive <em>Case Files.</em></h1><p>Explore what happens after a decision, then replay the story to discover another outcome. Your choices remain private and work offline.</p><span class="casebook-count">${s.finished} of ${s.total} files completed</span></header><div class="casebook-list">${CASE_FILES.map((c,i)=>{const progress=(saved.casebook[c.id]||[]).length;return `<button type="button" class="casebook-tile" data-action="casebook-open" data-id="${esc(c.id)}"><img src="/assets/${esc(c.art)}.svg" alt="" loading="lazy"/><span class="casebook-tile-text"><small>CASE ${i+1} · ${esc(c.subject)}</small><strong>${esc(c.title)}</strong><span>${esc(c.intro)}</span><em>${progress===2?'Completed — explore another outcome':progress===1?'Continue your story':'Begin case'}</em></span>${chevron}</button>`;}).join('')}</div><p class="info-line">These fictional cases are educational exercises, not guaranteed real-life results or professional advice.</p></main>`;}
 const state=evaluateCase(file,saved.casebook[file.id]||[]);
 if(!state)return errorView();
 return `<main class="page casebook-page"><div class="subnav">${button('Back to Case Files','casebook','back-link')}</div><section class="casebook-stage"><img src="/assets/${esc(file.art)}.svg" alt="" /><div><span class="overline">${esc(file.subject)}</span><h1>${esc(file.title)}</h1><p>${esc(file.intro)}</p></div></section>
 ${state.history.length?`<section class="casebook-history"><span class="overline">YOUR DECISIONS SO FAR</span>${state.history.map((h,i)=>`<div><b>${i+1}</b><span><strong>${esc(h.label)}</strong><p>${esc(h.insight)}</p></span></div>`).join('')}</section>`:''}
 ${state.complete?`<section class="casebook-result" role="status"><span class="overline">YOUR STORY'S OUTCOME</span><h2>${esc(state.ending.title)}</h2><p>${esc(state.ending.outcome)}</p><div class="casebook-takeaway"><strong>What to remember</strong><p>${esc(state.ending.takeaway)}</p></div>${button('Try another path','casebook-reset','primary-button',`data-id="${esc(file.id)}"`)}</section>`:`<section class="casebook-decision"><span class="overline">DECISION ${state.history.length+1} OF 2</span><p class="casebook-scene">${esc(state.scene)}</p><h2>${esc(state.prompt)}</h2><div class="casebook-options">${state.options.map((c,i)=>`<button type="button" data-action="casebook-choice" class="casebook-choice" data-id="${esc(file.id)}" data-index="${i}"><span>${String.fromCharCode(65+i)}</span><strong>${esc(c.label)}</strong>${chevron}</button>`).join('')}</div></section>`}
 <p class="casebook-source">Learn more: <a href="${esc(file.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(file.sourceLabel)} ↗</a> (online only)</p></main>`;
}

function scenarioPage(){
 const progress=scenarioProgress(saved.scenarios);
 return `<main class="page scenario-page"><div class="subnav">${button('Back to journey','goto-journey','back-link')}</div><header class="scenario-hero"><span class="overline">LEARN THROUGH DECISIONS</span><h1>Scenario <em>Lab.</em></h1><p>Make a choice, examine the reasoning and try again. No connection required.</p><strong>${progress.done}/${progress.total} explored · ${progress.thoughtful} evidence-aligned choices</strong></header><div class="scenario-list">${SCENARIOS.map((s,i)=>{const chosen=saved.scenarios[s.id],answered=Number.isInteger(chosen);return `<section class="scenario-card" id="scenario-${esc(s.id)}"><div class="scenario-meta"><span class="overline">${esc(s.category)}</span><small>${i+1}/${SCENARIOS.length}</small></div><h2>${esc(s.title)}</h2><p>${esc(s.setup)}</p><h3>${esc(s.question)}</h3><div class="scenario-choices">${s.choices.map((c,j)=>button(`${String.fromCharCode(65+j)}. ${esc(c.label)}`,'scenario-answer',`scenario-choice ${chosen===j?'selected':''}`,`data-id="${esc(s.id)}" data-index="${j}" aria-pressed="${chosen===j}"`)).join('')}</div>${answered?`<aside class="scenario-feedback" role="status"><span class="overline">${s.choices[chosen].preferred?'A STRONG FIRST RESPONSE':'CONSIDER THIS'}</span><p>${esc(s.choices[chosen].result)}</p><p><strong>Takeaway:</strong> ${esc(s.takeaway)}</p><a href="${esc(s.source)}" target="_blank" rel="noopener noreferrer">Further reading ↗</a><div>${button('Try another choice','scenario-retry','text-action',`data-id="${esc(s.id)}"`)}</div></aside>`:''}</section>`}).join('')}</div><p class="info-line">Educational scenarios, not individualized professional advice. Opening sources requires internet.</p></main>`;
}

function mentorPage(){
 const todayNote=mentorMoment(today(),COURSES,saved.completed);
 const entry=todayNote?.reflection,guide=todayNote?.lesson;
 return `<main class="page mentor-page"><div class="subnav">${button(`${icon('back',18)} Back to home`,'goto-home','back-link')}</div>
 <section class="mentor-hero"><div class="mentor-portrait"><img src="/assets/xyra-guide.svg" alt="Illustrated Xyra with violet eyes, dark hair, human ears, amethyst crown and lavender clothing" loading="eager"/></div><div class="mentor-hero-copy"><span class="overline">THE AMETHYST GUIDE OF ATLAS</span><h1>Welcome to <em>my corner.</em></h1><p>I'm Xyra, your fictional guide through this library. Think of this place as a gentle invitation to be curious, question what you know and keep moving at your own pace.</p><p class="mentor-signature">With curiosity, Xyra ✦</p></div></section>
 <div class="mentor-content"><section class="mentor-reflection"><span class="overline">TODAY'S REFLECTION · ${esc(today())}</span><h2>${esc(entry?.title||'Follow your curiosity')}</h2><p class="mentor-quote">“${esc(entry?.message||'Every question has a place here.')}”</p><div class="mentor-prompt"><strong>A question for today</strong><p>${esc(entry?.prompt||'What would you like to understand?')}</p></div><p class="fineprint">Reflections rotate with the local date. They are invitations, not psychological evaluations or personal predictions.</p></section>
 ${guide?`<section class="mentor-lesson"><span class="overline">A LITTLE LEARNING TO TRY</span><h2>${esc(guide.title)}</h2><p>${esc(guide.course)} · ${guide.minutes} minutes</p><p>Open this lesson for an explanation, a practical exercise and your private Field Notebook.</p>${button(`Explore this lesson ${icon('arrow',17)}`,'open-lesson','primary-button',`data-course="${esc(guide.courseId)}" data-lesson="${esc(guide.lessonId)}"`)}</section>`:''}</div>
 <section class="mentor-outro"><span class="overline">TAKE YOUR TIME</span><p>There is no finish line to understanding the world. Go wherever the next thoughtful question takes you.</p>${button(`Explore the Atlas ${icon('compass',17)}`,'map','secondary-button')}</section>
 </main>`;
}

function insightsPage(){
 const data=summarizeLearning(COURSES,saved.completed,saved.answers,{includeMature:shadowUnlocked});
 const days=activityCalendar(saved.dailyVisits,new Date(),14);
 const phraseTotal=Object.values(PHRASEBOOK).reduce((n,p)=>n+p.phrases.length,0);
 const phraseDone=Object.entries(PHRASEBOOK).reduce((n,[language,p])=>n+(saved.phrases[language]||[]).filter(id=>p.phrases.some(w=>w.id===id)).length,0);
 const next=data.subjects.find(x=>x.done>0&&x.done<x.total)||data.subjects.find(x=>x.done===0);
 return `<main class="page insights-page"><div class="subnav">${button(`${icon('back',18)} Back to journey`,'goto-journey','back-link')}</div><header class="insights-hero"><span class="overline">YOUR EFFORT, YOUR PACE</span><h1>Learning <em>Insights.</em></h1><p>See your learning activity and progress on this device—not a claim of intelligence or professional mastery.</p></header>
 <div class="insights-metrics"><div><span>LESSONS COMPLETED</span><strong>${data.done} <small>/ ${data.total}</small></strong><p>${data.percent}% of the currently available lessons</p></div><div><span>LATEST QUIZ ANSWERS</span><strong>${data.quizAccuracy===null?'—':data.quizAccuracy+'%'}</strong><p>${data.correct} correct of ${data.answered} selected answers</p></div><div><span>LANGUAGE PHRASES</span><strong>${phraseDone} <small>/ ${phraseTotal}</small></strong><p>Self-reported as learned</p></div></div>
 <section class="insights-panel"><div class="section-heading"><div><span class="overline">YOUR LAST TWO WEEKS</span><h2>Recent activity</h2></div><span class="result-count">${days.filter(x=>x.visited).length} active days</span></div><div class="insights-days" role="list" aria-label="Learning visits over the last fourteen days">${days.map(d=>`<div role="listitem" class="insights-day ${d.visited?'visited':''}" aria-label="${esc(d.label)}: ${d.visited?'visited':'no visit recorded'}" title="${esc(d.label)}"><strong>✦</strong><small>${esc(d.label)}</small></div>`).join('')}</div><p class="fineprint">A highlighted day means Atlas was opened; it does not measure study duration.</p></section>
 <section class="insights-panel"><div class="section-heading"><div><span class="overline">DISCOVER YOUR STRENGTHS</span><h2>Subject progress</h2></div></div><div class="insights-subjects" aria-label="Completed lessons by subject">${data.subjects.map(s=>`<button type="button" class="insights-subject" data-action="open-course" data-id="${esc(s.id)}"><img src="/assets/${esc(s.art)}.svg" alt="" loading="lazy"/><span class="insights-subject-copy"><strong>${esc(s.title)}</strong><small>${s.done} of ${s.total} lessons</small><span class="insights-bar" role="progressbar" aria-label="${esc(s.title)} completed lessons" aria-valuemin="0" aria-valuemax="${s.total}" aria-valuenow="${s.done}"><span style="width:${s.percent}%"></span></span></span><b>${s.percent}%</b></button>`).join('')}</div></section>
 ${next?`<section class="insights-next"><div><span class="overline">YOUR NEXT POSSIBILITY</span><h2>Continue with ${esc(next.title)}</h2><p>Choose any lesson you haven't tried yet.</p></div>${button('Explore','open-course','small-button',`data-id="${esc(next.id)}"`)}</section>`:''}
 <p class="info-line">Quiz percentages reflect the latest selected answers, including retries. Completion is not certification or a measure of expertise. Insights stay local.</p></main>`;
}

function globalSearchPage(){
 const entries=searchAtlas(atlasSearchIndex,globalQuery,{kind:globalSearchKind,allowMature:shadowUnlocked,limit:80});
 const suggestions=['Consumer rights','Psychology','Savings','Phishing','Business pricing'];
 return `<main class="page global-search-page"><div class="subnav">${button(`${icon('back',18)} Back to learning`,'goto-explore','back-link')}</div>
  <div class="global-search-hero"><span class="overline">THE ENTIRE ATLAS, AT YOUR FINGERTIPS</span><h1>What sparks your <em>curiosity?</em></h1><p>Find individual lessons, subjects, definitions, and real-life decisions from one place. Search stays on your device.</p></div>
  <label class="global-search-field" for="atlas-global-search">${icon('search',23)}<input type="search" id="atlas-global-search" value="${esc(globalQuery)}" placeholder="Search across all knowledge..." autocomplete="off" aria-label="Search the entire Atlas"/>${globalQuery?button(icon('close',19),'search-clear','global-search-clear','aria-label="Clear search"'):''}</label>
  <div class="global-search-filters" aria-label="Choose result type">${SEARCH_KINDS.map(k=>button(esc(k.label),'search-filter',`filter-pill ${globalSearchKind===k.id?'active':''}`,`data-id="${k.id}" aria-pressed="${globalSearchKind===k.id}"`)).join('')}</div>
  ${globalQuery.trim()?`<div class="section-heading global-search-heading"><div><span class="overline">YOUR DISCOVERIES</span><h2>${entries.length===80?'80+':entries.length} matching ${entries.length===1?'result':'results'}</h2></div></div>
  <div class="global-result-list">${entries.length?entries.map(item=>{const action=item.kind==='lesson'?'open-lesson':item.kind==='course'?'open-course':item.kind==='term'?'open-search-term':item.kind==='case'?'casebook-open':'open-search-scenario';const attrs=item.kind==='lesson'?`data-course="${esc(item.courseId)}" data-lesson="${esc(item.id)}"`:`data-id="${esc(item.id)}"`;const iconName=item.kind==='lesson'?'book':item.kind==='course'?'compass':item.kind==='term'?'spark':item.kind==='case'?'book':'orbit';return `<button type="button" class="global-search-result" data-action="${action}" ${attrs}><span class="global-result-symbol">${icon(iconName,21)}</span><span class="global-result-body"><small>${esc(item.kind==='term'?'GLOSSARY':item.kind.toUpperCase())} · ${esc(item.category)}</small><strong>${esc(item.title)}</strong><span>${esc(item.description)}</span></span><span class="global-result-chevron">${chevron}</span></button>`;}).join(''):`<div class="empty-state"><h3>No matching knowledge yet.</h3><p>Try a shorter phrase, another category, or a related keyword.</p>${button('Clear filters','search-reset','secondary-button')}</div>`}</div>`:
  `<section class="global-discovery"><span class="overline">POPULAR STARTING POINTS</span><h2>Follow a question.</h2><p>Try a topic below, or search for something entirely different.</p><div class="global-suggestions">${suggestions.map(term=>button(esc(term),'search-suggest','global-suggestion',`data-id="${esc(term)}"`)).join('')}</div></section>`}
  <p class="info-line">${icon('info',16)} Everything here is in the downloaded Atlas library. Mature material stays hidden until the Shadow Library acknowledgment. Search and results work offline.</p>
 </main>`;
}

function glossaryPage(){
 const entries=searchGlossary(glossaryQuery,shadowUnlocked);
 return `<main class="page glossary-page"><div class="subnav">${button('Back to learning','goto-explore','back-link')}</div><section class="glossary-hero"><span class="overline">KNOWLEDGE, IN PLAIN LANGUAGE</span><h1>Atlas <em>Glossary.</em></h1><p>Learn the meaning of an important idea, see how it appears in everyday life, and explore its full subject.</p><small>${entries.length} terms available</small></section><label class="glossary-search-label" for="glossary-search">${icon('search',21)}<input id="glossary-search" autocomplete="off" type="search" placeholder="Search terms, examples, and subjects..." value="${esc(glossaryQuery)}" aria-label="Search Atlas glossary"/></label><div class="glossary-grid">${entries.length?entries.map(t=>`<article class="glossary-card"><span class="overline">${esc(t.category)}</span><h2>${esc(t.term)}</h2><p>${esc(t.definition)}</p><div class="glossary-example"><strong>For example</strong><span>${esc(t.example)}</span></div>${button(`Explore ${esc(t.category)} ${icon('arrow',16)}`,'open-course','text-action',`data-id="${esc(t.courseId)}"`)}</article>`).join(''):`<div class="empty-state"><h2>No matching terms</h2><p>Try another word or a broader subject.</p>${button('Show all','glossary-clear','small-button')}</div>`}</div><p class="info-line">Short definitions simplify complex topics. Check professional and jurisdiction-specific sources where decisions carry consequences. Adult Shadow Library terms appear only after its acknowledgment.</p></main>`;
}

function questPage(){
 const q=createDailyQuest(COURSES,SCENARIOS,today());
 const progress=dailyQuestProgress(q,saved.completed,saved.scenarios);
 const rows=(q?.tasks||[]).map((t,i)=>{
  if(t.type==='lesson'){const c=findCourse(t.courseId),l=findLesson(t.courseId,t.lessonId),done=isCompleted(t.courseId+':'+t.lessonId);return `<div class="quest-row"><span class="quest-icon">${done?icon('check',23):String(i+1).padStart(2,'0')}</span><div class="quest-row-copy"><span class="overline">${esc(c?.title||'LEARNING')}</span><h2>${esc(l?.title||'Your lesson')}</h2><p>${l?.minutes||10} minute lesson and quiz ${done?'· Completed':''}</p></div>${button(done?'Review':'Learn','open-lesson','small-button',`data-course="${esc(t.courseId)}" data-lesson="${esc(t.lessonId)}"`)}</div>`;}
  const s=SCENARIOS.find(x=>x.id===t.id),done=Number.isInteger(saved.scenarios?.[t.id]);return `<div class="quest-row"><span class="quest-icon">${done?icon('check',23):String(i+1).padStart(2,'0')}</span><div class="quest-row-copy"><span class="overline">REAL-LIFE PRACTICE</span><h2>${esc(s?.title||'Scenario Lab')}</h2><p>Reason through a choice ${done?'· Completed':''}</p></div>${button(done?'Revisit':'Practice','quest-scenario','small-button',`data-id="${esc(t.id)}"`)}</div>`;
 }).join('');
 return `<main class="page quest-page"><div class="subnav">${button('Back to journey','goto-journey','back-link')}</div><section class="quest-hero"><div><span class="overline">A LITTLE CURIOSITY, EVERY DAY</span><h1>Your Daily <em>Quest.</em></h1><p>Three achievable steps, picked from your Atlas. Complete them in any order; your progress follows your actual learning.</p><small>${esc(today())}</small></div><div class="quest-ring" style="--quest-complete:${progress.total?Math.round(progress.done/progress.total*100):0}%"><strong>${progress.done}/${progress.total}</strong><span>done</span></div></section><div class="quest-rows">${rows}</div><aside class="quest-encouragement"><span class="overline">A NOTE FROM XYRA</span><p>${progress.done===progress.total?'You did it. Now rest, reflect, and keep your curiosity.':'One sincere step matters more than chasing a perfect streak.'}</p></aside><p class="info-line">Tasks change with your local calendar date. They may include previously studied lessons to encourage review. Mature topics are excluded. Progress remains on this device.</p></main>`;
}

function mapPage(){
 const atlas=buildKnowledgeMap(COURSES,saved.completed);
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
  <p class="info-line">${icon('info',16)} Lines show suggested topic connections—not required prerequisites. Mature subjects still require acknowledgment.</p>
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
function mistakesPage(){
 const questions=buildMistakeQueue(COURSES,saved.mistakes,{includeMature:shadowUnlocked});
 const first=questions.length?questions[mistakeIndex%questions.length]:null;
 return `<main class="page mistakes-page"><div class="subnav">${button(`${icon('back',18)} Back to journey`,'goto-journey','back-link')}</div>
 <header class="mistakes-hero"><span class="overline">CURIOSITY INCLUDES TRYING AGAIN</span><h1>Your <em>Mistake Lab.</em></h1><p>Questions you missed in lessons return here for another chance. It is practice, not a score or judgment.</p><span>${questions.length} ${questions.length===1?'question':'questions'} to revisit</span></header>
 ${first?`<section class="mistake-practice"><div class="mistake-heading"><span class="overline">${esc(first.courseTitle)} · ${esc(first.title)}</span><span>${first.wrong} missed ${first.wrong===1?'attempt':'attempts'}</span></div><h2>${esc(first.question)}</h2>
 ${questions.length>1?`<div class="mistake-pager" aria-label="Practice question navigation"><span>Question ${(mistakeIndex%questions.length)+1} of ${questions.length}</span><div>${button('Previous','mistake-cycle','secondary-button','data-id="prev"')}${button('Next question','mistake-cycle','secondary-button','data-id="next"')}</div></div>`:''}
 <div class="mistake-options">${first.options.map((answer,i)=>`<button type="button" class="mistake-option" data-action="mistake-answer" data-id="${esc(first.id)}" data-index="${i}"><span>${String.fromCharCode(65+i)}</span><strong>${esc(answer)}</strong></button>`).join('')}</div>
 <p class="mistake-guidance">Correct answers clear questions from your practice queue. To complete a lesson, return to its full explanation and activity.</p>
 ${mistakeFeedback?.id===first.id?`<div class="mistake-explanation" role="status"><strong>Not quite — here's what to remember.</strong><p>${esc(first.explanation)}</p></div>`:''}
 ${button(`Read the lesson ${icon('arrow',16)}`,'open-lesson','secondary-button',`data-course="${esc(first.courseId)}" data-lesson="${esc(first.lessonId)}"`)}</section>`:
 `<div class="mistake-empty"><span>✦</span><h2>Your queue is clear.</h2><p>Any missed lesson checks will appear here for another try.</p>${button('Explore lessons','goto-explore','primary-button')}</div>`}
 ${questions.length>1?`<div class="mistake-upcoming"><span class="overline">ALSO TO REVISIT</span>${questions.filter(c=>c.id!==first?.id).slice(0,6).map(c=>`<button type="button" data-action="open-lesson" class="mistake-next" data-course="${esc(c.courseId)}" data-lesson="${esc(c.lessonId)}"><span>${esc(c.title)}</span><small>${esc(c.courseTitle)}</small>${icon('arrow',15)}</button>`).join('')}</div>`:''}
 <p class="info-line">Mistake records are private, saved in your browser and included in JSON backups. Shadow Library questions remain hidden until its mature-content acknowledgment.</p></main>`;
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

function personalCardsPage(){
 const cards=normalizePersonalCards(saved.personalCards,COURSES);
 const due=duePersonalCards(cards,COURSES);
 const active=due[0]||null;
 const editing=cards.find(c=>c.id===personalCardEditingId)||null;
 const matches=searchPersonalCards(cards,personalCardQuery,COURSES);
 const subjects=COURSES.filter(c=>!c.dark);
 const subjectOptions=subjects.map(c=>`<option value="${esc(c.id)}" ${editing?.courseId===c.id?'selected':''}>${esc(c.title)}</option>`).join('');
 return `<main class="page personal-cards-page"><div class="subnav">${button('Back to saved library','goto-saved','back-link')}</div>
 <header class="personal-cards-hero"><span class="overline">YOUR QUESTIONS, YOUR GROWTH</span><h1>Study Card <em>Workshop.</em></h1><p>Turn what you learn into your own questions. Write them once, remember them through practice. Your cards stay in this browser and can travel in an Atlas backup.</p></header>
 <div class="personal-cards-metrics"><div><strong>${cards.length}</strong><span>Created cards</span></div><div><strong>${due.length}</strong><span>Due for review</span></div><div><strong>${cards.length-due.length}</strong><span>Scheduled later</span></div></div>
 <section class="personal-cards-practice" aria-label="Custom card practice"><div class="personal-cards-section-heading"><div><span class="overline">ACTIVE RECALL</span><h2>Your next question</h2></div><span class="personal-cards-counter">${due.length} ready</span></div>
 ${active?`<div class="personal-cards-flash"><span class="overline">${esc(subjects.find(c=>c.id===active.courseId)?.title||'General')}</span><h3>${esc(active.front)}</h3>
 ${personalCardRevealed?`<div class="personal-cards-answer" role="status"><span class="overline">YOUR ANSWER</span><p>${plain(active.back)}</p></div><p class="fineprint">Did you remember it before revealing the answer?</p><div class="personal-cards-rate-actions">${button('Practice again','personal-card-rate','secondary-button',`data-id="${esc(active.id)}" data-outcome="again"`)}${button('I remembered','personal-card-rate','primary-button',`data-id="${esc(active.id)}" data-outcome="remembered"`)}</div>`:button('Reveal my answer','personal-card-reveal','primary-button')}</div>`:
 `<div class="personal-cards-practice-empty"><span>✦</span><h3>${cards.length?'All caught up!':'Your first question starts here.'}</h3><p>${cards.length?'No cards are due yet. They will return on their scheduled review days.':'Create a question and its answer below to begin practicing.'}</p></div>`}
 <p class="fineprint">Forgotten cards return after 10 minutes. Remembered cards return after 1, 3, 7, 14, 30 and 60 days. The schedule stays on your device.</p></section>
 <section class="personal-cards-editor" id="personal-cards-editor"><div class="personal-cards-section-heading"><div><span class="overline">${editing?'EDIT YOUR CARD':'WRITE WHAT MATTERS'}</span><h2>${editing?'Edit your question':'Create a new card'}</h2></div><span class="personal-cards-counter">${cards.length}/${PERSONAL_CARD_LIMIT}</span></div>
 <label for="personal-card-front">Question</label><textarea id="personal-card-front" rows="3" maxlength="${CARD_FRONT_LIMIT}" required placeholder="What do I want to remember?">${esc(editing?.front||'')}</textarea>
 <label for="personal-card-back">Answer</label><textarea id="personal-card-back" rows="5" maxlength="${CARD_BACK_LIMIT}" required placeholder="Explain the idea in your own words...">${esc(editing?.back||'')}</textarea>
 <label for="personal-card-course">Subject</label><select class="styled-select" id="personal-card-course"><option value="general" ${!editing||editing.courseId==='general'?'selected':''}>General knowledge</option>${subjectOptions}</select>
 <div class="personal-cards-editor-actions">${button(editing?'Save changes':'Create card','personal-card-save','primary-button')}${editing?button('Cancel editing','personal-card-edit-cancel','secondary-button'):''}</div>
 ${editing?'<p class="fineprint">Changing the question, answer or subject restarts that card’s review schedule.</p>':'<p class="fineprint">Use a short, specific prompt and an answer you can check. There is no account or upload.</p>'}</section>
 <section class="personal-cards-library"><div class="personal-cards-section-heading"><div><span class="overline">YOUR OWN COLLECTION</span><h2>Card library</h2></div><span class="personal-cards-counter">${matches.length} shown</span></div>
 <label class="personal-cards-search" for="personal-card-search">${icon('search',18)}<input id="personal-card-search" type="search" value="${esc(personalCardQuery)}" maxlength="100" placeholder="Find a question, answer or subject" aria-label="Search your custom study cards"/></label>
 ${matches.length?`<div class="personal-cards-list">${matches.map(card=>{
 const course=subjects.find(c=>c.id===card.courseId);
 const dueNow=!card.review||Date.parse(card.review.dueAt)<=Date.now();
 return `<article class="personal-cards-list-item"><div><span class="overline">${esc(course?.title||'General')} · ${dueNow?'DUE NOW':'SCHEDULED'}</span><h3>${esc(card.front)}</h3><p>${esc(card.back)}</p></div><div class="personal-cards-item-actions">${button('Edit','personal-card-edit','secondary-button',`data-id="${esc(card.id)}"`)}${button('Delete','personal-card-delete','outline-danger',`data-id="${esc(card.id)}"`)}</div></article>`;
 }).join('')}</div>`:`<div class="personal-cards-practice-empty"><h3>${cards.length?'Nothing matches this search':'No cards yet'}</h3><p>${cards.length?'Try a different term.':'Create your first question above to begin your own collection.'}</p></div>`}
 </section><p class="info-line">Custom cards are saved locally, included in regular and encrypted progress backups, and removed by a progress reset. They do not change your lesson completion. Export a backup before clearing browser data.</p></main>`;
}

function notebookPage(){
 const all=buildNotebookIndex(COURSES,saved.fieldNotes,{allowMature:shadowUnlocked});
 const matches=searchNotebook(all,notebookQuery);
 return `<main class="page notebook-page"><div class="subnav">${button(`${icon('back',18)} Saved library`,'goto-saved','back-link')}</div>
 <header class="notebook-hero"><span class="overline">YOUR THOUGHTS. YOUR ATLAS.</span><h1>The Field <em>Notebook.</em></h1><p>A private space to revisit your practical exercises, discoveries, and learning reflections. All saved only in this browser.</p><span class="notebook-total">${all.length} saved ${all.length===1?'note':'notes'}</span></header>
 <label class="notebook-search" for="notebook-search">${icon('search',20)}<input id="notebook-search" type="search" value="${esc(notebookQuery)}" placeholder="Search your lessons and notes…" autocomplete="off" aria-label="Search private field notes"/></label>
 <div class="notebook-results-head"><span class="overline">${notebookQuery.trim()?'MATCHING REFLECTIONS':'YOUR WRITTEN REFLECTIONS'}</span><small>${matches.length} ${matches.length===1?'result':'results'}</small></div>
 ${matches.length?`<div class="notebook-results">${matches.map(item=>`<button type="button" class="notebook-entry" data-action="open-lesson" data-course="${esc(item.courseId)}" data-lesson="${esc(item.lessonId)}"><span class="notebook-entry-icon">${icon('book',21)}</span><span class="notebook-entry-body"><small>${esc(item.course)}</small><strong>${esc(item.lesson)}</strong><span>${esc(item.preview)}</span><em>Open lesson and edit note ${icon('arrow',15)}</em></span></button>`).join('')}</div>`:`<div class="empty-state">${icon('book',32)}<h3>${all.length?'No matching notes yet':'Your first note is waiting'}</h3><p>${all.length?'Try searching for a different word or subject.':'Open any lesson and write a response to its practice exercise. Your notes will appear here.'}</p>${notebookQuery?button('Clear search','notebook-clear','secondary-button'):button('Explore lessons','goto-explore','primary-button')}</div>`}
 <p class="info-line">Notes are stored only on this device. Shadow Library notes remain hidden until you acknowledge the mature-content gate. Export a backup before switching browsers or clearing site data.</p></main>`;
}

function savedPage() {
  const favorites=COURSES.filter(c=>saved.favorites.includes(c.id) && (!c.dark || shadowUnlocked));
  const entries=saved.bookmarks.map(key=>{ const [cid,...rest]=key.split(':');const lid=rest.join(':');const c=findCourse(cid),l=findLesson(cid,lid);return c&&l&&(!c.dark||shadowUnlocked)?{c,l,key}:null;}).filter(Boolean);
  return `<main class="page"><div class="page-title"><span class="overline">A LIBRARY THAT REMEMBERS</span><h1>Your <em>saved</em> pages.</h1><p>Keep the knowledge you want to return to.</p></div>
    <section class="personal-cards-invite"><div class="personal-cards-invite-icon">${icon('book',23)}</div><div><span class="overline">YOUR PRIVATE RECALL DECK</span><h2>Study Card Workshop</h2><p>${saved.personalCards.length} custom cards · ${duePersonalCards(saved.personalCards,COURSES).length} ready for practice.</p></div>${button('Open workshop','personal-cards-open','small-button')}</section>
    <section class="notebook-invite"><span class="notebook-invite-icon">✍</span><div><span class="overline">YOUR PRIVATE REFLECTIONS</span><h2>Field Notebook</h2><p>Search all the practice notes you've written while learning.</p></div>${button('Open notebook','notebook-open','small-button')}</section>
    <section class="section"><div class="section-heading"><div><span class="overline">BACK TO WHAT MATTERS</span><h2>Favorite subjects</h2></div></div><div class="course-list">${favorites.length?favorites.map(c=>card(c,'horizontal')).join(''):`<p class="empty-text">Tap the heart on a subject to keep it here.</p>`}</div></section>
    <section class="section"><div class="section-heading"><div><span class="overline">YOUR PERSONAL REFERENCES</span><h2>Bookmarked lessons</h2></div></div><div class="lesson-list">${entries.length?entries.map(({c,l,key})=>`<button type="button" class="lesson-row" data-action="open-lesson" data-course="${esc(c.id)}" data-lesson="${esc(l.id)}"><span class="lesson-number">${icon('bookmark',19)}</span><span class="lesson-info"><strong>${esc(l.title)}</strong><small>${esc(c.title)} · ${l.minutes} min</small></span>${chevron}</button>`).join(''):`<p class="empty-text">Bookmark a lesson while reading to find it here later.</p>`}</div></section>
  </main>`;
}


function phraseReviewPanel(){
 const pack=getPhrasePack(saved.language);
 if(!pack)return '';
 const summary=phraseReviewStats(saved.phraseReviews,saved.language,PHRASEBOOK);
 const item=duePhraseReviews(saved.phraseReviews,saved.language,PHRASEBOOK)[0];
 const next=summary.nextAt?new Date(summary.nextAt).toLocaleDateString(undefined,{month:'short',day:'numeric'}):null;
 return `<section class="phrase-review-section" aria-label="Daily phrase recall"><div class="phrase-review-head"><div><span class="overline">KEEP YOUR KNOWLEDGE CLOSE</span><h2>Daily Phrase Recall</h2><p>A private spaced-review schedule that brings phrases back when they need practice.</p></div><span class="phrase-review-count">${summary.due} due · ${summary.reviewed}/${summary.total} practiced</span></div>
 ${item?`<div class="phrase-review-card"><span class="overline">RECALL BEFORE REVEAL</span><h3>${esc(item.english)}</h3>
 ${phraseReviewRevealed?`<div class="phrase-review-answer" role="status"><span class="overline">ANSWER</span><p lang="${esc(pack.locale)}">${esc(item.target)}</p>${item.pronunciation?`<small>${esc(item.pronunciation)}</small>`:''}</div><p class="fineprint">Did you recall the phrase before looking? Select your result to schedule its next review.</p><div class="phrase-review-actions">${button('Practice again','phrase-review-rate','secondary-button',`data-id="${esc(item.id)}" data-outcome="again"`)}${button('I remembered','phrase-review-rate','primary-button',`data-id="${esc(item.id)}" data-outcome="remembered"`)}</div>`:button('Reveal the phrase','phrase-review-reveal','primary-button')}</div>`:
 `<div class="phrase-review-caught-up"><span aria-hidden="true">✧</span><h3>You're caught up for now.</h3><p>${next?`Your next scheduled phrase returns ${esc(next)}.`:'Practice a phrase to start your review schedule.'} Switch languages to see other review queues.</p></div>`}
 <div class="phrase-review-bottom"><p class="fineprint">Forgotten phrases return after 10 minutes; remembered phrases after 1, 3, 7, 14, 30, and 60 days. Only your self-reported recall is tracked; this is not a pronunciation or fluency exam. Data stays on this device and in your backups.</p>
 ${summary.reviewed?button('Reset this language’s reviews','phrase-review-reset','secondary-button'):''}</div></section>`;
}

function languageChallengePanel(){
 const pack=getPhrasePack(saved.language);
 if(!pack)return '';
 const session=normalizeLanguageChallenge(saved.languageChallenge,PHRASEBOOK);
 const active=session?.code===saved.language?session:null;
 const paused=session&&session.code!==saved.language&&session.position<session.ids.length;
 const history=saved.languageChallengeHistory[saved.language];
 const result=active?languageChallengeResults(active,PHRASEBOOK):null;
 const q=active?currentLanguageQuestion(active,PHRASEBOOK):null;
 const answered=Boolean(q&&Object.hasOwn(active.answers,q.id));
 const selected=answered?active.answers[q.id]:null;
 const header=`<section class="language-challenge" aria-label="Offline language challenge"><div class="language-challenge-top"><div><span class="overline">PRACTICE WHAT YOU REMEMBER</span><h2>Phrase Challenge</h2><p>Practice recognition in both directions, without an account or internet connection.</p></div><span class="language-challenge-count">${pack.phrases.length} prompts</span></div>
 ${history?`<div class="language-challenge-history"><span>${history.attempts} completed ${history.attempts===1?'attempt':'attempts'}</span><span>Best ${history.best}/${pack.phrases.length}</span><span>Last ${history.last}/${pack.phrases.length}</span></div>`:''}`;
 let body='';
 if(!active){
  body=`<div class="language-challenge-intro"><label class="field-label" for="language-challenge-mode">Challenge direction</label>
  <select id="language-challenge-mode" class="styled-select" aria-label="Choose challenge direction"><option value="recognition">English meaning → target-language phrase</option><option value="meaning">Target-language phrase → English meaning</option></select>
  ${paused?`<p class="language-challenge-paused">An unfinished ${esc(LANGUAGES.find(l=>l.code===session.code)?.name||session.code)} challenge is saved. Resume it, or replace it with a new one.</p><div class="language-challenge-controls">${button('Resume saved challenge','challenge-resume','secondary-button')}${button('Replace with new challenge','challenge-start','primary-button')}</div>`:
  button('Start challenge','challenge-start','primary-button')}
  <p class="fineprint">Four choices per prompt. Scores measure phrase recognition only—not listening, speaking or fluency. Answers do not change your learned-phrase markings.</p></div>`;
 }else if(result?.done){
  body=`<div class="language-challenge-results"><span class="overline">CHALLENGE COMPLETE</span><div class="language-challenge-score">${result.correct}<small> / ${result.total}</small></div><p>${result.percent}% correct in ${active.mode==='recognition'?'English-to-phrase':'phrase-to-English'} recognition.</p>${button('Try another challenge','challenge-new','primary-button')}</div>
  <div class="language-challenge-review"><h3>Review your answers</h3>${result.entries.map((item,i)=>`<article><small>QUESTION ${i+1} · ${item.isCorrect?'CORRECT':'REVISIT'}</small><strong>${esc(item.translation)}</strong><p lang="${esc(item.locale)}">${esc(item.phrase)}</p>${item.pronunciation?`<p class="language-challenge-pronunciation">${esc(item.pronunciation)}</p>`:''}<p>Your answer: ${esc(item.selectedText)}${item.isCorrect?'':' · Correct: '+esc(item.correctText)}</p></article>`).join('')}</div>`;
 }else if(q){
  body=`<div class="language-challenge-question"><div class="language-challenge-progress"><span>${active.mode==='recognition'?'Find the matching phrase':'Find the matching meaning'}</span><strong>${active.position+1} / ${active.ids.length}</strong></div>${bars(active.position,active.ids.length)}
  <h3 ${active.mode==='meaning'?`lang="${esc(q.locale)}"`:''}>${esc(q.prompt)}</h3>
  <div class="language-challenge-options">${q.options.map((option,i)=>`<button type="button" class="language-challenge-choice ${answered&&(option.id===q.correctId?'language-challenge-right':option.id===selected?'language-challenge-wrong':'')}" data-action="challenge-answer" data-id="${esc(option.id)}" data-question="${esc(q.id)}" ${answered?'disabled':''}><span>${String.fromCharCode(65+i)}</span><strong ${active.mode==='recognition'?`lang="${esc(q.locale)}"`:''}>${esc(option.label)}</strong></button>`).join('')}</div>
  ${answered?`<div class="language-challenge-feedback" role="status"><strong>${selected===q.correctId?'That matches!':'One to revisit.'}</strong><p>${esc(q.translation)} — <span lang="${esc(q.locale)}">${esc(q.phrase)}</span></p>${q.pronunciation?`<p>${esc(q.pronunciation)}</p>`:''}</div>${button(active.position===active.ids.length-1?'See results':'Next question','challenge-next','primary-button')}`:'<p class="fineprint">Choose one answer to reveal the correct pairing.</p>'}
  <div class="language-challenge-controls">${button('Discard unfinished challenge','challenge-discard','secondary-button')}</div></div>`;
 }
 return header+body+`</section>`;
}


function conversationQuestPanel(){
 const pack=getPhrasePack(saved.language);
 if(!pack)return '';
 const session=normalizeConversationQuest(saved.conversationQuest,PHRASEBOOK);
 const active=session?.code===saved.language?session:null;
 const prior=session?conversationQuestResults(session,PHRASEBOOK):null;
 const paused=Boolean(session&&!active&&!prior?.done);
 const quest=active?CONVERSATION_QUESTS.find(q=>q.id===active.questId):null;
 const result=active?conversationQuestResults(active,PHRASEBOOK):null;
 const current=active?currentConversationQuestion(active,PHRASEBOOK):null;
 const answered=Boolean(current&&Object.hasOwn(active.answers,current.id));
 const selected=answered?active.answers[current.id]:null;
 const records=saved.conversationQuestHistory[saved.language]||{};
 let content='';
 if(!active){
  content=`<div class="conversation-quest-start">
    <label for="conversation-quest-select" class="field-label">Choose a real-life situation</label>
    <select id="conversation-quest-select" class="styled-select">${CONVERSATION_QUESTS.map(q=>`<option value="${esc(q.id)}">${esc(q.title)}</option>`).join('')}</select>
    <div class="conversation-quest-scenarios">${CONVERSATION_QUESTS.map(q=>`<article><strong>${esc(q.title)}</strong><p>${esc(q.summary)}</p>${records[q.id]?`<small>Last: ${records[q.id].last}/5 · Best: ${records[q.id].best}/5 · ${records[q.id].attempts} ${records[q.id].attempts===1?'try':'tries'}</small>`:''}</article>`).join('')}</div>
    ${paused?`<div class="conversation-quest-paused" role="status"><p>An unfinished ${esc(LANGUAGES.find(l=>l.code===session.code)?.name||session.code)} sequence is saved. You can resume it or explicitly replace it with a new one.</p><div class="conversation-quest-controls">${button('Resume saved sequence','conversation-resume','secondary-button')}${button('Replace with new sequence','conversation-start','primary-button')}</div></div>`:button('Start situation practice','conversation-start','primary-button')}
    <p class="fineprint">Each activity practices five connected intentions using already-authored phrases. It is a one-person speaking rehearsal, not a simulated conversation with evaluated listening or pronunciation.</p>
  </div>`;
 }else if(result?.done){
  content=`<div class="conversation-quest-complete"><span class="overline">SITUATION PRACTICE COMPLETE</span><h3>${esc(quest.title)}</h3><div class="conversation-quest-score">${result.correct}<small> / ${result.total}</small></div><p>${result.percent}% correct for written phrase selection. This is not a conversational proficiency rating.</p>${button('Choose another situation','conversation-new','primary-button')}</div>
  <div class="conversation-quest-review"><h3>Review the sequence</h3>${result.entries.map((entry,i)=>`<article><span>STEP ${i+1} · ${entry.correct?'MATCHED':'REVISIT'}</span><strong>${esc(entry.cue)}</strong><p lang="${esc(entry.locale)}">${esc(entry.phrase)}</p><small>${esc(entry.english)}${entry.pronunciation?' · '+esc(entry.pronunciation):''}</small>${!entry.correct?`<p class="conversation-review-miss">Your choice: <span lang="${esc(entry.locale)}">${esc(entry.selectedText)}</span></p>`:''}</article>`).join('')}</div>`;
 }else if(current){
  content=`<div class="conversation-quest-play"><div class="conversation-quest-progress"><span>${esc(quest.title)} · Step ${active.position+1} of ${quest.steps.length}</span><strong>${active.position+1}/${quest.steps.length}</strong></div>${bars(active.position,quest.steps.length)}
  <span class="overline">WHAT WOULD YOU SAY?</span><h3>${esc(current.cue)}</h3><p class="fineprint">Try saying the target-language phrase aloud, then select its written form. Speaking is not recorded or graded.</p>
  <div class="conversation-quest-options">${current.options.map((option,i)=>`<button type="button" class="conversation-quest-option ${answered&&(option.id===current.phraseId?'is-correct':option.id===selected?'is-missed':'')}" data-action="conversation-answer" data-id="${esc(option.id)}" data-step="${esc(current.id)}" ${answered?'disabled':''}><span aria-hidden="true">${String.fromCharCode(65+i)}</span><strong lang="${esc(current.locale)}">${esc(option.label)}</strong></button>`).join('')}</div>
  ${answered?`<div class="conversation-quest-feedback" role="status"><strong>${selected===current.phraseId?'That phrase fits.':'Review this step.'}</strong><p><span lang="${esc(current.locale)}">${esc(current.target)}</span> — ${esc(current.english)}</p>${current.pronunciation?`<small>Approximate pronunciation: ${esc(current.pronunciation)}</small>`:''}</div>${button(active.position===quest.steps.length-1?'See situation results':'Continue sequence','conversation-next','primary-button')}`:'<p class="fineprint">Choose one of the four phrases to check the context.</p>'}
  ${button('Discard unfinished sequence','conversation-discard','secondary-button')}</div>`;
 }
 return `<section class="conversation-quest" aria-label="Situational conversation rehearsal"><div class="conversation-quest-head"><div><span class="overline">FROM WORDS TO SITUATIONS</span><h2>Conversation Quest</h2><p>Rehearse familiar phrases in practical sequences, one decision at a time.</p></div><span class="conversation-quest-count">3 situations · 5 steps each</span></div>${content}</section>`;
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
    ${phraseReviewPanel()}
    ${languageChallengePanel()}
    ${conversationQuestPanel()}
    <div class="language-callout">${icon('info',22)}<p><strong>From beginner to native-like?</strong> That's a long-term journey. In one week, target greetings, essential questions and short conversations. Real proficiency grows through months and years of meaningful use.</p></div>
  </main>`;
}
function storageHealthBanner(){
 if(!storageProblem)return '';
 return `<section class="storage-health-alert" role="alert" aria-label="Storage warning"><span class="storage-health-alert-icon">${icon('alert',22)}</span><div><strong>Progress storage needs attention</strong><p>${esc(storageHealthMessage(storageProblem))}</p>${storageProblem==='corrupt'&&recoveryRaw?`${button('Download recovery copy','storage-export-recovery','small-button')}`:''}</div></section>`;
}
function downloadRecoveryCopy(){
 if(!recoveryRaw)return;
 const blob=new Blob([recoveryRaw],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=`xyra-atlas-unreadable-recovery-${today()}.txt`;
 document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
 flash('Recovery text downloaded. Keep it private; it may contain personal notes.');
}

function offlinePage(){
 const s=offlinePack,working=['checking','repairing'].includes(s.state);
 return `<main class="page offline-library-page"><div class="subnav">${button(`${icon('back',18)} Your space`,'offline-back','back-link')}</div>
 <section class="offline-hero"><div class="offline-decoration" aria-hidden="true">✦</div><span class="overline">THE LIBRARY GOES WITH YOU</span><h1>Knowledge without <em>a signal.</em></h1><p>See exactly how much of the learning library is saved for offline access on this device.</p></section>
 ${offlineUpdateWaiting?`<section class="offline-update-ready" role="status" aria-label="New Atlas update ready"><div><span class="overline">NEW OFFLINE EDITION</span><h2>An Atlas update is ready</h2><p>The new lesson files have finished downloading. Apply the update when you're ready; this will reload Atlas, but will not clear your saved progress. Keep a backup before switching devices or clearing browser data.</p></div>${button(offlineUpdateApplying?'Applying update…':'Apply update now','offline-apply-update','primary-button',offlineUpdateApplying?'disabled':'')}</section>`:''}
 <section class="offline-panel"><div class="offline-panel-head"><div><span class="overline">THIS BROWSER</span><h2>Offline readiness</h2></div><span class="offline-pill ${s.ready?'ready':''}" role="status">${s.ready?'Ready':working?'Checking':s.state==='incomplete'?'Incomplete':s.state==='unsupported'?'Unsupported':s.state==='idle'?'Unchecked':'Needs attention'}</span></div>
 <div class="offline-count"><strong>${s.total?s.cached+' / '+s.total:'—'}</strong><span>${s.total?'offline files verified':'learning files'}</span></div><div class="offline-meter" role="progressbar" aria-label="Downloaded learning files" aria-valuemin="0" aria-valuemax="${s.total||1}" aria-valuenow="${s.cached}"><span style="width:${s.percent}%"></span></div>
 <p id="offline-message" class="offline-advice" role="status">${esc(offlineAdvice(s.state))}</p>
 <div class="offline-buttons">${button(`${icon('check',17)} Verify library`,'offline-verify','primary-button',working?'disabled':'')}${button(`${icon('download',17)} Repair missing files`,'offline-repair','secondary-button',working||!navigator.onLine?'disabled':'')}${button(`${icon('refresh',17)} Check updates`,'offline-update','secondary-button',working||!navigator.onLine?'disabled':'')}</div>
 <p class="fineprint">Verification checks the browser cache, not your learning history. Repair requires a connection. Browser storage may later be evicted, so check before relying on it. Narration voices and linked sources can depend on the device or internet.</p></section>
 <section class="offline-steps"><article><b>01</b><div><h3>Open Atlas online</h3><p>The included lessons and illustrations are downloaded after the service worker installs.</p></div></article><article><b>02</b><div><h3>Verify before a trip</h3><p>Look for “Ready” and a full progress bar before turning off the connection.</p></div></article><article><b>03</b><div><h3>Back up personal progress</h3><p>Cached lessons and private notes are different. Export a backup before clearing browser data or switching phones.</p>${button('Export progress backup','export','text-action')}</div></article></section>
 </main>`;
}
async function inspectOffline(repair=false){
 const id=++offlineJob;
 offlinePack={...offlinePack,state:repair?'repairing':'checking'};
 if(route.view==='offline')render();
 let timer;
 try{
  if(!('serviceWorker' in navigator)||!('MessageChannel' in window)){offlinePack={...offlinePack,state:'unsupported'};return;}
  const reg=await navigator.serviceWorker.getRegistration();
  if(!reg?.active){offlinePack={...offlinePack,state:'installing'};return;}
  const raw=await new Promise((resolve,reject)=>{
   const c=new MessageChannel();
   timer=setTimeout(()=>{c.port1.close();reject(Error('timeout'));},8000);
   c.port1.onmessage=e=>{clearTimeout(timer);c.port1.close();resolve(e.data);};
   reg.active.postMessage({type:repair?'ATLAS_REPAIR_OFFLINE':'ATLAS_OFFLINE_STATUS'},[c.port2]);
  });
  if(id!==offlineJob)return;
  if(raw?.error)throw Error('cache error');
  const normal=normalizeOfflineReport(raw);
  offlinePack={...normal,state:normal.ready?'ready':'incomplete'};
 }catch{
  if(id===offlineJob)offlinePack={...offlinePack,state:'error'};
 }finally{
  clearTimeout(timer);
  if(id===offlineJob&&route.view==='offline')render();
 }
}
function watchOfflineRegistration(reg){
 if(!reg)return;
 const checkWaiting=()=>{
  const waiting=Boolean(reg.waiting&&navigator.serviceWorker.controller);
  if(offlineUpdateWaiting!==waiting){
   offlineUpdateWaiting=waiting;
   // Do not replace the lesson DOM while someone is reading or typing notes.
   // The topbar indicator will appear on their next natural navigation.
   if(route.view==='offline')render();
  }
 };
 checkWaiting();
 if(watchedOfflineRegistrations.has(reg))return;
 watchedOfflineRegistrations.add(reg);
 reg.addEventListener('updatefound',()=>{
  const installing=reg.installing;
  if(!installing)return;
  installing.addEventListener('statechange',()=>{
   if(installing.state==='installed')checkWaiting();
  });
 });
}
async function updateOffline(){
 if(!navigator.onLine){flash('Connect to check for updates.');return;}
 if(!('serviceWorker' in navigator)){flash('Offline updates are unavailable on this browser.');return;}
 try{
  const reg=await navigator.serviceWorker.getRegistration();
  if(!reg){flash('Open Atlas while connected before checking for updates.');return;}
  watchOfflineRegistration(reg);
  await reg.update();
  offlineUpdateWaiting=Boolean(reg.waiting&&navigator.serviceWorker.controller);
  if(route.view==='offline')render();
  if(offlineUpdateWaiting)flash('Update is ready. Choose Apply update when convenient.');
  else if(reg.installing)flash('Update download started. It will appear here when ready.');
  else flash('No newer release is waiting. Your current edition remains available.');
 }catch{flash('Unable to check for updates. Try again online.');}
}
async function applyOfflineUpdate(){
 if(offlineUpdateApplying||!('serviceWorker' in navigator))return;
 try{
  const reg=await navigator.serviceWorker.getRegistration();
  if(!reg?.waiting){offlineUpdateWaiting=false;flash('No new update is ready to apply.');return;}
  offlineUpdateApplying=true;
  reg.waiting.postMessage({type:'ATLAS_ACTIVATE_UPDATE'});
  // The controllerchange event reloads after the new worker actually takes control.
  if(route.view==='offline')render();
 }catch{
  offlineUpdateApplying=false;
  flash('The update could not be activated. Your current edition is unchanged.');
 }
}

function you() {
  return `<main class="page you-page"><div class="page-title"><span class="overline">YOUR LITTLE CORNER OF THE WORLD</span><h1>Made for <em>you.</em></h1><p>Private progress. Your pace. Your rules.</p></div>
    <div class="profile-card"><div class="profile-avatar">✦</div><div><span class="overline">ATLAS EXPLORER</span><h2>${esc(actualName())}</h2><p>Level ${Math.floor(finished()/6)+1} · ${finished()} lessons completed</p></div></div>
    <div class="settings-panel"><h2>Make it yours</h2><label class="field-label" for="profile-name">What should Atlas call you?</label><div class="name-row"><input id="profile-name" value="${esc(saved.userName)}" maxlength="40" placeholder="Curious learner"/>${button('Save','save-name','small-button')}</div><div class="settings-row"><span class="setting-icon">${icon(saved.theme==='dark'?'moon':'sun',21)}</span><div><strong>Appearance</strong><small>Switch between twilight and daylight</small></div>${button(saved.theme==='dark'?'Dark':'Light','theme','small-button')}</div><div class="settings-row"><span class="setting-icon">${icon(navigator.onLine?'wifi':'wifi-off',21)}</span><div><strong>Connection</strong><small>Lessons are included in your offline app</small></div><span class="setting-value">${navigator.onLine?'Online':'Offline'}</span></div><div class="settings-row"><span class="setting-icon">${icon('book',21)}</span><div><strong>Offline Library</strong><small>Check downloaded lessons and repair missing files</small></div>${button('Manage','offline-open','small-button')}</div><div class="settings-row"><span class="setting-icon">${icon('download',21)}</span><div><strong>Install Xyra Atlas</strong><small>Keep it on your phone's home screen</small></div>${button('How?','install','small-button')}</div></div>
    <div class="settings-panel"><h2>Your data, your choice</h2><div class="storage-health-panel"><strong>Browser storage: ${storageProblem?storageProblem==='corrupt'?'Recovery needed':'Saving unavailable':'No save error detected'}</strong><span>${storageProblem?esc(storageHealthMessage(storageProblem)):'Progress is saved only in this browser, not synced to other devices.'}</span>${button('Try saving now','storage-retry','small-button')}</div><p class="settings-description">Progress is stored only in this browser on this device. It is not synced to a server. Export a backup before switching phones or clearing browser data.</p><div class="data-actions">${button(`${icon('download',18)} Export backup`,'export','secondary-button')}${button(`${icon('lock',18)} Encrypted backup`,'backup-encrypted-export','secondary-button')}${button(`${icon('upload',18)} Import backup`,'import','secondary-button')}${button(`${icon('trash',18)} Reset progress`,'reset-dialog','outline-danger')}</div><input type="file" id="backup-file" accept=".json,application/json" hidden /></div>
    <div class="settings-panel"><h2>About Xyra Atlas</h2><p class="settings-description">A pocket atlas for the art of living—designed for curiosity, independence and the courage to learn difficult things.</p><p class="fineprint">Atlas 1.39 · Conversation Quest edition. Some subjects are introductions, not complete professional courses. Laws vary by jurisdiction. Adult content is educational. There are no ads, trackers or accounts in this edition.</p>${button(`A note from Xyra ${chevron}`,'open-corner','text-action')}</div>
  </main>`;
}
function errorView() { return `<main class="page"><div class="empty-state">${icon('compass',34)}<h2>This page wandered off the map.</h2><p>Let's find your way back.</p>${button('Go home','goto-home','primary-button')}</div></main>`; }
function modalView() {
  if (!modal) return '';
  const inner = modal==='shadow' ? `<div class="modal-icon dark-icon">${icon('moon',28)}</div><span class="overline">A DIFFERENT KIND OF LESSON</span><h2>Enter the Shadow Library?</h2><p>This section explores manipulation, coercive behavior, psychological pressure, deception, adult intimacy, and sexual health. The purpose is understanding and informed choice—not abuse or exploitation.</p><div class="age-warning">${icon('info',19)} Contains mature educational discussions intended for adults 18+.</div><label class="checkbox-label"><input type="checkbox" id="age-agree" ${gateConfirmed?'checked':''}/><span>I am at least 18, and I understand the purpose of this material.</span></label>${button(`Enter the library ${icon('arrow',18)}`,'enter-shadow','primary-button',gateConfirmed?'':'disabled')}` :
  modal==='install' ? `<div class="modal-icon">${icon('download',26)}</div><span class="overline">TAKE YOUR ATLAS WITH YOU</span><h2>Install Xyra Atlas</h2><p>After the first successful online visit, the app shell and included lessons can work offline once fully cached.</p><div class="install-steps"><strong>On iPhone / iPad</strong><p>Open this website in Safari. Tap Share, then “Add to Home Screen” and enable “Open as Web App”.</p><strong>On Android</strong><p>Open in Chrome. Use the browser menu and select “Install app” or “Add to Home screen”, when available.</p></div>${installEvent?button(`Install now ${icon('download',18)}`,'install-prompt','primary-button'):''}<p class="fineprint">Installing does not automatically sync data across phones. Use Export/Import backup to transfer progress.</p>` :
  modal==='personal-card-delete' && personalCardPendingDelete ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Delete this card?</h2><p>This removes the question, answer and its review schedule from this device. Other lesson progress stays unchanged.</p>${button('Keep card','close-modal','secondary-button')}${button('Delete card','personal-card-delete-confirm','outline-danger')}` :
  modal==='conversation-quest-replace' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Replace unfinished conversation quest?</h2><p>Your current practice sequence will be replaced. Scores from completed quests remain saved.</p>${button('Keep my quest','close-modal','secondary-button')}${button('Replace quest','conversation-replace-confirm','outline-danger')}` :
  modal==='conversation-quest-discard' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Discard your unfinished conversation quest?</h2><p>Only this incomplete sequence is discarded. Your other lessons, phrases, and recorded quest scores are preserved.</p>${button('Keep practicing','close-modal','secondary-button')}${button('Discard quest','conversation-discard-confirm','outline-danger')}` :
  modal==='challenge-replace' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Replace saved language challenge?</h2><p>Your unfinished challenge will be replaced by a new one. Completed scores in your history are not erased.</p>${button('Keep saved challenge','close-modal','secondary-button')}${button('Replace challenge','challenge-replace-confirm','outline-danger')}` :
  modal==='phrase-review-reset' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Reset this language's recall schedule?</h2><p>The scheduled phrase-review results for your selected language will be cleared. Other languages, your learned-phrase markings, and challenge scores remain unchanged.</p>${button('Keep my reviews','close-modal','secondary-button')}${button('Reset this schedule','phrase-review-reset-confirm','outline-danger')}` :
  modal==='challenge-discard' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Discard this challenge?</h2><p>Current unanswered or incomplete progress will be cleared. Your best scores and lesson progress remain.</p>${button('Keep practicing','close-modal','secondary-button')}${button('Discard challenge','challenge-discard-confirm','outline-danger')}` :
  modal==='exam-history-clear' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Clear practice history?</h2><p>Saved exam scores and missed-question summaries will be erased. Current exams, lessons, and notes remain unchanged.</p>${button('Keep history','close-modal','secondary-button')}${button('Clear saved history','exam-history-clear-confirm','outline-danger')}` :
  modal==='exam-discard' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Discard this exam?</h2><p>Current practice answers will be cleared so you can choose a different subject or question count. Your lessons, notes and other learning progress will stay untouched.</p>${button('Keep practicing','close-modal','secondary-button')}${button('Discard exam','exam-discard-confirm','outline-danger')}` :
  modal==='reset' ? `<div class="modal-icon warning-icon">${icon('alert',26)}</div><h2>Reset your Atlas?</h2><p>All lesson progress, saved lessons, language sprint checks and preferences on this browser will be erased. Export a backup first if you need it.</p>${button('Cancel','close-modal','secondary-button')}${button('Erase my local progress','confirm-reset','outline-danger')}` :
  modal==='backup-encrypt' ? `<div class="modal-icon">${icon('lock',26)}</div><span class="overline">PRIVATE PROGRESS BACKUP</span><h2>Encrypt your Atlas</h2><p>Create a password-protected JSON backup, encrypted locally with AES-256-GCM. Your passphrase is never saved or uploaded. If you lose it, the file cannot be recovered.</p><label class="field-label" for="encrypt-backup-password">Passphrase (at least 12 characters)</label><input id="encrypt-backup-password" class="encrypted-backup-input" type="password" autocomplete="new-password" maxlength="256"/><label class="field-label" for="encrypt-backup-confirm">Confirm passphrase</label><input id="encrypt-backup-confirm" class="encrypted-backup-input" type="password" autocomplete="new-password" maxlength="256"/>${button('Cancel','backup-crypto-cancel','secondary-button')}${button('Encrypt and download','backup-encrypt-confirm','primary-button')}` :
  modal==='backup-unlock' && encryptedFile ? `<div class="modal-icon">${icon('lock',26)}</div><span class="overline">PRIVATE PROGRESS BACKUP</span><h2>Unlock this backup</h2><p>Enter the original passphrase. After decryption, you will review the contents before approving any replacement of local progress.</p><label class="field-label" for="unlock-backup-password">Backup passphrase</label><input id="unlock-backup-password" class="encrypted-backup-input" type="password" autocomplete="off" maxlength="256"/>${button('Cancel','backup-crypto-cancel','secondary-button')}${button('Unlock and review','backup-unlock-confirm','primary-button')}` :
  modal==='backup-preview' && pendingBackup ? `<div class="modal-icon">${icon('upload',26)}</div><span class="overline">REVIEW BEFORE RESTORING</span><h2>Restore this backup?</h2><p>Importing will <strong>replace</strong> the learning progress, notes, and preferences currently saved on this device. It will not merge the two libraries.</p>
  <p class="backup-file-label">${esc(pendingBackup.sourceName)}${pendingBackup.exportedAt?' · '+esc(pendingBackup.exportedAt):''}</p>
  <div class="backup-preview-grid" aria-label="Imported progress summary"><div><strong>${pendingBackup.counts.lessons}</strong><span>Completed lessons</span></div><div><strong>${pendingBackup.counts.notes}</strong><span>Private notes</span></div><div><strong>${pendingBackup.counts.quizzes}</strong><span>Quiz answers</span></div><div><strong>${pendingBackup.counts.bookmarks}</strong><span>Bookmarks</span></div></div>
  <p class="fineprint">This backup includes ${pendingBackup.state.personalCards?.length||0} personal study cards.</p>
  <p class="fineprint">Capstone self-review checklists in backup: ${Object.keys(pendingBackup.state.capstoneChecks||{}).length}.</p>
  <p class="fineprint">Completed practice exam records: ${(pendingBackup.state.examHistory||[]).length} (up to 12 recent summaries).</p>
  <p class="fineprint">Language practice in this backup: ${pendingBackup.state.languageChallenge?'one saved challenge':'no active challenge'} · ${Object.keys(pendingBackup.state.languageChallengeHistory||{}).length} score histories.</p>
  <p class="fineprint">Scheduled phrase recall records: ${Object.keys(pendingBackup.state.phraseReviews||{}).length} across supported languages.</p>
  <p class="fineprint">Situational conversation practice: ${pendingBackup.state.conversationQuest?'one saved sequence':'no active sequence'} · ${Object.keys(pendingBackup.state.conversationQuestHistory||{}).length} languages with quest results.</p>
  <p class="backup-replace-warning">Current device: ${finished()} completed lessons and ${Object.keys(saved.fieldNotes).length} notes. Export those first if you want to preserve them.</p>
  <div class="backup-preview-actions">${button('Cancel','backup-cancel','secondary-button')}${button('Restore and replace','backup-confirm','outline-danger')}</div>` :
  modal==='corner' ? `<div class="modal-icon">${icon('spark',26)}</div><span class="overline">XYRA'S CORNER</span><h2>A little note, just for you ♡</h2><p>“You are allowed to be new at something. You are allowed to ask strange questions. And you are allowed to change your mind when you learn more.”</p><div class="xyra-signature">With curiosity, Xyra ✦</div><p class="fineprint">One thought I want to leave you with: knowledge is power, but wisdom is knowing when and how to use it.</p>` :
  modal==='updates' ? `<div class="modal-icon">${icon('book',26)}</div><span class="overline">ABOUT THIS EDITION</span><h2>Welcome to your pocket atlas</h2><p>Atlas v1.39 includes ${COURSES.length} subjects and ${totalLessons} lessons, three illustrated portal worlds and all 14 illustrated case chapters, including 14 applied capstone labs with saved self-review checks and 29 mastery guides, Focused Revision Exams, Practice Exam Insights, custom Study Cards, quizzes, situational Conversation Quests, two-way Language Challenges, Daily Phrase Recall, the Language Lab, Practice Studio, branching Case Files, private notes, study paths and user-approved offline updates.</p><p>This remains a development edition: the complete advanced curriculum, final cinematic artwork, production deployment and real-device verification are not finished. You can export your progress at any time.</p>` : '';
  return `<div class="modal-backdrop" data-action="close-modal"><div class="modal-card" role="dialog" aria-modal="true" aria-label="Xyra Atlas dialog" data-stop="true">${button(icon('close',21),'close-modal','modal-close','aria-label="Close dialog"')}${inner}</div></div>`;
}
function render() {
  document.documentElement.dataset.theme=saved.theme;
  document.body.classList.toggle('dialog-open',Boolean(modal));
  document.body.classList.toggle('reader-focus-mode',route.view==='lesson'&&saved.reader.focus);
  const view = route.view;
  const content = ({home,explore,journey,exam:examPage,review:reviewPage,mistakes:mistakesPage,personalcards:personalCardsPage,studio:studioPage,scenario:scenarioPage,casebook:casebookPage,map:mapPage,quest:questPage,glossary:glossaryPage,search:globalSearchPage,insights:insightsPage,mentor:mentorPage,offline:offlinePage,notebook:notebookPage,path:pathPage,saved:savedPage,you,course:coursePage,lesson:lessonPage,language:languagePage}[view] || errorView)();
  document.getElementById('app').innerHTML = `${topbar()}<div class="shell"><aside class="desktop-rail"><div class="rail-title">YOUR ATLAS <span>✧</span></div>${[['home','Home','home'],['explore','Explore & Learn','compass'],['journey','My Journey','spark'],['saved','Saved Library','bookmark'],['you','Your Space','user']].map(([id,label,ico])=>`<button type="button" data-action="nav" data-id="${id}" class="rail-link ${tabForRoute()===id?'active':''}">${icon(ico,20)} ${label}</button>`).join('')}<div class="rail-divider"></div><button type="button" class="rail-link" data-action="notebook-open">${icon('book',20)} Field Notebook</button><button type="button" class="rail-link" data-action="personal-cards-open">${icon('book',20)} Study Card Workshop</button><button type="button" class="rail-link" data-action="exam-open">${icon('book',20)} Practice Exam</button><button type="button" class="rail-link" data-action="offline-open">${icon('download',20)} Offline Library</button><button type="button" class="rail-link" data-action="open-corner">${icon('spark',20)} Xyra's Corner</button><button type="button" class="rail-link" data-action="casebook">${icon('book',20)} Case Files</button><button type="button" class="rail-link" data-action="insights">${icon('chart',20)} Learning Insights</button><button type="button" class="rail-link" data-action="search">${icon('search',20)} Search Everything</button><button type="button" class="rail-link" data-action="glossary">${icon('book',20)} Glossary</button><button type="button" class="rail-link" data-action="quest">${icon('spark',20)} Daily Quest</button><button type="button" class="rail-link" data-action="map">${icon('compass',20)} Knowledge Map</button><button type="button" class="rail-link" data-action="mistakes-open">${icon('spark',20)} Mistake Lab</button><button type="button" class="rail-link" data-action="review">${icon('orbit',20)} Review Deck</button><button type="button" class="rail-link" data-action="path">${icon('compass',20)} Guided Path</button><button type="button" class="rail-link" data-action="studio">${icon('briefcase',20)} Practice Studio</button><button type="button" class="rail-link" data-action="language">${icon('languages',20)} Language Lab</button><button type="button" class="rail-link" data-action="open-course" data-id="shadow">${icon('moon',20)} Shadow Library</button><div class="rail-note">✦<p>The world is a little bigger every time you learn.</p></div></aside><div class="main-column">${storageHealthBanner()}${content}<footer class="app-footer">Made with curiosity, for a life still unfolding. <span>✧ Xyra Atlas</span></footer></div></div>${navBar()}${modalView()}${currentToast?`<div class="toast" role="status">${icon('spark',19)} ${esc(currentToast)}</div>`:''}`;
  const main=document.querySelector('#app main');
  if(main){main.id='atlas-main';main.setAttribute('tabindex','-1');}
  for(const el of document.querySelectorAll('.topbar,.shell,.bottom-nav'))el.inert=Boolean(modal);
  document.getElementById('skip-content').inert=Boolean(modal);
  if(modal)requestAnimationFrame(()=>document.querySelector('.modal-card .modal-close')?.focus());
  syncLessonAudioUI();
  document.title = `${view==='course' ? findCourse(route.courseId)?.title+' · ':view==='lesson' ? findLesson(route.courseId,route.lessonId)?.title+' · ' : ''}Xyra Atlas`;
}
function toggle(list,value) { saved[list]=saved[list].includes(value)?saved[list].filter(x=>x!==value):[...saved[list],value];persist();render(); }
function normalizedBackupState(clean){
 return {...createInitialState(),
   completed:normalizeLessonKeys(clean.completed,COURSES),
   bookmarks:normalizeLessonKeys(clean.bookmarks,COURSES),
   favorites:normalizeLessonKeys(clean.favorites,COURSES,'course'),
   answers:normalizeQuizAnswers(clean.answers,COURSES),
   reviews:normalizeReviews(clean.reviews),
   studio:sanitizeStudio(clean.studio),
   scenarios:normalizeScenarioAnswers(clean.scenarios),
   casebook:normalizeCasebook(clean.casebook),
   mistakes:normalizeMistakes(clean.mistakes,COURSES),
    exam:normalizeExam(clean.exam,COURSES),
    examHistory:normalizeExamHistory(clean.examHistory,COURSES),
    personalCards:normalizePersonalCards(clean.personalCards,COURSES),
   reader:normalizeReaderPreferences(clean.reader),
   learningPath:normalizeLearningPath(clean.learningPath,COURSES),
   fieldNotes:normalizeFieldNotes(clean.fieldNotes),
    capstoneChecks:normalizeCapstoneChecks(clean.capstoneChecks,COURSES),
   dailyVisits:Array.isArray(clean.dailyVisits)?clean.dailyVisits.filter(validDayKey).slice(-400):[],
   lastOpened:normalizeLastOpened(clean.lastOpened,COURSES),
   theme:clean.theme==='light'?'light':'dark',
   language:LANGUAGES.some(x=>x.code===clean.language)?clean.language:'ja',
   languageDays:Array.isArray(clean.languageDays)?clean.languageDays.filter(x=>typeof x==='string').slice(0,200):[],
   languageSpeechRate:normalizeLanguageSpeechRate(clean.languageSpeechRate),
   phrases:sanitizePhraseProgress(clean.phrases),
   phraseReviews:normalizePhraseReviews(clean.phraseReviews,PHRASEBOOK),
   languageChallenge:normalizeLanguageChallenge(clean.languageChallenge,PHRASEBOOK),
   languageChallengeHistory:normalizeLanguageChallengeHistory(clean.languageChallengeHistory,PHRASEBOOK),
   conversationQuest:normalizeConversationQuest(clean.conversationQuest,PHRASEBOOK),
   conversationQuestHistory:normalizeConversationQuestHistory(clean.conversationQuestHistory,PHRASEBOOK),
   userName:typeof clean.userName==='string'?clean.userName.slice(0,40):''
 };
}
function previewBackup(text,name){
 const parsed=parseBackupEnvelope(text),candidate=normalizedBackupState(parsed.state);
 pendingBackup={state:candidate,exportedAt:parsed.exportedAt,sourceName:String(name||'Atlas backup').slice(0,120),counts:backupCounts(candidate)};
 modal='backup-preview';render();
}
function answerBackup(e){
 const file=e.target.files?.[0];if(!file)return;
 if(file.size>1024*1024){flash('Backup is too large (1 MB maximum).');e.target.value='';return;}
 const reader=new FileReader();
 reader.onload=()=>{
  try{
   const raw=String(reader.result),data=JSON.parse(raw);
   if(isEncryptedBackup(data)){encryptedFile={data,name:String(file.name||'Protected Atlas').slice(0,120)};modal='backup-unlock';render();}
   else previewBackup(raw,file.name);
  }catch(err){pendingBackup=null;encryptedFile=null;flash('Import failed: '+(err instanceof Error?err.message:'Invalid backup.'));}
  finally{e.target.value='';}
 };
 reader.onerror=()=>{encryptedFile=null;e.target.value='';flash('Unable to read selected backup.');};
 reader.readAsText(file);
}
function saveBackupFile(contents,filename){
 const blob=new Blob([contents],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function makeEncryptedBackup(){
 if(storageProblem==='corrupt'||storageProblem==='read-failed'){flash('Recover browser storage before exporting.');return;}
 const a=document.getElementById('encrypt-backup-password'),b=document.getElementById('encrypt-backup-confirm');
 const password=a?.value||'',repeat=b?.value||'';
 if(password.length<12||password.length>256){flash('Passphrase must be 12–256 characters.');return;}
 if(password!==repeat){flash('Passphrases do not match.');return;}
 const plain=JSON.stringify({format:'xyra-atlas-backup',version:1,exportedAt:new Date().toISOString(),state:saved});
 a.value='';b.value='';
 try{const payload=await encryptBackup(plain,password);saveBackupFile(payload,`xyra-atlas-private-${today()}.json`);modal='';render();flash('Encrypted backup exported. Keep its passphrase safe.');}
 catch{flash('Could not encrypt the backup. Use a secure, up-to-date browser.');}
}
async function unlockEncryptedFile(){
 if(!encryptedFile||unlockBusy)return;
 unlockBusy=true;
 const btn=document.querySelector('[data-action="backup-unlock-confirm"]');if(btn){btn.disabled=true;btn.textContent='Unlocking…';}
 const el=document.getElementById('unlock-backup-password'),password=el?.value||'';if(el)el.value='';
 let plain;
 try{plain=await decryptBackup(encryptedFile.data,password);}
 catch{flash('Could not unlock backup. Check its passphrase and file integrity.');unlockBusy=false;const retry=document.querySelector('[data-action="backup-unlock-confirm"]');if(retry){retry.disabled=false;retry.textContent='Unlock and review';}return;}
 try{const name=encryptedFile.name;previewBackup(plain,name);encryptedFile=null;}
 catch{flash('Backup unlocked, but its learning data could not be imported.');}
 finally{unlockBusy=false;const retry=document.querySelector('[data-action="backup-unlock-confirm"]');if(retry){retry.disabled=false;retry.textContent='Unlock and review';}}
}
function confirmBackupImport(){
 if(!pendingBackup)return;
 // Replace the persisted state first; never mutate the in-memory state if a write fails.
 const candidate=pendingBackup.state;
 const day=today();
 candidate.dailyVisits=[...new Set([...candidate.dailyVisits,day])].slice(-400);
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(candidate));}
 catch{flash('Restore could not be saved. Your current learning data remains unchanged.');return;}
 saved=candidate;
 recoveryRaw=null;storageProblem=null;storageWarningShown=false;
 shadowUnlocked=false;gateConfirmed=false;
 personalCardEditingId=null;personalCardRevealed=false;personalCardPendingDelete=null;personalCardQuery='';
 pendingBackup=null;modal='';
 nav('you');flash('Backup restored on this device.');
}
function exportBackup() {
  if(storageProblem==='corrupt'){flash('Stored progress is unreadable. Download the recovery text first, then restore a valid backup.');return;}
  const blob=new Blob([JSON.stringify({format:'xyra-atlas-backup',version:1,exportedAt:new Date().toISOString(),state:saved},null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=`xyra-atlas-backup-${today()}.json`;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);flash('Backup exported. Store it somewhere safe.');
}
async function handleAction(e) {
  const button=e.target.closest('[data-action]'); if(!button) return;
  if(button.classList.contains('modal-backdrop') && e.target.closest('[data-stop]')) return;
  const action=button.dataset.action, id=button.dataset.id;
  if(action==='skip-content'){const main=document.getElementById('atlas-main');main?.focus({preventScroll:true});main?.scrollIntoView({block:'start'});}
  else if(action==='goto-home') nav('home');
  else if(action==='goto-explore') {query='';filter='all';nav('explore');}
  else if(action==='goto-saved')nav('saved');
  else if(action==='notebook-open'){notebookQuery='';nav('notebook');}
  else if(action==='personal-cards-open') {personalCardEditingId=null;personalCardRevealed=false;nav('personalcards');}
  else if(action==='personal-card-reveal') {if(route.view==='personalcards'&&duePersonalCards(saved.personalCards,COURSES).length){personalCardRevealed=true;render();}}
  else if(action==='personal-card-rate') {const active=duePersonalCards(saved.personalCards,COURSES)[0];const outcome=button.dataset.outcome;if(route.view!=='personalcards'||!personalCardRevealed||!active||active.id!==id||!['again','remembered'].includes(outcome))return;try{saved.personalCards=ratePersonalCard(saved.personalCards,id,outcome,COURSES);personalCardRevealed=false;persist();render();}catch(err){flash('Review could not be saved: '+err.message);}}
  else if(action==='personal-card-save') {if(route.view!=='personalcards')return;const front=document.getElementById('personal-card-front'),back=document.getElementById('personal-card-back'),subject=document.getElementById('personal-card-course');if(!front?.reportValidity()||!back?.reportValidity()||!subject)return;const fields={front:front.value,back:back.value,courseId:subject.value};try{saved.personalCards=personalCardEditingId?updatePersonalCard(saved.personalCards,personalCardEditingId,fields,COURSES):createPersonalCard(saved.personalCards,fields,COURSES);personalCardEditingId=null;personalCardRevealed=false;persist();flash('Study card saved privately on this device.');}catch(err){flash(err instanceof Error?err.message:'Unable to save card.');}}
  else if(action==='personal-card-edit') {if(route.view!=='personalcards'||!saved.personalCards.some(c=>c.id===id))return;personalCardEditingId=id;render();requestAnimationFrame(()=>{document.getElementById('personal-cards-editor')?.scrollIntoView({block:'start'});document.getElementById('personal-card-front')?.focus({preventScroll:true});});}
  else if(action==='personal-card-edit-cancel') {personalCardEditingId=null;render();}
  else if(action==='personal-card-delete') {if(route.view!=='personalcards'||!saved.personalCards.some(c=>c.id===id))return;personalCardPendingDelete=id;modal='personal-card-delete';render();}
  else if(action==='personal-card-delete-confirm') {if(modal!=='personal-card-delete'||!personalCardPendingDelete)return;const idToDelete=personalCardPendingDelete;saved.personalCards=deletePersonalCard(saved.personalCards,idToDelete,COURSES);if(personalCardEditingId===idToDelete)personalCardEditingId=null;personalCardPendingDelete=null;personalCardRevealed=false;modal='';persist();render();}
  else if(action==='notebook-clear'){notebookQuery='';render();requestAnimationFrame(()=>document.getElementById('notebook-search')?.focus());}
  else if(action==='insights') nav('insights');
  else if(action==='offline-open'){nav('offline');requestAnimationFrame(()=>inspectOffline());}
  else if(action==='offline-back')nav('you');
  else if(action==='offline-verify')await inspectOffline();
  else if(action==='offline-repair')await inspectOffline(true);
  else if(action==='offline-update')await updateOffline();
  else if(action==='offline-apply-update')await applyOfflineUpdate();
  else if(action==='search') {nav('search');requestAnimationFrame(()=>document.getElementById('atlas-global-search')?.focus());}
  else if(action==='search-filter') {globalSearchKind=SEARCH_KINDS.some(k=>k.id===id)?id:'all';render();}
  else if(action==='search-clear') {globalQuery='';render();requestAnimationFrame(()=>document.getElementById('atlas-global-search')?.focus());}
  else if(action==='search-reset') {globalSearchKind='all';globalQuery='';render();requestAnimationFrame(()=>document.getElementById('atlas-global-search')?.focus());}
  else if(action==='search-suggest') {globalQuery=id.slice(0,100);globalSearchKind='all';render();}
  else if(action==='open-search-term') {const entry=GLOSSARY.find(t=>t.id===id);if(!entry||entry.adult&&!shadowUnlocked)return;glossaryQuery=entry.term;nav('glossary');}
  else if(action==='open-search-scenario') {if(!SCENARIOS.some(s=>s.id===id))return;nav('scenario');requestAnimationFrame(()=>document.getElementById('scenario-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}));}
  else if(action==='nav') {if(id==='explore') {query='';filter='all';}nav(id);}
  else if(action==='theme') {saved.theme=saved.theme==='dark'?'light':'dark';persist();render();}
  else if(action==='filter') {filter=id;render();}
  else if(action==='reset-search') {query='';filter='all';render();}
  else if(action==='open-course') {const c=findCourse(id);if(!c)return; if(c.dark&&!shadowUnlocked){gateConfirmed=false;modal='shadow';render();return;}if(route.courseId!==c.id)courseStageFilter='all';nav(`course/${c.id}`);}
  else if(action==='course-stage-filter') {if(route.view!=='course'||!['all','Beginner','Intermediate','Advanced'].includes(id))return;courseStageFilter=id;render();}
  else if(action==='open-lesson') {const cid=button.dataset.course, lid=button.dataset.lesson;const c=findCourse(cid);if(c?.dark&&!shadowUnlocked){gateConfirmed=false;modal='shadow';render();return;} if(findLesson(cid,lid)){saved.lastOpened={courseId:cid,lessonId:lid};persist();nav(`lesson/${cid}/${lid}`);}}
  else if(action==='favorite') toggle('favorites',id);
  else if(action==='bookmark') toggle('bookmarks',button.dataset.key);
  else if(action==='answer'){const key=button.dataset.key,choice=Number(button.dataset.index);if(route.view!=='lesson'||key!==idFor(route.courseId,route.lessonId))return;const lesson=findLesson(route.courseId,route.lessonId);if(!lesson||!Number.isInteger(choice)||choice<0||choice>=lesson.quiz.options.length)return;saved.answers[key]=choice;saved.mistakes=recordQuizAttempt(saved.mistakes,COURSES,key,choice);persist();render();}
  else if(action==='mistakes-open'){mistakeFeedback=null;mistakeIndex=0;nav('mistakes');}
  else if(action==='mistake-cycle'){if(route.view!=='mistakes'||!['prev','next'].includes(id))return;const total=buildMistakeQueue(COURSES,saved.mistakes,{includeMature:shadowUnlocked}).length;if(total<2)return;mistakeIndex=(mistakeIndex+(id==='next'?1:-1)+total)%total;mistakeFeedback=null;render();}
  else if(action==='mistake-answer'){if(route.view!=='mistakes')return;const queue=buildMistakeQueue(COURSES,saved.mistakes,{includeMature:shadowUnlocked}),first=queue.length?queue[mistakeIndex%queue.length]:null,choice=Number(button.dataset.index);if(!first||first.id!==id||!Number.isInteger(choice)||choice<0||choice>=first.options.length)return;saved.mistakes=recordQuizAttempt(saved.mistakes,COURSES,id,choice);if(choice===first.correct){mistakeFeedback=null;saved.answers[id]=choice;persist();flash('Correct! That question is cleared. ✦');}else{mistakeFeedback={id};persist();render();}}
  else if(action==='complete') {if(button.disabled)return;const key=button.dataset.key;const [cid,lid]=key.split(':');const l=findLesson(cid,lid);if(l && saved.answers[key]===l.quiz.correct && !isCompleted(key)){saved.completed.push(key);persist();flash('Lesson complete. You earned 60 XP ✦');}}
  else if(action==='language') nav('language');
  else if(action==='goto-journey') nav('journey');
  else if(action==='review') {reviewRevealed=false;nav('review');}
  else if(action==='exam-open') nav('exam');
  else if(action==='exam-start') {const courseId=document.getElementById('exam-course')?.value||'all';const size=Number(document.getElementById('exam-size')?.value);saved.exam=createExam(COURSES,{courseId,size,seed:Math.floor(Math.random()*4294967296)});if(saved.exam){persist();render();}else flash('No practice questions are available for that subject.');}
  else if(action==='exam-answer') {if(route.view!=='exam')return;const next=answerExam(saved.exam,Number(button.dataset.index),COURSES);if(next){saved.exam=next;persist();render();}}
  else if(action==='exam-next') {if(route.view!=='exam')return;const current=normalizeExam(saved.exam,COURSES);const next=advanceExam(current,COURSES);if(next&&current&&next.position>current.position){if(examResults(next,COURSES).done)saved.examHistory=recordExamHistory(saved.examHistory,next,COURSES);saved.exam=next;persist();render();}}
  else if(action==='exam-new') {if(route.view!=='exam')return;saved.exam=null;persist();render();}
  else if(action==='exam-focus-start') {if(route.view!=='exam')return;const current=normalizeExam(saved.exam,COURSES);if(current&&!examResults(current,COURSES).done)return;const size=Number(document.getElementById('exam-focus-size')?.value);const next=createFocusedExam(COURSES,saved.examHistory,{size,seed:Math.floor(Math.random()*4294967296)});if(!next){flash('No missed questions are available for focused revision.');return;}saved.exam=next;persist();render();}
  else if(action==='exam-history-clear') {if(route.view!=='exam'||!saved.examHistory.length)return;modal='exam-history-clear';render();}
  else if(action==='exam-history-clear-confirm') {if(modal!=='exam-history-clear')return;saved.examHistory=[];modal='';persist();render();}
  else if(action==='exam-discard') {if(route.view!=='exam'||!normalizeExam(saved.exam,COURSES))return;modal='exam-discard';render();}
  else if(action==='exam-discard-confirm') {if(modal!=='exam-discard')return;saved.exam=null;modal='';persist();render();}
  else if(action==='path') nav('path');
  else if(action==='create-path') {const goal=document.getElementById('path-goal')?.value;const minutes=Number(document.getElementById('path-minutes')?.value);const stamp=today();const next=createLearningPath(COURSES,goal,minutes,saved.completed,stamp);if(!next){flash('No unfinished lessons fit this focus and study time. Try another goal.');return;}saved.learningPath=next;persist();flash('Your seven-session learning path is ready!');}
  else if(action==='studio') nav('studio');
  else if(action==='jump-chapter'){if(route.view==='lesson'){const target=button.dataset.index==='practice'?'lesson-practice':Number.isInteger(Number(button.dataset.index))?'lesson-section-'+button.dataset.index:null;const el=target?document.getElementById(target):null;if(el){el.scrollIntoView({behavior:window.matchMedia?.('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});el.setAttribute('tabindex','-1');el.focus({preventScroll:true});}}}
  else if(action==='lesson-audio-start') {if(route.view==='lesson')startLessonAudio();}
  else if(action==='lesson-audio-pause'){if(route.view==='lesson'&&lessonAudio&&lessonAudio.key===idFor(route.courseId,route.lessonId)&&lessonAudioAvailable()){try{if(lessonAudio.paused){window.speechSynthesis.resume();lessonAudio.paused=false;}else{window.speechSynthesis.pause();lessonAudio.paused=true;}syncLessonAudioUI();}catch{flash('Audio controls are unavailable on this device.');}}}
  else if(action==='lesson-audio-stop'){stopLessonAudio();}
  else if(action==='capstone-checks-clear'){
    const key=button.dataset.key;
    if(route.view!=='lesson'||key!==idFor(route.courseId,route.lessonId)||
      !findLesson(route.courseId,route.lessonId)?.isCapstone||
      (findCourse(route.courseId)?.dark&&!shadowUnlocked))return;
    saved.capstoneChecks=clearCapstoneChecks(saved.capstoneChecks,key,COURSES);
    persist();render();
  }
  else if(action==='reader-size'){if(route.view==='lesson'){saved.reader=setReaderSize(saved.reader,id);persist();render();}}
  else if(action==='reader-focus'){if(route.view==='lesson'){saved.reader=toggleReaderFocus(saved.reader);persist();render();}}
  else if(action==='scenario') nav('scenario');
  else if(action==='casebook') nav('casebook');
  else if(action==='casebook-open'){if(getCaseFile(id))nav('casebook/'+id);}
  else if(action==='casebook-choice'){if(route.view==='casebook'&&route.caseId===id){saved.casebook=advanceCase(saved.casebook,id,Number(button.dataset.index));persist();render();}}
  else if(action==='casebook-reset'){if(route.view==='casebook'&&route.caseId===id){saved.casebook=resetCase(saved.casebook,id);persist();render();}}
  else if(action==='map') nav('map');
  else if(action==='quest') nav('quest');
  else if(action==='glossary') nav('glossary');
  else if(action==='glossary-clear') {glossaryQuery='';render();}
  else if(action==='quest-scenario'){nav('scenario');requestAnimationFrame(()=>document.getElementById('scenario-'+id)?.scrollIntoView({behavior:'smooth',block:'start'}));}
  else if(action==='scenario-answer') {saved.scenarios=recordScenarioAnswer(saved.scenarios,id,Number(button.dataset.index));persist();render();}
  else if(action==='scenario-retry') {delete saved.scenarios[id];persist();render();}
  else if(action==='studio-tab') {if(['savings','business','time'].includes(id)){studioTab=id;render();}}
  else if(action==='studio-reset') {saved.studio[studioTab]={...STUDIO_DEFAULTS[studioTab]};persist();flash('Restored this practice example.');}
  else if(action==='studio-calc') {const fields=[...document.querySelectorAll('[data-studio-field]')];const invalid=fields.find(el=>!el.checkValidity());if(invalid){invalid.reportValidity();return;}const values=Object.fromEntries(fields.map(el=>[el.name,el.value]));saved.studio[studioTab]=sanitizeStudio({[studioTab]:values})[studioTab];persist();flash('Your scenario is updated.');}
  else if(action==='reveal-review') {reviewRevealed=true;render();}
  else if(action==='rate-review') {const card=getDueReviews()[0];if(!card||!reviewRevealed||id!==card.id)return;const outcome=button.dataset.outcome;if(!['again','remembered'].includes(outcome))return;saved.reviews[card.id]=recordReview(saved.reviews[card.id],outcome);reviewRevealed=false;persist();flash(outcome==='remembered'?'Nice recall! Your next review is scheduled.':'Good practice. This card returns in 10 minutes.');}
  else if(action==='toggle-day') toggle('languageDays',`${saved.language}:${id}`);

  else if(action==='conversation-start'){
   if(route.view!=='language'||!getPhrasePack(saved.language))return;
   const questId=document.getElementById('conversation-quest-select')?.value;
   if(!CONVERSATION_QUESTS.some(q=>q.id===questId))return;
   conversationQuestPendingId=questId;
   const existing=normalizeConversationQuest(saved.conversationQuest,PHRASEBOOK);
   if(existing&&!conversationQuestResults(existing,PHRASEBOOK).done){modal='conversation-quest-replace';render();return;}
   saved.conversationQuest=createConversationQuest(PHRASEBOOK,saved.language,{questId,seed:Math.floor(Math.random()*4294967296)});
   if(saved.conversationQuest){persist();render();}
  }
  else if(action==='conversation-replace-confirm'){
   if(modal!=='conversation-quest-replace'||!getPhrasePack(saved.language))return;
   const next=createConversationQuest(PHRASEBOOK,saved.language,{questId:conversationQuestPendingId,seed:Math.floor(Math.random()*4294967296)});
   if(!next)return;
   saved.conversationQuest=next;modal='';persist();render();
  }
  else if(action==='conversation-resume'){
   if(route.view!=='language')return;
   const existing=normalizeConversationQuest(saved.conversationQuest,PHRASEBOOK);
   if(!existing||conversationQuestResults(existing,PHRASEBOOK).done)return;
   saved.language=existing.code;phraseIndex=0;phraseRevealed=false;phraseReviewRevealed=false;persist();render();
  }
  else if(action==='conversation-answer'){
   if(route.view!=='language')return;
   const current=normalizeConversationQuest(saved.conversationQuest,PHRASEBOOK);
   if(!current||current.code!==saved.language)return;
   const question=currentConversationQuestion(current,PHRASEBOOK);
   if(!question||question.id!==button.dataset.step)return;
   const next=answerConversationQuestion(current,id,PHRASEBOOK);
   if(!next||Object.keys(next.answers).length<=Object.keys(current.answers).length)return;
   saved.conversationQuest=next;persist();render();
  }
  else if(action==='conversation-next'){
   if(route.view!=='language')return;
   const current=normalizeConversationQuest(saved.conversationQuest,PHRASEBOOK);
   if(!current||current.code!==saved.language)return;
   const next=advanceConversationQuest(current,PHRASEBOOK);
   if(!next||next.position<=current.position)return;
   if(conversationQuestResults(next,PHRASEBOOK).done)
    saved.conversationQuestHistory=recordConversationQuestHistory(saved.conversationQuestHistory,next,PHRASEBOOK);
   saved.conversationQuest=next;persist();render();
  }
  else if(action==='conversation-new'){
   if(route.view!=='language')return;
   const current=normalizeConversationQuest(saved.conversationQuest,PHRASEBOOK);
   if(!current||current.code!==saved.language||!conversationQuestResults(current,PHRASEBOOK).done)return;
   saved.conversationQuest=null;persist();render();
  }
  else if(action==='conversation-discard'){
   if(route.view!=='language')return;
   const current=normalizeConversationQuest(saved.conversationQuest,PHRASEBOOK);
   if(!current||current.code!==saved.language||conversationQuestResults(current,PHRASEBOOK).done)return;
   modal='conversation-quest-discard';render();
  }
  else if(action==='conversation-discard-confirm'){
   if(modal!=='conversation-quest-discard')return;
   saved.conversationQuest=null;modal='';persist();render();
  }
  else if(action==='challenge-start'){
   if(route.view!=='language'||!getPhrasePack(saved.language))return;
   const mode=document.getElementById('language-challenge-mode')?.value;
   if(!LANGUAGE_CHALLENGE_MODES.includes(mode))return;
   languageChallengePendingMode=mode;
   const existing=normalizeLanguageChallenge(saved.languageChallenge,PHRASEBOOK);
   if(existing&&!languageChallengeResults(existing,PHRASEBOOK).done){modal='challenge-replace';render();return;}
   saved.languageChallenge=createLanguageChallenge(PHRASEBOOK,saved.language,{mode,seed:Math.floor(Math.random()*4294967296)});
   if(saved.languageChallenge){persist();render();}
  }
  else if(action==='challenge-replace-confirm'){
   if(modal!=='challenge-replace'||!getPhrasePack(saved.language))return;
   const next=createLanguageChallenge(PHRASEBOOK,saved.language,{mode:languageChallengePendingMode,seed:Math.floor(Math.random()*4294967296)});
   if(!next)return;
   saved.languageChallenge=next;modal='';persist();render();
  }
  else if(action==='challenge-resume'){
   if(route.view!=='language')return;
   const session=normalizeLanguageChallenge(saved.languageChallenge,PHRASEBOOK);
   if(!session||!LANGUAGES.some(l=>l.code===session.code))return;
   saved.language=session.code;phraseIndex=0;phraseRevealed=false;persist();render();
  }
  else if(action==='challenge-answer'){
   if(route.view!=='language')return;
   const current=normalizeLanguageChallenge(saved.languageChallenge,PHRASEBOOK);
   if(!current||current.code!==saved.language)return;
   const q=currentLanguageQuestion(current,PHRASEBOOK);
   if(!q||button.dataset.question!==q.id)return;
   const next=answerLanguageChallenge(current,id,PHRASEBOOK);
   if(next&&next.answers[q.id]!==undefined&&current.answers[q.id]===undefined){
    saved.languageChallenge=next;persist();render();
   }
  }
  else if(action==='challenge-next'){
   if(route.view!=='language')return;
   const current=normalizeLanguageChallenge(saved.languageChallenge,PHRASEBOOK);
   if(!current||current.code!==saved.language)return;
   const next=advanceLanguageChallenge(current,PHRASEBOOK);
   if(!next||next.position<=current.position)return;
   if(languageChallengeResults(next,PHRASEBOOK).done){
    saved.languageChallengeHistory=recordLanguageChallengeHistory(saved.languageChallengeHistory,next,PHRASEBOOK);
   }
   saved.languageChallenge=next;persist();render();
  }
  else if(action==='challenge-new'){
   if(route.view!=='language')return;
   const current=normalizeLanguageChallenge(saved.languageChallenge,PHRASEBOOK);
   if(!current||current.code!==saved.language||!languageChallengeResults(current,PHRASEBOOK).done)return;
   saved.languageChallenge=null;persist();render();
  }
  else if(action==='challenge-discard'){
   const current=normalizeLanguageChallenge(saved.languageChallenge,PHRASEBOOK);
   if(route.view!=='language'||!current||current.code!==saved.language||languageChallengeResults(current,PHRASEBOOK).done)return;
   modal='challenge-discard';render();
  }
  else if(action==='challenge-discard-confirm'){
   if(modal!=='challenge-discard')return;
   saved.languageChallenge=null;modal='';persist();render();
  }
  else if(action==='phrase-review-reveal'){
    if(route.view!=='language'||!duePhraseReviews(saved.phraseReviews,saved.language,PHRASEBOOK).length)return;
    phraseReviewRevealed=true;render();
  }
  else if(action==='phrase-review-rate'){
    if(route.view!=='language'||!phraseReviewRevealed)return;
    const active=duePhraseReviews(saved.phraseReviews,saved.language,PHRASEBOOK)[0];
    if(!active||active.id!==id||!['again','remembered'].includes(button.dataset.outcome))return;
    saved.phraseReviews=ratePhraseReview(saved.phraseReviews,saved.language,id,button.dataset.outcome,PHRASEBOOK);
    phraseReviewRevealed=false;persist();render();
  }
  else if(action==='phrase-review-reset'){
    if(route.view!=='language'||!phraseReviewStats(saved.phraseReviews,saved.language,PHRASEBOOK)?.reviewed)return;
    modal='phrase-review-reset';render();
  }
  else if(action==='phrase-review-reset-confirm'){
    if(modal!=='phrase-review-reset')return;
    saved.phraseReviews=clearPhraseReviews(saved.phraseReviews,saved.language,PHRASEBOOK);
    phraseReviewRevealed=false;modal='';persist();render();
  }
  else if(action==='phrase-reveal'){phraseRevealed=true;render();}
  else if(action==='phrase-next'||action==='phrase-prev'){const p=getPhrasePack(saved.language);if(!p)return;phraseIndex=(phraseIndex+(action==='phrase-next'?1:p.phrases.length-1))%p.phrases.length;phraseRevealed=false;render();}
  else if(action==='phrase-known'){const p=getPhrasePack(saved.language);if(!p)return;const word=p.phrases[phraseIndex%p.phrases.length];const known=new Set(saved.phrases[saved.language]||[]);known.has(word.id)?known.delete(word.id):known.add(word.id);saved.phrases[saved.language]=[...known];persist();render();}
  else if(action==='phrase-speak'){const p=getPhrasePack(saved.language);if(!p)return;const w=p.phrases[phraseIndex%p.phrases.length];if(!('speechSynthesis' in window)||!('SpeechSynthesisUtterance' in window)){flash('Speech is not available on this device.');return;}try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(w.target);u.lang=p.locale;u.rate=.85;speechSynthesis.speak(u);}catch{flash('Speech is not available on this device.');}}
  else if(action==='save-name') {saved.userName=(document.getElementById('profile-name')?.value||'').trim().slice(0,40);persist();flash('Your name is saved on this device.');}
  else if(action==='install') {modal='install';render();}
  else if(action==='install-prompt' && installEvent) {const prompt=installEvent;installEvent=null;modal='';render();try{await prompt.prompt();}catch{flash('Use your browser menu to install.');}}
  else if(action==='import') document.getElementById('backup-file')?.click();
  else if(action==='backup-encrypted-export'){modal='backup-encrypt';render();}
  else if(action==='backup-encrypt-confirm')await makeEncryptedBackup();
  else if(action==='backup-unlock-confirm')await unlockEncryptedFile();
  else if(action==='backup-crypto-cancel'){encryptedFile=null;modal='';render();}
  else if(action==='backup-confirm')confirmBackupImport();
  else if(action==='backup-cancel'){pendingBackup=null;modal='';render();}
  else if(action==='export') exportBackup();
  else if(action==='storage-export-recovery')downloadRecoveryCopy();
  else if(action==='storage-retry'){if(storageProblem==='corrupt'||storageProblem==='read-failed'){flash('Existing data is protected. Use a valid backup or reset intentionally.');}else{const ok=persist();flash(ok?'Progress saved successfully in this browser.':'Saving is still blocked; export a backup.');}}
  else if(action==='reset-dialog') {modal='reset';render();}
  else if(action==='confirm-reset') {phraseReviewRevealed=false;personalCardEditingId=null;personalCardRevealed=false;personalCardPendingDelete=null;personalCardQuery='';recoveryRaw=null;storageProblem=null;storageWarningShown=false;saved=createInitialState();shadowUnlocked=false;gateConfirmed=false;reviewRevealed=false;phraseRevealed=false;phraseIndex=0;studioTab='savings';visitToday();persist();modal='';nav('home');flash('Local progress reset.');}
  else if(action==='close-modal') {if(modal==='personal-card-delete')personalCardPendingDelete=null;if(modal==='backup-preview')pendingBackup=null;if(modal==='backup-unlock')encryptedFile=null;modal='';if(['course','lesson'].includes(route.view)&&route.courseId==='shadow'&&!shadowUnlocked)nav('explore');else render();requestAnimationFrame(()=>document.getElementById('atlas-main')?.focus());}
  else if(action==='enter-shadow') {if(!gateConfirmed)return;shadowUnlocked=true;modal='';nav('course/shadow');}
  else if(action==='open-corner') nav('mentor');
  else if(action==='open-updates') {modal='updates';render();}
}
document.addEventListener('click',handleAction);
document.addEventListener('change',e=>{
  if(e.target.matches?.('input[data-capstone-check]')){
    const el=e.target,key=el.dataset.key;
    const [courseId,lessonId]=(key||'').split(':');
    const lesson=findLesson(courseId,lessonId);
    if(route.view!=='lesson'||route.courseId!==courseId||route.lessonId!==lessonId||
      !lesson?.isCapstone||(findCourse(courseId)?.dark&&!shadowUnlocked))return;
    const index=Number(el.dataset.index);
    saved.capstoneChecks=setCapstoneCheck(saved.capstoneChecks,key,index,el.checked,COURSES);
    persist();
    const progress=capstoneCheckProgress(saved.capstoneChecks,key,COURSES);
    const status=document.getElementById('capstone-check-status');
    if(status&&progress)status.textContent=progress.count+' of '+progress.total+' criteria reviewed · Saved on this device';
    el.closest('li')?.classList.toggle('is-reviewed',el.checked);
  }
  if(e.target.id==='language-select') {saved.language=e.target.value;phraseIndex=0;phraseRevealed=false;phraseReviewRevealed=false;persist();render();}
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
  if(e.target.id==='personal-card-search'){const pos=e.target.selectionStart;personalCardQuery=e.target.value.slice(0,100);render();const field=document.getElementById('personal-card-search');if(field){field.focus();try{field.setSelectionRange(pos,pos);}catch{}}}
  if(e.target.id==='notebook-search'){const pos=e.target.selectionStart;notebookQuery=e.target.value.slice(0,100);render();const field=document.getElementById('notebook-search');if(field){field.focus();try{field.setSelectionRange(pos,pos);}catch{}}}
  if(e.target.id==='atlas-global-search') {const pos=e.target.selectionStart;globalQuery=e.target.value.slice(0,100);render();const field=document.getElementById('atlas-global-search');if(field){field.focus();try{field.setSelectionRange(pos,pos);}catch{}}}
  if(e.target.id==='glossary-search') {const pos=e.target.selectionStart;glossaryQuery=e.target.value;render();const field=document.getElementById('glossary-search');if(field){field.focus();try{field.setSelectionRange(pos,pos);}catch{}}}
  if(e.target.id==='course-search') {const pos=e.target.selectionStart;query=e.target.value;render();const input=document.getElementById('course-search');if(input){input.focus();try{input.setSelectionRange(pos,pos);}catch{}}}
});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!modal&&!e.altKey&&!e.ctrlKey&&!e.metaKey&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement?.tagName)&&!document.activeElement?.isContentEditable){e.preventDefault();nav('search');requestAnimationFrame(()=>document.getElementById('atlas-global-search')?.focus());}if(e.key==='Escape'&&modal){if(modal==='personal-card-delete')personalCardPendingDelete=null;if(modal==='backup-preview')pendingBackup=null;if(modal==='backup-unlock')encryptedFile=null;modal='';if(['course','lesson'].includes(route.view)&&route.courseId==='shadow'&&!shadowUnlocked)nav('explore');else render();requestAnimationFrame(()=>document.getElementById('atlas-main')?.focus());} if((e.key==='Enter'||e.key===' ')&&e.target.classList?.contains('shadow-preview')) {e.preventDefault();gateConfirmed=false;modal='shadow';render();}});
document.addEventListener('keydown',e=>{
 if(e.key!=='Tab'||!modal)return;
 const dialog=document.querySelector('.modal-card');if(!dialog)return;
 const focusable=[...dialog.querySelectorAll('button:not(:disabled),input:not(:disabled),a[href],select:not(:disabled),textarea:not(:disabled),[tabindex]:not([tabindex="-1"])')]
  .filter(el=>!el.hidden&&el.getClientRects().length>0&&getComputedStyle(el).visibility!=='hidden');
 if(!focusable.length){e.preventDefault();dialog.setAttribute('tabindex','-1');dialog.focus();return;}
 const first=focusable[0],last=focusable[focusable.length-1],active=document.activeElement;
 if(!dialog.contains(active)){e.preventDefault();(e.shiftKey?last:first).focus();}
 else if(e.shiftKey&&active===first){e.preventDefault();last.focus();}
 else if(!e.shiftKey&&active===last){e.preventDefault();first.focus();}
});
window.addEventListener('hashchange',()=>{reviewRevealed=false;stopLessonAudio();route=parseHash();if(route.view==='offline'&&offlinePack.state==='idle')queueMicrotask(()=>inspectOffline());if(route.view==='course'&&route.courseId==='shadow'&&!shadowUnlocked)modal='shadow';if(route.view==='lesson'&&route.courseId==='shadow'&&!shadowUnlocked)modal='shadow';render();});
window.addEventListener('online',render);window.addEventListener('offline',render);
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();installEvent=e;});
if('serviceWorker' in navigator && location.protocol.startsWith('http')){
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
    if(offlineUpdateApplying){location.reload();return;}
    if(route.view==='offline')requestAnimationFrame(()=>inspectOffline());
  });
  window.addEventListener('load',async()=>{
    try{
      const reg=await navigator.serviceWorker.register('/sw.js');
      watchOfflineRegistration(reg);
    }catch{/* Atlas remains usable online if service worker registration fails. */}
  });
}
if(route.view==='course'&&route.courseId==='shadow') modal='shadow';
if(route.view==='lesson'&&route.courseId==='shadow') modal='shadow';
render();
if(route.view==='offline')requestAnimationFrame(()=>inspectOffline());
