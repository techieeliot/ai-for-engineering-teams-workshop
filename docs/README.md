# Documentation

The project's documentation system. Conventions (naming, required sections, YAML
frontmatter) are defined in
[GUIDE-008 Documentation Standards](./guides/GUIDE-008-documentation-standards.md).

## How the docs fit together

```
PRD  ──derives──▶  SPEC  ──implemented as──▶  code
 (why/what)        (buildable)                (src/…)
        ▲                    ▲
        └── governed by ADRs (decisions) + GUIDEs (standards) ──┘
```

**Precedence** ([ADR-003](./adrs/ADR-003-documentation-precedence.md)): when
documents conflict, **PRD and EXERCISE files supersede ADR/GUIDE/SPEC**. Lower
docs must be updated to conform.

## Directories

| Dir | Kind | Index |
| --- | --- | --- |
| `prds/` | Product requirements (`PRD-NNN`) — the why/what | [index](./prds/README.md) |
| `specs/` | Specifications (`SPEC-NNN`) — buildable, derived from a PRD | [index](./specs/README.md) |
| `adrs/` | Architecture decision records (`ADR-NNN`) | [index](./adrs/README.md) |
| `guides/` | Standards & how-to guides (`GUIDE-NNN`) | [index](./guides/README.md) |
| `rfcs/` | Proposals under discussion (`RFC-NNN`) | [index](./rfcs/README.md) |

Related directories that live at the repo root (not under `docs/`):

- `exercises/` — workshop walkthroughs (`EXERCISE-NNN`); learner-facing, slide-rendered
- `tests/` — shared test setup/utilities (see [GUIDE-006](./guides/GUIDE-006-test-structure.md))

## Naming

`TYPE-NNN-kebab-title.md` for every numbered doc; `NNN` is a stable, zero-padded
sequence. `PRD-NNN` and its derived `SPEC-NNN` share the same number. README.md
files are indexes and are exempt from numbering and frontmatter.
