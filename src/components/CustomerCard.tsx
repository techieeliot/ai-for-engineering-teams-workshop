import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { HEALTH_BADGE_CLASS, HEALTH_LABEL, healthLevel } from "@/lib/health";
import type { Customer } from "@/data/mock-customers";

export interface CustomerCardProps {
  /** Customer to display. */
  customer: Customer;
  /** Visual selected state (managed by a parent such as CustomerSelector). */
  selected?: boolean;
  className?: string;
}

/** First + last initial, for the avatar fallback. */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/**
 * Individual customer display card for the Customer Intelligence Dashboard.
 * Implements SPEC-001; presentational only (selection is owned by the parent).
 */
export default function CustomerCard({
  customer,
  selected,
  className,
}: CustomerCardProps) {
  const level = healthLevel(customer.healthScore);
  const domains = customer.domains ?? [];

  return (
    <Card
      size="sm"
      data-selected={selected || undefined}
      className={cn(
        "min-h-[120px] w-full max-w-[400px] transition-shadow",
        selected && "ring-2 ring-primary",
        className,
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{initials(customer.name)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <CardTitle className="truncate">{customer.name}</CardTitle>
            <p className="truncate text-sm text-muted-foreground">
              {customer.company}
            </p>
            {customer.email ? (
              <p className="truncate text-xs text-muted-foreground">
                {customer.email}
              </p>
            ) : null}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Health score</span>
          <Badge
            aria-label={`Health ${customer.healthScore} of 100, ${HEALTH_LABEL[level]}`}
            className={cn("border-transparent", HEALTH_BADGE_CLASS[level])}
          >
            {customer.healthScore} · {HEALTH_LABEL[level]}
          </Badge>
        </div>

        {domains.length > 0 ? (
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">
              {domains.length === 1 ? "Domain" : `Domains (${domains.length})`}
            </span>
            <ul className="flex flex-wrap gap-1">
              {domains.map((domain) => (
                <li key={domain}>
                  <Badge variant="secondary" className="font-normal">
                    {domain}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
