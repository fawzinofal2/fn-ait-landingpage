import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  return { title: dict.about.title, description: dict.about.intro };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{dict.about.title}</h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-500 dark:text-slate-400">{dict.about.intro}</p>
      </header>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        {dict.about.values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-3xl bg-slate-50 p-8 text-center dark:bg-slate-900 sm:p-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{dict.about.whatWeBuild}</h2>
        <div className="mt-6 grid gap-6 text-start sm:grid-cols-3">
          <div>
            <div className="text-3xl">🧒</div>
            <h3 className="mt-2 font-semibold text-slate-800 dark:text-slate-200">{dict.about.kidsGamesTitle}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{dict.about.kidsGamesDesc}</p>
          </div>
          <div>
            <div className="text-3xl">🎮</div>
            <h3 className="mt-2 font-semibold text-slate-800 dark:text-slate-200">{dict.about.gamesTitle}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{dict.about.gamesDesc}</p>
          </div>
          <div>
            <div className="text-3xl">🛠️</div>
            <h3 className="mt-2 font-semibold text-slate-800 dark:text-slate-200">{dict.about.toolsTitle}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{dict.about.toolsDesc}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
