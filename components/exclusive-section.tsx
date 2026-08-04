import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { exclusiveSubs, exclusiveMain, timeAgo } from "@/lib/news-data"

export function ExclusiveSection() {
  return (
    <section 
      aria-label="Exclusive investigations" 
      className="bg-background py-10 text-foreground transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6 flex items-center gap-3">
          <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Trending Emirates
          </span>
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-foreground">
            
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* 4-Box Grid (2x2 layout taking up 7 columns on desktop) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {exclusiveMain.slice(0, 4).map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group flex flex-col border border-border bg-card p-4 transition-all hover:shadow-md"
              >
                <div className="relative mb-3 aspect-video w-full">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title || ""}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <CategoryBadge category={article.category} />
                  <time className="text-xs font-medium text-muted-foreground">
                    {timeAgo(new Date().toISOString())}
                  </time>
                </div>
                <h3 className="mt-2 text-base font-bold leading-snug text-foreground line-clamp-2 group-hover:text-realty">
                  {article.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {article.content}
                </p>
                <span className="mt-auto pt-3 inline-block text-xs font-bold uppercase tracking-wide text-realty">
                  Read &rarr;
                </span>
              </Link>
            ))}
          </div>

          {/* Two sub-features side by side (5 columns on desktop) */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {exclusiveSubs.slice(0, 2).map((a) => (
              <article key={a.id} className="border-t border-border pt-5 first:border-t-0 first:pt-0 lg:first:border-t-0">
                <Link href={`/articles/${a.slug}`} className="group block">
                  <div className="relative aspect-video w-full">
                    <img
                      src={a.image || "/placeholder.svg"}
                      alt={a.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <CategoryBadge category={a.category} />
                    <h4 className="mt-1 text-lg font-bold leading-snug text-foreground line-clamp-2 group-hover:text-realty">
                      {a.title}
                    </h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{a.content}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}