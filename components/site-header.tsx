"use client"

import Image from "next/image"
import { Search, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { MortgageTicker } from "@/components/mortgage-ticker"
import { ThemeToggle } from "@/components/theme-toggle"
import { siteConfig } from "@/lib/site-config"

import Logo from "../public/images/Gulf Property.png"
import SubscribeAd from "../public/images/magazine.png"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const emailInputRef = useRef<HTMLInputElement>(null)

  const resetState = () => {
    setEmail("")
    setError("")
    setSubmitted(false)
  }

  const handleClose = () => {
    setIsOpen(false)
    resetState()
  }

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = "hidden"
    const previousActive = document.activeElement as HTMLElement | null
    emailInputRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = ""
      document.removeEventListener("keydown", handleKeyDown)
      previousActive?.focus()
    }
  }, [isOpen])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedEmail = email.trim()
    const isValidEmail = /\S+@\S+\.\S+/.test(trimmedEmail)
    if (!trimmedEmail) {
      setError("Please enter your email address.")
      return
    }
    if (!isValidEmail) {
      setError("Please enter a valid email address.")
      return
    }
    setError("")
    setSubmitted(true)
    setEmail("")
  }

  return (
    <>
      <header className="border-b border-border bg-background text-foreground transition-colors">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 md:py-5">
          <a href="/" className="flex shrink-0 items-center">
            <Image
              src={Logo}
              alt={`${siteConfig.name} logo`}
              width={180}
              height={44}
              priority
              className="h-14 w-auto object-contain dark:invert-[0.1]"
            />
          </a>

          <div className="hidden flex-1 justify-center px-6 lg:flex">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search stories, markets, developers..."
                className="w-full border border-input bg-muted py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:bg-background focus:ring-1 focus:ring-realty"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <MortgageTicker className="hidden sm:inline-flex" />
            <ThemeToggle />

            <button
              type="button"
              onClick={() => {
                setIsOpen(true)
                setError("")
                setSubmitted(false)
              }}
              className="bg-realty px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-red-700"
            >
              Subscribe
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md transition-opacity"
          onClick={handleClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-background text-foreground shadow-2xl transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-[1.2fr_1fr]">
              {/* Advertisement Image Side */}
              <div className="relative min-h-[250px] lg:min-h-[480px]">
                <Image
                  src={SubscribeAd}
                  alt="Subscribe advertisement"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute bottom-0 p-8 text-white">
                  <p className="text-xs uppercase tracking-[0.3em] text-white/80">
                    Exclusive Updates
                  </p>
                  <h3 className="mt-3 text-3xl font-bold">
                    Stay ahead of the Property Market
                  </h3>
                </div>
              </div>

              {/* Form Side */}
              <div className="p-6 sm:p-10">
                <button
                  onClick={handleClose}
                  className="absolute right-5 top-5 rounded-full p-2 text-foreground/80 hover:bg-muted transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                <h2 className="text-2xl font-bold text-foreground">
                  Subscribe for updates
                </h2>
                
                <p className="mt-2 text-sm text-muted-foreground">
                  Get latest property news, market trends and exclusive stories.
                </p>

                {submitted ? (
                  <div className="mt-8 rounded-xl bg-green-500/10 border border-green-500/20 p-4 text-green-600 dark:text-green-400 font-medium">
                    Thank you for subscribing!
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <input
                      ref={emailInputRef}
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError("")
                      }}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-input bg-muted px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none transition-colors focus:bg-background focus:ring-2 focus:ring-realty/30"
                    />

                    {error && (
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="w-full rounded-xl bg-realty py-3 font-semibold text-white transition-colors hover:bg-red-700"
                    >
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}