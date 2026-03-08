'use client';
// app/properties/page.js — Browse Properties
// ============================================================

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3X3, List, SortAsc, Home } from 'lucide-react';
import PropertyCard from '@/components/property/PropertyCard';
import SearchFilter from '@/components/property/SearchFilter';
import { getProperties } from '@/lib/firestore';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [compared, setCompared] = useState([]);

  useEffect(() => {
    getProperties({}).then(data => {
      setProperties(data);
      // Apply initial query filter
      if (initialQuery) {
        setFiltered(data.filter(p =>
          p.location?.toLowerCase().includes(initialQuery.toLowerCase()) ||
          p.title?.toLowerCase().includes(initialQuery.toLowerCase())
        ));
      } else {
        setFiltered(data);
      }
      setLoading(false);
    });
  }, [initialQuery]);

  function handleFilter({ query, type, priceMax, amenities, verifiedOnly }) {
    let result = [...properties];
    if (query) result = result.filter(p =>
      p.title?.toLowerCase().includes(query.toLowerCase()) ||
      p.location?.toLowerCase().includes(query.toLowerCase())
    );
    if (type && type !== 'Any') result = result.filter(p => p.type === type.toLowerCase());
    if (priceMax && priceMax !== Infinity) result = result.filter(p => p.price <= priceMax);
    if (amenities?.length) result = result.filter(p =>
      amenities.every(a => p.amenities?.includes(a))
    );
    if (verifiedOnly) result = result.filter(p => p.verified);
    setFiltered(result);
  }

  function sortProperties(list) {
    return [...list].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      // newest (default)
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    });
  }

  function toggleCompare(property) {
    setCompared(prev => {
      if (prev.find(p => p.id === property.id)) return prev.filter(p => p.id !== property.id);
      if (prev.length >= 3) return prev; // max 3 comparisons
      return [...prev, property];
    });
  }

  const sorted = sortProperties(filtered);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display font-extrabold text-3xl text-gray-900 mb-1">
              Browse Properties
            </h1>
            <p className="text-gray-500">
              {loading ? 'Loading...' : `${sorted.length} verified student rooms available`}
            </p>
          </motion.div>

          <div className="mt-6">
            <SearchFilter onFilter={handleFilter} initialQuery={initialQuery} />
          </div>
        </div>
      </div>

      {/* Comparison Bar */}
      <AnimatePresence>
        {compared.length > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 glass rounded-2xl px-6 py-4 shadow-xl border border-primary-100 flex items-center gap-4"
          >
            <span className="text-sm font-bold text-gray-700">
              Comparing {compared.length} propert{compared.length > 1 ? 'ies' : 'y'}
            </span>
            <div className="flex gap-2">
              {compared.map(p => (
                <span key={p.id} className="text-xs bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">
                  {p.title?.slice(0, 15)}...
                </span>
              ))}
            </div>
            {compared.length >= 2 && (
              <button className="px-4 py-2 bg-primary-500 text-white text-sm rounded-xl font-bold">
                Compare Now
              </button>
            )}
            <button
              onClick={() => setCompared([])}
              className="text-gray-400 hover:text-gray-600 text-sm"
            >
              ✕ Clear
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Controls Bar */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing <strong className="text-gray-900">{sorted.length}</strong> results
          </p>
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            {/* View Toggle */}
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white shadow text-primary-500' : 'text-gray-400'}`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white shadow text-primary-500' : 'text-gray-400'}`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden">
                <div className="h-52 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 shimmer rounded w-3/4" />
                  <div className="h-3 shimmer rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : sorted.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <Home size={64} className="text-gray-200 mx-auto mb-4" />
            <h3 className="font-display font-bold text-xl text-gray-500 mb-2">No properties found</h3>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 max-w-3xl'}`}
          >
            {sorted.map((property, i) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={i}
                onCompare={toggleCompare}
                isCompared={!!compared.find(p => p.id === property.id)}
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">Loading...</div>}>
      <PropertiesContent />
    </Suspense>
  );
}
