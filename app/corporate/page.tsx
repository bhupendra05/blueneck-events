import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Corporate Events',
  description: 'World-class corporate events, conferences, and product launches that elevate your brand.',
}

const fallback = {
  id: 'corporate',
  label: 'Corporate Events',
  tagline: 'Elevate Your\nBrand Experience.',
  description: 'From high-stakes conferences to unforgettable product launches, we execute corporate events that position your brand at the pinnacle of industry recognition.',
  heroImage: '', // Will be fetched from database
  accentColor: '#2A6BB0',
  secondaryColor: '#1A4A7A',
  mood: 'corporate',
  icon: '🏢',
  services: [
    { title: 'Conferences & Summits', description: 'Large-scale industry conferences with world-class AV, logistics, and hospitality.' },
    { title: 'Award Ceremonies', description: 'Prestige-filled award nights that honour excellence and leave a lasting impression.' },
    { title: 'Team Building Events', description: 'Engaging corporate retreats and team experiences that inspire and connect.' },
    { title: 'Board Dinners', description: 'Intimate executive dining experiences with flawless service and ambiance.' },
    { title: 'Exhibition Booths', description: 'Standout trade show and expo presence that dominates the floor.' },
    { title: 'Annual Parties', description: 'Year-end celebrations that reward your team and reflect your brand values.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '200+', label: 'Corporate Events' },
    { value: '50K+', label: 'Delegates Hosted' },
    { value: '30+', label: 'Fortune 500 Clients' },
    { value: '100%', label: 'On-Time Delivery' },
  ],
}

export default async function CorporatePage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('corporate')
  } catch {
    // Database connection failed, will use fallback data
  }

  const galleryImages = getGalleryImages('corporate')
  const heroImage = getHeroImage('corporate')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, {
        secondaryColor: fallback.secondaryColor,
        mood: fallback.mood,
        gallery: galleryImages,
        stats: fallback.stats,
        heroImage: dbEvent.heroImage || heroImage,
      })
    : { ...fallback, gallery: galleryImages, heroImage }

  return <EventPageTemplate data={data} />
}
