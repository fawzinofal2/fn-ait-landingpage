import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAppBySlug, categoryLabels } from "@/lib/apps";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return {};
  return {
    title: app.name,
    description: app.tagline,
  };
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 py-2.5 text-sm last:border-0 dark:border-slate-800">
      <span className="text-slate-500 dark:text-slate-400">{label}</span>
      <span className="font-medium text-slate-800 dark:text-slate-200">{value}</span>
    </div>
  );
}

function DataSafetyRow({ label, value }: { label: string; value: boolean }) {
  return (
    <li className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
      <span
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${
          value ? "bg-amber-500" : "bg-emerald-500"
        }`}
      >
        {value ? "!" : "✓"}
      </span>
      {label}
    </li>
  );
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
        <div
          className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl text-6xl shadow-lg"
          style={{ background: `linear-gradient(135deg, ${app.accentFrom}, ${app.accentTo})` }}
        >
          {app.iconEmoji}
        </div>
        <div>
          <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/10 dark:text-violet-300">
            {categoryLabels[app.category]}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{app.name}</h1>
          <p className="mt-2 max-w-xl text-slate-500 dark:text-slate-400">{app.tagline}</p>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {app.playStoreUrl && (
          <a
            href={app.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-slate-900"
          >
            ▶ حمّل من Google Play
          </a>
        )}
        <Link
          href={`/privacy/${app.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          سياسة الخصوصية
        </Link>
        <Link
          href={`/terms/${app.slug}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          شروط الاستخدام
        </Link>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">عن التطبيق</h2>
            <div className="mt-3 space-y-4">
              {app.description.split("\n\n").map((p, i) => (
                <p key={i} className="leading-relaxed text-slate-600 dark:text-slate-300">
                  {p}
                </p>
              ))}
            </div>
          </section>

          {app.featuresList.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">أبرز الميزات</h2>
              <ul className="mt-3 space-y-2.5">
                {app.featuresList.map((f, i) => (
                  <li key={i} className="flex gap-2.5 text-slate-600 dark:text-slate-300">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <h3 className="mb-2 font-bold text-slate-900 dark:text-white">معلومات التطبيق</h3>
            <InfoRow label="التصنيف العمري" value={app.ageRating} />
            {app.version && <InfoRow label="الإصدار" value={app.version} />}
            {app.sizeMb && <InfoRow label="الحجم" value={`${app.sizeMb} MB`} />}
            {app.minAndroidVersion && <InfoRow label="أقل إصدار أندرويد" value={app.minAndroidVersion} />}
            {app.releaseDate && (
              <InfoRow
                label="تاريخ الإصدار"
                value={new Date(app.releaseDate).toLocaleDateString("ar-EG", { year: "numeric", month: "long" })}
              />
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
            <h3 className="mb-3 font-bold text-slate-900 dark:text-white">أمان البيانات</h3>
            <ul className="space-y-2.5">
              <DataSafetyRow label="يحتوي على إعلانات" value={app.containsAds} />
              <DataSafetyRow label="مشتريات داخل التطبيق" value={app.hasInAppPurchases} />
              <DataSafetyRow label="يجمع بيانات شخصية" value={app.collectsPersonalData} />
              <DataSafetyRow label="يجمع بيانات الموقع" value={app.collectsLocation} />
            </ul>
            <Link
              href={`/privacy/${app.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400"
            >
              تفاصيل كاملة في سياسة الخصوصية ←
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
