import React from 'react';
import FooterSection from './common/FooterSection';
import { fetchCms } from '@/lib/api/content';

async function Footer() {
  const [addressData, contentData] = await Promise.all([
    fetchCms("address"),
    fetchCms("footer"),
  ]);

  return (
    <div>
      <FooterSection contentData={contentData || {}} addressData={addressData || {}} />
    </div>
  );
}

export default Footer;
