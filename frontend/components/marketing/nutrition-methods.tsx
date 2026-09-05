"use client";

import * as Tabs from "@radix-ui/react-tabs";

/* FEATURES.md 4.2, 4.5, 4.6, 4.7 — the four ways food actually gets logged.

   Previously the site described only the AI photo scan (4.1) and mentioned
   barcodes in a footnote. Meal-prep batch (13/15), quick-add (8/15) and
   micronutrients (10/15) had no mention at all, which matters because
   abandonment is the real competitor - people stop logging when the method
   doesn't fit the meal. */

const METHODS = [
  {
    id: "photo",
    label: "Photo",
    time: "~8 seconds",
    title: "Two-stage AI scan",
    body: "Point the camera at the plate. A vision model names the items and estimates portions; USDA FoodData Central supplies every calorie and macro. The model is never allowed to return a number.",
    rows: [
      ["2 chapati", "240 kcal", "8 g P"],
      ["Dal tadka, 1 katori", "180 kcal", "9 g P"],
      ["Chicken curry, 150 g", "290 kcal", "31 g P"],
    ],
    footer: "Edit any portion before saving.",
  },
  {
    id: "barcode",
    label: "Barcode",
    time: "~2 seconds",
    title: "Client-side decode",
    body: "The barcode is decoded on your phone and only the digits are sent. The camera feed never reaches our servers, and lookup is a single indexed key hit.",
    rows: [
      ["Amul Whey, 32 g scoop", "120 kcal", "24 g P"],
      ["EAN 8901030383847", "verified", "—"],
    ],
    footer: "Works offline for anything you have scanned before.",
  },
  {
    id: "quick",
    label: "Quick-add",
    time: "~5 seconds",
    title: "For eating out",
    body: "Restaurant meals have no reliable ingredient list. Rather than let you abandon the day, log an estimate for calories and protein and move on.",
    rows: [
      ["Dinner out — estimate", "700 kcal", "40 g P"],
    ],
    footer: "Flagged as an estimate so your weekly averages stay honest.",
  },
  {
    id: "batch",
    label: "Meal prep",
    time: "once per batch",
    title: "Cook once, log four days",
    body: "Enter the raw ingredients for the whole batch, then the number of containers. Per-container macros are divided out, so you never weigh a cooked portion again.",
    rows: [
      ["Chicken thigh, 1.2 kg", "2,640 kcal", "222 g P"],
      ["Basmati rice, 600 g dry", "2,124 kcal", "44 g P"],
      ["÷ 4 containers", "1,191 kcal", "66 g P"],
    ],
    footer: "Net carbs, fibre, sodium and potassium tracked per container.",
  },
];

export function NutritionMethods() {
  return (
    <Tabs.Root defaultValue="photo" className="rounded-lg border border-line bg-surface">
      <Tabs.List
        aria-label="Ways to log food"
        className="flex flex-wrap gap-1 border-b border-line p-2"
      >
        {METHODS.map((m) => (
          <Tabs.Trigger
            key={m.id}
            value={m.id}
            className="k-seg text-ink-muted data-[state=active]:bg-primary data-[state=active]:font-semibold data-[state=active]:text-on-primary hover:text-ink"
          >
            {m.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {METHODS.map((m) => (
        <Tabs.Content
          key={m.id}
          value={m.id}
          className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-10"
        >
          <div className="space-y-3">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-ink">
                {m.title}
              </h3>
              <span className="shrink-0 text-[13px] text-primary">{m.time}</span>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-muted">{m.body}</p>
          </div>

          <div>
            <table className="w-full text-left">
              <caption className="sr-only">{m.title} example entry</caption>
              <tbody className="tnum">
                {m.rows.map((r, i) => (
                  <tr
                    key={i}
                    className={`border-b border-line ${
                      i === m.rows.length - 1 && m.rows.length > 1
                        ? "font-semibold text-ink"
                        : ""
                    }`}
                  >
                    <td className="py-2.5 pr-3 text-[14px] text-ink-muted">
                      {r[0]}
                    </td>
                    <td className="py-2.5 pr-3 text-right text-[14px] text-ink">
                      {r[1]}
                    </td>
                    <td className="py-2.5 text-right text-[14px] text-ink-subtle">
                      {r[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 text-[13px] text-ink-subtle">{m.footer}</p>
          </div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
