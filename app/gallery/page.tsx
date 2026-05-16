'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { EyebrowReveal, FadeUp } from '@/components/ui/AnimatedText'
import { galleryFallbacks } from '@/lib/galleryFallback'

const categories = ['All', 'weddings', 'corporate', 'galas', 'social', 'concerts', 'birthdays', 'destinations', 'launches', 'sports']

const CATEGORY_TITLES: Record<string, string[]> = {
  weddings: ['Royal Wedding', 'Garden Ceremony', 'Destination Wedding', 'Intimate Celebration'],
  corporate: ['Executive Summit', 'Product Launch', 'Annual Conference', 'Team Gala'],
  galas: ['Black Tie Gala', 'Charity Ball', 'Awards Night', 'Grand Gala'],
  social: ['Social Evening', 'Cocktail Party', 'Rooftop Soirée', 'Garden Party'],
  concerts: ['Live Concert', 'Music Festival', 'Acoustic Night', 'Grand Show'],
  birthdays: ['Luxury Birthday', 'Milestone Celebration', 'Birthday Bash', 'VIP Party'],
  destinations: ['Destination Event', 'Beach Wedding', 'Mountain Retreat', 'City Escape'],
  launches: ['Product Launch', 'Brand Reveal', 'Grand Opening', 'Launch Party'],
  sports: ['Sports Gala', 'Championship Dinner', 'Sports Awards', 'Victory Celebration'],
}

const STATIC_GALLERY: GalleryItem[] = Object.entries(galleryFallbacks).flatMap(([cat, imgs]) =>
  imgs.map((src, i) => ({
    id: `${cat}-${i}`,
    src,
    category: cat,
    title: CATEGORY_TITLES[cat]?.[i] ?? cat,
  }))
)

interface GalleryItem {
  id: string | number
  src: string
  category: string
  title: string
  cols?: number
  rows?: number
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const [allImages, setAllImages] = useState<GalleryItem[]>(STATIC_GALLERY)

  // Fetch gallery images from DB
  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        if (!Array.isArray(data) || data.length === 0) return // keep static fallback
        const dbImages: GalleryItem[] = data.map((item: any) => ({
          id: item._id,
          src: item.src,
          category: item.category,
          title: item.title || item.category,
          cols: item.cols ?? 1,
          rows: item.rows ?? 1,
        }))
        setAllImages(dbImages)
      })
      .catch(() => {})
  }, [])

  const filtered = activeCategory === 'All'
    ? allImages
    : allImages.filter((img) => img.category === activeCategory)

  return (
    <div style={{ background: '#050508', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-28 md:pt-40 pb-12 md:pb-20 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A0F1C 0%, #050508 100%)' }}
      >
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 30%, rgba(26,74,122,0.2) 0%, transparent 70%)' }}
        />
        <div className="container-luxury relative z-10 text-center">
          <EyebrowReveal delay={0.1}>
            <span className="text-eyebrow">Our Portfolio</span>
          </EyebrowReveal>
          <div className="overflow-hidden mt-4">
            <motion.h1
              className="text-display"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              Every Frame, A{' '}
              <span className="gold-text italic">Story</span>
            </motion.h1>
          </div>
          <FadeUp delay={0.3}>
            <p className="text-base max-w-xl mx-auto mt-5" style={{ color: 'rgba(248,246,240,0.5)' }}>
              Browse through our portfolio of extraordinary events — each one a testament to
              our obsession with perfection.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Filter tabs — horizontal scroll on mobile, wrap on desktop */}
      <div className="pt-6 pb-4 md:pt-8 md:pb-6 relative z-10">
        <div className="flex gap-2 overflow-x-auto md:flex-wrap md:justify-center px-4 md:px-0 md:container-luxury pb-2 md:pb-0"
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2.5 rounded-full text-xs font-medium tracking-wider uppercase cursor-pointer"
              style={{
                background: activeCategory === cat ? '#C9A740' : 'rgba(201,167,64,0.08)',
                color: activeCategory === cat ? '#050508' : 'rgba(248,246,240,0.6)',
                border: `1px solid ${activeCategory === cat ? '#C9A740' : 'rgba(201,167,64,0.2)'}`,
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                WebkitTapHighlightColor: 'transparent',
                flexShrink: 0,
                minHeight: '44px',
              }}
            >
              {cat === 'All' ? 'All Events' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Gallery — simple key-remount fade, no layout animations */}
      <div className="container-luxury pb-24">
        <motion.div
          key={activeCategory}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {filtered.map((img) => (
            <div
              key={String(img.id)}
              className="break-inside-avoid mb-4 relative overflow-hidden rounded-xl group cursor-pointer"
              onClick={() => setLightboxImg(img.src)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full block img-cinematic transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay — always visible on mobile, hover on desktop */}
              <div
                className="absolute inset-0 flex items-end justify-between p-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300"
                style={{ background: 'linear-gradient(to top, rgba(5,5,8,0.9) 0%, transparent 60%)' }}
              >
                <span className="text-sm font-display" style={{ color: '#F8F6F0' }}>
                  {img.title}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(201,167,64,0.2)', border: '1px solid rgba(201,167,64,0.4)' }}
                >
                  <ZoomIn size={14} style={{ color: '#C9A740' }} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: 'rgba(5,5,8,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <motion.img
              src={lightboxImg}
              alt="Gallery image"
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
              style={{ boxShadow: '0 0 80px rgba(0,0,0,0.8)' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(201,167,64,0.15)', border: '1px solid rgba(201,167,64,0.3)' }}
            >
              <X size={20} style={{ color: '#C9A740' }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
