import PolicyDocument from "@/components/PolicyDocument";
import { buildSiteTermsOfUse } from "@/lib/policy";
import { getCompany } from "@/lib/company";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const company = getCompany(locale);
  return { title: dict.policyPages.siteTermsTitle, description: `${dict.policyPages.siteTermsTitle} — ${company.name}` };
}

export default async function SiteTermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const company = getCompany(locale);

  return (
    <PolicyDocument
      title={dict.policyPages.siteTermsTitle}
      subtitle={dict.policyPages.siteTermsSubtitle(company.website)}
      sections={buildSiteTermsOfUse(locale)}
    />
  );
}
