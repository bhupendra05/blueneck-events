'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { EyebrowReveal, FadeUp } from '@/components/ui/AnimatedText'

interface EventData {
  id: string
  label: string
  tagline: string
  description: string
  heroImage: string
  accentColor: string
  secondaryColor: string
  mood: string
  icon: string
  services: { title: string; description: string }[]
  gallery: string[]
  stats: { value: string; label: string }[]
}

interface EventPageTemplateProps {
  data: EventData
}

export default function EventPageTemplate({ data }: EventPageTemplateProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const isServicesInView = useInView(servicesRef, { once: true, margin: '-10% 0px' })
  const isGalleryInView = useInView(galleryRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0])
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.1])

  const taglineLines = data.tagline.split('\n')

  return (
    <div style={{ background: '#050508' }}>

      {/* ── HERO ────────────────────────────── */}
      <section ref={heroRef} className="relative full-height overflow-hidden">
        {/* Parallax BG */}
        <motion.div
          className="absolute inset-0"
          style={{ scale: heroScale, y: heroImgY }}
        >
          <img
            src={data.heroImage}
            alt={data.label}
            className="w-full h-full object-cover img-cinematic"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,8,1) 0%, rgba(5,5,8,0.5) 40%, rgba(5,5,8,0.3) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 60% 50% at 20% 60%, ${data.accentColor}18 0%, transparent 60%)` }} />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 container-luxury full-height flex flex-col justify-center pt-20 md:pt-0"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-3xl w-full">
            {/* Tagline */}
            {taglineLines.map((line, i) => (
              <motion.h1
                key={i}
                className="font-display font-bold leading-tight mb-2"
                style={{ fontSize: 'clamp(1.8rem, 5vw, 5.5rem)' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.35 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {i === 0 ? (
                  <span style={{ color: '#F8F6F0' }}>{line}</span>
                ) : (
                  <span
                    className="gold-text italic"
                  >
                    {line}
                  </span>
                )}
              </motion.h1>
            ))}

            {/* Description */}
            <motion.p
              className="text-sm md:text-base max-w-xl mt-4 md:mt-6 mb-6 md:mb-8 leading-relaxed"
              style={{ color: 'rgba(248,246,240,0.6)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              {data.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <MagneticButton>
                <Link href="/contact" className="btn-gold-solid">
                  <span>Plan This Event</span>
                  <ArrowRight size={14} />
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/gallery" className="btn-luxury">
                  <span>View Gallery</span>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-14 pt-6 md:pt-10 border-t"
              style={{ borderColor: `${data.accentColor}18` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              {data.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span
                    className="text-2xl md:text-3xl font-display font-bold"
                    style={{ color: data.accentColor }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs tracking-widest uppercase mt-1"
                    style={{ color: 'rgba(248,246,240,0.4)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── SERVICES ────────────────────────── */}
      <section className="section-padding" ref={servicesRef}>
        <div className="container-luxury">
          <div className="text-center mb-14">
            <EyebrowReveal delay={0.1}>
              <span className="text-eyebrow">What We Offer</span>
            </EyebrowReveal>
            <div className="overflow-hidden mt-3">
              <motion.h2
                className="text-display"
                initial={{ y: '100%' }}
                animate={isServicesInView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Our{' '}
                <span style={{ color: data.accentColor, fontStyle: 'italic' }}>
                  {data.label}
                </span>
                {' '}Services
              </motion.h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.1 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassmorphicCard
                  className="p-6 h-full group"
                  glowColor={`${data.accentColor}18`}
                >
                  <div
                    className="flex items-center gap-2 mb-4"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: `${data.accentColor}20`, border: `1px solid ${data.accentColor}40` }}
                    >
                      <Check size={12} style={{ color: data.accentColor }} />
                    </div>
                    <h3 className="font-display font-semibold text-lg" style={{ color: '#F8F6F0' }}>
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,246,240,0.5)' }}>
                    {service.description}
                  </p>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────── */}
      <section
        className="section-padding"
        ref={galleryRef}
        style={{ background: '#030305' }}
      >
        <div className="container-luxury">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
            <div>
              <EyebrowReveal delay={0.1}>
                <span className="text-eyebrow">Our Work</span>
              </EyebrowReveal>
              <div className="overflow-hidden mt-2">
                <motion.h2
                  className="text-headline"
                  initial={{ y: '100%' }}
                  animate={isGalleryInView ? { y: '0%' } : {}}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <span className="gold-text italic">{data.label}</span> Gallery
                </motion.h2>
              </div>
            </div>
            <FadeUp delay={0.2}>
              <Link
                href="/gallery"
                className="flex items-center gap-2 text-sm animated-underline group"
                style={{ color: data.accentColor }}
              >
                View All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </FadeUp>
          </div>

          {/* Masonry-style gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.gallery.map((img, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden rounded-xl group ${index === 0 || index === 3 ? 'row-span-1 aspect-square' : 'aspect-[4/3]'} ${index === 0 ? 'col-span-2 md:col-span-2 aspect-video' : ''}`}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isGalleryInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={img}
                  alt={`${data.label} ${index + 1}`}
                  className="w-full h-full object-cover img-cinematic transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to top, ${data.accentColor}40 0%, transparent 60%)` }}
                />
                {/* Zoom icon */}
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div
                    className="px-4 py-2 rounded-full text-xs font-medium tracking-wide"
                    style={{
                      background: 'rgba(5,5,8,0.8)',
                      border: `1px solid ${data.accentColor}50`,
                      color: data.accentColor,
                    }}
                  >
                    View
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA SECTION ─────────────────────── */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #050508 0%, ${data.accentColor}10 50%, #050508 100%)`,
        }}
      >
        <div className="absolute top-0 left-0 right-0 gold-line" />
        <div className="container-luxury text-center">
          <FadeUp>
            <span className="text-eyebrow block mb-4">Ready to Begin?</span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-display mb-6">
              Let&apos;s Create Your{' '}
              <span style={{ color: data.accentColor, fontStyle: 'italic' }}>
                Perfect {data.label.slice(0, -1)}
              </span>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-base max-w-lg mx-auto mb-10" style={{ color: 'rgba(248,246,240,0.5)' }}>
              Every great event begins with a conversation. Tell us your vision
              and we&apos;ll craft something extraordinary.
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Link href="/contact" className="btn-gold-solid">
                  <span>Start Planning Today</span>
                  <ArrowRight size={14} />
                </Link>
              </MagneticButton>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
