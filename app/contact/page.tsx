'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Send, ChevronDown } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'
import { EyebrowReveal, FadeUp } from '@/components/ui/AnimatedText'
import MagneticButton from '@/components/ui/MagneticButton'
import GlassmorphicCard from '@/components/ui/GlassmorphicCard'

const eventTypes = [
  'Wedding', 'Corporate Event', 'Social Event', 'Birthday Party',
  'Sports Event', 'Luxury Gala', 'Product Launch', 'Concert / Show',
  'Destination Event', 'Other',
]

export default function ContactPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(formRef, { once: true })
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', eventType: '', date: '', guests: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          eventType: formData.eventType,
          eventDate: formData.date,
          message: formData.message,
          source: 'website',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit enquiry')
      }

      setSubmitted(true)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyle = {
    background: 'rgba(13,27,42,0.5)',
    border: '1px solid rgba(201,167,64,0.15)',
    color: '#F8F6F0',
    borderRadius: '8px',
    padding: '0.875rem 1.25rem',
    width: '100%',
    fontFamily: 'var(--font-inter)',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '0.7rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase' as const,
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: 'rgba(201,167,64,0.7)',
    fontFamily: 'var(--font-inter)',
  }

  return (
    <div style={{ background: '#050508' }}>
      {/* Hero */}
      <section
        className="relative pt-28 md:pt-40 pb-12 md:pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A0F1C 0%, #050508 100%)' }}
      >
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 40%, rgba(26,74,122,0.2) 0%, transparent 70%)' }}
        />
        <div className="container-luxury relative z-10 text-center">
          <EyebrowReveal delay={0.1}>
            <span className="text-eyebrow">Get In Touch</span>
          </EyebrowReveal>
          <motion.h1
            className="text-display mt-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            Let&apos;s Create Something{' '}
            <span className="gold-text italic">Extraordinary</span>
          </motion.h1>
          <FadeUp delay={0.3}>
            <p className="text-base max-w-xl mx-auto mt-5" style={{ color: 'rgba(248,246,240,0.5)' }}>
              Every great event begins with a conversation. Tell us about your vision
              and we&apos;ll get back to you within 24 hours.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section-padding" ref={formRef}>
        <div className="container-luxury">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <FadeUp delay={0.1}>
                <h2 className="text-headline mb-6" style={{ color: '#F8F6F0' }}>
                  Reach Us{' '}
                  <span className="gold-text">Directly</span>
                </h2>
              </FadeUp>

              {[
                { icon: <Mail size={20} />, label: 'Email Us', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
                { icon: <Phone size={20} />, label: 'Call Us', value: SITE_CONFIG.phone, href: `tel:${SITE_CONFIG.phone}` },
                { icon: <MapPin size={20} />, label: 'Visit Us', value: SITE_CONFIG.address, href: '#' },
              ].map((item, i) => (
                <FadeUp key={item.label} delay={0.15 + i * 0.1}>
                  <a href={item.href} className="block group">
                    <GlassmorphicCard className="p-5 group-hover:border-gold-bright transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'rgba(201,167,64,0.1)', border: '1px solid rgba(201,167,64,0.2)' }}
                        >
                          <span style={{ color: '#C9A740' }}>{item.icon}</span>
                        </div>
                        <div>
                          <span className="text-eyebrow block mb-1" style={{ fontSize: '0.65rem' }}>
                            {item.label}
                          </span>
                          <span className="text-sm font-medium" style={{ color: '#F8F6F0' }}>
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </GlassmorphicCard>
                  </a>
                </FadeUp>
              ))}

              {/* WhatsApp CTA */}
              <FadeUp delay={0.45}>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold-solid w-full justify-center mt-4"
                >
                  <span>💬</span>
                  <span>Chat on WhatsApp</span>
                </a>
              </FadeUp>

              {/* Response time badge */}
              <FadeUp delay={0.5}>
                <GlassmorphicCard className="p-4 text-center">
                  <div
                    className="text-2xl font-display font-bold mb-1"
                    style={{ color: '#C9A740' }}
                  >
                    &lt; 24h
                  </div>
                  <div className="text-xs tracking-wider uppercase" style={{ color: 'rgba(248,246,240,0.4)' }}>
                    Average Response Time
                  </div>
                </GlassmorphicCard>
              </FadeUp>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <GlassmorphicCard className="p-5 md:p-8">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label style={labelStyle}>Full Name</label>
                          <input
                            type="text"
                            name="name"
                            required
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,167,64,0.06)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.15)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Email Address</label>
                          <input
                            type="email"
                            name="email"
                            required
                            placeholder="your@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,167,64,0.06)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.15)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Phone Number</label>
                          <input
                            type="tel"
                            name="phone"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,167,64,0.06)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.15)'; e.target.style.boxShadow = 'none' }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Event Type</label>
                          <div className="relative">
                            <select
                              name="eventType"
                              value={formData.eventType}
                              onChange={handleChange}
                              style={{ ...inputStyle, appearance: 'none' }}
                              onFocus={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.5)' }}
                              onBlur={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.15)' }}
                            >
                              <option value="" style={{ background: '#0D1B2A' }}>Select event type</option>
                              {eventTypes.map(type => (
                                <option key={type} value={type} style={{ background: '#0D1B2A' }}>
                                  {type}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              size={16}
                              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                              style={{ color: 'rgba(201,167,64,0.5)' }}
                            />
                          </div>
                        </div>
                        <div>
                          <label style={labelStyle}>Event Date (Approx.)</label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={{ ...inputStyle, colorScheme: 'dark' }}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.5)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.15)' }}
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Expected Guests</label>
                          <input
                            type="number"
                            name="guests"
                            placeholder="e.g. 200"
                            value={formData.guests}
                            onChange={handleChange}
                            style={inputStyle}
                            onFocus={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.5)' }}
                            onBlur={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.15)' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={labelStyle}>Tell Us About Your Vision</label>
                        <textarea
                          name="message"
                          rows={5}
                          required
                          placeholder="Describe your dream event — venue preferences, themes, must-haves..."
                          value={formData.message}
                          onChange={handleChange}
                          style={{ ...inputStyle, resize: 'none' }}
                          onFocus={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.5)'; e.target.style.boxShadow = '0 0 0 3px rgba(201,167,64,0.06)' }}
                          onBlur={(e) => { e.target.style.borderColor = 'rgba(201,167,64,0.15)'; e.target.style.boxShadow = 'none' }}
                        />
                      </div>

                      {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                          {error}
                        </div>
                      )}

                      <MagneticButton className="w-full">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-gold-solid w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <span>Sending...</span>
                          ) : (
                            <>
                              <Send size={15} />
                              <span>Send Enquiry</span>
                            </>
                          )}
                        </button>
                      </MagneticButton>

                      <p className="text-center text-xs" style={{ color: 'rgba(248,246,240,0.25)' }}>
                        We respect your privacy. Your details will never be shared.
                      </p>
                    </form>
                  ) : (
                    <motion.div
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="text-6xl mb-6"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        ✨
                      </motion.div>
                      <h3 className="text-2xl font-display font-bold mb-3" style={{ color: '#F8F6F0' }}>
                        Thank You, {formData.name || 'there'}!
                      </h3>
                      <p className="text-base mb-2" style={{ color: 'rgba(248,246,240,0.6)' }}>
                        Your enquiry has been received. We&apos;re already excited about your event!
                      </p>
                      <p className="text-sm" style={{ color: '#C9A740' }}>
                        We&apos;ll reach out within 24 hours to begin crafting your experience.
                      </p>
                    </motion.div>
                  )}
                </GlassmorphicCard>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
