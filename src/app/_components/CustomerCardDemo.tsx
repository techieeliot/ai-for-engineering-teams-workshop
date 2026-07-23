import CustomerCard from "@/components/CustomerCard";
import { mockCustomers } from "@/data/mock-customers";

/** Dashboard showcase: renders a CustomerCard for every mock customer. */
export function CustomerCardDemo() {
  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-green-600 dark:text-green-500">
        ✅ CustomerCard implemented!
      </p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </div>
  );
}
