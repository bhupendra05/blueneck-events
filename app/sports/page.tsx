import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Sports Events', description: 'Dynamic sports tournaments and athletic events managed with precision and energy.' }

const fallback = {
  id: 'sports', label: 'Sports Events', tagline: 'Adrenaline Meets\nExcellence.',
  description: 'We understand sports. The rush, the roar of the crowd, the precision — we bring that same energy to the management of every sporting event we execute.',
  heroImage: '', // Will be fetched from database
  accentColor: '#40C940', secondaryColor: '#207A20', mood: 'sports', icon: '🏆',
  services: [
    { title: 'Tournaments & Championships', description: 'Full management of cricket, football, badminton, and multi-sport tournaments.' },
    { title: 'Marathons & Runs', description: 'City marathons, charity runs, and cycling events with complete logistics support.' },
    { title: 'Sports Galas & Award Nights', description: 'Prestigious sports award ceremonies honoring athletic excellence.' },
    { title: 'School & College Sports Days', description: 'Energetic institutional sports days with professional event management.' },
    { title: 'Corporate Sports Leagues', description: 'Inter-company sports leagues that build teams and create bonds.' },
    { title: 'Spectator Experience', description: 'Fan zones, live screenings, and spectator event management for mass audiences.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '80+', label: 'Sports Events' },
    { value: '100K+', label: 'Participants Managed' },
    { value: '15+', label: 'Sports Covered' },
    { value: '5', label: 'State Records' },
  ],
}

export default async function SportsPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('Sports')
  } catch {}

  const galleryImages = getGalleryImages('sports')
  const heroImage = getHeroImage('sports')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, { secondaryColor: fallback.secondaryColor, mood: fallback.mood, gallery: galleryImages, stats: fallback.stats, heroImage: dbEvent.heroImage || heroImage })
    : { ...fallback, gallery: galleryImages, heroImage }
  return <EventPageTemplate data={data} />
}
