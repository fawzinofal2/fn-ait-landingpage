import Link from "next/link";
import Logo from "./Logo";
import { company } from "@/lib/company";
import { getAllApps, categoryLabels } from "@/lib/apps";

export default async function Footer() {
  const apps = await getAllApps();

  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {company.description}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">روابط سريعة</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/" className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400">الرئيسية</Link></li>
              <li><Link href="/apps" className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400">تطبيقاتنا</Link></li>
              <li><Link href="/about" className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400">من نحن</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400">تواصل معنا</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">قانوني</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href="/privacy" className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400">سياسة خصوصية الموقع</Link></li>
              <li><Link href="/terms" className="text-slate-500 hover:text-violet-600 dark:text-slate-400 dark:hover:text-violet-400">شروط استخدام الموقع</Link></li>
            </ul>
          </div>
        </div>

        {apps.length > 0 && (
          <div className="mt-10 border-t border-slate-200 pt-8 dark:border-slate-800">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">سياسات تطبيقاتنا</h3>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <li key={app.id} className="flex flex-wrap items-center gap-x-2 text-slate-500 dark:text-slate-400">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{app.name}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">{categoryLabels[app.category]}</span>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <Link href={`/privacy/${app.slug}`} className="hover:text-violet-600 dark:hover:text-violet-400">الخصوصية</Link>
                  <span className="text-slate-300 dark:text-slate-600">/</span>
                  <Link href={`/terms/${app.slug}`} className="hover:text-violet-600 dark:hover:text-violet-400">الاستخدام</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-slate-200 pt-6 text-xs text-slate-400 dark:border-slate-800 dark:text-slate-500 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {company.name}. جميع الحقوق محفوظة.</p>
          <p>{company.taglineEn}</p>
        </div>
      </div>
    </footer>
  );
}
