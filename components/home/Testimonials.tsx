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

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
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
        className="absolute top-12 left-1/2 -translate-x-1/2 font-display text-[20rem] leading-none pointer-events-none select-none"
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
          <div className="overflow-hidden mt-3">
            <motion.h2
              className="text-display"
              initial={{ y: '100%' }}
              animate={isInView ? { y: '0%' } : {}}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Words That{' '}
              <span className="gold-text italic">Move Us</span>
            </motion.h2>
          </div>
        </div>

        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto">
          {testimonials.length === 0 && (
            <div className="text-center animate-pulse">
              <div className="flex justify-center gap-1 mb-8">
                {[1,2,3,4,5].map((i) => <div key={i} className="w-5 h-5 rounded" style={{ background: 'rgba(201,167,64,0.2)' }} />)}
              </div>
              <div className="h-8 w-3/4 mx-auto rounded mb-4" style={{ background: 'rgba(248,246,240,0.05)' }} />
              <div className="h-8 w-1/2 mx-auto rounded mb-10" style={{ background: 'rgba(248,246,240,0.05)' }} />
            </div>
          )}
          <AnimatePresence mode="wait">
            {active && <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
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

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? '24px' : '6px',
                    height: '6px',
                    background: i === current ? '#C9A740' : 'rgba(201,167,64,0.25)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
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
