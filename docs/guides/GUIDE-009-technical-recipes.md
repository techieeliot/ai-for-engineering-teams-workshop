---
id: GUIDE-009
title: Technical Recipes
type: guide
status: accepted
description: >-
  Copy-adaptable Next.js recipes: add a shadcn primitive, a dashboard widget,
  an API Route Handler, a validated form, a toast, a status-color helper.
updated: 2026-07-23
related: [GUIDE-001, GUIDE-004, GUIDE-010]
---

# GUIDE-009: Technical Recipes

Copy-adaptable recipes for common tasks in this Next.js 15 (App Router) codebase.
Each recipe assumes the conventions in [GUIDE-001](./GUIDE-001-css-ui-systems.md)
and [GUIDE-004](./GUIDE-004-house-style.md).

## Recipe: Add a shadcn/ui primitive
```bash
npx shadcn@latest add tooltip
```
Then compose it in a feature component (never fork it — see
[ADR-001](../adrs/ADR-001-shadcn-ownership-model.md)). If the CLI can't add it
under the current style, hand-author it in `src/components/ui/` following the
existing primitives (see `form.tsx`).

## Recipe: Add a dashboard widget
1. Spec it: `specs/SPEC-NNN-<feature>.md` (from a `prds/PRD-*.md`).
2. Create `src/components/<Widget>.tsx`, composing `Card` + relevant primitives.
3. Use theme tokens; show explicit loading (`Skeleton`) and error (`Alert`) states.
4. Receive data via props from the selected customer; no fetching in the card.
5. Add tests per [GUIDE-006](./GUIDE-006-test-structure.md).

## Recipe: Add an API Route Handler
```ts
// src/app/api/<resource>/route.ts
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // validate input (query/params) first
  // ...business logic via a service in src/lib
  return NextResponse.json({ data: /* ... */ })
}
```
- Validate and sanitize all input; return a consistent JSON shape.
- Sanitize error messages (no sensitive info). Put business logic in a
  `src/lib/<Service>.ts`, not in the handler.

## Recipe: Add a form with validation
```tsx
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage }
  from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const schema = z.object({ email: z.string().email() })

export function ExampleForm() {
  const form = useForm({ resolver: zodResolver(schema), defaultValues: { email: "" } })
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => {/* ... */})}>
        <FormField name="email" control={form.control} render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input type="email" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </form>
    </Form>
  )
}
```

## Recipe: Add a toast
```tsx
import { toast } from "sonner"       // provider: <Toaster /> mounted once in layout
toast.success("Customer saved")
```

## Recipe: Centralize a status color
Put shared visual logic in one helper and reuse it (see
[GUIDE-001](./GUIDE-001-css-ui-systems.md) §4) — don't re-implement the
red/yellow/green mapping per widget.
