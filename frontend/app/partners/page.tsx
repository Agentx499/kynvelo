import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PartnerCalculator } from "@/components/marketing/partner-calculator";
import { Faq } from "@/components/marketing/faq";
import { Button } from "@/components/ui/button";
import {
  Display,
  Lede,
  Section,
  SectionHead,
  Shell,
  V,
} from "@/components/ui/section";
import { COMMISSION } from "@/lib/pricing";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Partner programme",
  description:
    "Earn 20% of base plan fees for six months on every gym you bring to Kynvelo, capped at ₹10,000 per gym. For trainers, equipment dealers and fitness consultants.",
  alternates: { canonical: "/partners" },
};

/* Terms rendered from lib/pricing.ts so the hero copy, the stat row, the
   calculator and the FAQ cannot state different numbers. */
const TERMS: [string, string][] = [
  [`${COMMISSION.rate * 100}%`, "of the gym's base plan fee"],
  [`${COMMISSION.months} months`, "for how long it's paid"],
  [formatCurrency(COMMISSION.capPerGym), "maximum total per referred gym"],
  [formatCurrency(COMMISSION.minPayout), "minimum payout threshold"],
];

const FAQ_ITEMS = [
  {
    q: "When do I get paid?",
    a: "Monthly, in arrears, once the referred gym's payment for that month has cleared. If they miss a month, that month's commission is not paid — we don't pay out on revenue we haven't collected.",
  },
  {
    q: "How is a referral attributed to me?",
    a: "Your six-character code, entered at signup. If a gym forgets, they can add it themselves within seven days of creating the account. After that window the referral cannot be claimed retroactively, which keeps disputes out of it.",
  },
  {
    q: "What if two partners refer the same gym?",
    a: "The code actually entered at signup wins. There is no split attribution and no last-touch override.",
  },
  {
    q: "Can I refer my own gym?",
    a: "No. Self-referrals and referrals to businesses you own or hold a stake in don't qualify. The programme is for bringing in gyms that would not otherwise have found us.",
  },
  {
    q: "Is there a minimum payout?",
    a: "₹1,000. Balances below that roll into the following month until they clear the threshold, which keeps bank transfer fees from eating the payment.",
  },
  {
    q: "Why does commission stop after six months?",
    a: "Because after six months the gym is our customer to retain, not yours to have introduced. Paying indefinitely on a one-time introduction would come out of the support and hosting the gym is paying for.",
  },
];

export default function PartnersPage() {
  return (
    <>
      <SiteHeader audience="gym" />

      <main id="main">
        <Shell className="py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <Display as="h1" size="lg">
              You already know which
              <br />
              gyms are <V>run badly</V>.
            </Display>
            <Lede>
              Trainers, equipment dealers and consultants walk through a dozen
              facilities a month and can see exactly which ones are losing members
              they never notice. Introduce them, and take 20% of what they pay for
              the first six months.
            </Lede>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="primary" size="lg">
                <Link href="/signup?role=partner">Apply to join</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/business">See what you&apos;d be selling</Link>
              </Button>
            </div>
          </div>
        </Shell>

        {/* --- Terms up front, not buried --- */}
        <Section size="sm">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-4">
              <Display size="sm">
                The terms, <V>plainly</V>.
              </Display>
            </div>
            <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:col-span-8">
              {TERMS.map(([v, k]) => (
                <div key={k}>
                  <dt className="sr-only">{k}</dt>
                  <dd className="tnum text-[clamp(1.75rem,3.5vw,2.25rem)] font-semibold leading-none text-ink">
                    {v}
                  </dd>
                  <p className="mt-1.5 text-[14px] text-ink-subtle">{k}</p>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        {/* --- Calculator --- */}
        <Section>
          <SectionHead
            title={
              <>
                What that&apos;s actually
                <br />
                <V>worth</V> to you.
              </>
            }
            lede="Commission is a share of a real subscription, so it is bounded. Anyone promising unbounded recurring revenue on a one-time introduction is quoting a number they will later withdraw."
            className="mb-14"
          />
          <PartnerCalculator />
        </Section>

        {/* --- How it works --- */}
        <Section>
          <SectionHead
            title={
              <>
                Four steps, no <V>sales training</V>.
              </>
            }
          />

          <ol className="mt-14 divide-y divide-line border-y border-line">
            {[
              {
                n: "01",
                t: "Apply",
                b: "Tell us who you are and which gyms you work with. We approve partners manually — this is not an open affiliate link farm, because low-quality referrals cost the gyms more than they cost us.",
              },
              {
                n: "02",
                t: "Get your code",
                b: "A six-character code tied to your account, plus a dashboard showing which referred gyms are active and what you're owed.",
              },
              {
                n: "03",
                t: "Introduce the gym",
                b: "Send them the churn calculator. It does the arguing for you — a gym owner who plugs in their own member count usually reaches the conclusion unaided.",
              },
              {
                n: "04",
                t: "Get paid monthly",
                b: "Once they convert and their payment clears, commission accrues each month for six months. Payouts go out monthly above the ₹1,000 threshold.",
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

        {/* --- FAQ --- */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Display size="sm">
                Payout <V>questions</V>.
              </Display>
            </div>
            <div className="lg:col-span-8">
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </Section>

        <Section size="sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <Display size="sm">
                Know a gym that&apos;s <V>leaking</V>?
              </Display>
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">
                Applications are reviewed manually, usually within two working
                days.
              </p>
            </div>
            <Button asChild variant="primary" size="lg">
              <Link href="/signup?role=partner">Apply to join</Link>
            </Button>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
