import Link from "next/link";
import { KynveloLogo } from "@/components/ui/kynvelo-logo";
import { Display, V } from "@/components/ui/section";

/* Shared frame for all four auth routes. v1 had each of the four pages carry
   its own full-page layout, its own Badge kicker and its own trust strip, which
   is why login and signup drifted apart visually.

   Two columns on desktop: the form on the left where the eye lands, context on
   the right. Single column on mobile with the context below the fold, since
   nobody reads a value proposition while trying to sign in. */
export function AuthShell({
  title,
  lede,
  points,
  footNote,
  children,
}: {
  title: React.ReactNode;
  lede: string;
  points: { heading: string; body: string }[];
  footNote?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main id="main" className="min-h-screen">
      <div className="mx-auto grid max-w-6xl gap-14 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:gap-20 lg:py-24">
        <div className="lg:col-span-6">
          <Link href="/" aria-label="Kynvelo home" className="inline-block">
            <KynveloLogo size="sm" />
          </Link>

          <div className="mt-12 space-y-4">
            <Display as="h1" size="md">
              {title}
            </Display>
            <p className="prose-measure text-[17px] leading-relaxed text-ink-muted">
              {lede}
            </p>
          </div>

          <div className="mt-10">{children}</div>

          {footNote && (
            <p className="mt-8 text-[13px] leading-relaxed text-ink-subtle">
              {footNote}
            </p>
          )}
        </div>

        <aside className="lg:col-span-6 lg:pt-[76px]">
          <dl className="divide-y divide-line border-y border-line">
            {points.map((p) => (
              <div key={p.heading} className="py-5">
                <dt className="font-display text-[19px] font-semibold text-ink">
                  {p.heading}
                </dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </main>
  );
}

export { V };
