import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

/* v2: dropped the volt box-shadow glow on primary and the `outline` variant
   (it was visually identical to `secondary`). Colour and border carry the
   state change now - no shadow decoration. Radii tightened to match the
   logo's zero-rounding character. */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    const variants = {
      primary:
        "bg-primary text-on-primary font-semibold hover:bg-primary-hover active:bg-primary-active",
      secondary:
        "bg-transparent text-ink border border-line-strong hover:border-ink-subtle hover:bg-surface",
      /* `outline` was visually identical to `secondary` in v1. Kept as an
         alias because 15 call sites use it, 12 of them in the member PWA and
         admin CRM which are out of scope for this overhaul. */
      outline:
        "bg-transparent text-ink border border-line-strong hover:border-ink-subtle hover:bg-surface",
      ghost: "bg-transparent text-ink-muted hover:text-ink hover:bg-surface",
      danger:
        "bg-transparent text-danger border border-danger/40 hover:bg-danger/10 hover:border-danger/70",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-[13px] gap-1.5 rounded-md",
      md: "h-11 px-5 text-sm gap-2 rounded-md",
      lg: "h-12 px-6 text-[15px] gap-2 rounded-md",
      icon: "h-11 w-11 p-0 justify-center rounded-md",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
