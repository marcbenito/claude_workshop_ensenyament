import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

/**
 * Sitemap amb les rutes públiques del lloc.
 * Les rutes privades (/dashboard, /reservar) queden fora expressament.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/login`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/register`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/preguntes`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
