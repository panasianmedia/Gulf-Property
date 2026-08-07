import { notFound } from "next/navigation"
import { UAECategoryLayout } from "@/components/uae-category-layout"
import { latestNews, leftBriefs, spotlight } from "@/lib/news-data"

const VALID_EMIRATES = [
  "abu-dhabi",
  "dubai",
  "ras-al-khaimah",
  "sharjah",
]

interface PageProps {
  params: Promise<{ city: string }>
}

export default async function UAECityPage({ params }: PageProps) {
  const { city } = await params
  const normalizedCity = city.toLowerCase()

  if (!VALID_EMIRATES.includes(normalizedCity)) {
    notFound()
  }

  // Formatting city display name (e.g., "abu-dhabi" -> "Abu Dhabi")
  const cityDisplayName = city
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  // Filter articles based on city location
  const cityArticles = latestNews.filter(
    (item) => item.category.toLowerCase().replace(/\s+/g, "-") === normalizedCity
  )

  const leadStory = cityArticles[0] || {
    ...spotlight,
    category: cityDisplayName,
    title: `${cityDisplayName} Real Estate & Business Intelligence`,
  }

  // Story count distribution: 1 Lead, 4 Top, 6 Latest, 3 Insights, 4 Spotlight
  const topStories = cityArticles.length > 1 ? cityArticles.slice(1, 5) : leftBriefs.slice(0, 4)
  const latestArticles = cityArticles.length > 5 ? cityArticles.slice(5, 11) : latestNews.slice(0, 6)
  const opinionArticles = latestNews.slice(0, 3)
  const spotlightArticles = latestNews.slice(3, 7)

  return (
    <UAECategoryLayout
      cityTitle={cityDisplayName}
      leadStory={leadStory}
      topStories={topStories}
      latestArticles={latestArticles}
      opinionArticles={opinionArticles}
      spotlightArticles={spotlightArticles}
      section5Title={`${cityDisplayName} Spotlight`}
    />
  )
}