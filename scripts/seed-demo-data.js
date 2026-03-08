// scripts/seed-demo-data.js
// ============================================================
// Run this script to populate Firestore with demo data
// Usage: node scripts/seed-demo-data.js
// Requires: FIREBASE_SERVICE_ACCOUNT env var or serviceAccount.json
// ============================================================

const admin = require('firebase-admin');

// Initialize with service account (download from Firebase Console)
// admin.initializeApp({ credential: admin.credential.cert('./serviceAccount.json') });

const DEMO_PROPERTIES = [
  {
    title: 'Modern Studio Near UR Huye Campus',
    location: 'Huye, Southern Province — 5min from UR',
    price: 75000,
    type: 'studio',
    bedrooms: 1,
    bathrooms: 1,
    area: 28,
    description: 'A beautifully furnished studio apartment just a 5-minute walk from the University of Rwanda Huye campus. Perfect for solo students who value comfort and convenience. The room features a private bathroom, reliable WiFi, 24/7 electricity, and secure access.',
    amenities: ['wifi', 'electricity', 'water', 'security', 'furnished'],
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800',
    ],
    verified: true,
    status: 'approved',
    landlordId: 'demo-landlord-1',
    landlordName: 'Jean Baptiste Nkurunziza',
    landlordPhone: '+250 788 123 456',
    views: 247,
    inquiries: 18,
    rating: 4.8,
  },
  {
    title: 'Shared House — 4 Students, Great Community',
    location: 'Kigali, Gikondo — Near INES Ruhengeri Campus',
    price: 45000,
    type: 'shared',
    bedrooms: 4,
    bathrooms: 2,
    area: 120,
    description: 'Join a friendly house of fellow university students. Private rooms with shared kitchen and living areas. Located near public transport with easy access to multiple university campuses in Kigali.',
    amenities: ['wifi', 'water', 'electricity', 'parking'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800',
    ],
    verified: true,
    status: 'approved',
    landlordId: 'demo-landlord-2',
    landlordName: 'Marie Claire Uwimana',
    landlordPhone: '+250 722 987 654',
    views: 189,
    inquiries: 12,
    rating: 4.5,
  },
  {
    title: 'Spacious 1-Bedroom Apartment — All Inclusive',
    location: 'Musanze, Northern Province — INES Campus Area',
    price: 120000,
    type: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    description: 'Premium apartment with all utilities included. Fully furnished with modern appliances, high-speed WiFi, and 24/7 security. Perfect for graduate students or couples.',
    amenities: ['wifi', 'electricity', 'water', 'security', 'parking', 'furnished'],
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    ],
    verified: true,
    status: 'approved',
    landlordId: 'demo-landlord-3',
    landlordName: 'Patrick Habimana',
    landlordPhone: '+250 735 456 789',
    views: 312,
    inquiries: 24,
    rating: 4.9,
  },
];

// Uncomment and run to seed:
// async function seed() {
//   const db = admin.firestore();
//   for (const property of DEMO_PROPERTIES) {
//     await db.collection('properties').add({
//       ...property,
//       createdAt: admin.firestore.FieldValue.serverTimestamp(),
//       updatedAt: admin.firestore.FieldValue.serverTimestamp(),
//     });
//     console.log(`Added: ${property.title}`);
//   }
//   console.log('Seeding complete!');
// }
// seed().catch(console.error);

module.exports = { DEMO_PROPERTIES };
