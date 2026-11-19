export interface ContactDetails {
  email: string;
  phone: string;
  whatsappNumber: string;
  addressLines: string[];
  city: string;
  postalCode: string;
  country: string;
  mapUrl?: string;
  hours?: string;
  /** Help center / documentation site; the footer links to it when set */
  helpCenterUrl?: string;
  /** Store links for the LMS Domain app; the badges link to them when set */
  playStoreUrl?: string;
  appStoreUrl?: string;
}

export const defaultContactDetails: ContactDetails = {
  email: "support@lmsdomain.com",
  // Shown only when filled in under Admin > Contact details.
  phone: "",
  whatsappNumber: "",
  // Country only: the exact address is never published (site rule).
  addressLines: [],
  city: "",
  postalCode: "",
  country: "India",
  mapUrl: "",
  hours: "",
  helpCenterUrl: "",
  playStoreUrl: "",
  appStoreUrl: "",
};

