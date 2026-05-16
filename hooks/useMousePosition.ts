'use client'

import { useState, useEffect } from 'react'

export interface MousePosition {
  x: number
  y: number
}

export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({ x: -100, y: -100 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
