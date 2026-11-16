import { entity } from "@/content/entity";

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
    "We believe every academy deserves its own home online. LMS Domain gives academies, coaching institutes, training companies and independent educators one place to teach, test and get paid, on their own website, under their own name.",
  companyLegalName: entity.facts.company,
  productName: entity.facts.product,
  city: entity.facts.city,
  region: entity.facts.state,
  country: entity.facts.country,
  yearFounded: entity.facts.founded,
  companyBlurb:
    "LMS Domain is built by Techiegram, a product company in India. We design, build and support the platform ourselves, and our team helps every academy set up, from the first course to the first sale.",
  team: [
    {
      name: entity.facts.founders[0],
      role: "Co-founder",
      photo: "",
      bio: "",
      linkedinUrl: "",
      group: "founders",
      order: 1,
      visible: true,
    },
    {
      name: entity.facts.founders[1],
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

