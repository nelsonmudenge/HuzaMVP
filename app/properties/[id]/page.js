'use client';
// app/properties/[id]/page.js — Property Detail Page
// ============================================================

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Shield, MapPin, BedDouble, Bath, Square,
  Wifi, Car, Zap, Droplets, ChevronLeft, ChevronRight,
  Star, Eye, Calendar, Share2, Heart, Phone, MessageSquare
} from 'lucide-react';
import { getProperty } from '@/lib/firestore';
import { useAuth } from '@/lib/auth-context';
import ReservationModal from '@/components/property/ReservationModal';
import toast from 'react-hot-toast';

const AMENITY_ICONS = {
  wifi: { icon: Wifi, label: 'WiFi', color: 'text-blue-500' },
  parking: { icon: Car, label: 'Parking', color: 'text-gray-500' },
  electricity: { icon: Zap, label: '24/7 Electricity', color: 'text-yellow-500' },
  water: { icon: Droplets, label: 'Running Water', color: 'text-cyan-500' },
  security: { icon: Shield, label: 'Security', color: 'text-green-500' },
};

export default function PropertyDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, isStudent } = useAuth();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;
    getProperty(id).then(data => {
      setProperty(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [id]);

  function handleReserve() {
    if (!user) {
      toast.error('Please login to reserve a property');
      router.push('/auth/login');
      return;
    }
    setShowModal(true);
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="h-8 shimmer rounded w-48 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-96 shimmer rounded-3xl" />
            <div className="space-y-4">
              <div className="h-64 shimmer rounded-2xl" />
              <div className="h-40 shimmer rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display font-bold text-2xl text-gray-700 mb-2">Property Not Found</h2>
          <Link href="/properties"><button className="btn-primary mt-4">Browse Properties</button></Link>
        </div>
      </div>
    );
  }

  const images = property.images?.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800'];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 mb-6"
        >
          <button onClick={() => router.back()} className="flex items-center gap-1.5 text-gray-500 hover:text-primary-500 text-sm font-semibold transition-colors">
            <ArrowLeft size={16} />
            Back to listings
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-gray-700 text-sm font-medium truncate">{property.title}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN — Images & Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-3xl overflow-hidden bg-gray-900"
            >
              <div className="relative h-96 sm:h-[480px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[currentImage]}
                      alt={`${property.title} - image ${currentImage + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage(i => i === 0 ? images.length - 1 : i - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentImage(i => i === images.length - 1 ? 0 : i + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-white w-5' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Verified Badge */}
                {property.verified && (
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    <Shield size={12} />
                    Admin Verified
                  </div>
                )}

                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={() => setLiked(!liked)}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow"
                  >
                    <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
                  </motion.button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}
                    className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow"
                  >
                    <Share2 size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Strip */}
              {images.length > 1 && (
                <div className="flex gap-2 p-3 bg-gray-100 overflow-x-auto">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`shrink-0 w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                        i === currentImage ? 'border-primary-500' : 'border-transparent'
                      }`}
                    >
                      <Image src={img} alt="" width={64} height={48} className="object-cover w-full h-full" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-gray-900 mb-1">{property.title}</h1>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <MapPin size={15} className="text-accent-500" />
                    <span>{property.location}</span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-display font-extrabold text-3xl text-primary-500">
                    {property.price?.toLocaleString()}
                  </div>
                  <div className="text-gray-400 text-sm">RWF / month</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                {property.bedrooms && (
                  <div className="text-center">
                    <BedDouble size={22} className="text-primary-500 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.bedrooms}</div>
                    <div className="text-xs text-gray-500">Bedroom{property.bedrooms > 1 ? 's' : ''}</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center">
                    <Bath size={22} className="text-primary-500 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.bathrooms}</div>
                    <div className="text-xs text-gray-500">Bathroom{property.bathrooms > 1 ? 's' : ''}</div>
                  </div>
                )}
                {property.area && (
                  <div className="text-center">
                    <Square size={22} className="text-primary-500 mx-auto mb-1" />
                    <div className="font-bold text-gray-900">{property.area}m²</div>
                    <div className="text-xs text-gray-500">Floor Area</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-display font-bold text-lg text-gray-900 mb-3">About This Property</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description || 'No description provided.'}
                </p>
              </div>

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div>
                  <h3 className="font-display font-bold text-lg text-gray-900 mb-3">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map(amenity => {
                      const config = AMENITY_ICONS[amenity] || { icon: Shield, label: amenity, color: 'text-gray-500' };
                      const Icon = config.icon;
                      return (
                        <div key={amenity} className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                          <Icon size={18} className={config.color} />
                          <span className="text-sm font-medium text-gray-700 capitalize">{config.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl p-6 shadow-sm"
            >
              <h3 className="font-display font-bold text-lg text-gray-900 mb-4">Location</h3>
              <div className="map-container bg-gradient-to-br from-primary-50 to-blue-50 h-64 flex items-center justify-center relative overflow-hidden">
                <div className="text-center z-10">
                  <MapPin size={40} className="text-primary-500 mx-auto mb-2" />
                  <p className="font-bold text-gray-700">{property.location}</p>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(property.location)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 bg-primary-500 text-white text-sm rounded-xl font-semibold"
                  >
                    Open in Google Maps
                  </a>
                </div>
                {/* Decorative grid */}
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: 'linear-gradient(#007BFF 1px, transparent 1px), linear-gradient(90deg, #007BFF 1px, transparent 1px)', backgroundSize: '30px 30px' }}
                />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Booking Card */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl p-6 shadow-sm sticky top-24"
            >
              <div className="flex items-center gap-2 mb-6">
                <Eye size={16} className="text-gray-400" />
                <span className="text-sm text-gray-500">{property.views || 0} people viewed this</span>
              </div>

              <div className="text-center mb-6">
                <div className="font-display font-extrabold text-4xl text-primary-500">
                  {property.price?.toLocaleString()} RWF
                </div>
                <div className="text-gray-400">per month</div>
              </div>

              {property.rating > 0 && (
                <div className="flex justify-center gap-1 mb-6">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} size={18} className={n <= property.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                  ))}
                  <span className="text-gray-500 text-sm ml-1">({property.rating})</span>
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.02, boxShadow: '0 15px 30px rgba(0,123,255,0.3)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleReserve}
                className="w-full py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all mb-4"
              >
                <Calendar size={20} />
                Reserve This Room
              </motion.button>

              <button
                onClick={() => toast.success('Message sent! Landlord will respond soon.')}
                className="w-full py-3 border-2 border-gray-200 hover:border-primary-500 text-gray-700 hover:text-primary-500 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare size={18} />
                Message Landlord
              </button>

              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Shield size={15} className="text-secondary-500 shrink-0" />
                  <span>{property.verified ? 'Admin verified & inspected' : 'Verification pending'}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar size={15} className="text-primary-500 shrink-0" />
                  <span>Reserve now, move in later</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Phone size={15} className="text-accent-500 shrink-0" />
                  <span>Landlord contacts within 24h</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      <AnimatePresence>
        {showModal && (
          <ReservationModal property={property} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
