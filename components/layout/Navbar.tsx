'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Weddings', href: '/weddings' },
  { label: 'Corporate', href: '/corporate' },
  { label: 'Social Events', href: '/social' },
  { label: 'Birthdays', href: '/birthdays' },
  { label: 'Sports', href: '/sports' },
  {
    label: 'More',
    href: '#',
    children: [
      { label: 'Luxury Galas', href: '/galas' },
      { label: 'Product Launches', href: '/launches' },
      { label: 'Concerts & Shows', href: '/concerts' },
      { label: 'Destination Events', href: '/destinations' },
    ],
  },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setActiveDropdown(null)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[9000] transition-all duration-500"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: scrolled
            ? 'rgba(5,5,8,0.92)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(201,167,64,0.1)'
            : '1px solid transparent',
        }}
      >
        <div className="container-luxury flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Blue neck logo mark */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1A4A7A, #0D2137)',
                  border: '1px solid rgba(201,167,64,0.3)',
                }}
              >
                <span className="text-xs font-bold tracking-wider" style={{ color: '#C9A740' }}>BN</span>
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span
                className="text-lg font-display font-bold tracking-wide"
                style={{ color: '#F8F6F0' }}
              >
                Blue Neck
              </span>
              <span
                className="text-[10px] tracking-[0.2em] font-inter font-medium uppercase"
                style={{ color: '#C9A740' }}
              >
                Events
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {link.children ? (
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-sm animated-underline transition-colors duration-300"
                    style={{
                      color: activeDropdown === link.label ? '#C9A740' : 'rgba(248,246,240,0.75)',
                      fontFamily: 'var(--font-inter)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-300"
                      style={{ transform: activeDropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="px-4 py-2 text-sm font-medium animated-underline transition-colors duration-300 block"
                    style={{
                      color: pathname === link.href ? '#C9A740' : 'rgba(248,246,240,0.75)',
                      fontFamily: 'var(--font-inter)',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {link.label}
                  </Link>
                )}

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      ref={dropdownRef}
                      className="absolute top-full left-0 mt-2 w-52 glass-dark rounded-xl overflow-hidden"
                      style={{ transformOrigin: 'top', border: '1px solid rgba(201,167,64,0.15)' }}
                      initial={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      animate={{ opacity: 1, y: 0, scaleY: 1 }}
                      exit={{ opacity: 0, y: -10, scaleY: 0.9 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {link.children.map((child, i) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className="block px-5 py-3 text-sm transition-all duration-200"
                          style={{
                            color: 'rgba(248,246,240,0.7)',
                            fontFamily: 'var(--font-inter)',
                            borderBottom: i < link.children!.length - 1 ? '1px solid rgba(201,167,64,0.06)' : 'none',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#C9A740'
                            e.currentTarget.style.paddingLeft = '1.5rem'
                            e.currentTarget.style.background = 'rgba(201,167,64,0.05)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'rgba(248,246,240,0.7)'
                            e.currentTarget.style.paddingLeft = '1.25rem'
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="btn-luxury text-xs"
            >
              <span>Book an Event</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
            style={{
              background: menuOpen ? 'rgba(201,167,64,0.1)' : 'transparent',
              border: '1px solid rgba(201,167,64,0.2)',
            }}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <X size={20} color="#C9A740" /> : <Menu size={20} color="#C9A740" />}
            </motion.div>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[8999] lg:hidden flex flex-col cursor-auto"
            style={{ background: 'rgba(5,5,8,0.98)', backdropFilter: 'blur(30px)' }}
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 2.5rem) 2.5rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 2.5rem) 2.5rem)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid-pattern absolute inset-0 opacity-20" />

            <div className="flex flex-col justify-center h-full px-8 gap-2">
              {NAV_LINKS.map((link, i) => (
                <div key={link.label}>
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {link.children ? (
                      <div className="py-3">
                        <span
                          className="text-2xl font-display"
                          style={{ color: 'rgba(248,246,240,0.4)', fontSize: '0.9rem' }}
                        >
                          {link.label}
                        </span>
                        <div className="mt-2 flex flex-col gap-1 ml-4">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="text-lg font-display py-1"
                              style={{ color: 'rgba(248,246,240,0.7)' }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="block py-3 text-3xl font-display font-semibold transition-colors"
                        style={{
                          color: pathname === link.href ? '#C9A740' : '#F8F6F0',
                        }}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                  <div className="gold-line opacity-10" />
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-8"
              >
                <Link href="/contact" className="btn-gold-solid w-full justify-center">
                  <span>Book Your Event</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
