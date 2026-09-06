import type { PolicySection } from "@/lib/policy";

export default function PolicyDocument({
  title,
  subtitle,
  sections,
}: {
  title: string;
  subtitle?: string;
  sections: PolicySection[];
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <header className="mb-10 border-b border-slate-200 pb-8 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-3 text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </header>

      <div className="space-y-10">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">{section.heading}</h2>
            {section.paragraphs?.map((p, j) => (
              <p key={j} className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="mt-3 space-y-2">
                {section.list.map((item, j) => (
                  <li key={j} className="flex gap-2.5 leading-relaxed text-slate-600 dark:text-slate-300">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}
