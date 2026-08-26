/**
 * Central place to customize the publication's branding.
 * Swap these values (and drop your logo file at the path below) to rebrand.
 */
export const siteConfig = {
  name: "Gulf Property",
  // Two-word wordmark parts used for the styled text fallback logo.
  wordmark: { primary: "GULF", secondary: "PROPERTY" },
  tagline: "Real Estate Journalism, Market Data & Property Insights",
  /**
   * Path to your uploaded logo inside /public.
   * Drop a file at public/images/logo.png (or update this path) and it will
   * render automatically; until then a styled text wordmark is shown.
   */
  logoSrc: "/images/logo.png",
  logoWidth: 190,
  logoHeight: 44,
}

export const navItems = [
  "Home",
  "Property",
  "Construction",
  "UAE",
  "World",
  "Business",
  "Archives",
] as const

export const navFooterItems = [
  "Residential", "Commercial", "Construction", "Abu Dhabi", "Dubai", "Ras Al Khaimah", "Sharjah",
  "GCC", "Middle East", "Asia", "Europe", "Americas", "Africa", "Business", "Spotlight",
  "Sustainability", "Realty Bytes", "Lead", "E-zine", "Earlier Reads", "About us", "Advertise", "Contact",
] as const

// Display labels for homepage blocks keyed by HomeSub placement.
// Update only these values when you want to rename span headers.
export const homeSubSpanLabels = {
  lead: "Lead",
  breaking: "Breaking",
  latest: "Highlights",
  exclusive: "Trending Emirates",
  realtyBytes: "Realty Bytes",
  trending: "Exclusive",
  highlights: "Latest News",
  megaprojects: "Megaprojects",
} as const

export type SocialPlatform = "instagram" | "facebook" | "linkedin"

export type SocialLink = {
  label: string
  href: string
  platform: SocialPlatform
}

/**
 * Link these to your own profiles.
 */
export const socialLinks: SocialLink[] = [
  { label: "Instagram", href: "https://www.instagram.com/gulfproperty_me/?hl=en", platform: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/gulfproperty.media", platform: "facebook" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/gulf-property-middle-east-1b0b51288/", platform: "linkedin" },
]
