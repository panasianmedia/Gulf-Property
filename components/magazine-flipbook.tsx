"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"

export interface MagazineIssueData {
  id: string
  title: string
  slug: string
  description: string
  date: string
  cover: string
  pages?: string[]
  pdf?: string | null
}

async function renderPdfPages(
  pdfUrl: string,
  onPageRendered: (page: string) => void,
  skipFirstPage = true,
): Promise<void> {
  const pdfjsLib = await import("pdfjs-dist")
  const pdfjs = pdfjsLib as typeof import("pdfjs-dist")
  const workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.mjs", import.meta.url).toString()
  pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

  const loadingTask = pdfjs.getDocument({ url: pdfUrl })
  const pdf = await loadingTask.promise

  const firstPageIndex = skipFirstPage ? 2 : 1
  for (let pageIndex = firstPageIndex; pageIndex <= pdf.numPages; pageIndex += 1) {
    const page = await pdf.getPage(pageIndex)
    const viewport = page.getViewport({ scale: 1.25 })
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")

    if (!context) {
      continue
    }

    canvas.width = viewport.width
    canvas.height = viewport.height

    await page.render({ canvas, canvasContext: context, viewport }).promise
    onPageRendered(canvas.toDataURL("image/png"))
  }
}

export function MagazineFlipbook({ issue }: { issue: MagazineIssueData }) {
  const [renderedPages, setRenderedPages] = useState<string[]>([issue.cover])
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [spreadIndex, setSpreadIndex] = useState(0)
  const [turnDirection, setTurnDirection] = useState<"left" | "right">("right")
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<number | null>(null)

  useEffect(() => {
    let active = true

    async function hydratePages() {
      if (!issue.pdf) {
        setRenderedPages([issue.cover, ...(issue.pages ?? [])])
        return
      }

      setRenderedPages([issue.cover])
      setIsLoadingPdf(true)
      try {
        await renderPdfPages(issue.pdf, (page) => {
          if (active) setRenderedPages((currentPages) => [...currentPages, page])
        })
      } catch (error) {
        console.error("Error rendering PDF flipbook pages:", error)
        if (active) {
          setRenderedPages([issue.cover, ...(issue.pages ?? [])])
        }
      } finally {
        if (active) {
          setIsLoadingPdf(false)
        }
      }
    }

    hydratePages()
    return () => {
      active = false
    }
  }, [issue.cover, issue.pdf, issue.pages])

  const pages = useMemo(() => {
    if (renderedPages.length > 0) return renderedPages
    return [issue.cover]
  }, [issue.cover, renderedPages])

  const totalSpreads = Math.max(1, Math.ceil(pages.length / 2))
  const canGoPrev = isOpen && spreadIndex > 0
  const canGoNext = !isOpen || spreadIndex < totalSpreads - 1

  const goPrev = () => {
    if (!canGoPrev) return
    setTurnDirection("left")
    setSpreadIndex((prev) => Math.max(0, prev - 1))
  }

  const goNext = () => {
    if (!canGoNext) return
    setTurnDirection("right")
    if (!isOpen) {
      setIsOpen(true)
      setSpreadIndex(0)
      return
    }
    setSpreadIndex((prev) => Math.min(totalSpreads - 1, prev + 1))
  }

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goPrev()
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        goNext()
      }

    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [canGoPrev, canGoNext, isOpen])

  const spread = useMemo(() => {
    const leftIndex = spreadIndex * 2
    const rightIndex = leftIndex + 1
    const leftPage = pages[leftIndex] ?? pages[pages.length - 1] ?? issue.cover
    const rightPage = pages[rightIndex] ?? null
    return { leftPage, rightPage, leftIndex, rightIndex }
  }, [issue.cover, pages, spreadIndex])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isOpen) return
    dragStartRef.current = event.clientX
    setIsDragging(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isOpen) return
    if (dragStartRef.current === null) return
    const delta = event.clientX - dragStartRef.current
    setDragOffset(delta)
  }

  const handlePointerUp = () => {
    if (!isOpen) return
    if (dragStartRef.current === null) return

    if (dragOffset > 90 && canGoPrev) {
      goPrev()
    } else if (dragOffset < -90 && canGoNext) {
      goNext()
    }

    setDragOffset(0)
    setIsDragging(false)
    dragStartRef.current = null
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-realty">E-Zine</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/archives/e-zine"
            className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-realty hover:text-realty"
          >
            Back to issues
          </Link>
          {issue.pdf && (
            <a
              href={issue.pdf}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full bg-realty px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-700"
            >
              Open PDF
            </a>
          )}
        </div>
      </div>

      <div className="rounded-[28px] border border-border bg-[var(--flipbook-stage)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.12)] md:p-6">
        <div className="mb-4 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span>{new Date(issue.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span>
            {!isOpen ? "Cover" : `${spread.leftIndex + 1} - ${spread.rightPage ? spread.rightIndex + 1 : spread.leftIndex + 1} / ${pages.length}`}
          </span>
        </div>

        {isLoadingPdf && (
          <div className="mb-4 rounded-2xl border border-dashed border-border bg-white/60 p-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Loading PDF pages...
          </div>
        )}

        <div
          className={`book-shell ${!isOpen ? "book-shell-closed" : ""} ${isDragging ? "dragging" : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          style={{ transform: `translateX(${dragOffset * 0.12}px)` }}
        >
          {!isOpen ? (
            <div className="book-page book-page-cover turn-right">
              <img key={issue.cover} src={issue.cover} alt={`${issue.title} cover`} className="h-full w-full object-contain" />
            </div>
          ) : (
            <>
              <div className="book-spine" aria-hidden="true" />
              <div key={`left-${spreadIndex}`} className={`book-page book-page-left turn-${turnDirection}`}>
                <img key={spread.leftPage} src={spread.leftPage} alt={`${issue.title} left page ${spread.leftIndex + 1}`} className="h-full w-full object-contain" />
              </div>
              {spread.rightPage ? (
                <div key={`right-${spreadIndex}`} className={`book-page book-page-right turn-${turnDirection}`}>
                  <img key={spread.rightPage} src={spread.rightPage} alt={`${issue.title} right page ${spread.rightIndex + 1}`} className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="book-page book-page-blank">
                  <div className="flex h-full items-center justify-center text-center text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    End of issue
                  </div>
                </div>
              )}
            </>
          )}

          <div className="book-controls" aria-label="Flipbook controls">
            <button type="button" onClick={goPrev} disabled={!canGoPrev} aria-label="Previous spread" title="Previous spread">
              <ChevronLeft size={22} aria-hidden="true" />
            </button>
            <span>{!isOpen ? "Cover" : `${spreadIndex + 1} / ${totalSpreads}`}</span>
            <button type="button" onClick={goNext} disabled={!canGoNext} aria-label="Next spread" title="Next spread">
              <ChevronRight size={22} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background p-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canGoPrev}
          className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:border-realty hover:text-realty"
        >
          Previous
        </button>

        <p className="text-center text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Drag or flip pages
        </p>

        <button
          type="button"
          onClick={goNext}
          disabled={!canGoNext}
          className="inline-flex items-center rounded-full bg-realty px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors disabled:cursor-not-allowed disabled:opacity-40 hover:bg-red-700"
        >
          Next
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-background p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Pages
          </p>
          <span className="text-[11px] text-muted-foreground">
            {pages.length} total
          </span>
        </div>

        <div className="page-strip">
          {pages.map((page, index) => {
            const isSelected = Math.floor(index / 2) === spreadIndex
            return (
              <button
                key={`${issue.id}-${index}`}
                type="button"
                onClick={() => {
                  setIsOpen(true)
                  setSpreadIndex(Math.floor(index / 2))
                }}
                className={`page-thumb ${isSelected ? "active" : ""}`}
                aria-label={`Jump to page ${index + 1}`}
              >
                <img src={page} alt={`Page ${index + 1}`} />
                <span>{index + 1}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
