/* Single source of truth for public routes.
   The sitemap, robots rules and the legal hub all read from here so a page can
   never be added without appearing in the sitemap, and the sitemap can never
   advertise a slug the legal route does not render. */

export const SITE_URL = "https://kynvelo.com";

export const LEGAL_SLUGS = [
  "terms",
  "privacy",
  "refunds",
  "dpdp",
  "security",
  "dpa",
] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

type Route = {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

/* Marketing and auth surfaces only. /app/* and /admin/* are authenticated
   product and are disallowed in robots.ts. */
export const PUBLIC_ROUTES: Route[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/business", priority: 0.9, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/enterprise", priority: 0.8, changeFrequency: "monthly" },
  { path: "/roi-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/partners", priority: 0.7, changeFrequency: "monthly" },
  { path: "/signup", priority: 0.6, changeFrequency: "monthly" },
  { path: "/business/signup", priority: 0.6, changeFrequency: "monthly" },
  { path: "/login", priority: 0.3, changeFrequency: "yearly" },
  { path: "/business/login", priority: 0.3, changeFrequency: "yearly" },
];

/* /for-gyms re-exports /business. Kept reachable for inbound links but
   excluded from the sitemap so the two URLs don't compete for the same
   keywords - the canonical on that page points at /business. */
export const ALIAS_ROUTES = ["/for-gyms"];
