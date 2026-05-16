import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const revalidate = 3600

export const metadata: Metadata = { title: 'Birthday Parties', description: 'Magical birthday celebrations for every age. From kids\' parties to milestone adult birthdays.' }

const fallback = {
  id: 'birthdays', label: 'Birthday Parties', tagline: 'Every Year,\nA Grand Celebration.',
  description: 'Birthdays are more than cake and candles — they\'re chapters in your life story. We craft birthday experiences so extraordinary, guests talk about them for years.',
  heroImage: '', // Will be fetched from database
  accentColor: '#E8A0BF', secondaryColor: '#C97B8A', mood: 'birthday', icon: '🎂',
  services: [
    { title: 'Kids\' Birthday Extravaganzas', description: 'Magical, safe, and wildly fun parties for children with themed entertainment.' },
    { title: 'Teen Celebrations', description: 'Cool, trendy, Instagram-worthy parties that teenagers will absolutely love.' },
    { title: 'Milestone Birthdays', description: '18th, 30th, 50th — landmark moments deserve truly landmark celebrations.' },
    { title: 'Surprise Parties', description: 'We specialise in perfectly orchestrated surprise parties that create real shock and awe.' },
    { title: 'Luxury Birthday Galas', description: 'Adult birthday parties that feel like black-tie events with personal touches.' },
    { title: 'Photobooth & Entertainment', description: 'Custom photobooths, performers, and activities that keep energy high all night.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '150+', label: 'Birthday Events' },
    { value: '6mo–80yr', label: 'All Age Groups' },
    { value: '99%', label: 'Happy Birthdays' },
    { value: '30+', label: 'Party Themes' },
  ],
}

export default async function BirthdaysPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('birthdays')
  } catch {}

  const galleryImages = getGalleryImages('birthdays')
  const heroImage = getHeroImage('birthdays')

  const data = dbEvent
    ? dbEventToTemplateData(dbEvent, { secondaryColor: fallback.secondaryColor, mood: fallback.mood, gallery: galleryImages, stats: fallback.stats, heroImage: dbEvent.heroImage || heroImage })
    : { ...fallback, gallery: galleryImages, heroImage }
  return <EventPageTemplate data={data} />
}
