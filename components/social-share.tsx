"use client"

import { Check, Paperclip } from "lucide-react"
import type { SVGProps } from "react"
import { useMemo, useState } from "react"

const SITE_URL = "https://www.thegulfproperty.com"

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
  )
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2.02A9.96 9.96 0 0 0 5.1 17.3L3.4 20.86l3.74-1.14a9.96 9.96 0 1 0 4.9-17.7Zm.06 17.91a8.24 8.24 0 0 1-4.19-1.13l-.3-.18-2.17.66.73-2.1-.2-.34A8.24 8.24 0 1 1 12.1 19.93Zm4.62-6.2c-.25-.12-1.47-.72-1.69-.81-.22-.08-.38-.12-.54.12-.16.24-.62.8-.76.97-.15.16-.29.18-.54.06-.25-.12-1.04-.38-1.99-1.22-.73-.65-1.21-1.46-1.35-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.28.37-.42.12-.14.16-.25.25-.42.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.4-.54-.41h-.48c-.16 0-.42.06-.64.3-.22.24-.86.83-.86 2.03 0 1.2.88 2.35.99 2.52.12.16 1.7 2.6 4.11 3.65.57.25 1.02.4 1.37.52.57.18 1.09.16 1.5.1.46-.07 1.48-.61 1.69-1.2.2-.59.2-1.1.14-1.2-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

type ShareItem = {
  label: string
  href: string
  icon: React.ReactNode
}

export function SocialShare({
  title,
  url,
  className = "",
}: {
  title: string
  url?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const shareUrl = useMemo(() => url ?? `${SITE_URL}${typeof window !== "undefined" ? window.location.pathname : ""}`, [url])
  const encodedUrl = encodeURIComponent(shareUrl)
  const encodedTitle = encodeURIComponent(title)

  const shareItems: ShareItem[] = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="h-4 w-4" />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon className="h-4 w-4" />,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon className="h-4 w-4" />,
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {shareItems.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${label}`}
          title={`Share on ${label}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#0f172a] text-gray-200 transition-colors hover:border-realty hover:text-white"
        >
          {icon}
        </a>
      ))}

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Copy link"
        title="Copy link"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-[#0f172a] text-gray-200 transition-colors hover:border-realty hover:text-white"
      >
        {copied ? <Check className="h-4 w-4" /> : <Paperclip className="h-4 w-4" />}
      </button>
    </div>
  )
}
