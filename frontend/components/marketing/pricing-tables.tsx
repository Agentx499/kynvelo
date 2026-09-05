"use client";

import { Fragment, useId, useState } from "react";
import { Check, Minus } from "lucide-react";
import { Rule } from "@/components/ui/section";
import { Segmented, TierCard } from "@/components/marketing/tier-card";
import { formatCurrency } from "@/lib/utils";
import {
  ATHLETE_TIERS,
  GST,
  GYM_COMPARISON,
  GYM_TIERS,
  INCLUDED_MEMBERS,
  MEMBER_BLOCKS,
  SETUP_FEE,
  monthlyEquivalent,
  type ComparisonValue,
  type Interval,
} from "@/lib/pricing";

/* Every figure here now comes from lib/pricing.ts. Nothing is hardcoded. */

type Audience = "athlete" | "gym";

function Cell({ value }: { value: ComparisonValue }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto h-4 w-4 text-primary" aria-hidden="true" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <Minus className="mx-auto h-4 w-4 text-ink-subtle" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="tnum text-[14px] text-ink">{value}</span>;
}

export function PricingTables({
  defaultAudience = "gym",
}: {
  defaultAudience?: Audience;
}) {
  const [audience, setAudience] = useState<Audience>(defaultAudience);
  const [interval, setInterval] = useState<Interval>("annual");
  const [blockIndex, setBlockIndex] = useState(0);
  const [overageTierId, setOverageTierId] = useState("gym-growth");
  const blockId = useId();

  const tiers = audience === "gym" ? GYM_TIERS : ATHLETE_TIERS;
  const block = MEMBER_BLOCKS[blockIndex];

  /* Blocks apply to Starter and Growth both. The previous version always
     priced against Growth, so a Starter buyer saw the wrong base. */
  const overageTier =
    GYM_TIERS.find((t) => t.id === overageTierId) ?? GYM_TIERS[1];
  const base = monthlyEquivalent(overageTier, interval) ?? 0;

  return (
    <div className="space-y-16">
      {/* --- Switches --- */}
      <div className="flex flex-wrap items-center gap-4">
        <Segmented<Audience>
          label="Who is this for"
          value={audience}
          onChange={setAudience}
          options={[
            { key: "gym", label: "For gyms" },
            { key: "athlete", label: "For athletes" },
          ]}
        />
        <Segmented<Interval>
          label="Billing interval"
          value={interval}
          onChange={setInterval}
          options={[
            { key: "monthly", label: "Monthly" },
            { key: "annual", label: "Annual" },
          ]}
        />
        {interval === "annual" && audience === "gym" && (
          <span className="text-[14px] text-primary">
            Annual prepay waives the setup fee
          </span>
        )}
      </div>

      {/* --- Tier cards --- */}
      <div className="grid gap-5 lg:grid-cols-3">
        {tiers.map((tier) => (
          <TierCard key={tier.id} tier={tier} interval={interval} />
        ))}
      </div>

      {audience === "athlete" && (
        <p className="text-[14px] text-ink-subtle">
          Athlete plans carry no setup fee and no member limits. Cancel any time.
        </p>
      )}

      {audience === "gym" && (
        <>
          {/* --- Capacity blocks --- */}
          <Rule />
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-4 lg:col-span-5">
              <h3 className="font-display text-2xl font-semibold text-ink">
                More than {INCLUDED_MEMBERS} members?
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                Add capacity in blocks. Gates are never shut off and reception is
                never locked if you go over — you get billed for the block.
              </p>
            </div>

            <div className="space-y-6 lg:col-span-7">
              <Segmented
                label="Plan the blocks apply to"
                value={overageTierId}
                onChange={setOverageTierId}
                options={GYM_TIERS.filter((t) => t.monthly !== null).map((t) => ({
                  key: t.id,
                  label: t.name,
                }))}
              />

              <div>
                <label
                  htmlFor={blockId}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="text-[15px] text-ink">
                    Extra member capacity
                  </span>
                  <span className="tnum text-[15px] font-semibold text-ink">
                    +{block.members}
                  </span>
                </label>
                <input
                  id={blockId}
                  type="range"
                  min={0}
                  max={MEMBER_BLOCKS.length - 1}
                  step={1}
                  value={blockIndex}
                  onChange={(e) => setBlockIndex(Number(e.target.value))}
                  className="k-slider mt-1"
                />
              </div>

              <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-5">
                <span className="text-[15px] text-ink-muted">
                  {overageTier.name}, {INCLUDED_MEMBERS + block.members} members
                </span>
                <span className="tnum text-2xl font-semibold text-ink">
                  {formatCurrency(base + block.monthly)}
                  <span className="ml-1 text-[15px] font-normal text-ink-subtle">
                    /month
                  </span>
                </span>
              </div>

              <p className="text-[13px] text-ink-subtle">
                Blocks are{" "}
                {MEMBER_BLOCKS.filter((b) => b.members > 0)
                  .map((b) => `${formatCurrency(b.monthly)} per ${b.members}`)
                  .join(" and ")}{" "}
                members. Shown against the {interval} {overageTier.name} base.
                Excludes {GST.label}.
              </p>
            </div>
          </div>

          {/* --- Comparison table --- */}
          <Rule />
          <div className="space-y-8">
            <h3 className="font-display text-2xl font-semibold text-ink">
              Everything, side by side
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[680px] text-left">
                <caption className="sr-only">
                  Feature comparison across Starter, Growth and Enterprise gym
                  plans
                </caption>
                {/* Sticky only from md up: position:sticky on a thead inside an
                    overflow-x-auto container breaks horizontal containment. */}
                <thead className="bg-canvas md:sticky md:top-16">
                  <tr className="border-b border-line-strong">
                    <th
                      scope="col"
                      className="py-4 pr-4 text-[14px] font-medium text-ink-subtle"
                    >
                      Feature
                    </th>
                    {GYM_TIERS.map((t) => (
                      <th
                        key={t.id}
                        scope="col"
                        className="w-[130px] px-3 py-4 text-center font-display text-[17px] font-semibold text-ink"
                      >
                        {t.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GYM_COMPARISON.map((grp) => (
                    <Fragment key={grp.group}>
                      <tr>
                        <th
                          scope="colgroup"
                          colSpan={4}
                          className="pb-2 pt-8 text-left text-[13px] uppercase tracking-wider text-primary"
                        >
                          {grp.group}
                        </th>
                      </tr>
                      {grp.rows.map((r) => (
                        <tr key={r.label} className="border-b border-line">
                          <th
                            scope="row"
                            className="py-3.5 pr-4 text-left text-[15px] font-normal text-ink-muted"
                          >
                            {r.label}
                          </th>
                          <td className="px-3 py-3.5 text-center">
                            <Cell value={r.starter} />
                          </td>
                          <td className="px-3 py-3.5 text-center">
                            <Cell value={r.growth} />
                          </td>
                          <td className="px-3 py-3.5 text-center">
                            <Cell value={r.enterprise} />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[13px] leading-relaxed text-ink-subtle">
              All gym pricing is subject to {GST.label} under SAC {GST.sac}. A
              one-time setup fee of {formatCurrency(SETUP_FEE.min)}–
              {formatCurrency(SETUP_FEE.max)} covers branding, staff training and
              member data migration, and is waived on {SETUP_FEE.waivedOn}.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
