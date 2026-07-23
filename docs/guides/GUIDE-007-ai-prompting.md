---
id: GUIDE-007
title: AI Prompting
type: guide
status: accepted
description: >-
  Effective agent prompting for the requirements→spec→implementation→verify
  loop: reference @paths, be specific, verify against acceptance criteria.
updated: 2026-07-23
related: [GUIDE-008, GUIDE-005]
---

# GUIDE-007: AI Prompting

How to work effectively with an AI agent in this repo. The workshop's core loop
is **requirements → spec → implementation → verification**; these practices make
each hop reliable.

## Reference files, don't paste them
Use `@`-references so the agent reads the source of truth:
```
Write a spec from @docs/prds/PRD-002-customer-selector.md and save it to
specs/SPEC-002-customer-selector.md
```
```
Implement the component from @docs/specs/SPEC-001-customer-card.md; use
@docs/prds/PRD-001-customer-card.md for context.
```

## Be specific about output and location
State the target path, the file to produce, and the shape expected (sections,
interfaces). Ambiguity produces rework.

## Acceptance-criteria-driven
Treat the spec's acceptance criteria as the contract. Ask the agent to verify its
output against them, and refine with targeted prompts:
```
The component is missing the domain count from the acceptance criteria in
@docs/specs/SPEC-001-customer-card.md. Update it to match.
```

## Give the agent the standards
Point to the relevant guides/ADRs so output matches house conventions:
```
Follow @docs/guides/GUIDE-001-css-ui-systems.md and
@docs/adrs/ADR-001-shadcn-ownership-model.md.
```
Better still, encode recurring conventions as an **Agent Skill**
(`.claude/skills/…`) so they apply automatically, and automate repeated steps as
**slash commands** (`/spec`, `/implement`, `/verify`).

## Iterate in small steps
Prefer several focused prompts over one giant one. Review each result before the
next step; keep changes reviewable (see [GUIDE-002](./GUIDE-002-git-commits.md)).

## Verify, don't trust
Run `type-check`, `lint`, and tests. Use `/code-review` on the diff. The agent's
confidence is not verification.

## Checklist
- [ ] Inputs referenced with `@paths`, not pasted
- [ ] Output path + expected structure stated
- [ ] Relevant guides/ADRs referenced (or a skill supplies them)
- [ ] Output checked against acceptance criteria
- [ ] Result verified (type-check/lint/tests/review)
