import type { MetadataRoute } from "next";
import { getAllApps } from "@/lib/apps";
import { company } from "@/lib/company";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const apps = await getAllApps();
  const base = company.website;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/apps`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const appRoutes: MetadataRoute.Sitemap = apps.flatMap((app) => [
    { url: `${base}/apps/${app.slug}`, changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${base}/privacy/${app.slug}`, changeFrequency: "yearly" as const, priority: 0.4 },
    { url: `${base}/terms/${app.slug}`, changeFrequency: "yearly" as const, priority: 0.4 },
  ]);

  return [...staticRoutes, ...appRoutes];
}
