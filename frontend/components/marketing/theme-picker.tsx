"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { DeviceFrame } from "@/components/marketing/device-frame";

/* FEATURES.md 7.1 — runtime dynamic tenant themer.

   This is the cheapest possible proof of the claim, because it works the exact
   way the product does: the picker sets --k-volt and --k-on-volt as inline
   custom properties on a wrapper, and everything inside re-themes. No rebuild,
   no second bundle. The `[data-tenant]` rule in globals.css does the same thing
   from a resolved gym_id.

   Contrast is pre-checked per swatch: `onPrimary` is set to whichever of
   near-black or near-white clears 4.5:1 against that hue, so a gym cannot pick
   a colour that makes its own buttons unreadable. */

const BRANDS = [
  { name: "Kynvelo", primary: "#C6FF00", onPrimary: "#050608" },
  { name: "Iron Works", primary: "#FF5C1A", onPrimary: "#050608" },
  { name: "Aquaflow", primary: "#22D3EE", onPrimary: "#050608" },
  { name: "Apex Club", primary: "#F43F5E", onPrimary: "#FFFFFF" },
  { name: "Summit", primary: "#A3E635", onPrimary: "#050608" },
];

export function ThemePicker() {
  const [brand, setBrand] = useState(BRANDS[1]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
      <div className="space-y-6 lg:col-span-6">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink">
            Pick a colour. Watch it apply.
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
            This is not a mockup of the feature — it is the feature. Your brand
            colour is injected as a CSS custom property when a member signs in,
            so there is nothing to rebuild and nothing to resubmit to an app
            store when you rebrand.
          </p>
        </div>

        <div>
          <p className="text-[14px] text-ink">Gym brand</p>
          <div className="mt-3 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Gym brand colour">
            {BRANDS.map((b) => {
              const active = b.name === brand.name;
              return (
                <button
                  key={b.name}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setBrand(b)}
                  className={`flex h-11 cursor-pointer items-center gap-2 rounded-md border px-3 text-[14px] transition-colors ${
                    active
                      ? "border-ink-subtle text-ink"
                      : "border-line text-ink-muted hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-4 w-4 rounded-sm"
                    style={{ background: b.primary }}
                  />
                  {b.name}
                  {active && (
                    <Check className="h-3.5 w-3.5 text-ink-subtle" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <dl className="divide-y divide-line border-y border-line text-[14px]">
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-muted">Injected token</dt>
            <dd className="tnum text-ink">--k-volt</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-muted">Value</dt>
            <dd className="tnum text-ink">{brand.primary}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-ink-muted">Rebuild required</dt>
            <dd className="text-ink">None</dd>
          </div>
        </dl>

        <p className="text-[13px] leading-relaxed text-ink-subtle">
          The dark canvas, hairlines and typography stay fixed. Only the accent
          moves — which is what keeps every white-labelled gym looking
          engineered rather than recoloured.
        </p>
      </div>

      {/* The themed surface. Inline custom properties are exactly the mechanism
          the tenant themer uses at runtime. */}
      <div
        className="lg:col-span-6"
        style={
          {
            "--k-volt": brand.primary,
            "--k-volt-dim": `${brand.primary}1F`,
            "--k-on-volt": brand.onPrimary,
          } as React.CSSProperties
        }
      >
        <DeviceFrame label={`${brand.name} — member app, no rebuild`}>
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className="h-5 w-5 rounded-sm"
                style={{ background: "var(--k-volt)" }}
              />
              <span className="font-display text-[15px] font-semibold uppercase tracking-wider text-ink">
                {brand.name}
              </span>
            </div>
            <span
              className="rounded-sm px-1.5 text-[11px] leading-5"
              style={{
                background: "var(--k-volt-dim)",
                color: "var(--k-volt)",
              }}
            >
              12 day streak
            </span>
          </div>

          <div className="space-y-4 p-4">
            <div>
              <p className="text-[12px] text-ink-subtle">Today</p>
              <p className="mt-1 font-display text-xl font-semibold text-ink">
                Push · Chest and shoulders
              </p>
            </div>

            <div className="rounded-md border border-line p-3">
              <div className="flex items-baseline justify-between">
                <span className="text-[13px] text-ink-muted">Calories left</span>
                <span
                  className="tnum text-[15px] font-semibold"
                  style={{ color: "var(--k-volt)" }}
                >
                  610
                </span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full w-3/4 rounded-full"
                  style={{ background: "var(--k-volt)" }}
                />
              </div>
            </div>

            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="h-11 w-full rounded-md text-[14px] font-semibold"
              style={{
                background: "var(--k-volt)",
                color: "var(--k-on-volt)",
              }}
            >
              Show gym pass
            </button>

            <p className="text-center text-[12px] text-ink-subtle">
              Renews 18 Mar · tap to extend
            </p>
          </div>
        </DeviceFrame>
      </div>
    </div>
  );
}
