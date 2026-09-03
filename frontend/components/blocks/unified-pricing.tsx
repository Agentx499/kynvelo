"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, Sparkles, Building2, Dumbbell, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export function UnifiedPricing() {
  const [audienceTab, setAudienceTab] = useState<"athletes" | "gyms">("gyms");
  const [isAnnual, setIsAnnual] = useState(true);

  // Athlete Plans
  const athletePlans = [
    {
      id: "athlete-free",
      name: "Free Athlete",
      tagline: "Essential strength tracking for lifters with zero ads.",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      badge: "FREE FOREVER",
      features: [
        "Core Workout Logger & Progressive Overload",
        "Olympic Barbell Plate Math Calculator",
        "Basic Daily Macro & Water Tracking",
        "Personal Record (PR) Trophy Vault",
        "Full CSV/JSON Data Export (DPDP Rights)",
        "Zero Advertisements Guarantee",
      ],
      cta: "Start Free Logging",
      href: "/signup?plan=athlete-free",
    },
    {
      id: "athlete-pro",
      name: "Pro Athlete Pass",
      tagline: "Advanced AI nutrition verification & muscle recovery scoring.",
      monthlyPrice: 499,
      annualPrice: 3999, // ₹333/mo
      popular: true,
      badge: "MOST POPULAR",
      features: [
        "Everything in Free Athlete",
        "Two-Stage AI Camera Food Scanner (USDA Verified)",
        "72-Hour Muscle Recovery Heatmap & Readiness",
        "Apple Health & Google Health Connect Sync",
        "Personal Trainer Direct Chat & Routine Imports",
        "Unlimited Cloud Sync & Multi-Device Access",
      ],
      cta: "Start 14-Day Free Trial",
      href: "/signup?plan=athlete-pro",
    },
  ];

  // Gym Owner Plans
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
      href: "/signup?plan=gym-core",
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
      href: "/signup?plan=gym-pro",
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
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
            TRANSPARENT PRICING
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Plans for Athletes & Gym Owners
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Zero hidden fees. Zero per-member surcharge extortion. Choose your profile below to view tailored pricing.
          </p>
        </div>

        {/* Dual Controls: Audience Selector + Billing Frequency Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Audience Segment Switcher */}
          <div className="flex p-1 rounded-xl bg-surface-1 border border-white/10 font-mono text-xs">
            <button
              type="button"
              onClick={() => setAudienceTab("gyms")}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 cursor-pointer ${
                audienceTab === "gyms"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <Building2 className="w-4 h-4" /> For Gym Owners (3 Plans)
            </button>
            <button
              type="button"
              onClick={() => setAudienceTab("athletes")}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 cursor-pointer ${
                audienceTab === "athletes"
                  ? "bg-primary text-on-primary shadow-md"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <Dumbbell className="w-4 h-4" /> For Lifters & Athletes (2 Plans)
            </button>
          </div>

          {/* Monthly vs Annual Toggle */}
          <div className="flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-xl bg-surface-1 border border-hairline">
            <span className={!isAnnual ? "text-ink font-bold" : "text-ink-subtle"}>
              Monthly
            </span>
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

        {/* Pricing Cards Grid */}
        {audienceTab === "gyms" ? (
          /* 3 Plans for Gym Owners */
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
        ) : (
          /* 2 Plans for Athletes / Members */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
            {athletePlans.map((p) => {
              const displayPrice = isAnnual ? (p.annualPrice > 0 ? Math.round(p.annualPrice / 12) : 0) : p.monthlyPrice;

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
                        POPULAR PASS
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
                          {p.monthlyPrice === 0 ? "₹0" : formatCurrency(displayPrice)}
                        </span>
                        <span className="text-xs text-ink-subtle">
                          {p.monthlyPrice === 0 ? "/ forever" : "/ month"}
                        </span>
                      </div>
                      <span className="text-[11px] text-ink-subtle block mt-0.5">
                        {p.monthlyPrice === 0
                          ? "No credit card or payment required"
                          : isAnnual
                          ? `Billed annually (${formatCurrency(p.annualPrice)}/yr)`
                          : "Billed monthly. Cancel anytime."}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-white/[0.08] space-y-3">
                      <span className="text-[11px] font-mono text-ink-subtle uppercase tracking-wider block">
                        FEATURES:
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
        )}

        {/* Guarantee Banner */}
        <div className="p-6 rounded-2xl bg-surface-1 border border-hairline text-center text-xs font-mono text-ink-subtle max-w-2xl mx-auto space-y-1">
          <span className="text-ink font-bold block">
            🔒 30-Day Money-Back Guarantee for Gym Facilities
          </span>
          <p>
            If Kynvelo does not recover at least 3x its monthly cost in prevented member dropouts, receive a 100% refund.
          </p>
        </div>
      </div>
    </section>
  );
}
