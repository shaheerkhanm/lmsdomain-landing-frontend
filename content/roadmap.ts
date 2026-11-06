export interface RoadmapItem {
  title: string;
  category: string;
  description: string;
  badge: "Coming soon";
}

export interface RoadmapPageData {
  eyebrow: string;
  title: string;
  subtitle: string;
  note: string;
  items: RoadmapItem[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButtonText: string;
}

export const roadmapPageData: RoadmapPageData = {
  eyebrow: "PRODUCT ROADMAP",
  title: "What we're building next",
  subtitle:
    "A transparent look at upcoming capabilities currently on our product roadmap.",
  note: "Dates aren't fixed; ask us if you need one of these.",
  items: [
    {
      title: "Branded Android and iOS apps",
      category: "Mobile Learning",
      description:
        "Dedicated native white-label mobile applications published to Google Play and Apple App Store under your academy's brand.",
      badge: "Coming soon",
    },
    {
      title: "DRM video protection (Widevine & FairPlay)",
      category: "Security & Content",
      description:
        "Hardware-backed digital rights management to prevent unauthorized screen capture and stream interception on supported browsers.",
      badge: "Coming soon",
    },
    {
      title: "WhatsApp notifications",
      category: "Messaging & Alerts",
      description:
        "Automated WhatsApp messages for batch schedule updates, live class links, payment confirmations, and reminder alerts.",
      badge: "Coming soon",
    },
    {
      title: "WebRTC live classes",
      category: "Classroom Technology",
      description:
        "Built-in, browser-native interactive classroom rooms directly integrated without requiring external software clients.",
      badge: "Coming soon",
    },
    {
      title: "Memberships & recurring subscriptions",
      category: "Monetization",
      description:
        "Recurring monthly and annual subscriptions granting ongoing access to curriculum libraries, community updates, and live sessions.",
      badge: "Coming soon",
    },
    {
      title: "Affiliate program management",
      category: "Growth & Marketing",
      description:
        "Self-serve affiliate partner registration, custom tracking links, conversion attribution, and automated partner commission calculations.",
      badge: "Coming soon",
    },
    {
      title: "Sales funnels",
      category: "Sales Optimization",
      description:
        "Multi-step conversion flows with pre-checkout lead capture, checkout order bumps, and post-purchase upsell offers.",
      badge: "Coming soon",
    },
    {
      title: "AI quiz and assessment generation",
      category: "Domie AI",
      description:
        "Automatic generation of multiple-choice test banks, concept questions, and practice assessments from course lesson transcripts.",
      badge: "Coming soon",
    },
  ],
  ctaTitle: "Need one of these capabilities for your academy?",
  ctaSubtitle:
    "Talk to our engineering team. We prioritize roadmap features based on active academy customer requirements.",
  ctaButtonText: "Talk to us",
};

