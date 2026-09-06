import Link from "next/link";
import { getAllApps } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localeHref, type Locale } from "@/lib/i18n/config";
import AppCard from "@/components/AppCard";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  return { title: dict.apps.title, description: dict.apps.subtitle };
}

const categoryValues = ["", "KIDS_GAME", "GAME", "TOOL"] as const;

export default async function AppsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const { category } = await searchParams;
  const dict = getDictionary(locale);
  const apps = await getAllApps(locale);
  const filtered = category ? apps.filter((a) => a.category === category) : apps;

  const categories = categoryValues.map((value) => ({
    value,
    label: value === "" ? dict.apps.categoryAll : dict.categories[value],
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{dict.apps.title}</h1>
        <p className="mx-auto mt-3 max-w-xl text-slate-500 dark:text-slate-400">{dict.apps.subtitle}</p>
      </header>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {categories.map((c) => {
          const active = (category ?? "") === c.value;
          return (
            <Link
              key={c.value}
              href={c.value ? `${localeHref(locale, "/apps")}?category=${c.value}` : localeHref(locale, "/apps")}
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
        <p className="py-20 text-center text-slate-500 dark:text-slate-400">{dict.apps.empty}</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((app) => (
            <AppCard key={app.id} app={app} locale={locale} dict={dict} />
          ))}
        </div>
      )}
    </div>
  );
}
