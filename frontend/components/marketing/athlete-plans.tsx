"use client";

import { useState } from "react";
import { ATHLETE_TIERS, type Interval } from "@/lib/pricing";
import { Segmented, TierCard } from "@/components/marketing/tier-card";

/* Renders ATHLETE_TIERS from lib/pricing.ts, the same array /pricing renders.

   This file previously carried its own hardcoded two-tier array (Free + Pro
   ₹299), dropping the ₹99 Starter tier that /pricing advertised and moving
   barcode scanning into Pro. A visitor converting from the homepage never saw
   the cheapest paid option, and the two pages disagreed about what ₹299 buys. */
export function AthletePlans() {
  const [interval, setInterval] = useState<Interval>("annual");

  return (
    <div className="space-y-10">
      <Segmented<Interval>
        label="Billing interval"
        value={interval}
        onChange={setInterval}
        options={[
          { key: "monthly", label: "Monthly" },
          { key: "annual", label: "Annual" },
        ]}
      />

      <div className="grid gap-5 md:grid-cols-3">
        {ATHLETE_TIERS.map((tier) => (
          <TierCard key={tier.id} tier={tier} interval={interval} />
        ))}
      </div>

      <p className="text-[13px] text-ink-subtle">
        No ads. No selling your training or health data. Export or erase
        everything from account settings, whenever you want. Cancel any time.
      </p>
    </div>
  );
}
