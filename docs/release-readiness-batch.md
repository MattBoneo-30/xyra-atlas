# Xyra Atlas — Branch Validation and Release Decision

**Working branch:** `dev/atlas-visual-experience`  
**Production:** `main` (intentionally unchanged)  
**Current approval:** BLOCKED until independent reviews, full branch CI and real-device QA are documented.

## What has been strengthened

### Architecture and source budgets

- `atlas-page-views.js` now owns the formerly inline **Practice History** and **Knowledge Constellation** markup.
- The main application supplies only the derived history/map models and existing actions. This separates presentation from storage and prevents redundant state.
- No learning progression, history schema, backup format, new lesson ID or credential rules are changed.
- Main `app.js` falls from approximately 234.5 KB to approximately 227.8 KB in UTF-8 source size (the audited cap is 240 KB), increasing future maintainability headroom without loosening a budget.
- `tests/page-view-extraction.test.mjs` covers history clear/retest controls, escaped strings, map lesson/course routes, offline asset registration and the app script budget.

### Visual refinement

- Added the local, offline `atlas-release-polish.css` stylesheet for narrow screens, high-contrast modes, keyboard focus and reduced motion.
- Knowledge Map: tightened mobile constellation nodes, usable card labels, more readable trail cards and clear completion summaries.
- Practice History: improved fitting of buttons, metric labels, recent score rows and focused retest controls at 320–430 px widths.
- No new remote fonts, images, telemetry, storage keys or external browser services.

### Required automated validation (not a human approval)

Run `npm run check`, `npm run audit:assets`, `npm run audit:curriculum`, `npm run check:sources`, `npm run audit:claims`, `npm run audit:editorial`, `npm run audit:language`, `npm run audit:devices`, `npm run test:browser`, `npm run test:webkit` and `npm run release:preflight`.

The pre-existing GitHub Actions workflow `.github/workflows/verify.yml` already checks source and build, exports independently reviewable content, audits assets and curriculum, runs desktop/mobile Chromium and WebKit smoke tests, and archives test screenshots plus the release-candidate package.

**Branch validation procedure:** enable its push trigger for `dev/atlas-visual-experience` only after the coherent batch is complete; this schedules a GitHub Actions check without merging and without a Vercel build because `vercel.json` disables automatic deployments for this branch. Check its actual run conclusion and screenshots before claiming it passed. An absent or pending status is not success.

### Release gates — who can close what?

| Gate | Necessary evidence | Still outstanding |
| --- | --- | --- |
| Advanced curriculum | Independent subject-qualified editorial approvals of actual authored content and official law/source claims, plus test results | Expert review and any corrections |
| Final visual experience | Owner acceptance, device screenshots, accessible focus, readable 320–1280 px layouts, offline PWA test | Physical iOS/Android and final art acceptance |
| Language quality | Native/regional reviewer signatures for actual locale-specific text, voice/register checks | Independent 20-language review |
| Release readiness | Latest green full branch CI, audited bundles, verified backup/restore, actual devices, explicit owner release decision | Final evidence and approval |

All four formal gates stay marked `complete: false` until their real criteria are met. No generated file or assistant self-review substitutes for an independent signature or a real physical-device run.

## Physical-device acceptance script

1. Install or launch Atlas on iPhone Safari and Android Chrome. Capture actual screenshots of Home, Explore, Course, Lesson, Knowledge Map, Practice History and Settings in light and dark modes.
2. From a narrow 320 px equivalent viewport, verify no document-level horizontal overflow, no cropped controls, 44 px practical touch targets and legible focus indicators.
3. Try keyboard-only navigation of the map, history clear flow, focused revision controls, four-stage inquiry panels and six-node Crossroads maps. Repeat using a screen reader; record issues accurately.
4. Disable the network after the app shell is cached. Open previous and newly extracted pages and confirm CSS/JS and world assets remain available.
5. Record lesson completion, add a private note and a practice history entry, create an encrypted backup if supported, restore into a clean test profile, and compare expected semantics. Avoid real credentials and health/financial data.
6. Change orientation, text zoom, preferred reduced motion and high contrast; check that the new visual layouts remain understandable without decorative effects.
7. Review every source-claim counterexample and localized phrase with the appropriate independent reviewer. Unreviewed content must not be advertised as certified.

## Controlled merge rules

Do **not** merge solely because isolated syntax checks succeed. Obtain a green full CI run, required human/device evidence, owner visual acceptance and a final source-diff review. When all requirements are satisfied, request the owner's final go-ahead, then merge the accumulated development branch once and allow production Vercel to deploy. Before those steps, `main` and the four gates remain untouched.
