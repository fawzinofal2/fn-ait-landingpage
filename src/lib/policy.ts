import type { LocalizedApp } from "./apps";
import type { Locale } from "./i18n/config";
import { getCompany } from "./company";

export type PolicySection = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

const permissionLabelsAr: Record<string, string> = {
  INTERNET: "الوصول إلى الإنترنت — لعرض الإعلانات، وتحميل تحديثات المحتوى، ومزامنة تقدّمك داخل اللعبة.",
  ACCESS_NETWORK_STATE: "التحقق من حالة الاتصال بالشبكة — للتأكد من توفر الإنترنت قبل تحميل الإعلانات أو المزامنة.",
  VIBRATE: "التحكم بالاهتزاز — لتوفير تنبيهات لمسية بسيطة أثناء الاستخدام.",
  BILLING: "إتمام عمليات الشراء داخل التطبيق عبر نظام الفوترة الخاص بمتجر Google Play.",
  ACCESS_FINE_LOCATION: "تحديد الموقع الجغرافي الدقيق — يُستخدم فقط للميزات التي تتطلب ذلك صراحة داخل التطبيق.",
  ACCESS_COARSE_LOCATION: "تحديد الموقع الجغرافي التقريبي — يُستخدم فقط للميزات التي تتطلب ذلك صراحة داخل التطبيق.",
  CAMERA: "الوصول إلى الكاميرا — يُستخدم فقط عند استخدامك ميزة تتطلب التقاط صورة أو فيديو.",
  READ_EXTERNAL_STORAGE: "قراءة الملفات المخزَّنة على جهازك — لاستيراد ملفات تحتاجها داخل التطبيق.",
  WRITE_EXTERNAL_STORAGE: "الكتابة إلى وحدة التخزين — لحفظ ملفات ينشئها التطبيق على جهازك.",
  RECORD_AUDIO: "الوصول إلى الميكروفون — يُستخدم فقط عند استخدامك ميزة تسجيل صوتي.",
  READ_CONTACTS: "قراءة جهات الاتصال — يُستخدم فقط عند استخدامك ميزة مشاركة أو دعوة تتطلب ذلك.",
  POST_NOTIFICATIONS: "إرسال إشعارات — لتذكيرك بالمحتوى الجديد أو متابعة تقدّمك.",
  WAKE_LOCK: "إبقاء الشاشة مستيقظة أثناء الاستخدام النشط للتطبيق.",
};

const permissionLabelsEn: Record<string, string> = {
  INTERNET: "Internet access — to display ads, download content updates, and sync your in-game progress.",
  ACCESS_NETWORK_STATE: "Check network connectivity — to confirm an internet connection is available before loading ads or syncing.",
  VIBRATE: "Control vibration — to provide simple haptic feedback while using the app.",
  BILLING: "Complete in-app purchases via Google Play's billing system.",
  ACCESS_FINE_LOCATION: "Precise location — used only for features inside the app that explicitly require it.",
  ACCESS_COARSE_LOCATION: "Approximate location — used only for features inside the app that explicitly require it.",
  CAMERA: "Camera access — used only when you use a feature that requires taking a photo or video.",
  READ_EXTERNAL_STORAGE: "Read files stored on your device — to import files you need inside the app.",
  WRITE_EXTERNAL_STORAGE: "Write to storage — to save files the app creates on your device.",
  RECORD_AUDIO: "Microphone access — used only when you use a voice-recording feature.",
  READ_CONTACTS: "Read contacts — used only when you use a sharing or invite feature that requires it.",
  POST_NOTIFICATIONS: "Send notifications — to remind you of new content or your progress.",
  WAKE_LOCK: "Keep the screen awake during active use of the app.",
};

function permissionLabel(code: string, locale: Locale): string {
  const labels = locale === "ar" ? permissionLabelsAr : permissionLabelsEn;
  return (
    labels[code] ??
    (locale === "ar"
      ? `صلاحية ${code} — تُستخدم فقط للوظائف المرتبطة بها داخل التطبيق.`
      : `Permission ${code} — used only for the functionality it's tied to inside the app.`)
  );
}

function lastUpdated(locale: Locale): string {
  return new Date().toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildAppPrivacyPolicyAr(app: LocalizedApp): PolicySection[] {
  const company = getCompany("ar");
  const sections: PolicySection[] = [];

  sections.push({
    heading: "مقدمة",
    paragraphs: [
      `توضّح سياسة الخصوصية هذه كيفية تعامل تطبيق "${app.name}" الصادر عن شركة ${company.name} (نُشير إليها في هذه الصفحة بـ"نحن" أو "الشركة") مع بيانات مستخدمي التطبيق. باستخدامك للتطبيق فإنك توافق على الممارسات الموضّحة أدناه.`,
      `هذه السياسة مخصّصة لتطبيق "${app.name}" فقط، وقد تختلف عن سياسات التطبيقات الأخرى الصادرة عن ${company.name}. يمكنك دائمًا الاطّلاع على سياسة أي تطبيق آخر من صفحته الخاصة على موقعنا.`,
    ],
  });

  const dataPoints: string[] = [];
  if (app.collectsPersonalData) {
    dataPoints.push("بيانات تعريفية أساسية تزوّدنا بها بنفسك عند إنشاء حساب أو التواصل معنا (مثل الاسم أو البريد الإلكتروني).");
  } else {
    dataPoints.push("لا يطلب التطبيق منك إنشاء حساب، ولا يجمع بشكل مباشر أي بيانات تعريف شخصية مثل اسمك أو بريدك الإلكتروني أو رقم هاتفك لاستخدام ميزاته الأساسية.");
  }
  if (app.collectsLocation) {
    dataPoints.push("بيانات الموقع الجغرافي، فقط عند منحك الإذن صراحة وعند الحاجة لميزة معيّنة.");
  }
  if (app.containsAds || app.analyticsProvidersList.length > 0) {
    dataPoints.push("معرّفات الجهاز غير الشخصية (مثل معرّف الإعلانات Advertising ID) وبيانات استخدام التطبيق (الشاشات التي تزورها، مدة الجلسة، الأعطال التقنية) بهدف تحسين الأداء وعرض إعلانات مناسبة.");
  }
  if (app.hasInAppPurchases) {
    dataPoints.push("سجلّ عمليات الشراء داخل التطبيق، وتتم معالجته بالكامل عبر أنظمة الفوترة الخاصة بمتجر Google Play، ولا نطّلع نحن ولا نخزّن أي بيانات لبطاقتك البنكية.");
  }
  dataPoints.push("بيانات تقنية عامة عن جهازك (نوع الجهاز، إصدار نظام التشغيل) لأغراض التوافق واستكشاف الأخطاء.");

  sections.push({ heading: "المعلومات التي نجمعها", list: dataPoints });

  sections.push({
    heading: "كيف نستخدم هذه المعلومات",
    list: [
      "تشغيل التطبيق وتوفير ميزاته الأساسية.",
      "تحسين الأداء وإصلاح الأعطال التقنية.",
      ...(app.containsAds ? ["عرض إعلانات، وقياس فعاليتها دون ربطها بهويتك الشخصية."] : []),
      ...(app.hasInAppPurchases ? ["إتمام عمليات الشراء داخل التطبيق ودعمك في حال واجهت مشكلة بها."] : []),
      "التواصل معك للرد على استفساراتك في حال راسلتنا مباشرة.",
    ],
  });

  const thirdParties: string[] = [];
  for (const network of app.adNetworksList) {
    thirdParties.push(
      network === "Google AdMob"
        ? "Google AdMob لعرض الإعلانات داخل التطبيق — سياسة خصوصية Google: https://policies.google.com/privacy"
        : `${network} لعرض الإعلانات داخل التطبيق.`
    );
  }
  for (const provider of app.analyticsProvidersList) {
    thirdParties.push(
      provider.toLowerCase().includes("firebase")
        ? `${provider} لتحليل الاستخدام وتتبّع الأعطال التقنية — سياسة خصوصية Google/Firebase: https://firebase.google.com/support/privacy`
        : `${provider} لتحليل الاستخدام وتحسين التطبيق.`
    );
  }
  if (app.hasInAppPurchases) thirdParties.push("Google Play Billing لمعالجة عمليات الشراء داخل التطبيق بشكل آمن.");

  sections.push({
    heading: "مشاركة المعلومات مع أطراف ثالثة",
    paragraphs: [
      thirdParties.length > 0
        ? "لا نبيع بياناتك لأي جهة. نعتمد على عدد محدود من مزوّدي الخدمات الموثوقين لتشغيل التطبيق، وهم:"
        : "لا نبيع بياناتك ولا نشاركها مع أي طرف ثالث لأغراض تسويقية. قد نُفصح عن معلومات محدودة فقط عند الالتزام القانوني بذلك.",
    ],
    list: thirdParties.length > 0 ? thirdParties : undefined,
  });

  if (app.permissionsList.length > 0) {
    sections.push({
      heading: "الأذونات (Permissions) التي يطلبها التطبيق",
      paragraphs: ["يطلب التطبيق الأذونات التالية من نظام Android، ولا نستخدمها إلا للغرض الموضّح أمام كل منها:"],
      list: app.permissionsList.map((p) => permissionLabel(p, "ar")),
    });
  }

  sections.push({
    heading: "خصوصية الأطفال",
    paragraphs: app.targetsChildren
      ? [
          `تصنيف تطبيق "${app.name}" مناسب للأطفال، ونلتزم بمتطلبات حماية خصوصية الأطفال المعمول بها (بما يتوافق مع مبادئ قانون COPPA الأمريكي وسياسة Google Play للعائلات).`,
          "لا نجمع عن قصد أي بيانات تعريف شخصية من الأطفال دون سن 13 عامًا. أي إعلانات تُعرض ضمن التطبيق تكون غير مخصَّصة إعلانيًا (non-personalized) عند الاستخدام من قبل الأطفال، بما يتوافق مع متطلبات جوجل لتطبيقات العائلة.",
          "إذا كنت وليّ أمر وتعتقد أن طفلك زوّدنا ببيانات شخصية عن طريق الخطأ، يُرجى التواصل معنا فورًا عبر البريد الإلكتروني أدناه لحذفها.",
        ]
      : [
          `تطبيق "${app.name}" غير موجَّه للأطفال دون سن 13 عامًا، ولا نجمع عن قصد بيانات شخصية من الأطفال ضمن هذه الفئة العمرية.`,
          "إذا اكتشفنا أننا جمعنا بيانات شخصية من طفل دون سن 13 دون موافقة وليّ الأمر، سنقوم بحذف هذه البيانات في أقرب وقت ممكن.",
        ],
  });

  sections.push({
    heading: "أمان البيانات",
    paragraphs: [
      "نتّخذ إجراءات تقنية وتنظيمية معقولة لحماية أي بيانات نتعامل معها من الوصول غير المصرَّح به أو الفقدان أو سوء الاستخدام. مع ذلك، لا يمكن ضمان أمان مطلق لأي نقل بيانات عبر الإنترنت بنسبة 100%.",
    ],
  });

  sections.push({
    heading: "الاحتفاظ بالبيانات وحقّك في حذفها",
    paragraphs: [
      "نحتفظ بالبيانات التي نجمعها للمدة اللازمة فقط لتحقيق الأغراض الموضّحة في هذه السياسة، أو حسب ما يقتضيه القانون.",
      "يحق لك في أي وقت طلب الاطّلاع على البيانات المرتبطة بك أو تصحيحها أو حذفها، وذلك بمراسلتنا عبر البريد الإلكتروني الموضّح في نهاية هذه الصفحة.",
    ],
  });

  if (app.containsAds) {
    sections.push({
      heading: "تخصيص الإعلانات والانسحاب منها",
      paragraphs: [
        "يمكنك التحكم بتخصيص الإعلانات المعروضة لك من خلال إعدادات جهازك: افتح إعدادات Android ثم Google ثم الإعلانات، وفعِّل خيار «إلغاء تخصيص الإعلانات» (Opt out of Ads Personalization).",
        ...(app.hasInAppPurchases ? ["كما يمكنك إزالة الإعلانات نهائيًا عبر عملية الشراء المخصَّصة لذلك داخل التطبيق."] : []),
      ],
    });
  }

  sections.push({
    heading: "روابط لأطراف أو خدمات أخرى",
    paragraphs: ["قد يحتوي التطبيق على روابط لصفحات متجر Google Play أو خدمات خارجية أخرى. لسنا مسؤولين عن ممارسات الخصوصية لهذه الأطراف الخارجية، ونشجّعك على مراجعة سياساتها بشكل مستقل."],
  });

  sections.push({
    heading: "التغييرات على هذه السياسة",
    paragraphs: ["قد نحدّث هذه السياسة من وقت لآخر لتعكس تغييرات في التطبيق أو المتطلبات القانونية. سيتم نشر أي تحديث على هذه الصفحة مع تعديل تاريخ آخر تحديث أدناه، وننصحك بمراجعتها بشكل دوري."],
  });

  sections.push({
    heading: "تواصل معنا",
    paragraphs: [
      `لأي استفسار متعلق بالخصوصية أو لطلب حذف بياناتك المتعلقة بتطبيق "${app.name}"، يمكنك مراسلتنا عبر البريد الإلكتروني: ${app.supportEmail || company.privacyEmail}.`,
      `آخر تحديث لهذه السياسة: ${lastUpdated("ar")}.`,
    ],
  });

  return sections;
}

function buildAppPrivacyPolicyEn(app: LocalizedApp): PolicySection[] {
  const company = getCompany("en");
  const sections: PolicySection[] = [];

  sections.push({
    heading: "Introduction",
    paragraphs: [
      `This privacy policy explains how the app "${app.name}" by ${company.name} ("we", "us", or "the Company") handles the data of its users. By using the app, you agree to the practices described below.`,
      `This policy applies to "${app.name}" only and may differ from the policies of other apps published by ${company.name}. You can always find the policy for any other app on its own page on our website.`,
    ],
  });

  const dataPoints: string[] = [];
  if (app.collectsPersonalData) {
    dataPoints.push("Basic identifying information you provide yourself when creating an account or contacting us (such as your name or email address).");
  } else {
    dataPoints.push("The app does not require you to create an account and does not directly collect personal identifying information such as your name, email, or phone number to use its core features.");
  }
  if (app.collectsLocation) {
    dataPoints.push("Location data, only when you explicitly grant permission and when a specific feature requires it.");
  }
  if (app.containsAds || app.analyticsProvidersList.length > 0) {
    dataPoints.push("Non-personal device identifiers (such as your Advertising ID) and app usage data (screens visited, session length, technical crashes) to improve performance and show relevant ads.");
  }
  if (app.hasInAppPurchases) {
    dataPoints.push("A record of in-app purchases, processed entirely through Google Play's billing systems — we never see or store your payment card details.");
  }
  dataPoints.push("General technical information about your device (device type, OS version) for compatibility and troubleshooting purposes.");

  sections.push({ heading: "Information We Collect", list: dataPoints });

  sections.push({
    heading: "How We Use This Information",
    list: [
      "To operate the app and provide its core features.",
      "To improve performance and fix technical issues.",
      ...(app.containsAds ? ["To display ads and measure their effectiveness without linking them to your personal identity."] : []),
      ...(app.hasInAppPurchases ? ["To complete in-app purchases and support you if you run into an issue with one."] : []),
      "To respond to your questions if you contact us directly.",
    ],
  });

  const thirdParties: string[] = [];
  for (const network of app.adNetworksList) {
    thirdParties.push(
      network === "Google AdMob"
        ? "Google AdMob, to display ads within the app — Google's privacy policy: https://policies.google.com/privacy"
        : `${network}, to display ads within the app.`
    );
  }
  for (const provider of app.analyticsProvidersList) {
    thirdParties.push(
      provider.toLowerCase().includes("firebase")
        ? `${provider}, to analyze usage and track technical crashes — Google/Firebase privacy policy: https://firebase.google.com/support/privacy`
        : `${provider}, to analyze usage and improve the app.`
    );
  }
  if (app.hasInAppPurchases) thirdParties.push("Google Play Billing, to securely process in-app purchases.");

  sections.push({
    heading: "Sharing Information with Third Parties",
    paragraphs: [
      thirdParties.length > 0
        ? "We do not sell your data to anyone. We rely on a small number of trusted service providers to operate the app:"
        : "We do not sell or share your data with any third party for marketing purposes. We may disclose limited information only where legally required.",
    ],
    list: thirdParties.length > 0 ? thirdParties : undefined,
  });

  if (app.permissionsList.length > 0) {
    sections.push({
      heading: "Permissions Requested by the App",
      paragraphs: ["The app requests the following Android permissions, and we only use them for the purpose described next to each:"],
      list: app.permissionsList.map((p) => permissionLabel(p, "en")),
    });
  }

  sections.push({
    heading: "Children's Privacy",
    paragraphs: app.targetsChildren
      ? [
          `"${app.name}" is rated as suitable for children, and we comply with applicable children's privacy protection requirements (consistent with the principles of the US COPPA law and Google Play's Families policy).`,
          "We do not knowingly collect any personal identifying information from children under 13. Any ads shown within the app are non-personalized when used by children, in line with Google's requirements for family apps.",
          "If you are a parent and believe your child provided us with personal data by mistake, please contact us immediately at the email address below so we can delete it.",
        ]
      : [
          `"${app.name}" is not directed at children under the age of 13, and we do not knowingly collect personal data from children in this age group.`,
          "If we discover that we have collected personal data from a child under 13 without parental consent, we will delete that data as soon as possible.",
        ],
  });

  sections.push({
    heading: "Data Security",
    paragraphs: [
      "We take reasonable technical and organizational measures to protect any data we handle from unauthorized access, loss, or misuse. That said, no data transmission over the internet can be guaranteed to be 100% secure.",
    ],
  });

  sections.push({
    heading: "Data Retention and Your Right to Deletion",
    paragraphs: [
      "We retain the data we collect only for as long as necessary to fulfill the purposes described in this policy, or as required by law.",
      "You may request to access, correct, or delete the data associated with you at any time by contacting us at the email address at the bottom of this page.",
    ],
  });

  if (app.containsAds) {
    sections.push({
      heading: "Ad Personalization and Opting Out",
      paragraphs: [
        "You can control ad personalization from your device settings: open Android Settings → Google → Ads, and enable “Opt out of Ads Personalization.”",
        ...(app.hasInAppPurchases ? ["You can also remove ads entirely via the dedicated in-app purchase."] : []),
      ],
    });
  }

  sections.push({
    heading: "Links to Other Parties or Services",
    paragraphs: ["The app may contain links to Google Play store pages or other external services. We are not responsible for the privacy practices of these third parties, and we encourage you to review their policies independently."],
  });

  sections.push({
    heading: "Changes to This Policy",
    paragraphs: ["We may update this policy from time to time to reflect changes to the app or legal requirements. Any update will be posted on this page with a revised “last updated” date below, and we recommend reviewing it periodically."],
  });

  sections.push({
    heading: "Contact Us",
    paragraphs: [
      `For any privacy-related question, or to request deletion of your data related to "${app.name}", you can reach us at: ${app.supportEmail || company.privacyEmail}.`,
      `Last updated: ${lastUpdated("en")}.`,
    ],
  });

  return sections;
}

function buildAppTermsOfUseAr(app: LocalizedApp): PolicySection[] {
  const company = getCompany("ar");
  const sections: PolicySection[] = [];

  sections.push({
    heading: "القبول بالشروط",
    paragraphs: [
      `تحكم شروط الاستخدام هذه استخدامك لتطبيق "${app.name}" الصادر عن شركة ${company.name}. بتنزيل التطبيق أو تثبيته أو استخدامه، فإنك تُقر بموافقتك على هذه الشروط. إذا كنت لا توافق عليها، يُرجى عدم استخدام التطبيق.`,
    ],
  });

  sections.push({
    heading: "الفئة العمرية والاستخدام",
    paragraphs: app.targetsChildren
      ? [`تصنيف "${app.name}" مناسب للاستخدام العائلي والأطفال (${app.ageRating}). إذا كان عمر المستخدم أقل من السن القانونية للموافقة على هذه الشروط في بلده، فيجب استخدام التطبيق تحت إشراف وليّ الأمر وموافقته.`]
      : [`التصنيف العمري لهذا التطبيق هو "${app.ageRating}". إذا كنت دون السن القانونية للموافقة على هذه الشروط بشكل مستقل في بلد إقامتك، يجب الحصول على موافقة وليّ الأمر أو الوصي القانوني قبل الاستخدام.`],
  });

  sections.push({
    heading: "ترخيص الاستخدام",
    paragraphs: [`نمنحك ترخيصًا محدودًا وغير حصري وغير قابل للتحويل لاستخدام "${app.name}" لأغراضك الشخصية غير التجارية، وفق هذه الشروط وشروط متجر Google Play.`],
    list: [
      "يُمنع نسخ التطبيق أو إعادة توزيعه أو بيعه أو تأجيره لطرف ثالث.",
      "يُمنع محاولة الهندسة العكسية أو فك تشفير التطبيق أو تعديل شيفرته.",
      "يُمنع استخدام أي أدوات غش أو ثغرات للتلاعب بنتائج اللعبة أو تجاوز آليتها.",
    ],
  });

  if (app.hasInAppPurchases || app.containsAds) {
    sections.push({
      heading: "المشتريات داخل التطبيق والإعلانات",
      paragraphs: [
        ...(app.hasInAppPurchases ? ["قد يوفّر التطبيق مشتريات اختيارية داخل التطبيق (مثل إزالة الإعلانات أو محتوى إضافي)، وتتم معالجة جميع المدفوعات عبر نظام الفوترة الخاص بمتجر Google Play وتخضع لسياسات الاسترداد المعمول بها لدى Google."] : []),
        ...(app.containsAds ? ["قد يعرض التطبيق إعلانات من شركاء إعلانيين مثل Google AdMob لدعم استمرار تقديم التطبيق مجانًا."] : []),
      ],
    });
  }

  sections.push({
    heading: "الملكية الفكرية",
    paragraphs: [`جميع الحقوق والملكية الفكرية المتعلقة بـ"${app.name}" — بما في ذلك التصميم والشعار والمحتوى والشيفرة البرمجية — مملوكة لشركة ${company.name} أو مرخَّصة لها، وهي محمية بموجب قوانين حقوق الملكية الفكرية المعمول بها.`],
  });

  sections.push({
    heading: "إخلاء المسؤولية",
    paragraphs: ['يُقدَّم التطبيق "كما هو" (AS IS) دون أي ضمانات صريحة أو ضمنية بخصوص خلوّه من الأخطاء أو استمراريته دون انقطاع. نبذل جهدنا لضمان جودة الخدمة، لكننا لا نضمن ملاءمته الكاملة لكل الأغراض.'],
  });

  sections.push({
    heading: "حدود المسؤولية",
    paragraphs: [`لا تتحمّل ${company.name} المسؤولية عن أي أضرار غير مباشرة أو عرضية أو تبعية تنشأ عن استخدام التطبيق أو عدم القدرة على استخدامه، إلى أقصى حد يسمح به القانون المعمول به.`],
  });

  sections.push({
    heading: "إنهاء الاستخدام",
    paragraphs: ["يمكنك التوقف عن استخدام التطبيق وإلغاء تثبيته في أي وقت. كما يحق لنا تقييد أو إنهاء وصولك إلى التطبيق في حال مخالفتك لهذه الشروط."],
  });

  sections.push({
    heading: "التعديلات على الشروط",
    paragraphs: [
      "قد نقوم بتحديث هذه الشروط بين الحين والآخر. استمرارك في استخدام التطبيق بعد نشر أي تعديل يُعدّ موافقة منك على الشروط المحدَّثة.",
      `آخر تحديث لهذه الشروط: ${lastUpdated("ar")}.`,
    ],
  });

  sections.push({
    heading: "تواصل معنا",
    paragraphs: [`لأي استفسار بخصوص هذه الشروط، راسلنا عبر البريد الإلكتروني: ${app.supportEmail || company.supportEmail}.`],
  });

  return sections;
}

function buildAppTermsOfUseEn(app: LocalizedApp): PolicySection[] {
  const company = getCompany("en");
  const sections: PolicySection[] = [];

  sections.push({
    heading: "Acceptance of Terms",
    paragraphs: [
      `These terms of use govern your use of "${app.name}" by ${company.name}. By downloading, installing, or using the app, you acknowledge that you agree to these terms. If you do not agree, please do not use the app.`,
    ],
  });

  sections.push({
    heading: "Age Requirements and Use",
    paragraphs: app.targetsChildren
      ? [`"${app.name}" is rated suitable for family and children's use (${app.ageRating}). If the user is under the legal age to agree to these terms in their country, the app must be used under a parent's or guardian's supervision and consent.`]
      : [`This app's age rating is "${app.ageRating}". If you are under the legal age to independently agree to these terms in your country of residence, you must obtain parental or guardian consent before use.`],
  });

  sections.push({
    heading: "License to Use",
    paragraphs: [`We grant you a limited, non-exclusive, non-transferable license to use "${app.name}" for your personal, non-commercial purposes, subject to these terms and Google Play's terms of service.`],
    list: [
      "You may not copy, redistribute, sell, or rent the app to a third party.",
      "You may not attempt to reverse-engineer, decompile, or modify the app's code.",
      "You may not use cheats, hacks, or exploits to manipulate game results or bypass its mechanics.",
    ],
  });

  if (app.hasInAppPurchases || app.containsAds) {
    sections.push({
      heading: "In-App Purchases and Ads",
      paragraphs: [
        ...(app.hasInAppPurchases ? ["The app may offer optional in-app purchases (such as removing ads or extra content). All payments are processed through Google Play's billing system and are subject to Google's applicable refund policies."] : []),
        ...(app.containsAds ? ["The app may display ads from advertising partners such as Google AdMob to help keep the app free."] : []),
      ],
    });
  }

  sections.push({
    heading: "Intellectual Property",
    paragraphs: [`All rights and intellectual property related to "${app.name}" — including its design, logo, content, and source code — are owned by or licensed to ${company.name}, and are protected under applicable intellectual property laws.`],
  });

  sections.push({
    heading: "Disclaimer",
    paragraphs: ['The app is provided "AS IS," without any express or implied warranties regarding being error-free or uninterrupted. We work hard to ensure quality, but we do not guarantee it is fully fit for every purpose.'],
  });

  sections.push({
    heading: "Limitation of Liability",
    paragraphs: [`${company.name} shall not be liable for any indirect, incidental, or consequential damages arising from the use of, or inability to use, the app, to the fullest extent permitted by applicable law.`],
  });

  sections.push({
    heading: "Termination",
    paragraphs: ["You may stop using the app and uninstall it at any time. We also reserve the right to restrict or terminate your access to the app if you violate these terms."],
  });

  sections.push({
    heading: "Changes to These Terms",
    paragraphs: [
      "We may update these terms from time to time. Your continued use of the app after any update is posted constitutes your acceptance of the revised terms.",
      `Last updated: ${lastUpdated("en")}.`,
    ],
  });

  sections.push({
    heading: "Contact Us",
    paragraphs: [`For any question about these terms, email us at: ${app.supportEmail || company.supportEmail}.`],
  });

  return sections;
}

export function buildAppPrivacyPolicy(app: LocalizedApp, locale: Locale): PolicySection[] {
  return locale === "ar" ? buildAppPrivacyPolicyAr(app) : buildAppPrivacyPolicyEn(app);
}

export function buildAppTermsOfUse(app: LocalizedApp, locale: Locale): PolicySection[] {
  return locale === "ar" ? buildAppTermsOfUseAr(app) : buildAppTermsOfUseEn(app);
}

function buildSitePrivacyPolicyAr(): PolicySection[] {
  const company = getCompany("ar");
  return [
    {
      heading: "مقدمة",
      paragraphs: [
        `${company.name} ("نحن" أو "الشركة") استوديو برمجيات متخصص بتصميم وبناء تطبيقات الهواتف الذكية والمواقع الإلكترونية، وننشر تطبيقاتنا على متجر Google Play ضمن عدة تصنيفات (ألعاب أطفال، ألعاب عامة، وأدوات مساعدة).`,
        `توضّح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا وحمايتنا للمعلومات عند زيارتك لموقعنا الإلكتروني ${company.website}. هذه السياسة تخص الموقع فقط ولا تغطي تطبيقاتنا على الهواتف — لكل تطبيق ننشره سياسة خصوصية مستقلة ومخصَّصة له، ويمكنك الوصول إليها من صفحة ذلك التطبيق على الموقع.`,
      ],
    },
    {
      heading: "المعلومات التي نجمعها",
      list: [
        "بيانات تُدخلها بنفسك عبر نموذج التواصل: الاسم، البريد الإلكتروني، ومحتوى رسالتك، ووقت إرسالها.",
        "بيانات تقنية تُجمع تلقائيًا: عنوان IP، نوع المتصفح وإصداره، نوع الجهاز ونظام التشغيل، الصفحة التي أتيت منها، والصفحات التي تصفّحتها — تُجمع عبر سجلات الخادم وأدوات التحليل المعتادة.",
        "ملفات تعريف الارتباط (Cookies) وتقنيات مشابهة، بالتفصيل بالقسم التالي.",
        "لا يتطلّب تصفّح الموقع إنشاء حساب، ولا نجمع عن قصد أي بيانات حسّاسة (صحية، مالية، أو بيومترية) عبر الموقع.",
      ],
    },
    {
      heading: "كيف نستخدم هذه المعلومات",
      list: [
        "الرد على استفساراتك المُرسَلة عبر نموذج التواصل.",
        "فهم كيفية استخدام الزوار للموقع لتحسين محتواه وبنيته وأدائه.",
        "الحفاظ على أمان الموقع وتشغيله بشكل سليم (اكتشاف أي إساءة استخدام أو احتيال أو مشاكل تقنية).",
        "الامتثال لأي التزامات قانونية عند الاقتضاء.",
      ],
    },
    {
      heading: "ملفات تعريف الارتباط (Cookies)",
      list: [
        "ملفات أساسية ضرورية لعمل الموقع بشكل صحيح.",
        "ملفات تحليلية (إن وُجدت) لفهم سلوك الزوار بشكل إجمالي دون التعرّف على هويتهم الشخصية.",
      ],
      paragraphs: ["يمكنك التحكم بملفات تعريف الارتباط أو تعطيلها من إعدادات متصفحك، مع العلم أن بعض ميزات الموقع قد لا تعمل بشكل صحيح بدونها."],
    },
    {
      heading: "كيف نشارك المعلومات",
      list: [
        "لا نبيع بياناتك الشخصية لأي جهة.",
        "قد نشارك بيانات محدودة مع مزوّدي خدمات موثوقين يساعدوننا بتشغيل الموقع (مثل مزوّدي الاستضافة والبنية التحتية)، وهم ملزمون بالحفاظ على سريتها.",
        "قد نُفصح عن معلومات إذا اقتضى القانون ذلك، أو بأمر قضائي، أو لحماية حقوقنا أو حقوق مستخدمينا أو الجمهور.",
        `في حال اندماج ${company.name} أو استحواذها من قبل جهة أخرى أو بيع أصولها، قد تُنقَل المعلومات كجزء من تلك الصفقة، مع الحفاظ على نفس معايير الحماية الموضّحة هنا.`,
      ],
    },
    {
      heading: "خصوصية الأطفال على الموقع",
      paragraphs: [
        "هذا الموقع هو موقع تعريفي عام بالشركة ومنتجاتها، وغير موجَّه للأطفال دون سن 13 عامًا، ولا نجمع عن قصد بيانات شخصية من الأطفال عبر نموذج التواصل بالموقع.",
        "بعض تطبيقاتنا المنشورة على الهواتف مصمَّمة للأطفال — لتلك التطبيقات سياسات خصوصية مستقلة ومتوافقة مع مبادئ حماية خصوصية الأطفال (COPPA) توضّح كيفية تعاملها مع بيانات الأطفال (أو تجنّب جمعها في أغلب الحالات). راجع صفحة سياسة الخصوصية الخاصة بكل تطبيق للتفاصيل.",
      ],
    },
    {
      heading: "أمان البيانات",
      paragraphs: ["نتّخذ إجراءات تقنية وتنظيمية معقولة لحماية المعلومات التي نجمعها من الوصول غير المصرَّح به أو الفقدان أو سوء الاستخدام، مع العلم أنه لا يمكن ضمان أمان مطلق لأي نقل بيانات عبر الإنترنت."],
    },
    {
      heading: "مدة الاحتفاظ بالبيانات",
      paragraphs: ["نحتفظ بالمعلومات فقط للمدة اللازمة لتحقيق الأغراض الموضّحة أعلاه أو حسب ما يقتضيه القانون. رسائل نموذج التواصل تُحفظ فقط طوال المدة اللازمة لمعالجة استفسارك ومتابعته."],
    },
    {
      heading: "النقل الدولي للبيانات",
      paragraphs: ["قد تتم استضافة الموقع أو معالجة بياناته من قبل مزوّدي خدمات في دول مختلفة عن بلد إقامتك. في هذه الحالة نحرص على اتخاذ إجراءات معقولة لحماية بياناتك أينما تمت معالجتها."],
    },
    {
      heading: "حقوقك",
      paragraphs: [
        "حسب موقعك الجغرافي، قد يحق لك الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها أو الاعتراض على معالجتها، وكذلك طلب نسخة منها (نقل البيانات). للتواصل بخصوص أي من هذه الحقوق، راسلنا على البريد الموضّح أدناه.",
        "إذا كنت مقيمًا في الاتحاد الأوروبي (بموجب GDPR) أو ولاية كاليفورنيا (بموجب CCPA)، فقد يكون لك حقوق قانونية إضافية — راسلنا وسنبذل قصارى جهدنا لتلبية الحقوق المطبَّقة على حالتك.",
      ],
    },
    {
      heading: "روابط لتطبيقاتنا ومواقع أخرى",
      paragraphs: ["يحتوي هذا الموقع على روابط لتطبيقاتنا على Google Play، وربما لمواقع أطراف ثالثة. لكل تطبيق وكل صفحة على متجر Google Play سياسة خصوصية خاصة بها، ولسنا مسؤولين عن ممارسات الخصوصية للمواقع الخارجية التي نربط إليها."],
    },
    {
      heading: "التغييرات على هذه السياسة",
      paragraphs: ["قد نحدّث هذه السياسة من وقت لآخر لتعكس تغييرات في الموقع أو المتطلبات القانونية. سيُنشَر أي تحديث على هذه الصفحة مع تعديل تاريخ آخر تحديث أدناه."],
    },
    {
      heading: "تواصل معنا",
      paragraphs: [`لأي استفسار حول ممارسات الخصوصية بالموقع، راسلنا عبر: ${company.privacyEmail}.`, `آخر تحديث: ${lastUpdated("ar")}.`],
    },
  ];
}

function buildSitePrivacyPolicyEn(): PolicySection[] {
  const company = getCompany("en");
  return [
    {
      heading: "Introduction",
      paragraphs: [
        `${company.name} ("we", "us", or "the Company") is a software development studio specialized in designing and building mobile applications and websites, and we publish our apps on Google Play across several categories (children's games, general games, and utility tools).`,
        `This Privacy Policy explains how we collect, use, and protect information when you visit our website at ${company.website}. This policy covers the website only and does not cover our mobile apps — each app we publish has its own dedicated privacy policy, accessible from that app's page on this website.`,
      ],
    },
    {
      heading: "Information We Collect",
      list: [
        "Information you submit yourself through the contact form: your name, email address, message content, and the time it was submitted.",
        "Technical data collected automatically: IP address, browser type and version, device type and operating system, referring page, and pages visited — collected through standard server logs and analytics tools.",
        "Cookies and similar technologies, detailed in the section below.",
        "Browsing the website does not require creating an account, and we do not knowingly collect sensitive personal data (health, financial, or biometric) through the website.",
      ],
    },
    {
      heading: "How We Use This Information",
      list: [
        "To respond to inquiries submitted through the contact form.",
        "To understand how visitors use the site so we can improve its content, structure, and performance.",
        "To maintain the security and proper functioning of the website (detecting abuse, fraud, or technical issues).",
        "To comply with legal obligations when required.",
      ],
    },
    {
      heading: "Cookies and Similar Technologies",
      list: [
        "Essential cookies required for the website's basic functionality.",
        "Analytics cookies (where enabled) to understand aggregate visitor behavior without personally identifying you.",
      ],
      paragraphs: ["You can control or disable cookies through your browser settings, though some site features may not work correctly without them."],
    },
    {
      heading: "How We Share Information",
      list: [
        "We do not sell your personal data to anyone.",
        "We may share limited data with trusted service providers who help us operate the website (such as hosting and infrastructure providers), who are bound by confidentiality obligations.",
        "We may disclose information where required by law, court order, or to protect our rights, our users, or the public.",
        `If ${company.name} is involved in a merger, acquisition, or sale of assets, information may be transferred as part of that transaction, subject to the protections described in this policy.`,
      ],
    },
    {
      heading: "Children's Privacy on the Website",
      paragraphs: [
        "This website itself is a general company and product information site, and is not directed at children under 13. We do not knowingly collect personal data from children through the website's contact form.",
        "Some of our published mobile apps are designed for children — those apps have their own dedicated privacy policies aligned with children's privacy protection principles (COPPA), describing how they handle (or, in most cases, avoid collecting) children's data. Please refer to the specific app's privacy policy page for details.",
      ],
    },
    {
      heading: "Data Security",
      paragraphs: ["We take reasonable technical and organizational measures to protect the information we collect from unauthorized access, loss, or misuse, though no data transmission over the internet can be guaranteed to be completely secure."],
    },
    {
      heading: "Data Retention",
      paragraphs: ["We retain information only for as long as necessary to fulfill the purposes described above, or as required by law. Contact form messages are retained only as long as needed to handle and follow up on your inquiry."],
    },
    {
      heading: "International Data Transfers",
      paragraphs: ["The website or its data may be hosted or processed by service providers located in countries other than your own. Where this is the case, we take reasonable steps to protect your information wherever it is processed."],
    },
    {
      heading: "Your Privacy Rights",
      paragraphs: [
        "Depending on your location, you may have the right to access, correct, delete, or object to the processing of your personal data, and to request a copy of it (data portability). To exercise any of these rights, contact us at the email address below.",
        "If you are a resident of the EU/EEA (under GDPR) or the state of California (under CCPA), you may have additional statutory rights — contact us and we will do our best to honor the rights applicable to your situation.",
      ],
    },
    {
      heading: "Links to Our Apps and Other Websites",
      paragraphs: ["This website contains links to our apps on Google Play, and possibly to third-party websites. Each app and each Google Play listing has its own privacy policy, and we are not responsible for the privacy practices of external sites we link to."],
    },
    {
      heading: "Changes to This Policy",
      paragraphs: ["We may update this policy from time to time to reflect changes to the website or legal requirements. Any update will be posted on this page with a revised “last updated” date below."],
    },
    {
      heading: "Contact Us",
      paragraphs: [`For any question about the website's privacy practices, email us at: ${company.privacyEmail}.`, `Last updated: ${lastUpdated("en")}.`],
    },
  ];
}

function buildSiteTermsOfUseAr(): PolicySection[] {
  const company = getCompany("ar");
  return [
    {
      heading: "القبول بالشروط",
      paragraphs: [`يخضع استخدامك لموقع ${company.website} لهذه الشروط. بمجرّد تصفّحك للموقع فإنك تُقر بموافقتك عليها. إذا كنت لا توافق، يُرجى التوقف عن استخدام الموقع.`],
    },
    {
      heading: "عن fn-ait وخدماتنا",
      paragraphs: [`${company.name} استوديو برمجيات متخصص بتصميم وبناء تطبيقات الهواتف الذكية والمواقع الإلكترونية للأعمال. ننشر تطبيقاتنا بشكل رئيسي على متجر Google Play ضمن تصنيفات متعددة (ألعاب أطفال، ألعاب عامة، وأدوات مساعدة). هذا الموقع هو واجهتنا العامة للتعريف بالشركة وعرض تطبيقاتنا المنشورة.`],
    },
    {
      heading: "استخدام الموقع",
      paragraphs: ["يمكنك تصفّح الموقع والاطّلاع على معلومات الشركة وتطبيقاتها والتواصل معنا. يُمنع عليك:"],
      list: [
        "محاولة الوصول غير المصرَّح به لأي جزء من الموقع أو أنظمتنا.",
        "استخدام أدوات آلية لمسح أو استخراج محتوى الموقع بشكل جماعي (scraping).",
        "إدخال فيروسات أو برمجيات ضارة أو أي كود يهدف للإضرار بالموقع أو مستخدميه.",
        "التدخل في التشغيل الطبيعي للموقع أو محاولة تعطيله.",
        "انتحال شخصية fn-ait أو أحد موظفيها، أو استخدام الموقع لأي غرض غير قانوني.",
      ],
    },
    {
      heading: "الملكية الفكرية",
      paragraphs: [`جميع محتويات هذا الموقع — النصوص والرسومات والشعارات واسم "fn-ait" والهوية البصرية — مملوكة لشركة ${company.name} أو مرخَّصة لها، ومحمية بموجب قوانين حقوق النشر والعلامات التجارية المعمول بها. لا يجوز نسخ هذا المحتوى أو إعادة توزيعه دون إذن كتابي مسبق، باستثناء ما يلزم للتصفّح العادي للموقع.`],
    },
    {
      heading: "تطبيقاتنا وGoogle Play",
      paragraphs: ["روابط تطبيقاتنا على Google Play مقدَّمة لتسهيل وصولك إليها. تنزيل واستخدام أي تطبيق من تطبيقاتنا يخضع لشروط الاستخدام وسياسة الخصوصية الخاصتين بذلك التطبيق تحديدًا (والمتاحتين من صفحته على هذا الموقع)، بالإضافة إلى شروط خدمة متجر Google Play نفسه."],
    },
    {
      heading: "روابط لأطراف ثالثة",
      paragraphs: ["قد يحتوي الموقع على روابط لمواقع أو خدمات لا نملكها ولا نتحكم بها. وجود هذه الروابط لا يعني تأييدنا لمحتواها، ولسنا مسؤولين عن ممارساتها أو محتواها."],
    },
    {
      heading: "لا يُعتبر استشارة",
      paragraphs: ["محتوى هذا الموقع مقدَّم لأغراض تعريفية عامة بالشركة ومنتجاتها فقط، ولا يُشكّل استشارة مهنية أو قانونية أو تقنية."],
    },
    {
      heading: "دقة المعلومات",
      paragraphs: ["نسعى للحفاظ على دقة وحداثة معلومات الموقع، لكننا لا نضمن خلوّها التام من الأخطاء. تفاصيل التطبيقات (الميزات، الأسعار، التوفّر) قابلة للتغيير، والمرجع الأدق دائمًا هو صفحة التطبيق على متجر Google Play."],
    },
    {
      heading: "إخلاء المسؤولية",
      paragraphs: ['يُقدَّم هذا الموقع "كما هو" (AS IS) و"حسب التوفر" (AS AVAILABLE) دون أي ضمانات صريحة أو ضمنية.'],
    },
    {
      heading: "حدود المسؤولية",
      paragraphs: [`لا تتحمّل ${company.name} المسؤولية عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو تبعية تنشأ عن استخدامك لهذا الموقع أو عدم قدرتك على استخدامه، إلى أقصى حد يسمح به القانون المعمول به.`],
    },
    {
      heading: "التعويض",
      paragraphs: [`توافق على تعويض ${company.name} وحمايتها من أي مطالبات أو أضرار أو نفقات (بما فيها أتعاب المحاماة المعقولة) ناتجة عن إساءة استخدامك لهذا الموقع أو مخالفتك لهذه الشروط.`],
    },
    {
      heading: "إنهاء الوصول",
      paragraphs: ["يحق لنا تقييد أو إنهاء وصولك إلى الموقع، دون إشعار مسبق، في حال اعتقدنا أنك خالفت هذه الشروط أو استخدمت الموقع بشكل يضر بنا أو بمستخدمين آخرين."],
    },
    {
      heading: "القانون الواجب التطبيق",
      paragraphs: [`تخضع هذه الشروط للقوانين المعمول بها في الاختصاص القضائي الذي تعمل ${company.name} بموجبه، دون الإخلال بأي حقوق إلزامية قد تتمتع بها بموجب قوانين بلد إقامتك.`],
    },
    {
      heading: "التغييرات على الموقع أو هذه الشروط",
      paragraphs: [
        "يجوز لنا تعديل الموقع أو محتواه أو هذه الشروط في أي وقت. استمرارك باستخدام الموقع بعد نشر أي تعديل يُعدّ موافقة منك عليه.",
        `آخر تحديث: ${lastUpdated("ar")}.`,
      ],
    },
    {
      heading: "تواصل معنا",
      paragraphs: [`لأي استفسار حول هذه الشروط، راسلنا عبر: ${company.supportEmail}.`],
    },
  ];
}

function buildSiteTermsOfUseEn(): PolicySection[] {
  const company = getCompany("en");
  return [
    {
      heading: "Acceptance of These Terms",
      paragraphs: [`Your use of ${company.website} is governed by these terms. By browsing the website, you acknowledge that you agree to them. If you do not agree, please stop using the website.`],
    },
    {
      heading: "About fn-ait and Our Services",
      paragraphs: [`${company.name} is a software development studio specialized in designing and building mobile applications and websites for businesses. We publish our apps primarily on Google Play across multiple categories (children's games, general games, and utility tools). This website serves as our public presence to showcase our company and published apps.`],
    },
    {
      heading: "Use of the Website",
      paragraphs: ["You may browse the site, learn about our company and apps, and contact us. You may not:"],
      list: [
        "Attempt to gain unauthorized access to any part of the website or our systems.",
        "Use automated tools to scrape or bulk-extract content from the site.",
        "Introduce viruses, malware, or any code intended to harm the website or its users.",
        "Interfere with the normal operation of the website or attempt to disrupt it.",
        "Impersonate fn-ait or any of its staff, or use the website for any unlawful purpose.",
      ],
    },
    {
      heading: "Intellectual Property",
      paragraphs: [`All content on this website — text, graphics, logos, the "fn-ait" name, and visual identity — is owned by or licensed to ${company.name}, and is protected under applicable copyright and trademark laws. This content may not be reproduced or redistributed without prior written permission, other than what is necessary for normal browsing of the website.`],
    },
    {
      heading: "Our Apps and Google Play",
      paragraphs: ["Links to our apps on Google Play are provided for your convenience. Downloading and using any of our apps is subject to that specific app's own Terms of Use and Privacy Policy (available from its page on this website), in addition to Google Play's own Terms of Service."],
    },
    {
      heading: "Third-Party Links",
      paragraphs: ["The website may contain links to sites or services we do not own or control. The presence of these links does not imply our endorsement of their content, and we are not responsible for their practices or content."],
    },
    {
      heading: "Not Professional Advice",
      paragraphs: ["The content of this website is provided for general informational purposes about our company and products only, and does not constitute professional, legal, or technical advice."],
    },
    {
      heading: "Accuracy of Information",
      paragraphs: ["We strive to keep the website's information accurate and up to date, but we do not guarantee it is completely free of errors. App details (features, pricing, availability) are subject to change, and the app's own Google Play listing is always the most accurate reference."],
    },
    {
      heading: "Disclaimer of Warranties",
      paragraphs: ['This website is provided "AS IS" and "AS AVAILABLE," without any express or implied warranties.'],
    },
    {
      heading: "Limitation of Liability",
      paragraphs: [`${company.name} shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of, or inability to use, this website, to the fullest extent permitted by applicable law.`],
    },
    {
      heading: "Indemnification",
      paragraphs: [`You agree to indemnify and hold ${company.name} harmless from any claims, damages, or expenses (including reasonable legal fees) arising from your misuse of this website or your violation of these terms.`],
    },
    {
      heading: "Termination of Access",
      paragraphs: ["We reserve the right to restrict or terminate your access to the website, without prior notice, if we believe you have violated these terms or used the website in a way that harms us or other users."],
    },
    {
      heading: "Governing Law",
      paragraphs: [`These terms are governed by the laws applicable in the jurisdiction ${company.name} operates under, without prejudice to any mandatory rights you may have under the laws of your country of residence.`],
    },
    {
      heading: "Changes to the Website or These Terms",
      paragraphs: [
        "We may modify the website, its content, or these terms at any time. Your continued use of the website after any change is posted constitutes your acceptance of it.",
        `Last updated: ${lastUpdated("en")}.`,
      ],
    },
    {
      heading: "Contact Us",
      paragraphs: [`For any question about these terms, email us at: ${company.supportEmail}.`],
    },
  ];
}

export function buildSitePrivacyPolicy(locale: Locale): PolicySection[] {
  return locale === "ar" ? buildSitePrivacyPolicyAr() : buildSitePrivacyPolicyEn();
}

export function buildSiteTermsOfUse(locale: Locale): PolicySection[] {
  return locale === "ar" ? buildSiteTermsOfUseAr() : buildSiteTermsOfUseEn();
}
