import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { OwnYourStoryDetail } from "@/components/own-your-story-detail"
import { getOwnYourStoryBySlug } from "@/lib/own-your-story-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const story = await getOwnYourStoryBySlug(slug)
  return { title: story ? `${story.title} | Own Your Story | Gulf Property` : "Own Your Story | Gulf Property" }
}

export default async function OwnYourStoryDetailRoute({ params }: PageProps) {
  const { slug } = await params
  const story = await getOwnYourStoryBySlug(slug)
  if (!story) notFound()

  return <OwnYourStoryDetail story={story} />
}
