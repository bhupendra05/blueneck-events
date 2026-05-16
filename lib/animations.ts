// ═══════════════════════════════════════
// BLUE NECK EVENTS — ANIMATION PRESETS
// ═══════════════════════════════════════

import type { Variants } from 'framer-motion'

// ─── FRAMER MOTION VARIANTS ─────────────────────────────────

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Staggered container for child animations
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

// Word-by-word text reveal
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 20 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Clip path reveal (curtain effect)
export const curtainReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  visible: {
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 1.0,
      ease: [0.77, 0, 0.175, 1],
    },
  },
}

// Image zoom on hover
export const imageHover: Variants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Card hover lift
export const cardHover: Variants = {
  rest: { y: 0, boxShadow: '0 0 0px rgba(201,167,64,0)' },
  hover: {
    y: -10,
    boxShadow: '0 30px 60px rgba(201,167,64,0.2)',
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Page transition variants
export const pageEnter: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// Overlay wipe transition
export const wipeTransition: Variants = {
  initial: { scaleY: 0, transformOrigin: 'bottom' },
  animate: { scaleY: 1, transformOrigin: 'bottom', transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } },
  exit: { scaleY: 0, transformOrigin: 'top', transition: { duration: 0.5, ease: [0.77, 0, 0.175, 1] } },
}

// Counter number animation config
export const counterConfig = {
  duration: 2.5,
  ease: 'easeOut' as const,
}

// ─── GSAP HELPER CONFIGS ─────────────────────────────────────

export const gsapDefaults = {
  ease: 'power3.out',
  duration: 0.8,
}

export const gsapSlow = {
  ease: 'power2.inOut',
  duration: 1.4,
}

export const gsapCinematic = {
  ease: 'expo.inOut',
  duration: 1.6,
}

// ScrollTrigger default config
export const scrollTriggerDefaults = {
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse' as const,
}

export const scrollTriggerPinned = {
  start: 'top top',
  end: '+=500',
  scrub: 1,
  pin: true,
}

// ─── UTILITY FUNCTIONS ─────────────────────────────────────

export function splitTextIntoWords(text: string): string[] {
  return text.split(' ')
}

export function splitTextIntoChars(text: string): string[] {
  return text.split('')
}

export function buildStaggerDelay(index: number, stagger: number = 0.1): number {
  return index * stagger
}
