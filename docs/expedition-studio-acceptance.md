# Xyra Atlas — Expedition Studio Acceptance
**Integration:** dev/atlas-visual-experience only. No merge or release without owner approval.
**Scope:** 14 original scenario labs, 42 staged field missions (Beginner / Intermediate / Advanced), 42 selectable decisions with authored tradeoff explanations, 42 existing-course lesson links, and 42 original source artworks reused for mission stages.

## Independent review traceability
- Every subject's three missions and three decision consequences are attached exactly once to the first Beginner lesson in the SHA-256 editorial review packet.
- Printable HTML shows every authored choice, consequence, task, artifact, evidence test and limitation; source-to-teaching evidence includes the expedition record.
- This preserves pending-review status and invalidates any earlier hash when the course teaching changes.

## Data and learner integrity
- Study missions are educational exercises and **not** new core lessons. All lesson links are resolved from `COURSES` and use existing IDs.
- Progress indicators count actual published lessons recorded in the existing browser-local completion list. Choosing an option does not create scores, bookmarks, history, certificates or new stored identifiers.
- No remote requests, analytics or third-party embeds. Option explanations are inserted via `textContent`; authored HTML strings are escaped.
- Content in all 14 subjects is pending **independent editorial and subject-expert review**, with specialist caution for legal, financial, psychological and language scenarios. The mature Shadow world remains behind the application's existing gate.

## Visual and interaction QA
- Large illustrated, keyboard-operable disclosure with optional deep study content.
- Three decisions with `aria-pressed` and polite feedback region. Only one button pressed at a time.
- Stage cards pair locally bundled original world artwork with specific tasks, deliverables, evidence checks and real linked lessons.
- Mobile: stacked cards at <=900px; compact full-width scene at <=620px. Reduced-motion rules and visible focus styles.
- Verify separately on real 320px Android and iOS Safari, desktop light/dark, VoiceOver/TalkBack, offline reload and post-update service-worker cache.
- Run `npm test`, `npm run build`, `npm run audit:curriculum` and browser smoke before staging for owner acceptance.

**Limitations:** Passing automated tests is not proof of quality or professional accreditation. No completed manual visual acceptance or specialist attestations are asserted in this document.
