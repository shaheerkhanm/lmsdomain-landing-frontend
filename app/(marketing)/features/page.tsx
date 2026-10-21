import FeaturesPage from "@/components/modules/FeaturesPage";
import { fetchSeo } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {

  const data = await fetchSeo({ slug: "features" });
  const { metatitle, metadescription, metakeyword, othermetatags } = data;

  return {
    title: metatitle || "LMS Domain",
    description: metadescription || "LMS Domain Learning Management",
    keywords: metakeyword || ["MCDC Corporate"],
    other: othermetatags
  };
}

function page() {
    return (
        <FeaturesPage />
    );
}

export default page;
