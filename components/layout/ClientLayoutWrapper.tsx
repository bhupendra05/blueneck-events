'use client'

import { usePathname } from 'next/navigation'
import SmoothScroller from './SmoothScroller'
import Navbar from './Navbar'
import Footer from './Footer'
import PageTransition from './PageTransition'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import FloatingCTA from '@/components/ui/FloatingCTA'
import SessionProvider from '@/components/admin/SessionProvider'

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  if (isAdmin) {
    // Admin routes: no site chrome, just SessionProvider
    return <SessionProvider>{children}</SessionProvider>
  }

  // Main site
  return (
    <SmoothScroller>
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
      <FloatingCTA />
    </SmoothScroller>
  )
}
