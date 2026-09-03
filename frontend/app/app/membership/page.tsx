"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  CheckCircle2,
  Download,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { MobileShell } from "@/components/member/mobile-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState<number>(12); // 12 months
  const [paid, setPaid] = useState(false);

  const plans = [
    { months: 1, base: 2800, discount: 0, tag: "MONTH-TO-MONTH" },
    { months: 3, base: 7500, discount: 10, tag: "POPULAR" },
    { months: 6, base: 13500, discount: 20, tag: "SAVE 20%" },
    { months: 12, base: 22000, discount: 35, tag: "BEST VALUE" },
  ];

  const current = plans.find((p) => p.months === selectedPlan)!;
  const gst = Math.round(current.base * 0.18);
  const total = current.base + gst;

  const handleSimulatePayment = () => {
    setPaid(true);
  };

  return (
    <MobileShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-ink">Membership & Renewals</h1>
          <p className="text-xs text-ink-muted">Self-service zero-friction checkout</p>
        </div>

        {!paid ? (
          <div className="space-y-5">
            {/* Current Pass Card */}
            <div className="p-4 rounded-xl bg-surface-2 border border-hairline flex justify-between items-center">
              <div>
                <span className="text-xs font-mono text-ink-subtle uppercase block">CURRENT STATUS</span>
                <span className="text-sm font-bold text-ink">Gold Annual Membership</span>
                <p className="text-xs text-warning mt-0.5 font-mono">24 Days Remaining (Renews Nov 2026)</p>
              </div>
              <Badge variant="warning">RENEW NOW</Badge>
            </div>

            {/* Plan Duration Selector */}
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-ink-subtle uppercase tracking-wider block">
                SELECT EXTENSION DURATION
              </span>

              <div className="space-y-2.5">
                {plans.map((p) => (
                  <div
                    key={p.months}
                    onClick={() => setSelectedPlan(p.months)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                      selectedPlan === p.months
                        ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(198,255,0,0.15)]"
                        : "bg-surface-2 border-hairline hover:border-hairline-strong"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-ink">{p.months} Months Pass</span>
                        <Badge variant={p.months === 12 ? "primary" : "secondary"} className="text-[10px]">
                          {p.tag}
                        </Badge>
                      </div>
                      <span className="text-xs font-mono text-ink-subtle mt-0.5 block">
                        Olympic Gym Main Floor + Steam
                      </span>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-sm font-bold text-primary block">
                        {formatCurrency(p.base)}
                      </span>
                      <span className="text-[10px] text-ink-subtle">+18% GST</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="p-4 rounded-xl bg-surface-2 border border-hairline space-y-2 font-mono text-xs">
              <div className="flex justify-between text-ink-muted">
                <span>Base Membership Fee:</span>
                <span>{formatCurrency(current.base)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>18% Indian GST (CGST + SGST):</span>
                <span>{formatCurrency(gst)}</span>
              </div>
              <div className="pt-2 border-t border-hairline flex justify-between text-ink font-bold text-sm">
                <span>Total Payable:</span>
                <span className="text-primary">{formatCurrency(total)}</span>
              </div>
            </div>

            {/* Payment CTA */}
            <Button
              variant="primary"
              className="w-full py-6 text-base gap-2"
              onClick={handleSimulatePayment}
            >
              <span>Pay with Instant UPI</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          /* Payment Success & Receipt */
          <div className="p-6 rounded-2xl bg-surface-2 border border-primary/40 text-center space-y-5 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-primary/20 text-primary flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <Badge variant="primary" className="mb-2">PAYMENT CONFIRMED</Badge>
              <h3 className="text-xl font-bold text-ink">Membership Extended!</h3>
              <p className="text-xs text-ink-muted mt-1 font-mono">
                Your pass has been renewed for {current.months} months. Turnstile access is active.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-surface-3/80 border border-hairline font-mono text-xs space-y-1.5 text-left">
              <div className="flex justify-between">
                <span className="text-ink-subtle">INVOICE NUMBER:</span>
                <span className="text-ink font-bold">INV-KYN-2026-9842</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-subtle">AMOUNT PAID:</span>
                <span className="text-primary font-bold">{formatCurrency(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-subtle">SAC CODE:</span>
                <span className="text-ink">999723 (Fitness Services)</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full text-xs gap-1.5 font-mono"
                onClick={() => alert("Downloading GST Tax Invoice (PDF)...")}
              >
                <Download className="w-3.5 h-3.5" /> Download Tax Invoice (PDF)
              </Button>

              <Link href="/app/pulse" className="block">
                <Button variant="primary" className="w-full text-xs">
                  Return to Daily Pulse
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </MobileShell>
  );
}
