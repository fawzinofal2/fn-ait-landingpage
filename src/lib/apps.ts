import { prisma } from "./prisma";
import type { App as PrismaApp } from "@prisma/client";
import type { Locale } from "./i18n/config";

export type AppWithParsed = PrismaApp & {
  permissionsList: string[];
  analyticsProvidersList: string[];
  adNetworksList: string[];
};

export type LocalizedApp = AppWithParsed & {
  tagline: string;
  description: string;
  ageRating: string;
  featuresList: string[];
};

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value as string[];
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }
  return [];
}

function withParsed(app: PrismaApp): AppWithParsed {
  return {
    ...app,
    permissionsList: parseJsonArray(app.permissions),
    analyticsProvidersList: parseJsonArray(app.analyticsProviders),
    adNetworksList: parseJsonArray(app.adNetworks),
  };
}

export function localize(app: AppWithParsed, locale: Locale): LocalizedApp {
  return {
    ...app,
    tagline: locale === "ar" ? app.taglineAr : app.taglineEn,
    description: locale === "ar" ? app.descriptionAr : app.descriptionEn,
    ageRating: locale === "ar" ? app.ageRatingAr : app.ageRatingEn,
    featuresList: parseJsonArray(locale === "ar" ? app.featuresAr : app.featuresEn),
  };
}

export async function getAllApps(locale: Locale): Promise<LocalizedApp[]> {
  const apps = await prisma.app.findMany({ orderBy: { createdAt: "asc" } });
  return apps.map((app) => localize(withParsed(app), locale));
}

export async function getAppBySlug(slug: string, locale: Locale): Promise<LocalizedApp | null> {
  const app = await prisma.app.findUnique({ where: { slug } });
  return app ? localize(withParsed(app), locale) : null;
}
