import { HomePage } from "@/components/modules/HomePage";
import { fetchSeo } from "@/utils/api";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {

  const data = await fetchSeo({ slug: "home" });
  const { metatitle, metadescription, metakeyword, othermetatags } = data;

  return {
    title: metatitle || "LMS Domain",
    description: metadescription || "LMS Domain Learning Management",
    keywords: metakeyword || ["MCDC Corporate"],
    other: othermetatags
  };
}


export default function Home() {
  return (
    <HomePage />
  );
}
