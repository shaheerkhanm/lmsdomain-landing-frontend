import PricingPage from "@/components/modules/PricingPage";
import { fetchSeo } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {

  const data = await fetchSeo({ slug: "pricing" });
  const { metatitle, metadescription, metakeyword, othermetatags } = data;

  return {
    title: metatitle || "Pricing",
    description: metadescription || "LMS Domain Learning Management",
    keywords: metakeyword || ["MCDC Corporate"],
    other: othermetatags
  };
}


function page() {
  return (
    <PricingPage />
  );
}

export default page;
