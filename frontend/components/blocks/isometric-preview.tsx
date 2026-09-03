"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
  Sparkles,
  Award,
} from "lucide-react";
import { type AudienceMode } from "./audience-toggle";
import { Badge } from "@/components/ui/badge";

interface IsometricPreviewProps {
  mode: AudienceMode;
}

export function IsometricPreview({ mode }: IsometricPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values for spatial 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for natural tactile feel
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Map mouse coordinates to 3D rotation angles
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [14, 2]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-5xl mx-auto py-8 select-none"
    >
      {/* 3D Holographic Cyber Grid Backdrop */}
      <div className="absolute inset-0 -z-20 flex items-center justify-center pointer-events-none overflow-hidden opacity-40">
        <div className="w-[120%] h-[120%] bg-[linear-gradient(to_right,rgba(198,255,0,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(198,255,0,0.07)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(600px)_rotateX(60deg)_translateY(50px)]" />
      </div>

      {/* Radial Kinetic Backlight Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-primary/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* 3D Perspective Stage */}
      <div className="relative [perspective:1400px]">
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full rounded-2xl border border-hairline-strong bg-surface-1/90 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(198,255,0,0.15)] backdrop-blur-xl overflow-visible transition-shadow duration-300"
        >
          {/* Spatial Floating 3D Badge (Z-Depth Parallax) */}
          <motion.div
            style={{ transform: "translateZ(45px)" }}
            className="absolute -top-4 right-8 z-30 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2/95 border border-primary/40 shadow-[0_10px_25px_rgba(0,0,0,0.5),0_0_15px_rgba(198,255,0,0.3)] backdrop-blur-md font-mono text-xs text-ink"
          >
            {mode === "athlete" ? (
              <>
                <Award className="w-3.5 h-3.5 text-primary animate-pulse" />
                <span className="font-bold text-primary">+2.5kg PR Logged</span>
                <span className="text-ink-subtle">| 110kg 1RM</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold text-emerald-400">Turnstile #1: GRANTED</span>
                <span className="text-ink-subtle">| 300ms Pulse</span>
              </>
            )}
          </motion.div>

          {/* Spatial Floating 3D Telemetry (Left Z-Depth Parallax) */}
          <motion.div
            style={{ transform: "translateZ(40px)" }}
            className="absolute -bottom-4 left-8 z-30 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2/95 border border-hairline shadow-[0_10px_25px_rgba(0,0,0,0.5)] backdrop-blur-md font-mono text-xs text-ink"
          >
            {mode === "athlete" ? (
              <>
                <Flame className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-ink">5-Day Active Streak</span>
                <span className="text-primary font-bold">● LIVE</span>
              </>
            ) : (
              <>
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span className="font-bold text-ink">₹1,84,000 Churn Prevented</span>
                <span className="text-primary font-bold">● 94% RATE</span>
              </>
            )}
          </motion.div>

          {/* Flight-Deck Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-hairline bg-surface-2/70 rounded-t-2xl">
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
                        { set: 1, prev: "80kg × 10", kg: "82.5", reps: "10", done: true },
                        { set: 2, prev: "80kg × 8", kg: "82.5", reps: "8", done: true },
                        { set: 3, prev: "80kg × 8", kg: "82.5", reps: "8", done: false },
                      ].map((s) => (
                        <div
                          key={s.set}
                          className={`grid grid-cols-12 items-center px-3 py-2.5 rounded-lg border transition-all ${
                            s.done
                              ? "bg-primary/5 border-primary/30 text-ink"
                              : "bg-surface-2 border-hairline text-ink-muted"
                          }`}
                        >
                          <span className="col-span-2 font-bold text-ink">{s.set}</span>
                          <span className="col-span-4 text-ink-subtle">{s.prev}</span>
                          <span className="col-span-3 font-bold text-primary">{s.kg}</span>
                          <span className="col-span-2">{s.reps}</span>
                          <span className="col-span-1 flex justify-center">
                            {s.done ? (
                              <CheckCircle2 className="w-4 h-4 text-primary" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-hairline-strong" />
                            )}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Barbell Plate Math Pill */}
                    <div className="p-3 rounded-xl bg-surface-2 border border-hairline flex items-center justify-between text-xs font-mono">
                      <span className="text-ink-subtle">Rack per side (20kg bar):</span>
                      <div className="flex gap-1">
                        <span className="px-2 py-0.5 rounded bg-surface-3 text-primary border border-hairline font-bold">
                          1 × 25kg
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-3 text-primary border border-hairline font-bold">
                          1 × 5kg
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-3 text-primary border border-hairline font-bold">
                          1 × 1.25kg
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Rotating Access Pass & Nutrition (5 cols) */}
                  <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                    {/* Rotating QR Turnstile Pass */}
                    <div className="p-5 rounded-xl bg-surface-2 border border-hairline space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-primary flex items-center gap-1">
                          <QrCode className="w-3.5 h-3.5" /> DYNAMIC ACCESS PASS
                        </span>
                        <Badge variant="primary" className="text-[10px]">15s ROTATING</Badge>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-lg p-1.5 flex items-center justify-center shrink-0 shadow-inner">
                          <QrCode className="w-full h-full text-black" />
                        </div>
                        <div className="space-y-1 font-mono text-xs">
                          <span className="font-bold text-ink block">Olympic Gym Main</span>
                          <span className="text-ink-subtle text-[11px] block">
                            Gold Annual Member
                          </span>
                          <span className="text-primary text-[10px] block animate-pulse">
                            ● Verified HMAC Token
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Concentric Macro Progress */}
                    <div className="p-5 rounded-xl bg-surface-2 border border-hairline space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-ink-subtle">NUTRITION TARGETS</span>
                        <span className="text-primary font-bold">1,840 / 2,400 kcal</span>
                      </div>

                      <div className="space-y-2 font-mono text-xs">
                        <div>
                          <div className="flex justify-between text-ink-subtle text-[11px] mb-1">
                            <span>Protein (142g / 160g)</span>
                            <span className="text-primary font-bold">89%</span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full w-[89%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-ink-subtle text-[11px] mb-1">
                            <span>Carbohydrates (185g / 220g)</span>
                            <span className="text-cyan-400 font-bold">84%</span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-400 rounded-full w-[84%]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* GYM OWNER OPERATIONS SURFACE */
                <motion.div
                  key="owner-surface"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6"
                >
                  {/* Real-time Reception Turnstile Stream (7 cols) */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-primary flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" /> RECEPTION KIOSK
                        </span>
                        <h4 className="text-lg font-bold text-ink mt-0.5">
                          Turnstile Relay Stream
                        </h4>
                        <p className="text-xs text-ink-muted">
                          TCP/IP Hardware Controller: Gate 01 & Gate 02 Online
                        </p>
                      </div>
                      <Badge variant="primary" className="text-xs font-mono">
                        382 ENTRIES TODAY
                      </Badge>
                    </div>

                    {/* Live Check-In Rows */}
                    <div className="space-y-2 font-mono text-xs">
                      {[
                        {
                          name: "Rahul Sharma",
                          plan: "Gold Annual Pass",
                          gate: "Gate 01 (Turnstile)",
                          status: "GRANTED",
                          time: "10:42:15 AM",
                        },
                        {
                          name: "Priya Patel",
                          plan: "Monthly Morning Pass",
                          gate: "Gate 02 (Cardio Deck)",
                          status: "GRANTED",
                          time: "10:39:02 AM",
                        },
                        {
                          name: "Amit Roy",
                          plan: "Pass Expired (4d ago)",
                          gate: "Gate 01 (Turnstile)",
                          status: "DENIED",
                          time: "10:35:48 AM",
                        },
                      ].map((entry, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center justify-between px-3.5 py-3 rounded-lg border transition-all ${
                            entry.status === "GRANTED"
                              ? "bg-surface-2 border-hairline"
                              : "bg-danger/10 border-danger/30 text-danger"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                entry.status === "GRANTED" ? "bg-primary" : "bg-danger"
                              }`}
                            />
                            <div>
                              <span className="font-bold text-ink block font-sans">
                                {entry.name}
                              </span>
                              <span className="text-ink-subtle text-[11px]">
                                {entry.plan} • {entry.gate}
                              </span>
                            </div>
                          </div>

                          <div className="text-right">
                            <span
                              className={`font-bold ${
                                entry.status === "GRANTED"
                                  ? "text-primary"
                                  : "text-danger"
                              }`}
                            >
                              {entry.status}
                            </span>
                            <span className="text-ink-subtle text-[10px] block">
                              {entry.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-surface-2 border border-hairline flex items-center justify-between text-xs font-mono">
                      <span className="text-ink-subtle">Anti-Passback Lockout:</span>
                      <span className="text-emerald-400 font-bold">10-Min Window Enforced</span>
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
