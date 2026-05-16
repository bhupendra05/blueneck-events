'use client'

import { useEffect, useRef } from 'react'

export function useLenis() {
  const lenisRef = useRef<unknown>(null)

  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null

    async function initLenis() {
      const Lenis = (await import('@studio-freight/lenis')).default

      lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 1,
      })

      lenisRef.current = lenis

      let animFrame: number

      function raf(time: number) {
        lenis!.raf(time)
        animFrame = requestAnimationFrame(raf)
      }

      animFrame = requestAnimationFrame(raf)

      return () => {
        cancelAnimationFrame(animFrame)
        lenis!.destroy()
      }
    }

    const cleanup = initLenis()

    return () => {
      cleanup.then((fn) => fn && fn())
    }
  }, [])

  return lenisRef
}
