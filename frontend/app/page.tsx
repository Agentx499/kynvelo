"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { HeroKinetic } from "@/components/blocks/hero-kinetic";
import { StatTicker } from "@/components/blocks/stat-ticker";
import { FeatureBento } from "@/components/blocks/feature-bento";
import { RoiSlider } from "@/components/blocks/roi-slider";
import { Testimonials } from "@/components/blocks/testimonials";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type AudienceMode } from "@/components/blocks/audience-toggle";

export default function HomePage() {
  const [mode, setMode] = useState<AudienceMode>("athlete");

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar mode={mode} onModeChange={setMode} />

      <main className="flex-1">
        {/* Dynamic Dual-Audience Hero */}
        <HeroKinetic mode={mode} />

        {/* Telemetry Stat Bar */}
        <StatTicker />

        {/* Bento Grid Feature Matrix */}
        <FeatureBento mode={mode} />

        {/* Interactive Lost-Member ROI Calculator */}
        <RoiSlider />

        {/* Verified Testimonials */}
        <Testimonials />

        {/* Final Conversion Callout */}
        <section className="py-24 relative overflow-hidden bg-gradient-to-b from-canvas to-surface-1 border-t border-hairline">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <Badge variant="primary" className="mb-4">
              READY FOR KINETIC VELOCITY?
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
              {mode === "athlete"
                ? "Start Training with Zero Paywalls Today"
                : "Transform Your Facility into an Autonomous Operating System"}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink-muted max-w-2xl mx-auto leading-relaxed">
              {mode === "athlete"
                ? "Join thousands of lifters who track workouts, verify macros, and hit PRs on Kynvelo. Always free for individual athletes."
                : "Plug-and-play turnstile automation, WhatsApp recovery, and GST invoicing. 14-day free trial with zero credit card required."}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/signup">
                <Button size="lg" variant="primary" className="w-full sm:w-auto text-base gap-2">
                  <span>{mode === "athlete" ? "Create Free Athlete Profile" : "Start 14-Day Free Gym Trial"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
                  View Transparent Plans
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
