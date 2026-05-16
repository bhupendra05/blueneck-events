'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FadeUp, EyebrowReveal } from '@/components/ui/AnimatedText'

interface FeaturedItem {
  id: string
  title: string
  subtitle: string
  category: string
  image: string
  color: string
  href: string
  size: 'large' | 'small'
}

const FALLBACK_FEATURED: FeaturedItem[] = [
  {
    id: 'weddings',
    title: 'Luxury Weddings',
    subtitle: 'Where love stories become timeless memories',
    category: 'Weddings',
    image: '/images/fallbacks/photo_1519741349-a57a0f88d50a.jpg',
    color: '#C9A740',
    href: '/weddings',
    size: 'large',
  },
  {
    id: 'galas',
    title: 'Galas & Balls',
    subtitle: 'Sophisticated black-tie affairs of unmatched elegance',
    category: 'Galas',
    image: '/images/fallbacks/photo_1540575467063-178a50c2df87.jpg',
    color: '#C9A740',
    href: '/galas',
    size: 'small',
  },
  {
    id: 'concerts',
    title: 'Concerts & Shows',
    subtitle: 'Electrifying performances that captivate thousands',
    category: 'Concerts',
    image: '/images/fallbacks/photo_1470229722913-7c0e2dbbafd3.jpg',
    color: '#C9A740',
    href: '/concerts',
    size: 'small',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    subtitle: 'Prestigious gatherings that define industry standards',
    category: 'Corporate',
    image: '/images/fallbacks/photo_1505373877841-8d25f7d46678.jpg',
    color: '#C9A740',
    href: '/corporate',
    size: 'large',
  },
]

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  if (!src) {
    return (
      <div ref={ref} className="absolute inset-0 overflow-hidden">
        <div
          className="w-full h-full"
          style={{ background: 'linear-gradient(135deg, #0D0D18 0%, #1a1a2e 50%, #16213e 100%)' }}
        />
      </div>
    )
  }

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-[120%] object-cover -top-[10%] absolute img-cinematic"
        style={{ y }}
      />
    </div>
  )
}

export default function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [featuredItems, setFeaturedItems] = useState<FeaturedItem[]>(FALLBACK_FEATURED)

  useEffect(() => {
    // Fetch settings to get featured event IDs, then fetch events
    fetch('/api/settings')
      .then((r) => r.json())
      .then((settings) => {
        const featuredIds: string[] = Array.isArray(settings.featuredEventIds) ? settings.featuredEventIds : []
        fetch('/api/events')
          .then((r) => r.json())
          .then((data: any[]) => {
            if (!Array.isArray(data) || data.length === 0) return // keep static fallback
            let sorted: any[]
            if (featuredIds.length > 0) {
              // Use featured event IDs from settings
              sorted = [
                ...featuredIds.map((id) => data.find((e) => e.id === id)).filter(Boolean),
                ...data.filter((e) => !featuredIds.includes(e.id)),
              ].slice(0, 4) as any[]
            } else {
              // Fallback: default order
              const order = ['weddings', 'galas', 'concerts', 'corporate']
              sorted = [
                ...order.map((id) => data.find((e) => e.id === id)).filter(Boolean),
                ...data.filter((e) => !order.includes(e.id)),
              ].slice(0, 4) as any[]
            }

            const sizes: Array<'large' | 'small'> = ['large', 'small', 'small', 'large']
            setFeaturedItems(sorted.map((e: any, i: number) => ({
              id: e.id,
              title: e.label,
              subtitle: e.tagline,
              category: e.label,
              image: e.heroImage,
              color: e.accentColor || '#C9A740',
              href: e.href || `/${e.id}`,
              size: sizes[i],
            })))
          })
      })
      .catch(() => {})
  }, [])

  return (
    <section className="section-padding" style={{ background: '#050508' }}>
      <div className="container-luxury" ref={ref}>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <EyebrowReveal delay={0.1}>
              <span className="text-eyebrow">Signature Work</span>
            </EyebrowReveal>
            <motion.h2
              className="text-display mt-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Stories We{' '}
              <span className="gold-text italic">Crafted</span>
            </motion.h2>
          </div>
          <FadeUp delay={0.3}>
            <Link
              href="/gallery"
              className="flex items-center gap-2 text-sm font-medium group animated-underline"
              style={{ color: '#C9A740' }}
            >
              <span>View Full Portfolio</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeUp>
        </div>

        {/* Featured grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            {featuredItems.filter((_, i) => i % 2 === 0).map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl group ${item.size === 'large' ? 'aspect-[4/3]' : 'aspect-video'}`}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <ParallaxImage src={item.image} alt={item.title} />
                <div
                  className="absolute inset-0 z-10 transition-opacity duration-500"
                  style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.2) 60%, transparent 100%)' }}
                />
                <div
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${item.color} 0%, transparent 60%)` }}
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <motion.span
                    className="block text-xs tracking-widest uppercase font-inter font-semibold mb-2"
                    style={{ color: item.color }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  >
                    {item.category}
                  </motion.span>
                  <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#F8F6F0' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'rgba(248,246,240,0.5)' }}>
                    {item.subtitle}
                  </p>
                </div>
                <Link href={item.href} className="absolute inset-0 z-30" aria-label={`View ${item.title}`} />
                <div
                  className="absolute top-5 right-5 z-30 w-10 h-10 rounded-full flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                  style={{ background: 'rgba(201,167,64,0.15)', border: '1px solid rgba(201,167,64,0.3)' }}
                >
                  <ArrowRight size={16} style={{ color: '#C9A740' }} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-5">
            {featuredItems.filter((_, i) => i % 2 !== 0).map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative overflow-hidden rounded-2xl group ${item.size === 'large' ? 'aspect-[4/3]' : 'aspect-video'}`}
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <ParallaxImage src={item.image} alt={item.title} />
                <div
                  className="absolute inset-0 z-10"
                  style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.2) 60%, transparent 100%)' }}
                />
                <div
                  className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${item.color} 0%, transparent 60%)` }}
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                  <span className="block text-xs tracking-widest uppercase font-inter font-semibold mb-2" style={{ color: item.color }}>
                    {item.category}
                  </span>
                  <h3 className="text-xl font-display font-bold mb-1" style={{ color: '#F8F6F0' }}>
                    {item.title}
                  </h3>
                  <p className="text-xs" style={{ color: 'rgba(248,246,240,0.5)' }}>
                    {item.subtitle}
                  </p>
                </div>
                <Link href={item.href} className="absolute inset-0 z-30" aria-label={`View ${item.title}`} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
