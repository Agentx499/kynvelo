import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* Authenticated product surfaces and the alias route. /for-gyms is
           disallowed rather than canonicalised away because it renders the
           same component as /business; letting both index splits ranking. */
        disallow: ["/app/", "/admin/", "/superadmin/", "/ops/", "/for-gyms"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
