import Link from "next/link"

const sections = [
  ["1. Acceptance of These Terms", "By accessing or using the Gulf Property website, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional terms presented for specific features or services. If you do not agree, please do not use the Website."],
  ["2. About Gulf Property", "Gulf Property is a UAE-based real estate news and information portal. We publish news, analysis, market updates, interviews, reports, events, and other content relating primarily to property, construction, finance, and related industries."],
  ["3. Informational Content Only", "Content on the Website is provided for general informational and editorial purposes. It is not legal, financial, investment, tax, valuation, brokerage, architectural, engineering, or other professional advice. You should obtain independent professional advice before making a decision based on Website content."],
  ["4. Accuracy and Availability", "We aim to publish timely and reliable information, but we do not guarantee that content is complete, current, accurate, or suitable for a particular purpose. Market data and forecasts may change without notice. We may correct, update, suspend, or remove content and may change or discontinue any part of the Website at any time."],
  ["5. User Conduct", "You must use the Website lawfully and responsibly. You must not interfere with its operation, introduce malicious code, attempt unauthorised access, scrape or harvest data in a way that harms the Website, generate artificial clicks or impressions, use bots or other automated means to manipulate advertisements or advertising traffic, infringe another person’s rights, impersonate another person, or submit unlawful, misleading, abusive, or defamatory material."],
  ["6. Intellectual Property", "Unless otherwise stated, the Website, its design, branding, editorial content, graphics, images, video, audio, and software are owned by or licensed to Gulf Property and are protected by applicable intellectual-property laws. You may access and share links to the Website for personal, non-commercial use, but you may not reproduce, republish, modify, distribute, or commercially exploit content without prior written permission."],
  ["7. User Submissions", "If you send us an enquiry, comment, story, image, or other material, you confirm that you have the right to provide it and that it does not violate any law or third-party right. You grant Gulf Property a non-exclusive, worldwide, royalty-free licence to use, reproduce, edit, publish, and display that material as reasonably necessary to operate and promote the Website, subject to applicable law and our Privacy Policy."],
  ["8. Advertising and Sponsored Content", "The Website may display advertisements, sponsored content, commercial announcements, or links to third-party services. Advertising does not necessarily constitute an endorsement. We are not responsible for the products, services, claims, privacy practices, or terms of advertisers and external websites. Any transaction with an advertiser is between you and that advertiser."],
  ["9. Third-Party Links and Services", "The Website may link to websites, applications, social-media platforms, property listings, or other services operated by third parties. Those services are governed by their own terms and policies. Gulf Property does not control and is not responsible for their availability, content, security, or practices."],
  ["10. Disclaimer of Warranties", "To the maximum extent permitted by law, the Website and its content are provided on an ‘as is’ and ‘as available’ basis without warranties of any kind, express or implied. We do not warrant that the Website will be uninterrupted, secure, error-free, or free from harmful components."],
  ["11. Limitation of Liability", "To the maximum extent permitted by law, Gulf Property and its directors, employees, contributors, partners, and service providers will not be liable for any indirect, incidental, special, consequential, or punitive loss arising from or related to your use of, or reliance on, the Website or its content. Nothing in these Terms excludes liability that cannot lawfully be excluded."],
  ["12. Privacy", "Our collection and use of personal information are described in our <Link href=\"/privacy-policy\" className=\"font-semibold text-realty underline underline-offset-2\">Privacy Policy</Link>. By using the Website, you acknowledge that you have read that policy."],
  ["13. Changes to These Terms", "We may update these Terms and Conditions from time to time. Changes take effect when posted on this page. Your continued use of the Website after changes are posted means that you accept the updated Terms."],
  ["14. Governing Law", "These Terms are governed by the applicable laws of the United Arab Emirates. Any dispute relating to the Website or these Terms will be subject to the jurisdiction of the Emirate of Dubai and the competent courts of Dubai, unless mandatory law requires otherwise."],
]

export function TermsAndConditionsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-foreground">
      <header className="mb-8 border-b-2 border-foreground pb-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-3 bg-realty" aria-hidden />
          <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">Legal</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">Terms and Conditions</h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">The terms governing access to and use of the Gulf Property Website and its content.</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Effective date: September 21, 2026 · Last updated: September 21, 2026</p>
      </header>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <p className="text-lg text-foreground">Welcome to Gulf Property (“Gulf Property”, “we”, “us”, or “our”). These Terms and Conditions explain the rules for using our Website.</p>
          {sections.map(([title, content]) => (
            <section key={title}>
              <h2 className="mb-3 text-xl font-bold text-foreground">{title}</h2>
              <p dangerouslySetInnerHTML={{ __html: content }} />
            </section>
          ))}
          <section className="border-t border-border pt-8">
            <h2 className="mb-3 text-xl font-bold text-foreground">15. Contact Us</h2>
            <p>For questions about these Terms, please use our <Link href="/contact" className="font-semibold text-realty underline underline-offset-2">Contact page</Link> or email <a href="mailto:info.gulfproperty@gmail.com" className="font-semibold text-realty underline underline-offset-2">info.gulfproperty@gmail.com</a>.</p>
          </section>
        </div>

        <aside className="h-fit border border-border bg-card p-5 shadow-sm md:sticky md:top-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-realty">On this page</p>
          <p className="text-sm leading-relaxed text-muted-foreground">These terms cover Website use, content, intellectual property, advertising, third-party links, liability, and governing law.</p>
          <div className="mt-5 border-t border-border pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">Privacy</p>
            <Link href="/privacy-policy" className="mt-2 inline-block text-sm font-semibold text-realty underline underline-offset-2">Read our Privacy Policy</Link>
          </div>
        </aside>
      </div>
    </main>
  )
}