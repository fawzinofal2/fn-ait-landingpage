import { getCompany } from "@/lib/company";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const company = getCompany(locale);
  return { title: dict.contact.title, description: `${dict.contact.title} — ${company.name}` };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const company = getCompany(locale);

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{dict.contact.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-slate-400">{dict.contact.subtitle}</p>
      </header>

      <div className="mt-14 grid gap-10 sm:grid-cols-5">
        <div className="sm:col-span-2">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white">{dict.contact.email}</h3>
            <a href={`mailto:${company.supportEmail}`} className="mt-1 block text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400">
              {company.supportEmail}
            </a>
            <h3 className="mt-6 font-bold text-slate-900 dark:text-white">{dict.contact.appSupport}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{dict.contact.appSupportDesc}</p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <ContactForm locale={locale} contact={dict.contact} />
        </div>
      </div>
    </div>
  );
}
