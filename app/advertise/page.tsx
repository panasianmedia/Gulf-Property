import { AdvertisePage } from "@/components/advertise"
import { createPageMetadata } from "@/lib/seo"

export const metadata = createPageMetadata({
  title: "Advertise with Gulf Property",
  description:
    "Reach real estate professionals, investors and property audiences across the Gulf with Gulf Property advertising.",
  pathname: "/advertise",
})

export default function AdvertiseRoutePage() {
  return <AdvertisePage />
}
