import { PrivacyPolicyPage } from "@/components/privacy-policy"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Gulf Property collects, uses, shares and protects information on its website.",
  pathname: "/privacy-policy",
})

export default function PrivacyPolicyRoutePage() {
  return <PrivacyPolicyPage />
}