import { ContactPage } from "@/components/contact"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Contact Gulf Property",
  description:
    "Contact the Gulf Property newsroom and team with editorial enquiries, news tips and business questions.",
  pathname: "/contact",
})

export default function ContactRoutePage() {
  return <ContactPage />
}
