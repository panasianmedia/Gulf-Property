import React from "react"

export function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-foreground">
      {/* Header Badge & Title */}
      <div className="mb-6 border-b-2 border-foreground pb-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-3 bg-realty" aria-hidden />
          <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">
            About Us
          </span>
        </div>
        <h1 className="mt-2 text-xl font-extrabold tracking-tight md:text-5xl">
          The Pulse of Gulf Real Estate & Construction
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
        {/* Left Column: Mission & Body */}
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground md:col-span-8">
          <p className="text-lg font-medium text-foreground">
            <strong>Gulf Property</strong> is the premier news platform dedicated to delivering timely, accurate, and high-impact journalism across the regional property market, infrastructure development, and real estate finance.
          </p>
          <p>
            Founded to bridge the gap between market intelligence and industry leadership, our editorial team tracks major megaprojects, commercial transactions, residential trends, and regulatory shifts shaping the Gulf landscape.
          </p>
          <p>
            Whether analysing cap rates, tracking developer announcements, or broadcasting breaking industry updates, Gulf Property serves investors, brokers, executives, and policymakers alike.
          </p>

          <hr className="my-6 border-border" />

          <h2 className="text-xl font-bold text-foreground">Editorial Integrity</h2>
          <p>
            Our reporting maintains strict editorial independence. We verify data through primary sources, official disclosures, and verified analytics to ensure our readers receive actionable and dependable market insight.
          </p>
        </div>

        {/* Right Column: Quick Stats / Editorial Info Box */}
        <div className="md:col-span-4">
          <div className="border border-border bg-card p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
              <span className="h-2.5 w-2.5 bg-realty" aria-hidden />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                At a Glance
              </h3>
            </div>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold text-foreground">Target Audience</dt>
                <dd className="text-muted-foreground">Developers, Investors, REITs, Brokers, Executives</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Coverage Area</dt>
                <dd className="text-muted-foreground">UAE, KSA, Qatar, Kuwait, Bahrain, Oman & Global Markets</dd>
              </div>
              <div>
                <dt className="font-semibold text-foreground">Frequency</dt>
                <dd className="text-muted-foreground">Real-time Digital Reporting & Daily Bulletins</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </main>
  )
}