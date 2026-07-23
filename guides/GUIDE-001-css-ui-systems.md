---
id: GUIDE-001
title: CSS & UI Systems
type: guide
status: accepted
description: >-
  How to build UI with shadcn/ui primitives, Tailwind v4, and design tokens;
  compose don't fork, tokens not hard-coded colors.
updated: 2026-07-23
related: [ADR-001, SPEC-010, GUIDE-003]
---

# GUIDE-001: CSS & UI Systems

How to build UI in this project: shadcn/ui primitives + Tailwind CSS v4 +
design tokens. See [ADR-001 shadcn/ui Ownership Model](../adrs/ADR-001-shadcn-ownership-model.md)
for the governance rationale behind these rules.

## Stack

- **Tailwind CSS v4** (`@import "tailwindcss"` in `src/app/globals.css`)
- **shadcn/ui** — `radix-luma` style, `zinc` base color, lucide icons
  (`components.json` is authoritative)
- **Primitives** live in `src/components/ui/`; the `cn()` helper is in
  `src/lib/utils.ts`
- Combined **`radix-ui`** package (import named primitives, e.g.
  `import { Dialog as DialogPrimitive } from "radix-ui"`)

## Rules

### 1. Use design tokens, never hard-coded colors
The theme defines light + dark tokens in `globals.css`. Always style with the
token utilities:

| Use | Token utility |
| --- | --- |
| Page background | `bg-background` / `text-foreground` |
| Card surface | `bg-card` / `text-card-foreground` |
| Secondary text | `text-muted-foreground` |
| Borders / rings | `border` / `ring` |
| Primary action | `bg-primary` / `text-primary-foreground` |
| Errors / destructive | `text-destructive` / `bg-destructive` |
| Charts | `chart-1` … `chart-5` |

Do **not** use `bg-white`, `bg-gray-50`, `text-gray-900`, `text-blue-*`, or raw
hex. Token-based styles get dark mode for free.

### 2. Compose primitives; don't fork them
Build features by composing `src/components/ui/` primitives inside
`src/components/`. Extend a primitive through `className` merged with `cn()`:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function CustomerCard({ selected, className, ...props }: CustomerCardProps) {
  return (
    <Card className={cn(selected && "ring-2 ring-primary", className)} {...props}>
      {/* … */}
    </Card>
  )
}
```

Never copy a primitive to tweak it — that breaks upstream updates (see ADR-001).

### 3. Add components via the CLI
```bash
npx shadcn@latest add <name>
```
If a component is not available under the current style (e.g. `form`), author it
by hand following the conventions of the existing primitives — see
`src/components/ui/form.tsx`, adapted to the combined `radix-ui` import style.

### 4. Centralize repeated visual logic
Shared visual mappings live in one helper, reused everywhere. The red/yellow/green
health scheme appears in CustomerCard, the health widget, market intelligence,
and alerts — express it once:

```ts
// src/lib/health.ts
export function healthColor(score: number) {
  if (score <= 30) return "destructive"   // red
  if (score <= 70) return "warning"        // yellow
  return "success"                          // green
}
```

Map the returned key to a `Badge` variant / token utility at the call site.

### 5. Respect motion and contrast
- Gate animations behind `motion-safe:` (the project ships `tw-animate-css`).
- Verify token pairings meet AA contrast in both themes — see
  [GUIDE-003 Accessibility](./GUIDE-003-accessibility.md).

## Checklist (before opening a PR)
- [ ] No hard-coded colors; only token utilities
- [ ] No forked primitives; customizations via `cn()` + composition
- [ ] New primitives added via CLI (or hand-authored to match conventions)
- [ ] Repeated visual logic centralized in a shared helper
- [ ] Works in light and dark mode
