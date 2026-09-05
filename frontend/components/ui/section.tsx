import * as React from "react";
import { cn } from "@/lib/utils";

/* ==========================================================================
   Editorial layout primitives.

   The v1 marketing pages built every section out of `.glass-panel` boxes with
   a volt Badge kicker on top. That produced uniform card grids with no
   hierarchy - everything shouted at the same volume, which is why the pages
   read as cluttered.

   v2 gives sections one job each: a short left-aligned display headline where
   a single phrase carries the volt, a hairline rule, and content that varies
   in shape section to section.
   ========================================================================== */

/* --- Container ---------------------------------------------------------- */

export function Shell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/* --- Section -----------------------------------------------------------
   Vertical rhythm varies by weight so the page breathes unevenly rather than
   marching at a fixed 96px cadence. `rule` draws the top hairline. */

export function Section({
  id,
  rule = true,
  size = "md",
  className,
  children,
}: {
  id?: string;
  rule?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  const pad = {
    sm: "py-14 sm:py-20",
    md: "py-20 sm:py-28",
    lg: "py-24 sm:py-36",
  }[size];

  return (
    <section
      id={id}
      className={cn(rule && "border-t border-line", pad, className)}
    >
      <Shell>{children}</Shell>
    </section>
  );
}

/* --- Volt ---------------------------------------------------------------
   Inline accent for the one phrase in a headline that carries the colour.
   Solid fill only. Gradient text is banned - it is decorative, never
   meaningful. */

export function V({ children }: { children: React.ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

/* --- Display -----------------------------------------------------------
   clamp max is 4.5rem (72px), under the 6rem ceiling. Tracking sits at
   -0.025em, above the -0.04em floor, so the condensed face never collides. */

export function Display({
  as: Tag = "h2",
  size = "md",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}) {
  const scale = {
    sm: "text-[clamp(1.75rem,4vw,2.5rem)]",
    md: "text-[clamp(2.25rem,6vw,3.5rem)]",
    lg: "text-[clamp(2.75rem,8vw,4.5rem)]",
  }[size];

  return (
    <Tag className={cn("display text-ink", scale, className)}>{children}</Tag>
  );
}

/* --- Lede --------------------------------------------------------------
   The single supporting paragraph under a display headline. Measure-capped. */

export function Lede({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "prose-measure text-[17px] leading-relaxed text-ink-muted",
        className
      )}
    >
      {children}
    </p>
  );
}

/* --- SectionHead -------------------------------------------------------
   Headline + optional lede + optional right-hand slot. `aside` enables the
   asymmetric split used on several sections (headline left, detail right)
   instead of centring everything. */

export function SectionHead({
  title,
  lede,
  aside,
  align = "left",
  className,
}: {
  title: React.ReactNode;
  lede?: React.ReactNode;
  aside?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  if (aside) {
    return (
      <div
        className={cn(
          "grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16",
          className
        )}
      >
        <div className="lg:col-span-7">
          <Display>{title}</Display>
        </div>
        <div className="lg:col-span-5">{aside}</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "space-y-5",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      <Display>{title}</Display>
      {lede && <Lede className={align === "center" ? "mx-auto" : ""}>{lede}</Lede>}
    </div>
  );
}

/* --- Panel -------------------------------------------------------------
   Flat surface, single hairline, no shadow. The v1 `.glass-panel` paired a
   1px border with a 40px blur shadow and a backdrop-filter; that combination
   is the "ghost card" tell. */

export function Panel({
  className,
  accent = false,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement> & { accent?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-surface",
        accent ? "border-primary/45" : "border-line",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

/* --- Rule --------------------------------------------------------------- */

export function Rule({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-line", className)} />;
}

/* --- Figure ------------------------------------------------------------
   A labelled data point. Deliberately NOT the hero-metric template: these
   are never grouped four-across under a hero with a gradient behind them.
   They appear inline, in prose context, where the number is the argument. */

export function Figure({
  value,
  label,
  accent = false,
  className,
}: {
  value: string;
  label: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div
        className={cn(
          "tnum text-[clamp(1.5rem,3vw,2rem)] font-semibold leading-none",
          accent ? "text-primary" : "text-ink"
        )}
      >
        {value}
      </div>
      <div className="text-[13px] leading-snug text-ink-subtle">{label}</div>
    </div>
  );
}
