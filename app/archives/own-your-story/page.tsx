import { OwnYourStory } from "@/components/own-your-story"
import { getOwnYourStories } from "@/lib/own-your-story-data"

interface PageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function OwnYourStoryPage({ searchParams }: PageProps) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, Number.parseInt(pageParam || "1", 10) || 1)
  const pageData = await getOwnYourStories(page)

  return <OwnYourStory pageData={pageData} />
}
