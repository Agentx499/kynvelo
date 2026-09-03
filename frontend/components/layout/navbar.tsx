"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AudienceToggle, type AudienceMode } from "@/components/blocks/audience-toggle";

interface NavbarProps {
  mode: AudienceMode;
  onModeChange: (mode: AudienceMode) => void;
}

export function Navbar({ mode, onModeChange }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-canvas/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Monogram & Wordmark */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-hairline shadow-[0_0_15px_rgba(198,255,0,0.15)] group-hover:border-primary/50 transition-colors">
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

        {/* Center: Dual-Audience Mode Toggle */}
        <div className="hidden lg:flex items-center">
          <AudienceToggle mode={mode} onModeChange={onModeChange} />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-ink-muted">
          <Link href="#features" className="hover:text-ink transition-colors">
            Features
          </Link>
          <Link href="/roi-calculator" className="hover:text-ink transition-colors">
            ROI Calculator
          </Link>
          <Link href="/pricing" className="hover:text-ink transition-colors">
            Pricing
          </Link>
          <Link href="/enterprise" className="hover:text-ink transition-colors">
            Enterprise
          </Link>
        </nav>

        {/* Right CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="primary" size="sm" className="gap-1">
              <span>{mode === "athlete" ? "Start Free" : "Free Gym Trial"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-ink-muted hover:text-ink cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hairline bg-surface-1 p-4 space-y-4">
          <div className="flex justify-center pb-2">
            <AudienceToggle mode={mode} onModeChange={onModeChange} />
          </div>
          <div className="flex flex-col gap-2 font-medium text-sm">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-2"
            >
              Features
            </Link>
            <Link
              href="/roi-calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-2"
            >
              ROI Calculator
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-2"
            >
              Pricing
            </Link>
            <Link
              href="/enterprise"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-2"
            >
              Enterprise Hardware
            </Link>
          </div>
          <div className="flex gap-2 pt-2 border-t border-hairline">
            <Link href="/login" className="flex-1">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link href="/signup" className="flex-1">
              <Button variant="primary" className="w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
