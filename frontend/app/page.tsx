"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Dumbbell,
  Building2,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Kynvelo3DScene } from "@/components/3d/kynvelo-3d-scene";
import { ConnectedLoops } from "@/components/blocks/connected-loops";
import { AthleteDeepDive } from "@/components/blocks/athlete-deep-dive";
import { OwnerDeepDive } from "@/components/blocks/owner-deep-dive";
import { RoiSlider } from "@/components/blocks/roi-slider";
import { ComparisonMatrix } from "@/components/blocks/comparison-matrix";
import { UnifiedPricing } from "@/components/blocks/unified-pricing";
import { Testimonials } from "@/components/blocks/testimonials";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-ink overflow-x-hidden selection:bg-primary selection:text-black">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION: THE UNIFIED DUAL-SIDED PLATFORM                           */}
        {/* ========================================================================= */}
        <section className="relative pt-16 pb-20 overflow-hidden">
          {/* Luminous Cyber Backlight Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary/15 via-cyan-400/5 to-transparent blur-[140px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-1 border border-white/10 text-xs font-mono text-ink shadow-[0_0_20px_rgba(198,255,0,0.1)]">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span className="text-primary font-bold">KYNVELO V2.0 LIVE</span>
              <span className="text-white/20">|</span>
              <span className="text-ink-subtle">
                Unified Ecosystem for Lifters & Gym Owners
              </span>
            </div>

            {/* Main Headline */}
            <div className="max-w-4xl mx-auto space-y-5">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.03em] text-ink leading-[1.05]">
                The Operating System for <br />
                <span className="bg-gradient-to-r from-primary via-[#E0FF66] to-[#00F0FF] bg-clip-text text-transparent">
                  Elite Lifters & Modern Gyms
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-ink-muted max-w-2xl mx-auto leading-relaxed">
                For Athletes: Olympic barbell plate math, two-stage verified AI macros & zero subscriptions. For Gym Owners: Turnstile hardware automation, no-show WhatsApp retention & 18% GST billing.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="primary"
                  className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2.5 shadow-[0_0_30px_rgba(198,255,0,0.3)]"
                >
                  <Dumbbell className="w-4 h-4 text-black fill-black" />
                  <span>Explore Athlete PWA</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Button>
              </Link>

              <Link href="/admin/terminal">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2.5 glass-panel border border-white/10 hover:border-white/20"
                >
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>Launch Gym Terminal</span>
                </Button>
              </Link>
            </div>

            {/* 4 Telemetry Ticker Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-left font-mono">
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  HARDWARE RELIABILITY
                </span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">
                  99.98%
                </span>
                <span className="text-[10px] text-emerald-400">● Zero Turnstile Lockouts</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  NO-SHOW CHURN RECOVERY
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary block mt-0.5">
                  62%
                </span>
                <span className="text-[10px] text-ink-subtle">Saved Before Dropout</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  BARBELL SETS LOGGED
                </span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">
                  38,400+
                </span>
                <span className="text-[10px] text-cyan-400">● CSCS Progressive Overload</span>
              </div>
              <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
                <span className="text-[10px] text-ink-subtle uppercase block">
                  GST INVOICED
                </span>
                <span className="text-xl sm:text-2xl font-bold text-ink block mt-0.5">
                  ₹1.84 Cr
                </span>
                <span className="text-[10px] text-ink-subtle">SAC 999723 Compliant</span>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 2. HERO CENTERPIECE: REAL-TIME WEBGL THREE.JS 3D SCENE                    */}
            {/* ========================================================================= */}
            <div className="pt-6">
              <Kynvelo3DScene />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE 4 CONNECTED PLATFORM LOOPS (INTERLOCKED ECOSYSTEM)                 */}
        {/* ========================================================================= */}
        <ConnectedLoops />

        {/* ========================================================================= */}
        {/* 4. ATHLETE & MEMBER DEEP DIVE (CORE SELLING POINTS)                       */}
        {/* ========================================================================= */}
        <AthleteDeepDive />

        {/* ========================================================================= */}
        {/* 5. GYM OWNER COMMAND CENTER DEEP DIVE (HARDWARE & RETENTION OPS)          */}
        {/* ========================================================================= */}
        <OwnerDeepDive />

        {/* ========================================================================= */}
        {/* 6. INTERACTIVE LOST-MEMBER CHURN & ROI CALCULATOR                         */}
        {/* ========================================================================= */}
        <RoiSlider />

        {/* ========================================================================= */}
        {/* 7. ARCHITECTURAL COMPARISON MATRIX: TRADITIONAL VS KYNVELO OS             */}
        {/* ========================================================================= */}
        <ComparisonMatrix />

        {/* ========================================================================= */}
        {/* 8. UNIFIED DUAL-AUDIENCE PRICING MATRIX                                   */}
        {/* ========================================================================= */}
        <UnifiedPricing />

        {/* ========================================================================= */}
        {/* 9. SOCIAL PROOF & VERIFIED REVIEWS                                        */}
        {/* ========================================================================= */}
        <Testimonials />

        {/* ========================================================================= */}
        {/* 10. FINAL CONVERSION BANNER                                               */}
        {/* ========================================================================= */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#050608] via-surface-1 to-[#050608] border-t border-white/[0.08]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <Badge variant="primary" className="font-mono text-xs px-3.5 py-1">
              JOIN THE KINETIC VELOCITY STANDARD
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
              Ready to Upgrade from Fragmented Tools?
            </h2>
            <p className="text-sm sm:text-base text-ink-muted max-w-2xl mx-auto leading-relaxed">
              Whether you are an individual lifter pushing personal records or a gym founder stopping member churn, Kynvelo gives you total control.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono text-xs">
              <Link href="/app/pulse">
                <Button size="lg" variant="primary" className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2">
                  <span>Open Member PWA</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/admin/terminal">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto px-8 py-6 text-sm font-bold gap-2 glass-panel border border-white/10">
                  <span>Open Reception Kiosk</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
