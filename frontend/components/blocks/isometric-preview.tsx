"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Flame,
  QrCode,
  Dumbbell,
  Building2,
  TrendingUp,
  MessageSquare,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { type AudienceMode } from "./audience-toggle";
import { Badge } from "@/components/ui/badge";

interface IsometricPreviewProps {
  mode: AudienceMode;
}

export function IsometricPreview({ mode }: IsometricPreviewProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Radial Kinetic Backlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-primary/15 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* 3D Perspective Stage */}
      <div className="relative [perspective:1400px]">
        <motion.div
          animate={{
            rotateX: 8,
            rotateY: -4,
            rotateZ: 0.5,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="relative w-full rounded-2xl border border-hairline-strong bg-surface-1/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7),0_0_30px_rgba(198,255,0,0.1)] backdrop-blur-xl overflow-hidden"
        >
          {/* Flight-Deck Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-surface-2/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-danger/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-2 font-mono text-xs text-ink-subtle">
                {mode === "athlete"
                  ? "kynvelo.app/active-session (Athlete Flight-Deck)"
                  : "kynvelo.os/reception-terminal (Turnstile Kiosk)"}
              </span>
            </div>
            <Badge variant="primary" className="gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              LIVE TELEMETRY
            </Badge>
          </div>

          {/* Dynamic Interactive Body */}
          <div className="p-6 sm:p-8 min-h-[440px]">
            <AnimatePresence mode="wait">
              {mode === "athlete" ? (
                /* ATHLETE FLIGHT-DECK SURFACE */
                <motion.div
                  key="athlete-surface"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >
                  {/* Main Set/Rep Matrix (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-primary flex items-center gap-1">
                          <Dumbbell className="w-3.5 h-3.5" /> STRENGTH MATRIX
                        </span>
                        <h4 className="text-lg font-bold text-ink mt-0.5">
                          Barbell Bench Press
                        </h4>
                        <p className="text-xs text-ink-muted">
                          Target: Progressive Overload (+2.5 kg vs last session)
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs text-ink-subtle">REST TIMER</span>
                        <div className="font-mono text-base font-bold text-primary">
                          01:15
                        </div>
                      </div>
                    </div>

                    {/* Set Rows */}
                    <div className="space-y-2 font-mono text-xs">
                      <div className="grid grid-cols-12 text-ink-subtle px-3 py-1 bg-surface-2/50 rounded">
                        <span className="col-span-2">SET</span>
                        <span className="col-span-4">PREVIOUS</span>
                        <span className="col-span-3">KG</span>
                        <span className="col-span-2">REPS</span>
                        <span className="col-span-1 text-center">DONE</span>
                      </div>

                      {[
                        { set: "1", prev: "80kg × 10", kg: "82.5", reps: "10", done: true },
                        { set: "2", prev: "80kg × 8", kg: "82.5", reps: "8", done: true },
                        { set: "3", prev: "80kg × 8", kg: "82.5", reps: "8", done: true },
                        { set: "4", prev: "80kg × 6", kg: "82.5", reps: "6", done: false },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className={`grid grid-cols-12 items-center px-3 py-2 rounded-lg border transition-all ${
                            item.done
                              ? "bg-primary/5 border-primary/20 text-ink"
                              : "bg-surface-2 border-hairline text-ink-muted"
                          }`}
                        >
                          <span className="col-span-2 font-bold text-ink">{item.set}</span>
                          <span className="col-span-4 text-ink-subtle">{item.prev}</span>
                          <span className="col-span-3 font-semibold text-primary">
                            {item.kg} kg
                          </span>
                          <span className="col-span-2 font-semibold text-ink">
                            {item.reps}
                          </span>
                          <span className="col-span-1 flex justify-center">
                            {item.done ? (
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            ) : (
                              <div className="w-4 h-4 rounded border border-hairline-strong" />
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Barbell Plate Sleeve Visualizer */}
                    <div className="p-3 rounded-lg bg-surface-2/80 border border-hairline flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-ink-muted font-mono">Barbell Plates (82.5kg):</span>
                        <div className="flex gap-1 font-mono text-[10px] font-bold">
                          <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/40">20kg</span>
                          <span className="px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 border border-green-500/40">10kg</span>
                          <span className="px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/40">1.25kg</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-ink-subtle">Per Side (20kg Bar)</span>
                    </div>
                  </div>

                  {/* Concentric Macro Rings & Streaks (5 cols) */}
                  <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                    <div className="p-5 rounded-xl bg-surface-2 border border-hairline space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-ink-subtle">FUEL TELEMETRY</span>
                        <Badge variant="primary" className="text-[10px]">2-STAGE AI</Badge>
                      </div>

                      {/* Calorie Progress Ring Mockup */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="var(--kynvelo-hairline)"
                              strokeWidth="8"
                              fill="none"
                            />
                            <circle
                              cx="48"
                              cy="48"
                              r="40"
                              stroke="var(--kynvelo-primary)"
                              strokeWidth="8"
                              strokeDasharray="251"
                              strokeDashoffset="60"
                              strokeLinecap="round"
                              fill="none"
                            />
                          </svg>
                          <div className="absolute text-center">
                            <span className="font-mono text-sm font-bold text-ink">1,840</span>
                            <span className="block text-[9px] text-ink-subtle">/ 2,400</span>
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs font-mono flex-1">
                          <div className="flex justify-between">
                            <span className="text-cyan-400">Protein</span>
                            <span className="text-ink font-bold">142g / 160g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-amber-400">Carbs</span>
                            <span className="text-ink font-bold">185g / 220g</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-rose-400">Fats</span>
                            <span className="text-ink font-bold">54g / 70g</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Streak Card */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-surface-2 border border-primary/30 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                          <Flame className="w-6 h-6" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-ink">5-Day Visit Streak</h5>
                          <p className="text-xs text-ink-muted">Personal record: 14 days</p>
                        </div>
                      </div>
                      <Badge variant="primary">ON TRACK</Badge>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* GYM OWNER ENTERPRISE RECEPTION SURFACE */
                <motion.div
                  key="owner-surface"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >
                  {/* Live Turnstile Stream (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-primary flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" /> ACCESS GATEWAY
                        </span>
                        <h4 className="text-lg font-bold text-ink mt-0.5">
                          Turnstile Gate 01 (Reception)
                        </h4>
                        <p className="text-xs text-ink-muted">
                          TCP/IP Hardware Relay Status: Connected & Pulsing
                        </p>
                      </div>
                      <Badge variant="success" className="gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" /> REVENUE PROTECTED
                      </Badge>
                    </div>

                    {/* Real-Time Access Log Feed */}
                    <div className="space-y-2.5">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
                            RS
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-ink">Rahul Sharma</span>
                              <Badge variant="primary" className="text-[10px]">GOLD ANNUAL</Badge>
                            </div>
                            <span className="text-xs font-mono text-ink-muted">
                              10:42:15 AM • QR Token Verified
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs font-bold text-primary flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> ACCESS GRANTED
                        </span>
                      </div>

                      <div className="p-3 rounded-lg bg-surface-2 border border-hairline flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-surface-3 text-ink-muted font-bold flex items-center justify-center text-xs">
                            PP
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm text-ink">Priya Patel</span>
                              <span className="text-xs text-ink-subtle">Morning Pass</span>
                            </div>
                            <span className="text-xs font-mono text-ink-muted">
                              10:39:02 AM • Gate 02 (Cardio Deck)
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-primary flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> ACCESS GRANTED
                        </span>
                      </div>
                    </div>

                    {/* Turnstile Offline Resilience Indicator */}
                    <div className="p-3 rounded-lg bg-surface-2/60 border border-hairline flex items-center justify-between text-xs font-mono">
                      <span className="text-ink-muted flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary" /> Offline Buffer: 0 pending scans
                      </span>
                      <span className="text-ink-subtle">Latency: 28ms</span>
                    </div>
                  </div>

                  {/* No-Show Red-List CRM Card (5 cols) */}
                  <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                    <div className="p-5 rounded-xl bg-surface-2 border border-hairline space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-danger flex items-center gap-1">
                          ● FLOW RETENTION ENGINE
                        </span>
                        <Badge variant="danger" className="text-[10px]">24 RED-LISTED</Badge>
                      </div>

                      <div>
                        <h5 className="font-bold text-sm text-ink">
                          ₹68,000 Renewal Value at Risk
                        </h5>
                        <p className="text-xs text-ink-muted mt-1">
                          Members inactive for 10+ consecutive days. Recover before month-end drop-out.
                        </p>
                      </div>

                      {/* Member Case Preview */}
                      <div className="p-3 rounded-lg bg-surface-3/80 border border-hairline-strong space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-ink">Vikram Singh</span>
                          <span className="font-mono text-danger font-bold">14 Days Absent</span>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            className="flex-1 py-1.5 px-2 rounded bg-primary text-on-primary font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer hover:bg-primary-hover shadow-sm"
                          >
                            <MessageSquare className="w-3 h-3" /> 1-Tap WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Revenue Metric Widget */}
                    <div className="p-4 rounded-xl bg-gradient-to-br from-surface-2 to-surface-1 border border-hairline flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-mono text-ink-subtle">RECOVERED THIS MONTH</span>
                        <div className="font-mono text-lg font-bold text-primary flex items-center gap-1 mt-0.5">
                          ₹1,84,000 <TrendingUp className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                      <span className="text-xs text-ink-muted">18 Members Saved</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
