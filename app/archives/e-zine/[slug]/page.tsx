import { notFound } from "next/navigation"
import { getMagazineIssueBySlug } from "@/lib/articlesdata"
import { MagazineFlipbook } from "@/components/magazine-flipbook"

interface PageProps {
  params: Promise<{ slug: string }>
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
