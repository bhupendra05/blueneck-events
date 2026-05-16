/**
 * Converts a MongoDB Event document to the shape EventPageTemplate expects.
 * Falls back to the provided static data if DB data is missing/empty.
 */
export function dbEventToTemplateData(
  dbEvent: any,
  fallback: {
    secondaryColor: string
    mood: string
    gallery: string[]
    stats: { value: string; label: string }[]
    heroImage?: string
  }
) {
  return {
    id: dbEvent.id,
    label: dbEvent.label,
    tagline: dbEvent.tagline,
    description: dbEvent.description,
    heroImage: dbEvent.heroImage || fallback.heroImage || '',
    accentColor: dbEvent.accentColor || dbEvent.color || '#C9A740',
    secondaryColor: fallback.secondaryColor,
    mood: fallback.mood,
    icon: dbEvent.icon ?? '✨',
    services: (dbEvent.services ?? []).map((s: any) => ({
      title: s.title,
      description: s.description,
    })),
    // Use DB gallery if it has entries; otherwise use static fallback
    gallery:
      dbEvent.gallery && dbEvent.gallery.length > 0
        ? dbEvent.gallery.map((g: any) => (typeof g === 'string' ? g : g.src))
        : fallback.gallery,
    // Format stats: combine numeric value + suffix string
    stats:
      dbEvent.stats && dbEvent.stats.length > 0
        ? dbEvent.stats.map((s: any) => ({
            value: `${s.value}${s.suffix ?? ''}`,
            label: s.label,
          }))
        : fallback.stats,
  }
}
