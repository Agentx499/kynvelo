"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ShieldCheck, Dumbbell, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#050608]/85 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Vector Logo & Wordmark */}
        <Link href="/" className="group">
          <KynveloLogo size="sm" />
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-ink-muted">
          <Link
            href="#loops"
            className="hover:text-ink transition-colors hover:text-primary"
          >
            The 4 Loops
          </Link>
          <Link
            href="#athletes"
            className="hover:text-ink transition-colors flex items-center gap-1.5 hover:text-primary"
          >
            <Dumbbell className="w-3.5 h-3.5 text-primary" /> For Lifters
          </Link>
          <Link
            href="#gym-owners"
            className="hover:text-ink transition-colors flex items-center gap-1.5 hover:text-primary"
          >
            <Building2 className="w-3.5 h-3.5 text-primary" /> For Gym Owners
          </Link>
          <Link
            href="#pricing"
            className="hover:text-ink transition-colors hover:text-primary"
          >
            Pricing
          </Link>
          <Link
            href="/roi-calculator"
            className="hover:text-ink transition-colors hover:text-primary"
          >
            ROI Calculator
          </Link>
          <Link
            href="/enterprise"
            className="hover:text-ink transition-colors hover:text-primary"
          >
            Hardware Specs
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
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
              <span>Get Started</span>
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
              href="#loops"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● The 4 Interconnected Loops
            </Link>
            <Link
              href="#athletes"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1 flex items-center gap-2"
            >
              <Dumbbell className="w-4 h-4 text-primary" /> For Lifters & Athletes
            </Link>
            <Link
              href="#gym-owners"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1 flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-primary" /> For Gym Owners & Clubs
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Pricing (Athletes & Gyms)
            </Link>
            <Link
              href="/roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Churn ROI Calculator
            </Link>
            <Link
              href="/enterprise"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Hardware & Turnstile Specs
            </Link>
          </div>

          <div className="pt-4 border-t border-hairline flex flex-col gap-2">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full text-xs">
                Member / Staff Sign In
              </Button>
            </Link>
            <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full text-xs font-bold">
                Deploy Kynvelo Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
