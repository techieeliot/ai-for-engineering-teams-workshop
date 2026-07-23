---
id: GUIDE-008
title: Documentation Standards
type: guide
status: accepted
description: >-
  Doc kinds, TYPE-NNN naming, required sections per kind, indexes, and the
  YAML frontmatter convention for all numbered docs.
updated: 2026-07-23
related: [GUIDE-004, GUIDE-007]
---

# GUIDE-008: Documentation Standards

How docs are organized, named, and structured in this repo.

## Doc kinds & locations

| Kind | Dir | Prefix | Purpose |
| --- | --- | --- | --- |
| PRD | `prds/` | `PRD` | Product requirements — the "why/what" for a feature (input to specs) |
| Spec | `specs/` | `SPEC` | Buildable specification derived from a PRD |
| ADR | `adrs/` | `ADR` | A decision of record (context → decision → consequences) |
| Guide | `guides/` | `GUIDE` | A standard / how-to |
| RFC | `rfcs/` | `RFC` | A proposal under discussion (pre-decision) |
| Exercise | `exercises/` | `EXERCISE` | Workshop exercise walkthroughs |

## Naming convention

`TYPE-NNN-kebab-title.md` for every numbered doc (specs, ADRs, guides,
exercises). `NNN` is a zero-padded 3-digit sequence, ordered by introduction
(for specs, this follows the exercise chronology). Examples:

```
specs/SPEC-001-customer-card.md
adrs/ADR-001-shadcn-ownership-model.md
guides/GUIDE-004-house-style.md
```

- Numbers are stable once assigned — never renumber; supersede instead.
- README.md files are indexes, not numbered docs.

## Required sections

- **Spec:** Context, Requirements, Constraints, Acceptance Criteria (+ a UI
  Components (shadcn/ui) section where UI is involved).
- **ADR:** Status, Date, Context, Decision, Consequences (+ Related).
- **Guide:** purpose intro, rules/steps, and a Checklist.

## Frontmatter

Every numbered doc (spec/guide/adr/rfc/prd) starts with a YAML frontmatter block.
README.md files are exempt. See "Frontmatter Convention" below.

## Indexing & cross-linking
- Each doc dir has a `README.md` with an index table linking its docs.
- Cross-link related docs with relative links (`../specs/SPEC-001-customer-card.md`).
- When a spec derives from a requirement, name that requirement in the spec's
  frontmatter (`source:`).

---

## Frontmatter Convention

The schema follows Claude Code's own frontmatter conventions (skills, subagents,
and slash commands all lead with a specific, trigger-oriented `description`),
extended with lightweight metadata for discovery and traceability.

```yaml
---
id: SPEC-001                       # stable doc id (TYPE + number)
title: CustomerCard                # human title (feature/topic)
type: spec                         # spec | guide | adr | rfc | prd | requirement
status: draft                      # draft | accepted | superseded | deprecated
description: >-                     # ONE specific line: what this doc covers and
  Spec for the CustomerCard component — health-score color coding,
  domains, and shadcn Card composition.
owner: dashboard-maintainers       # who maintains it
created: 2026-07-23                 # ISO date (absolute, not "today")
updated: 2026-07-23
source: prds/PRD-001-customer-card.md   # where it derives from (specs)
related:                           # ids or paths of related docs
  - GUIDE-001
  - ADR-001
tags: [customer, ui, dashboard]
---
```

**Field notes**
- `description` is the most important field — write it like a skill description:
  specific about *what* and *when*, so an agent can decide whether to read the
  doc from the frontmatter alone. Avoid generic ("a spec for a component").
- `status` drives lifecycle. ADRs use `accepted`/`superseded`; drafts use `draft`.
- `id` mirrors the filename's TYPE+NNN and never changes.
- Kind-specific optional fields: ADRs may add `deciders` and `supersedes`/
  `superseded_by`; specs add `source`; RFCs may add `discussion`.

**Minimal form** (guides/ADRs, where some fields don't apply):
```yaml
---
id: GUIDE-004
title: House Style
type: guide
status: accepted
description: Baseline naming, TypeScript, React/Next.js, and export conventions.
updated: 2026-07-23
---
```

## Checklist (per doc)
- [ ] Correct dir + `NNN`/`TYPE` naming; number is stable
- [ ] Frontmatter present (except README.md) with a specific `description`
- [ ] Required sections for its kind
- [ ] Linked from its dir's README index
- [ ] Cross-links use relative paths
