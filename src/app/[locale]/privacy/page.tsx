import PolicyDocument from "@/components/PolicyDocument";
import { buildSitePrivacyPolicy } from "@/lib/policy";
import { getCompany } from "@/lib/company";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const company = getCompany(locale);
  return { title: dict.policyPages.sitePrivacyTitle, description: `${dict.policyPages.sitePrivacyTitle} — ${company.name}` };
}

export default async function SitePrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const company = getCompany(locale);

  return (
    <PolicyDocument
      title={dict.policyPages.sitePrivacyTitle}
      subtitle={dict.policyPages.sitePrivacySubtitle(company.website)}
      sections={buildSitePrivacyPolicy(locale)}
    />
  );
}
