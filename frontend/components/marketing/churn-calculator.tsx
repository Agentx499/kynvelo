"use client";

import { useId, useMemo, useState } from "react";
import { Panel } from "@/components/ui/section";
import { formatCurrency } from "@/lib/utils";

/* Replaces roi-slider.tsx.

   The v1 version presented a single output number with no stated assumptions,
   and the surrounding copy asserted "85% of dropping members stop attending
   10-15 days before expiry" and "audited against 240+ commercial gym operating
   datasets" with nothing behind either figure.

   This version makes the model visible and adjustable, and labels the recovery
   rate as an assumption rather than a finding. A gym owner who can see the
   arithmetic can argue with it, which is the point of a sales calculator.
   Anything we cannot substantiate is not stated. */

function Slider({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  const id = useId();
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[15px] text-ink">
          {label}
        </label>
        <output htmlFor={id} className="tnum text-[15px] font-semibold text-ink">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="k-slider mt-1"
      />
      {hint && <p className="mt-2 text-[13px] text-ink-subtle">{hint}</p>}
    </div>
  );
}

/* Exported so the build-time sensitivity matrix on /roi-calculator uses the
   identical model. Previously both defined their own constants and could drift.

   monthsCredited: a recovered member is credited with the remainder of a
   twelve-month cycle, six months on average. Crediting a full year overstates
   it; crediting one month understates it. */
export const CHURN_MODEL = {
  lapseRate: 0.04,
  recoveryRate: 0.35,
  monthsCredited: 6,
  defaultFee: 1500,
  defaultMembers: 300,
} as const;

export function ChurnCalculator({ showModel = true }: { showModel?: boolean }) {
  /* Explicit <number> because CHURN_MODEL is `as const`, so its members would
     otherwise infer as the literal types 300 and 1500. */
  const [members, setMembers] = useState<number>(CHURN_MODEL.defaultMembers);
  const [fee, setFee] = useState<number>(CHURN_MODEL.defaultFee);
  const [lapseRate, setLapseRate] = useState<number>(CHURN_MODEL.lapseRate * 100);
  const [recoveryRate, setRecoveryRate] = useState<number>(
    CHURN_MODEL.recoveryRate * 100
  );

  const model = useMemo(() => {
    const lapsingPerMonth = (members * lapseRate) / 100;
    const recoveredPerMonth = (lapsingPerMonth * recoveryRate) / 100;
    /* A recovered member is credited with the remainder of a 12-month year on
       average, so six months of fees. Crediting a full year would overstate
       it and crediting one month would understate it. */
    const monthsCredited = 6;
    const recoveredRevenue = recoveredPerMonth * fee * monthsCredited;
    const lostRevenue = lapsingPerMonth * fee * monthsCredited * 12;
    return {
      lapsingPerMonth,
      recoveredPerMonth,
      recoveredAnnual: recoveredRevenue * 12,
      lostAnnual: lostRevenue,
      monthsCredited,
    };
  }, [members, fee, lapseRate, recoveryRate]);

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <Panel className="space-y-8 p-6 sm:p-8 lg:col-span-7">
        <Slider
          label="Active members"
          value={members}
          min={50}
          max={2000}
          step={10}
          onChange={setMembers}
          format={(n) => n.toLocaleString("en-IN")}
        />
        <Slider
          label="Average monthly fee"
          value={fee}
          min={500}
          max={6000}
          step={100}
          onChange={setFee}
          format={(n) => formatCurrency(n)}
        />
        <Slider
          label="Members who quietly stop coming, per month"
          hint="Industry figures for Indian gyms commonly fall between 3% and 6%. Set it to what your own records show."
          value={lapseRate}
          min={1}
          max={12}
          step={0.5}
          onChange={setLapseRate}
          format={(n) => `${n}%`}
        />
        <Slider
          label="Assumed recovery rate after early contact"
          hint="This is your assumption, not our claim. We have no published recovery figure to quote yet."
          value={recoveryRate}
          min={5}
          max={70}
          step={5}
          onChange={setRecoveryRate}
          format={(n) => `${n}%`}
        />
      </Panel>

      <div className="space-y-8 lg:col-span-5">
        <div>
          <p className="text-[14px] text-ink-muted">
            Revenue recovered per year
          </p>
          <p className="tnum mt-2 text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-none text-primary">
            {formatCurrency(model.recoveredAnnual)}
          </p>
        </div>

        <dl className="divide-y divide-line border-y border-line">
          {[
            [
              "Members drifting each month",
              model.lapsingPerMonth.toFixed(1),
            ],
            [
              "Of those, recovered",
              model.recoveredPerMonth.toFixed(1),
            ],
            [
              "Revenue still lost each year",
              formatCurrency(model.lostAnnual),
            ],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[15px] text-ink-muted">{k}</dt>
              <dd className="tnum text-[15px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        {showModel && (
          <div className="space-y-2 text-[13px] leading-relaxed text-ink-subtle">
            <p className="text-ink-muted">How this is calculated</p>
            <p>
              members × lapse rate × recovery rate × fee ×{" "}
              {model.monthsCredited} months × 12
            </p>
            <p>
              A recovered member is credited with {model.monthsCredited} months
              of fees — the average remainder of a year. Excludes GST, add-on
              revenue and your own follow-up effort, none of which we can model
              for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
