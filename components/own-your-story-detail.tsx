import Link from "next/link"

import type { OwnYourStoryRecord } from "@/lib/own-your-story-data"

function renderContent(content: unknown) {
  if (typeof content === "string") {
    return content.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)
  }
  if (!Array.isArray(content)) return <p>No article content is available yet.</p>

  return content.map((block: any, index) => {
    const text = block.children?.map((child: any) => child.text || "").join("") || ""
    if (!text.trim()) return null
    if (block.type === "heading") {
      const Heading = `h${Math.min(Math.max(block.level || 2, 2), 4)}` as "h2" | "h3" | "h4"
      return <Heading key={index} className="mt-8 text-2xl font-black text-foreground">{text}</Heading>
    }
    return <p key={index}>{text}</p>
  })
}

export function OwnYourStoryDetail({ story }: { story: OwnYourStoryRecord }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <Link href="/archives/own-your-story" className="text-sm font-bold uppercase tracking-[0.15em] text-realty hover:underline">
        Back to Own Your Story
      </Link>
      <article className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-realty">Behind the Deals</p>
        <h1 className="mt-3 text-4xl font-black leading-tight text-foreground md:text-6xl">{story.title}</h1>
        {story.author ? <p className="mt-3 text-sm font-semibold text-muted-foreground">By {story.author}</p> : null}
        <div className="relative mt-8 h-[22rem] overflow-hidden rounded-[2rem] border border-border bg-muted shadow-[12px_12px_0_var(--color-realty)] md:h-[34rem]">
          <img src={story.image} alt={story.imageAlt || story.title} className="h-full w-full object-cover object-top" />
        </div>
        <p className="mt-10 border-l-4 border-realty pl-5 text-xl font-semibold leading-relaxed text-muted-foreground">{story.summary}</p>
        <div className="prose prose-lg mt-8 max-w-none space-y-5 leading-relaxed text-foreground">{renderContent(story.content)}</div>
      </article>
    </main>
  )
}
