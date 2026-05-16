// ═══════════════════════════════════════
// GSAP INITIALIZATION — CLIENT SIDE ONLY
// ═══════════════════════════════════════

let gsapInitialized = false

export async function initGSAP() {
  if (typeof window === 'undefined' || gsapInitialized) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  const { TextPlugin } = await import('gsap/TextPlugin')

  gsap.registerPlugin(ScrollTrigger, TextPlugin)

  // Set GSAP defaults
  gsap.defaults({
    ease: 'power3.out',
    duration: 0.8,
  })

  // ScrollTrigger defaults
  ScrollTrigger.defaults({
    toggleActions: 'play none none reverse',
  })

  gsapInitialized = true
  return { gsap, ScrollTrigger }
}

export async function getGSAP() {
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  return { gsap, ScrollTrigger }
}
