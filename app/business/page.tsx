import { getActiveSubcategoryData, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"

export default async function BusinessPage() {
  const data = await getActiveSubcategoryData("Business")

  return <CategoryLayout
    parentCategory="Business"
    subCategoryTitle="Business"
    subCategoriesList={["Business"]}
    leadStory={mapStrapiArticleToUI(data.leadStory || {
      id: 0, title: "Business Coverage", slug: "", category: "Business", subcategory: "Business",
      publishedAt: new Date().toISOString(), createdAt: "", updatedAt: "",
    })}
    topStories={data.topStories.map(mapStrapiArticleToUI)}
    latestArticles={data.latest.map(mapStrapiArticleToUI)}
    opinionArticles={data.marketInsights.map(mapStrapiArticleToUI)}
    spotlightArticles={data.spotlight.map(mapStrapiArticleToUI)}
    section5Title="Corporate & Market Spotlight"
  />
}