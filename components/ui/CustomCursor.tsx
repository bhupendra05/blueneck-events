'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) return // No custom cursor on mobile

    const dot = cursorDotRef.current
    const ring = cursorRingRef.current
    if (!dot || !ring) return

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleHoverStart = () => setIsHovering(true)
    const handleHoverEnd = () => setIsHovering(false)

    // Track hoverable elements
    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover], .btn-luxury, .btn-gold-solid')
    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    // Smooth ring follow with lerp
    function animate() {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1

      if (dot) {
        dot.style.left = `${mouseX}px`
        dot.style.top = `${mouseY}px`
      }

      if (ring) {
        ring.style.left = `${ringX}px`
        ring.style.top = `${ringY}px`
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [])

  return (
    <div className="custom-cursor hidden md:block" aria-hidden="true">
      {/* Dot — snaps immediately */}
      <div
        ref={cursorDotRef}
        className="fixed pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2"
        style={{ transition: 'none' }}
      >
        <div
          className="rounded-full transition-all duration-150"
          style={{
            width: isHovering ? '6px' : '4px',
            height: isHovering ? '6px' : '4px',
            background: '#C9A740',
            boxShadow: '0 0 8px rgba(201,167,64,0.8)',
          }}
        />
      </div>

      {/* Ring — follows with lag */}
      <div
        ref={cursorRingRef}
        className="fixed pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2"
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isClicking ? '28px' : isHovering ? '48px' : '36px',
            height: isClicking ? '28px' : isHovering ? '48px' : '36px',
            borderColor: isHovering ? 'rgba(201,167,64,0.9)' : 'rgba(201,167,64,0.45)',
            background: isHovering ? 'rgba(201,167,64,0.06)' : 'transparent',
            boxShadow: isHovering ? '0 0 20px rgba(201,167,64,0.3)' : 'none',
          }}
        />
      </div>
    </div>
  )
}
