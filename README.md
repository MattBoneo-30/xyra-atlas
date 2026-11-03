# ✦ Xyra Atlas

**Your guide from beginner to mastery.** A beautiful offline-first, mobile-first, privately stored learning PWA for iOS, Android and desktop.

![Xyra Atlas emblem](assets/atlas-mark.svg)

## Current release: Capstone Self-Review Workspace 1.33

- A violet-and-gold responsive interface, **14 distinct original vector course worlds**, Xyra's Corner artwork, landscape hero and a home-screen app icon. The same course identity appears on home tiles, category cards, course covers and lessons.
- 14 learning subjects and **131 interactive lessons**: 117 existing lessons plus **14 new applied capstone labs**, one in every subject. Each capstone contains an original decision case, worked example, hands-on exercise, self-check rubric, knowledge question, and optional source for further reading (counts verified by tests).
- Psychology, legal literacy, business, money, productivity, communication, critical thinking, language study, digital literacy, career, science, relationships and influence.
- **The Shadow Library (18+ educational content)** covers manipulation, gaslighting, lies, emotional leverage, deceptive interface design, consent and adult media literacy. The age acknowledgment is a *content gate*, not verified age or identity security.
- Seven-day language practice framework for 20 languages, with **72 practical offline phrases across nine starter languages**: Japanese, Korean, Spanish, French, Mandarin Chinese, German, Filipino, Italian and English.
- Interactive phrase-recall cards, local mastery marking, backup/import and optional speech synthesis where installed voices support it. Other languages retain the seven-day training plan.
- **Field Notebook:** private per-lesson exercise writing, automatic offline saving and JSON backup/restore, with validation and a 2,000-character limit per note.
- Local bookmarks, favorites, quizzes, progress, achievement badges, themes, and JSON export/import for transferring between devices.
- **Review Deck:** recall flashcards unlocked by completed lessons; spaced practice at 1, 3, 7, 14, 30, and 60-day intervals, with 10-minute repeats for forgotten material. Review schedules are stored locally and included in progress backups.
- Offline app shell and included course library, cached by a same-origin service worker.
- No account, advertisement, external API call or tracking service is required for the current edition.

**New in 0.5:** Psychology (evidence journaling, habits, relational inference); Philippine law (Constitution, data privacy, consumer complaints); business (customer discovery, unit economics, Philippine launch steps); money (irregular bills, emergency planning, investment red flags). Sources are linked for optional online verification; lessons work offline. Links and regulations can change.

- **Capstone Self-Review Workspace (1.33):** The 14 applied case labs now have accessible three-point checklists learners can tick as they revise their Field Notebook exercises. Checks persist locally and in ordinary/encrypted backups, survive browser refreshes, and can be cleared per lesson without erasing notes, quiz answers, or completion. Imported checklist data is sanitized against known capstone IDs and exact boolean shapes. The interface explains that checkmarks are self-reported reflections, not automatically assessed work, professional certification, or evidence of proficiency. Desktop/mobile Chromium regression tests cover checks, reset, privacy separation, and backup restore.
- **Applied Capstone Labs (1.32):** Fourteen original advanced decision cases, one per subject, including a Philippine privacy-access exercise, a practical small-business pilot calculation, a phishing-resistant account recovery drill, and a research-methods appraisal. Each lab includes a three-point, subject-specific self-check rubric in the lesson reader and works offline with the existing Field Notebook, source links, quizzes and completion tracking. Self-check criteria guide revision; they are not automatically assessed or evidence of professional certification. National rules and scientific guidance can change: verify primary references online before real-world decisions.
- **Focused Revision Exams (1.31):** Turn missed-question insights into a private, offline revision exam with one click. Choose a maximum of 5, 10, or 20 questions; Atlas uses only lessons actually missed in validated exam history, prioritizes repeated misses, never pads with unrelated questions, and excludes all mature Shadow Library topics. Small pools produce appropriately short exams. Sessions use the existing answer feedback, resume-after-reload, score history, ordinary/encrypted backups, and lesson review flows. No learner scores are transmitted, and completing revision does not award lesson completion or prove mastery. New unit and real Chromium mobile tests cover this journey.
- **Exam Insights & Practice History (1.30):** Completed Practice Exams now create a bounded, private history of the latest 12 attempts. See per-subject question accuracy, recent scores, and direct review shortcuts to missed lesson questions. Results are recorded once on completion and persist after reload, through ordinary and encrypted backups. Historical records contain summary counts and missed lesson identifiers—not raw selected answers—and are validated on import, including checks that mature-course content cannot enter the general exam history. Clearing history needs confirmation and leaves other learning data untouched. These are practice signals, not professional competence or standardized test scores.
- **Two-Way Language Challenges (1.29):** The nine authored eight-phrase starter packs now support offline, seeded multiple-choice practice in either direction (English meaning → target-language phrase or target phrase → English meaning). Each of the eight questions includes four choices, immediate feedback, and an end-of-challenge answer review. Unfinished sessions resume after reload and are included in plain/encrypted progress backups; saved score history tracks attempts, best and latest result per supported language. Switching languages preserves an unfinished session, while replacement/deletion require confirmation. This exercises recognition—not conversational proficiency, pronunciation accuracy, or listening comprehension—and does not silently mark phrases learned.
- **Applied Mastery Tracks (1.28):** 29 advanced practical lessons across all 14 subjects, including three Philippine legal and financial consumer-rights workflows. Each has three in-depth teaching sections, an original worked example, a concrete exercise, a quiz with explanation, and further reading from official or reputable sources. New Beginner/Intermediate/Advanced filters make growing course libraries easier to navigate on mobile and desktop. Further-reading links require connectivity, and regulations may change.
- **Study Card Workshop (1.27):** Create, edit, search and delete up to 120 personal recall cards in your own words, with optional non-mature subject tags. Study due cards with answer reveal and offline spaced repetition, using 10-minute repeats or 1, 3, 7, 14, 30 and 60-day intervals. Editing a prompt resets its review schedule. Private cards transfer with normal and encrypted JSON progress backups, are sanitized during import, and are erased only by deliberate deletion, reset, or browser-data removal. The workshop contains no upload or synchronization and does not alter lesson completion.
- **Offline Practice Exams:** Choose a 5, 10 or 20-question challenge from one subject or the whole non-mature library. Each answer reveals the explanation; a final review links to the source lessons. Sessions resume after reload and transfer with validated local backups. Practice results do not change completed lessons or Mistake Lab records. The exam engine and mobile browser flow have automated regression coverage.
- **Encrypted Progress Backups:** Optional offline AES-256-GCM encrypted backups with PBKDF2-SHA256 (250,000 iterations), fresh salt and IV for each export. Unlocking a protected file opens the normal preview before any replacement. Passwords are not saved or sent; losing one makes the protected file unrecoverable. Plain JSON backups remain available.
- **Practice Queue Navigation:** Mistake Lab now has accessible previous/next controls and a question counter. Learners can choose which missed topic to practice next, see the active question, and move between topics without leaving the lab. The queue still clears only after a correct response.
- **Desktop navigation and explanations:** The growing desktop tool sidebar is independently scrollable, including keyboard/wheel navigation to lower items. Incorrect Mistake Lab retries display the lesson's explanatory feedback before another attempt.
- **Mistake Lab:** Incorrect lesson quiz answers create a private, offline re-practice queue. Learners can retry questions without losing previous completed lessons, clear them by answering correctly, or reopen the lesson. Mature-course content remains gated. Queue state is validated and included in JSON backups.
- **Private Field Notebook Library:** A searchable offline collection of your own lesson exercise notes, with safe excerpts, direct links back to their lessons and gated access for mature-course notes. Entries remain entirely in browser storage and travel with existing JSON backups.
- **Keyboard Accessibility:** A visible-on-focus Skip to learning content control, true main-region focus, and modal keyboard focus trapping. Background navigation is made inert while a dialog is open; Escape closes dialogs and restores focus to the learning content. Chromium verifies real keyboard navigation.
- **Safe Backup Restore:** Importing a JSON progress backup now validates its format and known lesson keys, shows a preview of the restored notes, lessons, quizzes and bookmarks, and requires explicit confirmation before replacing local progress. Cancelling or selecting an invalid backup leaves the current learning data unchanged. Backup import errors do not claim success.
- **Deep-Link Resilience:** Malformed or incomplete URL percent-encoding can no longer crash Atlas during startup or hash navigation. Browser tests verify safe recovery to Home, valid course deep links and a friendly error screen for unknown lessons.
- **Reliable Progress Reset:** Fresh independent state is created whenever progress is reset or restored, preventing stale nested answers, notes or practice data from leaking into later sessions. A real browser regression checks repeated resets after new quiz answers and private notes, including persistence across reloads.
- **Offline Library Center:** A dedicated illustrated settings page checks actual service-worker cache coverage, reports verified offline files, repairs missing content while connected, and checks for updated editions. No learner data is sent or removed. Browser storage can still be evicted after verification.
- **Browser & privacy hardening:** Five passing Chromium interaction suites cover lesson completion, private notes, search, replayable Case Files, phone layouts at 320 and 390 pixels, offline PWA reloads, the Shadow Library acknowledgment and corrupted-progress recovery. The About screen now reflects this verified development edition.
- **Offline precache integrity:** A regression test rejects duplicate service-worker precache URLs and missing files before browser install. Fixed a duplicate illustration path that interfered with offline activation.
- **Real browser smoke tests:** Automated Chromium runs in GitHub Actions exercise desktop lesson completion and field notes, reader settings, offline search, branching Case Files, mobile viewport width, and actual service-worker-powered offline reloads. Browser tooling is installed only during CI; production remains zero-dependency.
- **Practical Learning Tracks:** Twelve additional three-section field guides across science, negotiation, relationships and time management. Every lesson includes an original worked example, realistic exercise, quiz and source for further reading, and works offline. Relationship safety and scientific research topics include important limits and responsible-use guidance.
- **Storage Recovery Guard:** Unreadable browser progress is protected from automatic overwrite. A persistent warning offers a raw recovery download, and users can explicitly restore a valid JSON backup or reset. Failed saves are visibly flagged, and browser storage is never described as cloud-synced.
- **Listen to Lesson:** Browser speech synthesis reads lessons in short manageable chunks with pause, resume and stop controls, avoids external app APIs, and cancels when navigating away. Available voices and offline audio behavior vary by browser, system and voice implementation.
- **Visual Chapter Maps:** Every lesson now contains a responsive interactive topic pathway using its authored teaching sections and practice exercise. Accessible buttons jump to the matching content, supporting screen-reader and keyboard navigation without extra image downloads.
- **Comfort Reader:** Three adjustable lesson text sizes and a distraction-reduced focus mode, with accessible pressed-state controls. Preferences remain on-device, survive navigation, are included in JSON backups and work offline.
- **Case File Discovery:** Branching Case Files are now included in the offline Universal Search index. Search within stories and outcomes, filter to Case Files, and open a case directly without losing saved decisions.
- **Interactive Case Files:** Three two-step branching stories with twelve endings, covering suspicious bank alerts, workplace boundaries and consumer disputes. Story choices are local-only, included in JSON backup and cached for offline replay. The cases promote informed, noncoercive judgment.
- **Xyra's Corner:** A dedicated storybook guide page with an original lightweight amethyst-crowned Xyra portrait, accessible human-eared character design, 14 rotating daily reflections, and an offline recommendation to try an unfinished non-adult lesson. The artwork is vector illustration, not yet the intended final cinematic painterly character art.
- **New applied field guides:** Twelve additional three-section lessons on phishing, account protection, recovery backups, verifying evidence, causation, calibration, listening, constructive feedback, difficult conversations, project portfolios, interview stories and safer job searches. Each includes an example, practice activity, quiz and external further-reading source; all instructional text is available offline.
- **Learning Insights:** Local-only illustrated progress dashboard showing subject completion, latest quiz selections, learned phrases, and a 14-day activity calendar. Percentages describe activity, not expertise.
- **Offline reliability:** Local calendar-day tracking for visit streaks, quest selection, learning path dates and backups; invalid dates rejected. Service worker now cleans up only Xyra Atlas caches, never caches from unrelated applications on the same origin. Includes executable cache-lifecycle regression tests.
- **Universal Search:** Search the entire bundled offline Atlas—subjects, individual lessons, glossary terms and interactive scenarios—with category filters, relevance ranking, deep links, a keyboard shortcut (/), and privacy-safe mature-content filtering. No queries leave the device.
- **Knowledge Glossary:** More than 30 searchable, plain-language definitions with real-life examples and direct course navigation. Runs offline; mature terminology stays behind the Shadow Library acknowledgment.
- **Daily Quest:** A stable set of two lesson-and-quiz activities plus one real-life Scenario Lab decision per local day. Visual progress updates from completed lessons and scenarios without requiring a new account, a separate daily database or pressure to maintain streaks. Mature lessons are excluded.
- **Knowledge Constellation:** An interactive, illustrated map of all 14 subject worlds with suggested thematic connections, course completion markers, accessible course links, and offline support. It adapts from a starfield to a touch-friendly mobile grid.
- **Scenario Lab:** Six real-life choice exercises with explanatory feedback, local persistence, JSON backup and offline support. Sources are available online.
- **Guided Learning Paths:** five goal-based offline learning routes with seven customizable daily sessions, automatic tracking from completed quizzes, and saved plans in private backups. Mature content is never inserted into plans.
- **Practice Studio:** three offline interactive labs for emergency-fund targets, business unit economics and a 168-hour weekly time budget. Inputs save privately on your device and are included in JSON backups. These are educational estimates, not personal financial advice.

**Scope honesty:** This release is a real working foundation with concise introductory teaching, not yet a complete beginner-to-professional encyclopedia. Advanced chapters and richer cinematic/character artwork will grow in subsequent releases. The current unique SVG scenes are handcrafted vector illustrations, not the full painterly concept art. Seven days can establish useful first phrases, not native-like fluency.

## Run locally

Requires Node.js 20+ (no package install or network necessary).

```bash
npm run dev
```

Open `http://localhost:4173`. To run checks and build the production site:

```bash
npm run check
```

The static `dist/` directory is produced, including generated 192×192, 512×512 and iOS home-screen PNG icons. Build needs only Node built-ins.

## Deploy on Vercel

1. Import this GitHub repository into Vercel.
2. Use `Other` as framework (or let Vercel detect the `vercel.json` configuration).
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Deploy over HTTPS, visit once online, and let the service worker finish installing.

For iOS: open the Vercel URL in **Safari** → Share → **Add to Home Screen** → **Open as Web App**. For Android: open in **Chrome** → menu → **Install app** (when offered).

**Offline:** the app caches static files and all included learning content. After the service worker finishes and has cached the entire app shell, it runs offline, including lesson progress. The first visit, updates, and reinstall require connectivity. iOS can evict stored offline content under device-storage pressure; no web app can guarantee permanent storage. Keep backup exports of progress.

## Privacy and safety

- All data is kept in local browser storage on the device. It does **not** automatically sync between devices.
- A JSON backup contains your selected name, learning history, bookmarks and quiz answers. Treat it as personal data; store it privately.
- Clearing site data or uninstalling can erase progress. Export first.
- The Shadow Library is educational, with techniques explained in terms of recognition, consequences and informed consent; it is not a manual for coercing or exploiting people.
- Law, finance, psychology and health are educational general information; check primary local sources or relevant qualified professionals for decisions.

## Project structure

```
index.html             HTML shell and PWA metadata
styles.css             Responsive design system and screen styles
app.js                 Navigation, interface, storage, quizzes, review UX, install UX
data.js                Offline learning curriculum and language sprint
deeptracks.js          Earlier sourced field guides with examples and quizzes
masterytracks.js       29 advanced applied guides across all 14 learning subjects
capstonelabs.js         14 advanced case-based capstones with evidence rubrics
capstonechecks.js       Local private self-review checklist validation and updates
review.js              Dependency-free spaced repetition logic and input validation
fieldnotes.js          Offline per-lesson notebook validation and saving
studio.js
paths.js                Seven-session study planner, validation and progress              Validated savings, business, and time scenario calculations
phrasebook.js          Nine offline starter phrase packs and progress validation
languagechallenge.js   Offline two-way recognition questions and persisted scores
examhistory.js         Validated private exam results and subject-review summaries
focusedexam.js         Prioritized missed-question revision exams
assets/                14 distinct course scenes, a corner scene, vector identity
sw.js                  Offline service worker
manifest.webmanifest   Installability metadata
scripts/build.mjs      Dependency-free static build and PNG generation
scripts/artwork_builder.py   Optional source generator for 14 reproducible course scenes
scripts/serve.mjs      Local HTTP preview
tests/                 Content and PWA checks
vercel.json            Vercel build and security headers
```

## Next content milestones

1. Continue deep subject tracks beyond the 29 new mastery guides, with more Philippine-law coverage and region selection. The foundation for privacy, consumer and banking complaints is implemented.
2. Additional painterly cinematic chapter artwork and branded character scenes; the first set of 14 lightweight subject-specific illustrations is complete.
3. Expand the working study-card and language-challenge banks with more verified language material and properly sourced audio (the present audio depends on installed device voices).
4. A transparent download manager for optional offline packs and optional end-to-end encrypted synchronization.

Made for curiosity, by the Xyra Atlas project.
