import AboutPage from "@/components/modules/AboutPage";
import FeaturesPage from "@/components/modules/FeaturesPage";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {

    return {
        title: "About Us | LMS Domain",
        description: "LMS Domain Learning Management",
    };
}

function page() {
    return (
        <AboutPage />
    );
}

export default page;
