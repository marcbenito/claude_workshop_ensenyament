import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/**
 * robots.txt: permet el rastreig de les rutes públiques i bloqueja
 * les privades i l'API.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/reservar", "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
