import { getActiveSubcategoryData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata"
import { CategoryLayout } from "@/components/CategoryLayout"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Gulf Business and Real Estate News",
  description:
    "Read Gulf Property coverage of real estate businesses, investment, companies and commercial property markets.",
  pathname: "/business",
})

export default async function BusinessPage() {
  const [data, ads] = await Promise.all([getActiveSubcategoryData("Business"), getAdvertisements()])

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
    ads={ads}
  />
}