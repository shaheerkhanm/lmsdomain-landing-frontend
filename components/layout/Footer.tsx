import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms, getLegalPages } from '@/lib/api/content';
import { ContentSource } from '@/components/content/ContentSource';
import { SECTIONS } from '@/content/cms-sections';

async function Footer() {
  const [addressData, contentData, publishedLegalSlugs] = await Promise.all([
    fetchCms("address"),
    fetchCms(SECTIONS.footer.slug), // site-footer: the live site still reads "footer"
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
