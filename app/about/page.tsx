'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { EyebrowReveal, FadeUp } from '@/components/ui/AnimatedText'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [eventsCount, setEventsCount] = useState<string>('850+')
  const [heroImage, setHeroImage] = useState<string>('')
  const [storyImages, setStoryImages] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  const isTeamInView = useInView(teamRef, { once: true, margin: '-10% 0px' })
  const isTimelineInView = useInView(timelineRef, { once: true, margin: '-10% 0px' })

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  useEffect(() => {
    // Fetch team members
    fetch('/api/team')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTeamMembers(data)
      })
      .catch(() => {})

    // Fetch settings for eventsCount
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data?.stats?.length > 0) {
          const first = data.stats[0]
          setEventsCount(`${first.value}${first.suffix ?? ''}`)
        }
      })
      .catch(() => {})

    // Fetch gallery images for hero and story sections
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data: any[]) => {
        if (!Array.isArray(data) || data.length === 0) {
          // Use fallback images if gallery is empty
          setHeroImage('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80')
          setStoryImages([
            'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
            'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
          ])
          setLoaded(true)
          return
        }
        const srcs = data.filter((d) => d.src).map((d) => d.src)
        if (srcs[0]) setHeroImage(srcs[0])
        if (srcs[1] && srcs[2] && srcs[3]) {
          setStoryImages([srcs[1], srcs[2], srcs[3]])
        } else if (srcs[1] && srcs[2]) {
          setStoryImages([srcs[0], srcs[1], srcs[2]])
        } else {
          // Use fallback if not enough images
          setHeroImage(srcs[0] || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80')
          setStoryImages([
            srcs[1] || 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
            srcs[2] || 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
            srcs[3] || 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
          ])
        }
        setLoaded(true)
      })
      .catch(() => {
        // Fallback on error
        setHeroImage('https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1920&q=80')
        setStoryImages([
          'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
          'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
          'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
        ])
        setLoaded(true)
      })
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
          className="relative z-10 container-luxury full-height flex flex-col justify-center"
          style={{ opacity: heroOpacity }}
        >
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-eyebrow">Our Story</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-hero leading-none"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <span style={{ color: '#F8F6F0' }}>The Team </span>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="text-hero leading-none"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.0, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="gold-text italic">Behind The Magic</span>
              </motion.h1>
            </div>
            <motion.p
              className="text-lg max-w-xl mt-6 leading-relaxed"
              style={{ color: 'rgba(248,246,240,0.6)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
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
                <div className="flex flex-col gap-4 pt-8">
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
            <div className="overflow-hidden mt-3">
              <motion.h2
                className="text-display"
                initial={{ y: '100%' }}
                animate={isTimelineInView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                Nine Years of{' '}
                <span className="gold-text italic">Milestones</span>
              </motion.h2>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(201,167,64,0.3), transparent)' }}
            />
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`flex items-center gap-8 mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex-1">
                  <GlassmorphicCard className={`p-5 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-eyebrow block mb-2">{milestone.year}</span>
                    <h3 className="font-display font-semibold text-lg mb-2" style={{ color: '#F8F6F0' }}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgba(248,246,240,0.5)' }}>
                      {milestone.description}
                    </p>
                  </GlassmorphicCard>
                </div>
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 relative z-10"
                  style={{ background: '#C9A740', boxShadow: '0 0 15px rgba(201,167,64,0.6)' }}
                />
                <div className="flex-1" />
              </motion.div>
            ))}
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
            <div className="overflow-hidden mt-3">
              <motion.h2
                className="text-display"
                initial={{ y: '100%' }}
                animate={isTeamInView ? { y: '0%' } : {}}
                transition={{ duration: 0.9, delay: 0.1 }}
              >
                The <span className="gold-text italic">Architects</span>
              </motion.h2>
            </div>
          </div>

          {teamMembers.length > 0 && (
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
          )}

          {/* Loading skeleton while team is fetching */}
          {teamMembers.length === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1,2,3,4].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="rounded-2xl aspect-[3/4] mb-4" style={{ background: 'rgba(248,246,240,0.05)' }} />
                  <div className="h-5 w-3/4 rounded mb-2" style={{ background: 'rgba(248,246,240,0.05)' }} />
                  <div className="h-3 w-1/2 rounded" style={{ background: 'rgba(201,167,64,0.1)' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
