export interface OwnYourStoryRecord {
  id: string
  slug: string
  title: string
  summary: string
  content: unknown
  image: string
  imageAlt: string
  author?: string
  publishedAt?: string
}

export interface OwnYourStoryPageData {
  stories: OwnYourStoryRecord[]
  page: number
  pageCount: number
}

const STRAPI_URL = (process.env.NEXT_PUBLIC_STRAPI_URL || "https://newscpanel-production.up.railway.app").replace(/\/+$/, "")
const STORIES_ENDPOINT = process.env.STRAPI_OWN_YOUR_STORY_ENDPOINT || "/api/own-your-stories"
const PLACEHOLDER_IMAGE = "/images/placeholder.svg"
const PUBLIC_R2_URL = "https://pub-9d1f70c10dca4e94a9b69b8e3f8cbffd.r2.dev"

const fallbackStories: OwnYourStoryRecord[] = [
  { id: "1", slug: "aisha-rahman", title: "Aisha Rahman", summary: "After years of renting in Dubai, my family finally closed on our first apartment. Here is what I wish I knew before signing the dotted line.", content: "After years of renting in Dubai, my family finally closed on our first apartment. Here is what I wish I knew before signing the dotted line.", image: PLACEHOLDER_IMAGE, imageAlt: "Aisha Rahman" },
  { id: "2", slug: "faisal-khan", title: "Faisal Khan", summary: "Investing in off-plan property in Abu Dhabi felt risky at first. Three years later, the returns tell a different story.", content: "Investing in off-plan property in Abu Dhabi felt risky at first. Three years later, the returns tell a different story.", image: PLACEHOLDER_IMAGE, imageAlt: "Faisal Khan" },
  { id: "3", slug: "meera-nair", title: "Meera Nair", summary: "Downsizing from a villa to a smart apartment in Sharjah changed how my family thinks about space, cost, and community.", content: "Downsizing from a villa to a smart apartment in Sharjah changed how my family thinks about space, cost, and community.", image: PLACEHOLDER_IMAGE, imageAlt: "Meera Nair" },
]

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "")
}

function resolveMediaUrl(value: unknown): string {
  if (!value) return PLACEHOLDER_IMAGE
  if (typeof value === "string") {
    if (value.startsWith("http://") || value.startsWith("https://")) {
      return value.replace(
        /^https:\/\/[^/]+\.r2\.cloudflarestorage\.com\/gulf-property-media\//,
        `${PUBLIC_R2_URL}/`,
      )
    }
    return value.startsWith("/") ? `${STRAPI_URL}${value}` : value
  }
  if (Array.isArray(value)) return resolveMediaUrl(value[0])
  if (typeof value !== "object") return PLACEHOLDER_IMAGE
  const media = value as Record<string, any>
  if (media.data) return resolveMediaUrl(media.data)
  if (media.attributes) return resolveMediaUrl(media.attributes)
  const candidate = media.formats?.large || media.formats?.medium || media.formats?.small || media
  return resolveMediaUrl(candidate.url || candidate)
}

function normalizeStory(entry: any): OwnYourStoryRecord {
  const data = entry?.attributes || entry || {}
  const title = data.Title || data.title || data.Name || data.name || "Untitled story"
  const content = data.Content ?? data.content ?? ""
  const summary = data.summary || data.Summary || data.Caption || data.excerpt || (typeof content === "string" ? content.slice(0, 220) : "")
  const image = data.Image || data.image || data.coverImage
  return {
    id: String(entry?.documentId || entry?.id || data.id || title),
    slug: data.Slug || data.slug || slugify(title),
    title,
    summary,
    content,
    image: resolveMediaUrl(image),
    imageAlt: image?.alternativeText || image?.data?.attributes?.alternativeText || title,
    author: data.Author || data.author || data.Broker || data.broker,
    publishedAt: data.publishedAt || data.Date || data.date,
  }
}

function getEndpoint() {
  return STORIES_ENDPOINT.startsWith("http") ? STORIES_ENDPOINT : `${STRAPI_URL}${STORIES_ENDPOINT.startsWith("/") ? "" : "/"}${STORIES_ENDPOINT}`
}

export async function getOwnYourStories(page = 1, pageSize = 4): Promise<OwnYourStoryPageData> {
  try {
    const response = await fetch(`${getEndpoint()}?sort=publishedAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*`, { next: { revalidate: 60 } })
    if (!response.ok) throw new Error(`Strapi returned ${response.status}`)
    const payload = await response.json()
    const stories = (payload.data || []).map(normalizeStory)
    return { stories: stories.length ? stories : fallbackStories, page, pageCount: payload.meta?.pagination?.pageCount || 1 }
  } catch (error) {
    console.error("Error fetching Own Your Story entries:", error)
    return { stories: fallbackStories, page: 1, pageCount: 1 }
  }
}

export async function getOwnYourStoryBySlug(slug: string): Promise<OwnYourStoryRecord | null> {
  try {
    const response = await fetch(`${getEndpoint()}?filters[Slug][$eq]=${encodeURIComponent(slug)}&populate=*`, { next: { revalidate: 60 } })
    if (response.ok) {
      const payload = await response.json()
      if (payload.data?.[0]) return normalizeStory(payload.data[0])
    }
  } catch (error) {
    console.error(`Error fetching Own Your Story entry [${slug}]:`, error)
  }
  return fallbackStories.find((story) => story.slug === slug) || null
}
