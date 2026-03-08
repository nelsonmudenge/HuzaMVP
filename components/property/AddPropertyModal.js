'use client';
// components/property/AddPropertyModal.js
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { createProperty } from '@/lib/firestore';
import { useAuth } from '@/lib/auth-context';
import ImageUploader from './ImageUploader';

const TYPES = ['Chambret', 'Room and saloon'];
const AMENITIES = [
  { id: 'electricity', label: 'Electricity' },
  { id: 'water', label: 'Water' },
];

export default function AddPropertyModal({ onClose, onSuccess }) {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    title: '',
    location: '',
    price: '',
    type: 'chambret',
    area: '',
    description: '',
    amenities: [],
    landlordName: userProfile?.name || '',
    landlordPhone: '',
  });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function toggleAmenity(id) {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.location || !form.price) {
      alert('Please fill in required fields');
      return;
    }
    setLoading(true);
    try {
      const id = await createProperty({
        ...form,
        price: Number(form.price),
        area: form.area ? Number(form.area) : null,
        images,
        landlordId: user.uid,
        landlordName: form.landlordName,
        landlordPhone: form.landlordPhone,
      });
      onSuccess(id);
    } catch (err) {
      console.error(err);
      alert('Failed to submit listing. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative min-h-screen flex items-start justify-center p-4 py-8">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl z-10 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-500 to-blue-600 p-6 text-white flex items-center justify-between">
            <div>
              <h2 className="font-display font-bold text-2xl">Add New Listing</h2>
              <p className="text-primary-100 text-sm mt-1">Submit your property for admin review</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Property Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => update('title', e.target.value)}
                  placeholder="e.g. Cozy Studio Near UR Huye Campus"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Location *</label>
                <input
                  type="text"
                  value={form.location}
                  onChange={e => update('location', e.target.value)}
                  placeholder="e.g. Huye, near UR Campus"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Monthly Rent (RWF) *</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={e => update('price', e.target.value)}
                  placeholder="e.g. 80000"
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Property Type</label>
                <select value={form.type} onChange={e => update('type', e.target.value)} className="input-field">
                  {TYPES.map(t => <option key={t} value={t.toLowerCase()}>{t}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Floor Area (m²)</label>
                <input type="number" value={form.area} onChange={e => update('area', e.target.value)} placeholder="e.g. 25" className="input-field" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={e => update('description', e.target.value)}
                placeholder="Describe the property, nearby landmarks, rules, etc."
                rows={4}
                className="input-field resize-none"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Amenities</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {AMENITIES.map(({ id, label }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleAmenity(id)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all text-left ${
                      form.amenities.includes(id)
                        ? 'bg-secondary-500 text-white border-secondary-500'
                        : 'border-gray-200 text-gray-600 hover:border-secondary-300'
                    }`}
                  >
                    {form.amenities.includes(id) ? '✓ ' : ''}{label}
                  </button>
                ))}
              </div>
            </div>

            {/* Landlord Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-2xl">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Contact Information</label>
              </div>
              <div>
                <input
                  type="text"
                  value={form.landlordName}
                  onChange={e => update('landlordName', e.target.value)}
                  placeholder="Your full name"
                  className="input-field"
                />
              </div>
              <div>
                <input
                  type="tel"
                  value={form.landlordPhone}
                  onChange={e => update('landlordPhone', e.target.value)}
                  placeholder="Phone: +250 7XX XXX XXX"
                  className="input-field"
                />
              </div>
            </div>

            {/* Image Uploader */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-3">Property Photos</label>
              <ImageUploader
                propertyId="new"
                onImagesChange={setImages}
                maxImages={8}
              />
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose} className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-2xl font-bold">
                Cancel
              </button>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 bg-primary-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : null}
                {loading ? 'Submitting...' : 'Submit for Review'}
              </motion.button>
            </div>

            <p className="text-xs text-gray-400 text-center">
              Your listing will be physically inspected by our team within 2-3 business days before going live.
            </p>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
