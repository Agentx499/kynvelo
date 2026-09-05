import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/section";
import { formatCurrency } from "@/lib/utils";
import { annualSaving, type Interval, type Tier } from "@/lib/pricing";

/* One card renderer for every tier on every page. Previously athlete-plans.tsx
   and pricing-tables.tsx each had their own copy of this markup, which is how
   their feature lists diverged. */
export function TierCard({
  tier,
  interval,
}: {
  tier: Tier;
  interval: Interval;
}) {
  const price = interval === "annual" ? tier.annual : tier.monthly;
  const saving = interval === "annual" ? annualSaving(tier) : 0;

  return (
    <Panel accent={tier.featured} className="flex flex-col p-7">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold text-ink">
          {tier.name}
        </h3>
        {tier.featured && (
          <span className="text-[12px] text-primary">Recommended</span>
        )}
      </div>

      {tier.cap && <p className="mt-1 text-[13px] text-ink-subtle">{tier.cap}</p>}

      <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
        {tier.pitch}
      </p>

      <div className="mt-7">
        {price === null ? (
          <span className="font-display text-3xl font-semibold text-ink">
            Custom
          </span>
        ) : (
          <>
            <span className="tnum text-4xl font-semibold text-ink">
              {price === 0 ? "Free" : formatCurrency(price)}
            </span>
            {price > 0 && (
              <span className="ml-1.5 text-[15px] text-ink-subtle">
                /{interval === "annual" ? "year" : "month"}
              </span>
            )}
          </>
        )}
      </div>

      {/* Fixed-height row so cards in a grid keep their baselines aligned
          whether or not a saving applies. */}
      <p className="mt-1.5 h-5 text-[13px] text-primary">
        {saving > 0 ? `Saves ${formatCurrency(saving)} a year` : ""}
      </p>

      <ul className="mt-7 flex-1 space-y-2.5">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-2.5 text-[15px] text-ink-muted">
            <Check className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={tier.featured ? "primary" : "secondary"}
        className="mt-8 w-full"
      >
        <Link href={tier.cta.href}>{tier.cta.label}</Link>
      </Button>
    </Panel>
  );
}

/* Shared segmented control. `.k-seg` carries the 44px minimum touch target. */
export function Segmented<T extends string | boolean>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div
      className="inline-flex rounded-md border border-line p-0.5"
      role="group"
      aria-label={label}
    >
      {options.map((o) => (
        <button
          key={String(o.key)}
          type="button"
          onClick={() => onChange(o.key)}
          aria-pressed={value === o.key}
          className={`k-seg ${
            value === o.key
              ? "bg-primary font-semibold text-on-primary"
              : "text-ink-muted hover:text-ink"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
