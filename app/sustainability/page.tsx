import { getActiveSubcategoryData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"

export default async function SustainabilityPage() {
  const [data, ads] = await Promise.all([getActiveSubcategoryData("Sustainability"), getAdvertisements()])

  return <CategoryLayout
    parentCategory="Sustainability"
    subCategoryTitle="Sustainability"
    subCategoriesList={["Sustainability"]}
    leadStory={mapStrapiArticleToUI(data.leadStory || {
      id: 0, title: "Sustainability Coverage", slug: "", category: "Sustainability", subcategory: "Sustainability",
      publishedAt: new Date().toISOString(), createdAt: "", updatedAt: "",
    })}
    topStories={data.topStories.map(mapStrapiArticleToUI)}
    latestArticles={data.latest.map(mapStrapiArticleToUI)}
    opinionArticles={data.marketInsights.map(mapStrapiArticleToUI)}
    spotlightArticles={data.spotlight.map(mapStrapiArticleToUI)}
    section5Title="Green & Future-Ready Spotlight"
    ads={ads}
  />
}
