import type { Metadata } from "next";
import BusinessHomePage from "@/app/business/page";

/* Legacy inbound URL kept alive. It renders the same component as /business,
   so it is excluded from the sitemap, disallowed in robots.ts, and canonicalled
   here - otherwise the two URLs compete for the same queries. */
export const metadata: Metadata = {
  title: "Kynvelo for gyms",
  alternates: { canonical: "/business" },
  robots: { index: false, follow: true },
};

export default BusinessHomePage;
