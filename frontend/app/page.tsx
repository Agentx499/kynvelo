import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LiveSetMatrix } from "@/components/marketing/live-set-matrix";
import { NutritionMethods } from "@/components/marketing/nutrition-methods";
import { MacroRings } from "@/components/marketing/macro-rings";
import { RecoveryBody } from "@/components/marketing/recovery-body";
import {
  StreakGrid,
  TransformationSlider,
} from "@/components/marketing/transformation-slider";
import { TdeeWidget } from "@/components/marketing/tdee-widget";
import { AthletePlans } from "@/components/marketing/athlete-plans";
import { Button } from "@/components/ui/button";
import {
  Display,
  Figure,
  Lede,
  Panel,
  Section,
  SectionHead,
  Shell,
  V,
} from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Train with precision. Fuel with science.",
  description:
    "Log every set, get the plate math right, and scan meals against USDA data instead of guessed calories. Free forever for logging. Works with or without a gym.",
  alternates: { canonical: "/" },
};

/* Athlete landing page.

   This is now a server component. v1 was "use client" end to end, which meant
   the page could not export metadata and all nine marketing pages shared one
   title and description from layout.tsx. Interactivity is isolated to
   <AthletePlans /> and <Barbell3DScene />.

   Structure: one claim per section. v1 opened with a hero, a four-across
   animated stat ticker, then five sections that each looked identical - a volt
   Badge kicker over a grid of glass cards. Nothing established rank, so
   everything read at the same volume. */
export default function AthleteHomePage() {
  return (
    <>
      <SiteHeader audience="athlete" />

      <main id="main">
        {/* ---------------------------------------------------------------
            HERO
            Asymmetric 7/5 split. No stat ticker: four animated counters
            under a headline is the hero-metric template, and the numbers
            there were unverifiable anyway.
            --------------------------------------------------------------- */}
        <Shell className="py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="space-y-8 lg:col-span-6">
              <Display as="h1" size="lg">
                Train with precision.
                <br />
                Fuel with <V>science</V>.
              </Display>

              <Lede>
                Log every set with the weight you actually lifted, get the plate
                math right under fatigue, and scan a meal against the USDA
                database instead of a number an AI guessed.
              </Lede>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link href="/signup">Start free</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/pricing">See pricing</Link>
                </Button>
              </div>

              <p className="text-[14px] text-ink-subtle">
                Free forever for logging. Works whether or not your gym uses
                Kynvelo.
              </p>
            </div>

            <div className="lg:col-span-6">
              <LiveSetMatrix />
            </div>
          </div>
        </Shell>

        {/* ---------------------------------------------------------------
            REPLACES
            The honest competitive claim, stated plainly.
            --------------------------------------------------------------- */}
        <Section size="sm">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <Display size="sm">
                One app instead of <V>three subscriptions</V>.
              </Display>
            </div>
            <div className="lg:col-span-7">
              <Lede>
                Most lifters run a workout logger, a calorie tracker and a step
                counter, and pay for two of them. Kynvelo does all three, and
                the logging half is free permanently — not a trial.
              </Lede>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------
            TRAINING
            --------------------------------------------------------------- */}
        <Section id="training">
          <SectionHead
            title={
              <>
                The barbell doesn&apos;t care
                <br />
                what you <V>meant</V> to lift.
              </>
            }
            aside={
              <Lede>
                Kynvelo pre-fills last session&apos;s numbers, tells you the
                target that beats them, and shows the exact plates for the bar
                in front of you.
              </Lede>
            }
          />

          {/* Set matrix as real product imagery, not an icon card. */}
          <Panel className="mt-14 overflow-hidden">
            <div className="flex items-baseline justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <h3 className="font-display text-lg font-semibold text-ink">
                Barbell Back Squat
              </h3>
              <span className="text-[13px] text-ink-subtle">
                Last week: 80 kg × 8
              </span>
            </div>

            <table className="w-full text-left">
              <caption className="sr-only">
                Working sets for barbell back squat, showing previous
                performance and today&apos;s logged sets
              </caption>
              <thead>
                <tr className="border-b border-line text-[12px] uppercase tracking-wider text-ink-subtle">
                  <th scope="col" className="px-5 py-2.5 font-medium sm:px-6">
                    Set
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Previous
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Weight
                  </th>
                  <th scope="col" className="px-3 py-2.5 font-medium">
                    Reps
                  </th>
                  <th scope="col" className="px-5 py-2.5 font-medium sm:px-6">
                    Plates / side
                  </th>
                </tr>
              </thead>
              <tbody className="tnum text-[15px]">
                {[
                  { set: 1, prev: "60 × 8", w: "60.0", r: 8, plates: "20", done: true },
                  { set: 2, prev: "80 × 8", w: "80.0", r: 8, plates: "25 + 5", done: true },
                  { set: 3, prev: "80 × 8", w: "82.5", r: 8, plates: "25 + 5 + 1.25", done: true, pr: true },
                  { set: 4, prev: "80 × 6", w: "82.5", r: "—", plates: "25 + 5 + 1.25", done: false },
                ].map((row) => (
                  <tr key={row.set} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="px-5 py-3.5 font-normal text-ink-subtle sm:px-6"
                    >
                      {row.set}
                    </th>
                    <td className="px-3 py-3.5 text-ink-subtle">{row.prev}</td>
                    <td className="px-3 py-3.5 text-ink">{row.w}</td>
                    <td className="px-3 py-3.5 text-ink">{row.r}</td>
                    <td className="px-5 py-3.5 sm:px-6">
                      <span className="text-ink-muted">{row.plates}</span>
                      {row.pr && (
                        <span className="ml-2.5 text-[13px] text-primary">
                          PR
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-line px-5 py-4 text-[14px] text-ink-muted sm:px-6">
              Checking a set starts the rest timer and writes the timestamp.
              Nothing to tap twice.
            </div>
          </Panel>

          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            <Figure value="400+" label="Exercises with execution cues and muscle mapping" />
            <Figure value="Brzycki" label="1RM estimation, with an RPE percentage table" />
            <Figure value="72 h" label="Recovery window used to score muscle readiness" />
          </div>
        </Section>

        {/* ---------------------------------------------------------------
            NUTRITION
            The two-stage architecture is the differentiator, so it gets an
            ordered list. Numbers here are a genuine sequence, not decorative
            section markers.
            --------------------------------------------------------------- */}
        <Section id="nutrition">
          <SectionHead
            title={
              <>
                Your calorie tracker
                <br />
                shouldn&apos;t <V>guess</V>.
              </>
            }
            lede="Ask an AI how many calories are on a plate and it will invent a confident number. Kynvelo splits the job in two so it can't."
          />

          <ol className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "The model looks",
                body: "A vision model identifies what is on the plate and estimates portions. That is all it is allowed to do — it never returns a calorie figure.",
              },
              {
                step: "02",
                title: "The database counts",
                body: "Each identified item is resolved against USDA FoodData Central. Every calorie and macro comes from that table, not from the model.",
              },
              {
                step: "03",
                title: "You correct it",
                body: "Portions are editable before saving, because the model estimating 150 g of rice when it was 220 g is the one error left to make.",
              },
            ].map((s) => (
              <li key={s.step} className="bg-canvas p-6 sm:p-7">
                <span className="tnum text-[13px] text-primary">{s.step}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>

          {/* Four logging methods. Abandonment is the real competitor — people
              stop tracking when the method doesn't fit the meal. */}
          <div className="mt-8">
            <NutritionMethods />
          </div>

          {/* The screen every calorie tracker is recognised by. */}
          <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="lg:col-span-7">
              <MacroRings />
            </div>
            <div className="space-y-4 lg:col-span-5">
              <h3 className="font-display text-2xl font-semibold text-ink">
                Always the answer to &ldquo;what&apos;s left today?&rdquo;
              </h3>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                Calories and each macro against your target, with the remainder
                stated rather than the total consumed — because the number you
                act on at 8pm is what you have left, not what you have eaten.
              </p>
              <p className="text-[14px] text-ink-subtle">
                Net carbs, fibre, sodium and potassium are tracked too, which is
                what makes keto, diabetic and low-sodium diets workable.
              </p>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------
            RECOVERY + GYM PASS
            Two unrelated capabilities, deliberately different shapes so the
            section doesn't read as another card pair.
            --------------------------------------------------------------- */}
        {/* ---------------------------------------------------------------
            RECOVERY & READINESS
            The two highest-differentiation features in the product. v1
            rendered the heatmap as three rows of text and omitted readiness
            entirely.
            --------------------------------------------------------------- */}
        <Section id="recovery">
          <SectionHead
            title={
              <>
                Know what&apos;s <V>recovered</V>
                <br />
                before you load the bar.
              </>
            }
            aside={
              <Lede>
                Every logged set feeds a per-muscle readiness score across a
                72-hour window, and a three-tap morning check-in adjusts the
                volume it recommends. Quads at 38% is the answer to whether
                today is a squat day.
              </Lede>
            }
            className="mb-14"
          />
          <RecoveryBody />
        </Section>

        {/* ---------------------------------------------------------------
            PROGRESS
            Highest-value absent feature: the transformation slider.
            --------------------------------------------------------------- */}
        <Section id="progress">
          <SectionHead
            title={
              <>
                The reason people <V>don&apos;t quit</V>
                <br />
                in month three.
              </>
            }
            lede="Strength goes up before the mirror catches up. Kynvelo keeps the evidence — dated photos, every personal record, and the streak you'd rather not break."
            className="mb-14"
          />

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <TransformationSlider />
            </div>

            <div className="space-y-10 lg:col-span-6">
              <div>
                <h3 className="font-display text-lg font-semibold text-ink">
                  Personal records, detected for you
                </h3>
                <ul className="mt-4 divide-y divide-line border-y border-line">
                  {[
                    ["Back Squat", "82.5 kg × 8", "+2.5 kg"],
                    ["Bench Press", "70.0 kg × 6", "+2.5 kg"],
                    ["Deadlift", "130.0 kg × 5", "+5.0 kg"],
                  ].map(([lift, best, delta]) => (
                    <li
                      key={lift}
                      className="flex items-baseline justify-between gap-4 py-3"
                    >
                      <span className="text-[15px] text-ink">{lift}</span>
                      <span className="tnum text-[15px] text-ink-muted">
                        {best}
                      </span>
                      <span className="tnum w-16 text-right text-[14px] text-primary">
                        {delta}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[13px] text-ink-subtle">
                  Estimated 1RM from Brzycki, with the full percentage table for
                  programme work.
                </p>
              </div>

              <StreakGrid />
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------
            BODY NUMBERS
            --------------------------------------------------------------- */}
        <Section id="numbers">
          <SectionHead
            title={
              <>
                Start from your <V>actual</V> numbers.
              </>
            }
            lede="Most apps hand you a round 2,000 kcal and let you find out it was wrong. This is the real Mifflin-St Jeor calculation — try it now, before you sign up for anything."
            className="mb-14"
          />
          <TdeeWidget />

          <div className="mt-14 grid gap-x-10 gap-y-8 border-t border-line pt-10 sm:grid-cols-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Steps and cardio
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Treadmill, elliptical, outdoor run, cycling and rowing, with
                distance, pace and energy — in the same place as your lifts.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Health sync
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Apple Health and Health Connect feed steps, active energy,
                resting heart rate and sleep in the background. Nothing to type.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Hydration
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Tap for a 250 ml glass. One less app on your phone, which is the
                entire point of the section above.
              </p>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------
            GYM PASS + MEMBER BENEFITS
            Things an athlete at a Kynvelo gym is never currently told.
            --------------------------------------------------------------- */}
        <Section id="gym-pass">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-5 lg:col-span-6">
              <Display size="sm">
                Walk in without <V>queueing</V>.
              </Display>
              <Lede>
                If your gym runs Kynvelo, your pass is a code that regenerates
                every 15 seconds, so a screenshot is worthless to anyone you
                send it to. It works offline and syncs the real timestamp when
                you reconnect.
              </Lede>
              <p className="text-[14px] text-ink-subtle">
                No gym on Kynvelo yet? Everything else works regardless.{" "}
                <Link
                  href="/business"
                  className="text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                >
                  Send them the gym-owner site
                </Link>
                .
              </p>
            </div>

            <div className="space-y-5 lg:col-span-6">
              <Display size="sm">
                And you stop <V>queueing</V> for everything else too.
              </Display>
              <ul className="divide-y divide-line border-y border-line">
                {[
                  [
                    "Renew from your phone",
                    "1, 3, 6 or 12 months over UPI. No auto-debit mandate, no surprise charge.",
                  ],
                  [
                    "Book PT and dietitian sessions",
                    "See a trainer's remaining prepaid sessions instead of arguing about the count.",
                  ],
                  [
                    "Buy supplements in-app",
                    "Live stock, so you don't walk to the counter for something that ran out.",
                  ],
                  [
                    "Download your GST invoice",
                    "Every payment, as a proper tax invoice, whenever you need it.",
                  ],
                  [
                    "Export or erase everything",
                    "One tap, under the DPDP Act. Your training and health data is never sold.",
                  ],
                ].map(([t, b]) => (
                  <li key={t} className="py-3.5">
                    <p className="text-[15px] text-ink">{t}</p>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-muted">
                      {b}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------------------
            PRICING
            --------------------------------------------------------------- */}
        <Section id="pricing">
          <SectionHead
            title={
              <>
                Logging is free. <V>Forever</V>.
              </>
            }
            lede="The paid tier exists for the AI meal scan and full history, because both cost us money to run. Everything else does not, so it isn't paywalled."
            className="mb-14"
          />
          <AthletePlans />
        </Section>

        {/* ---------------------------------------------------------------
            CROSS-AUDIENCE
            One quiet band, not a duplicate hero.
            --------------------------------------------------------------- */}
        <Section size="sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="space-y-2">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Run a gym?
              </h2>
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">
                There&apos;s a separate site for turnstile access, no-show
                recovery and GST billing.
              </p>
            </div>
            <Button asChild variant="secondary" size="lg">
              <Link href="/business">For gym owners</Link>
            </Button>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
