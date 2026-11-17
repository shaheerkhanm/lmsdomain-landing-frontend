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
};

