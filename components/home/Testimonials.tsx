'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { FadeUp, EyebrowReveal } from '@/components/ui/AnimatedText'

interface Testimonial {
  _id?: string
  name: string
  event: string
  quote: string
  rating: number
  image: string
}

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Priya & Rohit Sharma',
    event: 'Destination Wedding, Udaipur',
    quote: 'Blue Neck Events turned our dream wedding into something beyond imagination. Every single detail was perfect — from the floral mandap to the last dance. We still can\'t believe it was real.',
    rating: 5,
    image: '/images/fallbacks/photo_1519741349-a57a0f88d50a.jpg',
  },
  {
    name: 'Ananya Mehta',
    event: 'Corporate Annual Gala, Mumbai',
    quote: 'We\'ve worked with many event companies but Blue Neck is in a different league entirely. The production quality, the attention to detail, and the seamless execution left our 800 guests absolutely stunned.',
    rating: 5,
    image: '/images/fallbacks/photo_1505373877841-8d25f7d46678.jpg',
  },
  {
    name: 'Vikram & Deepika Nair',
    event: 'Grand Birthday Celebration, Goa',
    quote: 'My 40th birthday was an absolute masterpiece. The team understood exactly what I wanted and delivered something even more spectacular. Every guest is still talking about it months later.',
    rating: 5,
    image: '/images/fallbacks/photo_1530103862676-de8c9debad1d.jpg',
  },
  {
    name: 'Rajesh Kapoor',
    event: 'Product Launch Event, Delhi',
    quote: 'The launch event they produced for us exceeded every expectation. The ambiance, the technology integration, and the sheer professionalism set a new standard for our brand.',
    rating: 5,
    image: '/images/fallbacks/photo_1492684223066-81342ee5ff30.jpg',
  },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK_TESTIMONIALS)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  // Fetch live testimonials from DB
  useEffect(() => {
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data)
          setCurrent(0)
        }
      })
      .catch(() => {
        // silently fall back to defaults
      })
  }, [])

  const total = testimonials.length
  const prev = () => setCurrent((c) => (c - 1 + total) % total)
  const next = () => setCurrent((c) => (c + 1) % total)

  const active = testimonials[current] ?? testimonials[0]

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #050508 0%, #080C14 50%, #050508 100%)',
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,167,64,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Large decorative quote mark */}
      <div
        className="hidden md:block absolute top-12 left-1/2 -translate-x-1/2 font-display text-[20rem] leading-none pointer-events-none select-none"
        style={{ color: 'rgba(201,167,64,0.025)', lineHeight: 1 }}
      >
        &ldquo;
      </div>

      <div className="container-luxury relative z-10" ref={ref}>

        {/* Header */}
        <div className="text-center mb-16">
          <EyebrowReveal delay={0.1}>
            <span className="text-eyebrow">Client Stories</span>
          </EyebrowReveal>
          <motion.h2
            className="text-display mt-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Words That{' '}
            <span className="gold-text italic">Move Us</span>
          </motion.h2>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {active && <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: active.rating ?? 5 }).map((_, i) => (
                  <Star key={i} size={18} fill="#C9A740" style={{ color: '#C9A740' }} />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="text-xl md:text-2xl lg:text-3xl font-display font-medium leading-relaxed mb-10"
                style={{ color: '#F8F6F0', fontStyle: 'italic' }}
              >
                &ldquo;{active.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-4">
                {active.image && (
                  <div
                    className="w-16 h-16 rounded-full overflow-hidden"
                    style={{ border: '2px solid rgba(201,167,64,0.4)' }}
                  >
                    <img
                      src={active.image}
                      alt={active.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-display font-semibold text-lg" style={{ color: '#F8F6F0' }}>
                    {active.name}
                  </div>
                  <div className="text-sm mt-1" style={{ color: '#C9A740' }}>
                    {active.event}
                  </div>
                </div>
              </div>
            </motion.div>}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(201,167,64,0.08)',
                border: '1px solid rgba(201,164,64,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,167,64,0.15)'
                e.currentTarget.style.borderColor = 'rgba(201,167,64,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(201,167,64,0.08)'
                e.currentTarget.style.borderColor = 'rgba(201,167,64,0.2)'
              }}
            >
              <ChevronLeft size={20} style={{ color: '#C9A740' }} />
            </button>

            {/* Dots — padded for 44px tap target */}
            <div className="flex gap-1 items-center">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="p-3 flex items-center justify-center"
                  aria-label={`Go to testimonial ${i + 1}`}
                >
                  <span
                    className="block rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? '24px' : '6px',
                      height: '6px',
                      background: i === current ? '#C9A740' : 'rgba(201,167,64,0.25)',
                    }}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'rgba(201,167,64,0.08)',
                border: '1px solid rgba(201,164,64,0.2)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(201,167,64,0.15)'
                e.currentTarget.style.borderColor = 'rgba(201,167,64,0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(201,167,64,0.08)'
                e.currentTarget.style.borderColor = 'rgba(201,167,64,0.2)'
              }}
            >
              <ChevronRight size={20} style={{ color: '#C9A740' }} />
            </button>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="mt-20 relative overflow-hidden py-4">
          <div
            className="absolute top-0 left-0 right-0 gold-line"
            style={{ opacity: 0.15 }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 gold-line"
            style={{ opacity: 0.15 }}
          />
          <div className="marquee-track">
            {[
              'Weddings', '✦', 'Corporate Events', '✦', 'Luxury Galas', '✦',
              'Concerts', '✦', 'Product Launches', '✦', 'Destination Events', '✦',
              'Sports Events', '✦', 'Birthday Parties', '✦', 'Social Events', '✦',
              'Weddings', '✦', 'Corporate Events', '✦', 'Luxury Galas', '✦',
              'Concerts', '✦', 'Product Launches', '✦', 'Destination Events', '✦',
              'Sports Events', '✦', 'Birthday Parties', '✦', 'Social Events', '✦',
            ].map((item, i) => (
              <span
                key={i}
                className="text-xs tracking-widest uppercase font-inter font-medium"
                style={{ color: item === '✦' ? '#C9A740' : 'rgba(248,246,240,0.2)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
