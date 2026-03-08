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
  // opacity curve used earlier was hiding the hero when navigation kept a non‑zero
  // scroll position; we now control the fade with explicit motion props so the
  // content is always visible on first render.

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
        className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-blue-700"
      >
        {/* Animated background elements */}
        <motion.div style={{ y }} className="absolute inset-0">
          <div className="absolute inset-0 hero-pattern opacity-30" />
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-64 h-64 rounded-full top-20 right-10 bg-white/5 blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full bottom-20 left-10 w-80 h-80 bg-accent-500/10 blur-3xl"
          />
        </motion.div>

        {/* Floating cards decoration */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute items-center hidden gap-3 px-4 py-3 shadow-xl top-32 right-12 lg:flex glass rounded-2xl"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-secondary-500 rounded-xl">
            <Shield size={20} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-black">Verified ✓</div>
            <div className="text-xs text-black/70">Physically Inspected</div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, delay: 1 }}
          className="absolute items-center hidden gap-3 px-4 py-3 shadow-xl bottom-40 left-12 lg:flex glass rounded-2xl"
        >
          <div className="flex items-center justify-center w-10 h-10 bg-accent-500 rounded-xl">
            <Star size={20} className="text-white" />
          </div>
          <div>
            <div className="text-sm font-bold text-black">4.9 / 5.0</div>
            <div className="text-xs text-black/70">Student Rating</div>
          </div>
        </motion.div>

        {/* Hero Content */}
        <motion.div className="relative z-10 max-w-4xl px-6 pt-20 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-semibold text-white border rounded-full bg-white/10 border-white/20">
              <span className="w-2 h-2 rounded-full bg-secondary-400 animate-pulse" />
              Rwanda's #1 Student Housing Platform
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6 text-5xl font-extrabold leading-tight text-white font-display sm:text-6xl lg:text-7xl"
          >
            Find Your Perfect
            <br />
            <span className="text-accent-400">Student Home</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-10 text-xl leading-relaxed text-white/80"
          >
            Browse verified off-campus housing near your university. Compare options, reserve remotely, and move in with confidence.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex max-w-2xl gap-3 mx-auto"
          >
            <div className="relative flex-1">
              <MapPin size={18} className="absolute text-gray-400 -translate-y-1/2 left-4 top-1/2" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by location or university..."
                className="w-full py-4 pr-4 text-base text-gray-800 border-0 shadow-lg pl-11 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50"
                onKeyDown={e => e.key === 'Enter' && window.location.assign(`/properties?q=${query}`)}
              />
            </div>
            <Link href={`/properties${query ? `?q=${query}` : ''}`}>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-8 py-4 text-base font-bold text-white shadow-lg bg-accent-500 hover:bg-accent-600 rounded-2xl whitespace-nowrap"
              >
                <Search size={20} />
                Search
              </motion.button>
            </Link>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute -translate-x-1/2 bottom-8 left-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-start justify-center w-6 h-10 pt-2 border-2 rounded-full border-white/30"
          >
            <div className="w-1.5 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div> */}
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl px-6 py-8 mx-auto">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
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
                  <div className="flex items-center justify-center w-12 h-12 bg-primary-50 rounded-xl">
                    <Icon size={22} className="text-primary-500" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-gray-900 font-display">
                  {statValues[i].toLocaleString()}{suffix}
                </div>
                <div className="mt-1 text-sm text-gray-500">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ──────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="px-6 mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-10"
          >
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 font-display sm:text-4xl">
                Featured <span className="gradient-text">Listings</span>
              </h2>
              <p className="mt-2 text-gray-500">Recently verified properties for students</p>
            </div>
            <Link href="/properties">
              <motion.button
                whileHover={{ x: 5 }}
                className="items-center hidden gap-2 font-bold sm:flex text-primary-500 hover:text-primary-600"
              >
                View all <ArrowRight size={18} />
              </motion.button>
            </Link>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="overflow-hidden bg-white rounded-2xl">
                  <div className="h-52 shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="w-3/4 h-4 rounded shimmer" />
                    <div className="w-1/2 h-3 rounded shimmer" />
                    <div className="w-full h-3 rounded shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProperties.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <Home size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg text-gray-500">No properties yet — be the first landlord to list!</p>
              <Link href="/auth/signup">
                <button className="px-6 py-3 mt-4 font-bold text-white bg-primary-500 rounded-xl">List a Property</button>
              </Link>
            </div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link href="/properties">
              <button className="px-8 py-3 font-bold text-white bg-primary-500 rounded-xl">View All Properties</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl px-6 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 font-display sm:text-4xl">
              How <span className="gradient-text-green">HUZA</span> Works
            </h2>
            <p className="max-w-xl mx-auto text-gray-500">
              From search to move-in in 4 simple steps — no landlord middlemen, no hidden fees.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 shadow-lg bg-primary-500 rounded-2xl shadow-blue-200">
                    <span className="text-2xl font-extrabold text-white font-display">{step}</span>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent" />
                  )}
                </div>
                <h3 className="mb-2 text-lg font-bold text-gray-900 font-display">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl px-6 mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-14">
            <h2 className="mb-4 text-3xl font-extrabold text-gray-900 font-display sm:text-4xl">
              Why Students <span className="gradient-text">Trust HUZA</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FEATURES.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="flex gap-5 p-6 transition-all bg-white border border-gray-100 shadow-sm rounded-2xl hover:shadow-lg"
              >
                <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shrink-0`}>
                  <Icon size={26} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-bold text-gray-900 font-display">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-primary-600 to-blue-700">
        <div className="absolute inset-0 hero-pattern opacity-20" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl px-6 mx-auto text-center"
        >
          <h2 className="mb-4 text-4xl font-extrabold text-white font-display">
            Ready to Find Your Room?
          </h2>
          <p className="mb-8 text-lg text-white/80">
            Join 2,400+ students who found verified housing through HUZA.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/properties">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-bold bg-white shadow-xl text-primary-500 rounded-2xl"
              >
                Browse Properties
              </motion.button>
            </Link>
            <Link href="/auth/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 text-lg font-bold text-white bg-accent-500 rounded-2xl"
              >
                Sign Up Free
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-gray-400 bg-gray-900">
        <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto sm:grid-cols-3">
          <div>
            <div className="mb-2 text-xl font-bold text-white font-display">HUZA</div>
            <p className="text-sm leading-relaxed">Student Icumbi Connect — Rwanda's verified student housing marketplace.</p>
          </div>
          <div>
            <div className="mb-3 font-bold text-white">Quick Links</div>
            <div className="space-y-2 text-sm">
              {['Browse Properties', 'How It Works', 'Landlord Dashboard', 'Contact'].map(link => (
                <div key={link} className="transition-colors cursor-pointer hover:text-white">{link}</div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-3 font-bold text-white">Contact</div>
            <div className="space-y-1 text-sm">
              <div>support@huza.rw</div>
              <div>+250 788 000 000</div>
              <div>Kigali, Rwanda</div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl pt-6 mx-auto mt-8 text-sm text-center border-t border-gray-800">
          © {new Date().getFullYear()} HUZA — Student Icumbi Connect. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
