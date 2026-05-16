'use client'

import { useEffect, useRef } from 'react'

type GSAPCallback = (gsap: unknown, ScrollTrigger: unknown) => (() => void) | void

export function useGSAPScrollTrigger(
  callback: GSAPCallback,
  deps: unknown[] = []
) {
  const cleanupRef = useRef<(() => void) | void | null>(null)

  useEffect(() => {
    let mounted = true

    async function setup() {
      if (!mounted) return

      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (mounted) {
        cleanupRef.current = callback(gsap, ScrollTrigger)
      }
    }

    setup()

    return () => {
      mounted = false
      if (typeof cleanupRef.current === 'function') {
        cleanupRef.current()
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
