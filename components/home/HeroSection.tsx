'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import MagneticButton from '@/components/ui/MagneticButton'

const HeroParticles = dynamic(() => import('@/components/three/HeroParticles'), {
  ssr: false,
  loading: () => null,
})

const defaultStats = [
  { value: '850+', label: 'Events' },
  { value: '12K+', label: 'Guests Hosted' },
  { value: '9 Yrs', label: 'Excellence' },
  { value: '98%', label: 'Satisfaction' },
]

interface HeroSlide {
  url: string
  label: string
  accent: string
}

interface HeroStat {
  value: string
  label: string
}

const FALLBACK_SLIDES: HeroSlide[] = [
  { url: '/images/fallbacks/photo_1519741349-a57a0f88d50a.jpg', label: 'Weddings',  accent: '#C9A740' },
  { url: '/images/fallbacks/photo_1540575467063-178a50c2df87.jpg', label: 'Galas',   accent: '#9B6FFF' },
  { url: '/images/fallbacks/photo_1470229722913-7c0e2dbbafd3.jpg', label: 'Concerts', accent: '#FF6B6B' },
  { url: '/images/fallbacks/photo_1505373877841-8d25f7d46678.jpg', label: 'Corporate', accent: '#4ECDC4' },
]

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [heroImages, setHeroImages] = useState<HeroSlide[]>(FALLBACK_SLIDES)
  const [stats, setStats] = useState<HeroStat[]>(defaultStats)
  const [heroTagline, setHeroTagline] = useState('')
  const [heroSubtitle, setHeroSubtitle] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  // Fetch settings from API (hero slides, stats, tagline)
  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        // Stats
        if (data.stats && data.stats.length > 0) {
          const mapped: HeroStat[] = data.stats.map((s: any) => ({
            value: `${s.value}${s.suffix ?? ''}`,
            label: s.label,
          }))
          setStats(mapped)
        }
        // Tagline / subtitle
        if (data.heroTagline) setHeroTagline(data.heroTagline)
        if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle)
        // Hero slides from settings (uploaded via admin portal) — only override if real data exists
        if (data.heroSlides && data.heroSlides.length > 0) {
          const defaultAccents = ['#C9A740', '#9B59B6', '#3498DB', '#2A6BB0']
          const defaultLabels = ['Weddings', 'Galas', 'Concerts', 'Corporate']
          const slides: HeroSlide[] = data.heroSlides.map((s: any, i: number) => ({
            url: s.image,
            label: s.label || defaultLabels[i % defaultLabels.length] || `Slide ${i + 1}`,
            accent: s.accent || defaultAccents[i % defaultAccents.length],
          }))
          setHeroImages(slides)
        }
      })
      .catch(() => {
        // silently fall back to defaults
      })
  }, [])

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const scrollToNext = () => {
    const next = document.getElementById('services-section')
    if (next) next.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={containerRef}
      className="relative full-height overflow-hidden"
      style={{ background: '#050508' }}
    >
      {/* Background image slideshow */}
      <motion.div
        className="absolute inset-0"
        style={{ scale, y }}
      >
        <AnimatePresence mode="wait">
          {heroImages.map((img, i) =>
            i === currentSlide ? (
              <motion.div
                key={img.url}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src={img.url}
                  alt={img.label}
                  className="w-full h-full object-cover img-cinematic"
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </motion.div>

      {/* Multi-layer dark overlay */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(5,5,8,1) 0%, rgba(5,5,8,0.6) 40%, rgba(5,5,8,0.2) 70%, rgba(5,5,8,0.4) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(5,5,8,0.8) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(ellipse 80% 60% at 20% 50%, rgba(13,33,55,0.6) 0%, transparent 60%)`,
          }}
        />
      </div>

      {/* Three.js Particles */}
      <HeroParticles />

      {/* Slide indicators — hidden on mobile to avoid overlap with hero text */}
      <div className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 flex-col gap-3">
        {heroImages.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="group flex items-center gap-2"
            style={{ opacity: i === currentSlide ? 1 : 0.4 }}
          >
            <span
              className="text-xs font-inter tracking-widest hidden lg:block transition-all duration-300"
              style={{
                color: i === currentSlide ? img.accent : 'rgba(248,246,240,0.4)',
                transform: i === currentSlide ? 'translateX(-8px)' : 'translateX(0)',
              }}
            >
              {img.label}
            </span>
            <motion.div
              className="rounded-full"
              animate={{
                width: i === currentSlide ? '24px' : '4px',
                height: '4px',
                background: i === currentSlide ? img.accent : 'rgba(248,246,240,0.3)',
              }}
              transition={{ duration: 0.4 }}
            />
          </button>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10 container-luxury full-height flex flex-col justify-center"
        style={{ opacity }}
      >
        <div className="max-w-4xl w-full">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <span className="text-eyebrow text-[0.65rem] md:text-[0.75rem]">Premium Event Management</span>
            <div className="hidden sm:block w-12 h-px" style={{ background: 'rgba(201,167,64,0.5)' }} />
            <span className="hidden sm:block text-eyebrow text-[0.65rem] md:text-[0.75rem] opacity-50">Est. 2015</span>
          </motion.div>

          {/* Main heading — driven by heroTagline from DB */}
          {(heroTagline || 'Where Moments Become Legends').split(' ').reduce<string[][]>((acc, word, i, arr) => {
            const mid = Math.ceil(arr.length / 2)
            if (i < mid) acc[0].push(word)
            else acc[1].push(word)
            return acc
          }, [[], []]).map((lineWords, li) => (
            <div key={li} className="overflow-hidden mb-2 md:mb-4">
              <motion.h1
                className="text-hero leading-none"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay: 0.5 + li * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {li === 0 ? (
                  <span style={{ color: '#F8F6F0' }}>{lineWords.join(' ')}</span>
                ) : (
                  <>
                    <span style={{ color: '#F8F6F0' }}>{lineWords.slice(0, -1).join(' ')}{lineWords.length > 1 ? ' ' : ''}</span>
                    <span className="gold-text italic">{lineWords[lineWords.length - 1]}</span>
                  </>
                )}
              </motion.h1>
            </div>
          ))}

          {/* Subheading */}
          <motion.p
            className="text-sm md:text-lg max-w-lg mt-4 md:mt-6 mb-8 md:mb-10"
            style={{ color: 'rgba(248,246,240,0.6)', lineHeight: '1.7' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroSubtitle || "India's most sought-after event architects, crafting extraordinary experiences that leave the world breathless."}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton>
              <Link href="/contact" className="btn-gold-solid">
                <span>Plan Your Event</span>
                <span style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>→</span>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="/gallery" className="btn-luxury">
                <Play size={14} />
                <span>View Portfolio</span>
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-5 mt-10 pt-8"
            style={{ borderTop: '1px solid rgba(201,167,64,0.1)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-xl md:text-2xl lg:text-3xl font-display font-bold"
                  style={{ color: '#C9A740' }}
                >
                  {stat.value}
                </span>
                <span className="text-xs tracking-widest uppercase mt-1" style={{ color: 'rgba(248,246,240,0.4)' }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(201,167,64,0.5)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} style={{ color: 'rgba(201,167,64,0.5)' }} />
        </motion.div>
      </motion.button>
    </section>
  )
}
