import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { PricingTables } from "@/components/marketing/pricing-tables";
import { Faq } from "@/components/marketing/faq";
import { Display, Lede, Section, Shell, V } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Athlete plans from free to ₹299/month. Gym plans from ₹2,999/month for up to 100 members, with ₹1,499 and ₹2,799 capacity blocks. All prices exclude 18% GST.",
  alternates: { canonical: "/pricing" },
};

const FAQ_ITEMS = [
  {
    q: "Do I have to buy new turnstiles?",
    a: (
      <>
        No. Kynvelo drives existing turnstiles over a standard dry-contact relay,
        which is what ZKTeco, Hikvision, eSSL and Dormakaba units already expose.
        If your gate opens on a 300 ms contact closure, it will work.{" "}
        <Link
          href="/enterprise"
          className="text-ink underline decoration-line underline-offset-4 hover:text-primary"
        >
          Full hardware notes
        </Link>
        .
      </>
    ),
  },
  {
    q: "Is GST included in these prices?",
    a: "No. Gym plans are subject to 18% GST — 9% CGST plus 9% SGST — under SAC 999723 for fitness centre services. Tax invoices are generated automatically so you can claim input credit.",
  },
  {
    q: "What is the setup fee for?",
    a: "A one-time ₹5,000–₹15,000 charge covering white-label branding setup, staff training and migrating your existing member records. It is waived if you prepay annually. The range depends on how much member data needs cleaning before import.",
  },
  {
    q: "What happens if we go over our member limit?",
    a: "Nothing breaks. Gates keep opening and reception keeps working. You add a capacity block — ₹1,499 for 50 members or ₹2,799 for 100 — and billing prorates from that point.",
  },
  {
    q: "Do you sell a lifetime licence?",
    a: "No, and we won't. Hosting, payment gateway integration and support are ongoing costs; a one-time fee cannot fund them. Any vendor offering a fitness SaaS lifetime deal is either subsidising you with new sales or planning to stop maintaining it.",
  },
  {
    q: "Is the athlete app genuinely free?",
    a: "Yes. Workout logging, the plate calculator, personal records and 1RM estimates are free permanently, with no ads and no selling of your training or health data. The paid tiers exist because the AI meal scan and unlimited history cost us money per user.",
  },
  {
    q: "Can members use the app if their gym isn't on Kynvelo?",
    a: "Yes. Athletes sign up directly and everything except the gym check-in pass works normally. If the gym joins later, the account links to it without losing history.",
  },
];

export default function PricingPage() {
  return (
    <>
      <SiteHeader audience="neutral" />

      <main id="main">
        <Shell className="py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <Display as="h1" size="lg">
              Priced so the <V>maths works</V> at 80 members.
            </Display>
            <Lede>
              Recovering three or four members a month covers the software
              several times over. Every number below is the real number — GST and
              the setup fee are stated, not buried.
            </Lede>
          </div>
        </Shell>

        <Section rule={false} size="sm" className="!pt-0">
          <PricingTables />
        </Section>

        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Display size="sm">
                The awkward <V>questions</V>.
              </Display>
            </div>
            <div className="lg:col-span-8">
              <Faq items={FAQ_ITEMS} />
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
