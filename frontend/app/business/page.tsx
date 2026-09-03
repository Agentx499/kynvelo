"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Lock,
  MessageSquare,
  CreditCard,
  Palette,
  Check,
  Dumbbell,
} from "lucide-react";
import { BusinessNavbar } from "@/components/layout/business-navbar";
import { Turnstile3DScene } from "@/components/3d/turnstile-3d-scene";
import { OwnerDeepDive } from "@/components/blocks/owner-deep-dive";
import { RoiSlider } from "@/components/blocks/roi-slider";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function BusinessHomePage() {
  const [isAnnual, setIsAnnual] = useState(true);

  // Business Plans
  const gymPlans = [
    {
      id: "gym-core",
      name: "Gym Core (Single Gate)",
      tagline: "Ideal for boutique fitness studios and independent gyms.",
      monthlyPrice: 3499,
      annualPrice: 35988, // ₹2,999/mo
      popular: false,
      badge: "ESSENTIAL OS",
      features: [
        "Up to 350 Active Members",
        "1 Turnstile Lane TCP/IP Relay Controller",
        "No-Show Red-List Retention CRM",
        "1-Tap Personalized WhatsApp Messaging",
        "15-Second Dynamic HMAC QR Member Passes",
        "Automated 18% GST Tax Invoices (SAC 999723)",
        "Daily Cash vs UPI Financial Reconciliation",
      ],
      cta: "Deploy Core OS",
      href: "/business/signup?plan=gym-core",
    },
    {
      id: "gym-pro",
      name: "Gym Pro (Multi-Gate)",
      tagline: "High-throughput access control & retention for busy gyms.",
      monthlyPrice: 6999,
      annualPrice: 69588, // ₹5,799/mo
      popular: true,
      badge: "RECOMMENDED",
      features: [
        "Up to 1,200 Active Members",
        "Up to 4 Turnstile Lanes (Main Floor + Steam)",
        "Fullscreen Reception Kiosk with Assisted Entry Audits",
        "Staff Anti-Collision Locking Protocol",
        "Point of Sale (POS) Supplements & PT Inventory",
        "White-Label Branding (Custom Logo & OKLCH Theme)",
        "Priority WhatsApp Support & Hardware Relay Setup",
      ],
      cta: "Deploy Pro OS",
      href: "/business/signup?plan=gym-pro",
    },
    {
      id: "gym-enterprise",
      name: "Enterprise Franchise",
      tagline: "Multi-branch gym chains requiring custom SLAs and APIs.",
      monthlyPrice: 14999,
      annualPrice: 143988, // ₹11,999/mo
      popular: false,
      badge: "CUSTOM HARDWARE",
      features: [
        "Unlimited Members & Facilities",
        "Unlimited Turnstile Gates & RFID Readers",
        "Multi-Branch Consolidated Financial Dashboard",
        "On-Site Hardware Technician Deployment",
        "Custom Turnstile Controller TCP/IP Protocols",
        "Dedicated Account Manager & 99.99% Uptime SLA",
        "DPDP Enterprise Data Processing Addendum (DPA)",
      ],
      cta: "Contact Enterprise Sales",
      href: "/enterprise",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-ink overflow-x-hidden selection:bg-primary selection:text-black">
      <BusinessNavbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. BUSINESS HERO SECTION                                                  */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-20 overflow-hidden">
          {/* Luminous Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/15 via-emerald-400/5 to-transparent blur-[140px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-white/10 text-xs font-mono text-ink shadow-[0_0_20px_rgba(198,255,0,0.1)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-primary font-bold">ENTERPRISE COMMAND CENTER</span>
              <span className="text-white/20">|</span>
              <span className="text-ink-subtle">
                Hardware Turnstiles + WhatsApp Retention CRM
              </span>
            </div>

            {/* Headline */}
            <div className="max-w-4xl mx-auto space-y-5">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-ink leading-[1.05]">
                Stop Member Churn. <br />
                <span className="bg-gradient-to-r from-primary via-[#E0FF66] to-[#00F0FF] bg-clip-text text-transparent">
                  Automate Turnstiles & Recover ₹68,000/mo.
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed">
                Universal 300ms TCP/IP turnstile controller, front-desk assisted entry justification audits, and automated No-Show WhatsApp retention CRM.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
              <Link href="/admin/terminal">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2.5 shadow-[0_0_30px_rgba(198,255,0,0.3)]"
                >
                  <Terminal className="w-4 h-4 text-black" />
                  <span>Launch Reception Terminal</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Button>
              </Link>

              <Link href="/business/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2.5 glass-panel border border-white/10 hover:border-white/20"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Deploy Facility Kiosk</span>
                </Button>
              </Link>
            </div>

            {/* Telemetry Bar */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-left font-mono">
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">HARDWARE UPTIME</span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">99.98%</span>
                <span className="text-[10px] text-emerald-400">● Zero Turnstile Lockouts</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">CHURN RECOVERY</span>
                <span className="text-xl sm:text-2xl font-bold text-primary block mt-0.5">62%</span>
                <span className="text-[10px] text-ink-subtle">Saved Before Dropout</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">GST INVOICED</span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">₹1.84 Cr</span>
                <span className="text-[10px] text-cyan-400">● SAC 999723 Compliant</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">RELAY LATENCY</span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">24 ms</span>
                <span className="text-[10px] text-emerald-400">● Instant Pulse</span>
              </div>
            </div>

            {/* 3D Interactive Turnstile */}
            <div className="pt-6">
              <Turnstile3DScene />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. GYM OWNER OPERATIONS SUITE (HARDWARE, CRM, LEDGER)                     */}
        {/* ========================================================================= */}
        <div id="turnstiles">
          <OwnerDeepDive />
        </div>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE LOST-MEMBER CHURN & ROI CALCULATOR                         */}
        {/* ========================================================================= */}
        <div id="roi-calculator">
          <RoiSlider />
        </div>

        {/* ========================================================================= */}
        {/* 4. BUSINESS PLANS & PRICING                                               */}
        {/* ========================================================================= */}
        <section id="pricing" className="py-24 relative overflow-hidden border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
                FACILITY OPERATING PLANS
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
                Predictable Business Pricing. Exponential ROI.
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Choose the right capacity for your facility. Turnstile controller integration, WhatsApp retention CRM, and GST billing are included in all tiers.
              </p>

              {/* Monthly vs Annual Toggle */}
              <div className="flex items-center justify-center gap-3 font-mono text-xs pt-4">
                <span className={!isAnnual ? "text-ink font-bold" : "text-ink-subtle"}>Monthly</span>
                <button
                  type="button"
                  onClick={() => setIsAnnual(!isAnnual)}
                  className="relative w-10 h-5 rounded-full bg-surface-3 transition-colors p-0.5 cursor-pointer"
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-primary transition-transform ${
                      isAnnual ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
                <span className={isAnnual ? "text-primary font-bold" : "text-ink-subtle"}>
                  Annual (Save 20%)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {gymPlans.map((p) => {
                const displayPrice = isAnnual ? Math.round(p.annualPrice / 12) : p.monthlyPrice;

                return (
                  <div
                    key={p.id}
                    className={`glass-panel-elevated p-8 rounded-3xl flex flex-col justify-between space-y-6 relative transition-all ${
                      p.popular
                        ? "border-primary/50 shadow-[0_0_40px_rgba(198,255,0,0.15)] ring-1 ring-primary/40"
                        : "border-white/10"
                    }`}
                  >
                    {p.popular && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                        <Badge variant="primary" className="text-[10px] font-mono px-3 py-1">
                          RECOMMENDED CHOICE
                        </Badge>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-ink">{p.name}</h3>
                          <p className="text-xs text-ink-muted mt-1">{p.tagline}</p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] font-mono">
                          {p.badge}
                        </Badge>
                      </div>

                      <div className="pt-2 font-mono">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-ink">
                            {formatCurrency(displayPrice)}
                          </span>
                          <span className="text-xs text-ink-subtle">/ month</span>
                        </div>
                        <span className="text-[11px] text-ink-subtle block mt-0.5">
                          {isAnnual
                            ? `Billed annually (${formatCurrency(p.annualPrice)}/yr) + 18% GST`
                            : "Billed monthly + 18% GST"}
                        </span>
                      </div>

                      <div className="pt-4 border-t border-white/[0.08] space-y-3">
                        <span className="text-[11px] font-mono text-ink-subtle uppercase tracking-wider block">
                          WHAT'S INCLUDED:
                        </span>
                        <ul className="space-y-2.5 text-xs text-ink-muted">
                          {p.features.map((f, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                              <span className="leading-relaxed">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Link href={p.href} className="w-full pt-4">
                      <Button
                        variant={p.popular ? "primary" : "secondary"}
                        className="w-full py-5 text-xs font-bold gap-2 font-mono"
                      >
                        <span>{p.cta}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Consumer Callout */}
            <div className="p-6 rounded-2xl bg-surface-1 border border-hairline flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <Dumbbell className="w-4 h-4 text-primary" />
                <span className="text-ink-muted">Looking for personal workout & nutrition tracking?</span>
              </div>
              <Link href="/" className="text-primary hover:underline font-bold">
                Switch to Athlete Personal App &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
