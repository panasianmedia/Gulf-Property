// app/page.tsx
import { HeroSection } from "@/components/hero-section"
import { RealtyBytes } from "@/components/realty-bytes"
import { ExclusiveSection } from "@/components/exclusive-section"
import { ConstructionLatest } from "@/components/construction-latest"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RealtyBytes />
      <ExclusiveSection />
      <ConstructionLatest />
    </>
  )
}