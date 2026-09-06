export type Dictionary = {
  nav: {
    home: string;
    apps: string;
    about: string;
    contact: string;
    openMenu: string;
  };
  footer: {
    quickLinks: string;
    legal: string;
    sitePrivacy: string;
    siteTerms: string;
    appPolicies: string;
    privacy: string;
    terms: string;
    rights: string;
  };
  home: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroText: string;
    exploreApps: string;
    contactUs: string;
    highlights: { title: string; desc: string }[];
    appsHeading: string;
    appsSubheading: string;
    viewAll: string;
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
  apps: {
    title: string;
    subtitle: string;
    categoryAll: string;
    empty: string;
    viewDetails: string;
  };
  appDetail: {
    getOnPlay: string;
    privacyPolicy: string;
    termsOfUse: string;
    about: string;
    features: string;
    appInfo: string;
    ageRating: string;
    version: string;
    size: string;
    minAndroid: string;
    releaseDate: string;
    dataSafety: string;
    containsAds: string;
    hasIAP: string;
    collectsPersonal: string;
    collectsLocation: string;
    fullPrivacyDetails: string;
  };
  about: {
    title: string;
    intro: string;
    values: { title: string; desc: string }[];
    whatWeBuild: string;
    kidsGamesTitle: string;
    kidsGamesDesc: string;
    gamesTitle: string;
    gamesDesc: string;
    toolsTitle: string;
    toolsDesc: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    appSupport: string;
    appSupportDesc: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSend: string;
  };
  policyPages: {
    sitePrivacyTitle: string;
    sitePrivacySubtitle: (website: string) => string;
    siteTermsTitle: string;
    siteTermsSubtitle: (website: string) => string;
    appPrivacySubtitle: string;
    appTermsSubtitle: string;
    backTo: (name: string) => string;
  };
  categories: {
    KIDS_GAME: string;
    GAME: string;
    TOOL: string;
  };
};

const en: Dictionary = {
  nav: {
    home: "Home",
    apps: "Our Apps",
    about: "About",
    contact: "Contact",
    openMenu: "Open menu",
  },
  footer: {
    quickLinks: "Quick Links",
    legal: "Legal",
    sitePrivacy: "Website Privacy Policy",
    siteTerms: "Website Terms of Use",
    appPolicies: "Our Apps' Policies",
    privacy: "Privacy",
    terms: "Terms",
    rights: "All rights reserved.",
  },
  home: {
    badge: "Smart Solutions with AI Technology",
    heroTitle1: "We design apps and websites",
    heroTitle2: "people love",
    heroText:
      "fn-ait is a software studio specialized in building smart mobile apps and websites, publishing on Google Play — from kids' and general games to everyday utility tools.",
    exploreApps: "Explore Our Apps",
    contactUs: "Contact Us",
    highlights: [
      {
        title: "Mobile App Development",
        desc: "We build professional Android apps — from kids' games to everyday tools — and publish them on Google Play.",
      },
      {
        title: "Website Development",
        desc: "Fast, modern websites built with the best technologies, designed to grow with your business.",
      },
      {
        title: "AI-Powered Solutions",
        desc: "We embed AI into our products to deliver a smarter, more personalized experience for our users.",
      },
      {
        title: "Privacy & Transparency",
        desc: "Every app we publish ships with a clear privacy policy and terms of use, compliant with Google Play requirements.",
      },
    ],
    appsHeading: "Our Apps",
    appsSubheading: "Our latest releases on Google Play",
    viewAll: "View all →",
    ctaHeading: "Got an app or website idea?",
    ctaText: "The fn-ait team is ready to turn your idea into a professional digital product, from design to store publishing.",
    ctaButton: "Start Your Project",
  },
  apps: {
    title: "Our Apps",
    subtitle: "Browse all fn-ait apps published on Google Play, each with its own privacy policy and terms of use.",
    categoryAll: "All",
    empty: "No apps in this category yet.",
    viewDetails: "View Details",
  },
  appDetail: {
    getOnPlay: "▶ Get it on Google Play",
    privacyPolicy: "Privacy Policy",
    termsOfUse: "Terms of Use",
    about: "About this app",
    features: "Key Features",
    appInfo: "App Info",
    ageRating: "Age rating",
    version: "Version",
    size: "Size",
    minAndroid: "Min. Android version",
    releaseDate: "Release date",
    dataSafety: "Data Safety",
    containsAds: "Contains ads",
    hasIAP: "In-app purchases",
    collectsPersonal: "Collects personal data",
    collectsLocation: "Collects location data",
    fullPrivacyDetails: "Full details in the privacy policy →",
  },
  about: {
    title: "About Us",
    intro:
      "fn-ait is a software studio specialized in building mobile apps and websites. We design digital products — from fun games for kids and adults to practical tools that make everyday life easier — and publish them on Google Play with clear quality and privacy standards.",
    values: [
      { title: "Quality First", desc: "Every app we publish goes through careful testing before it reaches our users." },
      { title: "Clear Privacy", desc: "We're fully transparent about what data we collect and why, for every app we publish." },
      { title: "Simple Design", desc: "We believe the best user experience is the simplest one, for kids and seniors alike." },
      { title: "Ongoing Support", desc: "We listen to user feedback and keep improving our apps based on it." },
    ],
    whatWeBuild: "What do we build?",
    kidsGamesTitle: "Kids' Games",
    kidsGamesDesc: "Safe, age-appropriate apps that comply with Google's Families policies.",
    gamesTitle: "Games for Everyone",
    gamesDesc: "Puzzle and entertainment games suitable for all ages.",
    toolsTitle: "Mobile Tools",
    toolsDesc: "Utility apps that solve a real everyday problem.",
  },
  contact: {
    title: "Contact Us",
    subtitle: "Have a question, feedback, or a project idea? Reach out and we'll get back to you soon.",
    email: "Email",
    appSupport: "App Support",
    appSupportDesc: "For questions about a specific app, use the support email listed on that app's page.",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Your message",
    formSend: "Send Message",
  },
  policyPages: {
    sitePrivacyTitle: "Privacy Policy",
    sitePrivacySubtitle: (website: string) =>
      `This page covers the ${website} website only. Each of our apps has its own dedicated privacy policy on its page.`,
    siteTermsTitle: "Terms of Use",
    siteTermsSubtitle: (website: string) =>
      `This page covers the ${website} website only. Each of our apps has its own dedicated terms of use on its page.`,
    appPrivacySubtitle: "This policy is specific to this app only and applies to its version published on Google Play.",
    appTermsSubtitle: "These terms govern your use of this specific app.",
    backTo: (name: string) => `← Back to ${name}`,
  },
  categories: {
    KIDS_GAME: "Kids' Games",
    GAME: "Games",
    TOOL: "Tools & Apps",
  },
};

export default en;
