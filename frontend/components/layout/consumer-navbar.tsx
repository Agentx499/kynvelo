"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Dumbbell, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";

export function ConsumerNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#050608]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Vector Logo & Wordmark */}
        <Link href="/" className="group">
          <KynveloLogo size="sm" />
        </Link>

        {/* Center: Consumer Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-ink-muted">
          <Link
            href="#workouts"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Dumbbell className="w-3.5 h-3.5 text-primary" /> Plate Math
          </Link>
          <Link
            href="#nutrition"
            className="hover:text-primary transition-colors"
          >
            AI Nutrition Plans
          </Link>
          <Link
            href="#recovery"
            className="hover:text-primary transition-colors"
          >
            Muscle Heatmap
          </Link>
          <Link
            href="#turnstile-pass"
            className="hover:text-primary transition-colors"
          >
            Gym Pass (HMAC)
          </Link>
          <Link
            href="#pricing"
            className="hover:text-primary transition-colors"
          >
            Pricing (Free & Pro)
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
          {/* Switcher link to Business Portal */}
          <Link
            href="/business"
            className="px-2.5 py-1 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-2 transition-all flex items-center gap-1.5 border border-transparent hover:border-white/10"
          >
            <Building2 className="w-3.5 h-3.5 text-ink-subtle" />
            <span>For Gym Owners &rarr;</span>
          </Link>

          <Link href="/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-ink-muted hover:text-ink"
            >
              Sign In
            </Button>
          </Link>

          <Link href="/signup">
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-bold gap-1.5 shadow-[0_0_20px_rgba(198,255,0,0.25)]"
            >
              <span>Start Free</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-2 transition-colors cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-hairline bg-surface-1/95 backdrop-blur-2xl px-5 py-6 space-y-4 font-mono text-sm animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            <Link
              href="#workouts"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1 flex items-center gap-2"
            >
              <Dumbbell className="w-4 h-4 text-primary" /> Barbell Workouts & Plate Math
            </Link>
            <Link
              href="#nutrition"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● AI Nutrition & Meal Planning
            </Link>
            <Link
              href="#recovery"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● 72-Hour Muscle Recovery Heatmap
            </Link>
            <Link
              href="#turnstile-pass"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● 15s Dynamic Turnstile Pass
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Athlete Pricing (Free vs Pro)
            </Link>
            <Link
              href="/business"
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary hover:underline transition-colors py-1 flex items-center gap-1.5 border-t border-hairline pt-3"
            >
              <Building2 className="w-4 h-4" /> Switch to Gym Owner & Club Portal &rarr;
            </Link>
          </div>

          <div className="pt-4 border-t border-hairline flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full text-xs">
                Athlete Sign In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full text-xs font-bold">
                Start Free Training
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
