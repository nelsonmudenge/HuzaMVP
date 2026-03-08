'use client';
// components/property/SearchFilter.js
// ============================================================
// Animated search/filter panel with live filtering
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

const TYPES = ['Any', 'Chambret', 'Room and saloon'];
const AMENITIES = ['electricity', 'water'];
const PRICE_RANGES = [
  { label: 'Any Price', max: Infinity },
  { label: 'Under 25k RWF', max: 25000 },
  { label: 'Under 30k RWF', max: 30000 },
  { label: 'Under 40k RWF', max: 40000 },
];

export default function SearchFilter({ onFilter, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [filters, setFilters] = useState({
    type: 'Any',
    priceMax: Infinity,
    amenities: [],
    verifiedOnly: false,
  });

  function handleSearch(e) {
    e.preventDefault();
    onFilter({ query, ...filters });
  }

  function toggleAmenity(amenity) {
    setFilters(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  }

  function clearFilters() {
    setQuery('');
    setFilters({ type: 'Any', priceMax: Infinity, amenities: [], verifiedOnly: false });
    onFilter({});
  }

  const hasActiveFilters = query || filters.type !== 'Any' ||
    filters.priceMax !== Infinity || filters.amenities.length > 0 || filters.verifiedOnly;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
    >
      {/* Main Search Bar */}
      <form onSubmit={handleSearch} className="p-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by location, university name..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
            />
          </div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold transition-all ${
              showAdvanced || hasActiveFilters
                ? 'bg-primary-500 text-white border-primary-500'
                : 'border-gray-200 text-gray-600 hover:border-primary-300'
            }`}
          >
            <SlidersHorizontal size={16} />
            <span className="hidden sm:inline">Filters</span>
            {hasActiveFilters && <span className="w-2 h-2 bg-accent-500 rounded-full" />}
          </motion.button>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-semibold text-sm shadow-md transition-all"
          >
            Search
          </motion.button>
        </div>
      </form>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100 overflow-hidden"
          >
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Property Type */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Property Type</label>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, type }))}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        filters.type === type
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-primary-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Price Range</label>
                <select
                  value={filters.priceMax}
                  onChange={e => setFilters(prev => ({ ...prev, priceMax: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {PRICE_RANGES.map(({ label, max }) => (
                    <option key={label} value={max}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Amenities */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Amenities</label>
                <div className="flex flex-wrap gap-2">
                  {AMENITIES.map(amenity => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleAmenity(amenity)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                        filters.amenities.includes(amenity)
                          ? 'bg-secondary-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-secondary-50'
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-4 pb-4 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={e => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked }))}
                  className="w-4 h-4 rounded accent-primary-500"
                />
                <span className="text-sm text-gray-700 font-medium">Verified properties only</span>
              </label>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 font-semibold"
                >
                  <X size={15} />
                  Clear all
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
