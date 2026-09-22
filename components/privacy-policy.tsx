import Link from "next/link"

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <>
        <p>We may collect information directly from you, automatically through your use of the Website, or from service providers that support the Website.</p>
        <p>Information you provide may include your name, email address, telephone number, company, job title, newsletter preferences, enquiry details, comments, and any other information you choose to send us.</p>
        <p>You can browse most areas of the Website without directly providing personal information.</p>
      </>
    ),
  },
  {
    title: "2. Information Collected Automatically",
    content: (
      <>
        <p>When you visit the Website, we may automatically receive technical and usage information such as your IP address, browser and device type, operating system, language preferences, approximate location derived from IP address, pages viewed, links clicked, referring source, and the date and time of visits.</p>
        <p>This information may be collected through cookies, pixels, web beacons, tags, server logs, and similar technologies.</p>
      </>
    ),
  },
  {
    title: "3. Cookies and Similar Technologies",
    content: (
      <>
        <p>Gulf Property may use cookies and similar technologies to operate, secure, analyse, and improve the Website and, where applicable, support advertising.</p>
        <p>Essential technologies may support security, basic functionality, and user preferences. Analytics technologies may help us understand traffic, content performance, and how visitors navigate the Website. Advertising technologies may be used to deliver, measure, and improve advertisements if advertising is enabled.</p>
        <p>You can control or delete cookies through your browser settings. Disabling certain cookies may affect Website functionality. Where legally required, we may provide a consent mechanism for non-essential cookies and advertising technologies.</p>
      </>
    ),
  },
  {
    title: "4. Advertising, Third-Party Vendors, and Cookies",
    content: (
      <>
        <p>Gulf Property uses or may integrate advertising and measurement services provided by Google, including Google AdSense, Google Ad Manager, and Google Analytics, and other third-party partners.</p>
        <p><strong>Third-party cookies:</strong> Third-party vendors, including Google, may use cookies, web beacons, and device identifiers to serve advertisements based on a user’s prior visits to Gulf Property or other websites across the internet.</p>
        <p><strong>Personalized advertising:</strong> Google’s use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our Website and/or other sites on the internet.</p>
        <p><strong>User opt-out:</strong> Users may opt out of personalized advertising through <a href="https://adssettings.google.com/" target="_blank" rel="noreferrer" className="font-semibold text-realty underline underline-offset-2">Google Ads Settings</a>. Users may also opt out of third-party vendor cookies for personalized advertising through <a href="https://www.aboutads.info/choices/" target="_blank" rel="noreferrer" className="font-semibold text-realty underline underline-offset-2">aboutads.info</a>. Our consent controls may vary by location and applicable legal requirements.</p>
      </>
    ),
  },
  {
    title: "5. How We Use Information",
    content: (
      <p>We may use information to operate and secure the Website; publish and deliver news and information; respond to enquiries; manage subscriptions; measure traffic and performance; understand audience interests; improve content, design, and user experience; detect fraud and abuse; communicate important service information; conduct lawful marketing; support advertising and analytics; and comply with legal obligations.</p>
    ),
  },
  {
    title: "6. Contact Forms and Marketing",
    content: (
      <>
        <p>If you contact us through a form, email, telephone number, or another communication method, we use the information you provide to understand and respond to your request.</p>
        <p>If you subscribe to a newsletter or provide contact details for marketing communications, we may send news, market updates, reports, events, announcements, and relevant business information. You can unsubscribe at any time using the link in the communication or by contacting us.</p>
        <p>We do not sell personal information submitted through our contact forms as a standalone commercial product.</p>
      </>
    ),
  },
  {
    title: "7. Sharing of Information",
    content: (
      <p>We may share information where reasonably necessary with hosting and technology providers, analytics and advertising providers, email services, cybersecurity and fraud-prevention providers, professional advisers, service providers acting on our behalf, government authorities where legally required, or other parties where necessary to protect our users, rights, Website, or business.</p>
    ),
  },
  {
    title: "8. Third-Party Links and Social Media",
    content: (
      <p>The Website may link to or include content from developers, advertisers, news sources, event websites, social networks, and other external services. Those services may collect information under their own policies. We are not responsible for the privacy practices, security, or content of third-party websites.</p>
    ),
  },
  {
    title: "9. UAE Personal Data Protection Law and International Transfers",
    content: (
      <>
        <p>Gulf Property processes personal information in accordance with applicable laws, including UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection (PDPL).</p>
        <p>We take reasonable technical and organisational measures designed to protect personal information against unauthorised access, alteration, disclosure, loss, or destruction. No internet transmission or electronic storage system can be guaranteed completely secure.</p>
        <p>We retain information only for as long as reasonably necessary for the purposes described in this policy, including to provide services, maintain records, comply with legal requirements, resolve disputes, prevent abuse, and enforce our agreements.</p>
        <p>Certain cloud hosting, content delivery networks, and third-party advertising tools may process data internationally. Cross-border data transfers are handled with the safeguards and adequacy standards required under UAE data protection laws.</p>
      </>
    ),
  },
  {
    title: "10. Your Statutory Privacy Rights",
    content: (
      <p>Under UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection, data subjects in the UAE may have the right to request access to their personal data, request correction or erasure, object to or restrict processing, withdraw consent where processing relies on consent, and make an inquiry regarding automated data processing. To exercise a right, please use our <Link href="/contact" className="font-semibold text-realty underline underline-offset-2">Contact page</Link> or email us at <a href="mailto:info.gulfproperty@gmail.com" className="font-semibold text-realty underline underline-offset-2">info.gulfproperty@gmail.com</a>. We may need to verify your identity before processing a request.</p>
    ),
  },
  {
    title: "11. Regional and Children’s Privacy",
    content: (
      <>
        <p>Visitors from the European Economic Area, the United Kingdom, or Switzerland may be subject to additional consent requirements for cookies, personalised advertising, and personal-data processing. Our consent configuration may vary by location and applicable law.</p>
        <p>The Website is intended for a general audience and is not directed to children under 13. We do not knowingly collect personal information from children under 13 for personalised advertising.</p>
      </>
    ),
  },
  {
    title: "12. Changes to This Policy",
    content: (
      <p>We may update this Privacy Policy when our Website, services, technologies, legal obligations, or privacy practices change. We will update the date below when changes are made.</p>
    ),
  },
]

export function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 text-foreground">
      <header className="mb-8 border-b-2 border-foreground pb-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-3 w-3 bg-realty" aria-hidden />
          <span className="bg-realty px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-white">Legal</span>
        </div>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">How Gulf Property collects, uses, shares, and protects information when you visit or interact with our Website.</p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Effective date: September 21, 2026 · Last updated: September 21, 2026</p>
      </header>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
          <p className="text-lg text-foreground">Welcome to Gulf Property (“Gulf Property”, “we”, “us”, or “our”). We are a UAE-based real estate news and information portal covering property, construction, markets, and industry developments.</p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-xl font-bold text-foreground">{section.title}</h2>
              <div className="space-y-3">{section.content}</div>
            </section>
          ))}
          <section className="border-t border-border pt-8">
            <h2 className="mb-3 text-xl font-bold text-foreground">13. Contact Us</h2>
            <p><strong>Gulf Property</strong><br />Website: <a href="https://thegulfproperty.com" target="_blank" rel="noreferrer" className="font-semibold text-realty underline underline-offset-2">thegulfproperty.com</a><br />Registered location: United Arab Emirates<br />Editorial and privacy email: <a href="mailto:info.gulfproperty@gmail.com" className="font-semibold text-realty underline underline-offset-2">info.gulfproperty@gmail.com</a></p>
            <p>For privacy questions or deletion requests, please use our <Link href="/contact" className="font-semibold text-realty underline underline-offset-2">Contact page</Link> or email us. Include sufficient details for us to verify your identity and handle your request.</p>
          </section>
        </div>

        <aside className="h-fit border border-border bg-card p-5 shadow-sm md:sticky md:top-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-realty">On this page</p>
          <p className="text-sm leading-relaxed text-muted-foreground">This policy covers cookies, advertising and analytics technologies, enquiries, third-party services, international transfers, and privacy requests.</p>
          <div className="mt-5 border-t border-border pt-5">
            <p className="text-xs font-bold uppercase tracking-wider text-foreground">Need help?</p>
            <Link href="/contact" className="mt-2 inline-block text-sm font-semibold text-realty underline underline-offset-2">Contact Gulf Property</Link>
          </div>
        </aside>
      </div>
    </main>
  )
}