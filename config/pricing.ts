export interface PlanConfig {
  id: string;
  name: string;
  slug?: string;
  tagline?: string;
  monthly: number | null;
  limits?: {
    activeLearners?: number | string;
    adminSeats?: number | string;
    storageGb?: number | string;
    bandwidthGbPerMonth?: number | string;
  };
  features: string[];
  isPopular?: boolean;
  isCustom?: boolean;
}

export interface PricingConfig {
  currency: string;
  annualRule: {
    type: "monthsFree";
    months: number;
  };
  plans: PlanConfig[];
  taxLabel: string;
}

/**
 * Single pricing configuration source.
 *
 * NOTE: The backend API source for pricing (/api/pricing) will be retired once prices
 * are approved by the owner. When `plans` array has entries here, getPricingPage()
 * uses this configuration exclusively and computes yearly pricing as:
 *   monthly × (12 - annualRule.months)
 * Until then (while `plans` is empty), getPricingPage() continues reading the backend.
 */
export const PRICING_CONFIG: PricingConfig = {
  currency: "INR",
  annualRule: {
    type: "monthsFree",
    months: 2,
  },
  plans: [],
  taxLabel: "+ GST",
};
