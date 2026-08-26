import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { timeAgo } from "@/lib/utils"
import type { ArticleUI } from "@/components/CategoryLayout"

export function RealtyBytes({ articles }: { articles: ArticleUI[] }) {
  return (
    <section 
      aria-label="Realty Bytes" 
      className="border-b border-border bg-muted/40 py-8 text-foreground transition-colors dark:bg-background/95"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-center gap-2">
          <span className="h-4 w-4 bg-realty" aria-hidden />
          <h2 className="text-lg font-extrabold uppercase tracking-tight text-foreground">
            Realty Bytes
          </h2>
          <span className="ml-2 hidden text-sm text-muted-foreground sm:inline">
            Quick market takes &amp; policy snippets
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((a) => (
            <Link
              key={a.id}
              href={`/articles/${a.slug}`}
              className="group flex flex-col border border-border bg-card p-4 transition-all hover:shadow-md dark:bg-card dark:border-border/80 dark:hover:border-foreground/20"
            >
              <div className="flex items-center justify-between">
                <CategoryBadge category={a.category} />
                <time className="text-xs font-medium text-muted-foreground">
                  {timeAgo(a.dateline)}
                </time>
              </div>
              
              <h3 className="mt-2 text-base font-bold leading-snug text-foreground line-clamp-2 group-hover:text-realty">
                {a.title}
              </h3>
              
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {a.content}
              </p>
              
              <span className="mt-auto pt-3 inline-block text-xs font-bold uppercase tracking-wide text-realty">
                Read &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}