import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Display, Shell } from "@/components/ui/section";
import { LEGAL_CONTENT } from "@/lib/legal-content";
import { LEGAL_SLUGS, type LegalSlug } from "@/lib/site";

/* All six slugs from SCREENS.md page 84 now render. v1 shipped four and
   silently fell back to the privacy policy for anything else - so /legal/refunds
   served the privacy text under a "Privacy Policy" heading. */
export function generateStaticParams() {
  return LEGAL_SLUGS.map((slug) => ({ slug }));
}

/* Any slug outside generateStaticParams returns a real 404 rather than being
   rendered on demand. Without this, calling notFound() inside the component
   still emitted HTTP 200 with the not-found UI - a soft 404, which search
   engines will happily index. The slug set is fixed at build time, so there is
   no reason to serve unknown params at all. */
export const dynamicParams = false;

function isLegalSlug(v: string): v is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(v);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isLegalSlug(slug)) return { title: "Not found" };

  const doc = LEGAL_CONTENT[slug];
  return {
    title: doc.title,
    description: doc.summary,
    alternates: { canonical: `/legal/${slug}` },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isLegalSlug(slug)) notFound();

  const doc = LEGAL_CONTENT[slug];

  return (
    <>
      {/* Neutral: legal pages are reached from the footer by both audiences. */}
      <SiteHeader audience="neutral" />

      <main id="main">
        <Shell className="py-16 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sticky table of contents. Offset clears the 64px sticky header. */}
            <nav
              aria-label="Legal documents"
              className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start"
            >
              <h2 className="text-[13px] uppercase tracking-wider text-ink-subtle">
                Documents
              </h2>
              <ul className="mt-4 space-y-2.5">
                {LEGAL_SLUGS.map((s) => (
                  <li key={s}>
                    <Link
                      href={`/legal/${s}`}
                      aria-current={s === slug ? "page" : undefined}
                      className={`text-[14px] transition-colors ${
                        s === slug
                          ? "text-primary"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {LEGAL_CONTENT[s].title}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 border-t border-line pt-5">
                <h2 className="text-[13px] uppercase tracking-wider text-ink-subtle">
                  On this page
                </h2>
                <ul className="mt-4 space-y-2">
                  {doc.sections.map((s, i) => (
                    <li key={i}>
                      <a
                        href={`#s-${i}`}
                        className="text-[13px] leading-snug text-ink-muted transition-colors hover:text-primary"
                      >
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <article className="lg:col-span-9">
              <Display as="h1" size="md">
                {doc.title}
              </Display>

              <p className="prose-measure mt-5 text-[17px] leading-relaxed text-ink-muted">
                {doc.summary}
              </p>

              <p className="mt-4 text-[13px] text-ink-subtle">
                Last updated {doc.updated}
              </p>

              <div className="mt-12 space-y-10 border-t border-line pt-10">
                {doc.sections.map((s, i) => (
                  <section key={i} id={`s-${i}`} className="scroll-mt-24">
                    <h2 className="font-display text-[22px] font-semibold text-ink">
                      {s.heading}
                    </h2>
                    <p className="prose-measure mt-3 text-[16px] leading-relaxed text-ink-muted">
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>

              <aside className="mt-14 rounded-lg border border-line bg-surface p-6">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Questions about any of this
                </h2>
                <p className="prose-measure mt-2 text-[15px] leading-relaxed text-ink-muted">
                  Gym members should contact their gym first — under the DPDP Act
                  the gym is the Data Fiduciary for member records. Direct
                  athletes and gym operators can reach us at{" "}
                  <a
                    href="mailto:privacy@kynvelo.com"
                    className="text-ink underline decoration-line underline-offset-4 transition-colors hover:text-primary"
                  >
                    privacy@kynvelo.com
                  </a>
                  .
                </p>
              </aside>
            </article>
          </div>
        </Shell>
      </main>

      <SiteFooter />
    </>
  );
}
