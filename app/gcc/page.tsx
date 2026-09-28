import { getActiveSubcategoryData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"

export default async function GccPage() {
  const [data, ads] = await Promise.all([getActiveSubcategoryData("GCC"), getAdvertisements()])

  return <CategoryLayout
    parentCategory="GCC"
    subCategoryTitle="GCC"
    subCategoriesList={["GCC"]}
    leadStory={mapStrapiArticleToUI(data.leadStory || {
      id: 0, title: "GCC Coverage", slug: "", category: "GCC", subcategory: "GCC",
      publishedAt: new Date().toISOString(), createdAt: "", updatedAt: "",
    })}
    topStories={data.topStories.map(mapStrapiArticleToUI)}
    latestArticles={data.latest.map(mapStrapiArticleToUI)}
    opinionArticles={data.marketInsights.map(mapStrapiArticleToUI)}
    spotlightArticles={data.spotlight.map(mapStrapiArticleToUI)}
    section5Title="GCC Markets Spotlight"
    ads={ads}
  />
}
