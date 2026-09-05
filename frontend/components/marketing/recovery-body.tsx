"use client";

import { useId, useMemo, useState } from "react";

/* FEATURES.md 5.8 (muscle recovery heatmap) + 10.3 (morning readiness).

   These are the two highest-differentiation features in the product and the
   site previously rendered 5.8 as three rows of text and 10.3 not at all.

   The body is a simplified front-view figure. It is deliberately schematic
   rather than anatomically illustrative - a diagram, not a drawing - because
   crude figurative SVG reads as amateurish. Each region is a real control:
   focus it, click it, or tab to it. */

type Muscle = {
  id: string;
  name: string;
  /** 0 = fully fatigued, 100 = fully recovered. */
  recovery: number;
  lastTrained: string;
  volume: string;
  path: string;
};

/* Coordinates are on a 200 x 420 viewBox. Symmetrical pairs share one path
   with a mirrored copy, so a click anywhere on either side selects the group. */
const MUSCLES: Muscle[] = [
  {
    id: "traps",
    name: "Trapezius",
    recovery: 88,
    lastTrained: "3 days ago",
    volume: "6 sets",
    path: "M78 62 L100 56 L122 62 L118 78 L100 72 L82 78 Z",
  },
  {
    id: "shoulders",
    name: "Shoulders",
    recovery: 62,
    lastTrained: "2 days ago",
    volume: "12 sets",
    path: "M66 80 Q54 84 52 104 L66 112 L76 92 Z M134 80 Q146 84 148 104 L134 112 L124 92 Z",
  },
  {
    id: "chest",
    name: "Chest",
    recovery: 96,
    lastTrained: "4 days ago",
    volume: "9 sets",
    path: "M78 82 L100 76 L122 82 L124 116 L100 124 L76 116 Z",
  },
  {
    id: "biceps",
    name: "Biceps",
    recovery: 54,
    lastTrained: "2 days ago",
    volume: "8 sets",
    path: "M52 108 L66 116 L64 152 L50 146 Z M148 108 L134 116 L136 152 L150 146 Z",
  },
  {
    id: "forearms",
    name: "Forearms",
    recovery: 74,
    lastTrained: "2 days ago",
    volume: "4 sets",
    path: "M50 150 L64 156 L62 196 L48 192 Z M150 150 L136 156 L138 196 L152 192 Z",
  },
  {
    id: "abs",
    name: "Abdominals",
    recovery: 92,
    lastTrained: "5 days ago",
    volume: "5 sets",
    path: "M84 128 L116 128 L114 182 L100 190 L86 182 Z",
  },
  {
    id: "quads",
    name: "Quadriceps",
    recovery: 38,
    lastTrained: "yesterday",
    volume: "18 sets",
    path: "M80 196 L98 196 L96 282 L78 278 Z M120 196 L102 196 L104 282 L122 278 Z",
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    recovery: 41,
    lastTrained: "yesterday",
    volume: "12 sets",
    path: "M78 284 L96 288 L94 322 L78 318 Z M122 284 L104 288 L106 322 L122 318 Z",
  },
  {
    id: "calves",
    name: "Calves",
    recovery: 80,
    lastTrained: "3 days ago",
    volume: "6 sets",
    path: "M80 326 L94 330 L92 386 L80 382 Z M120 326 L106 330 L108 386 L120 382 Z",
  },
];

/* Three bands, matching the app: recovered / recovering / fatigued. */
function band(recovery: number) {
  if (recovery >= 75) return { fill: "var(--k-success)", label: "Recovered" };
  if (recovery >= 50) return { fill: "var(--k-warning)", label: "Recovering" };
  return { fill: "var(--k-danger)", label: "Fatigued" };
}

const READINESS_INPUTS = [
  { id: "sleep", label: "Sleep quality" },
  { id: "soreness", label: "Muscle soreness" },
  { id: "energy", label: "Energy level" },
] as const;

export function RecoveryBody() {
  const [selectedId, setSelectedId] = useState("quads");
  const [scores, setScores] = useState<Record<string, number>>({
    sleep: 3,
    soreness: 2,
    energy: 4,
  });
  const titleId = useId();

  const selected = MUSCLES.find((m) => m.id === selectedId) ?? MUSCLES[0];

  /* Readiness: sleep and energy count positively, soreness inversely.
     Each is 1-5, so the raw range is 3-15, normalised to 0-100. */
  const readiness = useMemo(() => {
    const raw = scores.sleep + (6 - scores.soreness) + scores.energy;
    return Math.round(((raw - 3) / 12) * 100);
  }, [scores]);

  const advice =
    readiness >= 70
      ? "Full working volume."
      : readiness >= 45
        ? "Hold volume, drop intensity ~10%."
        : "Cut volume by a third. Technique work only.";

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* --- Body diagram --- */}
      <div className="lg:col-span-5">
        <figure className="rounded-lg border border-line bg-surface p-5">
          <svg
            viewBox="0 0 200 420"
            className="mx-auto h-[340px] w-auto sm:h-[400px]"
            role="group"
            aria-labelledby={titleId}
          >
            <title id={titleId}>
              Muscle recovery diagram. Select a muscle group for detail.
            </title>

            {/* Body outline: head, torso silhouette, limbs. Non-interactive. */}
            <g
              fill="none"
              stroke="var(--k-line-strong)"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <circle cx="100" cy="34" r="17" />
              <path d="M100 51 L100 60" />
              <path d="M74 64 Q100 54 126 64 L132 78 Q150 84 152 106 L154 196 M46 196 L48 106 Q50 84 68 78 Z" />
              <path d="M76 190 L124 190 L126 200 L122 322 L120 388 L104 388 L102 330 L98 330 L96 388 L80 388 L78 322 L74 200 Z" />
            </g>

            {/* Muscle regions.
                Pointer affordance only - deliberately NOT focusable and not
                exposed as buttons. A thin band like the trapezius is 18px tall,
                so it can never meet the 44px touch minimum, and making it a
                tab stop would put nine sub-minimum controls in the keyboard
                path. The button list below is the accessible control surface;
                these shapes are the visual one. */}
            {MUSCLES.map((m) => {
              const isSelected = m.id === selectedId;
              const { fill } = band(m.recovery);
              return (
                <path
                  key={m.id}
                  d={m.path}
                  fill={fill}
                  fillOpacity={isSelected ? 0.95 : 0.55}
                  stroke={isSelected ? "var(--k-ink)" : "transparent"}
                  strokeWidth="1.5"
                  aria-hidden="true"
                  onClick={() => setSelectedId(m.id)}
                  className="cursor-pointer transition-[fill-opacity] duration-200"
                />
              );
            })}
          </svg>

          {/* Accessible control surface. Real 44px buttons, keyboard-reachable,
              in the same order as the diagram reads top to bottom. */}
          <div
            role="radiogroup"
            aria-label="Muscle group"
            className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-4"
          >
            {MUSCLES.map((m) => {
              const isSelected = m.id === selectedId;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedId(m.id)}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 text-[13px] transition-colors ${
                    isSelected
                      ? "border-ink-subtle text-ink"
                      : "border-line text-ink-muted hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-2.5 w-2.5 shrink-0 rounded-sm"
                    style={{ background: band(m.recovery).fill }}
                  />
                  {m.name}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <figcaption className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-line pt-4 text-[12px]">
            {[
              ["var(--k-success)", "Recovered"],
              ["var(--k-warning)", "Recovering"],
              ["var(--k-danger)", "Fatigued"],
            ].map(([colour, label]) => (
              <span key={label} className="flex items-center gap-1.5 text-ink-subtle">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ background: colour }}
                />
                {label}
              </span>
            ))}
          </figcaption>
        </figure>
      </div>

      {/* --- Detail + readiness --- */}
      <div className="space-y-8 lg:col-span-7">
        {/* Selected muscle readout */}
        <div className="rounded-lg border border-line bg-surface p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-ink">
              {selected.name}
            </h3>
            <span
              className="text-[14px]"
              style={{ color: band(selected.recovery).fill }}
            >
              {band(selected.recovery).label}
            </span>
          </div>

          {/* Recovery bar */}
          <div className="mt-4">
            <div
              className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2"
              role="meter"
              aria-valuenow={selected.recovery}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${selected.name} recovery`}
            >
              <div
                className="h-full rounded-full transition-[width] duration-300"
                style={{
                  width: `${selected.recovery}%`,
                  background: band(selected.recovery).fill,
                }}
              />
            </div>
            <p className="tnum mt-2 text-[13px] text-ink-muted">
              {selected.recovery}% recovered · last trained{" "}
              {selected.lastTrained} · {selected.volume}
            </p>
          </div>
        </div>

        {/* Readiness check-in */}
        <div className="rounded-lg border border-line bg-surface p-6">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="font-display text-xl font-semibold text-ink">
              This morning&apos;s readiness
            </h3>
            <span className="tnum text-2xl font-semibold text-primary">
              {readiness}%
            </span>
          </div>
          <p className="mt-1 text-[13px] text-ink-subtle">
            Three taps. Adjust them and watch the recommendation move.
          </p>

          <div className="mt-6 space-y-5">
            {READINESS_INPUTS.map((input) => (
              <div key={input.id}>
                <label
                  htmlFor={`readiness-${input.id}`}
                  className="flex items-baseline justify-between gap-4"
                >
                  <span className="text-[14px] text-ink">{input.label}</span>
                  <span className="tnum text-[14px] text-ink-muted">
                    {scores[input.id]} / 5
                  </span>
                </label>
                <input
                  id={`readiness-${input.id}`}
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={scores[input.id]}
                  onChange={(e) =>
                    setScores((s) => ({
                      ...s,
                      [input.id]: Number(e.target.value),
                    }))
                  }
                  className="k-slider"
                />
              </div>
            ))}
          </div>

          <p className="mt-5 border-t border-line pt-4 text-[15px] text-ink">
            <span className="text-ink-subtle">Today: </span>
            {advice}
          </p>
        </div>
      </div>
    </div>
  );
}
