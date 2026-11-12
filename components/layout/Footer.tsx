import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms, getLegalPages, getSiteContact } from '@/lib/api/content';
import { ContentSource } from '@/components/content/ContentSource';
import { SECTIONS } from '@/content/cms-sections';
import { mentionsNotLive } from '@/lib/claims';

async function Footer() {
  const [siteContact, addressData, contentData, publishedLegalSlugs] = await Promise.all([
    getSiteContact().catch(() => null),
    fetchCms("address"),
    fetchCms(SECTIONS.footer.slug), // site-footer: the live site still reads "footer"
    getLegalPages(),
  ]);

  const effectiveAddressData = {
    ...(addressData || {}),
    email: siteContact?.email || (addressData as any)?.email,
    phone: siteContact?.phone || (addressData as any)?.phone,
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
