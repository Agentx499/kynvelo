import type { Metadata } from "next";
import Link from "next/link";
import { KynveloMark } from "@/components/ui/kynvelo-logo";
import { Button } from "@/components/ui/button";
import { Display, V } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/* Screen 86. Offers routes rather than a search box: on a site this size a
   search input returns worse results than four named destinations. */
export default function NotFound() {
  /* Public routes only. This page is served on unmatched marketing URLs, so a
     link into /app/* would hand crawlers a route that robots.txt disallows. */
  const routes = [
    { href: "/", label: "Athletes", detail: "Training, nutrition, recovery" },
    { href: "/business", label: "Gym owners", detail: "Access, retention, billing" },
    { href: "/pricing", label: "Pricing", detail: "Athlete and gym plans" },
    { href: "/roi-calculator", label: "Churn calculator", detail: "What drop-off costs you" },
  ];

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center px-5 py-20 sm:px-8"
    >
      <div className="w-full max-w-2xl space-y-10">
        <Link
          href="/"
          aria-label="Kynvelo home"
          className="-m-2 inline-flex h-11 w-11 items-center justify-center"
        >
          <KynveloMark className="h-8 w-8 text-primary" />
        </Link>

        <div className="space-y-4">
          <p className="tnum text-sm text-ink-subtle">404</p>
          <Display as="h1" size="md">
            That page isn&apos;t <V>on the floor</V>.
          </Display>
          <p className="prose-measure text-[17px] leading-relaxed text-ink-muted">
            The link may be out of date, or the page may have moved during the
            move to separate athlete and gym-owner sites.
          </p>
        </div>

        <ul className="divide-y divide-line border-y border-line">
          {routes.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-primary"
              >
                <span className="font-display text-xl font-semibold text-ink group-hover:text-primary">
                  {r.label}
                </span>
                <span className="text-right text-[13px] text-ink-subtle">
                  {r.detail}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Button asChild variant="primary">
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </main>
  );
}
