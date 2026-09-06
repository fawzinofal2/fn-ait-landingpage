import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAppBySlug } from "@/lib/apps";
import { buildAppPrivacyPolicy } from "@/lib/policy";
import PolicyDocument from "@/components/PolicyDocument";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = await getAppBySlug(slug);
  if (!app) return {};
  return { title: `سياسة الخصوصية — ${app.name}` };
}

export default async function AppPrivacyPage({
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
        title={`سياسة الخصوصية — ${app.name}`}
        subtitle="هذه السياسة خاصة بهذا التطبيق فقط وتنطبق على نسخته المنشورة على Google Play."
        sections={buildAppPrivacyPolicy(app)}
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <Link href={`/apps/${app.slug}`} className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400">
          ← الرجوع لصفحة {app.name}
        </Link>
      </div>
    </div>
  );
}
