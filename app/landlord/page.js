'use client';
// app/landlord/page.js â€” Simplified Landlord Dashboard
// ============================================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Plus, Eye, Edit, Trash2, Clock, Home,
  MapPin, DollarSign, CheckCircle, AlertTriangle
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import { getLandlordProperties, deleteProperty } from '@/lib/firestore';
import AddPropertyModal from '@/components/property/AddPropertyModal';
import toast from 'react-hot-toast';

export default function LandlordDashboard() {
  const { user, userProfile, isLandlord } = useAuth();
  const router = useRouter();
  const [properties, setProperties] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Auth guard
  useEffect(() => {
    if (userProfile && !isLandlord) {
      toast.error('Landlord access only');
      router.push('/');
    }
  }, [userProfile, isLandlord, router]);

  // Load properties
  useEffect(() => {
    if (!user) return;
    getLandlordProperties(user.uid).then(data => {
      setProperties(data);
      setLoading(false);
    });
  }, [user]);

  async function handleDeleteProperty(propertyId) {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      await deleteProperty(propertyId);
      setProperties(prev => prev.filter(p => p.id !== propertyId));
      toast.success('Property deleted successfully');
    } catch (error) {
      toast.error('Failed to delete property');
    }
  }

  if (!isLandlord) return null;

  const pendingCount = properties.filter(p => p.status === 'pending').length;
  const approvedCount = properties.filter(p => p.status === 'approved').length;
  const rejectedCount = properties.filter(p => p.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 size={22} className="text-blue-500" />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-3xl text-gray-900">My Properties</h1>
                <p className="text-gray-500">List and manage your rental properties</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold flex items-center gap-2"
            >
              <Plus size={18} />
              Add Property
            </motion.button>
          </div>
        </motion.div>

        {/* Commission Notice */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-900">Commission Agreement</p>
              <p className="text-blue-700 text-sm">
                By listing properties, you agree to a 10% commission on all successful rentals.
                Admins will handle all reservations and payments.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Properties', value: properties.length, color: 'bg-gray-50 text-gray-600', icon: Home },
            { label: 'Pending Review', value: pendingCount, color: 'bg-yellow-50 text-yellow-600', icon: Clock },
            { label: 'Approved', value: approvedCount, color: 'bg-green-50 text-green-600', icon: CheckCircle },
            { label: 'Rejected', value: rejectedCount, color: 'bg-red-50 text-red-600', icon: AlertTriangle },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className="bg-white rounded-2xl p-4 shadow-sm text-center">
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon size={20} />
              </div>
              <div className="font-display font-bold text-2xl text-gray-900">{value}</div>
              <div className="text-gray-500 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="h-48 shimmer" />
                <div className="p-4 space-y-3">
                  <div className="h-4 shimmer rounded" />
                  <div className="h-3 shimmer rounded w-3/4" />
                  <div className="h-3 shimmer rounded w-1/2" />
                </div>
              </div>
            ))
          ) : properties.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Home size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="font-bold text-xl text-gray-900 mb-2">No properties yet</h3>
              <p className="text-gray-500 mb-6">Start by adding your first rental property</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-2xl font-bold inline-flex items-center gap-2"
              >
                <Plus size={18} />
                Add Your First Property
              </motion.button>
            </div>
          ) : (
            properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Property Image */}
                <div className="relative h-48 bg-gray-100">
                  {property.images?.[0] ? (
                    <Image
                      src={property.images[0]}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Home size={48} className="text-gray-300" />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      property.status === 'approved' ? 'bg-green-100 text-green-700' :
                      property.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {property.status}
                    </span>
                  </div>

                  {/* Views Badge */}
                  <div className="absolute top-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Eye size={12} />
                    {property.views || 0}
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1">{property.title}</h3>

                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                    <MapPin size={14} />
                    <span>{property.location}</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-primary-500 font-bold text-lg">
                      {property.price?.toLocaleString()} RWF/mo
                    </span>
                    <span className="text-gray-500 text-sm capitalize">{property.type}</span>
                  </div>

                  {/* Property Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
                    <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
                    <span>{property.area} sqm</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push(`/properties/${property.id}`)}
                      className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold text-sm flex items-center justify-center gap-1"
                    >
                      <Eye size={14} />
                      View
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDeleteProperty(property.id)}
                      className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl font-semibold text-sm flex items-center justify-center"
                    >
                      <Trash2 size={14} />
                    </motion.button>
                  </div>

                  {/* Admin Note */}
                  {property.adminNote && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-yellow-800 text-xs">
                        <strong>Admin Note:</strong> {property.adminNote}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Add Property Modal */}
        <AnimatePresence>
          {showAddModal && (
            <AddPropertyModal onClose={() => setShowAddModal(false)} onSuccess={() => {
              setShowAddModal(false);
              // Refresh properties
              getLandlordProperties(user.uid).then(setProperties);
            }} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
