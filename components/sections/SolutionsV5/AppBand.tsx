import React from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/sections/HomeV5/primitives";
import { CertificateScreen, LiveCallScreen, MusicHomeScreen, Phone, TestsScreen, WhatsAppBanner } from "@/components/sections/mobile/AppScreens";
import { AppOptions } from "@/components/sections/mobile/AppOptions";
import { StoreBadges } from "@/components/sections/mobile/StoreBadges";
import { APP_BANDS, type AppBandKey } from "@/content/solutions/app-band";
import { getSiteContact } from "@/lib/api/content";

/*
 * Mobile app band on the Solutions pages: audience-specific text on the left,
 * a realistic phone (cropped by the panel) on the right with a reminder dropping in.
 * Sample academies only.
 */

const SCREENS: Record<AppBandKey, { Screen: React.ComponentType; dark?: boolean }> = {
  "coaching-institutes": { Screen: TestsScreen },
  "language-test-prep-academies": { Screen: LiveCallScreen, dark: true },
  "solo-educators": { Screen: MusicHomeScreen },
  "training-companies": { Screen: CertificateScreen },
};

export async function AppBand({ slug }: { slug: string }) {
  const key = slug as AppBandKey;
  const c = APP_BANDS[key];
  if (!c) return null;
  const { Screen, dark } = SCREENS[key];
  const contact = await getSiteContact().catch(() => null);

  return (
    <section className="bg-white pt-[clamp(80px,10vw,136px)]">
      <Container>
        <div className="rv-v4 relative grid overflow-hidden rounded-[28px] bg-[#F4F5F8] sm:rounded-[40px] lg:grid-cols-[1.05fr_1fr]">
          <div className="relative z-10 p-7 sm:p-12 lg:py-16 lg:pr-4">
            <p className="inline-flex items-center rounded-full border border-[#E4E4E7] bg-white px-3.5 py-1 text-[13px] font-medium text-[#27272A]">Mobile app</p>
            <h2 className="mt-5 max-w-[520px] font-urbanist text-[clamp(28px,3.6vw,42px)] font-semibold leading-[1.08] tracking-[-0.03em] text-[#0A0A0B] [text-wrap:balance]">{c.title}</h2>
            <p className="mt-4 max-w-[480px] text-[16px] leading-[1.6] text-[#52525B]">{c.text}</p>
            <ul className="mt-6 space-y-2.5">
              {c.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] leading-[1.5] text-[#18181B]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#0A0A0B] text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <AppOptions className="mt-7 !items-start text-[13.5px]" />
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <StoreBadges links={{ playStoreUrl: contact?.playStoreUrl, appStoreUrl: contact?.appStoreUrl }} />
              <Link href="/platform/mobile-app" className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#0A0A0B] hover:text-[#6C4BFF]">
                See the mobile apps <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div aria-hidden="true" className="relative h-[400px] sm:h-[460px] lg:h-auto lg:min-h-[520px]">
            <span className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(108,75,255,0.16),transparent)]" />
            <div className="absolute left-1/2 top-6 w-[248px] -translate-x-1/2 sm:top-10 lg:top-14">
              <div className="origin-top scale-[0.9] sm:scale-100">
                <Phone dark={dark}>
                  <Screen />
                </Phone>
              </div>
              <WhatsAppBanner className="mp-drop absolute left-1/2 top-[44px] z-30 w-[270px] -translate-x-1/2 sm:top-[50px]" title={c.alert.title} body={c.alert.body} />
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-[12px] text-[#A1A1AA]">Sample academy shown</p>
      </Container>
    </section>
  );
}
