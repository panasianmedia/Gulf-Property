// app/page.tsx
import { getHomePageData, getAdvertisements, mapStrapiArticleToUI, UIArticle } from "@/lib/articlesdata"
import { HeroSection } from "@/components/hero-section"
import { RealtyBytes } from "@/components/realty-bytes"
import { ExclusiveSection } from "@/components/exclusive-section"
import { ConstructionLatest } from "@/components/construction-latest"

export const revalidate = 60 // Fresh data every 60s

export default async function HomePage() {
  const [data, ads] = await Promise.all([getHomePageData(), getAdvertisements()])

  // Map Strapi records into clean UI objects
  const leadArticle: UIArticle | null = data.lead ? mapStrapiArticleToUI(data.lead) : null
  const breakingArticles: UIArticle[] = (data.breaking || []).map(mapStrapiArticleToUI)
  const latestArticles: UIArticle[] = (data.latest || []).map(mapStrapiArticleToUI)
  const exclusiveArticles: UIArticle[] = (data.exclusive || []).map(mapStrapiArticleToUI)
  const realtyBytesArticles: UIArticle[] = (data.realtyBytes || []).map(mapStrapiArticleToUI)
  const trendingArticles: UIArticle[] = (data.trending || []).map(mapStrapiArticleToUI)
  const highlightsArticles: UIArticle[] = (data.highlights || []).map(mapStrapiArticleToUI)
  const megaprojectsArticles: UIArticle[] = (data.megaprojects || []).map(mapStrapiArticleToUI)

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      {/* 1. Hero Section (Lead + Breaking/Trending/Highlights) */}
      <HeroSection
        lead={leadArticle}
        breaking={breakingArticles}
        exclusive={exclusiveArticles}
        latest={latestArticles}
        squareAd={ads.square1}
      />

      {/* 2. Realty Bytes */}
      <RealtyBytes articles={realtyBytesArticles} />

      {/* 3. Exclusive Section */}
      <ExclusiveSection
        trending={trendingArticles}
        leaderboardAd={ads.rectangle1}
      />

      {/* 4. Construction Latest */}
      <ConstructionLatest
        highlights={highlightsArticles}
        megaprojects={megaprojectsArticles}
        squareAd={ads.square2}
        leaderboardAd={ads.rectangle2}
      />
    </main>
  )
}