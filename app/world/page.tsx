import { getActiveRegionData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"

const WORLD_SUBCATEGORIES = ["Middle East", "Asia", "Europe", "Americas", "Africa"]

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
    spotlightArticles={data.spotlight.map(mapStrapiArticleToUI)}
    section5Title="Global Markets Spotlight"
    ads={ads}
  />
}
