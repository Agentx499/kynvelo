"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell,
  Apple,
  QrCode,
  Flame,
  ShieldCheck,
  Building2,
  TrendingUp,
  CreditCard,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  Camera,
  Activity,
  Award,
} from "lucide-react";
import { type AudienceMode } from "./audience-toggle";
import { Badge } from "@/components/ui/badge";

interface FeatureBentoProps {
  mode: AudienceMode;
}

export function FeatureBento({ mode }: FeatureBentoProps) {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">
            COMPREHENSIVE CAPABILITY MATRIX
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">
            {mode === "athlete"
              ? "Everything Lifters Need to Dominate Their Goals"
              : "The Complete Operating System Built for Gym ROI"}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
            {mode === "athlete"
              ? "No artificial paywalls, no clunky separate apps. One unified platform for strength, nutrition, and daily gym check-in."
              : "Eliminate paper registers, recover lost renewals, and automate front-desk turnstiles with zero proprietary hardware lock-in."}
          </p>
        </div>

        {/* Dynamic Bento Cards */}
        <AnimatePresence mode="wait">
          {mode === "athlete" ? (
            /* ATHLETE BENTO GRID */
            <motion.div
              key="athlete-bento"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card 1: Coach (Double Wide) */}
              <div className="md:col-span-2 p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6">
                    <Dumbbell className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" className="mb-2">MODULE 05: COACH</Badge>
                  <h3 className="text-2xl font-bold text-ink">
                    Barbell Set Matrix & Olympic Plate Math
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xl">
                    Log your weights with automated progressive overload cues. The visual barbell sleeve calculator tells you exactly what Olympic plates (20kg, 10kg, 5kg, 2.5kg, 1.25kg) to rack per side without gym-math mental fatigue.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline">
                      <span className="text-primary font-bold">1RM % Tables</span>
                      <p className="text-ink-subtle text-[11px] mt-0.5">RPE 6 to 10 automated load recommendations</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline">
                      <span className="text-primary font-bold">Haptic Rest Timer</span>
                      <p className="text-ink-subtle text-[11px] mt-0.5">Vibrates on wrist & pocket when ready</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline">
                      <span className="text-primary font-bold">Superset Tagging</span>
                      <p className="text-ink-subtle text-[11px] mt-0.5">Warmup, dropset & failure set flags</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-xs text-ink-subtle">
                  <span>Replaces: Hevy Pro & Strong App</span>
                  <span className="text-primary font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free Forever
                  </span>
                </div>
              </div>

              {/* Card 2: Fuel (Single Col) */}
              <div className="p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-6">
                    <Camera className="w-6 h-6" />
                  </div>
                  <Badge variant="warning" className="mb-2">MODULE 04: FUEL</Badge>
                  <h3 className="text-xl font-bold text-ink">
                    Two-Stage Zero-Hallucination AI Food Scan
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    Stage 1 identifies food items from photos. Stage 2 verifies macros strictly against verified USDA & local nutrition databases. No hallucinated calories.
                  </p>

                  <div className="mt-6 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" /> Client-side barcode camera decoder
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" /> Concentric SVG macro progress rings
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-amber-400" /> Meal-prep container batch builder
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline text-xs text-ink-subtle">
                  Replaces: MyFitnessPal Premium
                </div>
              </div>

              {/* Card 3: Vital & Recovery (Single Col) */}
              <div className="p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" className="mb-2 text-cyan-400 border-cyan-400/30">MODULE 10: VITAL</Badge>
                  <h3 className="text-xl font-bold text-ink">
                    Muscle Recovery Heatmap & Apple Health
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    Interactive anatomical body diagram updates in real-time based on your logged volume, showing muscles currently recovering vs ready to train.
                  </p>

                  <div className="mt-6 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 72-Hour systemic recovery estimator
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Daily steps & cardio auto-sync
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" /> 3-Question daily readiness survey
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline text-xs text-ink-subtle">
                  Replaces: Whoop strain & recovery logs
                </div>
              </div>

              {/* Card 4: Rotating QR Check-in (Double Wide) */}
              <div className="md:col-span-2 p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" className="mb-2">MODULE 01: PULSE</Badge>
                  <h3 className="text-2xl font-bold text-ink">
                    15-Second Anti-Screenshot Rotating Turnstile QR
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xl">
                    Touchless turnstile access that prevents buddy-punching. Cryptographic HMAC tokens regenerate every 15 seconds. Works completely offline with cached session buffers if gym WiFi drops.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline flex items-center gap-3">
                      <Flame className="w-5 h-5 text-primary" />
                      <div>
                        <span className="font-bold text-ink">Streak Engine</span>
                        <p className="text-ink-subtle text-[11px]">3 modes: Planned, Weekly & Daily Challenge</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline flex items-center gap-3">
                      <Award className="w-5 h-5 text-primary" />
                      <div>
                        <span className="font-bold text-ink">Trophy Vault</span>
                        <p className="text-ink-subtle text-[11px]">Celebrate 100-day streaks & 100kg bench press</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-xs text-ink-subtle">
                  <span>Seamless Gym PWA Integration</span>
                  <span className="text-primary font-semibold">Zero Turnstile Bottlenecks</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* GYM OWNER BENTO GRID */
            <motion.div
              key="owner-bento"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Card 1: Flow No-Show CRM (Double Wide) */}
              <div className="md:col-span-2 p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-danger/15 text-danger flex items-center justify-center mb-6">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <Badge variant="danger" className="mb-2">MODULE 02: FLOW RETENTION</Badge>
                  <h3 className="text-2xl font-bold text-ink">
                    Autonomous Inactivity Detection at Day 10
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xl">
                    Gyms lose members 10–15 days before renewals fail because absence goes unnoticed. Flow identifies members absent 10–14, 15–21, and 22+ days, providing 1-tap WhatsApp recovery workflows with staff anti-collision locking.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline">
                      <span className="text-danger font-bold">1-Tap WhatsApp</span>
                      <p className="text-ink-subtle text-[11px] mt-0.5">Pre-filled personalized recovery templates</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline">
                      <span className="text-danger font-bold">Anti-Collision Lock</span>
                      <p className="text-ink-subtle text-[11px] mt-0.5">Prevents two trainers texting the same person</p>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline">
                      <span className="text-danger font-bold">Follow-Up Audit</span>
                      <p className="text-ink-subtle text-[11px] mt-0.5">Tracks staff conversion & recovery rates</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-xs text-ink-subtle">
                  <span>Average Gym Recovery: ₹85,000 / month</span>
                  <span className="text-primary font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 50% Re-Engagement Rate
                  </span>
                </div>
              </div>

              {/* Card 2: Turnstile Relay Gateway (Single Col) */}
              <div className="p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-6">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" className="mb-2">MODULE 01: ACCESS</Badge>
                  <h3 className="text-xl font-bold text-ink">
                    Zero-Lock-in Turnstile Gateway
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    Direct local TCP/IP pulse relay to any standard tripod, speed-gate, or optical turnstile. No costly proprietary card readers or biometric lock-in.
                  </p>

                  <div className="mt-6 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Offline PWA fallback buffer
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Sub-50ms scan-to-unlock latency
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Fullscreen reception kiosk mode
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline text-xs text-ink-subtle">
                  Works with standard ₹3,000 IP relay modules
                </div>
              </div>

              {/* Card 3: Pay & GST Billing (Single Col) */}
              <div className="p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center mb-6">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <Badge variant="success" className="mb-2">MODULE 03: PAY</Badge>
                  <h3 className="text-xl font-bold text-ink">
                    Digital UPI & GST Tax Invoicing
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                    Zero paper receipts. Instant digital UPI deep-linking directly into member apps with auto-generated 18% GST invoices and split payment ledger.
                  </p>

                  <div className="mt-6 space-y-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 1-Click CSV export for accountants
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Cash vs UPI daily reconciliation
                    </div>
                    <div className="flex items-center gap-2 text-ink">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Auto webhook payment verification
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline text-xs text-ink-subtle">
                  100% compliant with Indian Tax & GST rules
                </div>
              </div>

              {/* Card 4: White-Label Identity (Double Wide) */}
              <div className="md:col-span-2 p-8 rounded-2xl bg-surface-1 border border-hairline hover:border-primary/40 transition-all flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center mb-6">
                    <Layers className="w-6 h-6" />
                  </div>
                  <Badge variant="primary" className="mb-2 text-purple-400 border-purple-400/30">MODULE 07: WHITE-LABEL</Badge>
                  <h3 className="text-2xl font-bold text-ink">
                    Your Brand, Your App, Your Colors
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed max-w-xl">
                    Members see your gym name, your logo, and your brand theme whenever they open the app. Enterprise customers receive dedicated listings on the Apple App Store and Google Play Store.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <div>
                        <span className="font-bold text-ink">Dynamic CSS Theme Engine</span>
                        <p className="text-ink-subtle text-[11px]">Instant OKLCH brand palette injection</p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-surface-2 border border-hairline flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                      <div>
                        <span className="font-bold text-ink">Strict Tenant Data Isolation</span>
                        <p className="text-ink-subtle text-[11px]">Zero cross-gym member data leakage</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between text-xs text-ink-subtle">
                  <span>Available on Growth & Enterprise Tiers</span>
                  <span className="text-primary font-semibold">Custom App Store Deployments</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
