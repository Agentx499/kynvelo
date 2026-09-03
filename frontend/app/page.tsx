"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  ArrowRight,
  ShieldCheck,
  Zap,
  Camera,
  Activity,
  QrCode,
  CheckCircle2,
  Sparkles,
  Award,
  Check,
  Building2,
} from "lucide-react";
import { ConsumerNavbar } from "@/components/layout/consumer-navbar";
import { Barbell3DScene } from "@/components/3d/barbell-3d-scene";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function ConsumerHomePage() {
  const [demoWeight, setDemoWeight] = useState(82.5);
  const [isAnnual, setIsAnnual] = useState(true);

  // Barbell plate math
  const calculatePlates = (totalWeight: number) => {
    let perSide = (totalWeight - 20) / 2;
    if (perSide < 0) return [];
    const availablePlates = [25, 20, 15, 10, 5, 2.5, 1.25];
    const platesUsed: { plate: number; count: number }[] = [];

    for (const p of availablePlates) {
      const count = Math.floor(perSide / p);
      if (count > 0) {
        platesUsed.push({ plate: p, count });
        perSide -= count * p;
      }
    }
    return platesUsed;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-ink overflow-x-hidden selection:bg-primary selection:text-black">
      <ConsumerNavbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. CONSUMER ATHLETE HERO                                                  */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-20 overflow-hidden">
          {/* Luminous Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/15 via-cyan-400/5 to-transparent blur-[140px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-white/10 text-xs font-mono text-ink shadow-[0_0_20px_rgba(198,255,0,0.1)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-primary font-bold">ATHLETE FLIGHT-DECK</span>
              <span className="text-white/20">|</span>
              <span className="text-ink-subtle">
                Always 100% Free Core Strength Tracking
              </span>
            </div>

            {/* Main Headline */}
            <div className="max-w-4xl mx-auto space-y-5">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-ink leading-[1.05]">
                Train with Absolute Precision. <br />
                <span className="bg-gradient-to-r from-primary via-[#E0FF66] to-[#00F0FF] bg-clip-text text-transparent">
                  Zero Paywalls on Core Tracking.
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed">
                Olympic barbell plate math, two-stage verified AI macro scanning, and a 15-second dynamic turnstile pass directly on your phone. No predatory $99/year paywalls.
              </p>
            </div>

            {/* Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2.5 shadow-[0_0_30px_rgba(198,255,0,0.3)]"
                >
                  <Dumbbell className="w-4 h-4 text-black fill-black" />
                  <span>Start Free Training</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Button>
              </Link>

              <Link href="/app/pulse">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2.5 glass-panel border border-white/10 hover:border-white/20"
                >
                  <span>Launch Web App</span>
                </Button>
              </Link>
            </div>

            {/* Athlete Telemetry Ticker */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-left font-mono">
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  SETS LOGGED
                </span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">
                  38,400+
                </span>
                <span className="text-[10px] text-emerald-400">● 100% Verified Tonnage</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  PRECISION LOADING
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary block mt-0.5">
                  0.5 kg
                </span>
                <span className="text-[10px] text-ink-subtle">Micro-plate Compatible</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  AI NUTRITION VERIFIED
                </span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">
                  USDA
                </span>
                <span className="text-[10px] text-cyan-400">● FoodData Central Sync</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  COMMERCIAL PRIVACY
                </span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">
                  0 Ads
                </span>
                <span className="text-[10px] text-ink-subtle">DPDP Data Ownership</span>
              </div>
            </div>

            {/* 3D Interactive Olympic Barbell */}
            <div className="pt-6">
              <Barbell3DScene />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. BARBELL PLATE MATH & STRENGTH TRACKING                                 */}
        {/* ========================================================================= */}
        <section id="workouts" className="py-24 relative overflow-hidden border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="max-w-3xl space-y-3">
              <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
                MODULE 01: PROGRESSIVE OVERLOAD
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
                Olympic Barbell Plate Math. <br />
                <span className="text-primary font-mono">Never Guess the Loading Rack Again.</span>
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Set your target weight and Kynvelo immediately computes the exact sleeve loading per side (accounting for standard 20kg Olympic barbells and micro-plates).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              <div className="md:col-span-7 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10">
                <h3 className="text-xl font-bold text-ink">Interactive Plate Math Simulator</h3>

                <div className="p-5 rounded-2xl bg-surface-1 border border-hairline space-y-4 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                    <span className="text-ink-subtle">SELECT TARGET WEIGHT:</span>
                    <div className="flex items-center gap-2">
                      {[60, 70, 82.5, 100, 140].map((wt) => (
                        <button
                          key={wt}
                          type="button"
                          onClick={() => setDemoWeight(wt)}
                          className={`px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                            demoWeight === wt
                              ? "bg-primary text-on-primary font-bold border-primary"
                              : "bg-surface-2 text-ink-muted border-hairline hover:text-ink"
                          }`}
                        >
                          {wt}kg
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-surface-2/80 border border-hairline flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <span className="text-ink-subtle block text-[11px]">RACK PER SLEEVE (ONE SIDE):</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {calculatePlates(demoWeight).map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-lg bg-primary/20 text-primary border border-primary/40 font-bold text-sm"
                          >
                            {item.count} × {item.plate}kg
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-ink-subtle text-[11px] block">TOTAL LOAD</span>
                      <span className="text-2xl font-extrabold text-ink">{demoWeight} kg</span>
                      <span className="text-[10px] text-ink-subtle block">20kg bar + {(demoWeight - 20) / 2}kg/side</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-ink-subtle pt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>CSCS Progressive Overload Targets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                    <span>Haptic Rest Timers (90s / 180s)</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 flex flex-col justify-between">
                <div className="space-y-4">
                  <Badge variant="secondary" className="text-[10px] font-mono text-cyan-400">
                    SET & REP MATRIX
                  </Badge>
                  <h3 className="text-2xl font-bold text-ink">
                    0.5kg Precision Logging with Previous Session Memory
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    Kynvelo pre-fills your previous session's weight and reps in subtle ghost text. You always know whether you are progressing or stagnating.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs space-y-2">
                  <div className="flex justify-between text-ink-subtle pb-1 border-b border-hairline">
                    <span>SET</span>
                    <span>TARGET</span>
                    <span className="text-right">RPE</span>
                  </div>
                  <div className="flex justify-between text-ink">
                    <span className="text-primary font-bold">1 (Warmup)</span>
                    <span>50.0 kg × 10</span>
                    <span className="text-ink-subtle">RPE 6</span>
                  </div>
                  <div className="flex justify-between text-ink">
                    <span className="text-primary font-bold">2 (Working)</span>
                    <span>82.5 kg × 8</span>
                    <span className="text-ink-subtle">RPE 8.5</span>
                  </div>
                  <div className="flex justify-between text-ink font-bold">
                    <span className="text-emerald-400">3 (PR Set)</span>
                    <span className="text-emerald-400">85.0 kg × 6 (+2.5kg)</span>
                    <span className="text-emerald-400">RPE 9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. TWO-STAGE AI NUTRITION & MEAL PLANNING                                  */}
        {/* ========================================================================= */}
        <section id="nutrition" className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            <div className="max-w-3xl space-y-3">
              <Badge variant="primary" className="font-mono text-[11px] px-3 py-1 text-cyan-400">
                MODULE 02: FUEL & DIET PLANNING
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
                Two-Stage AI Nutrition. <br />
                <span className="text-cyan-400 font-mono">Verified Against Real USDA Databases.</span>
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Generic AI nutrition bots hallucinate imaginary calories. Kynvelo uses a Two-Stage verification pipeline: camera vision identifies meal components, which are then cross-referenced against USDA FoodData Central databases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel-elevated p-8 rounded-3xl space-y-4 border border-white/10">
                <Camera className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-bold text-ink">1. Camera Vision Scan</h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Snap your plate or meal prep container. Multimodal vision detects ingredients, portion sizes, and preparation methods.
                </p>
              </div>

              <div className="glass-panel-elevated p-8 rounded-3xl space-y-4 border border-white/10">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-bold text-ink">2. USDA Cross-Verification</h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Raw ingredients are verified against laboratory-tested macro benchmarks, eliminating calorie hallucinations.
                </p>
              </div>

              <div className="glass-panel-elevated p-8 rounded-3xl space-y-4 border border-white/10">
                <Activity className="w-8 h-8 text-emerald-400" />
                <h3 className="text-xl font-bold text-ink">3. Concentric Rings</h3>
                <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                  Dynamic visual rings track daily Protein, Carbs, Fat, and hydration targets tailored to your strength phase (cut, lean bulk, or maintenance).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. RECOVERY HEATMAP & 15S TURNSTILE PASS                                  */}
        {/* ========================================================================= */}
        <section id="recovery" className="py-24 relative overflow-hidden border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
              {/* Recovery Heatmap */}
              <div className="glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10">
                <div className="flex justify-between items-center">
                  <Badge variant="primary" className="text-[10px] font-mono">
                    72-HOUR RECOVERY ENGINE
                  </Badge>
                  <span className="text-xs font-mono text-emerald-400">READY TO TRAIN</span>
                </div>

                <h3 className="text-2xl font-bold text-ink">
                  Muscle Fatigue & Readiness Heatmap
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed">
                  Kynvelo maps every rep and set to anatomical muscle groups, calculating rest intervals so you never overtrain or hit dead legs on squat day.
                </p>

                <div className="grid grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-surface-1 border border-hairline space-y-1">
                    <span className="text-[10px] text-ink-subtle block">CHEST</span>
                    <span className="text-danger font-bold">48h Left</span>
                    <span className="text-[10px] text-ink-subtle block">Heavy Fatigue</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-1 border border-hairline space-y-1">
                    <span className="text-[10px] text-ink-subtle block">BACK</span>
                    <span className="text-emerald-400 font-bold">100% Primed</span>
                    <span className="text-[10px] text-ink-subtle block">Ready for Rows</span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-1 border border-hairline space-y-1">
                    <span className="text-[10px] text-ink-subtle block">LEGS</span>
                    <span className="text-warning font-bold">60% Rested</span>
                    <span className="text-[10px] text-ink-subtle block">Light Volume</span>
                  </div>
                </div>
              </div>

              {/* 15s HMAC Turnstile Pass */}
              <div id="turnstile-pass" className="glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 flex flex-col justify-between">
                <div className="space-y-4">
                  <Badge variant="secondary" className="text-[10px] font-mono text-primary">
                    ZERO-WAIT ACCESS
                  </Badge>
                  <h3 className="text-2xl font-bold text-ink">
                    15-Second Dynamic Rotating Turnstile Pass
                  </h3>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    No physical plastic cards to lose. Every 15 seconds, a cryptographic time-bound HMAC token regenerates on your phone. Works completely offline at any Kynvelo-powered gym turnstile.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-1 border border-hairline flex items-center gap-5">
                  <div className="w-16 h-16 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0">
                    <QrCode className="w-full h-full text-black" />
                  </div>
                  <div className="font-mono text-xs space-y-1">
                    <span className="font-bold text-ink text-sm block">Anti-Passback Protected</span>
                    <span className="text-primary font-bold block">15s HMAC Refresh Active</span>
                    <span className="text-[11px] text-ink-subtle block">Instant 300ms Turnstile Entry</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CONSUMER PRICING (FREE FOREVER VS PRO PASS)                            */}
        {/* ========================================================================= */}
        <section id="pricing" className="py-24 relative overflow-hidden border-t border-white/[0.08]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-3xl mx-auto space-y-3">
              <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
                TRANSPARENT ATHLETE PRICING
              </Badge>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
                Zero Subscriptions for Core Strength Tracking
              </h2>
              <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
                Workout logging, plate math, and personal records are 100% free forever. Upgrade to Pro only if you want advanced AI nutrition scanning and muscle recovery scoring.
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {/* Free Athlete */}
              <div className="glass-panel-elevated p-8 rounded-3xl flex flex-col justify-between space-y-6 border border-white/10">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-ink">Free Athlete</h3>
                      <p className="text-xs text-ink-muted mt-1">Essential strength tracking with zero ads.</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-[10px]">FREE FOREVER</Badge>
                  </div>

                  <div className="pt-2 font-mono">
                    <span className="text-4xl font-extrabold text-ink">₹0</span>
                    <span className="text-xs text-ink-subtle ml-2">/ forever</span>
                    <span className="text-[11px] text-ink-subtle block mt-0.5">No credit card or payment required</span>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] space-y-3">
                    <span className="text-[11px] font-mono text-ink-subtle uppercase tracking-wider block">INCLUDED:</span>
                    <ul className="space-y-2.5 text-xs text-ink-muted font-mono">
                      {[
                        "Core Workout Logger & Progressive Overload",
                        "Olympic Barbell Plate Math Calculator",
                        "Basic Daily Macro & Water Tracking",
                        "Personal Record (PR) Trophy Vault",
                        "Full CSV/JSON Data Export (DPDP Rights)",
                        "Zero Advertisements Guarantee",
                      ].map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/signup">
                  <Button variant="secondary" className="w-full py-5 text-xs font-bold font-mono">
                    Start Free Logging
                  </Button>
                </Link>
              </div>

              {/* Pro Athlete Pass */}
              <div className="glass-panel-elevated p-8 rounded-3xl flex flex-col justify-between space-y-6 border border-primary/50 shadow-[0_0_40px_rgba(198,255,0,0.15)] ring-1 ring-primary/40 relative">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge variant="primary" className="text-[10px] font-mono px-3 py-1">
                    RECOMMENDED PASS
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-ink">Pro Athlete Pass</h3>
                      <p className="text-xs text-ink-muted mt-1">AI nutrition verification & muscle recovery.</p>
                    </div>
                    <Badge variant="secondary" className="font-mono text-[10px] text-primary">PRO ATHLETE</Badge>
                  </div>

                  <div className="pt-2 font-mono">
                    <span className="text-4xl font-extrabold text-ink">
                      {isAnnual ? "₹333" : "₹499"}
                    </span>
                    <span className="text-xs text-ink-subtle ml-2">/ month</span>
                    <span className="text-[11px] text-ink-subtle block mt-0.5">
                      {isAnnual ? "Billed annually (₹3,999/yr). Save 20%." : "Billed monthly. Cancel anytime."}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] space-y-3">
                    <span className="text-[11px] font-mono text-ink-subtle uppercase tracking-wider block">ALL FREE FEATURES PLUS:</span>
                    <ul className="space-y-2.5 text-xs text-ink-muted font-mono">
                      {[
                        "Two-Stage AI Camera Food Scanner (USDA Verified)",
                        "72-Hour Muscle Fatigue & Readiness Heatmap",
                        "Apple Health & Google Health Connect Sync",
                        "Personal Trainer Direct Chat & Routine Imports",
                        "Unlimited Cloud Sync & Multi-Device Access",
                      ].map((f, i) => (
                        <li key={i} className="flex items-center gap-2.5">
                          <Check className="w-4 h-4 text-primary shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link href="/signup?plan=athlete-pro">
                  <Button variant="primary" className="w-full py-5 text-xs font-bold font-mono gap-2">
                    <span>Start 14-Day Free Trial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* B2B Callout */}
            <div className="p-6 rounded-2xl bg-surface-1 border border-hairline flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-primary" />
                <span className="text-ink-muted">Are you a Gym Owner, Club Founder, or Studio Director?</span>
              </div>
              <Link href="/business" className="text-primary hover:underline font-bold">
                Explore Kynvelo for Gyms &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
