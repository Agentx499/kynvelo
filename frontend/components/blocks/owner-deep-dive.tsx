"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Monitor,
  AlertTriangle,
  Lock,
  MessageSquare,
  CreditCard,
  Palette,
  ArrowRight,
  CheckCircle2,
  Zap,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function OwnerDeepDive() {
  return (
    <section id="gym-owners" className="py-24 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[300px] bg-primary/10 blur-[130px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
            GYM OWNER & ENTERPRISE COMMAND CENTER
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
            Stop Member Churn. <br />
            <span className="text-primary font-mono">Automate Turnstiles & Recover ₹68,000/mo.</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
            Gyms bleed up to 40% of their annual renewals because members stop attending for 10 days and drop out silently. Kynvelo’s Flow retention engine detects absences before renewal deadlines, equipping front desk staff with 1-tap WhatsApp outreach and turnstile gate automation.
          </p>
        </div>

        {/* 4 Feature Bento Pillars for Gym Owners */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Pillar 1: No-Show Red-List Retention CRM (7 cols) */}
          <div className="md:col-span-7 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-danger font-bold">
                <AlertTriangle className="w-4 h-4" /> FLOW RETENTION ENGINE
              </div>
              <Badge variant="danger" className="text-[10px]">RECOVERS 62% CHURN</Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-ink">
                No-Show Red-List CRM with 1-Tap WhatsApp
              </h3>
              <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                Categorizes members inactive for 10–14 days (early risk), 15–21 days (moderate risk), and 22+ days (critical churn). Pre-populates personalized WhatsApp messages to re-engage members before their pass expires.
              </p>
            </div>

            {/* Simulated Live CRM Table */}
            <div className="p-4 rounded-2xl bg-surface-1 border border-hairline space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-ink-subtle pb-2 border-b border-hairline">
                <span>MEMBER AT RISK</span>
                <span>DAYS ABSENT</span>
                <span className="text-right">ONE-TAP ACTION</span>
              </div>

              <div className="flex items-center justify-between py-2 border-b border-hairline/60">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink">Vikram Singh</span>
                  <span className="text-[10px] text-warning flex items-center gap-0.5">
                    <Lock className="w-3 h-3" /> Locked (Coach Dev)
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-danger/20 text-danger font-bold">
                  14 Days
                </span>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3 h-3" /> WhatsApp
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink">Anita Desai</span>
                  <span className="text-[10px] text-ink-subtle">Annual Member</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 font-bold">
                  11 Days
                </span>
                <button
                  type="button"
                  className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                >
                  <MessageSquare className="w-3 h-3" /> WhatsApp
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-ink-subtle">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>15-Minute Staff Anti-Collision Locks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>Outcome Logging (Injured, Travelling, Resume)</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Turnstile TCP/IP Controller & Reception Kiosk (5 cols) */}
          <div className="md:col-span-5 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-primary font-bold">
                  <Monitor className="w-4 h-4" /> RECEPTION TERMINAL
                </div>
                <Badge variant="primary" className="text-[10px]">UNIVERSAL TCP/IP</Badge>
              </div>

              <h3 className="text-2xl font-bold text-ink">
                Universal Turnstile Kiosk & Assisted Audit
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Connects directly to any turnstile hardware (ZKTeco, Hikvision, eSSL) via standard 300ms dry-contact TCP/IP relay. If a member forgets their phone, staff assisted entry requires a mandatory justification reason logged for auditing.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs space-y-2">
              <div className="flex justify-between text-ink-subtle">
                <span>Relay Response Time:</span>
                <span className="text-emerald-400 font-bold">24ms (Instant)</span>
              </div>
              <div className="flex justify-between text-ink-subtle">
                <span>Anti-Passback Lockout:</span>
                <span className="text-ink">10 Minutes Enforced</span>
              </div>
              <div className="flex justify-between text-ink-subtle">
                <span>Offline SQLite Buffer:</span>
                <span className="text-primary font-bold">Zero Data Loss</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Billing Reconciliation & 18% GST Ledger (5 cols) */}
          <div className="md:col-span-5 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-bold">
                  <CreditCard className="w-4 h-4" /> GST LEDGER & BILLING
                </div>
                <Badge variant="secondary" className="text-[10px] text-emerald-400 font-mono">
                  SAC 999723
                </Badge>
              </div>

              <h3 className="text-2xl font-bold text-ink">
                Automated 18% GST Invoicing & T+1 Settlement
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Reconciles daily cash collections against UPI digital payments. Automatically separates 9% CGST and 9% SGST with ready-to-file monthly JSON exports for your Chartered Accountant.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-surface-1 border border-hairline font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-ink-subtle">
                <span>SAC Code:</span>
                <span className="text-ink font-bold">999723 (Fitness Services)</span>
              </div>
              <div className="flex justify-between text-ink-subtle">
                <span>Settlement Speed:</span>
                <span className="text-primary font-bold">Direct to Bank (T+1)</span>
              </div>
              <div className="flex justify-between text-ink-subtle">
                <span>Invoice Format:</span>
                <span className="text-ink">Automated PDF & CSV</span>
              </div>
            </div>
          </div>

          {/* Pillar 4: White-Label Branding Studio (7 cols) */}
          <div className="md:col-span-7 glass-panel-elevated p-8 rounded-3xl space-y-6 border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-purple-400 font-bold">
                <Palette className="w-4 h-4" /> WHITE-LABEL THEMER
              </div>
              <Badge variant="secondary" className="text-[10px] text-purple-400 font-mono">
                YOUR BRAND FIRST
              </Badge>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-ink">
                Your Gym’s Name & Colors on Every Member Phone
              </h3>
              <p className="text-sm text-ink-muted mt-1 leading-relaxed">
                Never promote third-party aggregators. Members see your gym name, your logo, and your brand color scheme across their daily turnstile passes and workout tracking screens.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-surface-1 border border-primary/40 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#C6FF00]" />
                <span className="font-bold text-ink">Kinetic Volt</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-1 border border-hairline flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00F0FF]" />
                <span className="text-ink-muted">Cyan Precision</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-1 border border-hairline flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-ink-muted">Emerald Power</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-1 border border-hairline flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="text-ink-muted">Amber Solar</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-surface-2 to-surface-1 border border-hairline flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <h4 className="text-xl font-bold text-ink">
              Ready to modernize your reception and stop member drop-out?
            </h4>
            <p className="text-xs text-ink-muted mt-1 font-mono">
              Open the Reception Turnstile Kiosk Terminal or schedule an on-site hardware consultation.
            </p>
          </div>
          <Link href="/admin/terminal">
            <Button variant="primary" className="text-xs font-bold gap-2">
              <span>Launch Turnstile Kiosk</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
