'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedTextProps {
  children: string | ReactNode
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
  splitBy?: 'word' | 'char' | 'line'
  delay?: number
  stagger?: number
  once?: boolean
}

export default function AnimatedText({
  children,
  className = '',
  tag: Tag = 'div',
  splitBy = 'word',
  delay = 0,
  stagger = 0.06,
  once = true,
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-10% 0px' })

  if (typeof children !== 'string') {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    )
  }

  const parts = splitBy === 'char' ? children.split('') : children.split(' ')

  return (
    <Tag className={`${className} overflow-hidden`}>
      <div ref={ref} className="flex flex-wrap">
        {parts.map((part, i) => (
          <motion.span
            key={i}
            className="inline-block"
            style={{ marginRight: splitBy === 'word' ? '0.3em' : '0' }}
            initial={{ y: '110%', opacity: 0 }}
            animate={isInView ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
            transition={{
              duration: 0.75,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {part === ' ' ? '\u00A0' : part}
          </motion.span>
        ))}
      </div>
    </Tag>
  )
}

// Simple fade-up variant
export function FadeUp({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Eyebrow reveal
export function EyebrowReveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isInView ? { y: '0%' } : { y: '100%' }}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
