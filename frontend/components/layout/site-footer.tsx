import Link from "next/link";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";

/* Replaces footer.tsx.

   v1 linked four "For Athletes" items and two "For Gyms" items at `#features`,
   an anchor that exists on no page - six dead links in the global footer. Every
   href here resolves to a real route. */

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: "Athletes",
    links: [
      { href: "/#training", label: "Training log" },
      { href: "/#nutrition", label: "Nutrition" },
      { href: "/#recovery", label: "Recovery & readiness" },
      { href: "/#progress", label: "Progress tracking" },
      { href: "/#numbers", label: "TDEE calculator" },
      { href: "/pricing", label: "Pricing" },
      { href: "/signup", label: "Create account" },
    ],
  },
  {
    heading: "Gyms",
    links: [
      { href: "/business", label: "Overview" },
      { href: "/business#how", label: "How it works" },
      { href: "/business#members", label: "What members get" },
      { href: "/business#revenue", label: "Add-on revenue" },
      { href: "/roi-calculator", label: "Churn calculator" },
      { href: "/enterprise", label: "Hardware & white-label" },
      { href: "/business/signup", label: "Start a trial" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/partners", label: "Partner programme" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/refunds", label: "Refunds" },
      { href: "/legal/security", label: "Security" },
      /* /legal/dpa is in LEGAL_SLUGS and therefore in the sitemap, so it needs
         a real inbound link. Previously it was reachable only from another
         legal page - indexed but unlinked from the site body. */
      { href: "/legal/dpa", label: "Data processing" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <Link
              href="/"
              aria-label="Kynvelo home"
              className="-my-2 inline-flex items-center py-2"
            >
              <KynveloLogo size="sm" />
            </Link>
            <p className="max-w-xs text-[15px] leading-relaxed text-ink-muted">
              One system for the gym floor and the people on it. Built in India,
              for Indian gyms.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {COLUMNS.map((col) => (
              <nav key={col.heading} aria-label={col.heading}>
                <h2 className="font-display text-[15px] font-semibold uppercase tracking-wider text-ink">
                  {col.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href + l.label}>
                      <Link
                        href={l.href}
                        className="text-[14px] text-ink-muted transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-line pt-6 text-[13px] text-ink-subtle sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Kynvelo Technologies. All rights reserved.</p>
          <p>
            Compliant with India&apos;s DPDP Act 2023.{" "}
            <Link
              href="/legal/dpdp"
              className="text-ink-muted underline decoration-line underline-offset-4 transition-colors hover:text-primary"
            >
              How we handle your data
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
