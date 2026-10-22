import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms, getLegalPages } from '@/lib/api/content';

async function Footer() {
  const [addressData, contentData, publishedLegalSlugs] = await Promise.all([
    fetchCms("address"),
    fetchCms("footer"),
    getLegalPages(),
  ]);

  return (
    <div>
      <FooterSection
        contentData={contentData || {}}
        addressData={addressData || {}}
        publishedLegalSlugs={publishedLegalSlugs}
      />
    </div>
  );
}

export default Footer;
