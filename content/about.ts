export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  linkedinUrl?: string;
  group: "founders" | "team";
  order: number;
  visible: boolean;
}

export interface AboutContent {
  heroTitle: string;
  mission: string;
  companyLegalName: string;
  productName: string;
  city: string;
  region: string;
  country: string;
  yearFounded: number;
  companyBlurb: string;
  team: TeamMember[];
}

export const defaultAboutContent: AboutContent = {
  heroTitle: "We build the platform academies run on.",
  mission:
    "LMS Domain helps language, test-prep and training academies run batches, live classes and tests on their own branded website. We built it because most course platforms are made for selling recorded videos, not for teaching people on a schedule.",
  companyLegalName: "Techiegram",
  productName: "LMS Domain",
  city: "Kozhikode (Calicut)",
  region: "Kerala",
  country: "India",
  yearFounded: 2024,
  companyBlurb:
    "LMS Domain is a SaaS learning platform built by Techiegram, a software company based in Kozhikode, Kerala.",
  team: [
    {
      name: "Shaheer Khan",
      role: "Co-founder",
      photo: "",
      bio: "",
      linkedinUrl: "",
      group: "founders",
      order: 1,
      visible: true,
    },
    {
      name: "Anoop Sha",
      role: "Co-founder",
      photo: "",
      bio: "",
      linkedinUrl: "",
      group: "founders",
      order: 2,
      visible: true,
    },
  ],
};

