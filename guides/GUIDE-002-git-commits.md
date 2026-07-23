---
id: GUIDE-002
title: Git Commits
type: guide
status: accepted
description: >-
  Conventional Commits, one-logical-change chunking, branching off main, the
  Co-Authored-By trailer, and PR body conventions.
updated: 2026-07-23
related: [GUIDE-005]
---

# GUIDE-002: Git Commits

Conventions for commits and branches in this repo.

## Commit messages — Conventional Commits

Format: `type(scope): summary`

- **type** — one of: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `perf`,
  `style`, `build`, `ci`
- **scope** — the area touched: `ui`, `deps`, `requirements`, `specs`,
  `dashboard`, a component name, etc. (optional but encouraged)
- **summary** — imperative, lower-case, no trailing period ("add", not "added")

Examples from this repo:

```
feat(ui): add shadcn/ui component library and adopt theme tokens
chore(deps): add form, charts, and UI dependencies
docs(requirements): map shadcn/ui components to each feature
docs(specs): add feature specs with shadcn/ui choices and index
```

### Body
- Wrap at ~72 chars. Explain **why** and any non-obvious **what**; bullet lists
  are fine for enumerating changes.
- Reference specs/ADRs where relevant.

### Co-author trailer
End AI-assisted commit messages with:

```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

## Commit hygiene — one logical change per commit

Group related changes; split unrelated ones. This repo's shadcn work was landed
as four focused commits — components, dependencies, requirements, specs — rather
than one mixed commit. Prefer that over "misc updates".

Practical grouping:
```bash
git add src/components/ui src/lib/utils.ts components.json   # the UI system
git commit -F - <<'EOF'
feat(ui): ...
EOF

git add requirements                                         # docs, separately
git commit -F - <<'EOF'
docs(requirements): ...
EOF
```

## Branching

- **Never commit directly to `main`.** Branch first:
  `git checkout -b feat/<short-topic>`.
- Branch names: `feat/…`, `fix/…`, `docs/…`, `chore/…`.
- This codespace pushes to your **fork** (`origin`); the parent repo is
  `upstream`. Open PRs against `upstream/main` (or your fork's `main` for
  workshop work).

## PR bodies

Summarize what and why; list the commits; note verification (e.g.
`npm run type-check` / `npm run lint` results). End AI-assisted PR bodies with:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

## Checklist
- [ ] Branch off `main` (not committing to `main` directly)
- [ ] Conventional Commit `type(scope): summary`, imperative mood
- [ ] One logical change per commit
- [ ] Co-author trailer on AI-assisted commits
- [ ] `type-check` / `lint` pass before pushing
