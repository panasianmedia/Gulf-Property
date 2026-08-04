"use client"

import { useState } from "react"
import Link from "next/link"
import { siteConfig } from "@/lib/site-config"

export function SiteLogo({ className = "" }: { className?: string }) {
  const [imgOk, setImgOk] = useState(true)

  return (
    <Link href="/" aria-label={`${siteConfig.name} home`} className={`inline-flex items-center ${className}`}>
      {imgOk ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={siteConfig.logoSrc || "/placeholder.svg"}
          alt={`${siteConfig.name} logo`}
          width={siteConfig.logoWidth}
          height={siteConfig.logoHeight}
          className="h-9 w-auto object-contain md:h-10"
          onError={() => setImgOk(false)}
        />
      ) : (
        <span className="text-2xl font-black leading-none tracking-tight md:text-3xl">
          <span className="text-foreground">{siteConfig.wordmark.primary}</span>
          <span className="text-realty">{siteConfig.wordmark.secondary}</span>
        </span>
      )}
    </Link>
  )
}
