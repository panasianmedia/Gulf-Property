import Link from "next/link"

export default function ArchivesLandingPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-10 border-b border-border pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-realty">Archives</p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">Editorial Archive</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/archives/e-zine"
          className="group rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-realty">Monthly issue</p>
          <h2 className="mt-3 text-3xl font-black">E-Zine</h2>
          <p className="mt-3 text-muted-foreground">Browse the latest Gulf Property magazine issues and flip through the pages.</p>
        </Link>

        <Link
          href="/archives/earlier-reads"
          className="group rounded-3xl border border-border bg-card p-6 transition-shadow hover:shadow-xl"
        >
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-realty">Archive</p>
          <h2 className="mt-3 text-3xl font-black">Earlier Reads</h2>
          <p className="mt-3 text-muted-foreground">Browse older stories, reports and editorial features from previous coverage.</p>
        </Link>
      </div>
    </main>
  )
}
