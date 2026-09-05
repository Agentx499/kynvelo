"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";

/* One header for both audiences, replacing navbar.tsx, consumer-navbar.tsx and
   business-navbar.tsx.

   v1 had all three carrying five or six uppercase mono links, several with
   icons, plus bullet characters as decoration in the mobile drawer and a volt
   glow on the CTA. Nothing was scannable because everything competed.

   v2: three links, sentence case, body face. Mono is reserved for numerals.
   The backdrop blur stays because a sticky bar over scrolling content is the
   one place it earns its keep; it is not used on panels anywhere. */

/* `neutral` exists because /pricing and /legal/* belong to both audiences.
   Previously they hardcoded audience="gym" while sitting in the athlete nav, so
   an athlete clicking "Pricing" silently became a gym visitor - sign-in
   redirected to /business/login and the CTA became "Start trial". In neutral
   mode the nav itself is the audience choice and no CTA presumes one. */
export type Audience = "athlete" | "gym" | "neutral";

const NAV: Record<Audience, { href: string; label: string }[]> = {
  athlete: [
    { href: "/#training", label: "Training" },
    { href: "/#nutrition", label: "Nutrition" },
    { href: "/#progress", label: "Progress" },
    { href: "/pricing", label: "Pricing" },
  ],
  gym: [
    { href: "/business#how", label: "How it works" },
    { href: "/business#members", label: "Your members" },
    { href: "/roi-calculator", label: "Calculator" },
    { href: "/enterprise", label: "Hardware" },
    { href: "/pricing", label: "Pricing" },
  ],
  neutral: [
    { href: "/", label: "For athletes" },
    { href: "/business", label: "For gyms" },
    { href: "/pricing", label: "Pricing" },
  ],
};

const CONFIG: Record<
  Audience,
  {
    home: string;
    signIn: string;
    signUp: string;
    signUpLabel: string;
    switchHref?: string;
    switchLabel?: string;
  }
> = {
  athlete: {
    home: "/",
    signIn: "/login",
    signUp: "/signup",
    signUpLabel: "Start free",
    switchHref: "/business",
    switchLabel: "For gym owners",
  },
  gym: {
    home: "/business",
    signIn: "/business/login",
    signUp: "/business/signup",
    signUpLabel: "Start trial",
    switchHref: "/",
    switchLabel: "For athletes",
  },
  neutral: {
    home: "/",
    signIn: "/login",
    signUp: "/signup",
    signUpLabel: "Start free",
  },
};

export function SiteHeader({ audience = "athlete" }: { audience?: Audience }) {
  const [open, setOpen] = useState(false);
  const nav = NAV[audience];
  const cfg = CONFIG[audience];

  /* Lock scroll and wire Escape while the drawer is open. */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-[20] border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        {/* -my-2 py-2 keeps the anchor at a 44px hit area without changing the
            visual position of the mark. */}
        <Link
          href={cfg.home}
          aria-label="Kynvelo home"
          className="-my-2 flex shrink-0 items-center py-2"
        >
          <KynveloLogo size="sm" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[14px] text-ink-muted transition-colors hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          {cfg.switchHref && cfg.switchLabel && (
            <Link
              href={cfg.switchHref}
              className="mr-2 text-[13px] text-ink-subtle transition-colors hover:text-ink"
            >
              {cfg.switchLabel}
            </Link>
          )}
          <Button asChild variant="ghost" size="sm">
            <Link href={cfg.signIn}>Sign in</Link>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href={cfg.signUp}>{cfg.signUpLabel}</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="ml-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-md text-ink-muted transition-colors hover:bg-surface hover:text-ink md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-line bg-canvas px-5 pb-8 pt-4 md:hidden"
        >
          <ul className="divide-y divide-line border-y border-line">
            {nav.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-[15px] text-ink transition-colors hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {cfg.switchHref && cfg.switchLabel && (
              <li>
                <Link
                  href={cfg.switchHref}
                  onClick={() => setOpen(false)}
                  className="block py-3.5 text-[15px] text-ink-subtle transition-colors hover:text-primary"
                >
                  {cfg.switchLabel}
                </Link>
              </li>
            )}
          </ul>

          <div className="mt-6 flex flex-col gap-2.5">
            <Button asChild variant="primary" className="w-full">
              <Link href={cfg.signUp} onClick={() => setOpen(false)}>
                {cfg.signUpLabel}
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <Link href={cfg.signIn} onClick={() => setOpen(false)}>
                Sign in
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
