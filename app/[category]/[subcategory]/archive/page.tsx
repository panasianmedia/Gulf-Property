import Link from 'next/link'
import { getArchiveArticles } from '@/lib/articlesdata'

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>
  searchParams: Promise<{ year?: string; month?: string; page?: string }>
}

export default async function ArchivePage({ params, searchParams }: PageProps) {
  const { category, subcategory } = await params
  const filters = await searchParams
  const year = filters.year ? Number.parseInt(filters.year, 10) : undefined
  const month = filters.month ? Number.parseInt(filters.month, 10) : undefined
  const page = filters.page ? Number.parseInt(filters.page, 10) : 1
  const result = await getArchiveArticles({ subcategory, year, month, page })

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-8 border-b border-border pb-6">
        <Link href={`/${category}/${subcategory}`} className="text-sm font-semibold text-realty hover:underline">
          Back to {subcategory}
        </Link>
        <h1 className="mt-4 text-4xl font-extrabold capitalize">{subcategory} Archive</h1>
        <p className="mt-2 text-muted-foreground">Historical coverage and earlier reads.</p>
      </div>

      {result.articles.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">No articles found for the selected timeframe.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {result.articles.map((article) => (
            <article key={article.id} className="border-b border-border pb-6">
              {article.coverImage?.url && (
                <img src={article.coverImage.url} alt={article.title} className="mb-4 aspect-video w-full object-cover" />
              )}
              <time className="text-xs text-muted-foreground">
                {new Date(article.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </time>
              <h2 className="mt-2 text-xl font-bold leading-tight">
                <Link href={`/articles/${article.slug}`} className="hover:text-realty">{article.title}</Link>
              </h2>
              {article.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}
