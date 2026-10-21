import Link from "next/link"
import { AdLeaderboardBox } from "@/components/ad-box"
import { CategoryBadge } from "@/components/category-badge"
import { FramedImage } from "@/components/framed-image"
import { formatDate } from "@/lib/utils"
import { getAdvertisements, getSpotlightArticles, mapStrapiArticleToUI } from "@/lib/articlesdata"

export default async function SpotlightPage() {
  const [articles, ads] = await Promise.all([getSpotlightArticles(), getAdvertisements()])
  const spotlightArticles = articles.map(mapStrapiArticleToUI)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 bg-realty" aria-hidden />
            <span className="text-xs font-bold uppercase tracking-widest text-realty">
              Gulf Property Editorial
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-5xl">
            Spotlight
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Featured stories from across our coverage.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <AdLeaderboardBox ad={ads.rectangle1} className="mb-10" />

        {spotlightArticles.length > 0 ? (
          <section aria-label="Spotlight articles">
            <div className="mb-6 flex items-center gap-2 border-b-2 border-foreground pb-2">
              <span className="h-3 w-3 bg-realty" aria-hidden />
              <h2 className="text-lg font-extrabold uppercase tracking-wide">
                Featured Articles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {spotlightArticles.map((article) => (
                <article key={article.id} className="flex flex-col border-b border-border pb-6">
                  <Link href={`/articles/${article.slug}`} className="group">
                    <FramedImage
                      src={article.image || "/images/placeholder.svg"}
                      alt={article.title}
                      className="aspect-video w-full"
                    />
                    <div className="mt-3">
                      <CategoryBadge category={article.category} />
                      <h3 className="mt-1 text-base font-bold leading-snug text-foreground group-hover:text-realty">
                        {article.title}
                      </h3>
                    </div>
                  </Link>
                  <time className="mt-3 block text-[11px] font-medium text-muted-foreground">
                    {formatDate(article.dateline)}
                  </time>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <p className="py-12 text-center text-sm text-muted-foreground">
            No featured articles are available right now.
          </p>
        )}
      </div>
    </main>
  )
}
