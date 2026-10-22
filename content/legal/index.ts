import type { LegalPageData } from "@/types/content";
import { privacypolicyPageData } from "./privacy-policy";
import { termsPageData } from "./terms";
import { refundpolicyPageData } from "./refund-policy";
import { dpaPageData } from "./dpa";

export const DEFAULT_LEGAL_PAGES: Record<string, LegalPageData> = {
  "privacy-policy": privacypolicyPageData,
  "terms": termsPageData,
  "refund-policy": refundpolicyPageData,
  "dpa": dpaPageData,
};

export {
  privacypolicyPageData,
  termsPageData,
  refundpolicyPageData,
  dpaPageData,
};
