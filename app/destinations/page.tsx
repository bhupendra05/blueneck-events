import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Destination Events', description: 'Exotic destination events in Goa, Dubai, Bali, and Maldives.' }

const fallback = {
  id: 'destinations', label: 'Destination Events', tagline: 'The World As\nYour Venue.',
  description: 'Why settle for a venue when you can have a destination? Our destination event specialists manage every detail — flights, stays, permits, and pure magic — so you only experience wonder.',
  heroImage: '', // Will be fetched from database
  accentColor: '#1ABC9C', secondaryColor: '#148F77', mood: 'destination', icon: '✈️',
  services: [
    { title: 'Destination Weddings', description: 'Beachfront, hilltop, and palace weddings in India and abroad — managed flawlessly.' },
    { title: 'Goa Beach Events', description: 'Sunrise ceremonies, sunset cocktails, and late-night beach parties in Goa.' },
    { title: 'Dubai Luxury Events', description: 'Skyline events, desert experiences, and yacht celebrations in Dubai.' },
    { title: 'Bali & Maldives', description: 'Overwater ceremonies and tropical paradise events in Southeast Asia.' },
    { title: 'International Event Travel', description: 'Full-service travel management, accommodation, and logistics for overseas events.' },
    { title: 'Permit & Legal Management', description: 'Complete handling of local permits, visas, and compliance for all destinations.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '60+', label: 'Destination Events' },
    { value: '20+', label: 'Countries Covered' },
    { value: '100%', label: 'Stress-Free' },
    { value: '5★', label: 'Client Reviews' },
  ],
}

export default async function DestinationsPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('Destinations')
  } catch {}

  const galleryImages = getGalleryImages('destinations')
  const heroImage = getHeroImage('destinations')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, { secondaryColor: fallback.secondaryColor, mood: fallback.mood, gallery: galleryImages, stats: fallback.stats, heroImage: dbEvent.heroImage || heroImage })
    : { ...fallback, gallery: galleryImages, heroImage }
  return <EventPageTemplate data={data} />
}
