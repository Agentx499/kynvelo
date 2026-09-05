import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* The one currency formatter. Marketing components previously each had their
   own - a template literal in pricing-tables, a local `rupee` in
   partner-calculator, an inline toLocaleString in athlete-plans, a separate
   Intl instance in churn-calculator - so rupee amounts were formatted four
   different ways across pages that link to each other. */
const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return INR.format(amount);
}

/** Indian-numbering compact form for large figures: ₹2.4 Cr, ₹68.0 L. */
export function formatCurrencyCompact(amount: number): string {
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)} L`;
  return INR.format(amount);
}
