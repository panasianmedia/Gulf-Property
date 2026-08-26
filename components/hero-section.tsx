import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { formatDate, timeAgo } from "@/lib/utils"
import type { ArticleUI } from "@/components/CategoryLayout"

interface HeroSectionProps {
  lead: ArticleUI | null
  breaking: ArticleUI[]
  trending: ArticleUI[]
  highlights: ArticleUI[]
}

export function HeroSection({ lead, breaking, trending, highlights }: HeroSectionProps) {
  const tickerItems = [...breaking, ...trending].slice(0, 5)
  const secondaryLeads = highlights.slice(0, 4)

  return (
    <section aria-label="Top stories" className="border-b border-border bg-background text-foreground transition-colors">
      <div className="py-2 flex min-w-0 flex-1 items-center gap-3 px-13">
        <span className="shrink-0 bg-realty px-2 py-0.5 text-[10px] text-white font-bold uppercase tracking-wider">
          Breaking
        </span>
        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div className="flex animate-[ticker_38s_linear_infinite] whitespace-nowrap gap-8 will-change-transform">
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/articles/${item.slug}`}
                className="flex items-center gap-8 text-sm text-foreground transition-colors hover:text-realty"
              >
                <span>{item.title}</span>
                <span className="text-realty" aria-hidden>
                  &bull;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-12 lg:gap-8">
        
        {/* LEFT — quick briefings (order-2 on mobile) */}
        <div className="order-2 lg:order-1 lg:col-span-3">
          <div className="mb-3 flex items-center gap-2 border-b-2 border-foreground pb-2">
            <span className="h-3 w-3 bg-realty" aria-hidden />
            <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Exclusive
            </span>
          </div>
          <ul className="divide-y divide-border">
            {breaking.map((a) => (
              <li key={a.id} className="py-3 first:pt-0">
                <Link href={`/articles/${a.slug}`} className="group block">
                  <CategoryBadge category={a.category} />
                  <h3 className="mt-1 text-base font-bold leading-snug text-foreground line-clamp-3 group-hover:text-realty">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">{a.content}</p>
                  <time className="mt-1.5 block text-xs font-medium text-muted-foreground">
                    {formatDate(a.dateline)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CENTER — spotlight (order-1 on mobile, first) */}
        <div className="order-1 lg:order-2 lg:col-span-6">
          {lead ? <Link href={`/articles/${lead.slug}`} className="group block text-center">
            <div className="relative w-full">
              <img
                src={lead.image || "/images/placeholder.svg"}
                alt={lead.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute left-0 top-0">
                <CategoryBadge category={lead.category} variant="overlay" />
              </div>
            </div>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground line-clamp-3 group-hover:text-realty md:text-4xl">
              {lead.title}
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground line-clamp-2 md:text-lg">
              {lead.content}
            </p>
            <time className="mt-3 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {timeAgo(lead.dateline)} &middot; {formatDate(lead.dateline)}
            </time>
          </Link> : <div className="flex min-h-64 items-center justify-center text-muted-foreground">No lead story available.</div>}
        </div>

        {/* RIGHT — secondary leads + Square Ad Box (order-3 on mobile) */}
        <div className="order-3 lg:col-span-3 flex flex-col justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 border-b-2 border-foreground pb-2">
              {/* Dynamic Latest News Header Box */}
              <div className="w-full flex items-center gap-2 border-b border-border bg-foreground text-background dark:bg-card dark:text-foreground px-4 py-2 transition-colors">
                <span className="h-3 w-3 bg-realty" aria-hidden />
                <h2 className="text-sm font-bold uppercase tracking-wide">Latest News</h2>
                <span className="ml-auto flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide opacity-80">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-realty" aria-hidden />
                  Live
                </span>
              </div>
            </div>

            <ul className="divide-y divide-border">
              {secondaryLeads.map((a) => (
                <li key={a.id} className="py-3 first:pt-0">
                  <Link href={`/articles/${a.slug}`} className="group flex gap-3">
                    <div className="relative aspect-video w-28 shrink-0">
                      <img
                        src={a.image || "/images/placeholder.svg"}
                        alt={a.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="min-w-0">
                      <CategoryBadge category={a.category} />
                      <h3 className="mt-0.5 text-sm font-bold leading-snug text-foreground line-clamp-3 group-hover:text-realty">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Small Square Box Advertisement */}
          <div className="mt-6 border border-border bg-muted/20 p-4 text-center">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
              Advertisement
            </span>
            <div className="mt-2 flex aspect-square w-full items-center justify-center border border-dashed border-border bg-muted/40 p-4">
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-xs font-bold text-foreground">Featured Ad</span>
                <span className="text-[10px] text-muted-foreground">250 x 250 Square Unit</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}