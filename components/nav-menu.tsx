"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, X, Bell, ChevronDown } from "lucide-react"
import { navItems } from "@/lib/news-data"
import { siteConfig } from "@/lib/site-config"

import Logo from "../public/images/Gulf Property.png"
import SubscribeAd from "../public/images/magazine.png"

// Dropdown Items Mapping
const navDropdowns: Record<string, string[]> = {
  Property: ["Residential", "Commercial", "Hospitality", "Retail", "Logistics", "Tourism"],
  UAE: ["Abu Dhabi", "Dubai", "Ras Al Khaimah", "Sharjah"],
  World: ["GCC", "Middle East", "Asia", "Europe", "Americas", "Africa"],
  Archives: ["E-Zine"],
  // Legacy / Alternate spelling fallback
  Archive: ["E-Zine"],
}

// Route Helper Functions
const getCategoryPath = (item: string) => {
  if (item === "Home") return "/"
  return `/${item.toLowerCase().replace(/\s+/g, "-")}`
}

const getSubcategoryPath = (parentItem: string, subItem: string) => {
  const parentSlug = parentItem.toLowerCase().replace(/\s+/g, "-")
  const subSlug = subItem.toLowerCase().replace(/\s+/g, "-")
  return `/${parentSlug}/${subSlug}`
}

export function NavMenu() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("Home")
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null)

  // Subscription Modal State
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

  const handleOpenModal = () => {
    setIsOpen(true)
    setError("")
    setSubmitted(false)
  }

  // Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Modal Focus & Keyboard Listener
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

  // Form Submit Handler
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
      <nav
        aria-label="Primary"
        className="sticky top-0 z-50 border-b border-gray-800 bg-black text-white shadow-sm"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-14 items-center">
            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="mr-1 py-3 pr-3 cursor-pointer md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle navigation menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Sticky Logo (Visible only on scroll) */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden flex items-center ${
                isScrolled
                  ? "max-w-[200px] opacity-100 mr-4 py-2 pr-6"
                  : "max-w-0 opacity-0 mr-0 py-2 pointer-events-none"
              }`}
            >
              <Link href="/" className="flex shrink-0 items-center">
                <Image
                  src={Logo}
                  alt={`${siteConfig.name} logo`}
                  width={160}
                  height={32}
                  className="h-7 w-auto object-contain"
                  priority
                />
              </Link>
            </div>

           {/* Desktop Navigation */}
<ul className="hidden md:flex flex-1 items-center gap-1 overflow-visible py-0">
  {navItems.map((item) => {
    const isActive = item === active
    const subItems = navDropdowns[item]
    const hasDropdown = Boolean(subItems && subItems.length > 0)

    return (
      <li key={item} className="group relative shrink-0">
        {hasDropdown ? (
          // Hover target container
          <div className="inline-flex items-center gap-1 cursor-pointer whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold uppercase tracking-wide transition-colors border-transparent text-gray-300 group-hover:border-realty group-hover:text-white">
            <span>{item}</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200 group-hover:rotate-180 group-hover:text-white" />
          </div>
        ) : (
          <Link
            href={getCategoryPath(item)}
            onClick={() => setActive(item)}
            className={`inline-flex items-center gap-1 whitespace-nowrap border-b-2 px-3 py-4 text-sm font-semibold uppercase tracking-wide transition-colors ${
              isActive
                ? "border-realty text-white"
                : "border-transparent text-gray-300 hover:border-realty hover:text-white"
            }`}
          >
            {item}
          </Link>
        )}

        {/* Hover Dropdown Menu */}
        {hasDropdown && (
          <div className="invisible absolute left-0 top-full z-50 w-52 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
            <ul className="mt-0 border-t-2 bg-black shadow-2xl border-x border-b border-gray-800">
              {subItems.map((subItem) => (
                <li key={subItem}>
                  <Link
                    href={getSubcategoryPath(item, subItem)}
                    onClick={() => setActive(item)}
                    className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-300 transition-colors hover:bg-realty hover:text-white"
                  >
                    {subItem}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </li>
    )
  })}
</ul>

            {/* Right Action Section */}
            <div className="ml-auto flex items-center gap-3">
              <button
                type="button"
                className="py-3 pl-3 cursor-pointer lg:hidden text-white hover:text-realty transition-colors"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* INTEGRATED SUBSCRIBER PILL (Visible only on scroll) */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden hidden sm:flex items-center ${
                  isScrolled
                    ? "max-w-[300px] opacity-100 ml-2"
                    : "max-w-0 opacity-0 ml-0 pointer-events-none"
                }`}
              >
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="group relative flex h-9 items-center justify-center bg-realty pl-5 pr-6 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer hover:bg-red-700 rounded-l-full"
                    style={{
                      clipPath:
                        "polygon(0% 0%, calc(100% - 12px) 0%, 100% 50%, calc(100% - 12px) 100%, 0% 100%)",
                    }}
                  >
                    Subscribe
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenModal}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-realty text-white transition-colors cursor-pointer hover:bg-red-700 shrink-0"
                    aria-label="Subscribe Notifications"
                  >
                    <Bell className="h-4 w-4 fill-white stroke-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Accordion Dropdown Menu */}
        {open && (
          <div id="mobile-nav" className="border-t border-gray-800 bg-black md:hidden">
            <ul className="mx-auto max-w-7xl px-4 py-2">
              {navItems.map((item) => {
                const subItems = navDropdowns[item]
                const hasDropdown = Boolean(subItems && subItems.length > 0)
                const isExpanded = expandedMobileCategory === item

                return (
                  <li key={item} className="border-b border-gray-800 last:border-b-0">
                    <div className="flex items-center justify-between">
                      {hasDropdown ? (
                        /* Mobile Label for categories with sub-items */
                        <span
                          onClick={() =>
                            setExpandedMobileCategory(isExpanded ? null : item)
                          }
                          className="block py-3 text-sm font-semibold uppercase tracking-wide text-gray-200 cursor-pointer"
                        >
                          {item}
                        </span>
                      ) : (
                        /* Mobile Link for single pages (Home, etc.) */
                        <Link
                          href={getCategoryPath(item)}
                          onClick={() => {
                            setActive(item)
                            setOpen(false)
                          }}
                          className="block py-3 text-sm font-semibold uppercase tracking-wide text-gray-200 hover:text-realty"
                        >
                          {item}
                        </Link>
                      )}

                      {hasDropdown && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedMobileCategory(isExpanded ? null : item)
                          }
                          className="p-2 text-gray-400 hover:text-white cursor-pointer"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              isExpanded ? "rotate-180 text-realty" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {hasDropdown && isExpanded && (
                      <ul className="mb-2 ml-3 border-l-2 border-realty pl-3 space-y-1">
                        {subItems.map((sub) => (
                          <li key={sub}>
                            <Link
                              href={getSubcategoryPath(item, sub)}
                              onClick={() => {
                                setActive(item)
                                setOpen(false)
                              }}
                              className="block py-1.5 text-xs font-medium uppercase tracking-wider text-gray-400 hover:text-realty"
                            >
                              {sub}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </nav>

      {/* SUBSCRIBE MODAL DIALOG */}
      {isOpen && (
        <div
          className="
            fixed inset-0 z-[9999] 
            flex items-center justify-center 
            bg-black/70 px-4 backdrop-blur-md
          "
          onClick={handleClose}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="
              relative w-full max-w-3xl 
              overflow-hidden rounded-3xl 
              bg-background shadow-2xl
            "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid lg:grid-cols-[1.2fr_1fr]">
              {/* Advertisement Image */}
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

              {/* Form */}
              <div className="p-6 sm:p-10 text-foreground">
                <button
                  type="button"
                  onClick={handleClose}
                  className="
                    absolute right-5 top-5 
                    rounded-full p-2 cursor-pointer 
                    hover:bg-muted transition-colors
                  "
                >
                  <X className="h-5 w-5" />
                </button>
                <h2 className="text-2xl font-bold">Subscribe for updates</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Get latest property news, market trends and exclusive stories.
                </p>
                {submitted ? (
                  <div className="mt-8 rounded-xl bg-green-50 p-4 text-green-700">
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
                      className="
                        w-full rounded-xl border px-4 py-3 
                        outline-none focus:ring-2 focus:ring-realty/30
                      "
                    />
                    {error && (
                      <p className="text-sm text-red-600">{error}</p>
                    )}
                    <button
                      type="submit"
                      className="
                        w-full rounded-xl bg-realty py-3 
                        font-semibold text-white cursor-pointer 
                        hover:bg-red-700 transition-colors
                      "
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