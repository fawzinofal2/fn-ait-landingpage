import { prisma } from "./prisma";
import type { App as PrismaApp } from "@prisma/client";

export type AppWithParsed = PrismaApp & {
  permissionsList: string[];
  analyticsProvidersList: string[];
  adNetworksList: string[];
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
    featuresList: parseJsonArray(app.features),
  };
}

export async function getAllApps(): Promise<AppWithParsed[]> {
  const apps = await prisma.app.findMany({ orderBy: { createdAt: "asc" } });
  return apps.map(withParsed);
}

export async function getAppBySlug(slug: string): Promise<AppWithParsed | null> {
  const app = await prisma.app.findUnique({ where: { slug } });
  return app ? withParsed(app) : null;
}

export const categoryLabels: Record<string, string> = {
  KIDS_GAME: "ألعاب أطفال",
  GAME: "ألعاب",
  TOOL: "أدوات وتطبيقات",
};
