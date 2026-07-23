---
description: Generate a SPEC from a component's PRD, following repo doc standards
argument-hint: [ComponentName]
---

Generate a specification for the component **$1**.

Steps:
1. Convert `$1` to kebab-case and locate its PRD at `docs/prds/PRD-*-<kebab>.md`.
   If no matching PRD exists, stop and say so (a spec derives from a PRD — ADR-003).
2. Determine the next spec number: the highest `NNN` in `docs/specs/SPEC-NNN-*.md`
   plus one, zero-padded to 3 digits. A single-feature spec reuses its PRD's number
   when free; otherwise take the next sequence value.
3. Write the spec to `docs/specs/SPEC-<NNN>-<kebab>.md` with:
   - YAML frontmatter (`id`, `title`, `type: spec`, `status: draft`, `description`,
     `source: docs/prds/PRD-<NNN>-<kebab>.md`, `related`, `tags`) per
     `docs/guides/GUIDE-008-documentation-standards.md`
   - Sections: **Context**, **Requirements** (incl. a **UI Components (shadcn/ui)**
     subsection), **Constraints**, **Testing Requirements**, **Standards & References**
     (link the governing GUIDEs/ADRs), and **Acceptance Criteria**
4. Add the spec to the index table in `docs/specs/README.md`.

Follow the structure of `docs/specs/SPEC-001-customer-card.md` as the reference example.
