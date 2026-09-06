import type { Metadata } from "next";
import { company } from "@/lib/company";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: `تواصل مع فريق ${company.name}`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">تواصل معنا</h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-500 dark:text-slate-400">
          عندك سؤال، ملاحظة، أو فكرة مشروع؟ راسلنا وسنرد عليك بأقرب وقت.
        </p>
      </header>

      <div className="mt-14 grid gap-10 sm:grid-cols-5">
        <div className="sm:col-span-2">
          <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white">البريد الإلكتروني</h3>
            <a href={`mailto:${company.supportEmail}`} className="mt-1 block text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400">
              {company.supportEmail}
            </a>
            <h3 className="mt-6 font-bold text-slate-900 dark:text-white">دعم التطبيقات</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              لأي استفسار عن تطبيق معيّن، استخدم بريد الدعم الموضّح في صفحة ذلك التطبيق.
            </p>
          </div>
        </div>

        <div className="sm:col-span-3">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
