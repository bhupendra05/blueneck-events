import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Product Launches', description: 'Brand reveals and product launch events that generate buzz and build legacy.' }

const fallback = {
  id: 'launches', label: 'Product Launches', tagline: 'Unveil With\nMaximum Impact.',
  description: 'Your product is ready to change the world — our launch events make sure the world is ready for your product. We create moments of reveal that the media can\'t ignore.',
  heroImage: '', // Will be fetched from database
  accentColor: '#E74C3C', secondaryColor: '#C0392B', mood: 'launch', icon: '🚀',
  services: [
    { title: 'Brand Launch Events', description: 'New brand identity reveals with full audio-visual spectacle and press coverage.' },
    { title: 'Product Unveilings', description: 'Apple-style product reveals with build-up, drama, and a moment of pure impact.' },
    { title: 'Store Openings', description: 'Retail launch events that create queues, buzz, and brand awareness from Day 1.' },
    { title: 'App & Digital Launches', description: 'Tech product launches with live demos, influencer presence, and media coverage.' },
    { title: 'Influencer Events', description: 'Curated influencer launch events designed to go viral and maximise reach.' },
    { title: 'Press Conferences', description: 'High-impact press events that deliver your message with clarity and authority.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '120+', label: 'Launches Executed' },
    { value: '₹2000Cr+', label: 'Products Launched' },
    { value: '500M+', label: 'Media Impressions' },
    { value: '40+', label: 'Brands Served' },
  ],
}

export default async function LaunchesPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('Launches')
  } catch {}

  const galleryImages = getGalleryImages('launches')
  const heroImage = getHeroImage('launches')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, { secondaryColor: fallback.secondaryColor, mood: fallback.mood, gallery: galleryImages, stats: fallback.stats, heroImage: dbEvent.heroImage || heroImage })
    : { ...fallback, gallery: galleryImages, heroImage }
  return <EventPageTemplate data={data} />
}
