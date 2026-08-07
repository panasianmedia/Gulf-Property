import { notFound } from "next/navigation"
import { WorldCategoryLayout } from "@/components/world-category-layout"
import { latestNews, leftBriefs, spotlight } from "@/lib/news-data"

const VALID_REGIONS = [
  "gcc",
  "middle-east",
  "asia",
  "europe",
  "americas",
  "africa",
]

interface PageProps {
  params: Promise<{ region: string }>
}

export default async function WorldRegionPage({ params }: PageProps) {
  const { region } = await params
  const normalizedRegion = region.toLowerCase()

  if (!VALID_REGIONS.includes(normalizedRegion)) {
    notFound()
  }

  // Format display name (e.g., "gcc" -> "GCC", "middle-east" -> "Middle East")
  const regionDisplayName = normalizedRegion === "gcc"
    ? "GCC"
    : region
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

  // Filter articles based on region
  const regionArticles = latestNews.filter(
    (item) => item.category.toLowerCase().replace(/\s+/g, "-") === normalizedRegion
  )

  const leadStory = regionArticles[0] || {
    ...spotlight,
    category: regionDisplayName,
    title: `${regionDisplayName} Global Real Estate & Economic Outlook`,
  }

  // Story count distribution: 1 Lead, 4 Top, 6 Latest, 3 Insights, 4 Spotlight
  const topStories = regionArticles.length > 1 ? regionArticles.slice(1, 5) : leftBriefs.slice(0, 4)
  const latestArticles = regionArticles.length > 5 ? regionArticles.slice(5, 11) : latestNews.slice(0, 6)
  const opinionArticles = latestNews.slice(0, 3)
  const spotlightArticles = latestNews.slice(3, 7)

  return (
    <WorldCategoryLayout
      regionTitle={regionDisplayName}
      leadStory={leadStory}
      topStories={topStories}
      latestArticles={latestArticles}
      opinionArticles={opinionArticles}
      spotlightArticles={spotlightArticles}
      section5Title={`${regionDisplayName} Spotlight`}
    />
  )
}