'use client';
// app/student/page.js — Student Reservations Dashboard
// ============================================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Clock, Check, X, Search, Home } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { getStudentReservations } from '@/lib/firestore';
import { format } from 'date-fns';

const STATUS_CONFIG = {
  pending: { label: 'Pending Review', color: 'bg-yellow-50 text-yellow-700', icon: Clock },
  confirmed: { label: 'Confirmed', color: 'bg-secondary-50 text-secondary-600', icon: Check },
  cancelled: { label: 'Cancelled', color: 'bg-red-50 text-red-500', icon: X },
};

export default function StudentDashboard() {
  const { user, userProfile, isStudent } = useAuth();
  const router = useRouter();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (userProfile && !isStudent) {
      router.push('/');
      return;
    }
    if (user) {
      getStudentReservations(user.uid).then(data => {
        setReservations(data);
        setLoading(false);
      });
    }
  }, [user, userProfile, isStudent, router]);

  const filtered = filter === 'all'
    ? reservations
    : reservations.filter(r => r.status === filter);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
              <GraduationCap size={26} className="text-primary-500" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-3xl text-gray-900">
                My Reservations
              </h1>
              <p className="text-gray-500 text-sm">Welcome, {userProfile?.name?.split(' ')[0]}!</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total', value: reservations.length, color: 'text-primary-500' },
            { label: 'Confirmed', value: reservations.filter(r => r.status === 'confirmed').length, color: 'text-secondary-500' },
            { label: 'Pending', value: reservations.filter(r => r.status === 'pending').length, color: 'text-yellow-500' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className={`font-display font-extrabold text-3xl ${color}`}>{value}</div>
              <div className="text-gray-500 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
                filter === f ? 'bg-primary-500 text-white shadow' : 'bg-white text-gray-500 hover:bg-gray-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Reservations */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => <div key={i} className="h-32 shimmer rounded-2xl" />)}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <Home size={56} className="text-gray-200 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-gray-500 mb-2">
              {filter === 'all' ? 'No reservations yet' : `No ${filter} reservations`}
            </h3>
            <p className="text-gray-400 mb-6">Browse verified properties and reserve your perfect room</p>
            <Link href="/properties">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-2xl font-bold mx-auto">
                <Search size={18} />
                Browse Properties
              </button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((r, i) => {
                const statusConfig = STATUS_CONFIG[r.status] || STATUS_CONFIG.pending;
                const StatusIcon = statusConfig.icon;
                return (
                  <motion.div
                    key={r.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
                            {r.propertyTitle}
                          </h3>
                          <div className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${statusConfig.color}`}>
                            <StatusIcon size={11} />
                            {statusConfig.label}
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                          <MapPin size={13} className="text-accent-500" />
                          <span>{r.propertyLocation}</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs text-gray-400 mb-0.5">Move-in Date</div>
                            <div className="font-semibold text-gray-900 text-sm">{r.moveInDate}</div>
                          </div>
                          <div className="bg-gray-50 rounded-xl p-3">
                            <div className="text-xs text-gray-400 mb-0.5">Duration</div>
                            <div className="font-semibold text-gray-900 text-sm">{r.duration} months</div>
                          </div>
                          <div className="bg-primary-50 rounded-xl p-3">
                            <div className="text-xs text-gray-400 mb-0.5">Total Estimate</div>
                            <div className="font-bold text-primary-500 text-sm">{r.totalEstimate?.toLocaleString()} RWF</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {r.message && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-xl">
                        <div className="text-xs text-gray-400 mb-1">Your message to landlord</div>
                        <div className="text-sm text-gray-600 italic">"{r.message}"</div>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        Submitted {r.createdAt?.toDate ? format(r.createdAt.toDate(), 'MMM d, yyyy') : 'recently'}
                      </span>
                      <Link href={`/properties/${r.propertyId}`}>
                        <button className="text-primary-500 font-semibold hover:underline">View Property →</button>
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
