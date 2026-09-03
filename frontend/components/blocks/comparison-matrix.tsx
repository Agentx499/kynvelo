"use client";

import React from "react";
import { Check, X, ShieldAlert, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function ComparisonMatrix() {
  const comparisons = [
    {
      category: "Turnstile Hardware Access",
      traditional: "Clunky biometric fingerprint sensors that fail on sweaty hands; mechanical counters with no logs.",
      kynvelo: "15s Dynamic Rotating HMAC QR + TCP/IP 300ms dry contact relay. Zero physical contact, 100% reliable.",
    },
    {
      category: "Front-Desk Assisted Entry",
      traditional: "Reception staff buzz anyone in manually. No audit logs, creating rampant buddy check-ins and revenue theft.",
      kynvelo: "Mandatory staff justification logging enforced on every manual override with staff ID accountability.",
    },
    {
      category: "Member Workout Tracking",
      traditional: "Paper logbooks or generic apps pushing $99/yr paywalls with zero gym equipment synchronization.",
      kynvelo: "Olympic Barbell Plate Math, CSCS progressive overload hints, and haptic rest timers. 100% free core tier.",
    },
    {
      category: "Nutrition Macro Logging",
      traditional: "Manual database searching with 50 duplicate entries or AI bots hallucinating imaginary calorie counts.",
      kynvelo: "Two-Stage Camera Recognition: Multimodal vision verified against USDA FoodData Central databases.",
    },
    {
      category: "Member Churn & Retention",
      traditional: "Owner only realizes a member dropped out 30 days after their membership expired. Irrecoverable churn.",
      kynvelo: "No-Show Red-List CRM flags 10+ day absences automatically. 1-Tap WhatsApp outreach with anti-collision locks.",
    },
    {
      category: "Pass Renewals & Payments",
      traditional: "Awkward front-desk negotiation, cash handling with leakage, or manual payment QR codes.",
      kynvelo: "Self-service 1-tap UPI deep-links directly on member phones with instant bank settlement (T+1).",
    },
    {
      category: "GST Compliance & Accounts",
      traditional: "Manual paper receipts. Scrambling at month-end to calculate 18% GST for Chartered Accountants.",
      kynvelo: "Automated GST Tax Invoices (SAC 999723) generated per order. One-click monthly JSON and CSV ledger exports.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <Badge variant="primary" className="font-mono text-[11px] px-3 py-1">
            THE ARCHITECTURAL DIFFERENCE
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            Traditional Gym Tools vs <span className="text-primary font-mono">Kynvelo Unified OS</span>
          </h2>
          <p className="text-sm sm:text-base text-ink-muted">
            See how legacy software silos hold gyms and athletes back — and how Kynvelo’s unified platform transforms everyday operations.
          </p>
        </div>

        {/* Matrix Table */}
        <div className="rounded-3xl glass-panel-elevated border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead>
                <tr className="border-b border-white/[0.08] bg-surface-2/70 text-ink-subtle">
                  <th className="py-4 px-6 font-bold w-1/4">OPERATIONAL DOMAIN</th>
                  <th className="py-4 px-6 font-bold text-danger w-3/8">
                    TRADITIONAL GYM SETUP
                  </th>
                  <th className="py-4 px-6 font-bold text-primary w-3/8">
                    KYNVELO UNIFIED OS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {comparisons.map((c, i) => (
                  <tr key={i} className="hover:bg-surface-2/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-ink align-top">
                      {c.category}
                    </td>
                    <td className="py-4 px-6 text-ink-muted align-top leading-relaxed font-sans text-xs">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                        <span>{c.traditional}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-ink align-top leading-relaxed font-sans text-xs bg-primary/[0.02]">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="font-medium">{c.kynvelo}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
