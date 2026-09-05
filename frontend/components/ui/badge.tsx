import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning" | "danger";
}

/* Status only: live indicators, plan tiers, risk tiers, stock state.
   NOT a section eyebrow. Repeating a small tracked uppercase label above every
   section heading is AI scaffolding, and v1 did exactly that on nearly every
   marketing section. The marketing pages no longer use Badge for headings. */
function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const variants = {
    primary: "bg-primary-dim text-primary border-primary/30",
    secondary: "bg-surface-2 text-ink-muted border-line",
    outline: "bg-transparent text-ink-muted border-line-strong",
    success: "bg-success/12 text-success border-success/30",
    warning: "bg-warning/12 text-warning border-warning/30",
    danger: "bg-danger/12 text-danger border-danger/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-medium leading-5 tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
