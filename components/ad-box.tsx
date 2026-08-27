import type { AdSlot } from "@/lib/articlesdata"

// Shared ad placeholder components — fixed dimensions keep ad slots
// visually consistent everywhere, regardless of surrounding content.
interface AdSquareBoxProps {
  ad?: AdSlot
  label?: string
  size?: string
  className?: string
}

export function AdSquareBox({ ad, label = "Featured Ad", size = "250 x 250", className = "" }: AdSquareBoxProps) {
  return (
    <div className={`border border-border bg-muted/20 p-4 text-center ${className}`}>
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Advertisement
      </span>
      <div className="mx-auto mt-2 flex h-[250px] w-[250px] max-w-full items-center justify-center border border-dashed border-border bg-muted/40">
        {ad?.image ? (
          <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer sponsored" className="block h-full w-full">
            <img src={ad.image} alt="Advertisement" className="h-full w-full object-cover" />
          </a>
        ) : (
          <div className="flex flex-col items-center gap-1 p-4 text-center">
            <span className="text-xs font-bold text-foreground">{label}</span>
            <span className="text-[10px] text-muted-foreground">{size} Square Unit</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface AdLeaderboardBoxProps {
  ad?: AdSlot
  label?: string
  className?: string
}

export function AdLeaderboardBox({ ad, label = "728 x 90 Leaderboard Ad Box", className = "" }: AdLeaderboardBoxProps) {
  return (
    <div className={`flex w-full items-center justify-center border border-border bg-muted/30 py-6 text-center ${className}`}>
      <div className="flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Advertisement
        </span>
        <div className="mt-1 flex h-[90px] w-full max-w-[728px] items-center justify-center bg-muted/60 text-xs font-semibold text-muted-foreground">
          {ad?.image ? (
            <a href={ad.link || "#"} target="_blank" rel="noopener noreferrer sponsored" className="block h-full w-full">
              <img src={ad.image} alt="Advertisement" className="h-full w-full object-cover" />
            </a>
          ) : (
            label
          )}
        </div>
      </div>
    </div>
  )
}
