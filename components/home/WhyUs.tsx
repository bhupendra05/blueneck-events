'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Diamond, Clock, Users, Sparkles, Award, Globe } from 'lucide-react'
import { FadeUp, EyebrowReveal } from '@/components/ui/AnimatedText'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'
import MagneticButton from '@/components/ui/MagneticButton'
import { useState, useEffect } from 'react'

const features = [
  {
    icon: Diamond,
    title: 'Unmatched Luxury',
    description: 'Every detail is crafted with the precision of a jeweler. We settle for nothing less than extraordinary.',
    color: '#C9A740',
  },
  {
    icon: Clock,
    title: 'Flawless Execution',
    description: 'From planning to the final toast — zero compromises. Your event runs like a Swiss timepiece.',
    color: '#2A6BB0',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: '50+ expert professionals solely focused on making your vision come alive, seamlessly.',
    color: '#9B59B6',
  },
  {
    icon: Sparkles,
    title: 'Creative Mastery',
    description: 'Award-winning designers who transform ordinary spaces into cinematic environments.',
    color: '#C9A740',
  },
  {
    icon: Award,
    title: 'Industry Recognition',
    description: 'Recipient of India\'s Top 10 Event Management Company for 4 consecutive years.',
    color: '#E74C3C',
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Partnerships with premium vendors across 20+ countries for destination events.',
    color: '#1ABC9C',
  },
]

export default function WhyUs() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const sectionRef = useRef<HTMLElement>(null)
  const [bgImage, setBgImage] = useState('')

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          // Use the first weddings or galas image
          const preferred = data.find((d) => d.category === 'weddings' || d.category === 'galas')
          setBgImage((preferred || data[0]).src)
        }
      })
      .catch(() => {})
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden" style={{ background: '#050508' }}>
      {/* Parallax grid */}
      <motion.div
        className="absolute inset-0 grid-pattern"
        style={{ y: bgY, opacity: 0.4 }}
      />

      {/* Blue glow top-right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(26,74,122,0.15) 0%, transparent 60%)',
          transform: 'translate(30%, -30%)',
        }}
      />

      <div className="container-luxury relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — Text */}
          <div>
            <EyebrowReveal delay={0.1}>
              <span className="text-eyebrow">Why Blue Neck Events</span>
            </EyebrowReveal>

            <motion.h2
              className="text-display mt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              The Standard
              <br />
              <span className="gold-text italic">Others Aspire</span>
              <br />
              To Reach.
            </motion.h2>

            <FadeUp delay={0.35} className="mt-6">
              <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(248,246,240,0.55)' }}>
                For nearly a decade, we&apos;ve been redefining what events can be.
                Not just well-organized occasions, but immersive experiences that
                people carry in their hearts forever.
              </p>
            </FadeUp>

            <FadeUp delay={0.5} className="mt-8">
              <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(248,246,240,0.55)' }}>
                When you choose Blue Neck Events, you choose a partner who
                obsesses over every candle, every moment, every memory.
              </p>
            </FadeUp>

            <FadeUp delay={0.65} className="mt-10">
              <MagneticButton>
                <Link href="/about" className="btn-luxury text-xs inline-flex">
                  <span>Our Story</span>
                </Link>
              </MagneticButton>
            </FadeUp>

            {/* Large image */}
            <motion.div
              className="mt-12 relative overflow-hidden rounded-2xl aspect-video"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {bgImage && (
                <img
                  src={bgImage}
                  alt="Blue Neck Events"
                  className="w-full h-full object-cover img-cinematic"
                />
              )}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.7) 0%, transparent 60%)' }}
              />
              {/* Corner badge */}
              <div
                className="absolute bottom-5 left-5 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(5,5,8,0.8)',
                  border: '1px solid rgba(201,167,64,0.3)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="text-xs font-inter font-medium" style={{ color: '#C9A740' }}>
                  📍 Mumbai, India
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right — Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.1 + index * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <GlassmorphicCard
                    className="p-5 h-full"
                    glowColor={`${feature.color}22`}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                      style={{
                        background: `${feature.color}15`,
                        border: `1px solid ${feature.color}30`,
                      }}
                    >
                      <Icon size={20} style={{ color: feature.color }} />
                    </div>
                    <h3
                      className="font-display font-semibold text-base mb-2"
                      style={{ color: '#F8F6F0' }}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-xs leading-relaxed" style={{ color: 'rgba(248,246,240,0.5)' }}>
                      {feature.description}
                    </p>
                  </GlassmorphicCard>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
