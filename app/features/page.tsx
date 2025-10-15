import FeaturesPage from "@/components/modules/FeaturesPage";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "Pricing | LMS Domain",
        description: "LMS Domain Learning Management",
    };
}

function page() {
    return (
        <FeaturesPage />
    );
}

export default page;
