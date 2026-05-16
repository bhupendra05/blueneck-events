const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');

require('dotenv').config({ path: '.env.local' });

async function addLocalImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const localImages = [
      { src: '/sample-images/event1.jpg', category: 'weddings', title: 'Elegant Wedding Setup', cols: 2, rows: 2, mediaType: 'image' },
      { src: '/sample-images/event2.jpg', category: 'corporate', title: 'Corporate Event Venue', cols: 1, rows: 1, mediaType: 'image' },
      { src: '/sample-images/event3.jpg', category: 'social', title: 'Social Celebration', cols: 2, rows: 1, mediaType: 'image' },
      { src: '/sample-images/event4.jpg', category: 'galas', title: 'Gala Night Event', cols: 1, rows: 2, mediaType: 'image' },
    ];

    for (const img of localImages) {
      const exists = await Gallery.findOne({ src: img.src });
      if (!exists) {
        await Gallery.create(img);
        console.log(`Added: ${img.title}`);
      } else {
        console.log(`Already exists: ${img.title}`);
      }
    }

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

addLocalImages();
