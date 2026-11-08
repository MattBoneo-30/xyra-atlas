# ✦ Xyra Atlas

**Your guide from beginner to mastery.** An offline-first, mobile-first private learning PWA.

![Xyra Atlas emblem](assets/atlas-mark.svg)

## Current build: offline-first release candidate (not production approved)

- Mobile-first violet-and-gold UI with offline course worlds, accessible vector art and PWA icons.
- **14 subjects and 139 structured lessons**, including sourced legal/astronomy chapters, applied capstones, Philippine casework, evidence labs and worked examples. Lesson identifiers remain stable.
- Psychology, legal literacy, business, money, productivity, communication, critical thinking, language study, digital literacy, career, science, relationships and influence.
- **The Shadow Library (18+ educational content)** covers manipulation, gaslighting, lies, emotional leverage, deceptive interface design, consent and adult media literacy. The age acknowledgment is a *content gate*, not verified age or identity security.
- Japanese foundations: **26 sequenced checkpoints**, 46 basic hiragana and 46 basic katakana, vowel memory associations, row-by-row reading, everyday nouns, particles and simple verbs. Optional offline kana recall reviews only previously taught characters, schedules remembered/missed sounds, and preserves private progress in backups. Synthetic device audio does not grade pronunciation.
- Seven-day language practice framework with **160 practical offline starter phrases across all 20 selectable languages**; every language now has phrase cards, spaced recall, two-way recognition and situational practice.
- Phrase recall, spaced review, situational language practice and optional on-device speech synthesis; native/regional review remains pending.
- **Field Notebook:** private per-lesson writing with automatic offline saving, JSON backups and a 2,000-character limit; advanced writing scaffolds preserve existing notes.
- **Specialist continuations:** 14 existing advanced lessons gain three full concept explanations, worked cases, independent tasks and detailed model comparisons; external review remains pending.
- **Evidence Paths:** 42 review protocols distinguish lesson completion, private drafts and independent validation.
- **Skill Spirals:** 42 progressive cases across 14 subjects, with worked examples, misconception checks and linked notebooks.
- **Mastery Defense:** 14 advanced writing cases. **Language Transfer:** 20 locale-aware missions. Independent reviews remain pending.
- Local bookmarks, favorites, quizzes, progress, achievement badges, themes, and JSON export/import for transferring between devices.
- **Recovery Studio:** 42 fresh practice cases after missed quiz retries, with concealed worked reasoning and no extra grades.
- **Review Deck:** recall flashcards unlocked by completed lessons; spaced practice at 1, 3, 7, 14, 30, and 60-day intervals, with 10-minute repeats for forgotten material. Review schedules are stored locally and included in progress backups.
- Offline app shell and included course library, cached by a same-origin service worker.
- No account, advertisement, external API call or tracking service is required for the current edition.

## Release notes

Development and verification history lives in [CHANGELOG.md](CHANGELOG.md). Consult [the latest GitHub Actions checks](https://github.com/MattBoneo-30/xyra-atlas/actions) before deploying; a passing code pipeline is not external editorial approval.

## Scope and verification

The current build contains 139 structured lessons, 42 contextual decision questions, working offline study tools and an accessible original vector-art library. A full independent editorial-review packet and cryptographic reviewer-signoff workflow are available, but **0 lessons and 0 decisions currently have qualified external approval**. General educational content is not professional certification or individualized legal, financial or medical advice.

The integrated original SVG illustrations include 42 subject-and-stage scenes in addition to earlier course and chapter compositions; these lightweight vector illustrations are **not** owner-approved final painterly cinematic artwork. Linux Chromium and WebKit checks do **not** establish real iOS/Android PWA installation, mobile-device performance or complete accessibility conformance. Review the evidence and open blockers in [stage gates](docs/stage-gates.json) and the [single external acceptance handoff](docs/release-acceptance-handoff.md) before claiming production-final release.

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

- The Vercel deployment and local preview share a restrictive Content Security Policy with local-only scripts and connections, prohibited object embedding, and frame protection. Security headers, offline assets and extension-sensitive 404 behavior are covered by automated tests. No account or external CDN is needed.

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
datacontrols.js        Private progress category inventory and selective erase
studio.js
paths.js                Seven-session study planner, validation and progress              Validated savings, business, and time scenario calculations
phrasebook.js          Twenty offline language starter phrase packs and progress validation
phrasereview.js         Private language-by-language spaced recall scheduling
languagechallenge.js   Offline two-way recognition questions and persisted scores
conversationquest.js      Validated situational phrase-sequence sessions, scoring and history
examhistory.js         Validated private exam results and subject-review summaries
focusedexam.js         Prioritized missed-question revision exams
assets/                14 course scenes, three home worlds, 14 illustrated chapters, corner art and identity
sw.js                  Offline service worker
manifest.webmanifest   Installability metadata
scripts/build.mjs      Dependency-free static build and PNG generation
scripts/artwork_builder.py   Optional source generator for 14 reproducible course scenes
scripts/serve.mjs      Local HTTP preview
tests/                 Content and PWA checks
vercel.json            Vercel build and security headers
```

**External-reviewer signing utility:** `npm run sign:editorial -- <review.json> <private-key-outside-repo.pem>` signs an actual reviewer-completed exact-content review using a locally held Ed25519 private key. The helper refuses keys stored in the Git repository and writes only the signed record to an untracked artifact; full instructions in `docs/independent-editorial-attestations.md`. Neither this command nor a passing CI report certifies the content without real external review.\n\n**Independent editorial attestation intake:** Editorial claims can now be checked against a signed exact-content hash and an externally vetted subject-specific reviewer roster. CI produces an audit report with zero approvals by default; source revisions invalidate approvals. The process does **not** invent reviewers or automatically change stage gates. Details: `docs/independent-editorial-attestations.md`.\n\n**CI browser environment:** GitHub Actions uses a pinned Ubuntu 24.04 runner so the tested Playwright 1.56 Chromium/WebKit binaries remain supported; the moving `ubuntu-latest` runner is not reliable for this browser version.\n\n**Language editor workbook:** `npm run export:language-review` creates a version-specific JSON inventory and printable Markdown workbook for all 160 starter phrases in 20 languages, with each expression's locale, context, romanization caveats, exact source digest and six native-speaker review criteria. The sources are explicitly unreviewed; the workbook is archived in CI but not shipped to learners. This prepares independent regional/native editor signoff without asserting fluency.\n\n**Portable reviewer display QA:** Chromium now verifies that the exported 176-item HTML review copy loads with all subject anchors, expands full lesson evidence through keyboard activation, and fits mobile width. This is editor usability testing, not independent subject-matter approval.\n\n**Reviewer-friendly HTML:** Running `npm run export:editorial` also creates a portable print-ready HTML view of every authored lesson, source, answer key and decision case with exact source hashes. The artifact is saved in CI next to the JSON reviewer packet. It has no scripts or learner data; it does not constitute independent signoff.\n\n**Independent editorial review handoff:** Run `npm run export:editorial` to create an artifact containing the complete current 134-lesson teaching inventory, all 42 decision questions, their references, exact answer rationales and SHA-256 content digests. CI archives this private author-content packet for qualified editors. All items explicitly remain **pending independent review**; generating a hash or passing software tests does not approve a lesson, validate citations, or complete the Advanced Curriculum gate.\n\n**Philippine agency claim register:** `docs/claim-review-register.json` now traces six limited, date-stamped claims to NPC/BSP/DTI public sources. The related DTI casework also links the official post-mediation adjudication requirements. These are source checks, **not** professional legal/financial editorial approval.\n\n**Public-source link monitoring:** The separate weekly and manually dispatchable GitHub Actions workflow runs `npm run check:sources`, stores a source-health JSON report, and flags inaccessible, missing or access-restricted public URLs. It does not send learner data or certify that online materials substantively support claims. Independent editorial review remains necessary.\n\n**Curriculum audit workflow:** Run `npm run audit:curriculum` to generate an offline-only `artifacts/curriculum-audit.json` file with coverage counts and per-lesson editorial gaps. CI uploads the report as a separate artifact after testing the production source. It does not certify expert accuracy or source validity and it does not change learner progress.\n\n## Next content milestones

1. Continue deep subject tracks beyond the 29 new mastery guides, with more Philippine-law coverage and region selection. The foundation for privacy, consumer and banking complaints is implemented.
2. Complete owner-approved painterly art and richer character scenes. All 14 subject illustrations, three home worlds, 14 capstone scenes, and 42 stage-specific illustrated learning worlds are now integrated; final art approval remains outstanding.
3. Expand the working study-card and language-challenge banks with more verified language material and properly sourced audio (the present audio depends on installed device voices).
4. A transparent download manager for optional offline packs and optional end-to-end encrypted synchronization.

Made for curiosity, by the Xyra Atlas project.


## Independent review workflows

The 134 lessons, 42 decisions and 42 source URLs require independent factual/editorial signoff; all 160 starter language phrases require qualified regional review. Use `npm run export:source-evidence` for exact-source traceability and `npm run audit:language` for genuine signed reviewer coverage. None is automatically approved. See [source review](docs/source-evidence-review.md) and [language attestation](docs/independent-language-attestations.md) instructions.