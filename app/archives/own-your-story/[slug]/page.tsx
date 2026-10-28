import { notFound } from "next/navigation"

import { OwnYourStoryDetail } from "@/components/own-your-story-detail"
import { getOwnYourStoryBySlug } from "@/lib/own-your-story-data"
import { createPageMetadata } from "@/lib/seo"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const story = await getOwnYourStoryBySlug(slug)
  if (!story) notFound()
  return createPageMetadata({
    title: `${story.title} | Own Your Story`,
    description: story.summary || `Read ${story.title}'s property journey on Gulf Property.`,
    pathname: `/archives/own-your-story/${encodeURIComponent(story.slug || slug)}`,
    image: story.image,
  })
}

export default async function OwnYourStoryDetailRoute({ params }: PageProps) {
  const { slug } = await params
  const story = await getOwnYourStoryBySlug(slug)
  if (!story) notFound()

  return <OwnYourStoryDetail story={story} />
}
