import Link from "next/link"
import React from "react"

export function AdvertisePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-foreground">
      {/* Header Badge & Title */}
      <div className="mb-6 border-b-2 border-foreground pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-3 bg-realty" aria-hidden />
          <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Media & Partnerships
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          Advertise with Gulf Property
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Reach key real estate decision-makers, high-net-worth investors, and corporate leaders across the Middle East.
        </p>
      </div>

      {/* Advertising Options */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex flex-col justify-between border border-border bg-card p-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-realty">Digital Display</span>
            <h3 className="mt-2 text-xl font-bold text-foreground">Banner & Header Ads</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Prime placement on high-traffic sections including Home, Breaking News, Spotlight, and Category pages.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 flex w-full items-center justify-center bg-foreground py-2 text-xs font-bold uppercase tracking-wider text-background transition-colors hover:bg-realty hover:text-white"
          >
            Inquire Display
          </Link>
        </div>

        <div className="flex flex-col justify-between border border-border bg-card p-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-realty">Spotlight Content</span>
            <h3 className="mt-2 text-xl font-bold text-foreground">Native Articles & Briefs</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Publish dedicated feature articles, interviews, and brand announcements directly into our news grid.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 flex w-full items-center justify-center bg-foreground py-2 text-xs font-bold uppercase tracking-wider text-background transition-colors hover:bg-realty hover:text-white"
          >
            Inquire Content
          </Link>
        </div>

        <div className="flex flex-col justify-between border border-border bg-card p-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-realty">Newsletter & Podcasts</span>
            <h3 className="mt-2 text-xl font-bold text-foreground">Direct Access</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Sponsor our daily morning dispatch or get featured on our real estate audio podcast series.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-6 flex w-full items-center justify-center bg-foreground py-2 text-xs font-bold uppercase tracking-wider text-background transition-colors hover:bg-realty hover:text-white"
          >
            Inquire Sponsorship
          </Link>
        </div>
      </div>

      {/* Media Kit Request Box */}
      <div className="mt-12 border-2 border-foreground bg-foreground p-8 text-background dark:bg-card dark:text-foreground">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold uppercase tracking-wide">Request Our Media Kit 2026</h2>
            <p className="mt-1 text-sm opacity-80">
              Download detailed audience demographics, specs, rate cards, and customised partnership packages.
            </p>
          </div>
          <a
            href="mailto:advertise@gulfproperty.com"
            className="shrink-0 bg-realty px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-opacity hover:opacity-90"
          >
            Download Kit (.PDF)
          </a>
        </div>
      </div>
    </main>
  )
}