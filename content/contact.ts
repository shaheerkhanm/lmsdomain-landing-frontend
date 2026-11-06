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
  phone: "+91 9539825916",
  whatsappNumber: "+91 9539825916",
  addressLines: [
    "3rd floor, Malabar Gate Hotel",
    "17/1491-D-15, Ram Mohan Rd, Palayam",
  ],
  city: "Kozhikode",
  postalCode: "673004",
  country: "India",
  mapUrl: "",
  hours: "",
};

