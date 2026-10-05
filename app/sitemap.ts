import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';

export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  // This portfolio has one page; section anchors are not separate indexable URLs.
  return [{ url: `${siteUrl}/` }];
}
