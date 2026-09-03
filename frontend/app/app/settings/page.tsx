"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User,
  Activity,
  Heart,
  ShieldCheck,
  Download,
  Trash2,
  LogOut,
  ChevronRight,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { MobileShell } from "@/components/member/mobile-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [appleHealthSync, setAppleHealthSync] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  return (
    <MobileShell>
      <div className="space-y-6">
        {/* Profile Card */}
        <div className="p-4 rounded-xl bg-surface-2 border border-hairline flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/20 text-primary font-bold text-lg flex items-center justify-center border border-primary/40">
            RS
          </div>
          <div>
            <h2 className="text-base font-bold text-ink">Rahul Sharma</h2>
            <p className="text-xs text-ink-muted font-mono">+91 98201 44550</p>
            <Badge variant="primary" className="text-[10px] mt-1">
              OLYMPIC GYM • GOLD MEMBER
            </Badge>
          </div>
        </div>

        {/* Vital Muscle Recovery Heatmap Card */}
        <div className="p-4 rounded-xl bg-surface-2 border border-hairline space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs font-mono font-bold text-primary flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> 72-HOUR RECOVERY HEATMAP
            </span>
            <Badge variant="primary" className="text-[10px]">MODULE 10</Badge>
          </div>

          <p className="text-xs text-ink-muted leading-relaxed">
            Muscle fatigue index calculated from logged barbell and dumbbell volume:
          </p>

          <div className="space-y-2 font-mono text-xs">
            <div>
              <div className="flex justify-between text-ink mb-1">
                <span>Pectoralis Major (Chest)</span>
                <span className="text-danger font-bold">Fatigued (48h left)</span>
              </div>
              <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-danger rounded-full w-[85%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-ink mb-1">
                <span>Lats & Rhomboids (Back)</span>
                <span className="text-emerald-400 font-bold">100% Recovered</span>
              </div>
              <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full w-[100%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-ink mb-1">
                <span>Quads & Hamstrings (Legs)</span>
                <span className="text-warning font-bold">Ready for Light Load</span>
              </div>
              <div className="h-1.5 w-full bg-surface-3 rounded-full overflow-hidden">
                <div className="h-full bg-warning rounded-full w-[60%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Integrations & Preferences */}
        <div className="p-4 rounded-xl bg-surface-2 border border-hairline space-y-4">
          <span className="text-xs font-mono font-bold text-ink-subtle uppercase tracking-wider block">
            TELEMETRY & HARDWARE INTEGRATIONS
          </span>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-rose-400" />
              <div>
                <span className="text-sm font-semibold text-ink block">Apple Health / Health Connect</span>
                <span className="text-[11px] text-ink-subtle">Sync daily steps and cardio burns</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={appleHealthSync}
              onChange={() => setAppleHealthSync(!appleHealthSync)}
              className="accent-primary w-4 h-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-hairline/60">
            <div className="flex items-center gap-2.5">
              <Activity className="w-4 h-4 text-primary" />
              <div>
                <span className="text-sm font-semibold text-ink block">Haptic Timer Feedback</span>
                <span className="text-[11px] text-ink-subtle">Vibrate phone at end of rest intervals</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={hapticFeedback}
              onChange={() => setHapticFeedback(!hapticFeedback)}
              className="accent-primary w-4 h-4 cursor-pointer"
            />
          </div>
        </div>

        {/* DPDP Act Data Rights */}
        <div className="p-4 rounded-xl bg-surface-2 border border-hairline space-y-3">
          <span className="text-xs font-mono font-bold text-ink-subtle uppercase tracking-wider block">
            DATA PRIVACY & DPDP RIGHTS
          </span>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs justify-start gap-2 font-mono"
            onClick={() => alert("Packaging full JSON/CSV fitness history export...")}
          >
            <Download className="w-3.5 h-3.5 text-primary" /> Download Complete Fitness Records
          </Button>

          <Button
            variant="danger"
            size="sm"
            className="w-full text-xs justify-start gap-2 font-mono"
            onClick={() => {
              if (confirm("Are you sure you want to permanently erase all your workout and nutritional records?")) {
                alert("Data erasure request submitted under Section 12 of DPDP Act 2023.");
              }
            }}
          >
            <Trash2 className="w-3.5 h-3.5" /> Request Full Data Erasure
          </Button>
        </div>

        {/* Logout */}
        <Link href="/login" className="block pt-2">
          <Button variant="ghost" className="w-full text-xs text-danger hover:text-danger hover:bg-danger/10 gap-2">
            <LogOut className="w-4 h-4" /> Sign Out
          </Button>
        </Link>
      </div>
    </MobileShell>
  );
}
