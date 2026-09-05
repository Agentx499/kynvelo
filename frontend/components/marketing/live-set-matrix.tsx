"use client";

import { useEffect, useReducer } from "react";
import { Check } from "lucide-react";
import { DeviceFrame } from "@/components/marketing/device-frame";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/* Athlete hero visual. Replaces Barbell3DScene.

   Why the 3D barbell went: it cost ~600 KB of `three` to render an ornament
   that demonstrated no feature. This shows the actual product doing the three
   things the section claims - pre-filling last week's numbers, starting the
   rest timer on check, and detecting a PR - in SVG and CSS.

   Motion is a short loop that settles, not a permanent animation. Under
   prefers-reduced-motion the final state renders immediately and nothing
   moves, which is why `done` is derived from a step counter rather than
   gated behind a CSS transition. */

type Row = {
  set: number;
  prev: string;
  weight: string;
  reps: number;
  plates: string;
  pr?: boolean;
};

const ROWS: Row[] = [
  { set: 1, prev: "60 × 8", weight: "60.0", reps: 8, plates: "20" },
  { set: 2, prev: "80 × 8", weight: "80.0", reps: 8, plates: "25 + 5" },
  { set: 3, prev: "80 × 8", weight: "82.5", reps: 8, plates: "25 + 5 + 1.25", pr: true },
  { set: 4, prev: "80 × 6", weight: "82.5", reps: 6, plates: "25 + 5 + 1.25" },
];

const REST_SECONDS = 90;

type State = { step: number; rest: number };
type Action = { type: "tick" } | { type: "settle" };

function reducer(state: State, action: Action): State {
  if (action.type === "settle") return { step: ROWS.length, rest: 0 };

  const { step, rest } = state;

  // Counting down between sets.
  if (rest > 0) return { step, rest: rest - 1 };

  // All sets logged: hold, then restart the loop.
  if (step >= ROWS.length) return { step: 0, rest: 0 };

  // Log the next set and start its rest timer, except after the last one.
  const next = step + 1;
  return { step: next, rest: next < ROWS.length ? REST_SECONDS : 0 };
}

export function LiveSetMatrix() {
  const reduced = useReducedMotion();
  const [state, dispatch] = useReducer(reducer, { step: 0, rest: 0 });

  useEffect(() => {
    if (reduced) return;
    /* 260ms per tick. The rest timer is compressed rather than real-time -
       nobody watches 90 real seconds on a landing page - but it counts in
       whole seconds so the number reads as a genuine timer. */
    const id = window.setInterval(() => dispatch({ type: "tick" }), 260);
    return () => window.clearInterval(id);
  }, [reduced]);

  /* Derived rather than dispatched from the effect, so reduced motion needs no
     setState at all: all sets read as logged and the timer is idle. */
  const { step, rest } = reduced ? { step: ROWS.length, rest: 0 } : state;
  const restPct = rest / REST_SECONDS;

  return (
    <DeviceFrame label="Logging a working set. Checking it starts the rest clock.">
      {/* Session header */}
      <div className="flex items-baseline justify-between border-b border-line px-4 py-3">
        <div>
          <p className="font-display text-[17px] font-semibold leading-tight text-ink">
            Barbell Back Squat
          </p>
          <p className="mt-0.5 text-[12px] text-ink-subtle">
            Last week: 80 kg × 8
          </p>
        </div>
        <span className="tnum text-[13px] text-ink-muted">24:16</span>
      </div>

      {/* Progressive overload advisor - FEATURES.md 5.7 */}
      <p className="border-b border-line bg-surface px-4 py-2 text-[12px] text-ink-muted">
        Target today: <span className="text-primary">82.5 kg × 8</span> or 80 × 9
      </p>

      {/* Set rows */}
      <ul className="divide-y divide-line">
        {ROWS.map((row, i) => {
          const done = i < step;
          return (
            <li
              key={row.set}
              className={`flex items-center gap-3 px-4 py-2.5 transition-colors duration-200 ${
                done ? "" : "opacity-45"
              }`}
            >
              <span className="tnum w-4 text-[13px] text-ink-subtle">
                {row.set}
              </span>

              <span className="tnum w-16 text-[13px] text-ink-subtle">
                {row.prev}
              </span>

              <span className="tnum flex-1 text-[14px] text-ink">
                {row.weight}
                <span className="text-[11px] text-ink-subtle"> kg</span>
                <span className="text-ink-subtle"> × </span>
                {row.reps}
              </span>

              {done && row.pr && (
                <span className="rounded-sm bg-primary-dim px-1.5 text-[11px] leading-5 text-primary">
                  PR
                </span>
              )}

              {/* Completion checkbox. Volt fill on check, matching the app. */}
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border transition-colors duration-200 ${
                  done
                    ? "border-primary bg-primary text-on-primary"
                    : "border-line-strong"
                }`}
              >
                {done && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Plate math for the working weight - FEATURES.md 5.4 */}
      <div className="border-t border-line px-4 py-2.5">
        <p className="text-[12px] text-ink-subtle">Per sleeve</p>
        <p className="tnum mt-0.5 text-[13px] text-ink">
          <span className="text-primary">25 + 5 + 1.25</span> kg · 20 kg bar
        </p>
      </div>

      {/* Rest timer. Occupies fixed height so the frame never reflows. */}
      <div className="flex h-[52px] items-center gap-3 border-t border-line bg-surface px-4">
        {rest > 0 ? (
          <>
            <svg
              viewBox="0 0 36 36"
              className="h-7 w-7 shrink-0 -rotate-90"
              aria-hidden="true"
            >
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                className="text-line-strong"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                className="text-primary"
                strokeDasharray={2 * Math.PI * 15}
                strokeDashoffset={2 * Math.PI * 15 * (1 - restPct)}
              />
            </svg>
            <span className="tnum text-[15px] text-ink">
              {String(Math.floor(rest / 60)).padStart(2, "0")}:
              {String(rest % 60).padStart(2, "0")}
            </span>
            <span className="text-[12px] text-ink-subtle">rest</span>
          </>
        ) : (
          <span className="text-[13px] text-ink-subtle">
            {step >= ROWS.length ? "Session complete" : "Ready for set 1"}
          </span>
        )}
      </div>
    </DeviceFrame>
  );
}
