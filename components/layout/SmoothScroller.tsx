'use client'

import { ReactNode, useEffect } from 'react'
import { useLenis } from '@/hooks/useLenis'

interface SmoothScrollerProps {
  children: ReactNode
}

export default function SmoothScroller({ children }: SmoothScrollerProps) {
  useLenis()
  return <>{children}</>
}
