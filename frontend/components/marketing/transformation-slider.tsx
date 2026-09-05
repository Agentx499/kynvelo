"use client";

import { useCallback, useId, useRef, useState } from "react";

/* FEATURES.md 10.4 — side-by-side transformation photo slider.

   Highest-value absent feature on the site: hook 5, provable 5. It is the one
   thing that sells itself with no copy.

   ETHICS NOTE, deliberate: these are schematic silhouettes, not photographs.
   Kynvelo is pre-launch and has no customer results, and fabricating
   before/after fitness photos is both dishonest and a regulatory problem under
   ASCI guidance on misleading health claims. This demonstrates the MECHANIC -
   drag to compare two of your own dated photos - and is labelled as an
   illustration. Swap in a consenting real member pair when one exists. */

const DAY_ONE_LABEL = "Day 1";
const DAY_SIXTY_LABEL = "Day 60";

/* Two silhouettes differing only in torso taper and shoulder width, which is
   what recomposition actually looks like at 60 days. */
function Silhouette({
  variant,
  className,
}: {
  variant: "before" | "after";
  className?: string;
}) {
  const after = variant === "after";
  return (
    <svg
      viewBox="0 0 200 320"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="200" height="320" fill="var(--k-surface)" />
      {/* Reference grid so the two halves visually align while dragging. */}
      <g stroke="var(--k-line)" strokeWidth="1">
        {[80, 160, 240].map((y) => (
          <line key={y} x1="0" y1={y} x2="200" y2={y} />
        ))}
      </g>
      <g fill={after ? "var(--k-volt)" : "var(--k-ink-subtle)"} fillOpacity="0.9">
        <circle cx="100" cy="46" r="19" />
        <path
          d={
            after
              ? "M100 68 L124 80 L134 118 L128 168 L120 176 L118 236 L110 300 L92 300 L84 236 L82 176 L74 168 L68 118 L78 80 Z"
              : "M100 68 L122 80 L132 120 L130 176 L126 186 L124 240 L112 300 L90 300 L78 240 L76 186 L72 176 L70 120 L80 80 Z"
          }
        />
      </g>
    </svg>
  );
}

export function TransformationSlider() {
  const [pct, setPct] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const labelId = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(100, Math.max(0, next)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      setFromClientX(e.clientX);
    }
  };

  return (
    <figure className="space-y-3">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        className="relative aspect-[3/4] w-full max-w-sm cursor-ew-resize touch-none select-none overflow-hidden rounded-lg border border-line"
      >
        {/* After, full width underneath */}
        <Silhouette variant="after" className="absolute inset-0 h-full w-full" />

        {/* Before, clipped to the handle position */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <Silhouette variant="before" className="h-full w-full" />
        </div>

        {/* Date labels */}
        <span className="pointer-events-none absolute left-3 top-3 rounded-sm bg-canvas/85 px-2 py-1 text-[12px] text-ink-muted">
          {DAY_ONE_LABEL}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-sm bg-canvas/85 px-2 py-1 text-[12px] text-primary">
          {DAY_SIXTY_LABEL}
        </span>

        {/* Divider */}
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-primary"
          style={{ left: `${pct}%` }}
        >
          <span className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary bg-canvas">
            <span aria-hidden="true" className="text-[13px] text-primary">
              ↔
            </span>
          </span>
        </div>

        {/* Keyboard-accessible control. Visually the handle above, but this is
            the real focusable input so arrow keys work. */}
        <label htmlFor={labelId} className="sr-only">
          Comparison position between {DAY_ONE_LABEL} and {DAY_SIXTY_LABEL}
        </label>
        <input
          id={labelId}
          type="range"
          min={0}
          max={100}
          value={Math.round(pct)}
          onChange={(e) => setPct(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="text-[13px] leading-relaxed text-ink-subtle">
        Drag to compare. Illustration — Kynvelo is pre-launch, so these are
        schematic figures rather than a member&apos;s photos. Your own photos
        stay private to your account.
      </figcaption>
    </figure>
  );
}

/* FEATURES.md 1.4 — streak engine. Small, so it lives with the progress
   section rather than getting a component of its own. */
export function StreakGrid() {
  /* 8 weeks. Deterministic pattern so server and client HTML match; a random
     pattern would hydrate differently and warn. */
  const days = Array.from({ length: 56 }, (_, i) => {
    const dow = i % 7;
    if (dow === 0) return 0; // rest day
    if (i < 14) return (i * 7) % 3 === 0 ? 0 : 1; // patchier early weeks
    return 1;
  });

  const current = (() => {
    let n = 0;
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i] === 1) n++;
      else if (days[i] === 0 && i % 7 === 0) continue; // rest days don't break it
      else break;
    }
    return n;
  })();

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg font-semibold text-ink">
          Planned-visit streak
        </h3>
        <span className="tnum text-[15px] text-primary">{current} days</span>
      </div>
      <div
        className="mt-4 grid grid-flow-col grid-rows-7 gap-1"
        role="img"
        aria-label={`Attendance over the last eight weeks. Current streak ${current} days.`}
      >
        {days.map((d, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-sm ${
              d === 1 ? "bg-primary" : "bg-surface-2"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-[13px] text-ink-subtle">
        Rest days are planned, so they don&apos;t break the streak. Missing a
        session you scheduled does.
      </p>
    </div>
  );
}
