'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import HeroSection from '@/components/home/HeroSection'
import ServicesGrid from '@/components/home/ServicesGrid'
import StatsCounter from '@/components/home/StatsCounter'
import FeaturedWork from '@/components/home/FeaturedWork'
import Testimonials from '@/components/home/Testimonials'
import WhyUs from '@/components/home/WhyUs'

const Preloader = dynamic(() => import('@/components/ui/Preloader'), {
  ssr: false,
})

export default function HomePage() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      <div style={{ opacity: preloaderDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <HeroSection />
        <ServicesGrid />
        <StatsCounter />
        <FeaturedWork />
        <WhyUs />
        <Testimonials />
      </div>
    </>
  )
}
