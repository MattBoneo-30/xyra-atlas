# Atlas Crossroads — Interdisciplinary Course Maps

**Branch:** `dev/atlas-visual-experience`  
**Current acceptance:** Authored and integrated; independent expert, browser and physical-device QA remain pending.

## Purpose

The existing Atlas curriculum has 139 published core lessons, four-stage Inquiry Trails, a visual world gallery and numerous advanced practice modules. This phase adds a **distinct transfer skill**: asking learners to combine two disciplines when a practical decision cannot be solved by one subject alone.

There are **14 original cross-world missions**, one per subject. Each presents a continuing situation, two independent disciplinary lenses, one individual challenge, a worked comparison hidden by default, a counterargument and an explicit evidence criterion. No scores or personal data are written. All content is fictional, educational and pending specialist review.

## Subject connections

| Starting world | Connected world | Decision |
| --- | --- | --- |
| Psychology | Communication | Unverified motives versus a practical deadline |
| Laws | Business | Consent and long-term customer value of a subscription |
| Business | Digital | Direct bank sync versus supported scope and privacy |
| Savings | Time | Cash timing versus delivery and acceptance dependencies |
| Time | Career | Shipping a prototype versus portfolio claim accuracy |
| Languages | Communication | Repairing misunderstood directions |
| Communication | Relationships | Correcting a mistake without disclosing private life |
| Critical thinking | Science | Misleading rates, confounding and causal inference |
| Digital | Business | Backup reliability versus a truthful paid offering |
| Career | Negotiation | Honest portfolio evidence and realistic client scope |
| Science | Critical thinking | Confounded urban temperature readings |
| Relationships | Psychology | Consent, repair and interpretation under uncertainty |
| Negotiation | Laws | Revision hours and unclear intellectual-property rights |
| Defensive influence literacy (18+) | Digital | Consent-interface design and real data permissions |

No other course links directly into the restricted Shadow Library; its existing age gate remains the only entry mechanism.

## Six-point visual route

The route displays the starting world, the four real lesson checkpoints (Observe / Explain / Challenge / Transfer) and the connected world. All links reference **existing course and lesson IDs**, not fabricated credentials or new progress keys. The four lesson status cues are derived from existing completion records; they do not imply that the new challenge was passed.

The map is inside a collapsed course-level disclosure, and the worked response is inside a separate disclosure. Native links and summaries work with keyboard interaction. The layout adapts from six columns to three and then two; colors respect light/dark, higher contrast and reduced-motion preferences.

## Implementation

- `atlascrossroads1.js`, `atlascrossroads2.js`: 14 original interdisciplinary case records.
- `atlas-crossroads.js`: strict subject/partner validation, safe HTML encoding, actual navigation and rendering.
- `atlas-crossroads.css`: responsive six-node constellation, dual-lens cards and hidden worked reasoning.
- `atlas-inquiry.js`: appends Crossroads after the existing four-stop Inquiry Trail.
- `app.js`: passes the known course collection to the inquiry renderer; no new learner state.
- `index.html`, `scripts/build.mjs`, `sw.js`: local/offline asset registration.
- `scripts/editorial-review-packet.mjs`, `scripts/editorial-review-html.mjs`: source-accurate expert-review hashing and print handoff.
- `tests/atlas-crossroads.test.mjs`: regression coverage for all 14 worlds, 84 route nodes, links, safety, review packets and offline assets.

## Required acceptance evidence

1. Run `npm run check`, `npm run audit:assets`, `npm run test:browser`, `npm run test:webkit` and `npm run release:preflight` from a full branch checkout.
2. Manually follow all 14 Crossroads, verifying 84 real node links and that restricted-library handling remains unchanged.
3. Confirm a completed lesson changes only its existing status cue, without granting Crossroads credit or changing quizzes, notes, backups or schedules.
4. Test the nested disclosure flow with Tab/Enter/Space, visible focus and assistive technologies. Verify that the main course remains readable while both disclosures are collapsed.
5. Inspect 320px, 375px, 768px and 1280px viewport screenshots in both themes. Verify no clipped labels or unwanted horizontal page scrolling.
6. Check offline reloading on installed Android Chrome and iPhone PWA after precaching both content files and both visual modules.
7. Review every authored concept, worked example, counterargument and evidence criterion with independent subject specialists. Check numerical examples, jurisdiction-sensitive statements and safety boundaries.
8. Review original image composition with the project owner. A source-level render or an illustration query is not a real screenshot.

## Verification actually performed

Isolated JavaScript syntax and validation passed for all 14 case records. All 14 constructed six-node maps rendered with correct partner links, and asset registration, source-review packet inclusion, CSS balance and the 240 KB main-script cap were inspected. **These checks are not a full app build, device test or independent subject approval.** The branch's Vercel auto-preview rule remains disabled, and production `main` is not changed.

## Merge policy

Keep accumulating on `dev/atlas-visual-experience`. Do not merge, launch preview builds or close any of the four formal release gates until the owner explicitly authorizes release following the outstanding reviews and verification.
