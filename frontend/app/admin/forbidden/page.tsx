import type { Metadata } from "next";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Forbidden } from "@/components/system/forbidden";

export const metadata: Metadata = {
  title: "Access restricted",
  robots: { index: false, follow: false },
};

/* Screen 85 given a reachable route.

   components/system/forbidden.tsx was written to spec and then imported
   nowhere, so the permission-denied state was unreachable on all 24 routes.
   Rendering it inside AdminLayout means a receptionist who follows a link to an
   owner-only screen keeps their navigation and understands why they were
   stopped, instead of getting a bare page.

   This is presentation only. Once middleware and role checks exist, the guard
   redirects here; authorization itself is enforced server-side on every
   request, never by hiding a link. */
export default function AdminForbiddenPage() {
  return (
    <AdminLayout>
      <Forbidden
        requiredRole="Gym Owner"
        resource="the billing ledger"
        returnHref="/admin/terminal"
        returnLabel="Back to the check-in terminal"
      />
    </AdminLayout>
  );
}
