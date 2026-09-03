"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Zap,
  Dumbbell,
  Apple,
  ShoppingBag,
  User,
  Flame,
  Bell,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MobileShellProps {
  children: React.ReactNode;
}

export function MobileShell({ children }: MobileShellProps) {
  const pathname = usePathname();

  const tabs = [
    { label: "Pulse", href: "/app/pulse", icon: Zap },
    { label: "Workout", href: "/app/workout", icon: Dumbbell },
    { label: "Fuel", href: "/app/nutrition", icon: Apple },
    { label: "Store", href: "/app/marketplace", icon: ShoppingBag },
    { label: "Profile", href: "/app/settings", icon: User },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col items-center justify-start">
      {/* Constrained Device Container (Phone frame on desktop, 100% on mobile) */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-surface-1 border-x border-hairline shadow-2xl relative pb-20">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-40 h-14 border-b border-hairline bg-surface-1/90 backdrop-blur-md px-4 flex items-center justify-between">
          <Link href="/app/pulse" className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded overflow-hidden border border-hairline">
              <Image
                src="/logo.svg"
                alt="Kynvelo"
                fill
                className="object-contain p-0.5"
              />
            </div>
            <span className="font-mono text-xs font-extrabold tracking-wider text-ink">
              OLYMPIC GYM
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/app/pulse">
              <Badge variant="primary" className="gap-1 py-0.5 px-2 text-[11px] cursor-pointer">
                <Flame className="w-3 h-3 text-primary fill-primary" />
                <span>5-DAY STREAK</span>
              </Badge>
            </Link>
            <button
              type="button"
              className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-2 cursor-pointer"
            >
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main Screen Content */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>

        {/* Fixed Bottom Tab Navigation */}
        <nav className="fixed bottom-0 z-50 w-full max-w-md h-16 border-t border-hairline bg-surface-1/95 backdrop-blur-md px-2 flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`flex flex-col items-center justify-center w-16 h-full gap-1 transition-colors ${
                  isActive ? "text-primary" : "text-ink-subtle hover:text-ink-muted"
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </div>
                <span className="text-[10px] font-mono font-medium">{tab.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
