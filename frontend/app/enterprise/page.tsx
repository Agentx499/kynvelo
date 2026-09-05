import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Faq } from "@/components/marketing/faq";
import { Button } from "@/components/ui/button";
import {
  Display,
  Lede,
  Panel,
  Section,
  SectionHead,
  Shell,
  V,
} from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Hardware & white-label",
  description:
    "Kynvelo drives existing turnstiles over standard dry-contact relays — ZKTeco, Hikvision, eSSL, Dormakaba. Multi-location rollups, SSO and your own App Store listing.",
  alternates: { canonical: "/enterprise" },
};

/* v1 built this from two "pillar" cards, one of which used
   bg-purple-500/15 + text-purple-400 for the white-label section - a direct
   violation of the purple ban in RULES.md 8.2 and DESIGN.md 7.1. The whole
   page is rebuilt on the volt-and-neutral system.

   The compatibility matrix is the most useful thing here for a gym owner
   evaluating us, so it leads rather than sitting below two feature cards. */

const GATES = [
  {
    type: "Tripod turnstile",
    signal: "Dry contact, 300 ms pulse",
    verdict: "Supported",
    note: "The common case in Indian gyms. Works with any unit exposing a normally-open relay input.",
  },
  {
    type: "Flap barrier",
    signal: "Dry contact, 300 ms pulse",
    verdict: "Supported",
    note: "Bidirectional units need one relay per direction.",
  },
  {
    type: "Speed gate / optical",
    signal: "Dry contact or TCP/IP",
    verdict: "Supported",
    note: "Controller-dependent. Send us the model number and we will confirm before you commit.",
  },
  {
    type: "USB barcode scanner",
    signal: "HID keyboard emulation",
    verdict: "Supported",
    note: "No relay needed. The scanner types the code into the reception terminal.",
  },
  {
    type: "Proprietary cloud-locked controller",
    signal: "Vendor API only",
    verdict: "Case by case",
    note: "If the vendor does not expose a local relay or documented API, we cannot drive it. We will tell you this before you buy, not after.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Do we have to replace our existing turnstiles?",
    a: "Almost certainly not. Kynvelo drives the gate the same way the existing access panel does — by closing a relay contact for about 300 ms. If your gate opens on a dry contact, it will work regardless of who made it.",
  },
  {
    q: "What happens to the gates if the internet drops?",
    a: "The reception terminal holds an encrypted local allowlist and keeps admitting valid members. Attendance is queued and syncs with the real timestamps when the connection returns, so the audit trail reflects when people actually walked in.",
  },
  {
    q: "Who wires it up?",
    a: "Your existing electrician or AMC vendor, in most cases — it is two wires onto a relay terminal. We provide the wiring diagram and stay on a call during commissioning. We do not send technicians to site.",
  },
  {
    q: "What does a dedicated App Store listing involve?",
    a: "Enterprise gets a separate build published under your own developer account, with your name, icon and push certificates. You own the listing. It requires an Apple Developer and Google Play account in your business name, which we help you set up but cannot own on your behalf.",
  },
  {
    q: "Can we run multiple locations under one account?",
    a: "Yes, on Enterprise. Each location is a separate tenant for data isolation, with a rollup view across all of them for owners and a per-location view for site managers.",
  },
  {
    q: "Do you support SSO?",
    a: "On Enterprise, via SAML or OIDC against your existing identity provider. Staff accounts are provisioned and de-provisioned from your directory, which matters when front-desk turnover is high.",
  },
];

export default function EnterprisePage() {
  return (
    <>
      <SiteHeader audience="gym" />

      <main id="main">
        <Shell className="py-16 sm:py-24">
          <div className="max-w-3xl space-y-6">
            <Display as="h1" size="lg">
              We drive the gates
              <br />
              you <V>already own</V>.
            </Display>
            <Lede>
              Access control vendors sell you hardware and then rent you the
              software that talks to it. Kynvelo does the opposite — it speaks the
              signal your existing turnstile already understands, so switching
              costs you two wires and an afternoon.
            </Lede>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild variant="primary" size="lg">
                <Link href="/business/signup">Start a trial</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#compatibility">Check your hardware</Link>
              </Button>
            </div>
          </div>
        </Shell>

        {/* --- Compatibility matrix leads --- */}
        <Section id="compatibility">
          <SectionHead
            title={
              <>
                What we can and
                <br />
                <V>cannot</V> drive.
              </>
            }
            lede="Including the case where the answer is no, because finding that out after you have signed is worse for both of us."
            className="mb-12"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <caption className="sr-only">
                Turnstile and scanner hardware compatibility
              </caption>
              <thead>
                <tr className="border-b border-line-strong">
                  {["Hardware", "Signal", "Status", "Notes"].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="py-4 pr-6 text-[14px] font-medium text-ink-subtle"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {GATES.map((g) => (
                  <tr key={g.type} className="border-b border-line align-top">
                    <th
                      scope="row"
                      className="py-4 pr-6 text-left text-[15px] font-normal text-ink"
                    >
                      {g.type}
                    </th>
                    <td className="py-4 pr-6 text-[14px] text-ink-muted">
                      {g.signal}
                    </td>
                    <td
                      className={`py-4 pr-6 text-[14px] ${
                        g.verdict === "Supported" ? "text-primary" : "text-warning"
                      }`}
                    >
                      {g.verdict}
                    </td>
                    <td className="max-w-sm py-4 text-[14px] leading-relaxed text-ink-muted">
                      {g.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[13px] text-ink-subtle">
            Brand names are listed for compatibility reference only and imply no
            affiliation or endorsement.
          </p>
        </Section>

        {/* --- Wiring, described rather than diagrammed --- */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="space-y-5 lg:col-span-5">
              <Display size="sm">
                The whole integration, in <V>four wires</V>.
              </Display>
              <Lede>
                A small relay controller sits on your local network next to the
                gate. It holds the member allowlist, so it keeps working when the
                internet does not.
              </Lede>
            </div>

            <Panel className="lg:col-span-7">
              <ol className="divide-y divide-line">
                {[
                  ["Power", "12V DC to the relay controller. Same supply the access panel uses."],
                  ["Network", "Ethernet or Wi-Fi to your gym's LAN. Outbound HTTPS only — no inbound port forwarding, no static IP."],
                  ["Relay out", "Two wires from the controller's normally-open contact to the turnstile's entry input."],
                  ["Scanner in", "USB from the QR scanner to the reception terminal, or the terminal's own camera."],
                ].map(([label, body]) => (
                  <li key={label} className="grid gap-1.5 p-6 sm:grid-cols-4 sm:gap-6">
                    <span className="font-display text-[17px] font-semibold text-ink">
                      {label}
                    </span>
                    <span className="text-[15px] leading-relaxed text-ink-muted sm:col-span-3">
                      {body}
                    </span>
                  </li>
                ))}
              </ol>
            </Panel>
          </div>
        </Section>

        {/* --- White-label. Volt and neutral only; the purple is gone. --- */}
        <Section>
          <SectionHead
            title={
              <>
                Your name on it,
                <br />
                not <V>ours</V>.
              </>
            }
            aside={
              <Lede>
                Every tier above Starter re-themes the member app to your brand at
                runtime. Enterprise goes further and ships it under your own
                App Store and Play listing.
              </Lede>
            }
          />

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {[
              {
                t: "Growth",
                h: "Runtime re-theming",
                b: "Your logo, display name and brand colour injected as CSS variables when a member signs in. One shared app bundle, so there is nothing to rebuild or resubmit when you change your colour.",
              },
              {
                t: "Enterprise",
                h: "Dedicated listing",
                b: "A separate binary under your developer account with your own bundle identifier, icon and push certificates. Members search your gym's name and find your app.",
              },
              {
                t: "Enterprise",
                h: "Multi-location rollup",
                b: "Each site stays an isolated tenant so staff only see their own members, with an owner-level view aggregating attendance, revenue and red-list load across all of them.",
              },
            ].map((c) => (
              <div key={c.h} className="bg-canvas p-6 sm:p-7">
                <span className="text-[13px] text-primary">{c.t}</span>
                <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                  {c.h}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-muted">
                  {c.b}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* --- FAQ --- */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Display size="sm">
                Before you <V>commit</V>.
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
                Send us your <V>gate model</V>.
              </Display>
              <p className="max-w-xl text-[15px] leading-relaxed text-ink-muted">
                We will confirm compatibility in writing before you pay anything.
                If we cannot drive your hardware, we will say so.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary" size="lg">
                <Link href="/business/signup">Start a trial</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/pricing">See pricing</Link>
              </Button>
            </div>
          </div>
        </Section>
      </main>

      <SiteFooter />
    </>
  );
}
