import Link from "next/link";
import type { Metadata } from "next";
import { getAllApps, categoryLabels } from "@/lib/apps";
import AppCard from "@/components/AppCard";

export const metadata: Metadata = {
  title: "تطبيقاتنا",
  description: "تصفَّح جميع تطبيقات fn-ait المنشورة على Google Play — ألعاب أطفال، ألعاب عامة، وأدوات.",
};

const categories = [
  { value: "", label: "الكل" },
  { value: "KIDS_GAME", label: categoryLabels.KIDS_GAME },
  { value: "GAME", label: categoryLabels.GAME },
  { value: "TOOL", label: categoryLabels.TOOL },
];

export default async function AppsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const apps = await getAllApps();
  const filtered = category ? apps.filter((a) => a.category === category) : apps;

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">تطبيقاتنا</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">
          كل تطبيقاتنا المنشورة على Google Play، بسياسة خصوصية وشروط استخدام خاصة بكل تطبيق.
        </p>
      </header>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => {
          const active = (category ?? "") === c.value;
          return (
            <Link
              key={c.value}
              href={c.value ? `/apps?category=${c.value}` : "/apps"}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-violet-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
              }`}
            >
              {c.label}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-slate-500 dark:text-slate-400">لا توجد تطبيقات في هذا التصنيف حاليًا.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      )}
    </div>
  );
}
