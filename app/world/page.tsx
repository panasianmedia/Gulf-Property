import { getActiveRegionData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"
import { createPageMetadata } from "@/lib/seo"

const WORLD_SUBCATEGORIES = ["Middle East", "Asia", "Europe", "Americas", "Africa"]

export const metadata = createPageMetadata({
  title: "Global Real Estate News",
  description:
    "Explore international property market news and real estate coverage from the Middle East, Asia, Europe, the Americas and Africa.",
  pathname: "/world",
})

export default async function WorldPage() {
  const [data, ads] = await Promise.all([getActiveRegionData(WORLD_SUBCATEGORIES), getAdvertisements()])

  return <CategoryLayout
    parentCategory="World"
    subCategoryTitle="World"
    subCategoriesList={[]}
    leadStory={mapStrapiArticleToUI(data.leadStory || {
      id: 0, title: "World Coverage", slug: "", category: "World", subcategory: "World",
      publishedAt: new Date().toISOString(), createdAt: "", updatedAt: "",
    })}
    topStories={data.topStories.map(mapStrapiArticleToUI)}
    latestArticles={data.latest.map(mapStrapiArticleToUI)}
    opinionArticles={data.marketInsights.map(mapStrapiArticleToUI)}
    ads={ads}
  />
}
