"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/* FEATURES.md 4.3 — daily calorie ring and macro splits.

   Low differentiation, high necessity: this is the single screen every calorie
   tracker is recognised by, and the site previously referenced it only as the
   string "Macro and PR analytics" in a pricing bullet. A visitor comparing us
   to MyFitnessPal had nothing to look at.

   Rings fill once on scroll-in via IntersectionObserver. The default state is
   already the filled state, so if the observer never fires - headless render,
   background tab, reduced motion - the section still shows real numbers rather
   than empty rings. */

const CALORIES = { consumed: 1840, target: 2450 };

const MACROS = [
  { key: "protein", label: "Protein", consumed: 142, target: 175, unit: "g", colour: "var(--k-protein)" },
  { key: "carbs", label: "Carbs", consumed: 196, target: 260, unit: "g", colour: "var(--k-carbs)" },
  { key: "fat", label: "Fat", consumed: 61, target: 78, unit: "g", colour: "var(--k-fat)" },
];

const R = 52;
const CIRC = 2 * Math.PI * R;

export function MacroRings() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  /* Under reduced motion the rings are simply full - no observer, no state
     write from the effect. Otherwise they fill once on scroll-in. */
  const filled = reduced || seen;

  const calPct = Math.min(1, CALORIES.consumed / CALORIES.target);
  const remaining = CALORIES.target - CALORIES.consumed;

  return (
    <div
      ref={ref}
      className="grid gap-8 rounded-lg border border-line bg-surface p-6 sm:grid-cols-2 sm:gap-10 sm:p-8"
    >
      {/* Calorie ring */}
      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <svg viewBox="0 0 130 130" className="h-40 w-40 -rotate-90" aria-hidden="true">
            <circle
              cx="65"
              cy="65"
              r={R}
              fill="none"
              strokeWidth="9"
              className="stroke-surface-2"
            />
            <circle
              cx="65"
              cy="65"
              r={R}
              fill="none"
              strokeWidth="9"
              strokeLinecap="round"
              stroke="var(--k-volt)"
              strokeDasharray={CIRC}
              strokeDashoffset={filled ? CIRC * (1 - calPct) : CIRC}
              style={{
                transition: "stroke-dashoffset 1100ms var(--ease-out-expo)",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="tnum text-3xl font-semibold leading-none text-ink">
              {remaining}
            </span>
            <span className="mt-1 text-[12px] text-ink-subtle">kcal left</span>
          </div>
        </div>
        <p className="tnum mt-4 text-[13px] text-ink-muted">
          {CALORIES.consumed} of {CALORIES.target} kcal
        </p>
      </div>

      {/* Macro bars */}
      <div className="flex flex-col justify-center gap-6">
        {MACROS.map((m, i) => {
          const pct = Math.min(1, m.consumed / m.target);
          const left = m.target - m.consumed;
          return (
            <div key={m.key}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] text-ink">{m.label}</span>
                <span className="tnum text-[13px] text-ink-muted">
                  {left}
                  {m.unit} left
                </span>
              </div>
              {/* scaleX rather than width: animating width forces layout on
                  every frame, scaleX is composited. transform-origin left so it
                  grows from the start of the track. */}
              <div
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
                role="meter"
                aria-valuenow={m.consumed}
                aria-valuemin={0}
                aria-valuemax={m.target}
                aria-label={`${m.label}: ${m.consumed} of ${m.target}${m.unit}`}
              >
                <div
                  className="h-full origin-left rounded-full"
                  style={{
                    background: m.colour,
                    transform: `scaleX(${filled ? pct : 0})`,
                    transition: `transform 900ms var(--ease-out-expo) ${140 + i * 110}ms`,
                  }}
                />
              </div>
              <p className="tnum mt-1.5 text-[12px] text-ink-subtle">
                {m.consumed} / {m.target}
                {m.unit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
