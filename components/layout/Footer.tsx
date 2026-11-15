import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms, getLegalPages, getSiteContact } from '@/lib/api/content';
import { ContentSource } from '@/components/content/ContentSource';
import { SECTIONS } from '@/content/cms-sections';
import { mentionsNotLive } from '@/lib/claims';
import { defaultContactDetails } from '@/content/contact';

async function Footer() {
  const [siteContact, addressData, contentData, publishedLegalSlugs] = await Promise.all([
    getSiteContact().catch(() => defaultContactDetails),
    fetchCms("address").catch(() => null),
    fetchCms(SECTIONS.footer.slug).catch(() => null), // site-footer: the live site still reads "footer"
    getLegalPages().catch(() => []),
  ]);

  const effectiveAddressData = {
    twitter: "@LMSDOMAIN",
    instagram: "@LMSDOMAIN",
    youtubelink: "https://youtube.com/@lmsdomain",
    linkedin: "lmsdomain",
    ...(addressData || {}),
    email: siteContact?.email || (addressData as any)?.email || defaultContactDetails.email,
    phone: siteContact?.phone || (addressData as any)?.phone || defaultContactDetails.phone,
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
        />
      </div>
    </ContentSource>
  );
}

export default Footer;
