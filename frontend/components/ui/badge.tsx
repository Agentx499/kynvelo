import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "primary" | "secondary" | "outline" | "success" | "warning" | "danger";
}

function Badge({ className, variant = "primary", ...props }: BadgeProps) {
  const variantStyles = {
    primary: "bg-primary/15 text-primary border-primary/30 font-medium",
    secondary: "bg-surface-2 text-ink-muted border-hairline",
    outline: "border-hairline-strong text-ink",
    success: "bg-success/15 text-success border-success/30",
    warning: "bg-warning/15 text-warning border-warning/30",
    danger: "bg-danger/15 text-danger border-danger/30",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors font-mono tracking-tight",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
