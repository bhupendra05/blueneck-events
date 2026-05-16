const mongoose = require('mongoose');
const Gallery = require('../models/Gallery');

require('dotenv').config({ path: '.env.local' });

async function testGalleryUpload() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const testItem = {
      src: 'https://via.placeholder.com/800x600/333/fff?text=Test+Image',
      cloudinaryId: 'test-image-123',
      category: 'weddings',
      title: 'Test Gallery Image',
      mediaType: 'image',
      cols: 1,
      rows: 1,
      tags: []
    };

    console.log('Creating test gallery item...');
    const item = await Gallery.create(testItem);
    console.log('✓ Test gallery item created:', item.title);
    console.log('✓ ID:', item._id);
    console.log('✓ Category:', item.category);
    console.log('✓ Image URL:', item.src);

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testGalleryUpload();
