"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Monitor,
  AlertTriangle,
  Users,
  CreditCard,
  Palette,
  ExternalLink,
  ShieldCheck,
  Zap,
  Menu,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { label: "Turnstile Terminal", href: "/admin/terminal", icon: Monitor },
    { label: "No-Show Red-List CRM", href: "/admin/red-list", icon: AlertTriangle, badge: "24 RISK" },
    { label: "Member Directory", href: "/admin/members", icon: Users },
    { label: "Billing & GST Ledger", href: "/admin/billing", icon: CreditCard },
    { label: "White-Label Branding", href: "/admin/branding", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col">
      {/* Top Admin Header */}
      <header className="sticky top-0 z-40 h-16 border-b border-hairline bg-surface-1/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 text-ink-muted hover:text-ink cursor-pointer"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link href="/admin/terminal" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-hairline">
              <Image
                src="/logo.svg"
                alt="Kynvelo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <div>
              <span className="font-mono text-sm font-extrabold tracking-wider text-ink block">
                OLYMPIC GYM OS
              </span>
              <span className="text-[10px] text-ink-subtle block font-mono">
                FLAGSHIP FACILITY (MUMBAI)
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-2 border border-hairline">
            <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-ink">TCP/IP Relay: Online (24ms)</span>
          </div>

          <Link href="/" className="text-xs text-ink-muted hover:text-ink hidden sm:flex items-center gap-1">
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>

          <div className="w-8 h-8 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
            VK
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Desktop Sidebar Navigation */}
        <aside
          className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-surface-1 border-r border-hairline p-4 flex flex-col justify-between transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-1">
            <span className="text-[11px] font-mono font-bold text-ink-subtle uppercase tracking-wider px-3 mb-2 block">
              OPERATING MODULES
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all ${
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/30 font-bold"
                      : "text-ink-muted hover:text-ink hover:bg-surface-2"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge variant="danger" className="text-[9px] py-0 px-1.5">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-3 rounded-xl bg-surface-2 border border-hairline text-xs font-mono space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Offline Buffer Ready</span>
            </div>
            <p className="text-[10px] text-ink-subtle">
              Zero-loss check-in synchronization active.
            </p>
          </div>
        </aside>

        {/* Main Operating Surface.
            id="main" matches the root layout's skip link; without it the link
            was broken on all 5 admin routes. */}
        <main id="main" className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
