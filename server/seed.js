const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';

const products = [
  {
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    image: '/images/headphones.svg',
    category: 'Electronics',
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    countInStock: 15,
    rating: 4.5
  },
  {
    name: 'Smart Watch Pro',
    price: 199.99,
    image: '/images/smartwatch.svg',
    category: 'Electronics',
    description: 'Feature-rich smartwatch with heart rate monitor, GPS, and water resistance.',
    countInStock: 8,
    rating: 4.3
  },
  {
    name: 'Laptop Backpack',
    price: 49.99,
    image: '/images/backpack.svg',
    category: 'Accessories',
    description: 'Durable laptop backpack with USB charging port and anti-theft design.',
    countInStock: 25,
    rating: 4.7
  },
  {
    name: 'Mechanical Keyboard',
    price: 129.99,
    image: '/images/keyboard.svg',
    category: 'Electronics',
    description: 'RGB mechanical keyboard with Cherry MX switches and aluminum frame.',
    countInStock: 12,
    rating: 4.6
  },
  {
    name: 'Running Shoes',
    price: 89.99,
    image: '/images/shoes.svg',
    category: 'Sports',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh.',
    countInStock: 30,
    rating: 4.4
  },
  {
    name: 'Yoga Mat Premium',
    price: 34.99,
    image: '/images/yogamat.svg',
    category: 'Sports',
    description: 'Non-slip yoga mat with extra thickness for joint protection.',
    countInStock: 20,
    rating: 4.2
  },
  {
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    image: '/images/bottle.svg',
    category: 'Accessories',
    description: 'Insulated water bottle keeps drinks cold 24hrs or hot 12hrs.',
    countInStock: 40,
    rating: 4.8
  },
  {
    name: 'Wireless Mouse',
    price: 39.99,
    image: '/images/mouse.svg',
    category: 'Electronics',
    description: 'Ergonomic wireless mouse with adjustable DPI and silent clicks.',
    countInStock: 18,
    rating: 4.1
  },
  {
    name: 'Cotton T-Shirt Pack',
    price: 29.99,
    image: '/images/tshirts.svg',
    category: 'Clothing',
    description: 'Pack of 3 premium cotton t-shirts in assorted colors.',
    countInStock: 50,
    rating: 4.0
  },
  {
    name: 'Denim Jacket',
    price: 69.99,
    image: '/images/jacket.svg',
    category: 'Clothing',
    description: 'Classic denim jacket with modern fit and vintage wash.',
    countInStock: 10,
    rating: 4.3
  },
  {
    name: 'Portable Charger 20000mAh',
    price: 44.99,
    image: '/images/charger.svg',
    category: 'Electronics',
    description: 'High-capacity portable charger with fast charging and dual USB ports.',
    countInStock: 22,
    rating: 4.5
  },
  {
    name: 'Sunglasses UV Protection',
    price: 54.99,
    image: '/images/sunglasses.svg',
    category: 'Accessories',
    description: 'Polarized sunglasses with UV400 protection and lightweight frame.',
    countInStock: 35,
    rating: 4.4
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(products);
    console.log('Inserted 12 sample products');

    // Create admin user if not exists
    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin123',
        isAdmin: true
      });
      console.log('Created admin user (admin@example.com / admin123)');
    }

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seed();
