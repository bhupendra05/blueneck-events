'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Phone, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000)
    return () => clearTimeout(timer)
  }, [])

  const actions = [
    {
      icon: <MessageCircle size={20} />,
      label: 'WhatsApp Us',
      color: '#25D366',
      href: `https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi, I'd like to enquire about your event services`,
    },
    {
      icon: <Phone size={20} />,
      label: 'Call Us',
      color: '#C9A740',
      href: `tel:${SITE_CONFIG.phone}`,
    },
  ]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="float-cta"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Action buttons */}
          <AnimatePresence>
            {isOpen && (
              <div className="absolute bottom-16 right-0 flex flex-col gap-3 items-end mb-2">
                {actions.map((action, i) => (
                  <motion.a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium text-white whitespace-nowrap"
                    style={{
                      background: `linear-gradient(135deg, ${action.color}dd, ${action.color})`,
                      boxShadow: `0 4px 20px ${action.color}44`,
                    }}
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.8 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </motion.a>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Main button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center rounded-full text-white"
            style={{
              width: '56px',
              height: '56px',
              background: 'linear-gradient(135deg, #C9A740, #F0C860)',
              boxShadow: '0 0 30px rgba(201,167,64,0.4), 0 8px 25px rgba(0,0,0,0.3)',
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulse ring */}
            <span
              className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'rgba(201,167,64,0.6)' }}
            />
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X size={22} color="#050508" />
              ) : (
                <MessageCircle size={22} color="#050508" />
              )}
            </motion.div>
          </motion.button>

          {/* Tooltip */}
          <AnimatePresence>
            {!isOpen && (
              <motion.span
                className="absolute bottom-1/2 right-16 translate-y-1/2 text-xs font-medium tracking-wide whitespace-nowrap px-3 py-1.5 rounded-full pointer-events-none"
                style={{
                  background: 'rgba(5,5,8,0.9)',
                  color: '#C9A740',
                  border: '1px solid rgba(201,167,64,0.2)',
                }}
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                transition={{ delay: 1 }}
              >
                Book Your Event
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
