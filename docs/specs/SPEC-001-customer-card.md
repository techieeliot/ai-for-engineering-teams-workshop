---
id: SPEC-001
title: CustomerCard
type: spec
status: draft
description: >-
  Spec for the CustomerCard component: health-score color coding, customer
  domains and count, and shadcn Card composition within CustomerSelector.
owner: dashboard-maintainers
created: 2026-07-23
updated: 2026-07-23
source: docs/prds/PRD-001-customer-card.md
related: [SPEC-002, SPEC-007, GUIDE-001]
tags: [customer, ui, dashboard, card]
---

# Feature: CustomerCard Component

## Context
- Individual customer display component for the Customer Intelligence Dashboard
- Rendered within the `CustomerSelector` container, typically in a grid of multiple customers
- Provides at-a-glance customer information for quick identification by business analysts
- Used by business analysts to monitor customer status and health at a glance
- Foundation component for domain health monitoring integration

## Requirements

### Functional Requirements
- Display the customer's name, company name, and health score (0-100)
- Show the customer's domains (websites) to provide health-monitoring context
- Render a color-coded health indicator based on the health score
- Display a domain count when the customer has more than one domain
- Use a clean, card-based visual layout that includes domain information

### User Interface Requirements
- Color-coded health indicator (risk levels shared with SPEC-003):
  - Red: 0-30 (Critical)
  - Yellow: 31-70 (Warning)
  - Green: 71-100 (Healthy)
- Basic responsive design that works on mobile and desktop
- Clear typography hierarchy (name > company > supporting details)

### Data Requirements
- Accepts a single `Customer` object via props
- Consumes the `Customer` interface and mock data from `src/data/mock-customers.ts`
- `Customer` fields used: `id`, `name`, `company`, `healthScore`, optional `email`, and optional `domains: string[]`
- Display the customer email when present
- Handles customers with a single domain, multiple domains, or no `domains` array present

### Integration Requirements
- Used within the `CustomerSelector` container component
- Data flows from parent to child via props (no internal data fetching)
- Exposes a properly typed `CustomerCardProps` interface

### UI Components (shadcn/ui)
- **Card** (`@/components/ui/card`) — the base container; compose with `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` rather than hand-rolling card styling
- **Badge** (`@/components/ui/badge`) — render the health status ("Healthy / Warning / Critical") and, optionally, subscription tier; use it as the color-coded indicator instead of ad-hoc spans
- **Avatar** (`@/components/ui/avatar`) — show customer initials for quick visual identification in a grid
- **Tooltip** (`@/components/ui/tooltip`) — reveal the full domain list on hover when a customer has multiple domains
- **Separator** (`@/components/ui/separator`) — divide the header (name/company) from the domain/health section
- Icons from **lucide-react** for domain/health affordances
- Centralize the red/yellow/green mapping in a shared helper (e.g. `healthColor(score)`) so CustomerCard, the health widget, and market intelligence stay consistent

## Constraints

### Technical Stack
- Next.js 15 (App Router)
- React 19
- TypeScript with strict mode
- Tailwind CSS v4 with shadcn/ui (`radix-luma` style, lucide icons)

### Design Constraints
- Responsive breakpoints: mobile (320px+), tablet (768px+), and desktop (1024px+)
- Maximum card width: 400px; minimum card height: 120px
- Use theme tokens (`bg-card`, `text-card-foreground`, `text-muted-foreground`, `border`) — never hard-coded gray/blue hex or `bg-white`
- Consistent spacing using the Tailwind spacing scale

### Performance Requirements
- Fast rendering (< 16ms per card for 60fps)
- Efficient re-renders (apply `React.memo` if needed)
- No layout shift during load

### File Structure and Naming
- Component file: `src/components/CustomerCard.tsx`
- Props interface: `CustomerCardProps`, exported from the component file
- Reuse shadcn primitives from `src/components/ui/`; do not fork them
- Follow project naming conventions (PascalCase for components)

### Security Considerations
- Render name, company, email, and domain strings as text only (no `dangerouslySetInnerHTML`) to prevent XSS
- No sensitive customer data written to client-side logs
- Use proper TypeScript types to prevent data injection

## Standards & References
Implement this spec per the repo's standards:
- **Code:** [GUIDE-004 House Style](../guides/GUIDE-004-house-style.md), [ADR-002 Code Comments](../adrs/ADR-002-code-comments.md), [GUIDE-010 Folder Structure](../guides/GUIDE-010-folder-structure.md)
- **UI:** [GUIDE-001 CSS & UI Systems](../guides/GUIDE-001-css-ui-systems.md), [ADR-001 shadcn/ui Ownership](../adrs/ADR-001-shadcn-ownership-model.md), [GUIDE-003 Accessibility](../guides/GUIDE-003-accessibility.md)
- **Tests:** [GUIDE-006 Test Structure](../guides/GUIDE-006-test-structure.md)

## Acceptance Criteria

- [ ] Displays customer name, company name, and health score correctly
- [ ] Displays customer email when present
- [ ] Shows customer domains, with a domain count when there is more than one domain
- [ ] Gracefully handles a customer with no `domains` array
- [ ] Health score colors match the specification: red (0-30), yellow (31-70), green (71-100)
- [ ] Built on the shadcn `Card` primitive and uses `Badge` for the health indicator
- [ ] Responsive design works on mobile (320px+), tablet (768px+), and desktop (1024px+)
- [ ] Uses theme tokens throughout (dark mode works without changes)
- [ ] `CustomerCardProps` interface is defined and exported
- [ ] No console errors or warnings; passes TypeScript strict mode checks
- [ ] Follows project code style and conventions
