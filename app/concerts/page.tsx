import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const revalidate = 3600

export const metadata: Metadata = { title: 'Concerts & Live Shows', description: 'Large-scale concerts and live entertainment events that electrify thousands.' }

const fallback = {
  id: 'concerts', label: 'Concerts & Shows', tagline: 'Electrify\nThe Night.',
  description: 'Thousands of people. One unforgettable night. Our concert production team handles every decibel and every spotlight to deliver performances that are nothing short of legendary.',
  heroImage: '', // Will be fetched from database
  accentColor: '#C9A740', secondaryColor: '#E8D5B0', mood: 'concert', icon: '🎸',
  services: [
    { title: 'Live Music Concerts', description: 'Full-scale concert production from sound and lighting to crowd management and security.' },
    { title: 'Stand-Up Comedy Shows', description: 'Comedy night events with professional stage management and audience experience.' },
    { title: 'DJ & Club Nights', description: 'High-energy nightclub events with world-class sound systems and lighting rigs.' },
    { title: 'Cultural Performances', description: 'Classical, folk, and fusion cultural performance events managed with reverence.' },
    { title: 'Open-Air Festivals', description: 'Outdoor music and arts festivals with food, entertainment, and thousands of fans.' },
    { title: 'Private Concerts', description: 'Exclusive private performances for intimate gatherings of VIP guests.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '80+', label: 'Shows Produced' },
    { value: '500K+', label: 'Audience Reached' },
    { value: '200+', label: 'Artists Managed' },
    { value: '0', label: 'Cancelled Shows' },
  ],
}

export default async function ConcertsPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('Concerts')
  } catch {}

  const galleryImages = getGalleryImages('concerts')
  const heroImage = getHeroImage('concerts')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, { secondaryColor: fallback.secondaryColor, mood: fallback.mood, gallery: galleryImages, stats: fallback.stats, heroImage: dbEvent.heroImage || heroImage })
    : { ...fallback, gallery: galleryImages, heroImage }
  return <EventPageTemplate data={data} />
}
