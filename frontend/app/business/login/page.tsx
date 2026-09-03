"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, Terminal, Building2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";

export default function BusinessLoginPage() {
  const router = useRouter();
  const [facilitySlug, setFacilitySlug] = useState("olympic-powerhouse");
  const [staffPin, setStaffPin] = useState("4489");

  const handleLogin = (e: React.FormEvent) => {
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
            STAFF & RECEPTION
          </Badge>
        </div>

        <div className="text-xs text-ink-muted font-mono">
          New Facility?{" "}
          <Link href="/business/signup" className="text-primary font-semibold hover:underline">
            Deploy Kynvelo OS
          </Link>
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-12 p-8 rounded-3xl glass-panel-elevated border border-white/10 shadow-2xl">
        <div className="text-center mb-6 space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center mx-auto border border-primary/30">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-ink tracking-tight">
            Facility Terminal Sign In
          </h2>
          <p className="text-xs text-ink-muted font-mono">
            Reception Kiosk, Red-List CRM & Turnstile Control
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 font-mono text-xs">
          <div>
            <label className="text-[11px] text-ink-subtle uppercase block mb-1.5">
              Facility Identifier or Domain
            </label>
            <div className="relative">
              <input
                type="text"
                value={facilitySlug}
                onChange={(e) => setFacilitySlug(e.target.value)}
                placeholder="e.g. iron-gym-mumbai"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-hairline text-ink focus:outline-none focus:border-primary text-xs"
              />
              <span className="absolute right-3.5 top-3 text-[11px] text-ink-subtle">
                .kynvelo.in
              </span>
            </div>
          </div>

          <div>
            <label className="text-[11px] text-ink-subtle uppercase block mb-1.5">
              Staff Security PIN / Password
            </label>
            <input
              type="password"
              value={staffPin}
              onChange={(e) => setStaffPin(e.target.value)}
              placeholder="••••"
              maxLength={8}
              required
              className="w-full px-4 py-3 rounded-xl bg-surface-2 border border-hairline text-ink focus:outline-none focus:border-primary tracking-widest text-center text-sm"
            />
          </div>

          <Button type="submit" variant="primary" className="w-full py-5 text-xs font-bold gap-2">
            <span>Authenticate Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/[0.08] text-center space-y-2">
          <Link href="/admin/terminal" className="text-[11px] text-ink-subtle hover:text-ink block font-mono">
            Demo Bypass: Directly Open Reception Kiosk &rarr;
          </Link>

          <Link href="/login" className="text-xs text-primary hover:underline block font-mono pt-1">
            Looking for Athlete / Personal App? Sign In Here &rarr;
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs font-mono text-ink-subtle flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-emerald-400" />
        <span>Hardware Relay Connection: 256-bit Encrypted TCP/IP</span>
      </div>
    </div>
  );
}
