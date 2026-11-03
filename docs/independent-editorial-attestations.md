# Independent editorial attestation intake

This process supports review of the exact 134 lesson and 42 decision records in `artifacts/editorial-review-packet.json`. It is **not a way for software to invent professional review**. The current reviewer roster and attestation ledger are deliberately empty.

A qualified external reviewer and project owner should independently verify expertise, suitability for each subject and identity *outside of this program*. Enter only confirmed reviewer public Ed25519 keys, approved subject IDs, verification date and real supporting credential evidence in `docs/editorial-reviewers.json`. **Never commit an Ed25519 private key.**

For each accepted lesson or decision, the reviewer signs the bytes returned by `signedReviewPayload(payload)` using their own private key. The payload contains exactly: `schemaVersion`, `kind`, `itemId`, `contentHash`, `reviewerId`, `reviewDate`, `verdict`, `scope` and `notes`. The `scope` must include all six review categories in `REQUIRED_REVIEW_SCOPE`. Store the signed payload and Base64-encoded signature in `docs/editorial-attestations.json`.

Run `npm run audit:editorial` to produce `artifacts/editorial-attestation-audit.json`. The tool checks content-hash matching, a public-key signature, a vetted and subject-scoped reviewer, a valid date, expiry and duplicates. Rejected attestations fail CI; an empty ledger is permitted and reports **0 approved**. Changes to lessons invalidate the previous content hash.

**Important limitations:** Ed25519 validates key possession, not whether a reviewer actually holds their claimed degree or provided a meaningful review. Owner verification and informed human signoff are mandatory. Even a complete ledger does not automatically change `docs/stage-gates.json`; the release still needs independent source, legal, accessibility and quality acceptance. Never claim certification based on tests alone.
