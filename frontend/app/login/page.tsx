"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, ShieldCheck, KeyRound, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("9820144550");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to member app pulse
    router.push("/app/pulse");
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
          New to Kynvelo?{" "}
          <Link href="/signup" className="text-primary font-semibold hover:underline">
            Create Account
          </Link>
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-12 p-8 rounded-2xl bg-surface-1 border border-hairline shadow-2xl">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-ink">
            Sign In to Kynvelo
          </h2>
          <p className="text-xs text-ink-muted mt-1">
            Access your workouts, macro logs, and gym turnstile pass
          </p>
        </div>

        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-ink-subtle mb-1">
                MOBILE NUMBER
              </label>
              <div className="flex rounded-lg border border-hairline bg-surface-2 overflow-hidden focus-within:border-primary">
                <span className="px-3 py-3 text-xs font-mono text-ink-subtle bg-surface-3 border-r border-hairline flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98201 44550"
                  className="w-full p-3 bg-transparent text-ink outline-none text-sm font-mono"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full gap-2">
              <span>Send One-Time Passcode</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-ink-subtle mb-1">
                ENTER 6-DIGIT OTP (SENT TO +91 {phone})
              </label>
              <input
                type="text"
                required
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full p-3 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink text-center text-xl tracking-widest font-mono outline-none"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full">
              Verify & Enter Application
            </Button>
          </form>
        )}

        {/* Business Switcher */}
        <div className="mt-6 pt-4 border-t border-hairline text-center">
          <Link href="/business/login" className="text-xs font-mono text-primary hover:underline flex items-center justify-center gap-1.5">
            <span>Gym Owner or Staff Member? Go to Business Login &rarr;</span>
          </Link>
        </div>
      </div>

      <div className="text-center text-xs font-mono text-ink-subtle flex items-center justify-center gap-2">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <span>Protected by HMAC session encryption</span>
      </div>
    </div>
  );
}
