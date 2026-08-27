"use client"

import { Suspense } from "react"
import Link from "next/link"
import { CategoryBadge } from "@/components/category-badge"
import { formatDate, timeAgo } from "@/lib/utils"
import { AdSquareBox, AdLeaderboardBox } from "@/components/ad-box"
import type { AdSlots } from "@/lib/articlesdata"

export interface ArticleUI {
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

interface UniversalCategoryLayoutProps {
  parentCategory: string       // "Property", "UAE", "World"
  subCategoryTitle: string     // "Residential", "Dubai", "GCC"
  subCategoriesList: string[]   // ["Residential", "Commercial", "Hospitality", ...]
  leadStory: ArticleUI         // 1 Main Story
  topStories: ArticleUI[]      // 4 Top Stories
  latestArticles: ArticleUI[]  // 6 Latest Articles
  opinionArticles: ArticleUI[] // 3 Market Insights
  spotlightArticles: ArticleUI[] // 4 Spotlight Articles
  section5Title?: string
  ads?: AdSlots
}

function UniversalCategoryContent({
  parentCategory,
  subCategoryTitle,
  subCategoriesList = [],
  leadStory,
  topStories,
  latestArticles,
  opinionArticles,
  spotlightArticles,
  section5Title = "Spotlight",
  ads,
}: UniversalCategoryLayoutProps) {
  const parentSlug = parentCategory.toLowerCase().replace(/\s+/g, "-")

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
                  {parentCategory} Coverage
                </span>
              </div>
              <h1 className="mt-1 text-3xl font-extrabold tracking-tight md:text-5xl capitalize">
                {subCategoryTitle}
              </h1>
            </div>

            {/* Dynamic Sub-category Navigation Pills */}
            <nav className="flex flex-wrap gap-2 pt-2 md:pt-0" aria-label="Subcategories">
              {subCategoriesList.map((sub) => {
                const subSlug = sub.toLowerCase().replace(/\s+/g, "-")
                const isActive = sub.toLowerCase() === subCategoryTitle.toLowerCase()
                return (
                  <Link
                    key={sub}
                    href={`/${parentSlug}/${subSlug}`}
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
        {/* Rectangular Leaderboard Advertisement Box */}
        <AdLeaderboardBox ad={ads?.rectangle1} className="mb-10" />

        {/* 1. MAIN STORY (1) & TOP STORIES (4) */}
        <section aria-label="Top Stories" className="mb-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            
            {/* 1 Main Story */}
            <div className="lg:col-span-8">
              <Link href={`/articles/${leadStory.slug}`} className="group block">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={leadStory.image || "/images/placeholder.svg"}
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

                <div className="mt-4 flex items-center gap-3 text-xs font-medium text-muted-foreground">
                  {leadStory.author && <span>By {leadStory.author}</span>}
                  {leadStory.author && <span>&bull;</span>}
                  <time>{timeAgo(leadStory.dateline)} ago</time>
                </div>
              </Link>
            </div>

            {/* 4 Top Stories */}
            <div className="flex flex-col gap-4 lg:col-span-4 lg:border-l lg:border-border lg:pl-8">
              <div className="border-b-2 border-foreground pb-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-foreground">
                  Top Stories in {subCategoryTitle}
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

              {/* Square Advertisement Box */}
              <AdSquareBox ad={ads?.square1} className="mt-2" />
            </div>

          </div>
        </section>

        {/* 2. LATEST (6 STORIES) */}
        <section aria-label="Latest Coverage" className="mb-10">
          <div className="mb-6 flex items-center gap-2 border-b-2 border-foreground pb-2">
            <span className="h-3 w-3 bg-realty" aria-hidden />
            <h2 className="text-lg font-extrabold uppercase tracking-wide">
              Latest {subCategoryTitle} Coverage
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestArticles.slice(0, 6).map((item) => (
              <article key={item.id} className="flex flex-col justify-between border-b border-border pb-6 sm:border-b-0">
                <div>
                  <Link href={`/articles/${item.slug}`} className="group block">
                    <div className="relative aspect-video w-full overflow-hidden bg-muted">
                      <img
                        src={item.image || "/images/placeholder.svg"}
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

        {/* 3. MARKET INSIGHTS (3 STORIES) */}
        <section aria-label="Market Insights" className="mb-12 bg-muted/40 p-6 md:p-8">
          <div className="mb-6 border-b border-border pb-2">
            <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
              Market Insights & Analysis
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
          </div>
        </section>

        {/* Rectangular Leaderboard Advertisement Box */}
        <AdLeaderboardBox ad={ads?.rectangle2} className="mb-12" />

        {/* 4. SPOTLIGHT (4 STORIES) */}
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
                      src={item.image || "/images/placeholder.svg"}
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

          {/* Square Advertisement Box */}
          <AdSquareBox ad={ads?.square2} className="mx-auto mt-8" />
        </section>

        {/* 5. LINK TO ARCHIVE */}
        <div className="text-center mt-12 border-t border-border pt-8">
          <Link
            href={`/${parentSlug}/${subCategoryTitle.toLowerCase().replace(/\s+/g, "-")}/archive`}
            className="inline-block px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-realty hover:text-white transition-colors"
          >
            Explore Earlier {subCategoryTitle} Reads →
          </Link>
        </div>
      </main>
    </div>
  )
}

export function CategoryLayout(props: UniversalCategoryLayoutProps) {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading coverage...</div>}>
      <UniversalCategoryContent {...props} />
    </Suspense>
  )
}