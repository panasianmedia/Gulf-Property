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

const RAW_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://newscpanel-production.up.railway.app';
const STRAPI_URL = RAW_URL.replace(/\/+$/, '');

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

// -------------------------------------------------------------
// HOMEPAGE DATA
// -------------------------------------------------------------
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

async function fetchHomeBlock(placement: string, limit: number): Promise<Article[]> {
  try {
    const pageSize = 100;
    const maxPages = 20;
    const matches: Article[] = [];
    const seenIds = new Set<number>();

    for (let page = 1; page <= maxPages && matches.length < limit; page += 1) {
      const res = await fetch(
        `${STRAPI_URL}/api/articles?sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
        { next: { revalidate: 0 } }
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
      { next: { revalidate: 0 } }
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
async function fetchSubcategorySlot(subcategory: string, slot: string, limit: number): Promise<Article[]> {
  try {
    const pageSize = 100;
    const maxPages = 10;
    const matches: Article[] = [];
    const seenIds = new Set<number>();

    for (let page = 1; page <= maxPages && matches.length < limit; page += 1) {
      const res = await fetch(
        `${STRAPI_URL}/api/articles?filters[CategorySub][$containsi]=${encodeURIComponent(
          subcategory
        )}&sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`,
        { next: { revalidate: 0 } }
      );

      if (!res.ok) break;
      const data = await res.json();
      const rows: Article[] = data.data || [];

      for (const item of rows) {
        if (seenIds.has(item.id)) continue;
        seenIds.add(item.id);

        const article = (item as any).attributes || item;
        if (hasSubcategory(article.CategorySub, subcategory) && hasSubcategorySlot(article.SubCategorySub, slot)) {
          matches.push(item);
          if (matches.length >= limit) break;
        }
      }

      const pageCount = data?.meta?.pagination?.pageCount || 1;
      if (!rows.length || page >= pageCount) break;
    }

    return matches.slice(0, limit);
  } catch (error) {
    console.error(`Error fetching subcategory slot [${subcategory} - ${slot}]:`, error);
    return [];
  }
}

export async function getActiveSubcategoryData(subcategory: string) {
  const [lead, topStories, latest, marketInsights, spotlight] = await Promise.all([
    fetchSubcategorySlot(subcategory, 'lead', 1),
    fetchSubcategorySlot(subcategory, 'top', 4),
    fetchSubcategorySlot(subcategory, 'latest', 6),
    fetchSubcategorySlot(subcategory, 'market', 3),
    fetchSubcategorySlot(subcategory, 'spotlight', 4),
  ]);

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
      { next: { revalidate: 0 } }
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

    const res = await fetch(url, { next: { revalidate: 0 } });
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
// UI DATA MAPPER
// -------------------------------------------------------------


// Converts private R2 endpoint URLs into the working public R2 link
function resolveMediaUrl(rawUrl: string): string {
  const PUBLIC_R2_URL = 'https://pub-9d1f70c10dca4e94a9b69b8e3f8cbffd.r2.dev';
  return rawUrl.replace(
    /^https:\/\/[^/]+\.r2\.cloudflarestorage\.com\/gulf-property-media/,
    PUBLIC_R2_URL
  );
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
      next: { revalidate: 60 },
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
};

export default articlesData;