"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  QrCode,
  Flame,
  Footprints,
  Droplets,
  Dumbbell,
  Camera,
  Maximize2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { MobileShell } from "@/components/member/mobile-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PulsePage() {
  const [qrSeconds, setQrSeconds] = useState(15);
  const [expanded, setExpanded] = useState(false);
  const [water, setWater] = useState(1750);
  const [token, setToken] = useState("KYN-9842-TOKEN-SECURE");

  // 15-second dynamic rotating QR timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setQrSeconds((prev) => {
        if (prev <= 1) {
          setToken(`KYN-${Math.floor(1000 + Math.random() * 9000)}-TOKEN-SECURE`);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MobileShell>
      <div className="space-y-5">
        {/* Welcome Greeting */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold text-ink">Good Morning, Rahul 👋</h1>
            <p className="text-xs text-ink-muted mt-0.5">
              Ready to crush your goals today at Olympic Gym?
            </p>
          </div>
          <Badge variant="primary" className="text-[10px]">
            ACTIVE MEMBER
          </Badge>
        </div>

        {/* 15-Second Rotating QR Access Card */}
        <div className="p-5 rounded-2xl bg-surface-2 border border-hairline shadow-md relative overflow-hidden group">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
              <QrCode className="w-4 h-4" /> TURNSTILE PASS
            </span>
            <span className="text-[11px] font-mono text-ink-subtle flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-primary" />
              Regenerates in {qrSeconds}s
            </span>
          </div>

          <div
            onClick={() => setExpanded(!expanded)}
            className="flex flex-col items-center justify-center p-4 rounded-xl bg-white text-black cursor-pointer shadow-inner relative"
          >
            {/* High-Contrast Pure White QR Canvas */}
            <div className="w-44 h-44 flex items-center justify-center border-4 border-black/10 rounded-lg p-2 bg-white relative">
              <div className="w-full h-full flex flex-col items-center justify-center text-center">
                <QrCode className="w-36 h-36 text-black" />
                <span className="text-[9px] font-mono font-bold text-black/70 mt-1">
                  {token}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-[11px] font-mono font-bold text-black/60">
              <Maximize2 className="w-3.5 h-3.5" /> Tap to boost brightness & expand
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="text-[11px] text-ink-subtle">
              Hold QR code 6 inches above turnstile reader scanner.
            </p>
          </div>
        </div>

        {/* Today's Telemetry Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-surface-2 border border-hairline">
            <Flame className="w-4 h-4 text-primary mx-auto mb-1" />
            <span className="font-mono text-sm font-bold text-ink">5 Days</span>
            <span className="block text-[10px] text-ink-subtle">Workout Streak</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-2 border border-hairline">
            <Footprints className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="font-mono text-sm font-bold text-ink">8,420</span>
            <span className="block text-[10px] text-ink-subtle">Steps Today</span>
          </div>
          <div className="p-3 rounded-xl bg-surface-2 border border-hairline">
            <Droplets className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
            <span className="font-mono text-sm font-bold text-ink">{water}ml</span>
            <span className="block text-[10px] text-ink-subtle">Water Logged</span>
          </div>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-ink-subtle uppercase tracking-wider block">
            TODAY&apos;S ACTIONS
          </span>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/app/workout/active">
              <Button variant="secondary" className="w-full justify-start text-xs gap-2 py-5">
                <Dumbbell className="w-4 h-4 text-primary" />
                <div className="text-left">
                  <span className="font-bold block text-ink">Log Push Day</span>
                  <span className="text-[10px] text-ink-subtle">Chest & Triceps</span>
                </div>
              </Button>
            </Link>

            <Link href="/app/nutrition">
              <Button variant="secondary" className="w-full justify-start text-xs gap-2 py-5">
                <Camera className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <span className="font-bold block text-ink">Scan Meal</span>
                  <span className="text-[10px] text-ink-subtle">Two-Stage AI</span>
                </div>
              </Button>
            </Link>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWater((prev) => prev + 250)}
              className="flex-1 text-xs gap-1 py-1.5"
            >
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> +250ml Water
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setWater((prev) => prev + 500)}
              className="flex-1 text-xs gap-1 py-1.5"
            >
              <Droplets className="w-3.5 h-3.5 text-cyan-400" /> +500ml Water
            </Button>
          </div>
        </div>

        {/* Membership Status & Renewal Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-surface-2 to-surface-1 border border-hairline flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-ink">Gold Annual Pass</span>
              <Badge variant="warning" className="text-[10px]">24 DAYS LEFT</Badge>
            </div>
            <p className="text-xs text-ink-subtle mt-0.5">
              Olympic Gym Main Floor & Steam
            </p>
          </div>
          <Link href="/app/membership">
            <Button variant="primary" size="sm" className="text-xs">
              Renew Pass
            </Button>
          </Link>
        </div>
      </div>
    </MobileShell>
  );
}
