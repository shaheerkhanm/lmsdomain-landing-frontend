import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms, getLegalPages } from '@/lib/api/content';
import { ContentSource } from '@/components/content/ContentSource';

async function Footer() {
  const [addressData, contentData, publishedLegalSlugs] = await Promise.all([
    fetchCms("address"),
    fetchCms("footer"),
    getLegalPages(),
  ]);

  // Footer description: Settings > Footer content (Lorem ipsum counts as not filled in)
  const description = String((contentData as any)?.content || "");
  const source = !contentData ? "code" : !description.trim() || /lorem ipsum/i.test(description) ? "partial" : "api";

  return (
    <ContentSource id="footer" source={source}>
    <div>
      <FooterSection
        contentData={contentData || {}}
        addressData={addressData || {}}
        publishedLegalSlugs={publishedLegalSlugs}
      />
    </div>
    </ContentSource>
  );
}

export default Footer;
