---
id: GUIDE-005
title: Code Review
type: guide
status: accepted
description: >-
  What every review checks (correctness, spec alignment, style, a11y, tests,
  security) and how to use /code-review and /security-review.
updated: 2026-07-23
related: [GUIDE-002, GUIDE-004, GUIDE-006]
---

# GUIDE-005: Code Review

How we review changes in this repo — for humans and AI-assisted reviews alike.

## What every review checks
1. **Correctness** — does it do what the spec/acceptance criteria say? Edge cases
   and error paths handled?
2. **Spec alignment** — for feature work, cross-check against the relevant
   `specs/SPEC-NNN-*.md` acceptance criteria.
3. **House style** — [GUIDE-004](./GUIDE-004-house-style.md): naming, types,
   server/client boundary, named exports, loading/error states.
4. **UI system** — [GUIDE-001](./GUIDE-001-css-ui-systems.md): tokens only, no
   forked primitives, centralized visual logic.
5. **Accessibility** — [GUIDE-003](./GUIDE-003-accessibility.md): keyboard,
   focus, names, contrast.
6. **Tests** — [GUIDE-006](./GUIDE-006-test-structure.md): business logic covered,
   edge cases present.
7. **Security** — input validation/sanitization; no secrets or sensitive data in
   logs or error messages.

## Using the built-in skills
- `/code-review` — review the current working diff before opening a PR.
- `/security-review` — security-focused pass on pending changes.
Run these first; they catch the mechanical issues so human review can focus on
design and intent.

## Review etiquette
- Push back on redundant comments and dead/commented-out code.
- Prefer specific, actionable feedback tied to a file/line and a guide/spec.
- Keep diffs small and focused (see [GUIDE-002](./GUIDE-002-git-commits.md)).

## Author checklist (before requesting review)
- [ ] `type-check` and `lint` pass
- [ ] Change matches its spec's acceptance criteria
- [ ] Tests added/updated for new logic
- [ ] `/code-review` (and `/security-review` if relevant) run and addressed
- [ ] Conventional Commits; one logical change per commit
