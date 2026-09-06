import type { Locale } from "./i18n/config";

const shared = {
  name: "fn-ait",
  website: "https://play.fn-ait.com",
  supportEmail: "support@fn-ait.com",
  privacyEmail: "privacy@fn-ait.com",
  developerPageUrl: "https://play.google.com/store/apps/dev?id=fn-ait",
};

const byLocale = {
  en: {
    tagline: "Smart Solutions with AI Technology",
    description:
      "fn-ait is a software studio specialized in building smart mobile apps and websites, publishing on Google Play — from kids' and general games to everyday utility tools.",
  },
  ar: {
    tagline: "حلول ذكية بتقنية الذكاء الاصطناعي",
    description:
      "fn-ait شركة برمجيات متخصصة في تطوير تطبيقات الهواتف الذكية والمواقع الإلكترونية، وتنشر تطبيقاتها على متجر Google Play — من ألعاب للأطفال وألعاب عامة إلى أدوات وتطبيقات مساعدة يومية.",
  },
} as const;

export function getCompany(locale: Locale) {
  return { ...shared, ...byLocale[locale] };
}

// Locale-agnostic fields, safe to import where a locale isn't available (e.g. root metadata).
export const company = shared;
