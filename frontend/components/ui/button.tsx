import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const variantStyles = {
      primary:
        "bg-primary text-on-primary font-semibold shadow-[0_0_20px_rgba(198,255,0,0.25)] hover:bg-primary-hover hover:shadow-[0_0_30px_rgba(198,255,0,0.4)] active:bg-primary-active active:scale-[0.98]",
      secondary:
        "bg-surface-2 text-ink border border-hairline hover:border-hairline-hover hover:bg-surface-3 active:scale-[0.98]",
      outline:
        "border border-hairline-strong text-ink hover:bg-surface-2 hover:border-primary/50 active:scale-[0.98]",
      ghost:
        "text-ink-muted hover:text-ink hover:bg-surface-2 active:scale-[0.98]",
      danger:
        "bg-danger/20 border border-danger/40 text-danger hover:bg-danger/30 active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-md gap-1.5",
      md: "h-10 px-4 text-sm rounded-lg gap-2",
      lg: "h-12 px-6 text-base rounded-xl font-semibold gap-2.5",
      icon: "h-10 w-10 p-0 rounded-lg justify-center",
    };

    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
