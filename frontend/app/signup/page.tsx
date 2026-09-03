"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dumbbell, Building2, ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<"athlete" | "owner">("athlete");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gymCode: "",
    facilityName: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Simulate account generation and route to appropriate experience
      if (role === "athlete") {
        router.push("/app/pulse");
      } else {
        router.push("/admin/terminal");
      }
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col justify-between p-4 sm:p-8">
      {/* Top Header */}
      <div className="flex justify-between items-center max-w-5xl mx-auto w-full">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-hairline shadow-sm">
            <Image
              src="/logo.svg"
              alt="Kynvelo"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <span className="font-mono text-base font-extrabold tracking-wider text-ink">
            KYNVELO
          </span>
        </Link>
        <div className="text-xs text-ink-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </div>

      {/* Main Card */}
      <div className="max-w-md w-full mx-auto my-12 p-8 rounded-2xl bg-surface-1 border border-hairline shadow-2xl">
        <div className="text-center mb-6">
          <Badge variant="primary" className="mb-2">
            STEP {step} OF 2
          </Badge>
          <h2 className="text-2xl font-extrabold text-ink">
            {step === 1 ? "Choose Your Experience" : "Complete Profile Setup"}
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            {step === 1
              ? "Select how you will be using the Kynvelo Operating System"
              : "Enter your verification contact details"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 ? (
            <div className="space-y-3">
              {/* Option A: Athlete */}
              <div
                onClick={() => setRole("athlete")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  role === "athlete"
                    ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(198,255,0,0.15)]"
                    : "bg-surface-2 border-hairline hover:border-hairline-strong"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    role === "athlete" ? "bg-primary text-on-primary" : "bg-surface-3 text-ink-muted"
                  }`}
                >
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">Individual Athlete / Lifter</h4>
                  <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                    Track workouts with barbell plate math, scan meals with 2-stage AI, and access partner turnstiles. Free forever.
                  </p>
                </div>
              </div>

              {/* Option B: Gym Owner */}
              <div
                onClick={() => setRole("owner")}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  role === "owner"
                    ? "bg-primary/10 border-primary shadow-[0_0_20px_rgba(198,255,0,0.15)]"
                    : "bg-surface-2 border-hairline hover:border-hairline-strong"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    role === "owner" ? "bg-primary text-on-primary" : "bg-surface-3 text-ink-muted"
                  }`}
                >
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink">Gym Owner / Fitness Club</h4>
                  <p className="text-xs text-ink-muted mt-0.5 leading-relaxed">
                    Automate turnstiles, detect inactive members at Day 10, recover renewals via WhatsApp, and manage GST invoicing.
                  </p>
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full mt-4 gap-2">
                <span>Continue to Details</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-ink-subtle mb-1">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full p-3 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-ink-subtle mb-1">
                  PHONE NUMBER (FOR OTP & TURNSTILE QR)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98201 XXXXX"
                  className="w-full p-3 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-sm font-mono"
                />
              </div>

              {role === "owner" && (
                <div>
                  <label className="block text-xs font-mono text-ink-subtle mb-1">
                    GYM / FACILITY NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.facilityName}
                    onChange={(e) => setFormData({ ...formData, facilityName: e.target.value })}
                    placeholder="e.g. Titan Iron Gym"
                    className="w-full p-3 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-sm"
                  />
                </div>
              )}

              {role === "athlete" && (
                <div>
                  <label className="block text-xs font-mono text-ink-subtle mb-1">
                    GYM CODE (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={formData.gymCode}
                    onChange={(e) => setFormData({ ...formData, gymCode: e.target.value })}
                    placeholder="e.g. TITAN-MUMBAI"
                    className="w-full p-3 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink outline-none text-sm font-mono uppercase"
                  />
                  <span className="text-[10px] text-ink-subtle mt-0.5 block">
                    Enter code to link your account to your local gym turnstile.
                  </span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStep(1)}
                  className="w-1/3"
                >
                  Back
                </Button>
                <Button type="submit" variant="primary" className="w-2/3">
                  {role === "athlete" ? "Launch Athlete App" : "Launch Gym Kiosk"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Footer Trust Bar */}
      <div className="text-center text-xs font-mono text-ink-subtle flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>End-to-end encrypted session. DPDP Act 2023 certified.</span>
      </div>
    </div>
  );
}
