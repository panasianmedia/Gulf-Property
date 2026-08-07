"use client"

import { Suspense } from "react"
import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { formatDate, timeAgo } from "@/lib/news-data"

export interface Article {
  id: string
  title: string
  slug: string
  category: string
  content: string
  dateline: string
  image?: string
  author?: string
  bullets?: string[]
}

interface WorldCategoryLayoutProps {
  regionTitle: string // "GCC", "Middle East", "Asia", "Europe", "Americas", "Africa"
  leadStory: Article // 1 Main Story
  topStories: Article[] // 4 Top Stories
  latestArticles: Article[] // 6 Latest Articles
  opinionArticles: Article[] // 3 Market Insights
  spotlightArticles: Article[] // 4 Region Spotlight Articles
  section5Title?: string
}

// World Subcategories List
const WORLD_SUB_CATEGORIES = [
  "GCC",
  "Middle East",
  "Asia",
  "Europe",
  "Americas",
  "Africa",
]

function WorldCategoryContent({
  regionTitle,
  leadStory,
  topStories,
  latestArticles,
  opinionArticles,
  spotlightArticles,
  section5Title = "Regional Spotlight",
}: WorldCategoryLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      {/* ----------------- CATEGORY HEADER & SUB-NAV ----------------- */}
      <header className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 pt-6 pb-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 bg-realty" aria-hidden />
                <span className="text-xs font-bold uppercase tracking-widest text-realty">
                  Global Coverage
                </span>
              </div>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-5xl capitalize">
                {regionTitle}
              </h1>
            </div>

            {/* Sub-category Pill Navigation */}
            <nav className="flex flex-wrap gap-2 pt-2 md:pt-0" aria-label="World subcategories">
              {WORLD_SUB_CATEGORIES.map((sub) => {
                const subSlug = sub.toLowerCase().replace(/\s+/g, "-")
                const isActive = sub.toLowerCase() === regionTitle.toLowerCase()
                return (
                  <Link
                    key={sub}
                    href={`/world/${subSlug}`}
                    className={`px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-realty text-white"
                        : "bg-muted text-muted-foreground hover:bg-foreground/10 hover:text-foreground"
                    }`}
                  >
                    {sub}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* ----------------- 1. MAIN STORY (1) & 2. TOP STORIES (4) ----------------- */}
        <section aria-label="Top Stories" className="mb-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* 1 Main Story (8 cols) */}
            <div className="lg:col-span-8">
              <Link href={`/articles/${leadStory.slug}`} className="group block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={leadStory.image || "/placeholder.svg"}
                    alt={leadStory.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute left-3 top-3">
                    <CategoryBadge category={leadStory.category} variant="overlay" />
                  </div>
                </div>

                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-foreground group-hover:text-realty md:text-4xl">
                  {leadStory.title}
                </h2>
                
                <p className="mt-3 text-base leading-relaxed text-muted-foreground line-clamp-3 md:text-lg">
                  {leadStory.content}
                </p>

                {leadStory.bullets && leadStory.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2 border-l-2 border-realty pl-4 text-sm font-medium text-foreground">
                    {leadStory.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-realty">&bull;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-4 flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  {leadStory.author && <span>By {leadStory.author}</span>}
                  {leadStory.author && <span>&bull;</span>}
                  <time>{timeAgo(leadStory.dateline)} ago</time>
                </div>
              </Link>
            </div>

            {/* 4 Top Stories Sidebar (4 cols) */}
            <div className="flex flex-col gap-4 lg:col-span-4 lg:border-l lg:border-border lg:pl-8">
              <div className="border-b-2 border-foreground pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Top Stories in {regionTitle}
                </h3>
              </div>

              <div className="divide-y divide-border">
                {topStories.slice(0, 4).map((story) => (
                  <article key={story.id} className="py-3.5 first:pt-0 last:pb-0">
                    <Link href={`/articles/${story.slug}`} className="group block">
                      <CategoryBadge category={story.category} />
                      <h4 className="mt-1 text-base font-bold leading-snug text-foreground group-hover:text-realty line-clamp-2">
                        {story.title}
                      </h4>
                      <time className="mt-1.5 block text-[11px] font-medium text-muted-foreground">
                        {formatDate(story.dateline)}
                      </time>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ----------------- ADVERTISEMENT BOX 1 (728x90 BANNER) ----------------- */}
        <div className="my-10 flex w-full items-center justify-center border border-border bg-muted/30 py-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Advertisement</span>
            <div className="mt-1 flex h-[90px] w-full max-w-[728px] items-center justify-center bg-muted/60 text-xs font-semibold text-muted-foreground">
              728 x 90 Leaderboard Ad Box
            </div>
          </div>
        </div>

        {/* ----------------- 3. LATEST (6 STORIES) ----------------- */}
        <section aria-label="Latest Coverage" className="mb-10">
          <div className="mb-6 flex items-center gap-2 border-b-2 border-foreground pb-2">
            <span className="h-3 w-3 bg-realty" aria-hidden />
            <h2 className="text-lg font-extrabold uppercase tracking-wide">
              Latest {regionTitle} Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.slice(0, 6).map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between border-b border-border pb-6 sm:border-b-0"
              >
                <div>
                  <Link href={`/articles/${item.slug}`} className="group block">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-3">
                      <CategoryBadge category={item.category} />
                      <h3 className="mt-1 text-base font-bold leading-snug text-foreground group-hover:text-realty line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  </Link>
                </div>
                <time className="mt-4 block text-[11px] font-medium text-muted-foreground">
                  {timeAgo(item.dateline)} ago
                </time>
              </article>
            ))}
          </div>
        </section>

        {/* ----------------- ADVERTISEMENT BOX 2 (728x90 BANNER) ----------------- */}
        <div className="my-10 flex w-full items-center justify-center border border-border bg-muted/30 py-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Advertisement</span>
            <div className="mt-1 flex h-[90px] w-full max-w-[728px] items-center justify-center bg-muted/60 text-xs font-semibold text-muted-foreground">
              728 x 90 Leaderboard Ad Box
            </div>
          </div>
        </div>

        {/* ----------------- 4. MARKET INSIGHTS (3 STORIES + 1 AD BOX) ----------------- */}
        <section aria-label="Market Insights" className="mb-12 bg-muted/40 p-6 md:p-8">
          <div className="mb-6 border-b border-border pb-2">
            <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Market Insights & Global Analysis
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* 3 Insight Cards */}
            {opinionArticles.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/articles/${item.slug}`}
                className="group flex flex-col justify-between bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-realty">
                    {item.category}
                  </span>
                  <h3 className="mt-2 text-base font-extrabold leading-snug text-foreground group-hover:text-realty line-clamp-3">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                    {item.content}
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground">
                  <span className="font-semibold">{item.author || "Analysis"}</span>
                  <span>{formatDate(item.dateline)}</span>
                </div>
              </Link>
            ))}

            {/* 1 Integrated Vertical Ad Box (300x250) */}
            <div className="flex flex-col items-center justify-center bg-muted/80 p-5 text-center shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Advertisement</span>
              <div className="mt-2 flex h-full w-full min-h-[180px] items-center justify-center bg-muted text-xs font-semibold text-muted-foreground">
                300 x 250 Rectangular Ad Box
              </div>
            </div>
          </div>
        </section>

        {/* ----------------- 5. REGIONAL SPOTLIGHT (4 STORIES) ----------------- */}
        <section aria-label={section5Title} className="pt-2">
          <div className="mb-6 flex items-center gap-2 border-b-2 border-foreground pb-2">
            <span className="h-3 w-3 bg-realty" aria-hidden />
            <h2 className="text-lg font-extrabold uppercase tracking-wide">
              {section5Title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {spotlightArticles.slice(0, 4).map((item) => (
              <article key={item.id} className="group flex flex-col justify-between border-b border-border pb-6 sm:border-b-0">
                <Link href={`/articles/${item.slug}`}>
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-3">
                    <CategoryBadge category={item.category} />
                    <h3 className="mt-1 text-sm font-bold leading-snug text-foreground group-hover:text-realty line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
                <time className="mt-2 block text-[11px] text-muted-foreground">
                  {formatDate(item.dateline)}
                </time>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export function WorldCategoryLayout(props: WorldCategoryLayoutProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading world coverage...</div>}>
      <WorldCategoryContent {...props} />
    </Suspense>
  )
}