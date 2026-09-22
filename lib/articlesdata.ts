// lib/articlesdata.ts

// -------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------
export interface StrapiMediaFormat {
  url: string;
  width?: number;
  height?: number;
}

export interface StrapiMedia {
  id?: number;
  url: string;
  alternativeText?: string;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface UIArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  dateline: string;
  image: string;
  author: string;
  bullets: string[];
}

export interface Article {
  id: number;
  documentId?: string;
  Title: string;
  Slug?: string;
  slug?: string;
  Caption?: string | null;
  Content?: any;
  Author?: string;
  Date?: string;
  CategorySub?: string[] | string;
  SubCategorySub?: string;
  HomeSub?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  Image?: StrapiMedia;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface AdSlot {
  image: string | null;
  link: string | null;
}

export interface AdSlots {
  square1: AdSlot;
  square2: AdSlot;
  rectangle1: AdSlot;
  rectangle2: AdSlot;
}

export interface MagazineIssue {
  id: string;
  title: string;
  slug: string;
  description: string;
  monthAndYear: string;
  date: string;
  cover: string;
  pdf: string | null;
  pdfList: string[];
  pages?: string[];
}

const RAW_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://newscpanel-production.up.railway.app';
const STRAPI_URL = RAW_URL.replace(/\/+$/, '');
const PUBLIC_R2_URL = 'https://pub-9d1f70c10dca4e94a9b69b8e3f8cbffd.r2.dev';

// -------------------------------------------------------------
// UTILITIES
// -------------------------------------------------------------
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function toTokenList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => toTokenList(item));
  }

  if (value && typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    const candidate = obj.value ?? obj.name ?? obj.label ?? '';
    return toTokenList(candidate);
  }

  return String(value || '')
    .split(',')
    .map((part) => normalizeToken(part.trim()))
    .filter(Boolean);
}

function resolveMediaUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  
  // 1. If Strapi returned an absolute URL (R2 public dev URL or custom domain), return as-is
  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl.replace(
      /^https:\/\/[^/]+\.r2\.cloudflarestorage\.com\/[^/]+/,
      PUBLIC_R2_URL
    );
  }

  // 2. Fallback if Strapi returned a local relative path
  if (rawUrl.startsWith('/')) {
    return `${STRAPI_URL}${rawUrl}`;
  }

  return rawUrl;
}

function extractMediaUrl(value: unknown): string | null {
  if (!value) return null;
  if (typeof value === 'string') return value ? resolveMediaUrl(value) : null;

  if (Array.isArray(value)) {
    for (const entry of value) {
      const url = extractMediaUrl(entry);
      if (url) return url;
    }
    return null;
  }

  if (typeof value === 'object') {
    const media = value as Record<string, any>;
    const directUrl = media.url || media.href || media.src;
    if (directUrl && typeof directUrl === 'string') return resolveMediaUrl(directUrl);

    // Support Strapi v4/v5 nested data structures
    if (media.data) {
      return extractMediaUrl(media.data);
    }

    if (media.attributes) {
      return extractMediaUrl(media.attributes);
    }

    const formats = media.formats || {};
    const formatCandidates = [formats.large, formats.medium, formats.small, formats.thumbnail];
    for (const candidate of formatCandidates) {
      const url = extractMediaUrl(candidate);
      if (url) return url;
    }
  }

  return null;
}

function extractMediaUrls(value: unknown): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.flatMap((entry) => extractMediaUrls(entry));
  }

  if (typeof value === 'object') {
    const media = value as Record<string, any>;
    if (media.data) {
      return extractMediaUrls(media.data);
    }
    if (media.attributes) {
      return extractMediaUrls(media.attributes);
    }
    if (media.url || media.href || media.src || media.formats) {
      const url = extractMediaUrl(media);
      return url ? [url] : [];
    }

    const nested = Object.values(media)
      .flatMap((entry) => extractMediaUrls(entry))
      .filter(Boolean);

    return nested;
  }

  if (typeof value === 'string') {
    const url = extractMediaUrl(value);
    return url ? [url] : [];
  }

  return [];
}

const HOME_SUB_ALIASES: Record<string, string[]> = {
  lead: ['lead', 'leadstory', 'mainstory', 'topstory'],
  breaking: ['breaking', 'breakingnews', 'breakingstory'],
  latest: ['latest', 'latestnews', 'lateststories'],
  exclusive: ['exclusive', 'exclusiveinvestigations', 'exclusiveinvestigation'],
  realtybytes: ['realtybytes', 'realtybyte'],
  trending: ['trending', 'trend', 'trendingnews'],
  highlights: ['highlights', 'highlight', 'latestnews'],
  megaprojects: ['megaprojects', 'megaproject', 'megaprojectnews'],
};

const SUBCATEGORY_SLOT_ALIASES: Record<string, string[]> = {
  lead: ['lead', 'leadstory'],
  top: ['top', 'topstory', 'topstories'],
  latest: ['latest', 'latestnews', 'lateststories'],
  market: ['market', 'marketinsights', 'insights'],
  spotlight: ['spotlight', 'featured'],
};

function hasPlacement(value: unknown, placement: string): boolean {
  const placementKey = normalizeToken(placement);
  const accepted = new Set([
    placementKey,
    ...(HOME_SUB_ALIASES[placementKey] || []).map(normalizeToken),
  ]);

  return toTokenList(value).some((token) => accepted.has(token));
}

function hasSubcategory(value: unknown, subcategory: string): boolean {
  const target = normalizeToken(subcategory);
  return toTokenList(value).some((token) => token === target);
}

function hasSubcategorySlot(value: unknown, slot: string): boolean {
  const slotKey = normalizeToken(slot);
  const accepted = new Set([
    slotKey,
    ...(SUBCATEGORY_SLOT_ALIASES[slotKey] || []).map(normalizeToken),
  ]);

  return toTokenList(value).some((token) => accepted.has(token));
}

// -------------------------------------------------------------
// HOMEPAGE DATA
// -------------------------------------------------------------
async function fetchHomeBlock(placement: string, limit: number): Promise<Article[]> {
  try {
    const pageSize = 100;
    const maxPages = 20;
    const matches: Article[] = [];
    const seenIds = new Set<number>();

    for (let page = 1; page <= maxPages; page += 1) {
      const res = await fetch(
        `${STRAPI_URL}/api/articles?sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
        { next: { revalidate: 0 }, cache: 'no-store' }
      );

      if (!res.ok) break;
      const data = await res.json();
      const rows: Article[] = data.data || [];

      for (const item of rows) {
        if (seenIds.has(item.id)) continue;
        seenIds.add(item.id);

        const homePlacement = ((item as any).attributes || item).HomeSub;
        const isBreaking = hasPlacement(homePlacement, 'breaking');
        if (hasPlacement(homePlacement, placement) && !(placement === 'exclusive' && isBreaking)) {
          matches.push(item);
          if (matches.length >= limit) break;
        }
      }

      const pageCount = data?.meta?.pagination?.pageCount || 1;
      if (!rows.length || page >= pageCount) break;
    }

    return matches.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching home placement [${placement}]:`, error);
    return [];
  }
}

export async function searchArticles(query: string): Promise<UIArticle[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[Title][$containsi]=${encodeURIComponent(trimmedQuery)}&sort=publishedAt:desc&pagination[limit]=5&populate=*`,
      { next: { revalidate: 0 }, cache: 'no-store' }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data || []).slice(0, 5).map(mapStrapiArticleToUI);
  } catch (error) {
    console.error(`Error searching articles for [${trimmedQuery}]:`, error);
    return [];
  }
}

export async function getHomePageData() {
  const [
    lead,
    breaking,
    latest,
    exclusive,
    realtyBytes,
    trending,
    highlights,
    megaprojects,
  ] = await Promise.all([
    fetchHomeBlock('lead', 1),
    fetchHomeBlock('breaking', 3),
    fetchHomeBlock('latest', 3),
    fetchHomeBlock('exclusive', 3),
    fetchHomeBlock('realty bytes', 4),
    fetchHomeBlock('trending', 6),
    fetchHomeBlock('highlights', 6),
    fetchHomeBlock('megaprojects', 4),
  ]);

  const breakingIds = new Set(breaking.map((article) => article.id));

  return {
    lead: lead[0] || null,
    breaking,
    latest,
    exclusive: exclusive.filter((article) => !breakingIds.has(article.id)),
    realtyBytes,
    trending,
    highlights,
    megaprojects,
  };
}

// -------------------------------------------------------------
// SUBCATEGORY DATA
// -------------------------------------------------------------
async function fetchSubcategoryArticles(subcategory: string): Promise<Article[]> {
  try {
    const pageSize = 100;
    const maxPages = 10;
    const matches: Article[] = [];
    const seenIds = new Set<number>();

    for (let page = 1; page <= maxPages; page += 1) {
      const res = await fetch(
        `${STRAPI_URL}/api/articles?filters[CategorySub][$containsi]=${encodeURIComponent(
          subcategory
        )}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
        { next: { revalidate: 0 }, cache: 'no-store' }
      );

      if (!res.ok) break;
      const data = await res.json();
      const rows: Article[] = data.data || [];

      for (const item of rows) {
        if (seenIds.has(item.id)) continue;
        seenIds.add(item.id);

        const article = (item as any).attributes || item;
        if (hasSubcategory(article.CategorySub, subcategory)) {
          matches.push(item);
        }
      }

      const pageCount = data?.meta?.pagination?.pageCount || 1;
      if (!rows.length || page >= pageCount) break;
    }

    return matches;
  } catch (error) {
    console.error(`Error fetching subcategory articles [${subcategory}]:`, error);
    return [];
  }
}

export async function getActiveSubcategoryData(subcategory: string) {
  const articles = await fetchSubcategoryArticles(subcategory);
  const bySlot = (slot: string, limit: number) =>
    articles.filter((article) => {
      const data = (article as any).attributes || article;
      return hasSubcategorySlot(data.SubCategorySub, slot);
    }).slice(0, limit);

  const lead = bySlot('lead', 1);
  const topStories = bySlot('top', 4);
  const latest = bySlot('latest', 6);
  const marketInsights = bySlot('market', 3);
  const spotlight = bySlot('spotlight', 4);

  return {
    leadStory: lead[0] || null,
    topStories,
    latest,
    marketInsights,
    spotlight,
  };
}

// -------------------------------------------------------------
// PAST & ARCHIVE ARTICLES
// -------------------------------------------------------------
export async function getPastArticles(
  subcategory: string,
  page = 1,
  pageSize = 12
): Promise<{ articles: Article[]; pagination: PaginationMeta }> {
  try {
    const res = await fetch(
      `${STRAPI_URL}/api/articles?filters[CategorySub][$containsi]=${encodeURIComponent(
        subcategory
      )}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
      { next: { revalidate: 0 }, cache: 'no-store' }
    );

    if (!res.ok) {
      return { articles: [], pagination: { page: 1, pageSize, pageCount: 0, total: 0 } };
    }

    const json = await res.json();
    return {
      articles: json.data || [],
      pagination: json.meta?.pagination || { page: 1, pageSize, pageCount: 1, total: 0 },
    };
  } catch (error) {
    console.error(`Error fetching past articles for [${subcategory}]:`, error);
    return { articles: [], pagination: { page: 1, pageSize, pageCount: 0, total: 0 } };
  }
}

export async function getArchiveArticles({
  subcategory,
  year,
  month,
  page = 1,
  pageSize = 9,
}: {
  subcategory: string;
  year?: number;
  month?: number;
  page?: number;
  pageSize?: number;
}): Promise<{ articles: Article[]; pagination: PaginationMeta }> {
  try {
    let dateFilters = '';

    if (year) {
      let startDate: string;
      let endDate: string;

      if (month && month >= 1 && month <= 12) {
        startDate = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)).toISOString();
        endDate = new Date(Date.UTC(year, month, 0, 23, 59, 59, 999)).toISOString();
      } else {
        startDate = new Date(Date.UTC(year, 0, 1, 0, 0, 0)).toISOString();
        endDate = new Date(Date.UTC(year, 11, 31, 23, 59, 59, 999)).toISOString();
      }

      dateFilters = `&filters[publishedAt][$gte]=${encodeURIComponent(
        startDate
      )}&filters[publishedAt][$lte]=${encodeURIComponent(endDate)}`;
    }

    const url = `${STRAPI_URL}/api/articles?filters[CategorySub][$containsi]=${encodeURIComponent(
      subcategory
    )}${dateFilters}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`;

    const res = await fetch(url, { next: { revalidate: 0 }, cache: 'no-store' });
    if (!res.ok) {
      return { articles: [], pagination: { page: 1, pageSize, pageCount: 0, total: 0 } };
    }

    const json = await res.json();
    return {
      articles: json.data || [],
      pagination: json.meta?.pagination || { page: 1, pageSize, pageCount: 1, total: 0 },
    };
  } catch (error) {
    console.error(`Error fetching archive articles for [${subcategory}]:`, error);
    return { articles: [], pagination: { page: 1, pageSize, pageCount: 0, total: 0 } };
  }
}

// -------------------------------------------------------------
// SINGLE ARTICLE RESOLVER
// -------------------------------------------------------------
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/articles?populate=*&pagination[limit]=100`, {
      next: { revalidate: 0 },
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const json = await res.json();
    const articles: any[] = json.data || [];
    const decodedSlug = decodeURIComponent(slug).toLowerCase().trim();

    const target = articles.find((item: any) => {
      const data = item.attributes || item;
      const rawSlug = (data.Slug || data.slug || '').toLowerCase().trim();
      const rawTitle = data.Title || data.title || '';
      const generatedSlug = slugify(rawTitle);
      const rawDocId = String(item.documentId || item.id || '').toLowerCase();

      return (
        rawSlug === decodedSlug ||
        generatedSlug === decodedSlug ||
        rawDocId === decodedSlug
      );
    });

    return target || null;
  } catch (error) {
    console.error(`Error fetching article by slug [${slug}]:`, error);
    return null;
  }
}

// -------------------------------------------------------------
// ADVERTISEMENTS
// -------------------------------------------------------------
const EMPTY_AD_SLOT: AdSlot = { image: null, link: null };

function mapAdMedia(mediaObj: any): string | null {
  if (!mediaObj) return null;
  const rawUrl =
    mediaObj.formats?.medium?.url ||
    mediaObj.formats?.small?.url ||
    mediaObj.formats?.large?.url ||
    mediaObj.url ||
    null;
  return rawUrl ? resolveMediaUrl(rawUrl) : null;
}

export async function getAdvertisements(): Promise<AdSlots> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/advertisement?populate=*`, {
      next: { revalidate: 0 },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error(`Advertisement fetch failed: ${res.status}`);

    const json = await res.json();
    const data = json?.data?.attributes || json?.data || {};

    return {
      square1: {
        image: mapAdMedia(data.SquareAd1),
        link: data.SquareAdLink1 || null,
      },
      square2: {
        image: mapAdMedia(data.SquareAd2),
        link: data.SquareAdLink2 || null,
      },
      rectangle1: {
        image: mapAdMedia(data.RectangularAd1),
        link: data.RectangularAdLink1 || null,
      },
      rectangle2: {
        image: mapAdMedia(data.RectangularAd2),
        link: data.RectangularAdLink2 || null,
      },
    };
  } catch (error) {
    console.error('Error fetching advertisements:', error);
    return {
      square1: EMPTY_AD_SLOT,
      square2: EMPTY_AD_SLOT,
      rectangle1: EMPTY_AD_SLOT,
      rectangle2: EMPTY_AD_SLOT,
    };
  }
}

// -------------------------------------------------------------
// MAGAZINE ISSUE DATA (Matching exact Strapi Collection schema)
// -------------------------------------------------------------
function normalizeMagazineIssue(item: any): MagazineIssue | null {
  const data = item?.attributes || item || {};
  
  // Field mappings: Title, Slug, MonthandYear (or Month&Year), Description, Cover, PDF
  const title = data.Title || data.title || 'Magazine Issue';
  const slug = (data.Slug || data.slug || slugify(String(title))).toLowerCase();
  
  const cover =
    extractMediaUrl(
      data.Cover ||
        data.cover ||
        data.CoverImage ||
        data.coverImage ||
        data.cover_image
    ) ||
    '/images/placeholder.svg';

  // Multiple media array for PDF
  const pdfList = extractMediaUrls(data.PDF || data.pdf || data.Pdf || data.Files || data.files).filter(Boolean);
  const pdf = pdfList.length > 0 ? pdfList[0] : null;

  const monthAndYear =
    data.MonthandYear ||
    data['Month&Year'] ||
    data.MonthAndYear ||
    data.monthandyear ||
    data.monthAndYear ||
    '';

  const description =
    data.Description ||
    data.description ||
    '';

  return {
    id: String(item?.documentId || item?.id || data?.id || slug),
    title,
    slug,
    description,
    monthAndYear,
    date: data.publishedAt || data.createdAt || new Date().toISOString(),
    cover,
    pdf,
    pdfList,
  };
}

async function fetchMagazineCollection(): Promise<any[]> {
  const endpoints = [
    'magazine-issues',
    'magazine-issue',
    'magazines',
    'magazine',
  ];

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(
        `${STRAPI_URL}/api/${endpoint}?populate=*&sort=publishedAt:desc`,
        {
          next: { revalidate: 0 },
          cache: 'no-store',
        }
      );

      if (!res.ok) continue;

      const json = await res.json();
      const rows = Array.isArray(json?.data) ? json.data : [];
      if (rows.length) {
        return rows;
      }
    } catch (error) {
      console.error(`Error fetching magazine endpoint [${endpoint}]:`, error);
    }
  }

  return [];
}

export async function getMagazineIssues(): Promise<MagazineIssue[]> {
  const rows = await fetchMagazineCollection();
  return rows
    .map(normalizeMagazineIssue)
    .filter(Boolean) as MagazineIssue[];
}

export async function getMagazineIssueBySlug(slug: string): Promise<MagazineIssue | null> {
  const issues = await getMagazineIssues();
  const targetSlug = decodeURIComponent(slug).toLowerCase().trim();
  return issues.find((issue) => issue.slug === targetSlug || issue.id === targetSlug) || null;
}

// -------------------------------------------------------------
// UI DATA MAPPER
// -------------------------------------------------------------
export function mapStrapiArticleToUI(a: any): UIArticle {
  const data = a?.attributes || a || {};
  const imageObj = data.Image || data.coverImage;
  let imageUrl = '/images/placeholder.svg';

  if (imageObj) {
    const rawUrl =
      imageObj.formats?.medium?.url ||
      imageObj.formats?.small?.url ||
      imageObj.formats?.large?.url ||
      imageObj.url ||
      imageUrl;

    imageUrl = resolveMediaUrl(rawUrl);
  }

  let excerptText = data.Caption || '';
  if (!excerptText && Array.isArray(data.Content)) {
    const firstParagraph = data.Content.find((b: any) => b.type === 'paragraph' && b.children?.[0]?.text);
    excerptText = firstParagraph?.children?.[0]?.text || '';
  }

  const categoryVal = Array.isArray(data.CategorySub)
    ? data.CategorySub[0]
    : data.CategorySub || 'General';

  return {
    id: String(a?.documentId || a?.id || data?.id || Math.random()),
    title: data.Title || data.title || 'Untitled Article',
    slug: data.Slug || data.slug || slugify(data.Title || data.title || ''),
    category: categoryVal,
    content: excerptText,
    dateline: data.Date || data.publishedAt || new Date().toISOString(),
    image: imageUrl,
    author: data.Author || 'Staff Report',
    bullets: [],
  };
}

const articlesData = {
  getHomePageData,
  getActiveSubcategoryData,
  getPastArticles,
  getArchiveArticles,
  getArticleBySlug,
  mapStrapiArticleToUI,
  searchArticles,
  getAdvertisements,
  getMagazineIssues,
  getMagazineIssueBySlug,
};

export default articlesData;