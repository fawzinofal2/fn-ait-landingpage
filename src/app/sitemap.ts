import type { MetadataRoute } from "next";
import { getAllApps } from "@/lib/apps";
import { company } from "@/lib/company";
import { locales, localeHref } from "@/lib/i18n/config";

export const dynamic = "force-dynamic";

const staticPaths = ["/", "/apps", "/about", "/contact", "/privacy", "/terms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = company.website;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    const apps = await getAllApps(locale);

    for (const path of staticPaths) {
      entries.push({
        url: `${base}${localeHref(locale, path)}`,
        changeFrequency: path === "/" || path === "/apps" ? "weekly" : path === "/about" || path === "/contact" ? "monthly" : "yearly",
        priority: path === "/" ? 1 : path === "/apps" ? 0.9 : path === "/about" || path === "/contact" ? 0.5 : 0.3,
      });
    }

    for (const app of apps) {
      entries.push({ url: `${base}${localeHref(locale, `/apps/${app.slug}`)}`, changeFrequency: "weekly", priority: 0.8 });
      entries.push({ url: `${base}${localeHref(locale, `/privacy/${app.slug}`)}`, changeFrequency: "yearly", priority: 0.4 });
      entries.push({ url: `${base}${localeHref(locale, `/terms/${app.slug}`)}`, changeFrequency: "yearly", priority: 0.4 });
    }
  }

  return entries;
}
