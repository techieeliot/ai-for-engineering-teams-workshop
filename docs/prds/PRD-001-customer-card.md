---
id: PRD-001
title: CustomerCard
type: prd
status: accepted
description: >-
  Product requirements for the CustomerCard: display name/company/health score,
  customer domains, and a color-coded health indicator.
created: 2026-07-23
updated: 2026-07-23
spec: SPEC-001
related: [SPEC-001, GUIDE-001, ADR-001, GUIDE-003]
---

# CustomerCard Requirements

## Business Context
- Individual customer display component for Customer Intelligence Dashboard
- Used within CustomerSelector container component
- Provides at-a-glance customer information for quick identification
- Foundation for domain health monitoring integration

## Functional Requirements
- Display customer name, company name, and health score
- Display the customer email when available
- Show customer domains (websites) for health monitoring context
- Use color-coded health indicator (risk levels shared with the health score calculator):
  - Red (0-30): Critical
  - Yellow (31-70): Warning
  - Green (71-100): Healthy
- Display domain count when customer has multiple domains
- Basic responsive design for mobile, tablet, and desktop
- Clean, card-based visual design with domain information

## Data Requirements
- Uses mock data from `src/data/mock-customers.ts`
- Customer interface includes optional `email` and optional `domains` array of website URLs
- Supports customers with 1 or multiple domains for health checking

## UI Primitives
- Build on the shared `Card` primitive from `src/components/ui/card.tsx`
- Compose the card using its subcomponents: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`, `CardContent`, and `CardFooter`
- Do not hand-roll the card container styling; rely on the primitive for consistent spacing, radius, and theming