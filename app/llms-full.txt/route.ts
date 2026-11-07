import { NextResponse } from "next/server";
import { entity } from "@/content/entity";
import { teachPlatformData } from "@/content/platform/teach";
import { assessPlatformData } from "@/content/platform/assess";
import { managePlatformData } from "@/content/platform/manage";
import { sellPlatformData } from "@/content/platform/sell";
import { brandPlatformData } from "@/content/platform/brand";
import { securityPlatformData } from "@/content/platform/security";
import { aiPlatformData } from "@/content/platform/ai";
import { languageTestPrepData } from "@/content/solutions/language-test-prep";
import { trainingCompaniesData } from "@/content/solutions/training-companies";
import { coachingInstitutesData } from "@/content/solutions/coaching-institutes";
import { soloEducatorsData } from "@/content/solutions/solo-educators";
import { roadmapPageData } from "@/content/roadmap";
import { PRODUCTION_ORIGIN, getSiteUrl } from "@/lib/site";

export const dynamic = "force-static";

export async function GET() {
  const origin = getSiteUrl() || PRODUCTION_ORIGIN;

  const allFaqs = [
    ...(teachPlatformData.faqs || []),
    ...(assessPlatformData.faqs || []),
    ...(managePlatformData.faqs || []),
    ...(sellPlatformData.faqs || []),
    ...(brandPlatformData.faqs || []),
    ...(securityPlatformData.faqs || []),
    ...(aiPlatformData.faqs || []),
    ...(coachingInstitutesData.faqs || []),
    ...(languageTestPrepData.faqs || []),
    ...(trainingCompaniesData.faqs || []),
    ...(soloEducatorsData.faqs || []),
  ];

  const content = `# LMS Domain — Complete Reference & Entity Facts

> ${entity.long}

## Entity & Corporate Facts

- Product: ${entity.facts.product}
- Legal Entity: ${entity.facts.company}
- Founded: ${entity.facts.founded}
- Location: ${entity.facts.basedIn}
- Founders: ${entity.facts.founders.join(" and ")}
- Official Website: ${origin}
- Support Email: ${entity.facts.supportEmail}

## Confirmed Live Features

${entity.confirmedFeatures.map((f) => `- **${f.title}**: ${f.description}`).join("\n")}

## Frequently Asked Questions

${allFaqs.map((faq) => `### ${faq.question}\n\n${faq.answer}\n`).join("\n")}

## Upcoming Features (Coming Soon on Roadmap)

These features are not live today and are currently in development on our roadmap:

${roadmapPageData.items
  .map(
    (item) =>
      `- **${item.title}** (${item.category} — ${item.badge}): ${item.description}`
  )
  .join("\n")}
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}

