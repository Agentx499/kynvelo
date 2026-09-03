"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Building2, Terminal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";

export default function BusinessSignupPage() {
  const router = useRouter();
  const [gymName, setGymName] = useState("Alpha Strength Club");
  const [hardware, setHardware] = useState("ZKTeco TS2000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin/terminal");
  };

  return (
    <div className="min-h-screen bg-[#050608] text-ink flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="flex justify-between items-center max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Link href="/business">
            <KynveloLogo size="sm" />
          </Link>
          <Badge variant="primary" className="font-mono text-[9px] px-2 py-0.5 hidden sm:inline-block">
            FACILITY ONBOARDING
          </Badge>
        </div>

        <div className="text-xs text-ink-muted font-mono">
          Already registered?{" "}
          <Link href="/business/login" className="text-primary font-semibold hover:underline">
            Terminal Sign In
          </Link>
        </div>
      </div>

      {/* Signup Card */}
      <div className="max-w-lg w-full mx-auto my-10 p-8 rounded-3xl glass-panel-elevated border border-white/10 shadow-2xl">
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto border border-primary/30">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-ink tracking-tight">
            Deploy Kynvelo for Your Gym
          </h2>
          <p className="text-xs text-ink-muted font-mono">
            Connect your turnstiles and eliminate member churn in 15 minutes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-[11px] text-ink-subtle uppercase block mb-1.5">
              Gym / Club Name
            </label>
            <input
              type="text"
              value={gymName}
              onChange={(e) => setGymName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-hairline text-ink focus:outline-none focus:border-primary text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-ink-subtle uppercase block mb-1.5">
                City / State
              </label>
              <input
                type="text"
                defaultValue="Mumbai, MH"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-hairline text-ink focus:outline-none focus:border-primary text-xs"
              />
            </div>
            <div>
              <label className="text-[11px] text-ink-subtle uppercase block mb-1.5">
                Active Member Count
              </label>
              <select className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-hairline text-ink focus:outline-none focus:border-primary text-xs cursor-pointer">
                <option>Up to 350 Members (Core)</option>
                <option>Up to 1,200 Members (Pro)</option>
                <option>1,200+ Members (Enterprise)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-ink-subtle uppercase block mb-1.5">
              Turnstile Hardware Model
            </label>
            <input
              type="text"
              value={hardware}
              onChange={(e) => setHardware(e.target.value)}
              placeholder="e.g. ZKTeco, eSSL, Hikvision, or Optical Flap"
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-hairline text-ink focus:outline-none focus:border-primary text-xs"
            />
          </div>

          <div className="p-3.5 rounded-xl bg-surface-1 border border-hairline space-y-1.5 text-[11px] text-ink-subtle">
            <div className="flex items-center gap-2 text-ink">
              <Check className="w-3.5 h-3.5 text-primary" />
              <span>Includes 14-day full feature trial with turnstile emulator</span>
            </div>
            <div className="flex items-center gap-2 text-ink">
              <Check className="w-3.5 h-3.5 text-primary" />
              <span>Zero setup fees or upfront hardware lock-in</span>
            </div>
          </div>

          <Button type="submit" variant="primary" className="w-full py-5 text-xs font-bold gap-2">
            <span>Initialize Facility Operating System</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/[0.08] text-center">
          <Link href="/signup" className="text-xs text-primary hover:underline font-mono">
            Looking to create an Athlete profile instead? Click here &rarr;
          </Link>
        </div>
      </div>

      <div className="text-center text-xs font-mono text-ink-subtle flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>India DPDP Act 2023 & GST SAC 999723 Certified</span>
      </div>
    </div>
  );
}
