import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/components/theme-provider'
import { TopBar } from '@/components/top-bar'
import { SiteHeader } from '@/components/site-header'
import { NavMenu } from '@/components/nav-menu'
import { SiteFooter } from '@/components/site-footer'
import './global.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.thegulfproperty.com'),
  title: 'Gulf Property — Real Estate Journalism, Market Data & Property Insights',
  description:
    'Gulf Property delivers high-density editorial coverage of residential, commercial, construction, luxury and PropTech real estate, plus live market data.',
  generator: 'v0.app',
  applicationName: 'Gulf Property',
  openGraph: {
    title: 'Gulf Property',
    description:
      'Real Estate Journalism, Market Data & Property Insights',
    siteName: 'Gulf Property',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/Gulf Property.png',
        width: 1200,
        height: 630,
        alt: 'Gulf Property',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gulf Property',
    description: 'Real Estate Journalism, Market Data & Property Insights',
    images: ['/images/Gulf Property.png'],
  },
  icons: {
    icon: [
      {
        url: '/images/favicon.jpeg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/images/favicon.jpeg',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/images/favicon.jpeg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} bg-background`}>
      <body className="min-h-screen antialiased font-sans bg-background text-foreground">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PQT1FSYTKD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-PQT1FSYTKD');
          `}
        </Script>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col">
            <TopBar />
            <SiteHeader />
            <NavMenu />
            
            <main className="flex-1">{children}</main>
            
            <SiteFooter />
          </div>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}