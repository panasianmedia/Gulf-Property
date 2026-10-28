import { notFound } from "next/navigation"
import { getMagazineIssueBySlug } from "@/lib/articlesdata"
import { MagazineFlipbook } from "@/components/magazine-flipbook"
import { createPageMetadata } from "@/lib/seo"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const issue = await getMagazineIssueBySlug(slug)
  if (!issue) notFound()

  return createPageMetadata({
    title: `${issue.title} | E-Zine`,
    description: issue.description || `Read the ${issue.title} digital magazine from Gulf Property.`,
    pathname: `/archives/e-zine/${encodeURIComponent(issue.slug)}`,
    image: issue.cover,
  })
}

export default async function ArchivesEZineIssuePage({ params }: PageProps) {
  const { slug } = await params
  const issue = await getMagazineIssueBySlug(slug)

  if (!issue) notFound()

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <MagazineFlipbook issue={issue} />
    </main>
  )
}
