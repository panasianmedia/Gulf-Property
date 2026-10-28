import { getActiveSubcategoryData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Gulf Construction News",
  description:
    "Explore Gulf construction news, major projects, developers, infrastructure and updates from across the region.",
  pathname: "/construction",
})

export default async function ConstructionPage() {
  const [data, ads] = await Promise.all([getActiveSubcategoryData("Construction"), getAdvertisements()])

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
    ads={ads}
  />
}