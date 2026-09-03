"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Shield, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type AudienceMode } from "./audience-toggle";
import { IsometricPreview } from "./isometric-preview";

interface HeroKineticProps {
  mode: AudienceMode;
}

export function HeroKinetic({ mode }: HeroKineticProps) {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background Ambience & Fine Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #F9F9F9 1px, transparent 1px), linear-gradient(to bottom, #F9F9F9 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top Eyebrow Tag */}
        <div className="flex justify-center mb-6">
          <Badge variant="primary" className="py-1 px-3 text-xs gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {mode === "athlete"
                ? "THE 3-IN-1 ATHLETE OPERATING SUITE"
                : "AUTONOMOUS NO-SHOW RETENTION OS"}
            </span>
          </Badge>
        </div>

        {/* Dynamic Display Headline */}
        <div className="max-w-4xl mx-auto min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {mode === "athlete" ? (
              <motion.h1
                key="headline-athlete"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.1]"
              >
                Train with Precision.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-lime-300 to-emerald-400">
                  Fuel with Science.
                </span>{" "}
                Never Drop a Streak.
              </motion.h1>
            ) : (
              <motion.h1
                key="headline-owner"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink leading-[1.1]"
              >
                Stop Member Drop-Out.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-lime-300 to-emerald-400">
                  Automate Turnstiles.
                </span>{" "}
                Collect Every Renewal.
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Subhead */}
        <div className="max-w-2xl mx-auto mt-6 min-h-[60px]">
          <AnimatePresence mode="wait">
            {mode === "athlete" ? (
              <motion.p
                key="subhead-athlete"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-base sm:text-lg text-ink-muted leading-relaxed"
              >
                The zero-subscription power suite replacing Hevy, MyFitnessPal, and Strava.
                Log barbell sets with plate math, scan meals with 2-stage AI vision, and sync
                directly with your gym turnstile.
              </motion.p>
            ) : (
              <motion.p
                key="subhead-owner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="text-base sm:text-lg text-ink-muted leading-relaxed"
              >
                Detect inactivity at Day 10 before members mentally churn. Recover up to 50%
                of dropping-out members with 1-tap WhatsApp workflows and zero-lock-in turnstile gates.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Dual Call-to-Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" variant="primary" className="w-full sm:w-auto text-base">
              <span>{mode === "athlete" ? "Get Started as an Athlete" : "Start 14-Day Free Gym Trial"}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Link href={mode === "athlete" ? "#features" : "/roi-calculator"}>
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-base">
              {mode === "athlete" ? "Explore Athlete Suite" : "Calculate Lost-Member Churn"}
            </Button>
          </Link>
        </div>

        {/* Reassurance Micro-Copy */}
        <div className="mt-4 flex items-center justify-center gap-6 text-xs text-ink-subtle font-mono">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-primary" /> Zero Credit Card Required
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-primary" /> 100% DPDP Act Compliant
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-primary" /> Setup in 15 Minutes
          </span>
        </div>

        {/* Interactive 3D Isometric Preview */}
        <div className="mt-12">
          <IsometricPreview mode={mode} />
        </div>
      </div>
    </section>
  );
}
