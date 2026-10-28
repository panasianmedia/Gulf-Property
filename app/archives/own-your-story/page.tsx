import { OwnYourStory } from "@/components/own-your-story"
import { getOwnYourStories } from "@/lib/own-your-story-data"
import { createPageMetadata } from "@/lib/seo"
import type { Metadata } from "next"

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number.parseInt(pageParam || "1", 10) || 1)
  return {
    ...createPageMetadata({
      title: "Own Your Story: Real Property Journeys",
      description:
        "Read personal property journeys and real estate experiences shared by Gulf Property readers.",
      pathname: "/archives/own-your-story",
    }),
    ...(page > 1 && { robots: { index: false, follow: true } }),
  }
}

export default async function OwnYourStoryPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number.parseInt(pageParam || "1", 10) || 1)
  const pageData = await getOwnYourStories(page)

  return <OwnYourStory pageData={pageData} />
}
