# HUZA — Student Icumbi Connect
### Rwanda's Verified Student Housing Platform

> Find, compare, and reserve off-campus student housing with confidence.  
> Built with Next.js 14, Firebase, Framer Motion & GitHub image storage.

---

## 📁 Project Structure

```
huza/
├── app/
│   ├── page.js                    # Home (hero, featured listings, stats)
│   ├── layout.js                  # Root layout + providers
│   ├── globals.css                # Tailwind + custom CSS
│   ├── properties/
│   │   ├── page.js                # Browse all properties
│   │   └── [id]/page.js           # Property detail + reservation
│   ├── student/page.js            # Student reservations dashboard
│   ├── landlord/page.js           # Landlord dashboard
│   ├── admin/page.js              # Admin verification panel
│   ├── auth/
│   │   ├── login/page.js          # Login page
│   │   └── signup/page.js         # Signup with role selection
│   └── api/
│       └── upload-image/route.js  # GitHub image upload endpoint
├── components/
│   ├── layout/
│   │   └── Navbar.js              # Responsive navbar with role nav
│   └── property/
│       ├── PropertyCard.js        # Animated property card
│       ├── SearchFilter.js        # Search + advanced filters
│       ├── ReservationModal.js    # 3-step gamified reservation
│       ├── ImageUploader.js       # Drag-and-drop GitHub uploader
│       └── AddPropertyModal.js    # Landlord listing form
├── lib/
│   ├── firebase.js                # Firebase initialization
│   ├── firestore.js               # All CRUD operations
│   ├── github-storage.js          # GitHub image utilities
│   └── auth-context.js            # Auth provider + hooks
├── scripts/
│   └── seed-demo-data.js          # Seed demo properties
├── firestore.rules                # Security rules
├── .env.example                   # Environment variables template
└── package.json
```

---

## 🚀 Quick Setup (5 Steps)

### Step 1: Clone & Install

```bash
# Create the project folder with all files above, then:
cd huza
npm install
```

### Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Authentication** → Sign-in Methods → Email/Password + Google
4. Enable **Firestore Database** (start in test mode)
5. Enable **Storage** (optional)
6. Go to **Project Settings** → Your apps → Add web app → Copy config

### Step 3: GitHub Image Repo Setup

1. Create a **public** GitHub repository (e.g., `huza-property-images`)
2. Initialize it with a README
3. Go to GitHub Settings → Developer Settings → Personal Access Tokens
4. Create a token with `repo` permissions
5. Copy the token

### Step 4: Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123:web:abc123

# GitHub (server-side only)
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=your_github_username
GITHUB_REPO=huza-property-images
GITHUB_BRANCH=main

# Google Maps (optional but recommended)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSy...
```

### Step 5: Deploy Firestore Rules

```bash
# Install Firebase CLI if needed:
npm install -g firebase-tools
firebase login
firebase init firestore

# Deploy security rules:
firebase deploy --only firestore:rules
```

### Run Development Server

```bash
npm run dev
# Open http://localhost:3000
```

---

## 🔐 User Roles

| Role | Access |
|------|--------|
| **Student** | Browse, filter, reserve properties, view reservation history |
| **Landlord** | Create/manage listings, view/respond to inquiries, analytics |
| **Admin** | Approve/reject listings, view all data |

**To create an Admin account:**
1. Register normally as any role
2. Go to Firebase Console → Firestore → `users` collection
3. Find your document, change `role` to `"admin"`

---

## 🌟 Key Features

### Student Features
- 🔍 Smart search with price/location/amenity filters  
- 🏠 Verified property badges (admin-inspected)
- 📱 Remote reservation with 3-step gamified flow
- ⚖️ Side-by-side property comparison (select up to 3)
- 💙 Wishlist / favorites
- 📊 Reservation tracking dashboard

### Landlord Features
- ➕ Property listing with drag-and-drop image upload to GitHub
- 📈 Analytics: views, inquiries per listing
- 🔔 Real-time reservation notifications
- ✅ Confirm/decline tenant requests
- 🏷️ Status tracking (pending → approved → live)

### Admin Features
- 🛡️ Review pending property submissions
- ✔️ Approve with verified badge or reject with reason
- 📋 Full property detail view before deciding

### Platform
- 🎨 Framer Motion animations throughout (parallax hero, slide modals, staggered cards)
- 📱 Fully responsive for mobile students
- 🔐 Role-based access control (Firebase + Firestore rules)
- 🚀 Image CDN via GitHub raw URLs (free, fast)

---

## 🌐 Deployment to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard:
# https://vercel.com/[your-team]/[project]/settings/environment-variables
# Add all variables from .env.local
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Important Vercel Settings
- Framework: **Next.js**
- Build command: `npm run build`
- Install command: `npm install`
- Node.js version: **18.x or 20.x**

---

## 🧪 Seed Demo Data

To add sample properties:

```bash
# 1. Download Firebase service account key
# Firebase Console → Project Settings → Service Accounts → Generate Key
# Save as scripts/serviceAccount.json

# 2. Uncomment the seed() call in scripts/seed-demo-data.js

# 3. Run:
node scripts/seed-demo-data.js
```

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next` 14 | App Router, RSC, API routes |
| `firebase` 10 | Auth, Firestore, Storage |
| `framer-motion` 11 | Animations & transitions |
| `tailwindcss` 3 | Styling |
| `react-dropzone` | Drag-and-drop image upload |
| `react-hot-toast` | Toast notifications |
| `lucide-react` | Icons |
| `date-fns` | Date formatting |

---

## 🗺️ Google Maps Integration

To enable maps in property detail pages:

1. Get a [Google Maps API Key](https://console.cloud.google.com/google/maps-apis)
2. Enable the **Maps JavaScript API** and **Places API**
3. Add to `.env.local`: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key`
4. Replace the map placeholder in `app/properties/[id]/page.js` with:

```jsx
import { Loader } from '@googlemaps/js-api-loader';

// Initialize map in useEffect with:
const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places'],
});
```

---

## 🐛 Troubleshooting

| Issue | Fix |
|-------|-----|
| Firebase permission denied | Check Firestore rules; ensure user role set correctly |
| Images not uploading | Verify `GITHUB_TOKEN` has `repo` scope and repo is public |
| Google login fails | Add `localhost` to Firebase Auth authorized domains |
| Build errors | Check all env vars are set; run `npm install` fresh |

---

## 📝 License

MIT — Free to use and modify for educational and commercial purposes.

---

Built with ❤️ for students in Rwanda 🇷🇼
