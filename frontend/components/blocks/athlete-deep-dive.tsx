"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Dumbbell,
  Calculator,
  Camera,
  Activity,
  QrCode,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function AthleteDeepDive() {
  const [demoWeight, setDemoWeight] = useState(82.5);

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
    <section id="athletes" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
            ATHLETE & MEMBER SUITE
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Built for Serious Lifters. <br />
            <span className="text-primary font-mono">Zero Clutter. Zero Paywalls on Core Tracking.</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Most fitness apps trap your strength logs behind predatory subscription paywalls or bombard you with ads. Kynvelo delivers Olympic-grade barbell precision, AI macro verification, and instant turnstile access directly in your pocket.
          </p>
        </div>

        {/* 4 Feature Bento Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Pillar 1: Barbell Strength Matrix & Plate Math (7 cols) */}
          <div className="md:col-span-7 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                <Dumbbell className="w-4 h-4" /> MODULE 01: STRENGTH LOGGING
              </div>
              <Badge variant="primary" className="text-[10px]">0.5KG PRECISION</Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-ink">
                Progressive Overload with Barbell Plate Math
              </h3>
              <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                Never guess how many plates to load on an Olympic bar. Set your target weight and Kynvelo tells you the exact plate breakdown per side in seconds.
              </p>
            </div>

            {/* Interactive Plate Math Demonstration */}
            <div className="p-5 rounded-2xl bg-surface-1 border border-hairline space-y-4 font-mono text-xs">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <span className="text-ink-subtle">TEST TARGET WEIGHT (20KG BAR INCLUDED):</span>
                <div className="flex items-center gap-2">
                  {[70, 82.5, 100, 140].map((wt) => (
                    <button
                      key={wt}
                      type="button"
                      onClick={() => setDemoWeight(wt)}
                      className={`px-2.5 py-1 rounded-md border text-xs cursor-pointer transition-all ${
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

              <div className="p-4 rounded-xl bg-surface-2/80 border border-hairline flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <span className="text-ink-subtle block text-[11px]">RACK PER SLEEVE:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {calculatePlates(demoWeight).map((item, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-primary/20 text-primary border border-primary/40 font-bold"
                      >
                        {item.count} × {item.plate}kg
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-ink-subtle text-[11px] block">TOTAL LOAD</span>
                  <span className="text-lg font-bold text-ink">{demoWeight} kg</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-ink-subtle">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>RPE & Warmup/Dropset Tags</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Rest Timer Haptic Countdown</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Two-Stage AI Nutrition Recognition (5 cols) */}
          <div className="md:col-span-5 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold">
                  <Camera className="w-4 h-4" /> MODULE 02: FUEL & MACROS
                </div>
                <Badge variant="secondary" className="text-[10px] text-cyan-400 font-mono">
                  USDA VERIFIED
                </Badge>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-ink">
                  Two-Stage AI Food Recognition
                </h3>
                <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                  Eliminates generic AI calorie hallucinations. Stage 1 detects meal items via camera vision; Stage 2 cross-verifies macros against USDA FoodData Central databases.
                </p>
              </div>

              {/* Macro Rings Simulated Display */}
              <div className="p-4 rounded-2xl bg-surface-1 border border-hairline space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-ink-subtle">DAILY TARGETS</span>
                  <span className="text-cyan-400 font-bold">1,840 / 2,400 kcal</span>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-ink-muted mb-1">
                      <span>Protein (142g / 160g)</span>
                      <span className="text-cyan-400 font-bold">89%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full w-[89%]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-ink-muted mb-1">
                      <span>Carbohydrates (185g / 220g)</span>
                      <span className="text-amber-400 font-bold">84%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full w-[84%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <span className="text-[11px] font-mono text-ink-subtle block pt-2">
              ● Supports meal prep batch division across storage containers.
            </span>
          </div>

          {/* Pillar 3: 15s Dynamic Rotating HMAC Turnstile Pass (5 cols) */}
          <div className="md:col-span-5 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                  <QrCode className="w-4 h-4" /> MODULE 03: TURNSTILE PASS
                </div>
                <Badge variant="primary" className="text-[10px]">15s REFRESH</Badge>
              </div>

              <h3 className="text-2xl font-bold text-ink">
                15-Second Dynamic Rotating HMAC Pass
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Screenshots cannot be shared or stolen. Every 15 seconds, a cryptographic time-bound HMAC token regenerates. Works completely offline with cached turnstile keys.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1 border border-hairline flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-black" />
              </div>
              <div className="font-mono text-xs space-y-1">
                <span className="font-bold text-ink block">Anti-Passback Protected</span>
                <span className="text-ink-subtle text-[11px] block">
                  Valid at all facility gates & steam rooms
                </span>
              </div>
            </div>
          </div>

          {/* Pillar 4: 72-Hour Muscle Fatigue Recovery Heatmap (7 cols) */}
          <div className="md:col-span-7 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-bold">
                <Activity className="w-4 h-4" /> MODULE 04: MUSCLE RECOVERY
              </div>
              <Badge variant="secondary" className="text-[10px] text-rose-400 font-mono">
                FATIGUE INDEX
              </Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-ink">
                72-Hour Muscle Fatigue & Readiness Heatmap
              </h3>
              <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                Kynvelo maps every set and kilo moved against anatomical muscle groups. It calculates recovery windows so you know precisely when chest, back, or legs are primed for heavy loading.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-3.5 rounded-xl bg-surface-1 border border-hairline space-y-1">
                <span className="text-ink-subtle text-[11px] block">CHEST & TRICEPS</span>
                <span className="text-danger font-bold text-sm block">48h Recovery Left</span>
                <span className="text-[10px] text-ink-subtle">85% Volume Fatigue</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-1 border border-hairline space-y-1">
                <span className="text-ink-subtle text-[11px] block">BACK & BICEPS</span>
                <span className="text-emerald-400 font-bold text-sm block">100% Primed</span>
                <span className="text-[10px] text-ink-subtle">Ready for Heavy Rows</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-1 border border-hairline space-y-1">
                <span className="text-ink-subtle text-[11px] block">QUADS & HAMSTRINGS</span>
                <span className="text-warning font-bold text-sm block">Light Load Ready</span>
                <span className="text-[10px] text-ink-subtle">60% Recovery Status</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-surface-2 to-surface-1 border border-hairline flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-xl font-bold text-ink">
              Ready to train with absolute precision?
            </h4>
            <p className="text-xs text-ink-muted mt-1 font-mono">
              Open the progressive web app on your phone. No app store installation required.
            </p>
          </div>
          <Link href="/app/pulse">
            <Button variant="primary" className="text-xs font-bold gap-2">
              <span>Launch Athlete PWA</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
