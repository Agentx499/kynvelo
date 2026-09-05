"use client";

import React, { useState } from "react";
import {
  Monitor,
  Camera,
  CheckCircle2,
  XCircle,
  Zap,
  KeyRound,
  RefreshCw,
  Clock,
  ShieldAlert,
  UserCheck,
  X,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CheckInLog {
  id: number;
  name: string;
  avatar: string;
  plan: string;
  gate: string;
  time: string;
  status: "granted" | "denied";
  reason?: string;
}

export default function TerminalPage() {
  const [assistedModalOpen, setAssistedModalOpen] = useState(false);
  const [assistedReason, setAssistedReason] = useState("Forgot phone / phone battery died");
  const [assistedMemberName, setAssistedMemberName] = useState("");

  const [logs, setLogs] = useState<CheckInLog[]>([
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "RS",
      plan: "Gold Annual Pass",
      gate: "Gate 01 (Main Turnstile)",
      time: "10:42:15 AM",
      status: "granted",
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "PP",
      plan: "Monthly Morning Pass",
      gate: "Gate 02 (Cardio Deck)",
      time: "10:39:02 AM",
      status: "granted",
    },
    {
      id: 3,
      name: "Amit Roy",
      avatar: "AR",
      plan: "Expired 4 Days Ago",
      gate: "Gate 01 (Main Turnstile)",
      time: "10:35:48 AM",
      status: "denied",
      reason: "Membership Expired (Renewal Pending)",
    },
  ]);

  const handleSimulateScan = () => {
    const names = ["Ananya Roy", "Siddharth Malhotra", "Karan Singhal", "Neha Joshi"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const initials = randomName.split(" ").map((n) => n[0]).join("");

    const newLog: CheckInLog = {
      id: Date.now(),
      name: randomName,
      avatar: initials,
      plan: "Gold 6-Month Pass",
      gate: "Gate 01 (Main Turnstile)",
      time: new Date().toLocaleTimeString(),
      status: "granted",
    };

    setLogs((prev) => [newLog, ...prev]);
  };

  const handleAssistedCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assistedMemberName) return;

    const initials = assistedMemberName.split(" ").map((n) => n[0]).join("");
    const newLog: CheckInLog = {
      id: Date.now(),
      name: assistedMemberName,
      avatar: initials || "MB",
      plan: "Assisted Staff Entry",
      gate: "Gate 01 (Staff Assisted)",
      time: new Date().toLocaleTimeString(),
      status: "granted",
      reason: `Staff Override: ${assistedReason}`,
    };

    setLogs((prev) => [newLog, ...prev]);
    setAssistedMemberName("");
    setAssistedModalOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Terminal Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-4 border-b border-hairline">
          <div>
            <span className="text-xs font-mono text-primary font-bold flex items-center gap-1.5">
              <Monitor className="w-4 h-4" /> KIOSK HARDWARE CONTROLLER
            </span>
            <h1 className="text-2xl font-bold text-ink mt-0.5">
              Reception Turnstile Terminal
            </h1>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAssistedModalOpen(true)}
              className="text-xs gap-1.5 font-mono border-hairline-strong"
            >
              <UserCheck className="w-3.5 h-3.5 text-warning" /> Assisted Entry (Staff)
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSimulateScan}
              className="text-xs gap-1.5 font-mono"
            >
              <Zap className="w-3.5 h-3.5" /> Simulate Turnstile QR Scan
            </Button>
          </div>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Live Scanner Reticle Viewport (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 rounded-2xl bg-surface-1 border border-hairline space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-ink-subtle">OPTICAL SCANNER SENSOR</span>
                <span className="text-primary font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                  LISTENING FOR USB / CAMERA
                </span>
              </div>

              {/* 4K Video Reticle Viewport Simulation */}
              <div className="relative w-full h-72 rounded-xl bg-black border border-hairline-strong flex flex-col items-center justify-center overflow-hidden shadow-inner">
                {/* Scanline Animation */}
                {/* animate-pulse, not animate-bounce: bounce easing is elastic
                    and reads as dated. A scanline should fade, not spring. */}
                <div className="absolute inset-x-0 top-1/3 h-1 animate-pulse bg-primary/80" />
                <div className="w-48 h-48 border-2 border-primary/50 rounded-2xl flex items-center justify-center p-4 relative">
                  <div className="w-full h-full border border-dashed border-primary/30 rounded-xl flex items-center justify-center">
                    <Camera className="w-12 h-12 text-primary/40" />
                  </div>
                  {/* Corner Guides */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />
                </div>
                <span className="font-mono text-xs text-ink-subtle mt-4">
                  Hold 15-second dynamic QR code in frame
                </span>
              </div>

              {/* Turnstile Relay Signal Stats */}
              <div className="p-3 rounded-lg bg-surface-2 border border-hairline text-xs font-mono space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-ink-subtle">Dry-Contact Relay:</span>
                  <span className="text-emerald-400 font-bold">Relay #1 (Pulse 300ms)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink-subtle">Anti-Passback Rule:</span>
                  <span className="text-ink">10-Minute Lockout Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Entry Stream (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-5 rounded-2xl bg-surface-1 border border-hairline space-y-4">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-ink-subtle">LIVE ACCESS STREAM</span>
                <Badge variant="primary" className="text-[10px]">
                  {logs.length} SCANS TODAY
                </Badge>
              </div>

              <div className="space-y-3">
                {logs.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border transition-all flex items-center justify-between ${
                      item.status === "granted"
                        ? "bg-surface-2 border-hairline hover:border-primary/30"
                        : "bg-danger/10 border-danger/30"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-full font-bold text-xs flex items-center justify-center ${
                          item.status === "granted"
                            ? "bg-primary text-on-primary"
                            : "bg-danger text-white"
                        }`}
                      >
                        {item.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-ink">{item.name}</h4>
                          <span className="text-xs font-mono text-ink-subtle">
                            • {item.time}
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted mt-0.5">{item.plan}</p>
                        {item.reason && (
                          <span className="text-[11px] font-mono text-warning block mt-0.5">
                            {item.reason}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right font-mono">
                      {item.status === "granted" ? (
                        <span className="text-xs font-bold text-primary flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> GRANTED
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-danger flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> DENIED
                        </span>
                      )}
                      <span className="text-[10px] text-ink-subtle block mt-0.5">
                        {item.gate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Assisted Entry Modal (Mandatory Staff Reason Enforced) */}
        {assistedModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-2xl bg-surface-1 border border-hairline p-6 space-y-4 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-base text-ink flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-warning" /> Assisted Manual Check-In
                </h3>
                <button
                  type="button"
                  onClick={() => setAssistedModalOpen(false)}
                  className="text-ink-muted hover:text-ink cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-ink-muted">
                Per Audit Rules, staff overrides require a mandatory justification reason logged with your staff ID.
              </p>

              <form onSubmit={handleAssistedCheckIn} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block font-mono text-ink-subtle mb-1">
                    MEMBER FULL NAME OR PHONE
                  </label>
                  <input
                    type="text"
                    required
                    value={assistedMemberName}
                    onChange={(e) => setAssistedMemberName(e.target.value)}
                    placeholder="e.g. Siddharth Malhotra"
                    className="w-full p-2.5 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block font-mono text-ink-subtle mb-1">
                    MANDATORY JUSTIFICATION REASON
                  </label>
                  <select
                    value={assistedReason}
                    onChange={(e) => setAssistedReason(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-xs"
                  >
                    <option>Forgot phone / phone battery died</option>
                    <option>Camera lens cracked / QR won&apos;t scan</option>
                    <option>Guest trial pass (Assisted by Manager)</option>
                    <option>Turnstile barrier mechanical test</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setAssistedModalOpen(false)}
                    className="w-1/3"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" className="w-2/3">
                    Authorize & Pulse Turnstile
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
