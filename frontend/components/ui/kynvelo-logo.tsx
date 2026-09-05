import React from "react";

/* The mark: a single flat volt polygon. One colour, mitered points, zero
   rounding, no gradient, no glow, no container chrome. The stem leans (top
   edge sits right of the bottom edge) which is where the kinetic read comes
   from; the arms terminate in sharp tips.

   v1 wrapped this in a gradient box with an inset highlight and a volt
   drop-shadow. That is the "ghost card" pairing (1px border + wide blur
   shadow) and it fought the logo, which is flat. */
export function KynveloMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M22 2 H44 V38 L86 2 H100 L56 50 L100 98 H86 L44 62 V98 H14 Z"
        fill="currentColor"
      />
    </svg>
  );
}

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
  const s = {
    sm: { mark: "h-5 w-5", text: "text-[15px] tracking-[0.16em]" },
    md: { mark: "h-6 w-6", text: "text-[18px] tracking-[0.16em]" },
    lg: { mark: "h-9 w-9", text: "text-[26px] tracking-[0.15em]" },
  }[size];

  return (
    /* min-h-11 keeps any anchor wrapping this at the 44px touch minimum without
       the caller needing to remember negative margins. */
    <span
      className={`inline-flex min-h-11 select-none items-center gap-2.5 ${className}`}
    >
      <KynveloMark className={`${s.mark} shrink-0 text-primary`} />
      {showWordmark && (
        <span
          className={`font-display font-bold uppercase leading-none text-ink ${s.text}`}
        >
          Kynvelo
        </span>
      )}
    </span>
  );
}
