import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import {
  ChurnCalculator,
  CHURN_MODEL,
} from "@/components/marketing/churn-calculator";
import { Button } from "@/components/ui/button";
import { Display, Lede, Section, SectionHead, Shell, V } from "@/components/ui/section";
import { formatCurrencyCompact } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Member churn calculator",
  description:
    "Work out what silent member drop-off costs your gym each year, and what recovering a share of it is worth. Every assumption is yours to set.",
  alternates: { canonical: "/roi-calculator" },
};

/* Sensitivity matrix computed at build time from the same constants the
   interactive calculator uses, so the table and the widget cannot disagree. */
const MEMBER_STEPS = [100, 200, 300, 500, 800];
const FEE_STEPS = [800, 1200, 1800, 2500];

function recovered(members: number, fee: number) {
  return (
    members *
    CHURN_MODEL.lapseRate *
    CHURN_MODEL.recoveryRate *
    fee *
    CHURN_MODEL.monthsCredited *
    12
  );
}

export default function RoiCalculatorPage() {
  return (
    <>
      <SiteHeader audience="gym" />

      <main id="main">
        <Shell className="py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <Display as="h1" size="lg">
              What does <V>silence</V> cost you?
            </Display>
            <Lede>
              A member who stops showing up rarely tells you. They just don&apos;t
              renew, three weeks later, and the revenue leaves without a
              conversation. This works out roughly what that is worth annually —
              and what catching some of it back would be.
            </Lede>
          </div>
        </Shell>

        <Section rule={false} className="!pt-0">
          <ChurnCalculator />
        </Section>

        {/* --- Sensitivity matrix --- */}
        <Section>
          <SectionHead
            title={
              <>
                The same model, across
                <br />
                every <V>gym size</V>.
              </>
            }
            lede="Annual revenue recovered, assuming 4% of members drift each month and you win back 35% of them after an early call."
            className="mb-12"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <caption className="sr-only">
                Annual recovered revenue by active member count and average
                monthly fee
              </caption>
              <thead>
                <tr className="border-b border-line-strong">
                  <th scope="col" className="py-4 pr-4 text-[14px] font-medium text-ink-subtle">
                    Members ↓ / Fee →
                  </th>
                  {FEE_STEPS.map((f) => (
                    <th
                      key={f}
                      scope="col"
                      className="tnum px-3 py-4 text-right text-[15px] font-semibold text-ink"
                    >
                      ₹{f.toLocaleString("en-IN")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MEMBER_STEPS.map((m) => (
                  <tr key={m} className="border-b border-line">
                    <th
                      scope="row"
                      className="tnum py-3.5 pr-4 text-left text-[15px] font-normal text-ink-muted"
                    >
                      {m.toLocaleString("en-IN")}
                    </th>
                    {FEE_STEPS.map((f) => (
                      <td
                        key={f}
                        className="tnum px-3 py-3.5 text-right text-[15px] text-ink"
                      >
                        {formatCurrencyCompact(recovered(m, f))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-ink-subtle">
            Figures exclude 18% GST, add-on revenue and the cost of your
            staff&apos;s time making the calls. A recovered member is credited
            with six months of fees, being the average remainder of a
            twelve-month cycle.
          </p>
        </Section>

        {/* --- Why early contact --- */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Display size="sm">
                Why <V>day ten</V>, not day thirty.
              </Display>
            </div>
            <div className="space-y-5 lg:col-span-7">
              <Lede>
                A member who has missed ten days still considers themselves a
                member. One who has missed thirty has already mentally left, and
                the call becomes a sales pitch instead of a check-in. The
                difference is not the software — it is whether anyone noticed in
                time.
              </Lede>
              <p className="prose-measure text-[15px] leading-relaxed text-ink-muted">
                We deliberately do not quote a recovery-rate statistic here.
                We&apos;re pre-launch and have no cohort data of our own, and the
                figures circulating in fitness-industry marketing are not
                traceable to a published study. Set the rate in the calculator to
                whatever your own follow-up history supports.
              </p>
            </div>
          </div>
        </Section>

        <Section size="sm">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="space-y-3">
              <Display size="sm">
                Test it against your <V>own</V> member list.
              </Display>
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">
                Import your members, and the red list will tell you within a day
                how many are already drifting.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/business/signup">Start a trial</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/business">How it works</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
