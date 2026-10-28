import type { Metadata } from 'next';

export const SITE_URL = 'https://www.thegulfproperty.com';
const DEFAULT_IMAGE = '/images/Gulf Property.png';

export function createPageMetadata({
  title,
  description,
  pathname,
  image = DEFAULT_IMAGE,
}: {
  title: string;
  description: string;
  pathname: string;
  image?: string;
}): Metadata {
  const pageTitle = `${title} | Gulf Property`;
  const canonicalUrl = new URL(pathname, SITE_URL).toString();
  const imageUrl = new URL(image, SITE_URL).toString();

  return {
    title: pageTitle,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: 'Gulf Property',
      type: 'website',
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
      images: [{ url: imageUrl, alt: title }],
    },
  };
}
