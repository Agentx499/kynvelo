import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Display, V } from "@/components/ui/section";

/* Screen 85. Names the role that would grant access, because "Access denied"
   with no explanation generates a support ticket every time.

   This is presentation only. Hiding a control is never authorization - the
   backend enforces the same check on every request. */
export function Forbidden({
  requiredRole = "Gym Owner",
  resource = "this page",
  returnHref = "/app/pulse",
  returnLabel = "Back to your dashboard",
}: {
  requiredRole?: string;
  resource?: string;
  returnHref?: string;
  returnLabel?: string;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-5 py-20 sm:px-8">
      <div className="w-full max-w-lg space-y-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-line bg-surface">
          <Lock className="h-5 w-5 text-ink-muted" aria-hidden="true" />
        </span>

        <div className="space-y-4">
          <p className="tnum text-sm text-ink-subtle">403</p>
          <Display as="h1" size="sm">
            You don&apos;t have <V>access</V> to {resource}.
          </Display>
          <p className="prose-measure text-[17px] leading-relaxed text-ink-muted">
            {resource.charAt(0).toUpperCase() + resource.slice(1)} is restricted
            to the <span className="text-ink">{requiredRole}</span> role. If you
            need it, ask your gym owner to change your staff permissions.
          </p>
        </div>

        <Button asChild variant="secondary">
          <Link href={returnHref}>{returnLabel}</Link>
        </Button>
      </div>
    </div>
  );
}
