import type { ContactHero, ContactFormConfig, ContactTopic } from "@/types/content";

export const DEFAULT_CONTACT_HERO: ContactHero = {
  eyebrow: "✦ CONTACT",
  title: "Talk to the LMS Domain team",
  subtitle:
    "Get in touch with our team about learning platforms, pricing plans, or technical questions.",
};

export const DEFAULT_CONTACT_FORM_CONFIG: ContactFormConfig = {
  submitLabel: "Send message",
  successTitle: "Message received",
  successMessage:
    "Thank you for reaching out. We will review your message and get back to you soon.",
  privacyNote: undefined,
};

export const DEFAULT_CONTACT_TOPICS: ContactTopic[] = [
  { id: "demo", label: "Request a demo" },
  { id: "pricing", label: "Pricing and plans" },
  { id: "support", label: "Support" },
  { id: "partnership", label: "Partnership" },
  { id: "other", label: "Something else" },
];
