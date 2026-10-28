import type { MetadataRoute } from 'next';
import {
  getMagazineIssuesForSitemap,
  getPublishedArticlesForSitemap,
} from '@/lib/articlesdata';
import { getPublishedOwnYourStoriesForSitemap } from '@/lib/own-your-story-data';
import { SITE_URL } from '@/lib/seo';

const STATIC_PATHS = [
  '/',
  '/about',
  '/advertise',
  '/business',
  '/construction',
  '/contact',
  '/gcc',
  '/spotlight',
  '/sustainability',
  '/world',
  '/archives',
  '/archives/e-zine',
  '/archives/own-your-story',
  '/privacy-policy',
  '/terms-and-conditions',
] as const;

const CATEGORY_PATHS = [
  '/property/residential',
  '/property/hospitality',
  '/uae/abu-dhabi',
  '/uae/dubai',
  '/uae/ras-al-khaimah',
  '/uae/sharjah',
  '/world/middle-east',
  '/world/asia',
  '/world/europe',
  '/world/americas',
  '/world/africa',
] as const;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, stories, issues] = await Promise.all([
    getPublishedArticlesForSitemap(),
    getPublishedOwnYourStoriesForSitemap(),
    getMagazineIssuesForSitemap(),
  ]);

  const entries: MetadataRoute.Sitemap = [
    ...[...STATIC_PATHS, ...CATEGORY_PATHS].map((pathname) => ({
      url: new URL(pathname, SITE_URL).toString(),
    })),
    ...articles.flatMap((article) => {
      const slug = article.Slug || article.slug || '';
      if (!slug.trim()) return [];

      const modifiedDate = article.updatedAt || article.publishedAt || article.Date;
      const lastModified = modifiedDate ? new Date(modifiedDate) : undefined;

      return [
        {
          url: new URL(`/articles/${encodeURIComponent(slug)}`, SITE_URL).toString(),
          ...(lastModified &&
            !Number.isNaN(lastModified.getTime()) && { lastModified }),
        },
      ];
    }),
    ...stories.flatMap((story) =>
      story.slug
        ? [{ url: new URL(`/archives/own-your-story/${encodeURIComponent(story.slug)}`, SITE_URL).toString() }]
        : []
    ),
    ...issues.flatMap((issue) =>
      issue.slug
        ? [{ url: new URL(`/archives/e-zine/${encodeURIComponent(issue.slug)}`, SITE_URL).toString() }]
        : []
    ),
  ];

  return [...new Map(entries.map((entry) => [entry.url, entry])).values()];
}
