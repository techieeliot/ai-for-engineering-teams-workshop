---
id: ADR-002
title: Code Comments
type: adr
status: accepted
description: >-
  Decision to comment the why not the what: no redundant narration, JSDoc for
  business logic, prefer self-documenting code, keep comments truthful.
deciders: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
related: [GUIDE-005, SPEC-010]
---

# ADR-002: Code Comments

- **Status:** Accepted
- **Date:** 2026-07-23
- **Deciders:** Dashboard maintainers

## Context

AI-generated code (the majority of this workshop's output) tends to over-comment
— restating what the code plainly does — or under-comment the reasoning that
future readers actually need. We want a single, enforceable stance so comments
add signal instead of noise.

## Decision

Comment the **why**, not the **what**.

1. **Explain intent and constraints, not mechanics.** A comment should capture
   something the code cannot: a business rule, a non-obvious trade-off, a
   workaround and its reason, or a link to a spec/ADR.
2. **No redundant narration.** Do not write comments that paraphrase the next
   line (`// increment i`, `// set loading to true`). Delete them.
3. **JSDoc for non-trivial functions.** Public helpers and any function with
   business logic (e.g. `calculateHealthScore`, alert rules) get a JSDoc block
   documenting purpose, parameters, return shape, and the formula/rationale.
4. **Prefer self-documenting code.** Before adding a comment, try a clearer name
   or a small extraction. A well-named function beats a comment.
5. **Mark follow-ups explicitly.** Use `TODO:` / `FIXME:` with enough context to
   act on later; never leave silent dead code or commented-out blocks.
6. **Keep comments truthful.** A stale comment is worse than none — update or
   remove comments when the code changes.

## Consequences

**Positive**
- Comments become a durable record of intent; diffs are easier to review.
- Less churn from AI-generated boilerplate comments.

**Negative / trade-offs**
- Requires reviewers to actively push back on redundant comments.
- "Why" comments demand more thought than "what" comments.

## Related

- Guide: [GUIDE-005 Code Review](../guides/GUIDE-005-code-review.md)
- Spec: [SPEC-010-code-quality](../specs/SPEC-010-code-quality.md)
