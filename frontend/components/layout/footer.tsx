import React from "react";
import Link from "next/link";
import { ShieldCheck, Heart } from "lucide-react";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-surface-1/90 text-ink-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Col 1: Brand & Identity (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <KynveloLogo size="sm" />
            </Link>

            <p className="text-sm text-ink-muted leading-relaxed max-w-sm">
              The unified operating system for modern gyms and athletes. Powering strength tracking, AI nutrition verification, turnstile automation, and member retention across India.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-ink-subtle pt-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Certified India DPDP Act 2023 Compliant</span>
            </div>
          </div>

          {/* Col 2: Athlete Suite */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink mb-4">
              For Athletes
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Coach Strength Matrix
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Olympic Plate Math
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Two-Stage AI Nutrition
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Muscle Heatmap
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-primary transition-colors">
                  Download Mobile PWA
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Gym Owners */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink mb-4">
              For Gyms & Clubs
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/enterprise" className="hover:text-primary transition-colors">
                  Turnstile Gateway
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-primary transition-colors">
                  Flow Retention CRM
                </Link>
              </li>
              <li>
                <Link href="/roi-calculator" className="hover:text-primary transition-colors">
                  Lost-Member Calculator
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary transition-colors">
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="hover:text-primary transition-colors">
                  Custom White-Label Apps
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Trust */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-ink mb-4">
              Legal & Trust
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/legal/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy (DPDP)
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/legal/security" className="hover:text-primary transition-colors">
                  Security & Architecture
                </Link>
              </li>
              <li>
                <Link href="/legal/dpa" className="hover:text-primary transition-colors">
                  Data Processing Addendum
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-ink-subtle">
          <div>
            © {new Date().getFullYear()} Kynvelo Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Engineered with <span className="text-primary font-bold">Kinetic Volt</span> precision.
          </div>
        </div>
      </div>
    </footer>
  );
}
