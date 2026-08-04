"use client"

import { useEffect, useRef, useState } from "react"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

const START_RATE = 6.2
const MIN_RATE = 5.4
const MAX_RATE = 7.6

export function MortgageTicker({ className = "" }: { className?: string }) {
  const [rate, setRate] = useState(START_RATE)
  const [dir, setDir] = useState<"up" | "down" | "flat">("flat")
  const prev = useRef(START_RATE)

  useEffect(() => {
    const id = setInterval(() => {
      setRate((r) => {
        // Random walk between MIN and MAX, in 0.01–0.05 steps.
        const delta = (Math.random() - 0.5) * 0.1
        let next = Math.round((r + delta) * 100) / 100
        next = Math.min(MAX_RATE, Math.max(MIN_RATE, next))
        setDir(next > prev.current ? "up" : next < prev.current ? "down" : "flat")
        prev.current = next
        return next
      })
    }, 3000)
    return () => clearInterval(id)
  }, [])

  const Icon = dir === "up" ? TrendingUp : dir === "down" ? TrendingDown : Minus
  const dirColor = dir === "up" ? "text-realty" : dir === "down" ? "text-emerald-500" : "text-muted-foreground"

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-md border border-border bg-muted/60 px-3 py-1.5 ${className}`}
      aria-live="polite"
      title="Simulated live 30-year fixed mortgage rate"
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Mortgage Rate</span>
      <span className="flex items-center gap-1 font-mono text-sm font-bold tabular-nums text-foreground">
        <Icon className={`h-3.5 w-3.5 ${dirColor}`} aria-hidden="true" />
        {rate.toFixed(2)}%
      </span>
      <span className="sr-only">{`Rate is trending ${dir}`}</span>
    </div>
  )
}
