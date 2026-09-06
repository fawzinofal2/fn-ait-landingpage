import { prisma } from "../src/lib/prisma";

async function main() {
  await prisma.app.upsert({
    where: { slug: "puzzloop" },
    update: {},
    create: {
      slug: "puzzloop",
      name: "Puzzloop",
      taglineEn: "The endless loop puzzle — train your brain, one loop at a time",
      taglineAr: "لغز الحلقات اللانهائي — درّب عقلك في كل حلقة",
      descriptionEn:
        "Puzzloop is a calm and fun puzzle game where you connect colorful loops and pieces to form complete paths before you run out of moves. Each level is designed to challenge your logical thinking without stressful time pressure, so you can play for a quick break or sink into a longer, relaxed session.\n\nThe game supports hundreds of levels with progressively increasing difficulty, a hint system to help you when you're stuck, and a simple, eye-friendly visual design suitable for all ages. Puzzloop is produced by fn-ait as part of its lineup of apps published on Google Play.",
      descriptionAr:
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
      ageRatingEn: "Everyone (3+)",
      ageRatingAr: "للجميع (3+)",
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
      featuresEn: JSON.stringify([
        "300+ hand-crafted levels with progressively increasing difficulty",
        "Smart hint system — no need to restart a level from scratch",
        "No internet required to play — a connection is only needed for ads and progress sync",
        "Option to remove ads with a single one-time in-app purchase",
        "Eye-friendly design with dark mode support",
        "Small download size and low battery usage",
      ]),
      featuresAr: JSON.stringify([
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
