"use client";

import { useId, useMemo, useState } from "react";
import { Panel } from "@/components/ui/section";
import { formatCurrency } from "@/lib/utils";

/* FEATURES.md 6.1 — add-on marketplace. Scored 14/15 and mentioned on the site
   only as a string inside a pricing array.

   Follows the same honesty pattern as ChurnCalculator: every rate is an input
   the owner sets, and the model is printed underneath. FEATURES.md 6.1 claims
   "30-40% additional recurring revenue" - we do not repeat that here, because
   we have no cohort data to support it. The owner's own attach rate is the
   input instead. */

export function AddonRevenue() {
  const [members, setMembers] = useState(300);
  const [ptRate, setPtRate] = useState(6);
  const [ptPrice, setPtPrice] = useState(14500);
  const [suppRate, setSuppRate] = useState(12);
  const [suppSpend, setSuppSpend] = useState(1800);

  const ptId = useId();
  const ptPriceId = useId();
  const suppId = useId();
  const suppSpendId = useId();
  const membersId = useId();

  const model = useMemo(() => {
    /* PT packages are typically 12 sessions consumed over ~3 months, so a
       month's revenue is one third of a pack sale per converting member. */
    const ptBuyers = (members * ptRate) / 100;
    const ptMonthly = (ptBuyers * ptPrice) / 3;
    const suppBuyers = (members * suppRate) / 100;
    const suppMonthly = suppBuyers * suppSpend;
    return {
      ptBuyers,
      ptMonthly,
      suppBuyers,
      suppMonthly,
      total: ptMonthly + suppMonthly,
      annual: (ptMonthly + suppMonthly) * 12,
    };
  }, [members, ptRate, ptPrice, suppRate, suppSpend]);

  const field = (
    id: string,
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (n: number) => void,
    fmt: (n: number) => string,
    hint?: string
  ) => (
    <div key={id}>
      <label htmlFor={id} className="flex items-baseline justify-between gap-4">
        <span className="text-[15px] text-ink">{label}</span>
        <span className="tnum text-[15px] font-semibold text-ink">
          {fmt(value)}
        </span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="k-slider"
      />
      {hint && <p className="text-[13px] text-ink-subtle">{hint}</p>}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <Panel className="space-y-7 p-6 sm:p-8 lg:col-span-7">
        {field(membersId, "Active members", members, 50, 2000, 10, setMembers, (n) =>
          n.toLocaleString("en-IN")
        )}
        {field(
          ptId,
          "Members who buy personal training",
          ptRate,
          1,
          25,
          1,
          setPtRate,
          (n) => `${n}%`,
          "Set this to your own attach rate, not an industry figure."
        )}
        {field(ptPriceId, "Price of a 12-session PT pack", ptPrice, 4000, 40000, 500, setPtPrice, formatCurrency)}
        {field(
          suppId,
          "Members who buy supplements monthly",
          suppRate,
          1,
          40,
          1,
          setSuppRate,
          (n) => `${n}%`
        )}
        {field(suppSpendId, "Average monthly supplement spend", suppSpend, 300, 6000, 100, setSuppSpend, formatCurrency)}
      </Panel>

      <div className="space-y-8 lg:col-span-5">
        <div>
          <p className="text-[14px] text-ink-muted">
            Add-on revenue, per month
          </p>
          <p className="tnum mt-2 text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-none text-primary">
            {formatCurrency(model.total)}
          </p>
          <p className="mt-2 text-[13px] text-ink-subtle">
            {formatCurrency(model.annual)} a year
          </p>
        </div>

        <dl className="divide-y divide-line border-y border-line">
          {[
            ["PT buyers", model.ptBuyers.toFixed(0)],
            ["PT revenue / month", formatCurrency(model.ptMonthly)],
            ["Supplement buyers", model.suppBuyers.toFixed(0)],
            ["Supplement revenue / month", formatCurrency(model.suppMonthly)],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[15px] text-ink-muted">{k}</dt>
              <dd className="tnum text-[15px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="space-y-2 text-[13px] leading-relaxed text-ink-subtle">
          <p className="text-ink-muted">How this is calculated</p>
          <p>
            PT: members × attach rate × pack price ÷ 3 months. Supplements:
            members × attach rate × monthly spend.
          </p>
          <p>
            This is gross revenue through the marketplace, before your cost of
            goods and trainer payouts. Kynvelo takes no cut of it.
          </p>
        </div>
      </div>
    </div>
  );
}
