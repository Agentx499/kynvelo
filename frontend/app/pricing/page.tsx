"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight, Sparkles, Building2, Dumbbell, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type AudienceMode } from "@/components/blocks/audience-toggle";
import { formatCurrency } from "@/lib/utils";

export default function PricingPage() {
  const [mode, setMode] = useState<AudienceMode>("owner");
  const [annual, setAnnual] = useState(true);
  const [overageBlocks, setOverageBlocks] = useState(1); // 1 = +50 members

  const athleteTiers = [
    {
      name: "Athlete Free",
      price: 0,
      period: "forever",
      desc: "For lifters who want serious workout and nutrition logging without artificial paywalls.",
      features: [
        "Unlimited Custom Workout Routines",
        "Barbell Set Matrix with 1RM & RPE Tables",
        "Olympic Barbell Plate Sleeve Calculator",
        "Two-Stage AI Nutrition & Barcode Camera Scan",
        "Concentric SVG Macro Progress Rings",
        "Streak Engine & Personal Record Trophies",
      ],
      cta: "Start Free Forever",
      popular: false,
    },
    {
      name: "Athlete Pro",
      price: annual ? 79 : 99,
      period: "per month",
      desc: "For competitive athletes and fitness coaches wanting deep systemic recovery telemetry.",
      features: [
        "Everything in Athlete Free",
        "72-Hour Muscle Recovery Heatmap",
        "Apple Health & Google Health Connect Sync",
        "Morning Readiness Survey & Load Adjuster",
        "Transformation Photo Comparison Slider",
        "CSV & JSON Raw Data Export",
      ],
      cta: "Upgrade to Pro",
      popular: true,
    },
  ];

  const gymTiers = [
    {
      name: "Starter Facility",
      price: annual ? 2499 : 2999,
      period: "per month",
      desc: "For single-location fitness studios and powerlifting gyms up to 150 active members.",
      features: [
        "Up to 150 Active Members Included",
        "1 Turnstile Gateway Relay Integration",
        "15-Second Rotating QR Anti-Screenshot Scan",
        "Assisted Front-Desk Reception Kiosk",
        "Automated GST Tax Invoices & UPI Payments",
        "Flow Retention CRM (10+ Day Inactivity Alerts)",
        "WhatsApp 1-Tap Recovery Templates",
      ],
      cta: "Start 14-Day Free Trial",
      popular: false,
    },
    {
      name: "Growth & Enterprise",
      price: annual ? 4999 : 5999,
      period: "per month",
      desc: "For high-volume commercial clubs and multi-branch chains wanting full white-label dominance.",
      features: [
        "Up to 350 Active Members Included",
        "Unlimited Turnstile Gate Relays (TCP/IP)",
        "Full White-Label App (Your Gym Name & Logo)",
        "Dynamic OKLCH Brand Color Theming",
        "Staff Anti-Collision Locking System",
        "Cross-Branch Multi-Location Rollup Dashboard",
        "Dedicated Account Manager & Hardware Setup",
        "Optional Dedicated App Store / Play Store Build",
      ],
      cta: "Claim 14-Day Growth Trial",
      popular: true,
    },
  ];

  const currentTiers = mode === "athlete" ? athleteTiers : gymTiers;

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar mode={mode} onModeChange={setMode} />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">
              TRANSPARENT VALUE PRICING
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">
              {mode === "athlete"
                ? "Zero Subscriptions for Core Lifting"
                : "Predictable Pricing. Exponential ROI."}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
              {mode === "athlete"
                ? "Every essential workout logging and macro tracking tool is 100% free. No ads, no routine caps, no paywalls."
                : "A single recovered member pays for the entire monthly plan. No surprise turnstile license fees."}
            </p>

            {/* Annual vs Monthly Toggle */}
            <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-surface-2 border border-hairline">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  !annual ? "bg-surface-3 text-ink shadow-sm" : "text-ink-muted hover:text-ink"
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
                  annual ? "bg-primary text-on-primary shadow-sm" : "text-ink-muted hover:text-ink"
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] bg-black/20 text-on-primary px-1.5 py-0.5 rounded font-mono">
                  2 MONTHS FREE
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentTiers.map((tier, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border flex flex-col justify-between transition-all relative ${
                  tier.popular
                    ? "bg-surface-1 border-primary shadow-[0_0_40px_rgba(198,255,0,0.12)]"
                    : "bg-surface-1/60 border-hairline hover:border-hairline-strong"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 right-6">
                    <Badge variant="primary" className="shadow-md">
                      MOST POPULAR
                    </Badge>
                  </div>
                )}

                <div>
                  <h3 className="text-2xl font-bold text-ink">{tier.name}</h3>
                  <p className="text-xs text-ink-muted mt-1 leading-relaxed">{tier.desc}</p>

                  <div className="my-6 flex items-baseline gap-2">
                    <span className="text-4xl sm:text-5xl font-extrabold text-ink font-mono tracking-tight">
                      {formatCurrency(tier.price)}
                    </span>
                    <span className="text-xs font-mono text-ink-subtle">
                      /{tier.period}
                    </span>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-hairline text-xs">
                    {tier.features.map((feat, f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-ink leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-hairline">
                  <Link href="/signup">
                    <Button
                      variant={tier.popular ? "primary" : "secondary"}
                      className="w-full gap-2 text-sm"
                    >
                      <span>{tier.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Member Overage Calculator (For Gym Owners) */}
          {mode === "owner" && (
            <div className="mt-16 max-w-2xl mx-auto p-6 rounded-xl bg-surface-2 border border-hairline text-center space-y-4">
              <Badge variant="secondary">SCALE-AS-YOU-GROW MEMBER BLOCKS</Badge>
              <h4 className="text-lg font-bold text-ink">
                Need more members than your tier allowance?
              </h4>
              <p className="text-xs text-ink-muted">
                Add flexible capacity blocks anytime without changing tiers. No penalties or surprise overage bills.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2 font-mono text-xs">
                <div className="p-3 rounded-lg bg-surface-3 border border-hairline flex-1">
                  <span className="text-primary font-bold block text-sm">+50 Active Members</span>
                  <span className="text-ink-muted">₹1,499 / month</span>
                </div>
                <div className="p-3 rounded-lg bg-surface-3 border border-hairline flex-1">
                  <span className="text-primary font-bold block text-sm">+100 Active Members</span>
                  <span className="text-ink-muted">₹2,799 / month (Best Value)</span>
                </div>
              </div>
            </div>
          )}

          {/* Transparent Hardware FAQ Accordion */}
          <div className="mt-24 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-ink text-center mb-8">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {[
                {
                  q: "Do I need to buy expensive proprietary turnstiles from Kynvelo?",
                  a: "No. Kynvelo is strictly hardware-agnostic. Our relay controller connects to standard dry-contact relay terminals found on 99% of commercial tripod, speed-gate, and optical turnstiles (ZKTeco, eSSL, Hikvision). A standard IP relay costs around ₹3,000.",
                },
                {
                  q: "What happens if our gym internet connection drops?",
                  a: "Kynvelo's reception terminal and member PWA include an offline fallback queue. Check-in timestamps and QR tokens are verified and stored in local encrypted cache, then automatically synchronized to the cloud the moment WiFi reconnects.",
                },
                {
                  q: "Is Kynvelo Free for individual lifters forever?",
                  a: "Yes. All workout logging, barbell plate math, and 2-stage AI macro tracking are completely free for individual athletes without subscription limits.",
                },
                {
                  q: "How does the No-Show WhatsApp recovery feature work?",
                  a: "When a member has not checked in for 10 consecutive days, Kynvelo Flow automatically tags them on the Red-List CRM. Staff can click a single button to launch WhatsApp with a pre-filled, personalized check-in message. Anti-collision locks prevent two trainers from messaging the same member.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-surface-1 border border-hairline space-y-2"
                >
                  <h4 className="text-base font-bold text-ink">{faq.q}</h4>
                  <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
