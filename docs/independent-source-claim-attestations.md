# Independent source-claim verification

**Status: zero qualified independent source-use approvals.** The author has linked 42 external source URLs to 134 lessons and 42 applied decisions, but a URL and a signed packet do **not** independently substantiate any written claim.

1. Run `npm run export:source-evidence` to create `artifacts/source-evidence-matrix.json` and readable workbook. Each source has a `sourceId` (the `id` SHA-256 of the exact URL); each linked lesson/decision has an unchanged `kind`, `itemId`, and `contentHash`.
2. Independently verify the editor's identity and subject-specific qualifications; add only legitimately vetted public key, evidence, verification date and subjects to `docs/editorial-reviewers.json`. This is the same roster used for editorial curriculum attestations. Never commit signing private keys or personal identity documents.
3. The *external human editor* must read and inspect the actual publisher material, identify **every material teaching claim**, find the supporting passage, assess current jurisdiction/date and check the authored quiz answers, distractors and limitations. One source may support one claim yet contradict another. If any claim is unsupported, the verdict must be `changes-requested`.
4. The editor signs the exact independent review payload with an Ed25519 key held outside the repository: `npm run sign:claims -- /path/review.json /path/outside-repo/private.pem`. The signed JSON in `artifacts/` is not shipped to learners. After independent verification of the editor and their evidence, import `{payload,signature}` into `docs/source-claim-attestations.json`.
5. Run `npm run audit:claims`, or inspect the same CI report in `artifacts/source-claim-attestation-audit.json`. Every linked source-use site needs its *own* signed finding; editing an authored lesson or answer invalidates the old digest. Duplicated, outdated, unsupported or unauthenticated attestations fail closed.

## Review payload schema (illustrative, not an actual approval)

```json
{
  "schemaVersion": 1,
  "kind": "lesson",
  "itemId": "psychology:thoughts",
  "contentHash": "REPLACE_WITH_CURRENT_64_HEX_DIGEST",
  "sourceId": "REPLACE_WITH_SOURCE_URL_64_HEX_DIGEST",
  "reviewerId": "independently-vetted-editor",
  "reviewDate": "2026-11-04",
  "sourceAccessedOn": "2026-11-04",
  "verdict": "changes-requested",
  "scope": [
    "claim-to-passage-attribution",
    "publisher-and-evidence-quality",
    "date-and-jurisdiction-applicability",
    "quiz-and-scenario-answer-consistency"
  ],
  "jurisdiction": "Philippines, where applicable",
  "allMaterialClaimsReviewed": true,
  "allAnswerKeysReviewed": true,
  "optionFindings": [
    {"index":0,"text":"EXACT_AUTHOR_CHOICE_TEXT","authorMarkedCorrect":false,"finding":"ambiguous","editorNotes":"Real reviewer explanation of this choice and whether the answer key is justified."}
  ],
  "claims": [{
    "claimText": "REPLACE_WITH_EXACT_EXCERPT_OF_AUTHORED_TEACHING_CLAIM",
    "sourcePassage": "REPLACE_WITH_BRIEF_SOURCE_EXCERPT_ACTUALLY_FOUND",
    "sourceLocation": "REPLACE_WITH_OFFICIAL_PAGE_SECTION_OR_ANCHOR",
    "finding": "unverifiable",
    "contextualNotes": "Actual editor's documented analysis of the relevance, date, caveats, and what must be revised."
  }],
  "notes": "Document genuine regional, factual, curricular, scientific or legal constraints discovered by the qualified human editor."
}
```

The audit mechanically requires a traceable authored excerpt, full signed review scope, reasonably fresh source access (within 30 days before signing), substantive evidence, subject-appropriate qualified reviewer and Ed25519 integrity. An `approved` record cannot contain findings other than `supported`. A `changes-requested` record is never counted as approval.

**Important limitations:** Software cannot establish whether a quoted source passage actually exists or whether a reviewer found *every* material claim. The owner must separately verify real reviewer qualifications, the evidence and complete factual/cultural/pedagogical correctness. Original lesson/editorial attestations remain separate and mandatory. No release stage is automatically marked complete.

The `optionFindings` array must contain **every** option exactly as authored, indexed from zero, with a truthful `authorMarkedCorrect` flag and at least 24 characters of substantive reviewer notes for each. The example above is only a partial shape: an actual signed submission must cover all options. An ambiguous, incorrect, or unsupported distractor prevents an `approved` source-use review. This catches omitted and incorrectly attributed alternatives but does not automatically establish pedagogical correctness.
