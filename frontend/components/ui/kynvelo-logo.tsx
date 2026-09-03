"use client";

import React from "react";

interface KynveloLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function KynveloLogo({
  className = "",
  showWordmark = true,
  size = "md",
}: KynveloLogoProps) {
  const sizeMap = {
    sm: { icon: "w-7 h-7", text: "text-sm tracking-[0.18em]" },
    md: { icon: "w-9 h-9", text: "text-base tracking-[0.22em]" },
    lg: { icon: "w-12 h-12", text: "text-xl tracking-[0.25em]" },
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Precision Kinetic Monogram */}
      <div
        className={`relative ${sizeMap[size].icon} shrink-0 rounded-xl bg-gradient-to-b from-[#14161C] to-[#0A0B0E] p-1 border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] flex items-center justify-center group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(198,255,0,0.2)] transition-all`}
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle Ambient Glow */}
          <circle cx="50" cy="50" r="30" fill="#C6FF00" fillOpacity="0.08" />

          {/* Anchor Pillar */}
          <rect
            x="20"
            y="18"
            width="13"
            height="64"
            rx="3"
            fill="#F7F8F8"
          />

          {/* Top Kinetic Blade */}
          <path
            d="M38 52L68 20H90L54 58L38 52Z"
            fill="#C6FF00"
          />

          {/* Bottom Kinetic Blade */}
          <path
            d="M38 60L56 54L90 88H68L38 60Z"
            fill="#C6FF00"
          />
        </svg>
      </div>

      {/* Wordmark */}
      {showWordmark && (
        <div className="flex flex-col">
          <span
            className={`font-mono font-extrabold ${sizeMap[size].text} text-ink leading-tight`}
          >
            KYNVELO
          </span>
          <span className="text-[9px] font-mono tracking-[0.25em] text-ink-subtle uppercase">
            OPERATING SYSTEM
          </span>
        </div>
      )}
    </div>
  );
}
