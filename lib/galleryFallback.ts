export const heroImageFallbacks: Record<string, string> = {
  weddings: '/images/fallbacks/photo_1519741349-a57a0f88d50a.jpg',
  corporate: '/images/fallbacks/photo_1505373877841-8d25f7d46678.jpg',
  social: '/images/fallbacks/photo_1514525253161-7a6c1cc1a1a6.jpg',
  birthdays: '/images/fallbacks/photo_1530103862676-de8c9debad1d.jpg',
  galas: '/images/fallbacks/photo_1540575467063-178a50c2df87.jpg',
  sports: '/images/fallbacks/photo_1461896836934-ffe607ba8211.jpg',
  launches: '/images/fallbacks/photo_1492684223066-81342ee5ff30.jpg',
  concerts: '/images/fallbacks/photo_1470229722913-7c0e2dbbafd3.jpg',
  destinations: '/images/fallbacks/photo_1520250497591-112f2f40a3f4.jpg',
}

export const galleryFallbacks: Record<string, string[]> = {
  weddings: [
    '/images/fallbacks/photo_1519741349-a57a0f88d50a.jpg',
    '/images/fallbacks/photo_1511795409834-ef04bbd61622.jpg',
    '/images/fallbacks/photo_1511285560929-80b456fea0bc.jpg',
    '/images/fallbacks/photo_1465495976277-4387d4b0b4c6.jpg',
  ],
  corporate: [
    '/images/fallbacks/photo_1505373877841-8d25f7d46678.jpg',
    '/images/fallbacks/photo_1540575467063-178a50c2df87.jpg',
    '/images/fallbacks/photo_1552664730-d307ca884978.jpg',
    '/images/fallbacks/photo_1492684223066-81342ee5ff30.jpg',
  ],
  social: [
    '/images/fallbacks/photo_1514525253161-7a6c1cc1a1a6.jpg',
    '/images/fallbacks/photo_1533174072545-7a4b6ad7a6c3.jpg',
    '/images/fallbacks/photo_1485872299829-c673f5194813.jpg',
    '/images/fallbacks/photo_1527529482837-4698179dc6ce.jpg',
  ],
  birthdays: [
    '/images/fallbacks/photo_1530103862676-de8c9debad1d.jpg',
    '/images/fallbacks/photo_1558636508-e0db3814bd1d.jpg',
    '/images/fallbacks/photo_1578922746465-3a80a228f223.jpg',
    '/images/fallbacks/photo_1611048267451-e6ed903d4a38.jpg',
  ],
  galas: [
    '/images/fallbacks/photo_1540575467063-178a50c2df87.jpg',
    '/images/fallbacks/photo_1519167758481-83f550bb49b3.jpg',
    '/images/fallbacks/photo_1529543544282-ea669407fca3.jpg',
    '/images/fallbacks/photo_1481833761820-0509d3217039.jpg',
  ],
  sports: [
    '/images/fallbacks/photo_1461896836934-ffe607ba8211.jpg',
    '/images/fallbacks/photo_1517649763962-0c623066013b.jpg',
    '/images/fallbacks/photo_1508098682722-e99c43a406b2.jpg',
    '/images/fallbacks/photo_1587280501635-68a0e82cd5ff.jpg',
  ],
  launches: [
    '/images/fallbacks/photo_1492684223066-81342ee5ff30.jpg',
    '/images/fallbacks/photo_1540317580384-e5d43867caa6.jpg',
    '/images/fallbacks/photo_1475721027785-f74eccf877e2.jpg',
    '/images/fallbacks/photo_1496200186974-4293800e2c20.jpg',
  ],
  concerts: [
    '/images/fallbacks/photo_1470229722913-7c0e2dbbafd3.jpg',
    '/images/fallbacks/photo_1493225457124-a3eb161ffa5f.jpg',
    '/images/fallbacks/photo_1501386761578-eaa54b23bce1.jpg',
    '/images/fallbacks/photo_1459749411175-04bf5292ceea.jpg',
  ],
  destinations: [
    '/images/fallbacks/photo_1520250497591-112f2f40a3f4.jpg',
    '/images/fallbacks/photo_1499793983690-e29da59ef1c2.jpg',
    '/images/fallbacks/photo_1547036967-23d11aacaee0.jpg',
    '/images/fallbacks/photo_1476514525535-07fb3b4ae5f1.jpg',
  ],
}

export function getHeroImage(category: string): string {
  return heroImageFallbacks[category] || heroImageFallbacks.weddings
}

export function getGalleryImages(category: string): string[] {
  return galleryFallbacks[category] || galleryFallbacks.weddings
}
