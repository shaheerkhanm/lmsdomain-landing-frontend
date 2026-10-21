import AboutPage from "@/components/modules/AboutPage";
import FeaturesPage from "@/components/modules/FeaturesPage";
import { fetchSeo } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {

    const data = await fetchSeo({ slug: "about" });
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
        <AboutPage />
    );
}

export default page;
