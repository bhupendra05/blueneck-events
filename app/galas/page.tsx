import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Luxury Galas & Awards', description: 'Black-tie galas and award ceremonies of unmatched elegance.' }

const fallback = {
  id: 'galas', label: 'Luxury Galas', tagline: 'Black-Tie Moments\nRedefined.',
  description: 'We redefine what luxury truly means. Our galas are not just events — they are experiences that exist at the intersection of art, elegance, and human connection.',
  heroImage: '', // Will be fetched from database
  accentColor: '#9B59B6', secondaryColor: '#6C3483', mood: 'gala', icon: '🥂',
  services: [
    { title: 'Award Ceremonies', description: 'Industry award nights with crystal trophies, live entertainment, and red-carpet grandeur.' },
    { title: 'Charity Galas', description: 'Fundraising events that combine philanthropy with an unforgettable evening experience.' },
    { title: 'Black-Tie Dinners', description: 'White-glove service, bespoke menus, and environments that drip with sophistication.' },
    { title: 'Anniversary Galas', description: 'Milestone corporate or personal anniversaries celebrated at the highest level.' },
    { title: 'Fashion Show Events', description: 'Runway events and fashion galas that create buzz and capture attention.' },
    { title: 'VIP Experiences', description: 'Exclusive private events for high-net-worth individuals and A-list guests.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '60+', label: 'Galas Executed' },
    { value: '₹500Cr+', label: 'Raised for Charity' },
    { value: '200+', label: 'Awards Presented' },
    { value: 'Ultra', label: 'Luxury Standard' },
  ],
}

export default async function GalasPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('Galas')
  } catch {}

  const galleryImages = getGalleryImages('galas')
  const heroImage = getHeroImage('galas')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, { secondaryColor: fallback.secondaryColor, mood: fallback.mood, gallery: galleryImages, stats: fallback.stats, heroImage: dbEvent.heroImage || heroImage })
    : { ...fallback, gallery: galleryImages, heroImage }
  return <EventPageTemplate data={data} />
}
