"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Cpu,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Server,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type AudienceMode } from "@/components/blocks/audience-toggle";

export default function EnterprisePage() {
  const [mode, setMode] = useState<AudienceMode>("owner");

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <Navbar mode={mode} onModeChange={setMode} />

      <main className="flex-1 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="primary" className="mb-4">
              ENTERPRISE & WHITE-LABEL HARDWARE
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-ink tracking-tight">
              Turnstile Automation. Dedicated App Store Deployments.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-ink-muted leading-relaxed">
              Engineered for multi-branch chains, luxury athletic clubs, and university facilities. Zero proprietary hardware lock-in, zero cloud latency.
            </p>
          </div>

          {/* Core Hardware & App Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Pillar 1: Turnstile Relay Gateway */}
            <div className="p-8 rounded-2xl bg-surface-1 border border-hairline space-y-6">
              <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-ink">
                Hardware-Agnostic Turnstile Relay
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Connect your existing tripod turnstiles, flap barriers, or speed gates to Kynvelo using standard industrial TCP/IP dry-contact relays. Under 50ms pulse latency.
              </p>

              <div className="space-y-3 font-mono text-xs text-ink">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Compatible with ZKTeco, eSSL, Hikvision, and Dormakaba</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Local offline buffering: validates scans even if gym ISP goes down</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Dual USB Barcode Reader + 4K Reception QR camera listener</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <span>Multi-lane support: configure unlimited entry and exit lanes</span>
                </div>
              </div>
            </div>

            {/* Pillar 2: White-Label App Store Publishing */}
            <div className="p-8 rounded-2xl bg-surface-1 border border-hairline space-y-6">
              <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-ink">
                Dedicated App Store & Google Play Listings
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Publish your own branded mobile application on the Apple App Store and Google Play Store ("Your Gym Name by Kynvelo"). Total brand autonomy for premier fitness franchises.
              </p>

              <div className="space-y-3 font-mono text-xs text-ink">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Custom App Icon, Splash Screen, and App Store screenshots</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Dynamic OKLCH color theming injected at runtime</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Automated iOS & Android updates managed by Kynvelo engineers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Dedicated Apple Developer & Google Play Console account setup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Turnstile Compatibility Matrix */}
          <div className="p-8 rounded-2xl bg-surface-1 border border-hairline mb-20 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-ink">
                  Hardware Compatibility Matrix
                </h3>
                <p className="text-xs text-ink-muted mt-1">
                  Tested and certified against leading turnstile manufacturers across India and Southeast Asia.
                </p>
              </div>
              <Badge variant="success">100% HARDWARE AGNOSTIC</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-hairline text-ink-subtle">
                    <th className="py-3 px-4">TURNSTILE TYPE</th>
                    <th className="py-3 px-4">SIGNAL PROTOCOL</th>
                    <th className="py-3 px-4">VERIFIED BRANDS</th>
                    <th className="py-3 px-4">AVERAGE RELAY COST</th>
                    <th className="py-3 px-4">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {[
                    {
                      type: "Waist-Height Tripod",
                      signal: "Dry Contact Relay (NO/COM)",
                      brands: "ZKTeco TS1000, eSSL MB160, Hikvision DS-K3G",
                      cost: "₹2,500 – ₹3,500",
                      status: "Certified",
                    },
                    {
                      type: "Optical Flap Barrier",
                      signal: "TCP/IP & Wiegand 26/34",
                      brands: "ZKTeco FBL4000, eSSL FB2000, CAME",
                      cost: "₹3,500 – ₹4,500",
                      status: "Certified",
                    },
                    {
                      type: "High-Speed Glass Gate",
                      signal: "Ethernet / Modbus RTU",
                      brands: "Dormakaba Argus, Gunnebo, Boon Edam",
                      cost: "Included with Kiosk",
                      status: "Certified",
                    },
                    {
                      type: "Magnetic Door Strike",
                      signal: "12V DC Relay Trigger",
                      brands: "Any standard magnetic electromagnetic lock",
                      cost: "₹1,200 – ₹2,000",
                      status: "Certified",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-2/40 transition-colors">
                      <td className="py-3 px-4 font-bold text-ink">{row.type}</td>
                      <td className="py-3 px-4 text-ink-muted">{row.signal}</td>
                      <td className="py-3 px-4 text-ink-subtle">{row.brands}</td>
                      <td className="py-3 px-4 text-primary font-bold">{row.cost}</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">{row.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Consultation Request Form */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-surface-2 border border-hairline space-y-6 text-center">
            <h3 className="text-2xl font-bold text-ink">
              Request an Enterprise Architecture Walkthrough
            </h3>
            <p className="text-sm text-ink-muted leading-relaxed">
              Our hardware engineers will evaluate your facility blueprint, turnstile models, and multi-branch network topology.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you! An Enterprise Specialist will contact you within 2 hours.");
              }}
              className="space-y-4 text-left font-sans text-sm"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-ink-subtle mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full p-3 rounded-lg bg-surface-1 border border-hairline focus:border-primary text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-ink-subtle mb-1">
                    WORK EMAIL / PHONE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="vikram@titanfitness.com"
                    className="w-full p-3 rounded-lg bg-surface-1 border border-hairline focus:border-primary text-ink outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-ink-subtle mb-1">
                    FACILITY / BRAND NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Titan Fitness Club"
                    className="w-full p-3 rounded-lg bg-surface-1 border border-hairline focus:border-primary text-ink outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-ink-subtle mb-1">
                    TOTAL GYM LOCATIONS
                  </label>
                  <select className="w-full p-3 rounded-lg bg-surface-1 border border-hairline focus:border-primary text-ink outline-none">
                    <option>1 Location (Single Flagship)</option>
                    <option>2 – 5 Locations</option>
                    <option>6 – 20 Locations</option>
                    <option>20+ Locations (Enterprise Chain)</option>
                  </select>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full py-3 text-base font-semibold">
                Submit Consultation Request
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
