import RefundPolicy from "@/components/modules/RefundPolicy";
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
