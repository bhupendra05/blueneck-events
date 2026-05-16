'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { FadeUp, EyebrowReveal } from '@/components/ui/AnimatedText'

interface EventCategory {
  id: string
  label: string
  tagline: string
  description: string
  href: string
  accentColor: string
  heroImage: string
  icon: string
}

const FALLBACK_EVENTS: EventCategory[] = [
  {
    id: 'weddings',
    label: 'Weddings',
    tagline: 'Your Perfect Day, Flawlessly Crafted.',
    description: 'From intimate ceremonies to grand palatial weddings — every detail obsessively perfected.',
    href: '/weddings',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1519741349-a57a0f88d50a.jpg',
    icon: '💍',
  },
  {
    id: 'corporate',
    label: 'Corporate Events',
    tagline: 'Where Business Meets Brilliance.',
    description: 'Conferences, product launches, and galas that define your brand and inspire your people.',
    href: '/corporate',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1505373877841-8d25f7d46678.jpg',
    icon: '🤝',
  },
  {
    id: 'social',
    label: 'Social Events',
    tagline: 'Celebrations That Live Forever.',
    description: 'Cocktail parties, reunions, and soirées crafted for connection and unforgettable memories.',
    href: '/social',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1514525253161-7a6c1cc1a1a6.jpg',
    icon: '🥂',
  },
  {
    id: 'birthdays',
    label: 'Birthdays',
    tagline: 'Every Year, A New Legend.',
    description: 'Milestone birthdays transformed into grand spectacles — intimate or extravagant, always extraordinary.',
    href: '/birthdays',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1530103862676-de8c9debad1d.jpg',
    icon: '🎂',
  },
  {
    id: 'sports',
    label: 'Sports Events',
    tagline: 'Victory Deserves a Stage.',
    description: 'Award nights, championships, and sports galas that celebrate achievement in style.',
    href: '/sports',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1461896836934-ffe607ba8211.jpg',
    icon: '🏆',
  },
  {
    id: 'galas',
    label: 'Galas & Balls',
    tagline: 'Elegance Without Limits.',
    description: 'Black-tie affairs, charity balls, and awards evenings of unparalleled sophistication.',
    href: '/galas',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1540575467063-178a50c2df87.jpg',
    icon: '✨',
  },
  {
    id: 'launches',
    label: 'Product Launches',
    tagline: 'Make Your Mark Unforgettable.',
    description: 'Brand reveals and product launches engineered for maximum impact and lasting impression.',
    href: '/launches',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1492684223066-81342ee5ff30.jpg',
    icon: '🚀',
  },
  {
    id: 'concerts',
    label: 'Concerts & Shows',
    tagline: 'Performances That Move Thousands.',
    description: 'Live concerts, music festivals, and entertainment spectacles produced at the highest level.',
    href: '/concerts',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1470229722913-7c0e2dbbafd3.jpg',
    icon: '🎵',
  },
  {
    id: 'destinations',
    label: 'Destination Events',
    tagline: 'The World Is Your Venue.',
    description: 'Bali, Maldives, Udaipur, Goa — we turn dream destinations into extraordinary event backdrops.',
    href: '/destinations',
    accentColor: '#C9A740',
    heroImage: '/images/fallbacks/photo_1520250497591-112f2f40a3f4.jpg',
    icon: '🌍',
  },
]

export default function ServicesGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [events, setEvents] = useState<EventCategory[]>(FALLBACK_EVENTS)

  useEffect(() => {
    fetch('/api/events')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data.map((e: any) => ({
            id: e.id,
            label: e.label,
            tagline: e.tagline,
            description: e.description,
            href: e.href || `/${e.id}`,
            accentColor: e.accentColor || '#C9A740',
            heroImage: e.heroImage,
            icon: e.icon || '✦',
          })))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section id="services-section" className="section-padding" style={{ background: '#050508' }}>
      <div className="container-luxury" ref={ref}>

        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <EyebrowReveal delay={0.1}>
              <span className="text-eyebrow">Our Expertise</span>
            </EyebrowReveal>
            <motion.h2
              className="text-display mt-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Every Event,{' '}
              <span className="gold-text italic">Perfectly</span>
              <br />Executed.
            </motion.h2>
          </div>

          <FadeUp delay={0.3}>
            <p className="max-w-xs text-sm leading-relaxed" style={{ color: 'rgba(248,246,240,0.5)' }}>
              From intimate ceremonies to grand spectacles — we pour our
              hearts into every single detail.
            </p>
          </FadeUp>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.1 + index * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Link href={event.href} className="block group relative overflow-hidden rounded-2xl aspect-[4/3]">
                {/* Background image */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: hoveredId === event.id ? 1.08 : 1 }}
                  transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <img
                    src={event.heroImage}
                    alt={event.label}
                    className="w-full h-full object-cover img-cinematic"
                    loading="lazy"
                  />
                </motion.div>

                {/* Base overlay */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, rgba(5,5,8,0.3) 60%, rgba(5,5,8,0.1) 100%)',
                    opacity: hoveredId === event.id ? 0.9 : 1,
                  }}
                />

                {/* Color accent overlay on hover */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: hoveredId === event.id ? 0.15 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{ background: `radial-gradient(ellipse at 50% 100%, ${event.accentColor} 0%, transparent 70%)` }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="overflow-hidden">
                    <motion.div
                      animate={{ y: hoveredId === event.id ? -4 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <h3 className="text-xl font-display font-semibold mb-1" style={{ color: '#F8F6F0' }}>
                        {event.label}
                      </h3>
                      <p className="text-xs" style={{ color: 'rgba(248,246,240,0.5)' }}>
                        {event.tagline}
                      </p>
                    </motion.div>
                  </div>

                  {/* Always visible on mobile, hover-reveal on desktop */}
                  <p className="text-xs mt-2 leading-relaxed md:hidden" style={{ color: 'rgba(248,246,240,0.6)' }}>
                    {event.description}
                  </p>
                  <motion.div
                    className="overflow-hidden hidden md:block"
                    animate={{
                      height: hoveredId === event.id ? 'auto' : 0,
                      opacity: hoveredId === event.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="text-xs mt-2 leading-relaxed" style={{ color: 'rgba(248,246,240,0.6)' }}>
                      {event.description}
                    </p>
                  </motion.div>
                </div>

                {/* Arrow */}
                <motion.div
                  className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(5,5,8,0.5)', border: '1px solid rgba(201,167,64,0.2)' }}
                  animate={{
                    opacity: hoveredId === event.id ? 1 : 0,
                    scale: hoveredId === event.id ? 1 : 0.7,
                    background: hoveredId === event.id ? 'rgba(201,167,64,0.15)' : 'rgba(5,5,8,0.5)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight size={16} style={{ color: '#C9A740' }} />
                </motion.div>

                {/* Gold border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{
                    boxShadow: hoveredId === event.id
                      ? `inset 0 0 0 1px rgba(201,167,64,0.3), 0 20px 60px rgba(0,0,0,0.5)`
                      : 'inset 0 0 0 1px rgba(255,255,255,0.03)',
                  }}
                  transition={{ duration: 0.4 }}
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
