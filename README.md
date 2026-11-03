# ✦ Xyra Atlas

**Your guide from beginner to mastery.** A beautiful offline-first, mobile-first, privately stored learning PWA for iOS, Android and desktop.

![Xyra Atlas emblem](assets/atlas-mark.svg)

## Current release: Field Guides 0.5

- A violet-and-gold responsive interface, **14 distinct original vector course worlds**, Xyra's Corner artwork, landscape hero and a home-screen app icon. The same course identity appears on home tiles, category cards, course covers and lessons.
- 14 learning subjects and **64 interactive lessons**: 52 short starters plus 12 new sourced, three-section field guides with real-world worked examples, exercises and quizzes (counts verified by tests).
- Psychology, legal literacy, business, money, productivity, communication, critical thinking, language study, digital literacy, career, science, relationships and influence.
- **The Shadow Library (18+ educational content)** covers manipulation, gaslighting, lies, emotional leverage, deceptive interface design, consent and adult media literacy. The age acknowledgment is a *content gate*, not verified age or identity security.
- Seven-day language practice framework for 20 languages, with **72 practical offline phrases across nine starter languages**: Japanese, Korean, Spanish, French, Mandarin Chinese, German, Filipino, Italian and English.
- Interactive phrase-recall cards, local mastery marking, backup/import and optional speech synthesis where installed voices support it. Other languages retain the seven-day training plan.
- Local bookmarks, favorites, quizzes, progress, achievement badges, themes, and JSON export/import for transferring between devices.
- **Review Deck:** recall flashcards unlocked by completed lessons; spaced practice at 1, 3, 7, 14, 30, and 60-day intervals, with 10-minute repeats for forgotten material. Review schedules are stored locally and included in progress backups.
- Offline app shell and included course library, cached by a same-origin service worker.
- No account, advertisement, external API call or tracking service is required for the current edition.

**New in 0.5:** Psychology (evidence journaling, habits, relational inference); Philippine law (Constitution, data privacy, consumer complaints); business (customer discovery, unit economics, Philippine launch steps); money (irregular bills, emergency planning, investment red flags). Sources are linked for optional online verification; lessons work offline. Links and regulations can change.

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
deeptracks.js          12 sourced field-guide lessons with examples and quizzes
review.js              Dependency-free spaced repetition logic and input validation
phrasebook.js          Nine offline starter phrase packs and progress validation
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

1. Deep subject tracks with credible citations and regional law selection, starting with the Philippines.
2. Additional painterly cinematic chapter artwork and branded character scenes; the first set of 14 lightweight subject-specific illustrations is complete.
3. Interactive study cards, question bank, spaced repetition and properly sourced language audio.
4. A transparent download manager for optional offline packs and optional end-to-end encrypted synchronization.

Made for curiosity, by the Xyra Atlas project.
