import AboutPage from "@/components/modules/AboutPage";
import FeaturesPage from "@/components/modules/FeaturesPage";
import PrivacyPolicy from "@/components/modules/PrivacyPolicy";
import RefundPolicy from "@/components/modules/RefundPolicy";
import TermsAndConditions from "@/components/modules/TermsAndCondition";
import { fetchSeo } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "⁠Refund & Cancellation Policy | LMS Domain",
        description: "LMS Domain ⁠Refund & Cancellation Policy Description",
        keywords: ["LMS Domain"],
    };
}

function page() {
    return (
        <RefundPolicy />
    );
}

export default page;
