-- CreateTable
CREATE TABLE "App" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tagline" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "accentFrom" TEXT NOT NULL DEFAULT '#7C3AED',
    "accentTo" TEXT NOT NULL DEFAULT '#2563EB',
    "iconEmoji" TEXT NOT NULL DEFAULT '🧩',
    "version" TEXT,
    "sizeMb" REAL,
    "releaseDate" DATETIME,
    "minAndroidVersion" TEXT,
    "playStoreUrl" TEXT,
    "appStoreUrl" TEXT,
    "websiteUrl" TEXT,
    "supportEmail" TEXT NOT NULL DEFAULT 'support@fn-ait.com',
    "ageRating" TEXT NOT NULL DEFAULT 'للجميع',
    "targetsChildren" BOOLEAN NOT NULL DEFAULT false,
    "containsAds" BOOLEAN NOT NULL DEFAULT false,
    "hasInAppPurchases" BOOLEAN NOT NULL DEFAULT false,
    "collectsPersonalData" BOOLEAN NOT NULL DEFAULT false,
    "collectsLocation" BOOLEAN NOT NULL DEFAULT false,
    "permissions" JSONB NOT NULL DEFAULT [],
    "analyticsProviders" JSONB NOT NULL DEFAULT [],
    "adNetworks" JSONB NOT NULL DEFAULT [],
    "features" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "App_slug_key" ON "App"("slug");
