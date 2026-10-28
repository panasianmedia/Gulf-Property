import { AboutPage } from "@/components/about"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "About Gulf Property",
  description:
    "Learn about Gulf Property, the publication covering real estate, construction, markets and property across the Gulf.",
  pathname: "/about",
})

export default function AboutRoutePage() {
  return <AboutPage />
}
