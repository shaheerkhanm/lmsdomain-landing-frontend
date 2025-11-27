import AboutPage from "@/components/modules/AboutPage";
import FeaturesPage from "@/components/modules/FeaturesPage";
import PrivacyPolicy from "@/components/modules/PrivacyPolicy";
import { fetchSeo } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Privacy Policy | LMS Domain",
        description: "LMS Domain Privacy Policy Description",
        keywords: ["LMS Domain"],
    };
}

function page() {
    return (
        <PrivacyPolicy />
    );
}

export default page;
