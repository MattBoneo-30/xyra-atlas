# Xyra Atlas — Visual Experience Acceptance Matrix

**Status:** Implementation and source-level checks completed; owner artwork approval, genuine device screenshots and hands-on QA are **pending**. This document is a test plan, not evidence that tests were executed.

## Scope of this visual phase

- Home: original illustrated three-horizon discovery gallery and the existing Lantern Library and Starlit Garden scenes, with real course destinations.
- Course: stage artwork, numbered world seal, level progression, active lesson and existing completion meter.
- Lesson: stage-aware atmosphere, the three-level compass, illustration/caption, reading controls and page-position ribbon.
- Visual baseline: violet/gold and light modes, high contrast, reduced motion, keyboard focus, narrow mobile overflow and offline media availability.

The reading ribbon measures **position on the current page**, not learning progress, mastery, time spent or credentials. No new user information is stored.

## Real-device and browser matrix

| Environment | Required checks | Acceptance evidence | State |
| --- | --- | --- | --- |
| Desktop Chromium 1280×800 | Home galleries; course stage art; lesson compass; scroll progress; keyboard navigation; light/dark | Screenshot per screen, no console errors, working course links | Pending |
| Desktop WebKit 1280×800 | Same screens and button focus; backdrop fallback; horizontal gallery where relevant | Screenshots and inspection notes | Pending |
| 768×1024 portrait tablet | Landscape assets remain readable; grids flow without clipping; controls accessible | Screenshots, overflow inspection | Pending |
| 375×812 iPhone Safari | Home art, horizon swipe, course stage indicators, lesson reader, bottom nav, safe-area spacing | Physical-device screenshots and touch notes | Pending |
| 320×568 narrow mobile viewport | No horizontal document overflow; complete heading/labels; focus and button targets usable | Screenshot and DOM measurement | Pending |
| Android Chrome / installed PWA | Open course offline, read illustrated lesson, swipe horizon gallery, return after reopening app | Network-off screen capture, state and cache checks | Pending |
| iPhone installed PWA | Offline startup and artwork, progress ribbon, dark/light, storage and safe-area behavior | Physical iOS evidence | Pending |
| OS reduced motion and high contrast | No decorative movement where disabled, clear selected stage and visible focus | Screen capture, keyboard checks | Pending |

## Functional inspection script

1. On the home page, locate **A world for every curiosity**. Open each of the three illustrated tiles and confirm it routes to the named subject, not the wrong world or a nonexistent lesson.
2. On a course page, inspect the world seal and the three stage illustrations. Confirm there is no overlap with text, progress markers or favorite controls.
3. Open a Beginner, Intermediate and Advanced lesson. The compass should identify the correct current stage using one `aria-current="step"` and show the published lesson count.
4. Scroll a long lesson from top to bottom. The thin top ribbon should move monotonically from 0 to 100% of page travel without changing completion, quiz scores, notes or review schedules. It is hidden from assistive-technology announcements to avoid confusing it with a grade.
5. Repeat in light mode, focus mode, reduced-motion mode and high-contrast mode. Confirm text, captions and interactive elements remain legible.
6. Use Tab, Shift+Tab and Enter to open a horizon, focus a lesson, reveal a worked answer and return. No keyboard trap or invisible focus is acceptable.
7. Disable the network **after** the app and art have been fully cached, reload, and ensure the new CSS and JavaScript remain available with all illustrated assets.
8. Check the existing device backup/restore tests independently. This phase intentionally does not modify them.

## Failure thresholds

- **Block release:** incorrect navigation, inaccessible button or hidden focus, lost content under 320px width, missing offline assets, unreadable stage identity, corrupted notes or changed grade behavior, failed full build, or unresolved build budget violations.
- **Review before final art signoff:** wrong composition/crop at important viewports, illegible captions, visual mismatch among worlds, insufficient light-mode contrast, distracting motion, inconsistent typography or clipping.
- **Do not claim completion:** until owner-approved art, physical iOS/Android screenshots, and required independent accessibility and real-browser checks are documented.

## Source-level safeguards

Dedicated tests: `tests/visual-experience.test.mjs`. Existing project checks: `npm run check`, `npm run audit:assets`, `npm run test:browser`, `npm run test:webkit`, and the applicable release preflight.

The dedicated experience uses local `atlas-visual-experience.css` and `atlas-visual-experience.js`; both are included in the static builder and service-worker cache. The main script remains below the existing 240 KB raw source budget. Automated syntax and source-level inspections performed during authoring are **not** substitutes for running the actual Node/Playwright suites or genuine physical-device QA.
