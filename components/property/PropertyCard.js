'use client';
// components/property/PropertyCard.js
// ============================================================
// Animated property card with verified badge, hover effects,
// comparison feature, and key property details
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin, Star, Wifi, Car, Shield, Heart,
  Square, Eye
} from 'lucide-react';

// Amenity icons mapping
const AMENITY_ICONS = {
  wifi: { icon: Wifi, label: 'WiFi' },
  parking: { icon: Car, label: 'Parking' },
  security: { icon: Shield, label: 'Security' },
};

export default function PropertyCard({ property, index = 0, onCompare, isCompared }) {
  const [liked, setLiked] = useState(false);
  const [imageError, setImageError] = useState(false);

  const {
    id,
    title,
    location,
    price,
    images = [],
    verified,
    type,
    area,
    amenities = [],
    rating = 0,
    views = 0,
  } = property;

  const coverImage = images[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={imageError ? 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500' : coverImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 hover:scale-110"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        {/* Verified Badge */}
        {verified && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="absolute top-3 left-3 flex items-center gap-1.5 bg-secondary-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg verified-glow"
          >
            <Shield size={11} />
            Verified
          </motion.div>
        )}

        {/* Property Type */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1.5 rounded-full text-gray-700 capitalize">
          {type || 'Room'}
        </div>

        {/* Like Button */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow"
        >
          <Heart
            size={16}
            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </motion.button>

        {/* Image count */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            +{images.length - 1} photos
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title & Price */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-bold text-gray-900 text-sm leading-tight line-clamp-2">
            {title}
          </h3>
          <div className="shrink-0 text-right">
            <div className="text-primary-500 font-bold text-lg">
              {price?.toLocaleString()} RWF
            </div>
            <div className="text-gray-400 text-xs">/month</div>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
          <MapPin size={13} className="text-accent-500 shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
          {area && (
            <div className="flex items-center gap-1">
              <Square size={13} className="text-primary-500" />
              <span>{area}m²</span>
            </div>
          )}
          <div className="flex items-center gap-1 ml-auto text-gray-400">
            <Eye size={12} />
            <span>{views}</span>
          </div>
        </div>

        {/* Amenities */}
        {amenities.length > 0 && (
          <div className="flex gap-2 mb-3 flex-wrap">
            {amenities.slice(0, 3).map(amenity => {
              const config = AMENITY_ICONS[amenity];
              if (!config) return null;
              const Icon = config.icon;
              return (
                <div key={amenity} className="flex items-center gap-1 text-xs bg-primary-50 text-primary-500 px-2 py-1 rounded-lg">
                  <Icon size={11} />
                  {config.label}
                </div>
              );
            })}
          </div>
        )}

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map(n => (
              <Star
                key={n}
                size={13}
                className={n <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-gray-50">
          {onCompare && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => onCompare(property)}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-all ${
                isCompared
                  ? 'bg-primary-500 text-white border-primary-500'
                  : 'border-gray-200 text-gray-600 hover:border-primary-500 hover:text-primary-500'
              }`}
            >
              {isCompared ? '✓ Comparing' : 'Compare'}
            </motion.button>
          )}
          <Link href={`/properties/${id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white text-xs font-bold rounded-xl transition-all shadow-sm hover:shadow-md"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
