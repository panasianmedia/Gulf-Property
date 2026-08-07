import { notFound } from "next/navigation"
import { PropertyCategoryLayout } from "@/components/property-category-layout"
import { latestNews, leftBriefs, spotlight } from "@/lib/news-data"

const VALID_CATEGORIES = [
  "residential",
  "commercial",
  "hospitality",
  "retail",
  "logistics",
  "tourism",
]

interface PageProps {
  params: Promise<{ category: string }>
}

export default async function SubCategoryPage({ params }: PageProps) {
  const { category } = await params
  const normalizedCategory = category.toLowerCase()

  if (!VALID_CATEGORIES.includes(normalizedCategory)) {
    notFound()
  }

  const categoryArticles = latestNews.filter(
    (item) => item.category.toLowerCase() === normalizedCategory
  )

  const leadStory = categoryArticles[0] || {
    ...spotlight,
    category: category,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Sector Overview`,
  }

  // Story count distribution: 1 Lead, 4 Top, 6 Latest, 3 Insights, 4 Spotlight
  const topStories = categoryArticles.length > 1 ? categoryArticles.slice(1, 5) : leftBriefs.slice(0, 4)
  const latestArticles = categoryArticles.length > 5 ? categoryArticles.slice(5, 11) : latestNews.slice(0, 6)
  const opinionArticles = latestNews.slice(0, 3)
  const spotlightArticles = latestNews.slice(3, 7)

  return (
    <PropertyCategoryLayout
      categoryTitle={category}
      leadStory={leadStory}
      topStories={topStories}
      latestArticles={latestArticles}
      opinionArticles={opinionArticles}
      spotlightArticles={spotlightArticles}
      section5Title={`${category.charAt(0).toUpperCase() + category.slice(1)} Spotlight`}
    />
  )
}