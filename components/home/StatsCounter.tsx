'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { EyebrowReveal } from '@/components/ui/AnimatedText'

function Counter({ target, suffix, duration = 2500 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  useEffect(() => {
    if (!isInView || started) return
    setStarted(true)

    let startTime: number | null = null

    function step(timestamp: number) {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(target * eased))
      if (progress < 1) requestAnimationFrame(step)
    }

    requestAnimationFrame(step)
  }, [isInView, started, target, duration])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

interface StatItem {
  value: number
  suffix: string
  label: string
}

export default function StatsCounter() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })
  const [stats, setStats] = useState<StatItem[]>([
    { value: 850,   suffix: '+',   label: 'Events Delivered' },
    { value: 12000, suffix: '+',   label: 'Guests Hosted' },
    { value: 9,     suffix: ' Yrs', label: 'Of Excellence' },
    { value: 98,    suffix: '%',   label: 'Client Satisfaction' },
  ])

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.stats) && data.stats.length > 0) {
          setStats(data.stats.map((s: any) => ({
            value: Number(s.value) || 0,
            suffix: s.suffix ?? '',
            label: s.label,
          })))
        } else {
          // Fallback default stats if none configured in admin
          setStats([
            { value: 850, suffix: '+', label: 'Events Delivered' },
            { value: 12000, suffix: '+', label: 'Guests Hosted' },
            { value: 9, suffix: ' Yrs', label: 'Of Excellence' },
            { value: 98, suffix: '%', label: 'Client Satisfaction' },
          ])
        }
      })
      .catch(() => {
        // Network error — show defaults
        setStats([
          { value: 850, suffix: '+', label: 'Events Delivered' },
          { value: 12000, suffix: '+', label: 'Guests Hosted' },
          { value: 9, suffix: ' Yrs', label: 'Of Excellence' },
          { value: 98, suffix: '%', label: 'Client Satisfaction' },
        ])
      })
  }, [])

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050508 0%, #0A0F1C 50%, #050508 100%)' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(13,33,55,0.5) 0%, transparent 70%)' }}
      />
      <div className="absolute top-0 left-0 right-0 gold-line" />
      <div className="absolute bottom-0 left-0 right-0 gold-line" />

      <div className="container-luxury relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <EyebrowReveal>
            <span className="text-eyebrow">Our Legacy in Numbers</span>
          </EyebrowReveal>
          <motion.h2
            className="text-headline mt-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            A Decade of{' '}
            <span className="gold-text italic">Excellence</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center relative"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {index < stats.length - 1 && (
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px hidden lg:block"
                  style={{ background: 'rgba(201,167,64,0.15)' }}
                />
              )}
              <span className="text-4xl md:text-5xl lg:text-7xl font-display font-bold" style={{ color: '#C9A740' }}>
                <Counter target={stat.value} suffix={stat.suffix} />
              </span>
              <div className="w-8 h-0.5 my-3" style={{ background: 'linear-gradient(90deg, transparent, #C9A740, transparent)' }} />
              <span className="text-xs tracking-widest uppercase font-inter font-medium" style={{ color: 'rgba(248,246,240,0.45)' }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
