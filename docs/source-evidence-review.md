# XYRA Atlas — independent source review handoff

The current teaching library has 134 lessons, 42 applied decisions, and 42 distinct external reference URLs. Six Philippine NPC, BSP and DTI spot checks are limited maintainer observations, NOT independent expert approvals.

Run npm run export:source-evidence to build artifacts/source-evidence-matrix.json and artifacts/source-evidence-workbook.md. The first provides each referenced lesson and applied decision's exact SHA-256 source hash and full authored teaching context, grouped by the cited source URL. The second indexes those usages and offers a human review checklist. Both are separate from the deployable PWA and contain no learner records.

A verified external reviewer must inspect the publisher's current page, identify all relevant factual assertions and exact supporting passages, record jurisdiction, applicability, date and exceptions, check whether answer keys and safety guidance are correct, and request corrections where needed. A URL may support only some claims within a lesson. URL accessibility, a government domain and a hash are never proof of factual correctness.

Revisions change the authored item digest, requiring renewed approval of impacted content. The reviewer identity and subject competence must be independently vetted using the editorial process in docs/independent-editorial-attestations.md. No independent approvals or stage gate completion are created by the matrix itself.

## Signed human claim-by-claim evidence intake

The source-to-teaching matrix now also has a **separate signed evidence intake**. Run `npm run audit:claims` to summarize reviewer-verified source-use coverage; it defaults to zero approvals. The credentialed external reviewer must individually examine each material claim, current jurisdiction, publication source and quiz answer, then use `npm run sign:claims` with an Ed25519 key stored outside this repository. See [independent source-claim attestations](independent-source-claim-attestations.md) for the evidence format and limitations. This does **not** confer factual accuracy, educational certification or stage completion without real verified expert review.
