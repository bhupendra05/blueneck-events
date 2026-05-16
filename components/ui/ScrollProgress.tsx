'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const [scrollY, setScrollY] = useState(0)
  const scaleX = useSpring(0, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? window.scrollY / total : 0
      setScrollY(progress)
      scaleX.set(progress)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scaleX])

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: '100%' }}
    />
  )
}
