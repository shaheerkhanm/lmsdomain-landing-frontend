import TermsAndConditions from "@/components/modules/TermsAndCondition";
import { fetchSeo } from "@/utils/api";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "⁠Terms & Service | LMS Domain",
        description: "LMS Domain ⁠Terms & Service Description",
        keywords: ["LMS Domain"],
    };
}

function page() {
    return (
        <TermsAndConditions />
    );
}

export default page;
