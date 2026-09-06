import Link from "next/link";
import { getAllApps } from "@/lib/apps";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localeHref, type Locale } from "@/lib/i18n/config";
import AppCard from "@/components/AppCard";
import { LogoMark } from "@/components/Logo";

const icons = ["📱", "🌐", "✨", "🔒"];

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const apps = await getAllApps(locale);

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(124,58,237,0.12),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(37,99,235,0.12),transparent_40%)]" />
        <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 sm:py-32">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-900 dark:bg-violet-500/10 dark:text-violet-300">
            <LogoMark size={18} />
            {dict.home.badge}
          </div>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-6xl">
            {dict.home.heroTitle1}
            <span className="bg-gradient-to-l from-violet-600 to-blue-600 bg-clip-text text-transparent"> {dict.home.heroTitle2}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
            {dict.home.heroText}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={localeHref(locale, "/apps")}
              className="rounded-full bg-violet-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-600/25 transition-transform hover:-translate-y-0.5 hover:bg-violet-700"
            >
              {dict.home.exploreApps}
            </Link>
            <Link
              href={localeHref(locale, "/contact")}
              className="rounded-full border border-slate-300 px-7 py-3.5 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {dict.home.contactUs}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.highlights.map((h, i) => (
            <div key={h.title} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-3xl">{icons[i]}</div>
              <h3 className="mt-4 font-bold text-slate-900 dark:text-white">{h.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {apps.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">{dict.home.appsHeading}</h2>
              <p className="mt-2 text-slate-500 dark:text-slate-400">{dict.home.appsSubheading}</p>
            </div>
            <Link href={localeHref(locale, "/apps")} className="hidden text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400 sm:block">
              {dict.home.viewAll}
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} locale={locale} dict={dict} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-l from-violet-600 to-blue-600 px-8 py-16 text-center sm:px-16">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{dict.home.ctaHeading}</h2>
          <p className="mx-auto mt-3 max-w-xl text-violet-100">{dict.home.ctaText}</p>
          <Link
            href={localeHref(locale, "/contact")}
            className="mt-8 inline-block rounded-full bg-white px-7 py-3.5 text-sm font-bold text-violet-700 transition-transform hover:-translate-y-0.5"
          >
            {dict.home.ctaButton}
          </Link>
        </div>
      </section>
    </div>
  );
}
