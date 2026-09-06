import { getMagazineIssues } from "@/lib/articlesdata"
import { EZineArchive } from "@/components/e-zine-archive"

export default async function ArchivesEZinePage() {
  const issues = await getMagazineIssues()
  return <EZineArchive issues={issues} />
}
