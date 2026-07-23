import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import CustomerCard from "@/components/CustomerCard";
import type { Customer } from "@/data/mock-customers";

const customer: Customer = {
  id: "1",
  name: "John Smith",
  company: "Acme Corp",
  healthScore: 85,
  email: "john@acme.com",
  domains: ["acme.com", "portal.acme.com"],
};

describe("CustomerCard", () => {
  it("renders name, company, email, health score, and domain count", () => {
    render(<CustomerCard customer={customer} />);
    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.getByText("Acme Corp")).toBeInTheDocument();
    expect(screen.getByText("john@acme.com")).toBeInTheDocument();
    expect(screen.getByText(/85 · Healthy/)).toBeInTheDocument();
    expect(screen.getByText("Domains (2)")).toBeInTheDocument();
  });

  it("gracefully handles a customer with no domains", () => {
    render(<CustomerCard customer={{ ...customer, domains: undefined }} />);
    expect(screen.queryByText(/Domain/)).not.toBeInTheDocument();
  });

  it("uses the critical color label for a low score", () => {
    render(<CustomerCard customer={{ ...customer, healthScore: 15 }} />);
    expect(screen.getByText(/15 · Critical/)).toBeInTheDocument();
  });
});
