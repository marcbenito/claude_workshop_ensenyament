import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://reserva-sessions.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Només rutes públiques (les privades queden fora del sitemap i del robots).
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "/", changeFrequency: "weekly", priority: 1 },
    { path: "/preguntes", changeFrequency: "monthly", priority: 0.7 },
    { path: "/politica-privacitat", changeFrequency: "yearly", priority: 0.3 },
    { path: "/login", changeFrequency: "monthly", priority: 0.5 },
    { path: "/register", changeFrequency: "monthly", priority: 0.5 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
