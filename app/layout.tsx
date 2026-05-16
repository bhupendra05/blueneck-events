import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import ClientLayoutWrapper from '@/components/layout/ClientLayoutWrapper'
import { SITE_CONFIG } from '@/lib/constants'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: ['event management', 'wedding planner', 'corporate events', 'luxury events', 'Mumbai events', 'Blue Neck Events'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://blueneckevents.com',
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
    description: SITE_CONFIG.description,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} lenis lenis-smooth`}>
      <body className="noise">
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  )
}
