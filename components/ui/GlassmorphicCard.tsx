'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  tilt?: boolean
  glowColor?: string
  onClick?: () => void
}

export default function GlassmorphicCard({
  children,
  className = '',
  tilt = true,
  glowColor = 'rgba(201,167,64,0.15)',
  onClick,
}: GlassmorphicCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], ['8deg', '-8deg']), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], ['-8deg', '8deg']), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`glass relative overflow-hidden rounded-2xl ${className}`}
      style={tilt ? { rotateX, rotateY, transformStyle: 'preserve-3d' } : {}}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{
        borderColor: 'rgba(201,167,64,0.3)',
        boxShadow: `0 25px 50px rgba(0,0,0,0.4), 0 0 30px ${glowColor}`,
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Gradient shimmer on hover */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${glowColor} 0%, transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
