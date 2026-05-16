'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { FadeUp } from '@/components/ui/AnimatedText'

interface SiteConfig {
  name: string
  description: string
  email: string
  phone: string
  address: string
  instagram: string
  facebook: string
  founded: number
}

interface EventLink {
  id: string
  label: string
  href: string
  icon: string
}

const defaultConfig: SiteConfig = {
  name: 'Blue Neck Events',
  description: 'Premium event management crafting extraordinary experiences.',
  email: 'hello@blueneckevents.com',
  phone: '+91 98765 43210',
  address: 'Mumbai, Maharashtra, India',
  instagram: 'https://instagram.com/blueneckevents',
  facebook: 'https://facebook.com/blueneckevents',
  founded: 2015,
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [eventLinks, setEventLinks] = useState<EventLink[]>([])

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.name) {
          setConfig({
            name: data.name || defaultConfig.name,
            description: data.description || defaultConfig.description,
            email: data.email || defaultConfig.email,
            phone: data.phone || defaultConfig.phone,
            address: data.address || defaultConfig.address,
            instagram: data.instagram || defaultConfig.instagram,
            facebook: data.facebook || defaultConfig.facebook,
            founded: data.founded || defaultConfig.founded,
          })
        }
      })
      .catch(() => {})

    fetch('/api/events')
      .then((r) => r.json())
      .then((data: any[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setEventLinks(data.slice(0, 6).map((e) => ({
            id: e.id,
            label: e.label,
            href: e.href || `/${e.id}`,
            icon: e.icon || '✦',
          })))
        }
      })
      .catch(() => {})
  }, [])

  const socialLinks = [
    { icon: <Instagram size={18} />, href: config.instagram, label: 'Instagram' },
    { icon: <Facebook size={18} />, href: config.facebook, label: 'Facebook' },
  ]

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#030305', borderTop: '1px solid rgba(201,167,64,0.08)' }}
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #C9A740, transparent)' }}
      />

      <div className="container-luxury relative z-10 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <FadeUp delay={0}>
              <Link href="/" className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1A4A7A, #0D2137)', border: '1px solid rgba(201,167,64,0.3)' }}
                >
                  <span className="text-sm font-bold tracking-wider" style={{ color: '#C9A740' }}>BN</span>
                </div>
                <div>
                  <div className="text-xl font-display font-bold" style={{ color: '#F8F6F0' }}>{config.name.split(' ')[0]} {config.name.split(' ')[1]}</div>
                  <div className="text-[10px] tracking-[0.2em] uppercase font-inter" style={{ color: '#C9A740' }}>
                    {config.name.split(' ').slice(2).join(' ') || 'Events'}
                  </div>
                </div>
              </Link>
              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(248,246,240,0.45)' }}>
                {config.description}
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ background: 'rgba(201,167,64,0.08)', border: '1px solid rgba(201,167,64,0.15)', color: 'rgba(201,167,64,0.6)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(201,167,64,0.15)'; e.currentTarget.style.color = '#C9A740'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(201,167,64,0.08)'; e.currentTarget.style.color = 'rgba(201,167,64,0.6)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Our Events */}
          <div>
            <FadeUp delay={0.1}>
              <h4 className="text-eyebrow mb-6">Our Events</h4>
              <ul className="flex flex-col gap-3">
                {eventLinks.map((event) => (
                  <li key={event.id}>
                    <Link
                      href={event.href}
                      className="text-sm flex items-center gap-2 transition-all duration-200 group"
                      style={{ color: 'rgba(248,246,240,0.45)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A740' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,246,240,0.45)' }}
                    >
                      <span>{event.icon}</span>
                      <span>{event.label}</span>
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Quick Links */}
          <div>
            <FadeUp delay={0.15}>
              <h4 className="text-eyebrow mb-6">Explore</h4>
              <ul className="flex flex-col gap-3">
                {[
                  { label: 'Gallery', href: '/gallery' },
                  { label: 'About Us', href: '/about' },
                  { label: 'Contact', href: '/contact' },
                  { label: 'Book an Event', href: '/contact' },
                  { label: 'Destination Events', href: '/destinations' },
                  { label: 'Galas & Awards', href: '/galas' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm flex items-center gap-2 transition-all duration-200 group"
                      style={{ color: 'rgba(248,246,240,0.45)' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A740' }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,246,240,0.45)' }}
                    >
                      <span className="w-1 h-1 rounded-full bg-gold opacity-40" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Contact */}
          <div>
            <FadeUp delay={0.2}>
              <h4 className="text-eyebrow mb-6">Get In Touch</h4>
              <ul className="flex flex-col gap-4">
                <li>
                  <a href={`mailto:${config.email}`} className="flex items-start gap-3 text-sm transition-colors duration-200" style={{ color: 'rgba(248,246,240,0.45)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A740' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,246,240,0.45)' }}
                  >
                    <Mail size={16} className="shrink-0 mt-0.5" style={{ color: '#C9A740' }} />
                    <span>{config.email}</span>
                  </a>
                </li>
                <li>
                  <a href={`tel:${config.phone}`} className="flex items-start gap-3 text-sm transition-colors duration-200" style={{ color: 'rgba(248,246,240,0.45)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A740' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,246,240,0.45)' }}
                  >
                    <Phone size={16} className="shrink-0 mt-0.5" style={{ color: '#C9A740' }} />
                    <span>{config.phone}</span>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-sm" style={{ color: 'rgba(248,246,240,0.45)' }}>
                    <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: '#C9A740' }} />
                    <span>{config.address}</span>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <Link href="/contact" className="btn-luxury text-xs inline-flex">
                  <span>Plan Your Event</span>
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(201,167,64,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(248,246,240,0.25)' }}>
            © {year} {config.name}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(248,246,240,0.2)' }}>
            Crafting extraordinary experiences since {config.founded}
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: 'rgba(248,246,240,0.25)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(201,167,64,0.6)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(248,246,240,0.25)' }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
