import type { Category } from "@/lib/news-data"

interface CategoryBadgeProps {
  category: Category
  variant?: "solid" | "text" | "overlay"
  className?: string
}

export function CategoryBadge({ category, variant = "text", className = "" }: CategoryBadgeProps) {
  if (variant === "solid") {
    return (
      <span
        className={`inline-block bg-realty px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white ${className}`}
      >
        {category}
      </span>
    )
  }

  if (variant === "overlay") {
    return (
      <span
        className={`inline-block bg-realty px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm ${className}`}
      >
        {category}
      </span>
    )
  }

  return (
    <span
      className={`inline-block text-[11px] font-bold uppercase tracking-wider text-realty ${className}`}
    >
      {category}
    </span>
  )
}
