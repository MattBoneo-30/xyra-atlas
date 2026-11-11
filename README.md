# ✦ Xyra Atlas

**An offline-first, mobile-first learning PWA.** A private pocket library with illustrated worlds, structured courses, practical decisions, recall and reflection.

![Xyra Atlas emblem](assets/atlas-mark.svg)

## New Expedition Studio (development branch)

Every course now includes an optional illustrated Expedition Studio with one authored real-world scenario, three comparative decisions with ungraded explanations, and three stage-specific field missions. Across fourteen learning worlds this adds **42 actionable tasks and 42 decision alternatives** with observable evidence criteria, using the established lesson IDs and original local scene artwork. The Studio introduces no new lesson completions, grades, certificates, personal records, remote requests, or tracking, and is bundled for offline use. Independent subject review and device acceptance are pending; it remains unmerged on the development branch. See [Expedition Studio QA](docs/expedition-studio-acceptance.md).

## New Course Field Guide (development branch)

Every subject now has a **personalized Field Guide** at the start of its course, using real unfinished lessons for a bounded study session, the existing stage-completion counts, and seven direct in-page shortcuts to the deep-learning studios and full syllabus. The 14 subject-specific guiding questions and 42 study moves encourage active application of established material without producing new grades or lesson identities. The interface is keyboard-friendly, responsive through 320px, light/dark-compatible, and bundled offline. Original lessons and prior advanced content remain intact. Independent editorial, browser/device QA, and final merge approval remain pending. See [Course Field Guide QA](docs/course-field-guide-review.md).

## Development branch stabilization

On `dev/atlas-visual-experience`, private practice-history and Knowledge Map presentation have been separated into pure `atlas-page-views.js`, recovering ~6.7 KB of main application source headroom. The responsive `atlas-release-polish.css` layer improves compact map cards, practice-history controls and keyboard focus, and both additions are precached for offline operation. Regression tests and the [release-readiness matrix](docs/release-readiness-batch.md) document intended behavior and remaining evidence. This branch remains unmerged; full branch CI, independent subject/language reviews, and real-device/owner visual acceptance are still required.

## Project status

**Release candidate under development — not production approved.** The release gates remain open; passing code checks does not establish subject-expert accreditation, native-language accuracy or physical-device approval.

| Area | Current scope |
| --- | --- |
| Learning library | 14 subjects, 139 stable core lessons; Beginner, Intermediate and Advanced paths |
| Practice | Quizzes, 42 contextual decisions, guided exercises, first-principles studies, research practicums and defensive reasoning |
| Interactive exploration | Illustrated world catalogue, 14-world learning constellation, 56 Inquiry Trail stations and 14 Crossroads missions |
| Languages | 20 starter language pathways and 160 phrases; native/regional expert review **pending** |
| Offline and privacy | Same-origin service worker, personal notes, bookmarks, progress, reviews, backup and recovery controls |
| Art and accessibility | Original local SVG scenes, responsive reading, accessible navigation and reduced-motion styles; final device QA **pending** |

A new installation correctly begins at **0 lessons and 0 decisions** completed. Course content is available offline after a successful first online cache. The protected Shadow Library contains **adult (18+) defensive educational material**, with an acknowledgment gate rather than verified age authentication.

Current development work is deliberately staged on [`dev/atlas-visual-experience`](https://github.com/MattBoneo-30/xyra-atlas/tree/dev/atlas-visual-experience), not merged into `main`. Automatic Vercel previews are disabled for this named branch through its `vercel.json` Git configuration. See [development and merge policy](docs/visual-development-branch.md) and [draft review PR](https://github.com/MattBoneo-30/xyra-atlas/pull/3).

## Core learner experience

- **Discover:** browse 14 illustrated course worlds, choose a level, and follow published lesson routes. The learning constellation and world-card meters reflect actual completed lessons, **not** professional qualifications.
- **Learn deeply:** first-principles explanations, case-based work, intermediate synthesis, advanced practicums and optional self-directed teaching material across all subjects.
- **Connect ideas:** 56 four-stage Inquiry Trail checkpoints and 14 interdisciplinary Crossroads missions. Links point to existing lessons and read completion state without adding grades or progress IDs.
- **Retain knowledge:** local Review Deck spaced repetition, practice exams, feedback, study streaks, a personal notebook and optional challenge exercises.
- **Study languages:** 20 locally bundled starter phrase sets, retrieval practice, explicit locale caveats and optional installed-device voices. Automated speech is not a native recording or proof of fluency.
- **Recover:** export personal data and restore validated backups; treat exports as sensitive. Browser storage can be erased, evicted or lost with a device.

Extensive changes and historical version details are in [CHANGELOG.md](CHANGELOG.md).

## Run locally and test

Requires **Node.js 20 or newer**. The production static build uses Node built-ins and does not require packages for its core construction.

```bash
npm run dev                    # http://localhost:4173
npm run check                  # syntax, Node tests, production build
npm run audit:assets           # run after building the dist/ folder
npm run audit:curriculum       # stage and lesson evidence audit
npm run check:sources          # online official-source URL health
npm run audit:claims           # exact-source expert attestations
npm run audit:editorial        # independent editorial attestations
npm run audit:language         # qualified language reviewer attestations
npm run audit:devices          # physical-device evidence
npm run release:preflight      # all release gate dependencies
```

Browser checks require their test-only Playwright dependencies. Once installed in the supported environment, run `npm run test:browser` and `npm run test:webkit`. Automated WebKit does **not** replace genuine physical iOS Safari/PWA testing. See [visual acceptance matrix](docs/visual-experience-acceptance.md).

## Deploying a verified build

The build command is `npm run build`; output is `dist/`. Vercel can use **Other** as framework, read `vercel.json` and deploy over HTTPS. After the first online visit and successful caching, installed learners can use the bundled material offline. Android users can use Chrome's **Install app** option when offered; iOS users can use Safari → Share → **Add to Home Screen**.

**Do not merge or initiate a production deployment while the four formal release gates remain open.** The draft PR accumulates the release candidate, test results and reviewer findings; the project owner authorizes the eventual merge once evidence is complete. Branch-only commits are intentionally excluded from production builds to avoid the Vercel deployment limit.

## Privacy and safety

- No account, advertisement, server-side learning analytics or external content API is required for the current offline edition.
- Learning state is stored locally in the browser rather than automatically synchronizing between devices.
- Personal exports may include notes, saved names, study history and quiz results. Keep backups private and verify restores before relying on them; removing site data can erase all local progress.
- The deployment uses restrictive CSP/security headers and same-origin static assets. Offline-first does **not** imply protection from unlocked-device access or permanent storage.
- Law, money, psychology, safety and health topics are **general education** and cannot substitute for current official sources or qualified advice.
- Shadow Library content is framed for defensive recognition, consequences and informed choice, **not** instructions for coercion or exploitation.

## Repository map

| Area | Main files |
| --- | --- |
| App shell and navigation | `index.html`, `app.js`, `atlas-icons.js`, `styles.css` |
| Courses and illustrated stages | `data.js`, `stageart.js`, `chapterart.js`, `atlas-world-gallery.js` |
| Advanced teaching and transfer | `atlas-inquiry.js`, `inquirytrails1.js`, `inquirytrails2.js`, `atlas-crossroads.js`, `atlascrossroads1.js`, `atlascrossroads2.js` |
| Learning state and restoration | `review.js`, `backup.js`, `backupcrypto.js`, `storagehealth.js`, `fieldnotes.js` |
| Language learning | `phrasebook.js`, `phrasereview.js`, `languagechallenge.js`, `conversationquest.js` |
| Offline build and release | `sw.js`, `scripts/build.mjs`, `scripts/static-asset-audit.mjs`, `vercel.json` |
| Testing and evidence | `tests/`, `scripts/editorial-review-packet.mjs`, `docs/stage-gates.json` |

## Independent review and acceptance

The [four release gates](docs/stage-gates.json) are **Advanced Curriculum**, **Final Visual Experience**, **Language Quality**, and **Release Readiness**. Every gate still requires evidence and explicit human signoff, including expert citation checks and native/regional review of starter language content.

- [Course and language review handoff](docs/inquiry-trail-review.md)
- [Interdisciplinary Crossroads acceptance](docs/crossroads-acceptance.md)
- [Visual branch, offline, CI and merge checklist](docs/visual-development-branch.md)
- [Mobile and artwork acceptance matrix](docs/visual-experience-acceptance.md)
- [Source-use review requirements](docs/source-evidence-review.md)
- [Native/regional language attestation requirements](docs/independent-language-attestations.md)

Run `npm run export:editorial`, `npm run export:language-review` and `npm run export:source-evidence` to generate reviewer evidence. Exact-content hashes and unsigned packets establish provenance, **not approval**. Signed, independent, qualified reviewers must confirm facts, legal applicability and language quality. Actual phone/device screenshots and an authorized release decision complete the remainder.

Made for curiosity, by the Xyra Atlas project.
