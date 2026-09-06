/*
  Warnings:

  - You are about to drop the column `ageRating` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `features` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `tagline` on the `App` table. All the data in the column will be lost.
  - Added the required column `descriptionAr` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionEn` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taglineAr` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taglineEn` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "taglineEn" TEXT NOT NULL,
    "taglineAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
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
    "ageRatingEn" TEXT NOT NULL DEFAULT 'Everyone',
    "ageRatingAr" TEXT NOT NULL DEFAULT 'للجميع',
    "targetsChildren" BOOLEAN NOT NULL DEFAULT false,
    "containsAds" BOOLEAN NOT NULL DEFAULT false,
    "hasInAppPurchases" BOOLEAN NOT NULL DEFAULT false,
    "collectsPersonalData" BOOLEAN NOT NULL DEFAULT false,
    "collectsLocation" BOOLEAN NOT NULL DEFAULT false,
    "permissions" JSONB NOT NULL DEFAULT [],
    "analyticsProviders" JSONB NOT NULL DEFAULT [],
    "adNetworks" JSONB NOT NULL DEFAULT [],
    "featuresEn" JSONB NOT NULL DEFAULT [],
    "featuresAr" JSONB NOT NULL DEFAULT [],
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_App" ("accentFrom", "accentTo", "adNetworks", "analyticsProviders", "appStoreUrl", "category", "collectsLocation", "collectsPersonalData", "containsAds", "createdAt", "hasInAppPurchases", "iconEmoji", "id", "minAndroidVersion", "name", "permissions", "playStoreUrl", "releaseDate", "sizeMb", "slug", "status", "supportEmail", "targetsChildren", "updatedAt", "version", "websiteUrl", "taglineEn", "taglineAr", "descriptionEn", "descriptionAr", "ageRatingEn", "ageRatingAr", "featuresEn", "featuresAr") SELECT "accentFrom", "accentTo", "adNetworks", "analyticsProviders", "appStoreUrl", "category", "collectsLocation", "collectsPersonalData", "containsAds", "createdAt", "hasInAppPurchases", "iconEmoji", "id", "minAndroidVersion", "name", "permissions", "playStoreUrl", "releaseDate", "sizeMb", "slug", "status", "supportEmail", "targetsChildren", "updatedAt", "version", "websiteUrl", "tagline", "tagline", "description", "description", "ageRating", "ageRating", "features", "features" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
CREATE UNIQUE INDEX "App_slug_key" ON "App"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
