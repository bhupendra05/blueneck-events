'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EyebrowReveal, FadeUp } from '@/components/ui/AnimatedText'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

const milestones = [
  { year: '2015', title: 'Founded in Mumbai', description: 'Blue Neck Events was born from a vision to redefine event management in India.' },
  { year: '2017', title: 'First Luxury Wedding', description: 'Our first destination wedding in Udaipur set the benchmark for what was to come.' },
  { year: '2019', title: 'Corporate Division Launched', description: 'Expanded into corporate events, serving Fortune 500 companies across India.' },
  { year: '2021', title: 'Industry Award', description: 'Named Top 10 Event Management Company in India by Event Management India Awards.' },
  { year: '2023', title: 'Global Expansion', description: 'Launched destination event services covering 20+ countries worldwide.' },
  { year: '2024', title: 'Digital Innovation', description: 'Pioneered AI-assisted event planning tools, setting new industry standards.' },
]

interface TeamMember {
  _id?: string
  name: string
  role: string
  image: string
  bio: string
}

const FALLBACK_HERO = '/images/fallbacks/photo_1511795409834-ef04bbd61622.jpg'
const FALLBACK_STORY = [
  '/images/fallbacks/photo_1519167758481-83f550bb49b3.jpg',
  '/images/fallbacks/photo_1552664730-d307ca884978.jpg',
  '/images/fallbacks/photo_1514525253161-7a6c1cc1a1a6.jpg',
]
const FALLBACK_TEAM: TeamMember[] = [
  {
    name: 'Arjun Mehta',
    role: 'Founder & Creative Director',
    image: '/images/fallbacks/photo_1519741349-a57a0f88d50a.jpg',
    bio: 'With 15+ years in luxury event design, Arjun brings visionary thinking to every occasion.',
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Weddings',
    image: '/images/fallbacks/photo_1540575467063-178a50c2df87.jpg',
    bio: 'Priya has curated over 300 destination weddings across India and beyond.',
  },
  {
    name: 'Rohan Kapoor',
    role: 'Corporate Events Lead',
    image: '/images/fallbacks/photo_1505373877841-8d25f7d46678.jpg',
    bio: 'Rohan specializes in high-stakes corporate productions for Fortune 500 brands.',
  },
  {
    name: 'Neha Patel',
    role: 'Production & Logistics',
    image: '/images/fallbacks/photo_1470229722913-7c0e2dbbafd3.jpg',
    bio: 'Neha ensures every moving part works flawlessly behind the scenes.',
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(FALLBACK_TEAM)
  const [eventsCount, setEventsCount] = useState<string>('850+')
  const [heroImage, setHeroImage] = useState<string>(FALLBACK_HERO)
  const [storyImages, setStoryImages] = useState<string[]>(FALLBACK_STORY)
  const [loaded, setLoaded] = useState(true)

  const isTeamInView = useInView(teamRef, { once: true, margin: '-10% 0px' })
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    fetch('/api/team')
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data) && data.length > 0) setTeamMembers(data) })
      .catch(() => {})

    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data?.stats?.length > 0) {
          const first = data.stats[0]
          setEventsCount(`${first.value}${first.suffix ?? ''}`)
        }
      })
      .catch(() => {})

    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data: any[]) => {
        if (!Array.isArray(data) || data.length === 0) return // keep local fallbacks
        const srcs = data.filter((d) => d.src).map((d) => d.src)
        if (srcs[0]) setHeroImage(srcs[0])
        if (srcs[1] && srcs[2] && srcs[3]) setStoryImages([srcs[1], srcs[2], srcs[3]])
      })
      .catch(() => {})
  }, [])

  return (
    <div style={{ background: '#050508' }}>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative full-height overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: 1.1 }}>
          <img
            src={heroImage}
            alt="About Blue Neck Events"
            className="w-full h-full object-cover img-cinematic"
          />
        </motion.div>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,8,1) 0%, rgba(5,5,8,0.5) 40%, rgba(5,5,8,0.4) 100%)', zIndex: 2 }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 60% at 30% 50%, rgba(13,33,55,0.5) 0%, transparent 60%)', zIndex: 2 }} />

        <motion.div
          className="relative z-10 container-luxury full-height flex flex-col justify-center pt-20 md:pt-0"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-3xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <span className="text-eyebrow">Our Story</span>
            </motion.div>

            <motion.h1
              className="font-display font-bold leading-tight mb-2"
              style={{ fontSize: 'clamp(2rem, 5vw, 6rem)', color: '#F8F6F0' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              The Team
            </motion.h1>

            <motion.h1
              className="font-display font-bold leading-tight italic gold-text"
              style={{ fontSize: 'clamp(2rem, 5vw, 6rem)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              Behind The Magic
            </motion.h1>

            <motion.p
              className="text-sm md:text-base max-w-xl mt-6 leading-relaxed"
              style={{ color: 'rgba(248,246,240,0.6)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Since 2015, we have been on a singular mission: to create events
              that transcend expectations and live permanently in memory.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="section-padding">
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div>
                <EyebrowReveal>
                  <span className="text-eyebrow">Who We Are</span>
                </EyebrowReveal>
                <h2 className="text-display mt-4 mb-6">
                  We Don&apos;t Plan Events.
                  <br />
                  <span className="gold-text italic">We Craft Legends.</span>
                </h2>
                <p className="text-base leading-relaxed mb-5" style={{ color: 'rgba(248,246,240,0.55)' }}>
                  Blue Neck Events was founded on a simple but powerful belief: that every
                  event has the potential to be genuinely extraordinary. Not just impressive
                  — but deeply moving. Not just well-organized — but transformative.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(248,246,240,0.55)' }}>
                  Over nine years and {eventsCount} events later, that belief hasn&apos;t
                  changed. It&apos;s only grown stronger. Every wedding, concert, corporate
                  summit, and birthday party carries our signature — obsessive attention to
                  detail and relentless pursuit of the extraordinary.
                </p>
                <Link href="/contact" className="btn-luxury text-xs inline-flex">
                  <span>Work With Us</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] relative overflow-hidden rounded-2xl bg-[#0A0F1C]">
                  <img
                    src={storyImages[0]}
                    alt="Event highlight"
                    className="w-full h-full object-cover img-cinematic"
                  />
                </div>
                <div className="flex flex-col gap-4 pt-0 md:pt-8">
                  <div className="aspect-square relative overflow-hidden rounded-2xl bg-[#0A0F1C]">
                    <img
                      src={storyImages[1]}
                      alt="Event highlight"
                      className="w-full h-full object-cover img-cinematic"
                    />
                  </div>
                  <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-[#0A0F1C]">
                    <img
                      src={storyImages[2]}
                      alt="Event highlight"
                      className="w-full h-full object-cover img-cinematic"
                    />
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section
        className="section-padding"
        style={{ background: 'linear-gradient(180deg, #050508 0%, #080C14 100%)' }}
        ref={timelineRef}
      >
        <div className="container-luxury">
          <div className="text-center mb-16">
            <EyebrowReveal>
              <span className="text-eyebrow">Our Journey</span>
            </EyebrowReveal>
            <motion.h2
              className="text-display mt-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isTimelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              Nine Years of{' '}
              <span className="gold-text italic">Milestones</span>
            </motion.h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            {/* Center vertical line — desktop only */}
            <div
              className="hidden md:block absolute top-0 bottom-0 w-px"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(to bottom, transparent 0%, rgba(201,167,64,0.5) 15%, rgba(201,167,64,0.5) 85%, transparent 100%)',
              }}
            />

            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.13, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-8 md:mb-0 md:grid md:grid-cols-2 md:gap-0 relative"
                >
                  {/* LEFT column */}
                  <div className="hidden md:flex md:justify-end md:pr-12 md:pb-12">
                    {isLeft && (
                      <GlassmorphicCard className="p-6 w-full max-w-sm text-right">
                        <span className="text-eyebrow block mb-2">{milestone.year}</span>
                        <h3 className="font-display font-semibold text-xl mb-2" style={{ color: '#F8F6F0' }}>
                          {milestone.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,246,240,0.55)' }}>
                          {milestone.description}
                        </p>
                      </GlassmorphicCard>
                    )}
                  </div>

                  {/* RIGHT column */}
                  <div className="hidden md:flex md:justify-start md:pl-12 md:pb-12">
                    {!isLeft && (
                      <GlassmorphicCard className="p-6 w-full max-w-sm text-left">
                        <span className="text-eyebrow block mb-2">{milestone.year}</span>
                        <h3 className="font-display font-semibold text-xl mb-2" style={{ color: '#F8F6F0' }}>
                          {milestone.title}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,246,240,0.55)' }}>
                          {milestone.description}
                        </p>
                      </GlassmorphicCard>
                    )}
                  </div>

                  {/* Center dot — absolute on desktop */}
                  <div
                    className="hidden md:flex absolute top-6 items-center justify-center z-10"
                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{
                        background: '#C9A740',
                        boxShadow: '0 0 0 6px rgba(201,167,64,0.15), 0 0 20px rgba(201,167,64,0.5)',
                      }}
                    />
                  </div>

                  {/* MOBILE: left-rail single column */}
                  <div className="md:hidden flex gap-4 items-start">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div
                        className="w-4 h-4 rounded-full mt-1 flex-shrink-0"
                        style={{ background: '#C9A740', boxShadow: '0 0 12px rgba(201,167,64,0.6)' }}
                      />
                      {index < milestones.length - 1 && (
                        <div className="w-px flex-1 mt-2 mb-2" style={{ minHeight: '40px', background: 'rgba(201,167,64,0.25)' }} />
                      )}
                    </div>
                    <GlassmorphicCard className="p-5 flex-1 mb-6 text-left">
                      <span className="text-eyebrow block mb-1">{milestone.year}</span>
                      <h3 className="font-display font-semibold text-lg mb-2" style={{ color: '#F8F6F0' }}>
                        {milestone.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,246,240,0.55)' }}>
                        {milestone.description}
                      </p>
                    </GlassmorphicCard>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section-padding" ref={teamRef}>
        <div className="container-luxury">
          <div className="text-center mb-14">
            <EyebrowReveal>
              <span className="text-eyebrow">Meet The Team</span>
            </EyebrowReveal>
            <motion.h2
              className="text-display mt-3"
              initial={{ opacity: 0, y: 30 }}
              animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.1 }}
            >
              The <span className="gold-text italic">Architects</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
                <motion.div
                  key={member._id ?? member.name}
                  initial={{ opacity: 0, y: 60 }}
                  animate={isTeamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[3/4] mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover img-cinematic transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.8) 0%, transparent 50%)' }}
                    />
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(to top, rgba(13,33,55,0.7) 0%, rgba(5,5,8,0.4) 100%)' }}
                    />
                    <div className="absolute bottom-4 left-4 right-4 z-10">
                      <p
                        className="text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ color: 'rgba(248,246,240,0.8)' }}
                      >
                        {member.bio}
                      </p>
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-lg" style={{ color: '#F8F6F0' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs tracking-wide mt-1" style={{ color: '#C9A740' }}>
                    {member.role}
                  </p>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OFFICE LOCATION ── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #050508 0%, #080C14 60%, #050508 100%)' }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201,167,64,0.04) 0%, transparent 65%)' }}
        />
        <div className="container-luxury relative z-10">
          <div className="text-center mb-12">
            <EyebrowReveal>
              <span className="text-eyebrow">Our Office</span>
            </EyebrowReveal>
            <div className="overflow-hidden mt-3">
              <FadeUp>
                <h2 className="text-display">
                  Come <span className="gold-text italic">Find Us</span>
                </h2>
              </FadeUp>
            </div>
            <FadeUp delay={0.15}>
              <p className="text-sm mt-4 max-w-md mx-auto" style={{ color: 'rgba(248,246,240,0.45)' }}>
                We&apos;d love to meet you in person. Drop by our studio or reach us any time.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {/* Address */}
            <FadeUp delay={0.1} className="lg:col-span-2">
              <GlassmorphicCard className="p-7 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(201,167,64,0.12)', border: '1px solid rgba(201,167,64,0.25)' }}
                >
                  <MapPin size={22} style={{ color: '#C9A740' }} />
                </div>
                <span className="text-eyebrow block mb-2" style={{ fontSize: '0.65rem' }}>Our Studio</span>
                <h3 className="font-display font-semibold text-xl mb-3" style={{ color: '#F8F6F0' }}>
                  Mumbai, India
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(248,246,240,0.55)' }}>
                  {SITE_CONFIG.address}
                </p>
                <a
                  href="https://maps.google.com/?q=Mumbai,Maharashtra,India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-xs font-medium animated-underline"
                  style={{ color: '#C9A740' }}
                >
                  Open in Maps <ArrowRight size={12} />
                </a>
              </GlassmorphicCard>
            </FadeUp>

            {/* Phone */}
            <FadeUp delay={0.2}>
              <GlassmorphicCard className="p-7 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(201,167,64,0.12)', border: '1px solid rgba(201,167,64,0.25)' }}
                >
                  <Phone size={22} style={{ color: '#C9A740' }} />
                </div>
                <span className="text-eyebrow block mb-2" style={{ fontSize: '0.65rem' }}>Call Us</span>
                <h3 className="font-display font-semibold text-base mb-1" style={{ color: '#F8F6F0' }}>
                  {SITE_CONFIG.phone}
                </h3>
                <p className="text-xs" style={{ color: 'rgba(248,246,240,0.4)' }}>Mon – Sat, 10am – 7pm</p>
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 mt-5 text-xs font-medium animated-underline"
                  style={{ color: '#C9A740' }}
                >
                  Call Now <ArrowRight size={12} />
                </a>
              </GlassmorphicCard>
            </FadeUp>

            {/* Email */}
            <FadeUp delay={0.3}>
              <GlassmorphicCard className="p-7 h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(201,167,64,0.12)', border: '1px solid rgba(201,167,64,0.25)' }}
                >
                  <Mail size={22} style={{ color: '#C9A740' }} />
                </div>
                <span className="text-eyebrow block mb-2" style={{ fontSize: '0.65rem' }}>Write To Us</span>
                <h3 className="font-display font-semibold text-base mb-1" style={{ color: '#F8F6F0' }}>
                  {SITE_CONFIG.email}
                </h3>
                <p className="text-xs" style={{ color: 'rgba(248,246,240,0.4)' }}>Reply within 24 hours</p>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="inline-flex items-center gap-2 mt-5 text-xs font-medium animated-underline"
                  style={{ color: '#C9A740' }}
                >
                  Send Email <ArrowRight size={12} />
                </a>
              </GlassmorphicCard>
            </FadeUp>
          </div>

          {/* CTA strip */}
          <FadeUp delay={0.4}>
            <div className="mt-10 text-center">
              <Link href="/contact" className="btn-gold-solid inline-flex">
                <span>Book a Meeting</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  )
}
