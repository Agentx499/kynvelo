"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, ShieldCheck, TrendingUp, Star } from "lucide-react";

export function StatTicker() {
  const stats = [
    {
      label: "Workouts & Sets Logged",
      value: "1,250,000+",
      sub: "Across 240+ partner facilities",
      icon: Dumbbell,
      color: "text-primary",
    },
    {
      label: "Turnstile Kiosk Uptime",
      value: "99.8%",
      sub: "Zero-latency offline buffer sync",
      icon: ShieldCheck,
      color: "text-emerald-400",
    },
    {
      label: "Renewal Revenue Recovered",
      value: "₹2.4 Cr+",
      sub: "Via automated 10-day Red-List CRM",
      icon: TrendingUp,
      color: "text-lime-300",
    },
    {
      label: "Athlete & Owner Rating",
      value: "4.9 / 5.0",
      sub: "Over 12,000 active PWA users",
      icon: Star,
      color: "text-amber-400",
    },
  ];

  return (
    <section className="py-12 border-y border-hairline bg-surface-1/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="p-6 rounded-xl bg-surface-2/60 border border-hairline hover:border-primary/30 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-ink-subtle uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <Icon className={`w-4 h-4 ${stat.color} group-hover:scale-110 transition-transform`} />
                </div>
                <div className="text-3xl font-extrabold text-ink font-mono tracking-tight">
                  {stat.value}
                </div>
                <p className="text-xs text-ink-muted mt-1.5 leading-relaxed">
                  {stat.sub}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
