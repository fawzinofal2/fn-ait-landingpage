import Link from "next/link";
import { notFound } from "next/navigation";
import { getAppBySlug } from "@/lib/apps";
import { buildAppPrivacyPolicy } from "@/lib/policy";
import PolicyDocument from "@/components/PolicyDocument";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { localeHref, type Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const app = await getAppBySlug(slug, locale);
  if (!app) return {};
  return { title: `${dict.appDetail.privacyPolicy} — ${app.name}` };
}

export default async function AppPrivacyPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: localeParam, slug } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const app = await getAppBySlug(slug, locale);
  if (!app) notFound();

  return (
    <div>
      <PolicyDocument
        title={`${dict.appDetail.privacyPolicy} — ${app.name}`}
        subtitle={dict.policyPages.appPrivacySubtitle}
        sections={buildAppPrivacyPolicy(app, locale)}
      />
      <div className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <Link href={localeHref(locale, `/apps/${app.slug}`)} className="text-sm font-semibold text-violet-600 hover:text-violet-700 dark:text-violet-400">
          {dict.policyPages.backTo(app.name)}
        </Link>
      </div>
    </div>
  );
}
