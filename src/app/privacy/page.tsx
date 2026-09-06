import type { Metadata } from "next";
import PolicyDocument from "@/components/PolicyDocument";
import { buildSitePrivacyPolicy } from "@/lib/policy";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: `سياسة خصوصية موقع ${company.name}`,
};

export default function SitePrivacyPage() {
  return (
    <PolicyDocument
      title="سياسة الخصوصية"
      subtitle={`تخص هذه الصفحة موقع ${company.website} فقط. لكل تطبيق من تطبيقاتنا سياسة خصوصية خاصة به من صفحته على موقعنا.`}
      sections={buildSitePrivacyPolicy()}
    />
  );
}
