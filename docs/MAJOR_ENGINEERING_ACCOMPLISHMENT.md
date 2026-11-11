# Xyra Atlas — Major Engineering Accomplishment

**Recorded:** 11 November 2026  
**Milestone:** Core platform and visual/curriculum expansion — **ENGINEERING COMPLETED**  
**Branch:** `dev/atlas-visual-experience`  
**Deployment:** not merged to `main`; production deployment not authorized by this milestone.

## Delivered project

A self-contained offline-first PWA with 14 structured learning subjects, 139 existing core lessons, 42 clinic decisions, 20 starter-language pathways with 160 phrases, and learning aids including quizzes, reviews, notes, practice history, backup/recovery, world maps and illustrated navigation.

The development branch expands the interactive experience through:
- An illustrated World Gallery and Knowledge Constellation built around actual lesson completion.
- Four-station Inquiry Trails across 14 subjects (56 authored reasoning checkpoints).
- 14 Crossroads for interdisciplinary cases, transfer and alternative explanations.
- Personalized Course Field Guides featuring real next lessons and realistic study plans.
- **14 Expedition Studios, 42 new stage-aligned applied field missions and 42 ungraded decision alternatives**, including independent tasks and evidence criteria.
- Offline-packaged SVG assets and static resources, keyboard-visible focus, reduced-motion styling and responsive layouts.
- Editorial packets that include the **exact authored Expedition Studio teaching**, not only the original lessons. Changing authored teaching invalidates the content hash for independent reviewer verification.

## Engineering quality and scope

The GitHub Actions workflow validates the Node tests, static build, curriculum structure and source inventory, service-worker/offline assets, Chromium desktop/mobile and WebKit automated browser behavior. It generates reviewer evidence and reproducible release-candidate artifacts. The latest known green run before this milestone was [Verify Xyra Atlas](https://github.com/MattBoneo-30/xyra-atlas/actions/runs/42970781948). **A new commit requires a new green CI run before being described as validated.**

This milestone is **not an independent educational accreditation** and does not convert pending human reviews into completed tests.

## Remaining release responsibilities — explicit, not implied

| Release gate | Evidence still required | Status |
| --- | --- | --- |
| Advanced curriculum | Genuine signed independent pedagogical, subject, legal/source-claim and safety reviews | OPEN |
| Final visual experience | Owner approval of artwork, real iOS/Android installed-PWA screenshots, accessibility and offline acceptance | OPEN |
| Language quality | Qualified native/regional language reviewers for locale/register/pronunciation of 160 phrases | OPEN |
| Production release | Above signoffs, verified backup/restore and final owner release acceptance, merge, live deployment QA | OPEN |

The source-of-truth `docs/stage-gates.json` and `docs/device-evidence.json` are intentionally unchanged. The 18 physical-device cases remain NOT RUN without actual device results. Authentic approvals must include verifiable evidence before gate changes.

**Decision:** Celebrate the major engineering accomplishment; do not mislabel the whole project as fully reviewed or released.
