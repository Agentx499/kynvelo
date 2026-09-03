"use client";

import React from "react";
import { motion } from "framer-motion";
import { Dumbbell, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

export type AudienceMode = "athlete" | "owner";

interface AudienceToggleProps {
  mode: AudienceMode;
  onModeChange: (mode: AudienceMode) => void;
  className?: string;
}

export function AudienceToggle({
  mode,
  onModeChange,
  className,
}: AudienceToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center p-1 rounded-full bg-surface-2 border border-hairline shadow-inner",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onModeChange("athlete")}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors z-10 cursor-pointer",
          mode === "athlete" ? "text-on-primary" : "text-ink-muted hover:text-ink"
        )}
      >
        {mode === "athlete" && (
          <motion.div
            layoutId="audience-pill"
            className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(198,255,0,0.35)]"
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}
        <Dumbbell className="w-4 h-4 relative z-10" />
        <span className="relative z-10">For Athletes & Lifters</span>
      </button>

      <button
        type="button"
        onClick={() => onModeChange("owner")}
        className={cn(
          "relative flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors z-10 cursor-pointer",
          mode === "owner" ? "text-on-primary" : "text-ink-muted hover:text-ink"
        )}
      >
        {mode === "owner" && (
          <motion.div
            layoutId="audience-pill"
            className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(198,255,0,0.35)]"
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}
        <Building2 className="w-4 h-4 relative z-10" />
        <span className="relative z-10">For Gym Owners & Clubs</span>
      </button>
    </div>
  );
}
