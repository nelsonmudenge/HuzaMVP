'use client';
// app/page.js — Home Page
// ============================================================
// Hero section with parallax, search bar, stats, featured
// properties, and CTA sections
// ============================================================

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Search, Shield, Star, ArrowRight, Home, Users, Building2, TrendingUp, MapPin, CheckCircle } from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import { getProperties } from '@/lib/firestore';

// Animated counter hook
function useCounter(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

const STATS = [
  { icon: Home, label: 'Verified Listings', value: 500, suffix: '+' },
  { icon: Users, label: 'Happy Students', value: 2400, suffix: '+' },
  { icon: Building2, label: 'Partner Landlords', value: 120, suffix: '+' },
  { icon: Shield, label: 'Safe Reservations', value: 98, suffix: '%' },
];

const FEATURES = [
  { icon: Shield, title: 'Admin-Verified Properties', desc: 'Every listing is physically inspected by our team before going live.', color: 'bg-secondary-50 text-secondary-500' },
  { icon: Search, title: 'Smart Search & Filters', desc: 'Find your ideal place by price, location, amenities, and property type.', color: 'bg-primary-50 text-primary-500' },
  { icon: Star, title: 'Remote Reservation', desc: 'Reserve your room from anywhere with a few taps — no in-person visit needed.', color: 'bg-accent-50 text-accent-500' },
  { icon: TrendingUp, title: 'Real-time Availability', desc: 'Live updates on room availability so you never miss out.', color: 'bg-purple-50 text-purple-500' },
];

const HOW_IT_WORKS = [
  { step: 1, title: 'Search & Filter', desc: 'Browse hundreds of verified student rooms near your campus.' },
  { step: 2, title: 'Compare Options', desc: 'Side-by-side comparison of shortlisted properties.' },
  { step: 3, title: 'Reserve Remotely', desc: 'Submit your reservation with personal details securely.' },
  { step: 4, title: 'Move In!', desc: 'Landlord confirms and you receive detailed move-in instructions.' },
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [featuredProperties, setFeaturedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animated stat counters
  const s0 = useCounter(500);
  const s1 = useCounter(2400);
  const s2 = useCounter(120);
  const s3 = useCounter(98);
  const statValues = [s0, s1, s2, s3];

  useEffect(() => {
    getProperties({}).then(data => {
      setFeaturedProperties(data.slice(0, 6));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* ── HERO SECTION ─────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-500 to-blue-700 overflow-hidden"
      >
        {/* Animated background elements */}
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute inset-0 hero-pattern opacity-30" />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-20 left-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"
          />
        </motion.div>

        {/* Floating cards decoration */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-32 right-12 hidden lg:flex items-center gap-3 glass px-4 py-3 rounded-2xl shadow-xl"
        >
          <div className="w-10 h-10 bg-secondary-500 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">Verified ✓</div>
            <div className="text-white/70 text-xs">Physically Inspected</div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute bottom-40 left-12 hidden lg:flex items-center gap-3 glass px-4 py-3 rounded-2xl shadow-xl"
        >
          <div className="w-10 h-10 bg-accent-500 rounded-xl flex items-center justify-center">
            <Star size={20} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">4.9 / 5.0</div>
            <div className="text-white/70 text-xs">Student Rating</div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div style={{ opacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full mb-6 border border-white/20">
              <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
              Rwanda's #1 Student Housing Platform
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white mb-6 leading-tight"
          >
            Find Your Perfect
            <br />
            <span className="text-accent-400">Student Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Browse verified off-campus housing near your university. Compare options, reserve remotely, and move in with confidence.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 max-w-2xl mx-auto"
          >
            <div className="flex-1 relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by location or university..."
                className="w-full pl-11 pr-4 py-4 rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 shadow-lg text-base"
                onKeyDown={e => e.key === 'Enter' && window.location.assign(`/properties?q=${query}`)}
              />
            </div>
            <Link href={`/properties${query ? `?q=${query}` : ''}`}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent-500 hover:bg-accent-600 text-white rounded-2xl font-bold text-base shadow-lg flex items-center gap-2 whitespace-nowrap"
              >
                <Search size={20} />
                Search
              </motion.button>
            </Link>
          </motion.div>

          {/* Quick filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3 mt-6"
          >
            {['Near UR', 'Kigali Center', 'Under 100k RWF', 'Furnished', 'Wifi Included'].map(tag => (
              <Link key={tag} href={`/properties?q=${tag}`}>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full border border-white/20 transition-all">
                  {tag}
                </button>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, label, value, suffix }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
                    <Icon size={22} className="text-primary-500" />
                  </div>
                </div>
                <div className="font-display font-extrabold text-3xl text-gray-900">
                  {statValues[i].toLocaleString()}{suffix}
                </div>
                <div className="text-gray-500 text-sm mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900">
                Featured <span className="gradient-text">Listings</span>
              </h2>
              <p className="text-gray-500 mt-2">Recently verified properties for students</p>
            </div>
            <Link href="/properties">
              <motion.button
                whileHover={{ x: 5 }}
                className="hidden sm:flex items-center gap-2 text-primary-500 font-bold hover:text-primary-600"
              >
                View all <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden">
                  <div className="h-52 shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 shimmer rounded w-3/4" />
                    <div className="h-3 shimmer rounded w-1/2" />
                    <div className="h-3 shimmer rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Home size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No properties yet — be the first landlord to list!</p>
              <Link href="/auth/signup">
                <button className="mt-4 px-6 py-3 bg-primary-500 text-white rounded-xl font-bold">List a Property</button>
              </Link>
            </div>
          )}

          <div className="text-center mt-10 sm:hidden">
            <Link href="/properties">
              <button className="px-8 py-3 bg-primary-500 text-white rounded-xl font-bold">View All Properties</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 mb-4">
              How <span className="gradient-text-green">HUZA</span> Works
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From search to move-in in 4 simple steps — no landlord middlemen, no hidden fees.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
                    <span className="font-display font-extrabold text-2xl text-white">{step}</span>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent" />
                  )}
                </div>
                <h3 className="font-display font-bold text-lg text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-gray-900 mb-4">
              Why Students <span className="gradient-text">Trust HUZA</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100 flex gap-5"
              >
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shrink-0`}>
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-1">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto text-center px-6"
        >
          <h2 className="font-display font-extrabold text-4xl text-white mb-4">
            Ready to Find Your Room?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join 2,400+ students who found verified housing through HUZA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-primary-500 rounded-2xl font-bold text-lg shadow-xl"
              >
                Browse Properties
              </motion.button>
            </Link>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-accent-500 text-white rounded-2xl font-bold text-lg"
              >
                Sign Up Free
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="font-display font-bold text-white text-xl mb-2">HUZA</div>
            <p className="text-sm leading-relaxed">Student Icumbi Connect — Rwanda's verified student housing marketplace.</p>
          </div>
          <div>
            <div className="font-bold text-white mb-3">Quick Links</div>
            <div className="space-y-2 text-sm">
              {['Browse Properties', 'How It Works', 'Landlord Dashboard', 'Contact'].map(link => (
                <div key={link} className="hover:text-white cursor-pointer transition-colors">{link}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-bold text-white mb-3">Contact</div>
            <div className="text-sm space-y-1">
              <div>support@huza.rw</div>
              <div>+250 788 000 000</div>
              <div>Kigali, Rwanda</div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-gray-800 text-center text-sm">
          © {new Date().getFullYear()} HUZA — Student Icumbi Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
