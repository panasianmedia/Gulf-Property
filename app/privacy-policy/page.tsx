import type { Metadata } from "next"

import { PrivacyPolicyPage } from "@/components/privacy-policy"

export const metadata: Metadata = {
  title: "Privacy Policy | Gulf Property",
  description: "How Gulf Property collects, uses, shares and protects information on its website.",
}

export default function PrivacyPolicyRoutePage() {
  return <PrivacyPolicyPage />
}