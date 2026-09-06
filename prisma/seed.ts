import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.app.upsert({
    where: { slug: "puzzloop" },
    update: {},
    create: {
      slug: "puzzloop",
      name: "Puzzloop",
      tagline: "لغز الحلقات اللانهائي — درّب عقلك في كل حلقة",
      description:
        "Puzzloop هي لعبة ألغاز هادئة ومسلّية تعتمد على ربط الحلقات والقطع الملوّنة لتشكيل مسارات كاملة قبل انتهاء الحركات المتاحة. كل مرحلة مصمَّمة لتتحدّى تفكيرك المنطقي بدون ضغط وقت مزعج، بحيث تقدر تلعب دقيقة وحدة وقت الاستراحة أو تغرق بجلسة أطول وانت مرتاح.\n\nاللعبة تدعم مئات المراحل المتدرّجة في الصعوبة، مع نظام تلميحات يساعدك لما تعلق، وتصميم بصري بسيط ومريح للعين مناسب لكل الأعمار. Puzzloop من إنتاج fn-ait ضمن سلسلة تطبيقاتها المخصّصة لجوجل بلاي.",
      category: "GAME",
      status: "PUBLISHED",
      accentFrom: "#7C3AED",
      accentTo: "#2563EB",
      iconEmoji: "🧩",
      version: "1.0.0",
      sizeMb: 42,
      minAndroidVersion: "8.0",
      releaseDate: new Date("2026-01-15"),
      playStoreUrl: "https://play.google.com/store/apps/details?id=com.fnait.puzzloop",
      appStoreUrl: null,
      websiteUrl: "https://play.fn-ait.com/apps/puzzloop",
      supportEmail: "support@fn-ait.com",
      ageRating: "للجميع (3+)",
      targetsChildren: false,
      containsAds: true,
      hasInAppPurchases: true,
      collectsPersonalData: false,
      collectsLocation: false,
      permissions: JSON.stringify([
        "INTERNET",
        "ACCESS_NETWORK_STATE",
        "VIBRATE",
        "BILLING",
      ]),
      analyticsProviders: JSON.stringify([
        "Firebase Analytics",
        "Firebase Crashlytics",
      ]),
      adNetworks: JSON.stringify(["Google AdMob"]),
      features: JSON.stringify([
        "أكثر من 300 مرحلة مصمَّمة يدويًا بمستويات صعوبة متدرّجة",
        "نظام تلميحات ذكي بدون الحاجة لإعادة المرحلة من الصفر",
        "لا حاجة لإنترنت للعب — الاتصال مطلوب فقط لعرض الإعلانات ومزامنة التقدّم",
        "خيار إزالة الإعلانات عبر عملية شراء واحدة داخل التطبيق",
        "تصميم مريح للعين مع دعم الوضع الليلي",
        "أحجام تحميل صغيرة واستهلاك بطارية منخفض",
      ]),
    },
  });

  console.log("✅ Seed data inserted: Puzzloop");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
