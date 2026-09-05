"use client";

import { useEffect } from "react";
import Link from "next/link";
import { KynveloMark } from "@/components/ui/kynvelo-logo";
import { Button } from "@/components/ui/button";
import { Display, V } from "@/components/ui/section";

/* Screen 89. Surfaces a support reference without leaking a stack trace.
   `error.digest` is the server-generated hash Next attaches in production; it
   correlates to the server log entry, so support can find the incident from
   what the member reads off their screen. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with the Sentry client once the DSN is provisioned.
    console.error(error);
  }, [error]);

  return (
    <main
      id="main"
      className="flex min-h-screen items-center justify-center px-5 py-20 sm:px-8"
    >
      <div className="w-full max-w-xl space-y-9">
        <Link
          href="/"
          aria-label="Kynvelo home"
          className="-m-2 inline-flex h-11 w-11 items-center justify-center"
        >
          <KynveloMark className="h-8 w-8 text-primary" />
        </Link>

        <div className="space-y-4">
          <p className="tnum text-sm text-ink-subtle">500</p>
          <Display as="h1" size="md">
            Something broke on <V>our side</V>.
          </Display>
          <p className="prose-measure text-[17px] leading-relaxed text-ink-muted">
            This is a fault in Kynvelo, not in anything you did. Attendance and
            payment records are unaffected — both are written before any page
            renders.
          </p>
        </div>

        {error.digest && (
          <div className="rounded-lg border border-line bg-surface p-4">
            <p className="text-[13px] text-ink-subtle">
              Quote this reference to support
            </p>
            <p className="tnum mt-1 text-sm text-ink">{error.digest}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={reset} variant="primary">
            Try again
          </Button>
          <Button asChild variant="secondary">
            <Link href="/">Back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
