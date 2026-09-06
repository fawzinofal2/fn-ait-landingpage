import Link from "next/link";
import type { LocalizedApp } from "@/lib/apps";
import type { Locale } from "@/lib/i18n/config";
import { localeHref } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export default function AppCard({
  app,
  locale,
  dict,
}: {
  app: LocalizedApp;
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <Link
      href={localeHref(locale, `/apps/${app.slug}`)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800 dark:bg-slate-900"
    >
      <div
        className="flex h-32 items-center justify-center text-5xl"
        style={{
          background: `linear-gradient(135deg, ${app.accentFrom}, ${app.accentTo})`,
        }}
      >
        <span>{app.iconEmoji}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">{app.name}</h3>
          <span className="shrink-0 rounded-full bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
            {dict.categories[app.category as keyof typeof dict.categories]}
          </span>
        </div>
        <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {app.tagline}
        </p>
        <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-violet-600 dark:text-violet-400">
          {dict.apps.viewDetails}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className={`transition-transform ${locale === "ar" ? "rotate-180 group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
