/**
 * Server-side data fetching helpers — queries MongoDB directly.
 * Use these in async Server Components only (not in 'use client' files).
 */

import connectDB from './db'

// Lazy model imports to avoid "Model already defined" errors
async function getEventModel() {
  const { default: Event } = await import('@/models/Event')
  return Event
}
async function getGalleryModel() {
  const { default: Gallery } = await import('@/models/Gallery')
  return Gallery
}
async function getTeamModel() {
  const { default: TeamMember } = await import('@/models/TeamMember')
  return TeamMember
}
async function getTestimonialModel() {
  const { default: Testimonial } = await import('@/models/Testimonial')
  return Testimonial
}
async function getSiteConfigModel() {
  const { default: SiteConfig } = await import('@/models/SiteConfig')
  return SiteConfig
}

// ── Events ──────────────────────────────────────────────────────────────────

export async function getEventById(id: string) {
  try {
    await connectDB()
    const Event = await getEventModel()
    const event = await Event.findOne({ id }).lean()
    return event as any
  } catch {
    return null
  }
}

export async function getAllEvents() {
  try {
    await connectDB()
    const Event = await getEventModel()
    const events = await Event.find({ isActive: true }).sort({ order: 1 }).lean()
    return events as any[]
  } catch {
    return []
  }
}

// ── Gallery ─────────────────────────────────────────────────────────────────

export async function getGalleryItems(category?: string) {
  try {
    await connectDB()
    const Gallery = await getGalleryModel()
    const query = category && category !== 'All' ? { category } : {}
    const items = await Gallery.find(query).sort({ createdAt: -1 }).lean()
    return items as any[]
  } catch {
    return []
  }
}

// ── Team ────────────────────────────────────────────────────────────────────

export async function getTeamMembers() {
  try {
    await connectDB()
    const TeamMember = await getTeamModel()
    const members = await TeamMember.find().sort({ order: 1 }).lean()
    return members as any[]
  } catch {
    return []
  }
}

// ── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials() {
  try {
    await connectDB()
    const Testimonial = await getTestimonialModel()
    const items = await Testimonial.find({ isActive: true }).sort({ order: 1 }).lean()
    return items as any[]
  } catch {
    return []
  }
}

// ── SiteConfig ───────────────────────────────────────────────────────────────

export async function getSiteConfig() {
  try {
    await connectDB()
    const SiteConfig = await getSiteConfigModel()
    const config = await SiteConfig.findOne().lean()
    return config as any
  } catch {
    return null
  }
}
