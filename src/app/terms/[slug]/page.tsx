import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAppBySlug } from "@/lib/apps";
import { buildAppTermsOfUse } from "@/lib/policy";
import PolicyDocument from "@/components/PolicyDocument";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return {};
  return { title: `شروط الاستخدام — ${app.name}` };
}

export default async function AppTermsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) notFound();

  return (
    <div>
      <PolicyDocument
        title={`شروط الاستخدام — ${app.name}`}
        subtitle="تحكم هذه الشروط استخدامك لهذا التطبيق تحديدًا."
        sections={buildAppTermsOfUse(app)}
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <Link href={`/apps/${app.slug}`} className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400">
          ← الرجوع لصفحة {app.name}
        </Link>
      </div>
    </div>
  );
}
