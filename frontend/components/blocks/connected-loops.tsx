"use client";

import React, { useState } from "react";
import {
  QrCode,
  ShieldCheck,
  Dumbbell,
  Award,
  AlertTriangle,
  MessageSquare,
  CreditCard,
  Receipt,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ConnectedLoops() {
  const [activeLoop, setActiveLoop] = useState(0);

  const loops = [
    {
      id: "loop-1",
      number: "01",
      title: "Zero-Loss Turnstile Access Loop",
      tag: "HARDWARE & SECURITY",
      badgeColor: "text-primary",
      summary:
        "Member arrives with dynamic 15s rotating HMAC QR. Turnstile TCP/IP relay pulses in 300ms. Anti-passback locks duplicate entry. Owner receives 100% verified attendance.",
      athleteStep: "Generates 15s rotating cryptographic QR on phone. Works offline.",
      turnstileStep: "Optical scanner verifies HMAC; dry-contact relay triggers 300ms barrier pulse.",
      ownerStep: "Real-time reception stream updates; anti-passback 10-min lockout enforced.",
    },
    {
      id: "loop-2",
      number: "02",
      title: "Progressive Hypertrophy & Coaching Loop",
      tag: "ATHLETIC PERFORMANCE",
      badgeColor: "text-cyan-400",
      summary:
        "Lifters log bench press and squat with Olympic plate math. Gym leaderboard dynamically updates. PT coaches identify plateaus and recommend tailored training programs.",
      athleteStep: "Logs sets with 0.5kg precision, receives Olympic barbell plate calculation.",
      turnstileStep: "Volume & tonnage aggregate to gym workout telemetry and recovery heatmap.",
      ownerStep: "PT trainers review member fatigue; sell 12-session transformation packages.",
    },
    {
      id: "loop-3",
      number: "03",
      title: "Automated No-Show Retention Loop (Red-List)",
      tag: "CHURN PREVENTION",
      badgeColor: "text-danger",
      summary:
        "Members inactive for 10+ days trigger Red-List CRM alerts. Staff anti-collision locks prevent double-outreach. 1-Tap WhatsApp messages recover 62% before dropout.",
      athleteStep: "Member pauses routine due to travel, illness, or loss of motivation.",
      turnstileStep: "Flow engine tracks zero scans for 10 consecutive days and assigns risk score.",
      ownerStep: "Owner/Trainer taps 1-tap WhatsApp deep link; member renews with zero awkwardness.",
    },
    {
      id: "loop-4",
      number: "04",
      title: "Self-Service UPI & 18% GST Reconciliation Loop",
      tag: "FINANCIAL COMPLIANCE",
      badgeColor: "text-emerald-400",
      summary:
        "Member renews membership in 1 tap via instant UPI. Webhook verifies payment immediately. GST-compliant Tax Invoice (SAC 999723) generated for gym accountant.",
      athleteStep: "Chooses 1, 3, 6, or 12-month pass; pays via GPay, PhonePe, or Paytm.",
      turnstileStep: "Instant webhook extends turnstile authorization date automatically.",
      ownerStep: "Daily Cash vs UPI ledger reconciles; automated 18% GST return JSON exported.",
    },
  ];

  return (
    <section id="loops" className="py-24 relative overflow-hidden">
      {/* Ambient Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
            THE CONNECTED PLATFORM ARCHITECTURE
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            How Member Training Directly Drives <br className="hidden sm:inline" />
            <span className="text-primary font-mono">Gym Profitability & Retention</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Kynvelo is not two disconnected apps. It is a single, closed-loop operating system where every rep logged on the gym floor directly fuels business operations and revenue recovery.
          </p>
        </div>

        {/* Loop Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {loops.map((loop, idx) => (
            <button
              key={loop.id}
              type="button"
              onClick={() => setActiveLoop(idx)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                activeLoop === idx
                  ? "bg-surface-2 border-primary/60 shadow-[0_0_20px_rgba(198,255,0,0.15)]"
                  : "bg-surface-1/60 border-white/[0.08] hover:border-white/20 hover:bg-surface-2/60"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xl font-bold text-ink-subtle">
                  {loop.number}
                </span>
                <span className={`text-[10px] font-mono font-bold ${loop.badgeColor}`}>
                  {loop.tag}
                </span>
              </div>
              <h3 className="font-bold text-sm text-ink line-clamp-1">{loop.title}</h3>
            </button>
          ))}
        </div>

        {/* Active Loop Visual Diagram */}
        <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl relative overflow-hidden border border-white/10">
          <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-between">
            {/* Step 1: Athlete Action */}
            <div className="flex-1 glass-panel p-6 rounded-2xl space-y-4 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-bold">STEP 01</span>
                <Dumbbell className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-base font-bold text-ink">Member On Floor</h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {loops[activeLoop].athleteStep}
              </p>
            </div>

            {/* Arrow Divider */}
            <div className="hidden lg:flex items-center justify-center text-primary/60">
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>

            {/* Step 2: System & Hardware Relay */}
            <div className="flex-1 glass-panel p-6 rounded-2xl space-y-4 border border-primary/30 bg-primary/[0.03]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-bold">STEP 02</span>
                <ShieldCheck className="w-4 h-4 text-primary" />
              </div>
              <h4 className="text-base font-bold text-ink">Turnstile Relay & Telemetry</h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {loops[activeLoop].turnstileStep}
              </p>
            </div>

            {/* Arrow Divider */}
            <div className="hidden lg:flex items-center justify-center text-primary/60">
              <ArrowRight className="w-6 h-6 animate-pulse" />
            </div>

            {/* Step 3: Gym Owner Business Impact */}
            <div className="flex-1 glass-panel p-6 rounded-2xl space-y-4 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-bold">STEP 03</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
              <h4 className="text-base font-bold text-ink">Gym Owner Business Result</h4>
              <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                {loops[activeLoop].ownerStep}
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs font-mono text-ink-subtle">
            <span>
              ● Invariant: Zero operational data is siloed. Lifter motivation drives club profitability.
            </span>
            <span className="text-primary font-bold">
              Kynvelo Loop Automation Active
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
