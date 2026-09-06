import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCompany } from "@/lib/company";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { locales, dirFor, type Locale } from "@/lib/i18n/config";

// App data (apps, policies) lives in the SQLite database and can change via
// re-seeding without a rebuild, so every page renders per-request.
export const dynamic = "force-dynamic";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const company = getCompany(locale);

  return {
    metadataBase: new URL(company.website),
    title: {
      default: `${company.name} — ${company.tagline}`,
      template: `%s | ${company.name}`,
    },
    description: company.description,
    alternates: {
      languages: { en: "/", ar: "/ar" },
    },
    openGraph: {
      title: company.name,
      description: company.description,
      url: locale === "ar" ? "/ar" : "/",
      siteName: company.name,
      locale: locale === "ar" ? "ar_AR" : "en_US",
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: company.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: company.name,
      description: company.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} dir={dirFor(locale)} className={`${cairo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
        <Header locale={locale} nav={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} dict={dict} />
      </body>
    </html>
  );
}
