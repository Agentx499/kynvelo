import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { TerminalStream } from "@/components/marketing/terminal-stream";
import { ChurnCalculator } from "@/components/marketing/churn-calculator";
import { MemberValue } from "@/components/marketing/member-value";
import { AddonRevenue } from "@/components/marketing/addon-revenue";
import { ThemePicker } from "@/components/marketing/theme-picker";
import { GST } from "@/lib/pricing";
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
  title: "Gym software that catches members before they quit",
  description:
    "Turnstile access control, a no-show red list your front desk can act on, and GST-compliant billing that collects renewals on time. For Indian gyms and fitness clubs.",
  alternates: { canonical: "/business" },
};

/* Gym-owner portal. Server component so it carries its own metadata.

   The narrative order is deliberate: the problem (silent drift), then the
   mechanism (four-step loop), then proof the owner can test (calculator), then
   the honest limits, then price. v1 opened with a hero and a four-across stat
   ticker claiming "98.4% turnstile uptime" and "₹2.4 Cr recovered renewal
   revenue" - figures no pre-launch product can support. Those are gone. */
export default function BusinessHomePage() {
  return (
    <>
      <SiteHeader audience="gym" />

      <main id="main">
        {/* --- HERO --- */}
        <Shell className="py-16 sm:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
            <div className="space-y-8 lg:col-span-6">
              <Display as="h1" size="lg">
                Members don&apos;t quit on
                <br />
                renewal day. They quit
                <br />
                <V>two weeks earlier</V>.
              </Display>

              <Lede>
                By the time a renewal lapses, the decision was made a fortnight
                ago and nobody noticed. Kynvelo watches attendance, flags the
                drift, and puts the member in front of your front desk while
                there is still something to save.
              </Lede>

              <div className="flex flex-wrap gap-3">
                <Button asChild variant="primary" size="lg">
                  <Link href="/business/signup">Start a trial</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/roi-calculator">Run the numbers</Link>
                </Button>
              </div>

              <p className="text-[14px] text-ink-subtle">
                Works with the turnstiles you already own. No hardware lock-in.
              </p>
            </div>

            <div className="lg:col-span-6">
              <TerminalStream />
            </div>
          </div>
        </Shell>

        {/* --- THE LOOP ---
            A genuine four-step sequence, so numbering carries information
            rather than acting as section scaffolding. */}
        <Section id="how">
          <SectionHead
            title={
              <>
                One loop, running
                <br />
                whether you&apos;re <V>watching</V> or not.
              </>
            }
            aside={
              <Lede>
                Each step hands off to the next automatically. The only manual
                action is the phone call — and Kynvelo tells you exactly who to
                ring.
              </Lede>
            }
          />

          <ol className="mt-14 divide-y divide-line border-y border-line">
            {[
              {
                n: "01",
                t: "Attendance is recorded",
                b: "A rotating 15-second code at the turnstile, or the front desk logging an assisted entry with a mandatory reason. Either way there is a timestamp and an audit trail.",
              },
              {
                n: "02",
                t: "Drift is detected",
                b: "Ten consecutive absent days moves an active member onto the red list, sorted into 10–14, 15–21 and 22+ day tiers. Paused, frozen and cancelled memberships are excluded so the list stays actionable.",
              },
              {
                n: "03",
                t: "Someone actually calls",
                b: "One tap opens WhatsApp with the message pre-filled, or the dialer. Logging the outcome is mandatory, and opening a case locks it for 30 minutes so two staff never call the same member.",
              },
              {
                n: "04",
                t: "The renewal collects itself",
                b: "Reminders at 14, 7 and 3 days before expiry, on the day, and 3 days after. The member renews on their own phone over UPI. Membership extends only after the gateway confirms — never on a frontend callback.",
              },
            ].map((s) => (
              <li key={s.n} className="grid gap-3 py-7 sm:grid-cols-12 sm:gap-8">
                <div className="sm:col-span-3">
                  <span className="tnum text-[13px] text-primary">{s.n}</span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink">
                    {s.t}
                  </h3>
                </div>
                <p className="text-[15px] leading-relaxed text-ink-muted sm:col-span-9">
                  {s.b}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        {/* --- RED LIST as product imagery --- */}
        <Section>
          <SectionHead
            title={
              <>
                The list your front desk
                <br />
                opens <V>every morning</V>.
              </>
            }
            lede="Not a chart. A queue of names, with the phone number and the reason they're on it."
          />

          <Panel className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <caption className="sr-only">
                No-show red list showing members by days absent, assigned
                trainer and last contact outcome
              </caption>
              <thead>
                <tr className="border-b border-line text-[12px] uppercase tracking-wider text-ink-subtle">
                  {["Member", "Absent", "Plan expires", "Trainer", "Last outcome"].map(
                    (h) => (
                      <th key={h} scope="col" className="px-5 py-3 font-medium">
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {[
                  { n: "Rahul Mehta", d: 12, tone: "text-warning", e: "18 Sep", t: "Priya", o: "Travelling — call 20 Sep" },
                  { n: "Anjali Rao", d: 16, tone: "text-warning", e: "02 Oct", t: "Vikram", o: "No answer" },
                  { n: "Imran Shaikh", d: 24, tone: "text-danger", e: "29 Sep", t: "Priya", o: "Timing issue — offered 6am slot" },
                  { n: "Neha Kulkarni", d: 27, tone: "text-danger", e: "11 Sep", t: "—", o: "Not yet contacted" },
                ].map((r) => (
                  <tr key={r.n} className="border-b border-line last:border-0">
                    <th scope="row" className="px-5 py-4 font-normal text-ink">
                      {r.n}
                    </th>
                    <td className={`tnum px-5 py-4 ${r.tone}`}>{r.d} days</td>
                    <td className="px-5 py-4 text-ink-muted">{r.e}</td>
                    <td className="px-5 py-4 text-ink-muted">{r.t}</td>
                    <td className="px-5 py-4 text-ink-muted">{r.o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <div className="mt-14 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            <Figure value="3 tiers" label="10–14, 15–21 and 22+ days absent, filtered separately" />
            <Figure value="30 min" label="Case lock, so two staff never call the same member" />
            <Figure value="7 outcomes" label="Mandatory outcome logging, with an auto-scheduled follow-up" />
          </div>
        </Section>

        {/* --- CALCULATOR --- */}
        <Section id="calculator">
          <SectionHead
            title={
              <>
                Put your own numbers in.
                <br />
                We&apos;ll show the <V>arithmetic</V>.
              </>
            }
            lede="Every input is yours to set, including the recovery rate. We'd rather you argue with the model than trust a number we invented."
            className="mb-14"
          />
          <ChurnCalculator />
        </Section>

        {/* --- MEMBER VALUE ---
            Placed immediately after the calculator: the owner has just accepted
            the ROI premise and is primed for what else is in the box. This is
            the argument for Growth over Starter and v1 omitted it completely. */}
        <Section id="members">
          <SectionHead
            title={
              <>
                You&apos;re not just buying a CRM.
                <br />
                Your members get the <V>whole app</V>.
              </>
            }
            lede="Retention software that only helps you chase people is half a product. The other half is giving them a reason to come back on their own."
            className="mb-14"
          />
          <MemberValue />
        </Section>

        {/* --- ADD-ON REVENUE --- */}
        <Section id="revenue">
          <SectionHead
            title={
              <>
                Revenue above the <V>floor fee</V>.
              </>
            }
            lede="Personal training, dietitian consults and supplements, sold in the app instead of on a whiteboard. Set your own attach rates below — we won't quote you an industry average we can't substantiate."
            className="mb-14"
          />
          <AddonRevenue />

          <div className="mt-14 grid gap-10 border-t border-line pt-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h3 className="font-display text-xl font-semibold text-ink">
                Trainers stop arguing about session counts
              </h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {[
                  ["Rahul Mehta", "8 of 12", "text-ink"],
                  ["Anjali Rao", "3 of 12", "text-warning"],
                  ["Imran Shaikh", "11 of 12", "text-ink"],
                ].map(([name, left, tone]) => (
                  <li
                    key={name}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-[15px] text-ink">{name}</span>
                    <span className={`tnum text-[15px] ${tone}`}>
                      {left} sessions left
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-ink-subtle">
                The trainer logs a session; the member gets the confirmation
                instantly. Both sides see the same number.
              </p>
            </div>

            <div>
              <h3 className="font-display text-xl font-semibold text-ink">
                Stock can&apos;t walk out unrecorded
              </h3>
              <ul className="mt-4 divide-y divide-line border-y border-line">
                {[
                  ["Whey Isolate 2 kg", "3 tubs", "text-warning"],
                  ["Creatine 250 g", "14 tubs", "text-ink-muted"],
                  ["Pre-workout 300 g", "0 tubs", "text-danger"],
                ].map(([sku, qty, tone]) => (
                  <li
                    key={sku}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="text-[15px] text-ink">{sku}</span>
                    <span className={`tnum text-[15px] ${tone}`}>{qty}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-ink-subtle">
                Inventory deducts on every in-app and counter sale. Overselling
                is blocked, and you get an alert below your threshold.
              </p>
            </div>
          </div>
        </Section>

        {/* --- WHITE-LABEL --- */}
        <Section id="branding">
          <SectionHead
            title={
              <>
                Their app says <V>your name</V>.
              </>
            }
            className="mb-14"
          />
          <ThemePicker />
        </Section>

        {/* --- BILLING --- */}
        <Section>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-5 lg:col-span-6">
              <Display size="sm">
                Billing that survives your <V>accountant</V>.
              </Display>
              <Lede>
                CGST and SGST split automatically under SAC {GST.sac}, sequential
                invoice numbering, and your GSTIN on every document. Cash and
                card taken at the desk get reconciled into the same ledger, with
                a receipt sent to the member so the payment cannot quietly go
                missing.
              </Lede>

              {/* Invoice mock. Makes the CA-hours claim concrete without a
                  statistic. Figures reconcile: 22000 + 18% = 25960. */}
              <Panel className="overflow-hidden">
                <div className="flex items-baseline justify-between border-b border-line px-4 py-3">
                  <span className="font-display text-[15px] font-semibold text-ink">
                    Tax Invoice
                  </span>
                  <span className="tnum text-[13px] text-ink-subtle">
                    KYN/24-25/00418
                  </span>
                </div>
                <dl className="divide-y divide-line text-[14px]">
                  {[
                    ["12-month membership", "₹22,000"],
                    [`CGST @ ${GST.cgst * 100}%`, "₹1,980"],
                    [`SGST @ ${GST.sgst * 100}%`, "₹1,980"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
                      <dt className="text-ink-muted">{k}</dt>
                      <dd className="tnum text-ink">{v}</dd>
                    </div>
                  ))}
                  <div className="flex justify-between gap-4 bg-surface px-4 py-3">
                    <dt className="font-semibold text-ink">Total</dt>
                    <dd className="tnum font-semibold text-ink">₹25,960</dd>
                  </div>
                </dl>
                <p className="border-t border-line px-4 py-2.5 text-[12px] text-ink-subtle">
                  SAC {GST.sac} · Fitness centre services
                </p>
              </Panel>
            </div>

            <div className="space-y-5 lg:col-span-6">
              <Display size="sm">
                What Kynvelo <V>cannot</V> do.
              </Display>
              <ul className="space-y-3 text-[15px] leading-relaxed text-ink-muted">
                <li>
                  Software cannot retain a member on its own. Equipment,
                  cleanliness, coaching and staff attitude are yours.
                </li>
                <li>
                  Revenue outcomes depend on your team actually making the
                  calls.
                </li>
                <li>
                  WhatsApp, SMS and payment gateway fees are third-party costs
                  passed straight through.
                </li>
                <li>
                  We do not sell lifetime licences. A one-time fee cannot fund
                  ongoing hosting and support.
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* --- TRUST & AUDIT ---
            Small section, high credibility. Feature 9.3 appeared nowhere on the
            site before this. */}
        <Section id="trust">
          <SectionHead
            title={
              <>
                Every override leaves a <V>name</V> on it.
              </>
            }
            lede="Free entry for a friend is the oldest leak at a front desk. Kynvelo does not prevent it — it makes it attributable, which turns out to be enough."
            className="mb-12"
          />

          <Panel className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <caption className="sr-only">
                Assisted entry audit log showing staff member and mandatory
                reason
              </caption>
              <thead>
                <tr className="border-b border-line text-[12px] uppercase tracking-wider text-ink-subtle">
                  {["Time", "Member", "Method", "Staff", "Reason"].map((h) => (
                    <th key={h} scope="col" className="px-5 py-3 font-medium">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[15px]">
                {[
                  ["06:41", "Rahul Mehta", "QR", "—", "—"],
                  ["07:12", "Neha Kulkarni", "Assisted", "Priya", "Forgot phone"],
                  ["07:48", "Imran Shaikh", "Denied", "—", "Membership expired"],
                  ["08:03", "Vikram Desai", "Assisted", "Arun", "Phone battery dead"],
                ].map((r) => (
                  <tr key={r[0]} className="border-b border-line last:border-0">
                    <td className="tnum px-5 py-3.5 text-ink-subtle">{r[0]}</td>
                    <th scope="row" className="px-5 py-3.5 text-left font-normal text-ink">
                      {r[1]}
                    </th>
                    <td
                      className={`px-5 py-3.5 ${
                        r[2] === "Denied" ? "text-danger" : "text-ink-muted"
                      }`}
                    >
                      {r[2]}
                    </td>
                    <td className="px-5 py-3.5 text-ink-muted">{r[3]}</td>
                    <td className="px-5 py-3.5 text-ink-muted">{r[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Panel>

          <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                The gym next door can&apos;t see your members
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Tenant scoping is enforced in the database layer, not in each
                screen, so a missing filter in new code cannot leak another
                gym&apos;s roster.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Your ledger asks again
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Opening billing or changing staff permissions triggers a
                fingerprint or PIN check. Front-desk tablets get left unlocked;
                this is the answer to that.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-ink">
                Nothing financial is ever deleted
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">
                Transactions, attendance corrections and contact history are
                archived with the acting user and timestamp, never removed. Any
                dispute stays resolvable.
              </p>
            </div>
          </div>
        </Section>

        {/* --- CTA --- */}
        <Section size="sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <Display size="sm">
                Start with <V>one gate</V>.
              </Display>
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">
                Set up your plans, import your member list and put a code on the
                door. Fourteen days, no card.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/business/signup">Start a trial</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/enterprise">Hardware specs</Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* --- CROSS-LINKS ---
            /partners previously had exactly one inbound link site-wide, in the
            footer. It is also the reciprocal of the athlete page's "Run a gym?"
            band, which /business had no equivalent of. */}
        <Section size="sm">
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Not a gym owner?
              </h2>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                If you train, the athlete app is free forever for logging.
              </p>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center text-[15px] text-ink underline decoration-line underline-offset-4 transition-colors hover:text-primary"
              >
                For athletes
              </Link>
            </div>

            <div className="space-y-3">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Work with gyms already?
              </h2>
              <p className="text-[15px] leading-relaxed text-ink-muted">
                Trainers, equipment dealers and consultants earn 20% of the base
                plan fee for six months on every gym they bring us.
              </p>
              <Link
                href="/partners"
                className="inline-flex min-h-11 items-center text-[15px] text-ink underline decoration-line underline-offset-4 transition-colors hover:text-primary"
              >
                Partner programme
              </Link>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
