"use client";

import { useEffect, useMemo, useState } from "react";
import CustomerCard from "@/components/CustomerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { mockCustomers, type Customer } from "@/data/mock-customers";

export interface CustomerSelectorProps {
  /** Customers to display; defaults to the workshop mock data. */
  customers?: Customer[];
  /** Called when a customer is selected. */
  onSelect?: (customer: Customer) => void;
  className?: string;
}

const STORAGE_KEY = "cid-selected-customer";

/**
 * Main customer selection interface (SPEC-002): search by name/company, a
 * responsive grid of CustomerCards, single selection with a persisted highlight.
 */
export default function CustomerSelector({
  customers = mockCustomers,
  onSelect,
  className,
}: CustomerSelectorProps) {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Restore the previous selection so it persists across page interactions.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setSelectedId(stored);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q),
    );
  }, [customers, query]);

  function handleSelect(customer: Customer) {
    setSelectedId(customer.id);
    window.localStorage.setItem(STORAGE_KEY, customer.id);
    onSelect?.(customer);
  }

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="customer-search">Search customers</Label>
        <div className="flex gap-2">
          <Input
            id="customer-search"
            type="search"
            placeholder="Search by name or company…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => setQuery("")}
            disabled={query === ""}
          >
            Clear
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No customers match “{query}”.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((customer) => (
            <li key={customer.id}>
              <button
                type="button"
                aria-pressed={selectedId === customer.id}
                onClick={() => handleSelect(customer)}
                className="w-full rounded-4xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <CustomerCard
                  customer={customer}
                  selected={selectedId === customer.id}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
