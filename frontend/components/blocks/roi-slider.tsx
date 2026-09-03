"use client";

import React, { useState } from "react";
import Link from "next/link";
import { TrendingUp, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export function RoiSlider() {
  const [members, setMembers] = useState(450);
  const [monthlyFee, setMonthlyFee] = useState(2500);
  const [churnRate, setChurnRate] = useState(12);

  // Financial Mechanics:
  // Monthly dropping-out members = members * (churnRate / 100)
  // Annual dropped-out revenue = monthly dropping-out members * monthlyFee * 12
  // Kynvelo Flow recovers 50% of at-risk members through early 10-day intervention
  const monthlyAtRisk = Math.round(members * (churnRate / 100));
  const annualLostRevenue = Math.round(monthlyAtRisk * monthlyFee * 12);
  const annualRecoveredRevenue = Math.round(annualLostRevenue * 0.5);
  const kynveloAnnualCost = 5999 * 12; // Growth Tier ₹5,999/mo
  const netRoiMultiple = (annualRecoveredRevenue / kynveloAnnualCost).toFixed(1);

  return (
    <section className="py-20 relative bg-surface-1/40 border-y border-hairline">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" className="mb-3">
            INTERACTIVE REVENUE RECOVERY MODEL
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            How Much Revenue Is Member Inactivity Costing Your Gym?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
            Move the sliders to model your facility’s metrics. See how many annual lakhs are saved when inactivity is detected on Day 10 instead of after the renewal expires.
          </p>
        </div>

        <div className="p-6 sm:p-10 rounded-2xl bg-surface-1 border border-hairline shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Members */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-ink">
                    Active Gym Members
                  </label>
                  <span className="font-mono text-base font-bold text-primary">
                    {members} Members
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={members}
                  onChange={(e) => setMembers(Number(e.target.value))}
                  className="w-full accent-primary bg-surface-3 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-ink-subtle mt-1">
                  <span>50</span>
                  <span>750</span>
                  <span>1,500</span>
                </div>
              </div>

              {/* Slider 2: Monthly Fee */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-ink">
                    Average Monthly Membership Fee
                  </label>
                  <span className="font-mono text-base font-bold text-primary">
                    {formatCurrency(monthlyFee)} / mo
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="8000"
                  step="250"
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(Number(e.target.value))}
                  className="w-full accent-primary bg-surface-3 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-ink-subtle mt-1">
                  <span>₹1,000</span>
                  <span>₹4,500</span>
                  <span>₹8,000</span>
                </div>
              </div>

              {/* Slider 3: Churn Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-ink flex items-center gap-1.5">
                    Estimated Monthly Dropout Rate
                    <span title="Typical fitness industry average is 10% to 15% monthly inactive rate">
                      <HelpCircle className="w-3.5 h-3.5 text-ink-subtle cursor-help" />
                    </span>
                  </label>
                  <span className="font-mono text-base font-bold text-danger">
                    {churnRate}% / month
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="25"
                  step="1"
                  value={churnRate}
                  onChange={(e) => setChurnRate(Number(e.target.value))}
                  className="w-full accent-danger bg-surface-3 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[11px] font-mono text-ink-subtle mt-1">
                  <span>5% (Best in Class)</span>
                  <span>12% (Average)</span>
                  <span>25% (Critical)</span>
                </div>
              </div>
            </div>

            {/* Right Output Card (5 cols) */}
            <div className="lg:col-span-5 p-6 rounded-xl bg-surface-2 border border-hairline-strong space-y-6">
              <div>
                <span className="text-xs font-mono text-danger uppercase tracking-wider block mb-1">
                  Annual Revenue Lost to Inactivity
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-danger font-mono">
                  {formatCurrency(annualLostRevenue)}
                </div>
                <p className="text-xs text-ink-subtle mt-1">
                  ≈ {monthlyAtRisk} members quietly drop out every 30 days
                </p>
              </div>

              <div className="pt-4 border-t border-hairline">
                <span className="text-xs font-mono text-primary uppercase tracking-wider block mb-1">
                  Projected Revenue Recovered (Flow CRM)
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-primary font-mono flex items-center gap-2">
                  {formatCurrency(annualRecoveredRevenue)}
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
                  Assuming conservative 50% re-engagement from Day 10 automated WhatsApp outreach.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs font-mono flex items-center justify-between">
                <span className="text-ink">Net Software ROI Multiple:</span>
                <span className="text-primary font-bold text-sm">{netRoiMultiple}x Return</span>
              </div>

              <Link href="/signup" className="block">
                <Button variant="primary" className="w-full gap-2">
                  <span>Stop The Leak — Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
