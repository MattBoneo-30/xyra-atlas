# Inquiry Trails — Visual Course and Expert Review Handoff

**Branch:** `dev/atlas-visual-experience`  
**Approval state:** Staged code only. No expert, owner, real-device, or production signoff is implied.

## What was implemented

Four connected, original inquiry stations in **each of 14 Atlas subjects**, totaling **56 authored assignments**:

1. **Observe:** Distinguish the available facts and competing interpretations.
2. **Explain:** Apply an appropriate conceptual model with visible assumptions.
3. **Challenge:** Consider disconfirming evidence, ethical limits and appealing but incorrect shortcuts.
4. **Transfer:** Adapt the method to a different context and defend the change.

Every station contains a guiding question, substantial concept explanation, independent assignment, collapsed worked response, tempting-mistake explanation, and explicit evidence standard. The four stops connect to pre-existing Beginner, Intermediate and Advanced lesson IDs. Their completion status is a **read-only navigation cue**, not a grade, certificate or new learning record.

The display is collapsed until the learner chooses it; the illustrated course map uses existing original Advanced world art. A responsive four-stop visual signpost and two-column long-form study cards collapse to one column on mobile. CSS includes keyboard focus, light-mode color changes, increased-contrast rules, reduced-motion rules and a print fallback.

## Subject coverage

| Course | Connected case |
| --- | --- |
| Psychology | Misreading a teammate's silence and protecting fair boundaries |
| Legal literacy | Disputed product description and conditional consumer procedure |
| Business | Unreleased subscription app, real demand and contribution margins |
| Savings | Irregular income, an equipment repair and loan stress |
| Time management | Unfinished projects, acceptance criteria and workflow constraints |
| Languages | A memorized directions request that fails under an unexpected reply |
| Communication | Late release changes and a public incident correction |
| Critical thinking | Missing denominators, causal inference and rare-event predictions |
| Digital literacy | Corrupted offline backup, atomic recovery and truthful release |
| Careers | Prototype claims, reproducible engineering and ethical portfolios |
| Science | Moon phases, seasonal models and confounded temperature readings |
| Relationships | Private disclosure, voluntary forgiveness and changed trust |
| Negotiation | Revision scope, hourly opportunity cost and contract exit rights |
| Defensive influence literacy | Hidden subscriptions, misleading conversion and meaningful consent |

## Independent editorial review requirements

All 56 stations are included in exact-source editorial hashes under `subjectInquiryTrail` on the first Beginner lesson of each course and printed in the editorial-review HTML packet. Reviewers need to examine **every** guiding question, factual claim, worked solution, limitation, numerical example, misleading shortcut and evidence criterion.

Use this checklist for each station:

- Is the model accurate for its named jurisdiction, setting and date?
- Does the worked explanation follow from the stated facts rather than imagined information?
- Are numerical computations and denominators correct?
- Are the counterexamples genuine tests rather than false equivalences?
- Are ethical, legal, health, privacy and safety boundaries properly stated?
- Can a learner independently attempt the task before seeing the example?
- Does the evidence standard test an observable capability instead of superficial agreement?
- Can the linked original lesson reasonably prepare someone for the station?

**No independent expert approvals have been received through this change.** Do not close the formal advanced curriculum or final visual gates.

## Technical acceptance plan

`npm run check` (Node tests + build), `npm run audit:assets`, `npm run test:browser`, `npm run test:webkit` and release preflight should be run in a checkout of this branch. Also inspect:

- 14 real course routes and the four correct existing lesson links in each.
- Search/filter navigation and previously staged illustrated Explore/Journey behavior.
- Narrow 320px/375px iPhone layouts, 768px tablet, and 1280px desktop.
- Every summary and hidden response using keyboard only, screen readers and focus state.
- Accurate read-only status after a lesson is marked complete; no change to quizzes, backup exports or stored data.
- Offline installed-PWA refresh after both `inquirytrails*.js` and the CSS have been precached.
- Published security headers, CSP and original restricted-content navigation.
- Genuine owner review of artwork composition and physical Android/iOS device observations.

At authoring time, isolated JavaScript syntax, schema, rendering and offline registration checks passed. **A full Node/browser/device run was not available from the connected GitHub environment.** The dedicated Node regression file is `tests/inquiry-trail.test.mjs`.

## Branch merging rules

Continue batching improvements in `dev/atlas-visual-experience`; do not merge or change the release status without explicit owner approval. Automatic Vercel preview deployments are disabled for this branch through its own `vercel.json` configuration. Existing production `main` is left untouched.

Once the branch is substantively complete, inspect the entire diff, run the test matrix, obtain required reviewer approvals, then request one deliberate merge/release decision. The new educational content must not be marketed as accredited before independent verification.
