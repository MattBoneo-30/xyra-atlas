# ✦ Xyra Atlas

**Your guide from beginner to mastery.** A beautiful offline-first, mobile-first, privately stored learning PWA for iOS, Android and desktop.

![Xyra Atlas emblem](assets/atlas-mark.svg)

## Current release: Offline Asset Quality Gate 1.59

- A violet-and-gold responsive interface, **14 distinct original vector course worlds** plus three cinematic portal scenes and fourteen case-specific illustrated chapters, Xyra's Corner artwork and a home-screen app icon. The same course identity appears on home tiles, category cards, course covers and lessons.
- 14 learning subjects and **134 interactive lessons**: 117 original and mastery lessons, **14 applied capstone labs** and **3 Philippine casework lessons**, one in every subject. Each capstone contains an original decision case, worked example, hands-on exercise, self-check rubric, knowledge question, and optional source for further reading (counts verified by tests).
- Psychology, legal literacy, business, money, productivity, communication, critical thinking, language study, digital literacy, career, science, relationships and influence.
- **The Shadow Library (18+ educational content)** covers manipulation, gaslighting, lies, emotional leverage, deceptive interface design, consent and adult media literacy. The age acknowledgment is a *content gate*, not verified age or identity security.
- Seven-day language practice framework with **160 practical offline starter phrases across all 20 selectable languages**; every language now has phrase cards, spaced recall, two-way recognition and situational practice.
- Interactive phrase-recall cards, local mastery marking, backup/import and optional speech synthesis where installed voices support it. All packs retain the seven-day training plan and local-only audio rules; new regional phrases still need native-speaker review.
- **Field Notebook:** private per-lesson exercise writing, automatic offline saving and JSON backup/restore, with validation and a 2,000-character limit per note.
- Local bookmarks, favorites, quizzes, progress, achievement badges, themes, and JSON export/import for transferring between devices.
- **Review Deck:** recall flashcards unlocked by completed lessons; spaced practice at 1, 3, 7, 14, 30, and 60-day intervals, with 10-minute repeats for forgotten material. Review schedules are stored locally and included in progress backups.
- Offline app shell and included course library, cached by a same-origin service worker.
- No account, advertisement, external API call or tracking service is required for the current edition.

## Release notes

This project is developed iteratively. The detailed, chronological feature and verification history has been moved to [CHANGELOG.md](CHANGELOG.md), so this README remains useful for installation and evaluation. Latest verified CI: [227 Node tests, static bundle audit and Chromium/WebKit browser checks](https://github.com/MattBoneo-30/xyra-atlas/actions/runs/41699259088).

## Scope and verification

The current build contains 134 structured lessons, 42 contextual decision questions, working offline study tools and an accessible original vector-art library. A full independent editorial-review packet and cryptographic reviewer-signoff workflow are available, but **0 lessons and 0 decisions currently have qualified external approval**. General educational content is not professional certification or individualized legal, financial or medical advice.

The 36 SVG illustrations are original accessible vector compositions; they are **not** the final painterly cinematic illustrations envisioned for the project. Linux Chromium and WebKit checks do **not** establish real iOS/Android PWA installation, mobile-device performance or complete accessibility conformance. Review the evidence and open blockers in [stage gates](docs/stage-gates.json) before claiming production-final release.

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
2. Develop the final painterly cinematic chapter illustrations and richer branded character scenes. All 14 subject illustrations, three home worlds, and 14 individual capstone scenes are integrated; final painterly assets, richer character scenes and additional illustrations for ordinary lessons remain outstanding.
3. Expand the working study-card and language-challenge banks with more verified language material and properly sourced audio (the present audio depends on installed device voices).
4. A transparent download manager for optional offline packs and optional end-to-end encrypted synchronization.

Made for curiosity, by the Xyra Atlas project.


## Independent language review intake

The exact-source workbook for 160 starter phrases now has a separate signed human review intake. Use `npm run audit:language` to inspect per-locale editorial coverage and `npm run sign:language` for a genuine independently completed review. Both operate outside the deployable learner bundle; CI archives the audit result. Reviewer roster and ledger default to empty, **0 of 160 phrases are independently approved**, and no stage gate advances automatically. See [qualified language-review handoff](docs/independent-language-attestations.md). Source changes invalidate older signatures, and device speech remains unverified synthetic pronunciation.
