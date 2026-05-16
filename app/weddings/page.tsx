import type { Metadata } from 'next'
import EventPageTemplate from '@/components/shared/EventPageTemplate'
import { getEventById } from '@/lib/fetchData'
import { dbEventToTemplateData } from '@/lib/eventUtils'
import { getGalleryImages, getHeroImage } from '@/lib/galleryFallback'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Weddings',
  description: 'Romantic, timeless wedding experiences crafted with love. From intimate ceremonies to grand celebrations, Blue Neck Events creates your perfect day.',
}

const fallback = {
  id: 'weddings',
  label: 'Weddings',
  tagline: 'Your Perfect Day,\nFlawlessly Crafted.',
  description: 'We believe every love story deserves to be told through an extraordinary event. Our wedding team obsesses over every petal, every light, every moment — so you can simply live it.',
  heroImage: '', // Will be fetched from database
  accentColor: '#C9A740',
  secondaryColor: '#E8D5B0',
  mood: 'romantic',
  icon: '💍',
  services: [
    { title: 'Grand Ceremonies', description: 'Palatial venues, floral mandaps, and cinematic lighting designed to take your breath away.' },
    { title: 'Intimate Weddings', description: 'Smaller, deeply personal celebrations where every detail is amplified and cherished.' },
    { title: 'Destination Weddings', description: 'Udaipur, Goa, Bali, Maldives — we make the world your wedding venue.' },
    { title: 'Reception Design', description: 'Post-ceremony celebrations that keep the magic alive deep into the night.' },
    { title: 'Mehendi & Pre-Events', description: 'From engagement parties to sangeets — every ritual deserves its own story.' },
    { title: 'Floral & Décor', description: 'Award-winning floral artistry that transforms any space into a dream.' },
  ],
  gallery: [], // Will be fetched from database
  stats: [
    { value: '320+', label: 'Weddings Crafted' },
    { value: '15+', label: 'States Covered' },
    { value: '98%', label: 'Bride Happiness' },
    { value: '8', label: 'Awards Won' },
  ],
}

export default async function WeddingsPage() {
  let dbEvent = null
  try {
    dbEvent = await getEventById('weddings')
  } catch {
    // Database connection failed, will use fallback data
  }

  const galleryImages = getGalleryImages('weddings')
  const heroImage = getHeroImage('weddings')

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
