# Atlas Course Field Guide — Visual Learning Navigation and Review

**Branch:** `dev/atlas-visual-experience`  
**Status:** Implemented in branch, not independently signed off or released.  
**Scope:** Fourteen course worlds, 139 unchanged core lessons, 14 new subject-specific guiding questions and 42 concise study strategies.

## The problem solved

Each course now has a substantial three-level ladder, Inquiry Trail, interdisciplinary Crossroads, stage-spanning portfolio, decision simulations, applied clinic and complete lesson list. This depth previously meant a very long course page with limited direct wayfinding.

The **Course Field Guide** appears above the existing three-level syllabus and acts as an accessible study dashboard. Nothing is deleted or hidden behind an account or paywall. It is an optional navigation and planning layer, not a substitute for existing exercises.

## Core behavior

1. **Your next reading session:** Uses the actual first unfinished lesson and up to two subsequent unfinished lessons, within a target of 40 reading minutes. If the first lesson exceeds the target, it is still shown so no task is silently skipped. A recorded complete course offers a revisit action rather than a fabricated new lesson.
2. **Three-stage study position:** Displays actual Beginner, Intermediate and Advanced completion counts from the existing ladder. The active stage reflects the next unfinished lesson. No certifications or new scores are created.
3. **Seven quick jumps:** Focused in-page navigation to Learning Levels, Inquiry Trail, Crossroads, Portfolio Project, Decision Practice, Practice Clinic and All Lessons. These are native buttons with delegated event handling; **they do not change the URL hash**, ensuring compatibility with Atlas's `#/course` and `#/lesson` routing.
4. **Subject study strategy:** A collapsed three-step learning method personalized to each of the 14 subjects. The steps guide how to use the existing course material from initial framing through critical review and ethical transfer. The 14 questions and 42 steps enter the expert-review packet. They are authored, not independently approved.
5. **Improved chapter list:** Clearer lesson rows, completion accents, accessible filter controls and responsive narrow-screen spacing.

### Evidence handling

The guide computes state from the already-saved completed lesson keys and published lesson `minutes`. Its JavaScript has **no calls to** storage, network, analytics, timers or learner profile mutations. It creates no new lesson IDs, classes, assessments, grades, curriculum prerequisites or protected-branch cross-links.

The adult-only subject still relies on the original gated course route, and its private curriculum is not exposed through this new guide.

## Source and offline inventory

- `atlas-course-orientations.js`: fourteen original subject learning questions and three specific teaching moves each.
- `atlas-course-field-guide.js`: validated source coverage, pure session planning, safe HTML rendering and bounded in-page focus/scroll navigation.
- `atlas-course-field-guide.css`: responsive light/dark course dashboard, small-screen session cards, study route index, focus styling and reduced-motion fallback.
- `app.js`: small guide insertion and stable target IDs on the ladder and applied clinic.
- `atlas-crossroads.js`: stable `atlas-crossroads` target ID.
- `index.html`, `scripts/build.mjs` and `sw.js`: local stylesheet and module inclusion.
- `scripts/editorial-review-packet.mjs` and `scripts/editorial-review-html.mjs`: exact-content independent-review inclusion.
- `tests/course-field-guide.test.mjs`: all-world coverage, bounded scheduling, real routes, safe markup, keyboard focus behavior, editorial provenance, offline inventory and 240 KB app budget.

## Acceptance matrix

| Scenario | Expected evidence | Status |
| --- | --- | --- |
| First-time learner | Correct first unfinished lesson, relevant first-stage count and original reading route | Source-level checked; real browser pending |
| Returning learner | Next actual unfinished lessons, honest minutes and counts, unchanged stored records | Source-level checked; integration run pending |
| Full course recorded | Helpful optional revisit, no new grade or credential | Source-level checked; integration run pending |
| Every subject | One unique question, three specific self-study moves and applicable limits | Authored; independent specialist review pending |
| Navigation | Seven buttons scroll and transfer focus to correct targets without changing hash route | Source-level checked; screen-reader and browser QA pending |
| 320/375 px | No document overflow, visible action labels, practical touch targets | Styles authored; device/browser QA pending |
| Offline PWA | All three new local files precached, navigation works after offline reload | Inventory checked; actual offline test pending |
| Safety/privacy | No user-entered values saved, age restriction intact, appropriate high-stakes cautions | Source-level checked; formal review pending |
| Final release | `npm run check`, static budget audit, Chromium/WebKit tests, expert signoff, owner approval | **Not complete** |

## Owner-controlled branch release

Do not merge into `main` until full CI and physical iPhone/Android evidence, accessibility acceptance and appropriate qualified editorial reviews are completed. Automatic Vercel deployment for the dedicated development branch remains disabled in its Vercel Git settings. A code-side reviewer packet or synthetic example is not expert approval. All four published release gates remain open.
