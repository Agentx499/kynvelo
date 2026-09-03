"use client";

import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { UnifiedPricing } from "@/components/blocks/unified-pricing";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050608] text-ink">
      <Navbar />

      <main className="flex-1 py-12">
        <UnifiedPricing />

        {/* Hardware & Overage Pricing FAQ */}
        <section className="py-16 border-t border-white/[0.08] max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <Badge variant="primary" className="font-mono text-[10px]">
              HARDWARE & OVERAGE POLICIES
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold text-ink">
              Frequently Asked Billing Questions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
            <div className="p-6 rounded-2xl glass-panel space-y-2 border border-white/10">
              <h3 className="font-bold text-sm text-ink">Do I have to buy new turnstiles?</h3>
              <p className="text-ink-muted leading-relaxed font-sans">
                No. Kynvelo’s universal TCP/IP relay controller integrates seamlessly with existing turnstiles (ZKTeco, Hikvision, eSSL, Dormakaba) using standard 300ms dry-contact relays.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel space-y-2 border border-white/10">
              <h3 className="font-bold text-sm text-ink">Is GST included in the prices?</h3>
              <p className="text-ink-muted leading-relaxed font-sans">
                All gym business pricing is subject to 18% Indian GST (9% CGST + 9% SGST) under SAC Code 999723 (Fitness Center Services). Full tax invoices are generated automatically for your input tax credits.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel space-y-2 border border-white/10">
              <h3 className="font-bold text-sm text-ink">What happens if our gym exceeds member tiers?</h3>
              <p className="text-ink-muted leading-relaxed font-sans">
                We never shut off turnstile gates or lock your reception. If your gym exceeds active member capacity, overages are billed at a flat ₹10 per additional member, or you can upgrade tiers seamlessly with prorated billing.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel space-y-2 border border-white/10">
              <h3 className="font-bold text-sm text-ink">Is the athlete app really free?</h3>
              <p className="text-ink-muted leading-relaxed font-sans">
                Yes. Core progressive overload workout logging, Olympic barbell plate math, personal records, and data exports are free forever with zero advertisements.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
