const fs = require('fs');

// Use the dev server URL (port 3000)
const BASE_URL = 'http://localhost:3000';

// Placeholder images (using Unsplash)
const placeholderImages = {
  hero: [
    'https://images.unsplash.com/photo-1519741349-a57a0f88d50a?auto=format&fit=crop&w=1920&q=85',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=85',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=85',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1920&q=85',
  ],
  weddings: [
    'https://images.unsplash.com/photo-1519741349-a57a0f88d50a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80',
  ],
  corporate: [
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  ],
  social: [
    'https://images.unsplash.com/photo-1514525253161-7a6c1cc1a1a6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1485872299829-c673f5194813?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80',
  ],
  birthdays: [
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578922746465-3a80a228f223?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611048267451-e6ed903d4a38?auto=format&fit=crop&w=800&q=80',
  ],
  galas: [
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1529543544282-ea669407fca3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1481833761820-0509d3217039?auto=format&fit=crop&w=800&q=80',
  ],
  sports: [
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80',
  ],
  launches: [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540317580384-e5d43867caa6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1496200186974-4293800e2c20?auto=format&fit=crop&w=800&q=80',
  ],
  concerts: [
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1501386761578-eaa54b23bce1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
  ],
  destinations: [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
  ],
  team: [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
  ],
  testimonials: [
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  ],
};

async function populateData() {
  try {
    console.log(`Using API at: ${BASE_URL}`);

    // Clear existing data by calling delete endpoints or just adding new data
    console.log('Populating data via API...');

    // Populate Gallery
    console.log('Populating Gallery...');
    const categories = ['weddings', 'corporate', 'social', 'birthdays', 'galas', 'sports', 'launches', 'concerts', 'destinations'];
    for (const category of categories) {
      for (let i = 0; i < 4; i++) {
        await fetch(`${BASE_URL}/api/gallery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            src: placeholderImages[category][i],
            cloudinaryId: '',
            category,
            title: `${category.charAt(0).toUpperCase() + category.slice(1)} Event ${i + 1}`,
            mediaType: 'image',
            cols: 1,
            rows: 1,
            tags: [category],
            isActive: true,
          }),
        });
      }
      console.log(`  Added 4 images for ${category}`);
    }

    // Populate Events
    console.log('Populating Events...');
    const eventHeroImages = {
      weddings: 'https://images.unsplash.com/photo-1519741349-a57a0f88d50a?auto=format&fit=crop&w=1920&q=85',
      corporate: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1920&q=85',
      social: 'https://images.unsplash.com/photo-1514525253161-7a6c1cc1a1a6?auto=format&fit=crop&w=1920&q=85',
      birthdays: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1920&q=85',
      galas: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=85',
      sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1920&q=85',
      launches: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=85',
      concerts: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1920&q=85',
      destinations: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1920&q=85',
    };

    const eventData = {
      weddings: { id: 'weddings', label: 'Weddings', tagline: 'Forever Begins\nWith Us.', description: 'Your wedding day deserves to be nothing short of magical. We orchestrate every detail — from the grand entrance to the final farewell — so you can focus on what truly matters: each other.', href: '/weddings', color: '#C9A740', accentColor: '#E8C86A', icon: '💍' },
      corporate: { id: 'corporate', label: 'Corporate Events', tagline: 'Elevate Your\nBrand Presence.', description: 'We understand corporate events. The precision, the professionalism, the impact — we bring that same energy to every corporate event we execute.', href: '/corporate', color: '#2A6BB0', accentColor: '#4085C9', icon: '🏢' },
      social: { id: 'social', label: 'Social Events', tagline: 'Celebrate Every\nMilestone.', description: 'Life is meant to be celebrated. From intimate gatherings to grand celebrations, we create social events that bring people together and create lasting memories.', href: '/social', color: '#F0C860', accentColor: '#D4A840', icon: '🎉' },
      birthdays: { id: 'birthdays', label: 'Birthday Parties', tagline: 'Another Year,\nAnother Adventure.', description: 'Birthdays are personal. They are about you, your journey, and the people who matter most. We create birthday celebrations that are as unique as you are.', href: '/birthdays', color: '#E8A0BF', accentColor: '#C97B8A', icon: '🎂' },
      galas: { id: 'galas', label: 'Luxury Galas', tagline: 'Black-Tie Moments\nRedefined.', description: 'We redefine what luxury truly means. Our galas are not just events — they are experiences that exist at the intersection of art, elegance, and human connection.', href: '/galas', color: '#9B59B6', accentColor: '#7D3C96', icon: '🥂' },
      sports: { id: 'sports', label: 'Sports Events', tagline: 'Adrenaline Meets\nExcellence.', description: 'We understand sports. The rush, the roar of the crowd, the precision — we bring that same energy to the management of every sporting event we execute.', href: '/sports', color: '#40C940', accentColor: '#27AE60', icon: '🏆' },
      launches: { id: 'launches', label: 'Product Launches', tagline: 'Unveil With\nMaximum Impact.', description: 'Your product is ready to change the world — our launch events make sure the world is ready for your product. We create moments of reveal that the media can\'t ignore.', href: '/launches', color: '#E74C3C', accentColor: '#C0392B', icon: '🚀' },
      concerts: { id: 'concerts', label: 'Concerts & Shows', tagline: 'Electrify\nThe Night.', description: 'Thousands of people. One unforgettable night. Our concert production team handles every decibel and every spotlight to deliver performances that are nothing short of legendary.', href: '/concerts', color: '#3498DB', accentColor: '#1A6BA6', icon: '🎸' },
      destinations: { id: 'destinations', label: 'Destination Events', tagline: 'The World As\nYour Venue.', description: 'Why settle for a venue when you can have a destination? Our destination event specialists manage every detail — flights, stays, permits, and pure magic — so you only experience wonder.', href: '/destinations', color: '#1ABC9C', accentColor: '#148F77', icon: '✈️' },
    };

    for (const [key, data] of Object.entries(eventData)) {
      await fetch(`${BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          heroImage: eventHeroImages[key],
          isActive: true,
          order: 0,
        }),
      });
      console.log(`  Added event: ${data.label}`);
    }

    // Populate Team
    console.log('Populating Team...');
    const teamData = [
      { name: 'Arjun Sharma', role: 'CEO', bio: 'Visionary leader with 15+ years in event management excellence.' },
      { name: 'Priya Kapoor', role: 'Creative Director', bio: 'Award-winning creative mind behind our most spectacular events.' },
      { name: 'Rahul Mehta', role: 'Operations Head', bio: 'Logistics wizard ensuring flawless execution every time.' },
      { name: 'Sneha Nair', role: 'Client Relations', bio: 'Dedicated to making every client feel like family.' },
    ];
    for (let i = 0; i < teamData.length; i++) {
      await fetch(`${BASE_URL}/api/team`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...teamData[i],
          image: placeholderImages.team[i],
          order: i,
          isActive: true,
        }),
      });
      console.log(`  Added team member: ${teamData[i].name}`);
    }

    // Populate Testimonials
    console.log('Populating Testimonials...');
    const testimonialData = [
      { name: 'Ananya', event: 'Wedding', quote: 'BlueNeck made our wedding absolutely magical. Every detail was perfect, and our guests are still talking about it!' },
      { name: 'Vikram', event: 'Corporate Summit', quote: 'Professional, efficient, and incredibly creative. They handled our 2000-person summit flawlessly.' },
      { name: 'Meera', event: 'Gala Dinner', quote: 'The gala was beyond anything we imagined. The attention to detail was extraordinary.' },
      { name: 'Rohit', event: 'Product Launch', quote: 'Our product launch was a massive success, thanks to BlueNeck\'s incredible team.' },
    ];
    for (let i = 0; i < testimonialData.length; i++) {
      await fetch(`${BASE_URL}/api/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...testimonialData[i],
          image: placeholderImages.testimonials[i],
          rating: 5,
          isActive: true,
        }),
      });
      console.log(`  Added testimonial from: ${testimonialData[i].name}`);
    }

    // Populate Settings
    console.log('Populating Settings...');
    await fetch(`${BASE_URL}/api/settings`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'BlueNeck Events',
        tagline: 'Where Moments Become Legends',
        description: 'India\'s most sought-after event architects, crafting extraordinary experiences that leave the world breathless.',
        heroTagline: 'Where Moments Become Legends',
        heroSubtitle: 'India\'s most sought-after event architects, crafting extraordinary experiences that leave the world breathless.',
        heroSlides: placeholderImages.hero.map((url, i) => ({ image: url, label: `Slide ${i + 1}` })),
        stats: [
          { value: 850, suffix: '+', label: 'Events' },
          { value: 12, suffix: 'K+', label: 'Guests Hosted' },
          { value: 9, suffix: ' Yrs', label: 'Excellence' },
          { value: 98, suffix: '%', label: 'Satisfaction' },
        ],
        contactEmail: 'info@blueneckevents.com',
        contactPhone: '+91 98765 43210',
        address: 'Mumbai, India',
        socialLinks: {
          facebook: 'https://facebook.com/blueneckevents',
          instagram: 'https://instagram.com/blueneckevents',
          twitter: 'https://twitter.com/blueneckevents',
          linkedin: 'https://linkedin.com/company/blueneckevents',
        },
      }),
    });
    console.log('  Added settings');

    console.log('\n✅ Demo data populated successfully!');
    console.log('\nSummary:');
    console.log('- 36 gallery images (4 per category)');
    console.log('- 9 events with hero images');
    console.log('- 4 team members with photos');
    console.log('- 4 testimonials with avatars');
    console.log('- 1 settings document with hero slides');

  } catch (error) {
    console.error('Error populating data:', error);
  }
}

populateData();
