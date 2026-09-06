"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import type { MagazineIssue } from "@/lib/articlesdata"

const monthNames = [
  "All months",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function getYear(date: string) {
  const value = new Date(date)
  return Number.isNaN(value.getTime()) ? "" : String(value.getFullYear())
}

function getMonth(date: string) {
  const value = new Date(date)
  return Number.isNaN(value.getTime()) ? "" : value.toLocaleString("en-US", { month: "long" })
}

function formatIssueDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return "Issue"

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function EZineArchive({ issues }: { issues: MagazineIssue[] }) {
  const featuredIssue = issues[0] ?? null
  const [selectedYear, setSelectedYear] = useState("All years")
  const [selectedMonth, setSelectedMonth] = useState("All months")

  const years = useMemo(() => {
    const unique = Array.from(new Set(issues.map((issue) => getYear(issue.date)).filter(Boolean)))
    return ["All years", ...unique.sort((a, b) => Number(b) - Number(a))]
  }, [issues])

  const archiveIssues = useMemo(() => {
    return issues.slice(1).filter((issue) => {
      const matchesYear = selectedYear === "All years" || getYear(issue.date) === selectedYear
      const matchesMonth = selectedMonth === "All months" || getMonth(issue.date) === selectedMonth
      return matchesYear && matchesMonth
    })
  }, [issues, selectedMonth, selectedYear])

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-8 md:px-6 lg:px-8">
      {featuredIssue ? (
        <>
          <section className="overflow-hidden rounded-[30px] border border-[#d5b36f]/40 bg-[#071521] text-white shadow-[0_30px_90px_rgba(2,6,23,0.65)]">
            <div className="grid gap-8 px-5 py-6 md:px-8 md:py-8 xl:grid-cols-[1.2fr_0.8fr] xl:px-10 xl:py-10">
              <div className="flex flex-col justify-between">
                <div>
                  <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f7d48f]">
                    <span className="rounded-full border border-[#d5b36f]/40 bg-[#d5b36f]/10 px-3 py-1.5">
                      Current Monthly Issue
                    </span>
                    <span className="text-[#dfe6ef]/80">
                      {new Date(featuredIssue.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                    <span className="text-[#dfe6ef]/80">
                      Vol. {new Date(featuredIssue.date).getFullYear() - 2011 || 14} • Issue {Math.max(1, new Date(featuredIssue.date).getMonth() + 1) || 8}
                    </span>
                  </div>

                  <h1 className="max-w-[700px] text-4xl font-black leading-[0.95] tracking-[-0.06em] text-[#f5f3ee] md:text-6xl xl:text-[5rem]">
                    {featuredIssue.title}
                  </h1>

                  <div className="mt-6 max-w-[640px] rounded-[18px] border border-[#d5b36f]/25 bg-[#0d1c2d] px-4 py-4 text-sm leading-relaxed text-[#dfe6ef] md:text-lg">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.28em] text-[#f7d48f]">
                      Editorial Focus
                    </span>
                    <p>{featuredIssue.description}</p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <Link
                      href={`/archives/e-zine/${featuredIssue.slug}`}
                      className="inline-flex items-center rounded-full border border-[#d5b36f] bg-[#d5b36f] px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-[#0a1320] transition hover:brightness-110"
                    >
                      Flip Open Magazine
                    </Link>
                    {featuredIssue.pdf ? (
                      <a
                        href={featuredIssue.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:border-[#d5b36f] hover:text-[#f7d48f]"
                      >
                        Download PDF
                      </a>
                    ) : null}
                  </div>                
                </div>
              </div>

              <div className="flex items-center justify-center xl:justify-end">
                <div className="relative w-full max-w-[480px]">
                  <div className="absolute inset-0 rounded-[28px] bg-[#d5b36f]/20 blur-3xl" aria-hidden="true" />
                  <Link
                    href={`/archives/e-zine/${featuredIssue.slug}`}
                    className="relative block overflow-hidden rounded-[26px] border border-[#d5b36f]/40 bg-[#0d1724] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
                  >
                    <div className="rounded-[20px] border border-[#d5b36f]/30 bg-[#f0e5cf] p-3 shadow-inner">
                      <div className="overflow-hidden rounded-[16px] border border-[#d5b36f]/20 bg-[#e9e0cf]">
                        <img
                          src={featuredIssue.cover}
                          alt={featuredIssue.title}
                          className="aspect-[3/4] w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="absolute inset-x-6 bottom-6 rounded-[14px] border border-[#d5b36f]/25 bg-[#0d1724]/70 px-4 py-3 backdrop-blur-sm">
                      <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#f7d48f]">
                        <span>{new Date(featuredIssue.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                        <span>Interactive</span>
                      </div>
                      <div className="mt-3 text-xl font-black leading-tight text-[#f5f3ee]">
                        {featuredIssue.title}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfe6ef]/80">
                        <span>Click to Flip</span>
                        <span className="rounded-full border border-[#d5b36f]/30 px-2 py-1 text-[#f7d48f]">Read</span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-6 flex flex-col gap-4 border-b border-[#d5b36f]/20 pb-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#8a6500] dark:text-[#f7d48f]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d5b36f]" />
                Editorial Issue Archives
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#dfe6ef]">
                <label className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2">
                  <span className="text-[#8a6500] dark:text-[#f7d48f]">Year</span>
                  <select
                    value={selectedYear}
                    onChange={(event) => setSelectedYear(event.target.value)}
                    className="bg-transparent text-foreground outline-none"
                  >
                    {years.map((year) => (
                      <option key={year} value={year} className="text-slate-900">
                        {year}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2">
                  <span className="text-[#8a6500] dark:text-[#f7d48f]">Month</span>
                  <select
                    value={selectedMonth}
                    onChange={(event) => setSelectedMonth(event.target.value)}
                    className="bg-transparent text-foreground outline-none"
                  >
                    {monthNames.map((month) => (
                      <option key={month} value={month} className="text-slate-900">
                        {month}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {archiveIssues.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-[#d5b36f]/35 bg-[#081521] p-10 text-center text-sm uppercase tracking-[0.2em] text-[#dfe6ef]/70">
                No issues match the selected filters.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {archiveIssues.map((issue) => (
                  <article
                    key={issue.id}
                    className="group overflow-hidden rounded-[26px] border border-[#d5b36f]/20 bg-[#071521] shadow-[0_20px_50px_rgba(2,6,23,0.45)] transition hover:-translate-y-1 hover:border-[#d5b36f]/40"
                  >
                    <Link href={`/archives/e-zine/${issue.slug}`} className="block h-full">
                      <div className="relative">
                        <div className="absolute left-4 top-4 z-10 rounded-full border border-[#d5b36f]/30 bg-[#0c1b2b]/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f7d48f]">
                          {new Date(issue.date).toLocaleDateString("en-US", { month: "short" })} {new Date(issue.date).getFullYear()}
                        </div>
                        <img
                          src={issue.cover}
                          alt={issue.title}
                          className="aspect-[3/4] w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        />
                        <div className="absolute bottom-4 right-4 rounded-full border border-[#d5b36f]/40 bg-[#0d1724]/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f7d48f]">
                          {Math.max(1, issue.pages?.length ?? 8)} Pages
                        </div>
                      </div>

                      <div className="space-y-4 p-5">
                        <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#dfe6ef]/65">
                          <span>{new Date(issue.date).toLocaleDateString("en-US", { month: "long" })} issue</span>
                          <span>{getYear(issue.date)}</span>
                        </div>

                        <h3 className="text-2xl font-black leading-tight text-[#f5f3ee] group-hover:text-[#f7d48f]">
                          {issue.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-[#dfe6ef]/75">{issue.description}</p>

                        <div className="flex items-center justify-between gap-4 pt-2">
                          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#dfe6ef]/70">
                            <span className="h-2 w-2 rounded-full bg-[#d5b36f]" />
                            {formatIssueDate(issue.date)}
                          </span>

                          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/3 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#f5f3ee] transition group-hover:border-[#d5b36f]/40 group-hover:text-[#f7d48f]">
                            Read
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        <div className="rounded-[30px] border border-dashed border-[#d5b36f]/40 bg-[#071521] p-10 text-center text-white">
          <h2 className="text-2xl font-bold">No magazine issues yet</h2>
          <p className="mt-3 text-[#dfe6ef]/75">
            Upload magazine issues from Strapi and they will appear here automatically.
          </p>
        </div>
      )}
    </main>
  )
}
