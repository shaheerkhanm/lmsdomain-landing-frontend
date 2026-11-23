import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms, getComparePages, getIntegrationPages, getLegalPages, getSiteContact, getSiteNavigation } from '@/lib/api/content';
import { ContentSource } from '@/components/content/ContentSource';
import { SECTIONS } from '@/content/cms-sections';
import { mentionsNotLive } from '@/lib/claims';
import { defaultContactDetails } from '@/content/contact';

async function Footer() {
  const [siteContact, addressData, contentData, publishedLegalSlugs, siteNav, compare, integrations] = await Promise.all([
    getSiteContact().catch(() => defaultContactDetails),
    fetchCms("address").catch(() => null),
    fetchCms(SECTIONS.footer.slug).catch(() => null), // site-footer: the live site still reads "footer"
    getLegalPages().catch(() => []),
    getSiteNavigation().catch(() => null),
    getComparePages().catch(() => null),
    getIntegrationPages().catch(() => null),
  ]);
  // Published compare pages (Admin > Website > Compare), as a row of links above the bottom bar
  const compareLinks = (compare?.pages || [])
    .filter((p) => p.published)
    .map((p) => ({ name: p.competitorName, href: `/compare/${p.slug}` }));

  // Integration pages (Admin > Website > Integrations)
  const integrationLinks = (integrations?.pages || []).map((p) => ({ name: p.name, href: `/integrations/${p.slug}` }));

  const effectiveAddressData = {
    twitter: "@LMSDOMAIN",
    instagram: "@LMSDOMAIN",
    youtubelink: "https://youtube.com/@lmsdomain",
    linkedin: "lmsdomain",
    ...(addressData || {}),
    email: siteContact?.email || (addressData as any)?.email || defaultContactDetails.email,
    // Settings > Contact details only: empty there means no phone in the footer.
    phone: siteContact?.phone || "",
    helpCenterUrl: siteContact?.helpCenterUrl || "",
  };

  // Footer description: Settings > Footer content (placeholder text counts as not filled in)
  const description = String((contentData as any)?.content || "");
  const source = !contentData ? "code" : !description.trim() || mentionsNotLive(description) ? "partial" : "api";

  return (
    <ContentSource id="footer" source={source}>
      <div>
        <FooterSection
          contentData={contentData || {}}
          addressData={effectiveAddressData}
          publishedLegalSlugs={publishedLegalSlugs}
          columns={siteNav?.footerColumns}
          compareLinks={compareLinks}
          integrationLinks={integrationLinks}
        />
      </div>
    </ContentSource>
  );
}

export default Footer;
