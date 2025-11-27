import DataProcessingAgreement from "@/components/modules/DataProcessingAgreement";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "DPA | LMS Domain",
        description: "LMS Domain Data Processing Agreement Description",
        keywords: ["LMS Domain"],
    };
}

function page() {
    return (
        <DataProcessingAgreement />
    );
}

export default page;
