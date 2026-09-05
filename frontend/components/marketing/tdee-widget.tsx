"use client";

import { useId, useMemo, useState } from "react";
import { Panel } from "@/components/ui/section";

/* FEATURES.md 10.5 — TDEE and BMR.

   Real Mifflin-St Jeor, computed client-side. Nothing here is estimated or
   invented, which makes it the most defensible interactive element on the site
   and a standalone asset people link to.

   Mifflin-St Jeor (1990):
     male   BMR = 10w + 6.25h - 5a + 5
     female BMR = 10w + 6.25h - 5a - 161
   with w in kg, h in cm, a in years. */

const ACTIVITY = [
  { key: 1.2, label: "Sedentary", detail: "Desk work, no training" },
  { key: 1.375, label: "Light", detail: "1–3 sessions a week" },
  { key: 1.55, label: "Moderate", detail: "3–5 sessions a week" },
  { key: 1.725, label: "Heavy", detail: "6–7 sessions a week" },
  { key: 1.9, label: "Athlete", detail: "Twice-daily training" },
];

const GOALS = [
  { key: -0.2, label: "Lose fat", note: "20% below maintenance" },
  { key: 0, label: "Maintain", note: "At maintenance" },
  { key: 0.1, label: "Build muscle", note: "10% above maintenance" },
];

function NumberField({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (n: number) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] text-ink">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-2">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min={min}
          max={max}
          value={value}
          onChange={(e) => {
            const n = Number(e.target.value);
            if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
          }}
          className="h-11 w-full rounded-md border border-line bg-canvas px-3 text-[15px] text-ink focus:border-line-strong focus:outline-none"
        />
        <span className="shrink-0 text-[13px] text-ink-subtle">{suffix}</span>
      </div>
    </div>
  );
}

export function TdeeWidget() {
  const [sex, setSex] = useState<"male" | "female">("male");
  const [age, setAge] = useState(28);
  const [height, setHeight] = useState(175);
  const [weight, setWeight] = useState(74);
  const [activity, setActivity] = useState(1.55);
  const [goal, setGoal] = useState(0);

  const { bmr, tdee, target, protein } = useMemo(() => {
    const base = 10 * weight + 6.25 * height - 5 * age;
    const bmrV = Math.round(sex === "male" ? base + 5 : base - 161);
    const tdeeV = Math.round(bmrV * activity);
    const targetV = Math.round(tdeeV * (1 + goal));
    /* 1.8 g/kg is the middle of the commonly cited resistance-training range.
       Stated so the number is auditable rather than magic. */
    const proteinV = Math.round(weight * 1.8);
    return { bmr: bmrV, tdee: tdeeV, target: targetV, protein: proteinV };
  }, [sex, age, height, weight, activity, goal]);

  const activityLabel =
    ACTIVITY.find((a) => a.key === activity)?.label ?? "Moderate";
  const goalNote = GOALS.find((g) => g.key === goal)?.note ?? "";

  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <Panel className="space-y-6 p-6 sm:p-8 lg:col-span-7">
        <fieldset>
          <legend className="text-[14px] text-ink">Sex</legend>
          <div className="mt-2 inline-flex rounded-md border border-line p-0.5">
            {(["male", "female"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSex(s)}
                aria-pressed={sex === s}
                className={`k-seg capitalize ${
                  sex === s
                    ? "bg-primary font-semibold text-on-primary"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="grid gap-5 sm:grid-cols-3">
          <NumberField label="Age" value={age} min={14} max={90} suffix="yrs" onChange={setAge} />
          <NumberField label="Height" value={height} min={120} max={220} suffix="cm" onChange={setHeight} />
          <NumberField label="Weight" value={weight} min={35} max={200} suffix="kg" onChange={setWeight} />
        </div>

        <div>
          <label
            htmlFor="tdee-activity"
            className="flex items-baseline justify-between gap-4"
          >
            <span className="text-[14px] text-ink">Activity</span>
            <span className="text-[14px] text-ink-muted">{activityLabel}</span>
          </label>
          <input
            id="tdee-activity"
            type="range"
            min={0}
            max={ACTIVITY.length - 1}
            step={1}
            value={ACTIVITY.findIndex((a) => a.key === activity)}
            onChange={(e) => setActivity(ACTIVITY[Number(e.target.value)].key)}
            className="k-slider"
          />
          <p className="text-[13px] text-ink-subtle">
            {ACTIVITY.find((a) => a.key === activity)?.detail}
          </p>
        </div>

        <fieldset>
          <legend className="text-[14px] text-ink">Goal</legend>
          <div className="mt-2 inline-flex flex-wrap rounded-md border border-line p-0.5">
            {GOALS.map((g) => (
              <button
                key={g.label}
                type="button"
                onClick={() => setGoal(g.key)}
                aria-pressed={goal === g.key}
                className={`k-seg ${
                  goal === g.key
                    ? "bg-primary font-semibold text-on-primary"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </fieldset>
      </Panel>

      <div className="space-y-8 lg:col-span-5">
        <div>
          <p className="text-[14px] text-ink-muted">Your daily target</p>
          <p className="tnum mt-2 text-[clamp(2.25rem,6vw,3.25rem)] font-semibold leading-none text-primary">
            {target.toLocaleString("en-IN")}
          </p>
          <p className="mt-2 text-[13px] text-ink-subtle">kcal · {goalNote}</p>
        </div>

        <dl className="divide-y divide-line border-y border-line">
          {[
            ["BMR at rest", `${bmr.toLocaleString("en-IN")} kcal`],
            ["Maintenance (TDEE)", `${tdee.toLocaleString("en-IN")} kcal`],
            ["Protein target", `${protein} g`],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="text-[15px] text-ink-muted">{k}</dt>
              <dd className="tnum text-[15px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="text-[13px] leading-relaxed text-ink-subtle">
          BMR uses Mifflin-St Jeor. Protein is set at 1.8 g per kg of body
          weight, mid-range for resistance training. In the app these adjust
          from your logged training volume and step count rather than a fixed
          activity multiplier.
        </p>
      </div>
    </div>
  );
}
