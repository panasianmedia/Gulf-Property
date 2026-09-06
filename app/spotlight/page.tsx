import { getActiveSubcategoryData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"

export default async function SpotlightPage() {
  const [data, ads] = await Promise.all([getActiveSubcategoryData("Spotlight"), getAdvertisements()])

  return <CategoryLayout
    parentCategory="Spotlight"
    subCategoryTitle="Spotlight"
    subCategoriesList={["Spotlight"]}
    leadStory={mapStrapiArticleToUI(data.leadStory || {
      id: 0, title: "Spotlight Coverage", slug: "", category: "Spotlight", subcategory: "Spotlight",
      publishedAt: new Date().toISOString(), createdAt: "", updatedAt: "",
    })}
    topStories={data.topStories.map(mapStrapiArticleToUI)}
    latestArticles={data.latest.map(mapStrapiArticleToUI)}
    opinionArticles={data.marketInsights.map(mapStrapiArticleToUI)}
    spotlightArticles={data.spotlight.map(mapStrapiArticleToUI)}
    section5Title="Editorial Spotlight"
    ads={ads}
  />
}
