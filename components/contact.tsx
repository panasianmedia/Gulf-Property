"use client"

import React, { useState } from "react"

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    const formData = new FormData(e.currentTarget)
    
    // Replace with your actual Web3Forms access key from web3forms.com
    formData.append("access_key", "23d53f79-155b-4516-bc59-f88caa11aeea")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setErrorMessage(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-foreground">
      {/* Header Badge & Title */}
      <div className="mb-6 border-b-2 border-foreground pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-3 bg-realty" aria-hidden />
          <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
            Get In Touch
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">
          Contact Editorial & Support
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Have a news tip, press release, or inquiry? Reach out to our newsroom.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* Contact Form */}
        <div className="md:col-span-7">
          {submitted ? (
            <div className="border border-border bg-card p-6 text-center">
              <span className="h-3 w-3 bg-realty inline-block mb-2" />
              <h2 className="text-xl font-bold">Message Sent Successfully</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Thank you for contacting Gulf Property. Our editorial team will review your message shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 text-xs font-bold uppercase tracking-wider text-realty underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-realty focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="name@company.com"
                  className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-realty focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-foreground mb-1">
                  Department
                </label>
                <select
                  name="department"
                  className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-realty focus:outline-none"
                >
                  <option value="Newsroom / Editorial Press Release">Newsroom / Editorial Press Release</option>
                  <option value="Advertising & Sponsorship">Advertising & Sponsorship</option>
                  <option value="Subscriptions & Account Support">Subscriptions & Account Support</option>
                  <option value="General Feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-foreground mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="Share details or press release link..."
                  className="w-full border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-realty focus:outline-none"
                />
              </div>

              {errorMessage && (
                <p className="text-xs text-red-600 font-semibold">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-realty py-3 text-xs font-bold uppercase tracking-widest text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>

        {/* Bureau & Press Info */}
        <div className="space-y-6 md:col-span-5">
          <div className="border border-border bg-card p-6">
            <h2 className="border-b border-border pb-2 text-sm font-bold uppercase tracking-wider text-foreground">
              Newsroom Contacts
            </h2>
            <div className="mt-4 space-y-4 text-sm">
              <div>
                <p className="font-semibold text-foreground">Press Releases</p>
                <p className="text-muted-foreground">editor@panasian1.com</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Subscriptions & Advertising Inquiries</p>
                <p className="text-muted-foreground">s.rahman@panasian1.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}