import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "node:path";
import fs from "node:fs";

if (!process.env.DATABASE_URL && fs.existsSync(path.resolve(process.cwd(), ".env"))) {
  process.loadEnvFile(path.resolve(process.cwd(), ".env"));
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrismaClient() {
  const rawUrl = process.env.DATABASE_URL ?? "file:./dev.db";
  const url = rawUrl.startsWith("file:")
    ? `file:${path.resolve(/* turbopackIgnore: true */ process.cwd(), rawUrl.slice("file:".length))}`
    : rawUrl;

  const adapter = new PrismaBetterSqlite3({ url });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
