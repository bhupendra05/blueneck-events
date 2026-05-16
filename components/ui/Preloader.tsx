'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Simulate progressive loading
    let current = 0
    const speeds = [
      { target: 30, delay: 40 },
      { target: 70, delay: 25 },
      { target: 90, delay: 60 },
      { target: 100, delay: 30 },
    ]

    let speedIndex = 0

    function tick() {
      if (current >= 100) {
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 800)
        }, 300)
        return
      }

      const { target, delay } = speeds[speedIndex] || speeds[speeds.length - 1]
      if (current >= target && speedIndex < speeds.length - 1) {
        speedIndex++
      }

      current = Math.min(current + 1, 100)
      setProgress(current)
      intervalRef.current = setTimeout(tick, delay)
    }

    tick()

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current)
    }
  }, [onComplete])

  const words = ['BLUE', 'NECK', 'EVENTS']

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#050508' }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Grid pattern background */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 60% 40% at 50% 50%, rgba(26,74,122,0.15) 0%, transparent 70%)`,
            }}
          />

          {/* Logo text reveal */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="flex gap-4 md:gap-6 overflow-hidden">
              {words.map((word, i) => (
                <motion.div
                  key={word}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="overflow-hidden"
                >
                  <span
                    className="block text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-wider"
                    style={{
                      color: i === 0 ? '#1A4A7A' : i === 1 ? '#C9A740' : '#F8F6F0',
                      letterSpacing: '0.15em',
                    }}
                  >
                    {word}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-eyebrow"
              style={{ color: 'rgba(201,167,64,0.7)' }}
            >
              Where Moments Become Legends
            </motion.p>

            {/* Gold divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-32 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #C9A740, transparent)' }}
            />
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 md:w-64">
            <div className="flex justify-between mb-2">
              <span className="text-xs font-inter tracking-widest" style={{ color: 'rgba(201,167,64,0.4)' }}>
                LOADING
              </span>
              <span className="text-xs font-inter" style={{ color: 'rgba(201,167,64,0.7)' }}>
                {progress}%
              </span>
            </div>
            <div
              className="h-px w-full"
              style={{ background: 'rgba(201,167,64,0.15)' }}
            >
              <motion.div
                className="h-full"
                style={{ background: 'linear-gradient(90deg, #0D2137, #C9A740)' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 text-xs tracking-widest opacity-30 font-inter" style={{ color: '#C9A740' }}>
            EST. 2015
          </div>
          <div className="absolute top-8 right-8 text-xs tracking-widest opacity-30 font-inter" style={{ color: '#C9A740' }}>
            MUMBAI, INDIA
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
