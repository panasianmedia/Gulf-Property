import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { formatDate, timeAgo } from "@/lib/utils"
import type { ArticleUI } from "@/components/CategoryLayout"
import { AdSquareBox, AdLeaderboardBox } from "@/components/ad-box"
import type { AdSlot } from "@/lib/articlesdata"

interface ConstructionLatestProps {
  highlights: ArticleUI[]
  megaprojects: ArticleUI[]
  squareAd?: AdSlot
  leaderboardAd?: AdSlot
}

export function ConstructionLatest({ highlights, megaprojects, squareAd, leaderboardAd }: ConstructionLatestProps) {
  const [constructionMain, ...constructionCards] = megaprojects
  return (
    <section aria-label="Construction and latest news" className="bg-background py-10 text-foreground transition-colors">
      <div className="mx-auto max-w-7xl px-4">
        {/* Rectangular Leaderboard Advertisement Box */}
        <AdLeaderboardBox ad={leaderboardAd} className="mb-10" />

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT — Construction & Mega Projects */}
          <div className="lg:col-span-8">
            <div className="mb-4 flex items-center gap-2 border-b-2 border-foreground pb-2">
              <span className="h-4 w-4 bg-realty" aria-hidden />
              <h2 className="text-lg font-extrabold uppercase tracking-tight text-foreground">
                Construction &amp; Mega Projects
              </h2>
            </div>

            {/* Main project story */}
            {constructionMain && <article>
              <Link href={`/articles/${constructionMain.slug}`} className="group block">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <img
                    src={constructionMain.image || "/images/placeholder.svg"}
                    alt={constructionMain.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-0 top-0">
                    <CategoryBadge category={constructionMain.category} variant="overlay" />
                  </div>
                </div>
                <h3 className="mt-4 text-balance text-2xl font-extrabold leading-tight text-foreground line-clamp-2 group-hover:text-realty md:text-3xl">
                  {constructionMain.title}
                </h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted-foreground line-clamp-2">
                  {constructionMain.content}
                </p>
                <time className="mt-2 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {timeAgo(constructionMain.dateline)} &middot; {formatDate(constructionMain.dateline)}
                </time>
              </Link>
            </article>}

            {/* 3 smaller cards */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {constructionCards.map((a) => (
                <article key={a.id}>
                  <Link href={`/articles/${a.slug}`} className="group block">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={a.image || "/images/placeholder.svg"}
                        alt={a.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-2">
                      <CategoryBadge category={a.category} />
                      <h4 className="mt-1 text-sm font-bold leading-snug text-foreground line-clamp-3 group-hover:text-realty">
                        {a.title}
                      </h4>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">{a.content}</p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>

          {/* RIGHT — Highlights Sidebar + Small Square Ad */}
          <aside className="lg:col-span-4 flex flex-col justify-between">
            <div className="border border-border bg-card">
              {/* Dynamic Header Bar */}
              <div className="flex items-center gap-2 border-b border-border bg-foreground text-background dark:bg-card dark:text-foreground px-4 py-3 transition-colors">
                <span className="h-3 w-3 bg-realty" aria-hidden />
                <h2 className="text-sm font-bold uppercase tracking-wide">Highlights</h2>
              </div>

              <ul className="divide-y divide-border">
                {highlights.map((a, idx) => (
  <li key={`${a.id || a.slug}-${idx}`}>
                    <Link href={`/articles/${a.slug}`} className="group flex gap-3 px-4 py-3 hover:bg-muted/60 transition-colors">
                      <time className="shrink-0 pt-0.5 text-[11px] font-bold tabular-nums text-realty">
                        {timeAgo(a.dateline)}
                      </time>
                      <div className="min-w-0">
                        <CategoryBadge category={a.category} className="text-[10px]" />
                        <h3 className="text-sm font-semibold leading-snug text-foreground line-clamp-2 group-hover:text-realty">
                          {a.title}
                        </h3>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Small Square Advertisement Box */}
            <AdSquareBox ad={squareAd} className="mt-6" />
          </aside>
        </div>
      </div>
    </section>
  )
}