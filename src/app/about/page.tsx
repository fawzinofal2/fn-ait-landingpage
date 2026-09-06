import type { Metadata } from "next";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "من نحن",
  description: `تعرّف على ${company.name} وقصتنا في تطوير التطبيقات والمواقع.`,
};

const values = [
  { title: "جودة أولًا", desc: "كل تطبيق ننشره يمر بمراحل اختبار دقيقة قبل وصوله لمستخدمينا." },
  { title: "خصوصية واضحة", desc: "نلتزم بالشفافية الكاملة حول البيانات التي نجمعها ولماذا، لكل تطبيق نشرناه." },
  { title: "تصميم بسيط", desc: "نؤمن أن أفضل تجربة استخدام هي الأبسط، سواء للأطفال أو لكبار السن." },
  { title: "دعم مستمر", desc: "نستمع لملاحظات مستخدمينا ونطوّر تطبيقاتنا باستمرار بناءً عليها." },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <header className="text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">من نحن</h1>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-500 dark:text-slate-400">
          {company.name} شركة برمجيات متخصصة بتطوير تطبيقات الهواتف الذكية والمواقع الإلكترونية. نصمّم منتجات
          رقمية — من ألعاب مسلّية للأطفال والكبار إلى أدوات عملية تسهّل الحياة اليومية — وننشرها على متجر
          Google Play بمعايير جودة وخصوصية واضحة.
        </p>
      </header>

      <section className="mt-16 grid gap-6 sm:grid-cols-2">
        {values.map((v) => (
          <div key={v.title} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <h3 className="font-bold text-slate-900 dark:text-white">{v.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{v.desc}</p>
          </div>
        ))}
      </section>

      <section className="mt-16 rounded-3xl bg-slate-50 p-8 text-center dark:bg-slate-900 sm:p-12">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">ماذا نبني؟</h2>
        <div className="mt-6 grid gap-6 text-right sm:grid-cols-3">
          <div>
            <div className="text-3xl">🧒</div>
            <h3 className="mt-2 font-semibold text-slate-800 dark:text-slate-200">ألعاب للأطفال</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              تطبيقات آمنة ومناسبة لأعمارهم، متوافقة مع سياسات جوجل للعائلات.
            </p>
          </div>
          <div>
            <div className="text-3xl">🎮</div>
            <h3 className="mt-2 font-semibold text-slate-800 dark:text-slate-200">ألعاب للجميع</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">ألعاب ألغاز وترفيه مناسبة لكل الأعمار.</p>
          </div>
          <div>
            <div className="text-3xl">🛠️</div>
            <h3 className="mt-2 font-semibold text-slate-800 dark:text-slate-200">أدوات للهواتف</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">تطبيقات مساعدة تحل مشكلة يومية حقيقية.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
