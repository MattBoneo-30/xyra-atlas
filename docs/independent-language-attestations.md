# XYRA Atlas language review evidence

**Current status: 0 of 160 language phrases in 20 locales have independent editorial approval.** Do not fabricate editor identities, reference recordings or review signoffs.

Run `npm run export:language-review` to generate the source-hashed inventory in `artifacts/language-review-packet.json` and printable `artifacts/language-review-workbook.md`. Each phrase has an exact-source SHA-256 fingerprint.

Independently vet real native/regional editors before adding their public Ed25519 keys, subject-matter credentials, identity-confirmation status, review date and allowed exact locales to `docs/language-reviewers.json`. Store no private identity documents or cryptographic private keys in the repository. Example reviewer metadata:

```json
{
  "id":"independently-vetted-editor",
  "independentIdentityVerified":true,
  "qualificationsChecked":true,
  "verifiedOn":"2026-11-04",
  "verifiedLocales":["es-ES"],
  "qualificationEvidence":"Appropriate external public credential or independently verified editorial evidence",
  "publicKeyPem":"-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----\n"
}
```

The **actual human editor** reviews meaning, register/politeness, regional/cultural usage, scripts/transliteration, pronunciation reference provenance and safety/naturalness. Store their specific substantive findings in this exact JSON review payload:

```json
{
  "schemaVersion":1,
  "kind":"language-phrase",
  "itemId":"es:hello",
  "contentHash":"REPLACE_WITH_CURRENT_SOURCE_SHA256_HASH",
  "reviewerId":"independently-vetted-editor",
  "reviewDate":"2026-11-04",
  "verdict":"approved",
  "scope":["meaning-accuracy","register-politeness","regional-cultural-use",
           "script-transliteration","pronunciation-provenance","safety-naturalness"],
  "notes":"Actual human findings for this phrase including locale-specific limitations and required changes."
}
```

On a trusted device the reviewer can run `npm run sign:language -- /path/to/completed-review.json /path/outside-repo/private.pem`. This stores only the signed `{payload, signature}` record in untracked `artifacts/language-signed-*.json`. The owner must independently validate the person's competence and signature before importing the signed record into `docs/language-attestations.json`.

Run `npm run audit:language` for an evidence status report in `artifacts/language-attestation-audit.json`, including per-locale pending counts. Modified phrases invalidate old hashes; wrong locale, malformed signatures, duplicate or stale reviews, and unvetted reviewers cannot pass. Corrections requested by an editor are not counted as approvals. Empty records correctly report zero approval and do not break normal learner build.

Cryptographic signatures alone cannot establish actual expertise, pronunciation quality or human oversight. Real-device offline practice and human review are separate requirements; stage gates never advance automatically.
