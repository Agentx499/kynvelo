"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, ShieldCheck, Dumbbell, Building2, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";
import { Badge } from "@/components/ui/badge";

export function BusinessNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#050608]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Vector Logo & Wordmark + B2B Badge */}
        <div className="flex items-center gap-3">
          <Link href="/business" className="group">
            <KynveloLogo size="sm" />
          </Link>
          <Badge variant="primary" className="font-mono text-[9px] px-2 py-0.5 hidden sm:inline-block">
            FOR GYMS & ENTERPRISE
          </Badge>
        </div>

        {/* Center: Business Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-ink-muted">
          <Link
            href="#turnstiles"
            className="hover:text-primary transition-colors flex items-center gap-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-primary" /> Turnstiles
          </Link>
          <Link
            href="#red-list"
            className="hover:text-primary transition-colors"
          >
            Red-List CRM
          </Link>
          <Link
            href="#assisted-entry"
            className="hover:text-primary transition-colors"
          >
            Assisted Entry Audit
          </Link>
          <Link
            href="#roi-calculator"
            className="hover:text-primary transition-colors"
          >
            ROI Calculator
          </Link>
          <Link
            href="#pricing"
            className="hover:text-primary transition-colors"
          >
            Business Plans
          </Link>
          <Link
            href="/enterprise"
            className="hover:text-primary transition-colors"
          >
            Hardware Specs
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
          {/* Switcher link back to Consumer Site */}
          <Link
            href="/"
            className="px-2.5 py-1 rounded-lg text-ink-subtle hover:text-ink hover:bg-surface-2 transition-all flex items-center gap-1.5 border border-transparent hover:border-white/10"
          >
            <Dumbbell className="w-3.5 h-3.5 text-ink-subtle" />
            <span>&larr; For Athletes</span>
          </Link>

          <Link href="/business/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-ink-muted hover:text-ink"
            >
              Staff Sign In
            </Button>
          </Link>

          <Link href="/business/signup">
            <Button
              variant="primary"
              size="sm"
              className="text-xs font-bold gap-1.5 shadow-[0_0_20px_rgba(198,255,0,0.25)]"
            >
              <span>Deploy Kiosk</span>
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
              href="#turnstiles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1 flex items-center gap-2"
            >
              <Terminal className="w-4 h-4 text-primary" /> Turnstile Automation & Hardware
            </Link>
            <Link
              href="#red-list"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● No-Show Red-List Retention CRM
            </Link>
            <Link
              href="#assisted-entry"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Reception Assisted Entry Justification Audit
            </Link>
            <Link
              href="#roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Lost-Member Churn ROI Calculator
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Business Club Pricing (Core, Pro, Enterprise)
            </Link>
            <Link
              href="/enterprise"
              onClick={() => setMobileMenuOpen(false)}
              className="text-ink-muted hover:text-primary transition-colors py-1"
            >
              ● Universal Hardware & Turnstile Relay Specs
            </Link>
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-primary hover:underline transition-colors py-1 flex items-center gap-1.5 border-t border-hairline pt-3"
            >
              <Dumbbell className="w-4 h-4" /> Switch to Athlete / Personal Site &larr;
            </Link>
          </div>

          <div className="pt-4 border-t border-hairline flex flex-col gap-2">
            <Link href="/business/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full text-xs">
                Gym Staff Terminal Sign In
              </Button>
            </Link>
            <Link href="/business/signup" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" className="w-full text-xs font-bold">
                Deploy Facility Kiosk
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
