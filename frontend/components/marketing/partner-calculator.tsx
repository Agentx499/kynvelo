"use client";

import { useId, useState } from "react";
import { Panel } from "@/components/ui/section";
import { Segmented } from "@/components/marketing/tier-card";
import { formatCurrency } from "@/lib/utils";
import { COMMISSION, GYM_TIERS } from "@/lib/pricing";

/* Commission terms and plan prices both come from lib/pricing.ts now, so this
   can no longer drift from the pricing page.

   Terms are PRODUCT.md 5.3: 20% of base plan fees for six months, capped at
   ₹10,000 total per gym. FEATURES.md 8.1, SCREENS.md p82 and WIREFRAMES state
   ₹10,000 per month for ten months instead — roughly 17x more, and above the
   entire Starter plan fee, so it would pay the partner more than the gym pays
   us. Those documents are being corrected. */

const PAYABLE_TIERS = GYM_TIERS.filter((t) => t.monthly !== null);

export function PartnerCalculator() {
  const [gyms, setGyms] = useState(5);
  const [tierId, setTierId] = useState(PAYABLE_TIERS[1]?.id ?? PAYABLE_TIERS[0].id);
  const gymsId = useId();

  const tier = PAYABLE_TIERS.find((t) => t.id === tierId) ?? PAYABLE_TIERS[0];
  const baseFee = tier.monthly ?? 0;

  const perGymPerMonth = baseFee * COMMISSION.rate;
  const uncapped = perGymPerMonth * COMMISSION.months;
  const perGymTotal = Math.min(uncapped, COMMISSION.capPerGym);
  const isCapped = uncapped > COMMISSION.capPerGym;
  const total = perGymTotal * gyms;

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <Panel className="space-y-8 p-6 sm:p-8 lg:col-span-7">
        <div>
          <span className="text-[15px] text-ink">Plan they sign up on</span>
          <div className="mt-3">
            <Segmented
              label="Plan"
              value={tierId}
              onChange={setTierId}
              options={PAYABLE_TIERS.map((t) => ({ key: t.id, label: t.name }))}
            />
          </div>
          <p className="mt-2 text-[13px] text-ink-subtle">
            {tier.name} is {formatCurrency(baseFee)} a month. Commission is
            calculated on that base fee only.
          </p>
        </div>

        <div>
          <label
            htmlFor={gymsId}
            className="flex items-baseline justify-between gap-4"
          >
            <span className="text-[15px] text-ink">Gyms you refer</span>
            <span className="tnum text-[15px] font-semibold text-ink">{gyms}</span>
          </label>
          <input
            id={gymsId}
            type="range"
            min={1}
            max={25}
            step={1}
            value={gyms}
            onChange={(e) => setGyms(Number(e.target.value))}
            className="k-slider mt-1"
          />
          <p className="mt-2 text-[13px] text-ink-subtle">
            Counts only gyms that convert to a paying subscription and stay
            active.
          </p>
        </div>
      </Panel>

      <div className="space-y-8 lg:col-span-5">
        <div>
          <p className="text-[14px] text-ink-muted">Total commission</p>
          <p className="tnum mt-2 text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-none text-primary">
            {formatCurrency(total)}
          </p>
          <p className="mt-2 text-[13px] text-ink-subtle">
            Paid across {COMMISSION.months} months per gym, not as a lump sum.
          </p>
        </div>

        <dl className="divide-y divide-line border-y border-line">
          {[
            ["Commission rate", `${COMMISSION.rate * 100}% of base plan fee`],
            ["Per gym, per month", formatCurrency(perGymPerMonth)],
            ["Per gym, total", formatCurrency(perGymTotal)],
            ["Duration", `${COMMISSION.months} months`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[15px] text-ink-muted">{k}</dt>
              <dd className="tnum text-[15px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="text-[13px] leading-relaxed text-ink-subtle">
          {isCapped ? (
            <>
              Capped: {COMMISSION.rate * 100}% over {COMMISSION.months} months
              would be {formatCurrency(uncapped)}, above the{" "}
              {formatCurrency(COMMISSION.capPerGym)} per-gym ceiling.
            </>
          ) : (
            <>
              Commission stops at {COMMISSION.months} months or{" "}
              {formatCurrency(COMMISSION.capPerGym)} per gym, whichever comes
              first.
            </>
          )}{" "}
          Calculated on base plan fees only — capacity blocks, setup fees and GST
          are excluded. Payouts go out monthly above{" "}
          {formatCurrency(COMMISSION.minPayout)}.
        </p>
      </div>
    </div>
  );
}
