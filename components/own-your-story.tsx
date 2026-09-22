import Link from "next/link"
import type { OwnYourStoryPageData } from "@/lib/own-your-story-data"

export function OwnYourStory({ pageData }: { pageData: OwnYourStoryPageData }) {
  const { stories, page, pageCount } = pageData
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="relative isolate mb-10 overflow-hidden rounded-[2rem] border border-[#7f2528] bg-[linear-gradient(135deg,#0b1118_0%,#171d25_62%,#641b1e_100%)] px-6 py-8 text-white shadow-[0_24px_60px_rgba(15,23,42,0.2)] md:px-10 md:py-12">
        <div className="absolute -right-16 -top-20 h-64 w-64 rotate-12 border border-white/15" aria-hidden="true" />
        <div className="absolute -bottom-32 right-12 h-72 w-72 rounded-full border-[18px] border-realty/20" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 h-2/3 w-1/3 bg-realty/10 [clip-path:polygon(35%_0,100%_0,100%_100%,0%_100%)]" aria-hidden="true" />
        <div className="relative max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-red-300">Archives / Own Your Story</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">Own Your Story</h1>
          <h2 className="mt-4 max-w-3xl text-2xl font-black leading-tight text-white md:text-4xl">
          Behind the Deals: The Real Stories Shaping Gulf Real Estate.
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">
            Every transaction has an architect. <strong className="font-bold text-white">Own Your Story </strong> spotlights UAE&apos;s leading brokers, celebrating their ambition, grit, and market leadership.
          </p>
        </div>
      </header>

      <div className="space-y-10">
        {stories.map((story, index) => (
          <article
            key={story.id}
            className={`group grid gap-7 border-b border-border pb-10 md:grid-cols-[19rem_minmax(0,1fr)] md:items-center md:gap-10 ${
              index % 2 === 1 ? "md:grid-cols-[minmax(0,1fr)_19rem]" : ""
            }`}
          >
            <div
              className={`relative flex min-h-[15rem] items-center justify-center md:min-h-[19rem] ${
                index % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <div
                className={`absolute h-44 w-44 border-2 border-realty/30 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105 md:h-56 md:w-56 ${
                  index % 2 === 1 ? "-rotate-6" : "rotate-6"
                }`}
                aria-hidden="true"
              />
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-8 border-background bg-muted shadow-[12px_12px_0_var(--color-realty)] transition-transform duration-500 group-hover:-translate-y-2 md:h-56 md:w-56">
                <img
                  src={story.image}
                  alt={story.imageAlt}
                  className="h-full w-full object-cover object-top"
                />
              </div>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-background md:bottom-5">
                Story {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-4 top-2 text-5xl font-black leading-none text-realty/20 md:right-0 md:text-7xl" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className={`flex-1 ${index % 2 === 1 ? "md:order-1 md:text-right" : ""}`}>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-realty">Reader perspective</p>
              <h2 className="mt-2 text-2xl font-black text-foreground md:text-3xl">{story.title}</h2>
              <p className="mt-3 max-w-xl leading-relaxed text-foreground md:text-lg">{story.summary}</p>
              <Link
                href={`/archives/own-your-story/${story.slug}`}
                className="mt-5 inline-flex items-center rounded-full bg-realty px-5 py-2.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-red-700"
              >
                Read the full story
              </Link>
            </div>
          </article>
        ))}
      </div>

      {pageCount > 1 ? (
        <nav className="mt-12 flex items-center justify-center gap-2 border-t border-border pt-8" aria-label="Own Your Story pages">
          <Link
            href={`/archives/own-your-story?page=${Math.max(1, page - 1)}`}
            aria-disabled={page === 1}
            className={`rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${page === 1 ? "pointer-events-none text-muted-foreground/50" : "text-foreground hover:border-realty hover:text-realty"}`}
          >
            Previous
          </Link>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={`/archives/own-your-story?page=${pageNumber}`}
              aria-current={pageNumber === page ? "page" : undefined}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-colors ${pageNumber === page ? "border-realty bg-realty text-white" : "border-border text-foreground hover:border-realty hover:text-realty"}`}
            >
              {pageNumber}
            </Link>
          ))}
          <Link
            href={`/archives/own-your-story?page=${Math.min(pageCount, page + 1)}`}
            aria-disabled={page >= pageCount}
            className={`rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-colors ${page >= pageCount ? "pointer-events-none text-muted-foreground/50" : "text-foreground hover:border-realty hover:text-realty"}`}
          >
            Next
          </Link>
        </nav>
      ) : null}
    </main>
  )
}
