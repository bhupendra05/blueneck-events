'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { EyebrowReveal, FadeUp } from '@/components/ui/AnimatedText'

const categories = ['All', 'weddings', 'corporate', 'galas', 'social', 'concerts', 'birthdays', 'destinations', 'launches', 'sports']

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
  const [allImages, setAllImages] = useState<GalleryItem[]>([])
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  // Fetch gallery images from DB
  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Map DB format to our gallery item format
          const dbImages: GalleryItem[] = data.map((item: any) => ({
            id: item._id,
            src: item.src,
            category: item.category,
            title: item.title || item.category,
            cols: item.cols ?? 1,
            rows: item.rows ?? 1,
          }))
          // Merge: DB images first, then any static images whose categories aren't covered
          setAllImages(dbImages)
        }
      })
      .catch(() => {
        // silently fall back to static defaults
      })
  }, [])

  const filtered = activeCategory === 'All'
    ? allImages
    : allImages.filter((img) => img.category === activeCategory)

  return (
    <div style={{ background: '#050508', minHeight: '100vh' }}>
      {/* Hero */}
      <section
        className="relative pt-40 pb-20 overflow-hidden"
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

      {/* Filter tabs */}
      <div className="container-luxury pt-8 pb-6" ref={ref}>
        <div className="flex gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300"
              style={{
                background: activeCategory === cat ? '#C9A740' : 'rgba(201,167,64,0.08)',
                color: activeCategory === cat ? '#050508' : 'rgba(248,246,240,0.5)',
                border: `1px solid ${activeCategory === cat ? '#C9A740' : 'rgba(201,167,64,0.15)'}`,
              }}
            >
              {cat === 'All' ? 'All Events' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Gallery */}
      <div className="container-luxury pb-24">
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, index) => (
              <motion.div
                key={String(img.id)}
                layout
                custom={index}
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: (i: number) => ({
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.4, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] },
                  }),
                  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.15 } },
                }}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ layout: { duration: 0.3 } }}
                className="break-inside-avoid mb-4 relative overflow-hidden rounded-xl group cursor-pointer"
                onClick={() => setLightboxImg(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full block img-cinematic transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay */}
                <div
                  className="absolute inset-0 flex items-end justify-between p-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
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
              </motion.div>
            ))}
          </AnimatePresence>
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
