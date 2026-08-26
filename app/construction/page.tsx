import { getActiveSubcategoryData, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"

export default async function ConstructionPage() {
  const data = await getActiveSubcategoryData("Construction")

  return <CategoryLayout
    parentCategory="Construction"
    subCategoryTitle="Construction"
    subCategoriesList={["Construction"]}
    leadStory={mapStrapiArticleToUI(data.leadStory || {
      id: 0, title: "Construction Coverage", slug: "", category: "Construction", subcategory: "Construction",
      publishedAt: new Date().toISOString(), createdAt: "", updatedAt: "",
    })}
    topStories={data.topStories.map(mapStrapiArticleToUI)}
    latestArticles={data.latest.map(mapStrapiArticleToUI)}
    opinionArticles={data.marketInsights.map(mapStrapiArticleToUI)}
    spotlightArticles={data.spotlight.map(mapStrapiArticleToUI)}
    section5Title="Mega-Projects Spotlight"
  />
}