import Link from "next/link"
import articlesData from "@/lib/articlesdata.json"
import {
  spotlight,
  leftBriefs,
  rightLeads,
  realtyBytes,
  exclusiveMain,
  exclusiveSubs,
  constructionMain,
  constructionCards,
  latestNews,
} from "@/lib/news-data"

type Article = {
  id: string | number
  slug: string
  category: string[]
  title: string
  image: string
  byline: string
  dateline: string
  content: string
}

const jsonArticles = articlesData as Article[]

function normalizeCategory(category: string | string[]) {
  return Array.isArray(category) ? category : [category]
}

function normalizeNewsArticle(article: any): Article {
  const publishedAt = article?.published_at ?? new Date().toISOString()
  const parsedDate = new Date(publishedAt)

  return {
    id: article?.id ?? article?.slug ?? "",
    slug: article?.slug ?? "",
    category: normalizeCategory(article?.category ?? "General"),
    title: article?.title ?? "Untitled article",
    image: article?.image_url ?? article?.image ?? "/images/placeholder.svg",
    byline: article?.byline ?? "Gulf Property",
    dateline: Number.isNaN(parsedDate.getTime())
      ? "N/A"
      : parsedDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
    content: article?.content || article?.summary || "No content available yet.",
  }
}

function asArticleCollection(value: unknown): Article[] {
  if (Array.isArray(value)) {
    return value.flatMap((item) => asArticleCollection(item))
  }

  if (value && typeof value === "object") {
    return [normalizeNewsArticle(value)]
  }

  return []
}

const allArticles = [
  ...jsonArticles.map(normalizeNewsArticle),
  ...[
    spotlight,
    ...leftBriefs,
    ...rightLeads,
    ...realtyBytes,
    exclusiveMain,
    ...exclusiveSubs,
    constructionMain,
    ...constructionCards,
    ...latestNews,
  ].flatMap((entry) => asArticleCollection(entry)),
].filter((article) => Boolean(article.slug))

export function generateStaticParams() {
  return allArticles.map((article) => ({ slug: article.slug }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = allArticles.find((item) => item.slug === slug)

  if (!article) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-3xl font-bold">Article not found</h1>
        <p className="mt-3 text-muted-foreground">The article you are looking for does not exist.</p>
        <Link href="/" className="mt-6 inline-block text-sm font-semibold text-realty">
          Back to home
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-foreground">
      <Link href="/" className="mb-6 inline-flex text-sm font-semibold text-realty hover:underline">
        ← Back to home
      </Link>

      <div className="mb-6 border-b-2 border-foreground pb-4">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {article.category.map((item) => (
            <span key={item} className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
              {item}
            </span>
          ))}
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">{article.title}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span>By {article.byline}</span>
          <span>•</span>
          <time>{article.dateline}</time>
        </div>
      </div>

      <img src={article.image} alt={article.title} className="h-auto max-h-[500px] w-auto max-w-full object-contain" />

      <article className="space-y-5 text-lg leading-8 text-muted-foreground">
        {article.content.split("\n\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </article>
    </main>
  )
}
