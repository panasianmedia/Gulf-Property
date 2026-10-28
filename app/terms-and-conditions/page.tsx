import { TermsAndConditionsPage } from "@/components/terms-and-conditions"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Terms and Conditions",
  description: "Terms governing access to and use of the Gulf Property website and its content.",
  pathname: "/terms-and-conditions",
})

export default function TermsAndConditionsRoutePage() {
  return <TermsAndConditionsPage />
}