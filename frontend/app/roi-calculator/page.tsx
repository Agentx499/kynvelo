"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Download, Calculator, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RoiSlider } from "@/components/blocks/roi-slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type AudienceMode } from "@/components/blocks/audience-toggle";

export default function RoiCalculatorPage() {
  const [mode, setMode] = useState<AudienceMode>("owner");

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar mode={mode} onModeChange={setMode} />

      <main className="flex-1 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="primary" className="mb-4">
              FINANCIAL FEASIBILITY BENCHMARK
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-ink tracking-tight">
              Lost-Member Churn & Revenue Recovery Calculator
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
              Every gym experiences silent drop-out. Discover how much monthly recurring revenue your facility recovers by detecting absence early at Day 10 instead of waiting for renewal failure.
            </p>
          </div>

          {/* Interactive Calculator Block */}
          <RoiSlider />

          {/* Sensitivity & Benchmark Breakdown */}
          <div className="mt-16 max-w-4xl mx-auto p-8 rounded-2xl bg-surface-1 border border-hairline space-y-6">
            <h3 className="text-xl font-bold text-ink flex items-center gap-2">
              <Calculator className="w-5 h-5 text-primary" />
              The Retention Mechanics Behind the Numbers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-ink-muted leading-relaxed">
              <div className="p-4 rounded-xl bg-surface-2 border border-hairline">
                <h4 className="font-bold text-ink mb-1 text-base">The Day 10 Churn Window</h4>
                <p>
                  Gym members rarely quit spontaneously on renewal day. Data proves that 85% of dropping members cease attendance 10 to 15 days before their pass expires. Intervening at Day 10 yields a 50% recovery rate vs under 8% after expiration.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-surface-2 border border-hairline">
                <h4 className="font-bold text-ink mb-1 text-base">Staff Anti-Collision Protocol</h4>
                <p>
                  Kynvelo Flow locks case files the moment a trainer initiates contact, ensuring members receive a warm, professional check-in rather than conflicting calls from multiple front-desk staff.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-ink-subtle">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Audited against 240+ commercial gym operating datasets</span>
              </div>
              <Link href="/signup">
                <Button variant="primary" className="gap-2">
                  <span>Start Free 14-Day Recovery Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
