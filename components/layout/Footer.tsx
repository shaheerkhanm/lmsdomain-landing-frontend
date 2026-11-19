import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms, getLegalPages, getSiteContact, getSiteNavigation } from '@/lib/api/content';
import { ContentSource } from '@/components/content/ContentSource';
import { SECTIONS } from '@/content/cms-sections';
import { mentionsNotLive } from '@/lib/claims';
import { defaultContactDetails } from '@/content/contact';

async function Footer() {
  const [siteContact, addressData, contentData, publishedLegalSlugs, siteNav] = await Promise.all([
    getSiteContact().catch(() => defaultContactDetails),
    fetchCms("address").catch(() => null),
    fetchCms(SECTIONS.footer.slug).catch(() => null), // site-footer: the live site still reads "footer"
    getLegalPages().catch(() => []),
    getSiteNavigation().catch(() => null),
  ]);

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
        />
      </div>
    </ContentSource>
  );
}

export default Footer;
