"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Palette,
  Upload,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BrandingPage() {
  const [facilityName, setFacilityName] = useState("Olympic Gym & Fitness");
  const [selectedTheme, setSelectedTheme] = useState("volt");

  const themes = [
    { id: "volt", name: "Kinetic Volt (Default)", hex: "#C6FF00", oklch: "oklch(0.85 0.20 135)" },
    { id: "cyan", name: "Cyan Precision", hex: "#00F0FF", oklch: "oklch(0.80 0.18 210)" },
    { id: "emerald", name: "Emerald Power", hex: "#10B981", oklch: "oklch(0.75 0.18 150)" },
    { id: "amber", name: "Amber Solar", hex: "#F59E0B", oklch: "oklch(0.78 0.18 70)" },
  ];

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Branding updated! Facility name set to "${facilityName}". Theme tokens applied across member PWA.`);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="pb-4 border-b border-hairline">
          <span className="text-xs font-mono text-purple-400 font-bold flex items-center gap-1.5">
            <Palette className="w-4 h-4" /> MODULE 07: WHITE-LABEL IDENTITY
          </span>
          <h1 className="text-2xl font-bold text-ink mt-0.5">
            Branding & Theming Studio
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Customize how your facility looks across member mobile apps and reception turnstile kiosks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Settings Form (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSaveBranding} className="p-6 rounded-2xl bg-surface-1 border border-hairline space-y-6">
              <div>
                <label className="block text-xs font-mono text-ink-subtle mb-1">
                  FACILITY DISPLAY NAME
                </label>
                <input
                  type="text"
                  required
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="w-full p-3 rounded-lg bg-surface-2 border border-hairline focus:border-primary text-ink text-sm outline-none font-sans"
                />
              </div>

              {/* Logo Upload Simulation */}
              <div>
                <label className="block text-xs font-mono text-ink-subtle mb-1">
                  PRIMARY GYM LOGO
                </label>
                <div className="p-4 rounded-xl border border-dashed border-hairline-strong bg-surface-2/60 flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-hairline bg-black shrink-0">
                    <Image
                      src="/logo.svg"
                      alt="Logo Preview"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="space-y-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => alert("Upload custom vector SVG or PNG")}
                      className="text-xs gap-1 font-mono"
                    >
                      <Upload className="w-3.5 h-3.5" /> Upload Brand Logo
                    </Button>
                    <span className="text-[10px] text-ink-subtle block">
                      Recommended: SVG or Transparent PNG (Min 512×512)
                    </span>
                  </div>
                </div>
              </div>

              {/* Accent Color Palette Selector */}
              <div>
                <label className="block text-xs font-mono text-ink-subtle mb-2">
                  PRIMARY BRAND ACCENT COLOR (OKLCH PALETTE)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((th) => (
                    <div
                      key={th.id}
                      onClick={() => setSelectedTheme(th.id)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                        selectedTheme === th.id
                          ? "bg-surface-3 border-primary shadow-sm"
                          : "bg-surface-2 border-hairline hover:border-hairline-strong"
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border border-black/20"
                        style={{ backgroundColor: th.hex }}
                      />
                      <span className="text-xs font-bold text-ink font-mono">{th.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="primary" className="w-full">
                Publish Branding Changes to Member PWA
              </Button>
            </form>
          </div>

          {/* Live Mobile Preview (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-surface-1 border border-hairline space-y-4">
            <span className="text-xs font-mono text-ink-subtle flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-purple-400" /> LIVE APP PREVIEW
            </span>

            {/* Mobile Frame */}
            <div className="w-64 rounded-2xl border-4 border-surface-3 bg-surface-2 p-4 shadow-xl space-y-4">
              <div className="flex items-center gap-2 border-b border-hairline pb-2">
                <div className="w-6 h-6 rounded bg-black relative overflow-hidden border border-hairline">
                  <Image src="/logo.svg" alt="Preview" fill className="object-contain p-0.5" />
                </div>
                <span className="font-bold text-xs text-ink truncate font-mono">
                  {facilityName}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-surface-3 border border-hairline space-y-1 text-center">
                <div
                  className="w-12 h-12 rounded-lg mx-auto flex items-center justify-center font-bold text-sm"
                  style={{
                    backgroundColor: themes.find((t) => t.id === selectedTheme)?.hex,
                    color: "#0D0E11",
                  }}
                >
                  QR
                </div>
                <span className="text-[10px] text-ink-subtle block font-mono">
                  Member Turnstile Pass
                </span>
              </div>

              <button
                type="button"
                className="w-full py-1.5 rounded-lg text-xs font-bold font-mono"
                style={{
                  backgroundColor: themes.find((t) => t.id === selectedTheme)?.hex,
                  color: "#0D0E11",
                }}
              >
                Renew Membership
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
