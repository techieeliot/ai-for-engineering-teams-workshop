---
id: ADR-003
title: Documentation Precedence
type: adr
status: accepted
description: >-
  Decision that PRD and EXERCISE files are the source of truth and supersede
  ADR/GUIDE/SPEC files when they conflict; lower docs must conform.
deciders: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
related: [GUIDE-008, SPEC-001, SPEC-003]
---

# ADR-003: Documentation Precedence

- **Status:** Accepted
- **Date:** 2026-07-23
- **Deciders:** Dashboard maintainers

## Context

The repo now holds two layers of documentation:

- **Source-of-truth layer** — the workshop's own material: `prds/` (product
  requirements) and `exercises/` (workshop walkthroughs).
- **Derived/standards layer** — added on top: `specs/` (buildable specs),
  `adrs/` (decisions), and `guides/` (house standards).

Because the derived layer was authored separately, contradictions have surfaced
between it and the source-of-truth layer (see the list below). We need a rule for
which document wins so the system is unambiguous.

## Decision

**PRD and EXERCISE files supersede ADR, GUIDE, and SPEC files.** When a spec,
ADR, or guide contradicts a PRD or exercise, the PRD/exercise prevails and the
lower document **must be updated to conform**.

Precedence, highest to lowest:

1. **PRD** — authoritative on *what* / product behavior and requirements.
2. **EXERCISE** — authoritative on workshop instructions and flow.
3. **SPEC** — derived from a PRD; must conform to it.
4. **ADR / GUIDE** — house standards; must not contradict any of the above.

Tie-breakers and scope:

- **PRD vs EXERCISE:** the PRD governs product behavior; the exercise governs
  workshop process. If they conflict on product behavior, the PRD wins and the
  exercise is corrected.
- **Same-tier conflict** (PRD↔PRD or EXERCISE↔EXERCISE): not auto-resolvable —
  escalate to a product decision and record it (a new ADR or a PRD update).
- **Incidental shorthand** in exercises (e.g. `components/` for `src/components/`,
  `@data/` for `src/data/`) maps to the actual project layout and is **not**
  treated as a contradiction.
- This precedence rule is itself process governance and does not override a PRD.

## Consequences

**Positive**
- A single, predictable resolution path for any doc conflict.
- The derived layer stays honest to the workshop's intent.

**Negative / trade-offs**
- The derived layer (specs/guides) may need edits whenever a PRD/exercise moves.
- Reviews should include a conformance check (does this spec/guide contradict its
  PRD/exercise?).

## Conflicts to reconcile under this rule

Identified between the derived layer and the source-of-truth layer:

| Conflict | Higher authority | Resolution |
| --- | --- | --- |
| Health red threshold: `EXERCISE-006` says 0-40; `PRD-001` says 0-30 | PRD-001 | Use **0-30**. `SPEC-001`/`SPEC-003`/`src/lib/health.ts` already conform; **correct EXERCISE-006** to 0-30 |
| Component exports: `GUIDE-004` prefers named; demo/exercises need a `default` export | EXERCISE / working demo | Broaden `GUIDE-004` to allow `export default` for dashboard/page components |
| Paths: exercises use `components/`, `@data/`; guide/specs use `src/...` | Project layout | Treat exercise paths as shorthand for `src/...` (per rule above) |
| Health labels: `PRD-001` = Poor/Moderate/Good; `PRD-003` = Healthy/Warning/Critical | PRD↔PRD (same tier) | **Product decision needed** — pick one vocabulary repo-wide |
| `SPEC-001` requires email, max/min card size, tablet breakpoint; `PRD-001` is silent | PRD-001 | Decide: enrich `PRD-001` to include them, or trim `SPEC-001` |
| Spec filenames need a stable `SPEC-NNN`; `EXERCISE-005` `/spec` auto-generates | EXERCISE-005 | Let `/spec` auto-increment `NNN` as part of its action |

## Related

- [GUIDE-008 Documentation Standards](../guides/GUIDE-008-documentation-standards.md)
- Analysis source: `SPEC-001`, `SPEC-003`, `EXERCISE-006`, `PRD-001`, `PRD-003`
