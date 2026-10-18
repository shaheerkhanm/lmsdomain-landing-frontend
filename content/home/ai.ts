import { AiSectionContent } from "@/types/content";

export const aiSectionContent: AiSectionContent = {
  badge: "Premium add-on",
  title: "AI that works inside your academy",
  subtitle: "Four premium tools that save your team hours and keep learners moving.",
  tabs: [
    {
      id: "tutor",
      tabNumber: 1,
      tag: "AI TUTOR",
      shortLabel: "AI tutor",
      title: "HelpDesk AI tutor",
      description:
        "Learners ask questions and get answers taken from their own courses. Every chat is saved, with its own history for each course.",
    },
    {
      id: "generator",
      tabNumber: 2,
      tag: "CONTENT DRAFTING",
      shortLabel: "Content",
      title: "Domie AI content generator",
      description:
        "Draft course titles, descriptions and learning outcomes, then edit and publish.",
    },
    {
      id: "analytics",
      tabNumber: 3,
      tag: "PRESCRIPTIVE ANALYTICS",
      shortLabel: "Analytics",
      title: "AI prescriptive analytics",
      description:
        "A dashboard that flags falling enrolments, expiring coupons and low course engagement, with a short summary of what to do next.",
    },
    {
      id: "command_bar",
      tabNumber: 4,
      tag: "COMMAND BAR",
      shortLabel: "Command bar",
      title: "AI command bar",
      description:
        "One search box for every admin page, plus answers to questions about the platform.",
    },
  ],
};
