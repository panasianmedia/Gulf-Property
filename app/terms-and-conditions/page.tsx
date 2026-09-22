import type { Metadata } from "next"

import { TermsAndConditionsPage } from "@/components/terms-and-conditions"

export const metadata: Metadata = {
  title: "Terms and Conditions | Gulf Property",
  description: "Terms governing access to and use of the Gulf Property website and its content.",
}

export default function TermsAndConditionsRoutePage() {
  return <TermsAndConditionsPage />
}