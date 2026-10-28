import { getMagazineIssues } from "@/lib/articlesdata"
import { EZineArchive } from "@/components/e-zine-archive"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Gulf Property E-Zine Archive",
  description:
    "Browse Gulf Property digital magazine issues and read property, real estate and construction features.",
  pathname: "/archives/e-zine",
})

export default async function ArchivesEZinePage() {
  const issues = await getMagazineIssues()
  return <EZineArchive issues={issues} />
}
