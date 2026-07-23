---
id: GUIDE-003
title: Accessibility
type: guide
status: accepted
description: >-
  Practical WCAG 2.1 AA rules leaning on Radix-based primitives: keyboard,
  focus, accessible names, contrast via tokens, reduced motion.
updated: 2026-07-23
related: [SPEC-009, ADR-001, GUIDE-001]
---

# GUIDE-003: Accessibility

Practical accessibility rules for this project. Target: **WCAG 2.1 AA**. This
guide is the how-to companion to
[SPEC-009-accessibility](../specs/SPEC-009-accessibility.md).

## Lean on Radix-based primitives

shadcn/ui primitives (`src/components/ui/`) are built on Radix UI, which ships
keyboard interaction, focus management, and ARIA roles by default. Prefer them
over hand-rolled equivalents — it is the cheapest way to get accessible behavior.

| Primitive | What you get for free |
| --- | --- |
| `Dialog` | Focus trap, `Esc` to close, `aria-modal`, focus restored on close |
| `DropdownMenu` / `Select` / `Command` | Roving tabindex, correct `role`/`aria-*` |
| `Tabs` | Arrow-key navigation, `aria-selected` / `aria-controls` |
| `Tooltip` | `aria-describedby` wiring |
| `Label` + `Form` | Label association, `aria-invalid`, error-message linking |

Do not fork a primitive in a way that strips these behaviors (see
[ADR-001](../adrs/ADR-001-shadcn-ownership-model.md)).

## Rules

1. **Keyboard first.** Every interactive element must be reachable and operable
   with the keyboard (Tab/Shift+Tab, Enter/Space, arrows where relevant). Test
   without a mouse.
2. **Visible focus.** Never remove focus outlines. The base layer already sets
   `outline-ring/50`; keep focus states visible and AA-contrasting.
3. **Semantic structure.** Use real landmarks (`header`, `main`, `nav`) and a
   correct heading hierarchy (one `h1`, no skipped levels).
4. **Name every control.** Icon-only buttons (lucide icons) need an accessible
   name via `aria-label` or visually-hidden `sr-only` text.
5. **Associate form fields.** Use `Label` + `Form` so inputs have programmatic
   labels and errors are linked via `aria-describedby` / `aria-invalid`.
6. **Announce dynamic changes.** Loading states, toasts (`Sonner`), and new
   alerts should use live regions so screen readers hear updates.
7. **Contrast via tokens.** Use theme tokens and verify `muted-foreground` on its
   background meets AA (4.5:1 text, 3:1 large text) in **both** light and dark.
   Do not encode meaning in color alone — pair health/priority colors with text
   or an icon.
8. **Respect reduced motion.** Gate animations behind `motion-safe:`
   (`tw-animate-css` is available) so `prefers-reduced-motion` is honored.

## Testing

- **Automated:** run axe-core in component/integration tests; fail on
  serious/critical violations.
- **Keyboard:** tab through each component; confirm logical order and operability.
- **Screen readers:** spot-check with VoiceOver (macOS) / NVDA (Windows).
- **Contrast:** validate token pairings in light, dark, and high-contrast.

## Checklist (per component)
- [ ] Fully keyboard operable with visible focus
- [ ] Correct semantics/landmarks and heading order
- [ ] Accessible names for icon-only controls
- [ ] Form fields labeled; errors associated
- [ ] Dynamic updates announced via live regions
- [ ] AA contrast in light and dark; meaning not color-only
- [ ] Animations respect `prefers-reduced-motion`
