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
  return {
    title: story ? `${story.title} | Own Your Story | Gulf Property` : "Own Your Story | Gulf Property",
    description: story?.summary || "Read the latest Gulf Property Own Your Story feature.",
    alternates: {
      canonical: `https://www.thegulfproperty.com/archives/own-your-story/${slug}`,
    },
    openGraph: {
      title: story ? `${story.title} | Own Your Story | Gulf Property` : "Own Your Story | Gulf Property",
      description: story?.summary || "Read the latest Gulf Property Own Your Story feature.",
      url: `https://www.thegulfproperty.com/archives/own-your-story/${slug}`,
      images: story?.image ? [{ url: story.image, width: 1200, height: 630, alt: story.title }] : undefined,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: story ? `${story.title} | Own Your Story | Gulf Property` : "Own Your Story | Gulf Property",
      description: story?.summary || "Read the latest Gulf Property Own Your Story feature.",
      images: story?.image ? [story.image] : ['/images/Gulf Property.png'],
    },
  }
}

export default async function OwnYourStoryDetailRoute({ params }: PageProps) {
  const { slug } = await params
  const story = await getOwnYourStoryBySlug(slug)
  if (!story) notFound()

  return <OwnYourStoryDetail story={story} />
}
