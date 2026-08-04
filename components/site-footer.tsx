"use client"

import Image from "next/image"


import { navFooterItems } from "@/lib/news-data"
import { SocialLinks } from "@/components/social-links"
import { siteConfig } from "@/lib/site-config"
import Logo from "../public/images/Gulf Property.png"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
         <a href="/" className="flex shrink-0 items-center" aria-label={`${siteConfig.name} home`}>
                   <Image
                     src={Logo}
                     alt={`${siteConfig.name} logo`}
                     width={180}
                     height={44}
                     priority
                     className="w-58 h-14 object-contain"
                   />
                 </a>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navFooterItems.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-xs font-semibold uppercase tracking-wide text-gray-300 hover:text-red-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 flex flex-col gap-4 border-t border-gray-800 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} {siteConfig.name}. High-density editorial coverage of the real
            estate economy. All market data shown is illustrative.
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">Follow us</span>
            <SocialLinks variant="inverted" />
          </div>
        </div>
      </div>
    </footer>
  )
}
