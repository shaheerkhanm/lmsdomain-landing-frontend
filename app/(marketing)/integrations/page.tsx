import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { Container, SectionHeading } from "@/components/sections/HomeV5/primitives";
import { FinalCta } from "@/components/sections/HomeV5/FinalCta";
import { fullTitle, getMetadataBase } from "@/lib/site";
import { getBreadcrumbListJsonLd, JsonLdScript } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { INTEGRATIONS, INTEGRATION_CATEGORIES, MORE_INTEGRATIONS } from "@/content/integrations";

/* /integrations: the tools LMS Domain connects with (content/integrations.ts). */

const TITLE = "Integrations: Zoom, Google Meet, Teams, Razorpay, Stripe and WhatsApp";
const DESCRIPTION =
  "LMS Domain connects with Zoom, Google Meet and Microsoft Teams for live classes, Razorpay, Paytm, Stripe and DOKU for payments, and WhatsApp for reminders. On every plan.";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata(
    { metadataBase: getMetadataBase(), title: fullTitle(TITLE), description: DESCRIPTION, alternates: { canonical: "/integrations" } },
    { seo: "integrations", image: "platform" }
  );
}

export default function IntegrationsIndexRoute() {
  return (
    <div className="v5 relative bg-white font-sans text-[#0A0A0B] selection:bg-[#0A0A0B] selection:text-white">
      <JsonLdScript
        data={getBreadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Integrations", path: "/integrations" },
        ])}
      />
      <section className="relative isolate overflow-hidden bg-white pb-[clamp(40px,5vw,64px)] pt-[120px] min-[900px]:pt-[168px]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-[-260px] h-[620px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.18),transparent)] blur-2xl" />
        </div>
        <Container className="text-center">
          <nav aria-label="Breadcrumb" className="v5-rise text-[13px] text-[#71717A]">
            <ol className="inline-flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-[#0A0A0B]">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium text-[#0A0A0B]">
                Integrations
              </li>
            </ol>
          </nav>
          <h1
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="v5-rise mx-auto mt-5 max-w-[860px] font-urbanist text-[clamp(36px,5.6vw,68px)] font-semibold leading-[1.03] tracking-[-0.04em] [text-wrap:balance]"
          >
            Works with the tools your academy already uses
          </h1>
          <p style={{ "--d": "180ms" } as React.CSSProperties} className="v5-rise mx-auto mt-5 max-w-[640px] text-[17px] leading-[1.6] text-[#52525B]">
            Teach live on Zoom, Google Meet or Teams, get paid through your own Razorpay or Stripe account, and remind learners on WhatsApp. All on every plan.
          </p>
        </Container>
      </section>

      {INTEGRATION_CATEGORIES.map((cat) => (
        <section key={cat} className="bg-white pb-[clamp(48px,6vw,80px)]">
          <Container>
            <h2 className="font-urbanist text-[24px] font-semibold tracking-[-0.02em]">{cat}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {INTEGRATIONS.filter((i) => i.category === cat).map((i, n) => (
                <Link
                  key={i.slug}
                  href={`/integrations/${i.slug}`}
                  style={{ "--rv-delay": `${(n % 3) * 90}ms` } as React.CSSProperties}
                  className="rv-v4 group flex min-h-[190px] flex-col rounded-[24px] border border-[#ECECF1] bg-white p-7 transition-colors duration-500 hover:bg-[#0A0A0B]"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-urbanist text-[22px] font-semibold tracking-[-0.015em] transition-colors group-hover:text-white">{i.name}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-[#E4E4E7] text-[#0A0A0B] transition-all duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <p className="mt-auto pt-8 text-[14.5px] leading-[1.6] text-[#52525B] transition-colors group-hover:text-[#A1A1AA]">{i.summary}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ))}

      <section className="px-2 sm:px-3">
        <div className="rounded-[28px] bg-[#F4F5F8] py-[clamp(56px,7vw,96px)] sm:rounded-[40px]">
          <Container>
            <SectionHeading eyebrow="Also connects" title="More ways to plug in" />
            <ul className="mx-auto mt-10 grid max-w-[1000px] gap-3 sm:grid-cols-2 lg:mt-14">
              {MORE_INTEGRATIONS.map((m) => (
                <li key={m.name} className="rv-v4 rounded-[20px] bg-white px-6 py-5">
                  <p className="font-urbanist text-[18px] font-semibold">{m.name}</p>
                  <p className="mt-1 text-[14.5px] leading-[1.55] text-[#52525B]">{m.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      <div className="pt-[clamp(72px,9vw,120px)]">
        <FinalCta />
      </div>
      <ScrollReveal />
    </div>
  );
}
