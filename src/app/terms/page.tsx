import type { Metadata } from "next";
import PolicyDocument from "@/components/PolicyDocument";
import { buildSiteTermsOfUse } from "@/lib/policy";
import { company } from "@/lib/company";

export const metadata: Metadata = {
  title: "شروط الاستخدام",
  description: `شروط استخدام موقع ${company.name}`,
};

export default function SiteTermsPage() {
  return (
    <PolicyDocument
      title="شروط الاستخدام"
      subtitle={`تخص هذه الصفحة موقع ${company.website} فقط. لكل تطبيق من تطبيقاتنا شروط استخدام خاصة به من صفحته على موقعنا.`}
      sections={buildSiteTermsOfUse()}
    />
  );
}
