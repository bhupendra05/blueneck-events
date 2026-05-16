import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import connectDB from '@/lib/db'
import User from '@/models/User'
import Event from '@/models/Event'
import Gallery from '@/models/Gallery'
import Testimonial from '@/models/Testimonial'
import TeamMember from '@/models/TeamMember'
import SiteConfig from '@/models/SiteConfig'

export const dynamic = 'force-dynamic'

export async function POST() {
  await connectDB()

  // ── Admin user ──────────────────────────────────────────
  const existingAdmin = await User.findOne({ email: 'admin@blueneckevents.com' })
  if (!existingAdmin) {
    const hashed = await bcrypt.hash('BlueNeck@2024', 12)
    await User.create({
      name: 'Admin',
      email: 'admin@blueneckevents.com',
      password: hashed,
      role: 'admin',
    })
  }

  // ── Site Config ─────────────────────────────────────────
  const configCount = await SiteConfig.countDocuments()
  if (configCount === 0) {
    await SiteConfig.create({
      name: 'Blue Neck Events',
      tagline: 'Where Moments Become Legends',
      description: 'Premium event management crafting extraordinary experiences across weddings, corporate galas, concerts, and beyond.',
      email: 'hello@blueneckevents.com',
      phone: '+91 98765 43210',
      whatsapp: '+919876543210',
      address: 'Mumbai, Maharashtra, India',
      instagram: 'https://instagram.com/blueneckevents',
      facebook: 'https://facebook.com/blueneckevents',
      founded: 2015,
      stats: [
        { value: 850, suffix: '+', label: 'Events Crafted' },
        { value: 12, suffix: 'K+', label: 'Happy Guests' },
        { value: 9, suffix: '', label: 'Years of Excellence' },
        { value: 98, suffix: '%', label: 'Client Satisfaction' },
      ],
      heroSlides: [
        { image: 'https://images.unsplash.com/photo-1519741349-a57a0f88d50a?auto=format&fit=crop&w=1800&q=80' },
        { image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1800&q=80' },
        { image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1800&q=80' },
        { image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1800&q=80' },
      ],
      heroTagline: 'Where Moments Become Legends',
      heroSubtitle: 'Premium event management crafting extraordinary experiences',
      featuredEventIds: ['weddings', 'corporate', 'galas'],
    })
  }

  // ── Events ──────────────────────────────────────────────
  const eventCount = await Event.countDocuments()
  if (eventCount === 0) {
    const events = [
      {
        id: 'weddings', label: 'Weddings', tagline: 'Your perfect day, flawlessly crafted',
        description: 'From intimate ceremonies to grand celebrations, we weave your love story into an unforgettable masterpiece.',
        href: '/weddings', color: '#E8D5B0', accentColor: '#C9A740', icon: '💍', order: 1,
        heroImage: 'https://images.unsplash.com/photo-1519741349-a57a0f88d50a?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Venue Selection', description: 'Handpicked venues matching your vision and budget', icon: '🏛️' },
          { title: 'Décor & Florals', description: 'Breathtaking arrangements crafted by master designers', icon: '🌸' },
          { title: 'Catering', description: 'Curated menus from world-class culinary teams', icon: '🍽️' },
          { title: 'Photography', description: 'Cinematic coverage capturing every precious moment', icon: '📸' },
          { title: 'Entertainment', description: 'Live music, DJ, and bespoke performances', icon: '🎵' },
          { title: 'Coordination', description: 'Seamless day-of coordination for a stress-free experience', icon: '📋' },
        ],
        stats: [{ value: 320, suffix: '+', label: 'Weddings' }, { value: 98, suffix: '%', label: 'Satisfaction' }, { value: 15, suffix: '+', label: 'Destinations' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1519741349-a57a0f88d50a?auto=format&fit=crop&w=800&q=80', title: 'Golden Ceremony', mediaType: 'image' },
          { src: 'https://images.unsplash.com/photo-1583939003579-fe5ee0fcabb3?auto=format&fit=crop&w=800&q=80', title: 'Floral Mandap', mediaType: 'image' },
        ],
      },
      {
        id: 'corporate', label: 'Corporate Events', tagline: 'Elevate your brand experience',
        description: 'Conferences, product launches, and award galas that leave a lasting impression on every attendee.',
        href: '/corporate', color: '#2A6BB0', accentColor: '#1A4A7A', icon: '🏢', order: 2,
        heroImage: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Conference Management', description: 'Full-scale conference planning and execution', icon: '🎤' },
          { title: 'Brand Activations', description: 'Immersive brand experiences that resonate', icon: '🚀' },
          { title: 'Award Ceremonies', description: 'Prestigious gala nights with flawless production', icon: '🏆' },
          { title: 'Team Building', description: 'Engaging activities fostering team cohesion', icon: '🤝' },
          { title: 'Product Launches', description: 'High-impact reveals that generate buzz', icon: '📦' },
          { title: 'Virtual Events', description: 'Seamless hybrid and virtual event production', icon: '💻' },
        ],
        stats: [{ value: 200, suffix: '+', label: 'Corporate Events' }, { value: 50, suffix: '+', label: 'Top Brands' }, { value: 5, suffix: 'K+', label: 'Attendees Managed' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80', title: 'Executive Summit', mediaType: 'image' },
        ],
      },
      {
        id: 'social', label: 'Social Events', tagline: 'Celebrations worth remembering',
        description: 'Vibrant social gatherings, theme parties, and reunions that create memories for a lifetime.',
        href: '/social', color: '#C9A740', accentColor: '#F0C860', icon: '🎉', order: 3,
        heroImage: 'https://images.unsplash.com/photo-1514525253161-7a6c1cc1a1a6?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Theme Parties', description: 'Immersive themed experiences from concept to execution', icon: '🎭' },
          { title: 'Reunion Events', description: 'Heartwarming reunions with a personal touch', icon: '👨‍👩‍👧‍👦' },
          { title: 'Cocktail Nights', description: 'Sophisticated evenings with premium bar setups', icon: '🍸' },
          { title: 'Festive Celebrations', description: 'Grand festival and holiday events', icon: '🎊' },
        ],
        stats: [{ value: 150, suffix: '+', label: 'Social Events' }, { value: 10, suffix: 'K+', label: 'Guests' }, { value: 100, suffix: '%', label: 'Fun Guaranteed' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1514525253161-7a6c1cc1a1a6?auto=format&fit=crop&w=800&q=80', title: 'Neon Party', mediaType: 'image' },
        ],
      },
      {
        id: 'birthdays', label: 'Birthday Parties', tagline: 'Every year, a grand celebration',
        description: 'Playful, joyful, and magical birthday experiences tailored for every age and personality.',
        href: '/birthdays', color: '#E8A0BF', accentColor: '#C97B8A', icon: '🎂', order: 4,
        heroImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Kids Parties', description: 'Magical themed parties for the little ones', icon: '🎈' },
          { title: 'Adult Milestones', description: '18th, 21st, 30th, 50th — each milestone celebrated', icon: '🥳' },
          { title: 'Surprise Events', description: 'Perfectly orchestrated surprise celebrations', icon: '🎁' },
          { title: 'Destination Birthdays', description: 'Celebrate in style at exotic locations', icon: '✈️' },
        ],
        stats: [{ value: 180, suffix: '+', label: 'Birthday Events' }, { value: 5, suffix: 'K+', label: 'Happy Guests' }, { value: 50, suffix: '+', label: 'Themes Created' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80', title: 'Grand Birthday', mediaType: 'image' },
        ],
      },
      {
        id: 'sports', label: 'Sports Events', tagline: 'Adrenaline meets excellence',
        description: 'Dynamic sports tournaments, marathons, and athletic events managed with precision and energy.',
        href: '/sports', color: '#40C940', accentColor: '#207A20', icon: '🏆', order: 5,
        heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Tournaments', description: 'Complete tournament management from planning to trophy', icon: '🏅' },
          { title: 'Marathons', description: 'City-wide marathon events with full logistics', icon: '🏃' },
          { title: 'Award Nights', description: 'Sports award ceremonies honoring champions', icon: '🥇' },
          { title: 'Fan Experiences', description: 'Immersive fan zones and sports activations', icon: '📣' },
        ],
        stats: [{ value: 60, suffix: '+', label: 'Sports Events' }, { value: 20, suffix: 'K+', label: 'Participants' }, { value: 15, suffix: '+', label: 'Sports Covered' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80', title: 'Championship', mediaType: 'image' },
        ],
      },
      {
        id: 'galas', label: 'Luxury Galas', tagline: 'Black-tie moments redefined',
        description: 'Award ceremonies, charity galas, and exclusive black-tie affairs with unmatched elegance.',
        href: '/galas', color: '#9B59B6', accentColor: '#6C3483', icon: '🥂', order: 6,
        heroImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Black-Tie Affairs', description: 'Ultra-premium formal events with impeccable service', icon: '🎩' },
          { title: 'Charity Galas', description: 'Meaningful fundraising events with maximum impact', icon: '💝' },
          { title: 'Award Ceremonies', description: 'Prestigious award nights televised and live', icon: '🏆' },
          { title: 'VIP Experiences', description: 'Exclusive VIP lounges and concierge services', icon: '👑' },
        ],
        stats: [{ value: 45, suffix: '+', label: 'Galas' }, { value: 500, suffix: '+', label: 'VIP Guests Per Event' }, { value: 100, suffix: '%', label: 'Premium Delivery' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', title: 'Awards Night', mediaType: 'image' },
        ],
      },
      {
        id: 'launches', label: 'Product Launches', tagline: 'Unveil with impact',
        description: 'Brand reveals, store launches, and product unveilings that generate buzz and build legacy.',
        href: '/launches', color: '#E74C3C', accentColor: '#C0392B', icon: '🚀', order: 7,
        heroImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Product Reveals', description: 'Theatrical unveilings that create maximum impact', icon: '🎬' },
          { title: 'Press Conferences', description: 'Media events generating national coverage', icon: '📰' },
          { title: 'Store Openings', description: 'Grand opening events drawing massive footfall', icon: '🏪' },
          { title: 'Influencer Events', description: 'Curated influencer gatherings for viral reach', icon: '📱' },
        ],
        stats: [{ value: 75, suffix: '+', label: 'Launches' }, { value: 30, suffix: '+', label: 'National Brands' }, { value: 95, suffix: '%', label: 'Media Coverage Rate' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', title: 'Brand Reveal', mediaType: 'image' },
        ],
      },
      {
        id: 'concerts', label: 'Concerts & Shows', tagline: 'Electrify the night',
        description: 'Live music events, entertainment nights, and large-scale performances that captivate thousands.',
        href: '/concerts', color: '#3498DB', accentColor: '#1A6BA6', icon: '🎸', order: 8,
        heroImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Live Concerts', description: 'Full production concerts from intimate to stadium scale', icon: '🎶' },
          { title: 'Stage Design', description: 'Spectacular stage setups with world-class production', icon: '🎭' },
          { title: 'Sound & Lighting', description: 'Industry-leading audio-visual production teams', icon: '🔊' },
          { title: 'Artist Management', description: 'Coordination with top artists and performers', icon: '🎤' },
        ],
        stats: [{ value: 40, suffix: '+', label: 'Concerts' }, { value: 100, suffix: 'K+', label: 'Audience Reached' }, { value: 200, suffix: '+', label: 'Artists Hosted' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80', title: 'Live Concert', mediaType: 'image' },
        ],
      },
      {
        id: 'destinations', label: 'Destination Events', tagline: 'The world as your venue',
        description: 'Exotic destination weddings and events in Goa, Dubai, Bali, Maldives, and beyond.',
        href: '/destinations', color: '#1ABC9C', accentColor: '#148F77', icon: '✈️', order: 9,
        heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80',
        services: [
          { title: 'Destination Weddings', description: 'Dream ceremonies in the world\'s most breathtaking locations', icon: '🌴' },
          { title: 'Travel Coordination', description: 'Seamless guest travel, visa, and accommodation', icon: '✈️' },
          { title: 'Local Partnerships', description: 'Trusted vendor networks across 30+ countries', icon: '🤝' },
          { title: 'Cultural Experiences', description: 'Authentic local experiences woven into every event', icon: '🌍' },
        ],
        stats: [{ value: 30, suffix: '+', label: 'Countries' }, { value: 120, suffix: '+', label: 'Destination Events' }, { value: 5000, suffix: '+', label: 'Guests Traveled' }],
        gallery: [
          { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', title: 'Beachfront Event', mediaType: 'image' },
        ],
      },
    ]
    await Event.insertMany(events)
  }

  // ── Gallery ─────────────────────────────────────────────
  const galleryCount = await Gallery.countDocuments()
  if (galleryCount === 0) {
    await Gallery.insertMany([
      { src: 'https://images.unsplash.com/photo-1519741349-a57a0f88d50a?auto=format&fit=crop&w=800&q=80', category: 'weddings', title: 'Golden Hour Ceremony', cols: 2, rows: 2 },
      { src: 'https://images.unsplash.com/photo-1583939003579-fe5ee0fcabb3?auto=format&fit=crop&w=800&q=80', category: 'weddings', title: 'Floral Mandap', cols: 1, rows: 1 },
      { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80', category: 'corporate', title: 'Executive Summit', cols: 1, rows: 2 },
      { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80', category: 'galas', title: 'Awards Night', cols: 2, rows: 1 },
      { src: 'https://images.unsplash.com/photo-1514525253161-7a6c1cc1a1a6?auto=format&fit=crop&w=800&q=80', category: 'social', title: 'Neon Celebration', cols: 1, rows: 1 },
      { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80', category: 'concerts', title: 'Live Concert', cols: 2, rows: 2 },
      { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80', category: 'birthdays', title: 'Grand Birthday', cols: 1, rows: 1 },
      { src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', category: 'destinations', title: 'Beachfront Event', cols: 1, rows: 2 },
      { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', category: 'launches', title: 'Brand Reveal', cols: 2, rows: 1 },
      { src: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80', category: 'sports', title: 'Championship Event', cols: 1, rows: 1 },
      // Local sample images from download folder
      { src: '/sample-images/event1.jpg', category: 'weddings', title: 'Elegant Wedding Setup', cols: 2, rows: 2 },
      { src: '/sample-images/event2.jpg', category: 'corporate', title: 'Corporate Event Venue', cols: 1, rows: 1 },
      { src: '/sample-images/event3.jpg', category: 'social', title: 'Social Celebration', cols: 2, rows: 1 },
      { src: '/sample-images/event4.jpg', category: 'galas', title: 'Gala Night Event', cols: 1, rows: 2 },
    ])
  }

  // ── Testimonials ────────────────────────────────────────
  const testCount = await Testimonial.countDocuments()
  if (testCount === 0) {
    await Testimonial.insertMany([
      { name: 'Priya & Arjun Mehta', event: 'Wedding — Udaipur', quote: 'Blue Neck Events turned our dream wedding into a reality that exceeded every expectation. The attention to detail was simply breathtaking.', rating: 5, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', order: 1 },
      { name: 'Rajesh Kumar', event: 'Corporate Summit — Mumbai', quote: 'Our annual summit was transformed into a world-class experience. Every guest was in awe. Blue Neck delivered beyond our briefing.', rating: 5, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', order: 2 },
      { name: 'Ananya Sharma', event: 'Birthday Gala — Delhi', quote: 'My 40th birthday felt like a Hollywood production. The themes, the décor, the flow — absolute perfection from start to finish.', rating: 5, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80', order: 3 },
      { name: 'Tech Innovations Ltd.', event: 'Product Launch — Bangalore', quote: 'Our iPhone-level product launch event created national buzz. Blue Neck understood our brand DNA perfectly.', rating: 5, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', order: 4 },
    ])
  }

  // ── Team Members ────────────────────────────────────────
  const teamCount = await TeamMember.countDocuments()
  if (teamCount === 0) {
    await TeamMember.insertMany([
      { name: 'Vikram Nair', role: 'Founder & Creative Director', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80', bio: '15 years of transforming visions into extraordinary experiences.', order: 1 },
      { name: 'Sneha Kapoor', role: 'Head of Design & Décor', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80', bio: 'Award-winning designer with a passion for immersive environments.', order: 2 },
      { name: 'Aryan Desai', role: 'Operations Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80', bio: 'Precision-driven logistics expert who ensures flawless execution.', order: 3 },
      { name: 'Riya Malhotra', role: 'Client Experience Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80', bio: 'Dedicated to turning every client dream into absolute reality.', order: 4 },
    ])
  }

  return NextResponse.json({ success: true, message: 'Database seeded successfully! Admin: admin@blueneckevents.com / BlueNeck@2024' })
}
