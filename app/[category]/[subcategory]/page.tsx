import { notFound } from "next/navigation";
import { getActiveSubcategoryData, getAdvertisements, mapStrapiArticleToUI } from "@/lib/articlesdata";
import { CategoryLayout } from "@/components/CategoryLayout";

// Exact dropdown categories mapping matching your Navbar
const CATEGORY_MAP: Record<string, { title: string; subcategories: Record<string, string> }> = {
  property: {
    title: "Property",
    subcategories: {
      residential: "Residential",
      commercial: "Commercial",
      hospitality: "Hospitality",
      retail: "Retail",
      logistics: "Logistics",
      tourism: "Tourism",
    },
  },
  uae: {
    title: "UAE",
    subcategories: {
      "abu-dhabi": "Abu Dhabi",
      dubai: "Dubai",
      "ras-al-khaimah": "Ras Al Khaimah",
      sharjah: "Sharjah",
    },
  },
  world: {
    title: "World",
    subcategories: {
      gcc: "GCC",
      "middle-east": "Middle East",
      asia: "Asia",
      europe: "Europe",
      americas: "Americas",
      africa: "Africa",
    },
  },
};

interface PageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

export default async function DynamicSubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;

  const categoryConfig = CATEGORY_MAP[category.toLowerCase()];
  if (!categoryConfig) notFound();

  const subCategoryTitle = categoryConfig.subcategories[subcategory.toLowerCase()];
  if (!subCategoryTitle) notFound();

  // 1. Fetch live 18 active slot articles from Strapi
  const [rawData, ads] = await Promise.all([
    getActiveSubcategoryData(subCategoryTitle),
    getAdvertisements(),
  ]);

  // 2. Map data to UI component structure
  const leadStory = rawData.leadStory
    ? mapStrapiArticleToUI(rawData.leadStory)
    : {
        id: "0",
        title: `Welcome to ${subCategoryTitle} News`,
        slug: "#",
        category: subCategoryTitle,
        content: "Latest editorial coverage and market reports.",
        dateline: new Date().toISOString(),
        image: "/images/placeholder.svg",
      };

  const topStories = rawData.topStories.map(mapStrapiArticleToUI);
  const latestArticles = rawData.latest.map(mapStrapiArticleToUI);
  const opinionArticles = rawData.marketInsights.map(mapStrapiArticleToUI);
  const spotlightArticles = rawData.spotlight.map(mapStrapiArticleToUI);

  return (
    <CategoryLayout
      parentCategory={categoryConfig.title}
      subCategoryTitle={subCategoryTitle}
      subCategoriesList={Object.values(categoryConfig.subcategories)}
      leadStory={leadStory}
      topStories={topStories}
      latestArticles={latestArticles}
      opinionArticles={opinionArticles}
      spotlightArticles={spotlightArticles}
      section5Title={`${subCategoryTitle} Spotlight`}
      ads={ads}
    />
  );
}