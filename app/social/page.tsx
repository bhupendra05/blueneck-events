import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const revalidate = 3600

export const metadata: Metadata = { title: 'Social Events', description: 'Vibrant social events and celebrations that create memories for life.' }

const fallback = {
  id: 'social', label: 'Social Events', tagline: 'Celebrations Worth\nRemembering.',
  description: 'Life\'s greatest moments deserve to be celebrated in style. Our social event specialists bring creativity, joy, and unforgettable energy to every gathering.',
  heroImage: '', // Will be fetched from database
  accentColor: '#F0C860', secondaryColor: '#C9A740', mood: 'social', icon: '🎉',
  services: [
    { title: 'Theme Parties', description: 'Fully immersive themed events from Bollywood nights to retro galas.' },
    { title: 'Reunion Events', description: 'School, college, and family reunions that reignite connections.' },
    { title: 'Housewarming Parties', description: 'Welcome new chapters with a celebration as unique as your home.' },
    { title: 'Holiday Celebrations', description: 'Diwali, Christmas, New Year — every festival elevated to an experience.' },
    { title: 'Cocktail Evenings', description: 'Sophisticated soirées with curated bars, entertainment, and ambiance.' },
    { title: 'Farewell Events', description: 'Heartfelt send-offs that honour the memories made together.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '180+', label: 'Social Events' },
    { value: '25K+', label: 'Guests Celebrated' },
    { value: '40+', label: 'Event Themes' },
    { value: '5★', label: 'Average Rating' },
  ],
}

export default async function SocialPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('social')
  } catch {
    // Database connection failed, will use fallback data
  }

  const galleryImages = getGalleryImages('social')
  const heroImage = getHeroImage('social')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, { secondaryColor: fallback.secondaryColor, mood: fallback.mood, gallery: galleryImages, stats: fallback.stats, heroImage: dbEvent.heroImage || heroImage })
    : { ...fallback, gallery: galleryImages, heroImage }
  return <EventPageTemplate data={data} />
}
