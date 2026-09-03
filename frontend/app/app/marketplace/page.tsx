"use client";

import React, { useState } from "react";
import {
  ShoppingBag,
  Award,
  UserCheck,
  CheckCircle2,
  Package,
  Plus,
} from "lucide-react";
import { MobileShell } from "@/components/member/mobile-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

export default function MarketplacePage() {
  const [tab, setTab] = useState<"pt" | "supplements">("pt");

  const ptPackages = [
    {
      title: "12-Session Strength Coaching Pack",
      trainer: "Coach Dev (CSCS, National Powerlifting Medallist)",
      sessions: 12,
      price: 14500,
      desc: "Includes video barbell technique breakdown, customized periodization, and weekly body composition scans.",
    },
    {
      title: "Monthly Clinical Nutrition Consultation",
      trainer: "Dr. Simran Kaur (Sports Nutritionist)",
      sessions: 4,
      price: 4999,
      desc: "Comprehensive blood panel analysis, bespoke macro meal plans, and daily WhatsApp accountability.",
    },
  ];

  const supplements = [
    {
      name: "Optimum Nutrition Gold Standard Whey 2kg",
      flavor: "Double Rich Chocolate",
      price: 5899,
      stock: 4,
    },
    {
      name: "Creapure Creatine Monohydrate 250g",
      flavor: "Unflavored Micronized",
      price: 1199,
      stock: 12,
    },
    {
      name: "Olympic Gym Stainless Steel Shaker Bottle",
      flavor: "750ml Matte Black",
      price: 499,
      stock: 8,
    },
  ];

  return (
    <MobileShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-ink">Store & Services</h1>
            <p className="text-xs text-ink-muted">Coaching, Dietitians & Gym Supplies</p>
          </div>
          <Badge variant="primary" className="text-[10px]">
            IN-STORE PICKUP
          </Badge>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-surface-2 p-1 border border-hairline font-mono text-xs">
          <button
            type="button"
            onClick={() => setTab("pt")}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              tab === "pt" ? "bg-surface-3 text-primary shadow-sm" : "text-ink-muted"
            }`}
          >
            Personal Training & Diet
          </button>
          <button
            type="button"
            onClick={() => setTab("supplements")}
            className={`flex-1 py-1.5 rounded-md font-semibold transition-colors cursor-pointer ${
              tab === "supplements" ? "bg-surface-3 text-primary shadow-sm" : "text-ink-muted"
            }`}
          >
            Supplements & Gear
          </button>
        </div>

        {/* Content */}
        {tab === "pt" ? (
          <div className="space-y-4">
            {ptPackages.map((pkg, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-surface-2 border border-hairline space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-ink">{pkg.title}</h3>
                    <p className="text-xs text-primary font-mono mt-0.5">{pkg.trainer}</p>
                  </div>
                  <span className="font-mono text-sm font-bold text-ink">
                    {formatCurrency(pkg.price)}
                  </span>
                </div>

                <p className="text-xs text-ink-muted leading-relaxed">{pkg.desc}</p>

                <div className="pt-2 border-t border-hairline flex justify-between items-center">
                  <span className="text-xs font-mono text-ink-subtle">
                    {pkg.sessions} Sessions Valid 60 Days
                  </span>
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-xs h-8"
                    onClick={() => alert(`Enrolled in ${pkg.title}! Coach notified.`)}
                  >
                    Enroll Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {supplements.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-surface-2 border border-hairline flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-ink">{item.name}</h4>
                  <p className="text-xs text-ink-subtle">{item.flavor}</p>
                  <span className="text-[11px] font-mono text-emerald-400 block">
                    ● {item.stock} units in gym reception stock
                  </span>
                </div>

                <div className="text-right space-y-1.5">
                  <span className="font-mono text-sm font-bold text-primary block">
                    {formatCurrency(item.price)}
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs h-7 py-1 px-3 gap-1"
                    onClick={() => alert(`Reserved ${item.name} for front-desk pickup!`)}
                  >
                    <Plus className="w-3 h-3" /> Pickup
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileShell>
  );
}
