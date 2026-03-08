'use client';
// app/admin/page.js — Admin Panel with Multiple Tabs
// ============================================================

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Check, X, Eye, MapPin, User, Clock, AlertTriangle,
  CheckCircle, Home, Users, Building2, FileText, DollarSign,
  TrendingUp, Phone, Calendar, Star, BarChart2
} from 'lucide-react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth-context';
import {
  getPendingProperties,
  getProperties,
  updatePropertyStatus,
  getAllReservations,
  getAllLandlords,
  getAdminFinance,
  getAllAgreements,
  updateReservationStatus,
  subscribeAdminReservations
} from '@/lib/firestore';
import toast from 'react-hot-toast';

const TABS = [
  { id: 'landlords', label: 'Landlords', icon: Users, color: 'text-blue-500' },
  { id: 'reservations', label: 'Reservations', icon: Calendar, color: 'text-green-500' },
  { id: 'agreements', label: 'Agreements', icon: FileText, color: 'text-purple-500' },
  { id: 'finance', label: 'Finance', icon: DollarSign, color: 'text-yellow-500' },
  { id: 'properties', label: 'Properties', icon: Home, color: 'text-red-500' },
];

export default function AdminPanel() {
  const { user, userProfile, isAdmin } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('landlords');
  const [loading, setLoading] = useState(true);

  // Data states
  const [landlords, setLandlords] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [finance, setFinance] = useState([]);
  const [pendingProperties, setPendingProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);

  // Modal states
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selected, setSelected] = useState(null); // property selected for review
  const [note, setNote] = useState(''); // admin note for property review
  const [paymentAmount, setPaymentAmount] = useState('');
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    if (userProfile && !isAdmin) {
      toast.error('Admin access only');
      router.push('/');
    }
  }, [userProfile, isAdmin, router]);

  useEffect(() => {
    if (!isAdmin) return;
    loadData();
  }, [isAdmin]);

  async function loadData() {
    setLoading(true);
    try {
      const [
        landlordsData,
        reservationsData,
        agreementsData,
        financeData,
        pendingProps,
        allProps
      ] = await Promise.all([
        getAllLandlords(),
        getAllReservations(),
        getAllAgreements(),
        getAdminFinance(),
        getPendingProperties(),
        getProperties({ status: 'all' })
      ]);

      setLandlords(landlordsData);
      setReservations(reservationsData);
      setAgreements(agreementsData);
      setFinance(financeData);
      setPendingProperties(pendingProps);
      setAllProperties(allProps);
    } catch (error) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load data');
    }
    setLoading(false);
  }

  // Real-time reservation updates
  useEffect(() => {
    if (!isAdmin) return;
    const unsub = subscribeAdminReservations(setReservations);
    return unsub;
  }, [isAdmin]);

  async function handleReservationAction(reservationId, action, paymentAmount = 0) {
    try {
      if (action === 'confirm' && !paymentAmount) {
        toast.error('Please enter payment amount');
        return;
      }

      await updateReservationStatus(reservationId, action, adminNote, parseFloat(paymentAmount));
      toast.success(`Reservation ${action}ed successfully`);
      setSelectedReservation(null);
      setPaymentAmount('');
      setAdminNote('');
    } catch (error) {
      toast.error('Failed to update reservation');
    }
  }

  async function handlePropertyAction(propertyId, action) {
    try {
      await updatePropertyStatus(propertyId, action, adminNote);
      toast.success(`Property ${action}ed successfully`);
      loadData(); // Refresh data
    } catch (error) {
      toast.error('Failed to update property');
    }
  }

  // Helper functions for property actions in the detail panel
  const handleApprove = async (propertyId) => {
    await handlePropertyAction(propertyId, 'approved');
    setSelected(null);
    setNote(''); // Clear the note after action
  };

  const handleReject = async (propertyId) => {
    if (!note.trim()) {
      toast.error('Please add a rejection reason');
      return;
    }
    await handlePropertyAction(propertyId, 'rejected');
    setSelected(null);
    setNote(''); // Clear the note after action
  };

  if (!isAdmin) return null;

  const totalCommission = finance.reduce((sum, item) => sum + (item.amount || 0), 0);
  const pendingReservations = reservations.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="px-6 py-8 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-xl">
              <Shield size={22} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 font-display">Admin Dashboard</h1>
          </div>
          <p className="text-gray-500">Manage landlords, reservations, agreements, and finances</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 md:grid-cols-5">
          {[
            { label: 'Landlords', value: landlords.length, color: 'bg-blue-50 text-blue-600', icon: Users },
            { label: 'Pending Reservations', value: pendingReservations, color: 'bg-yellow-50 text-yellow-600', icon: Clock },
            { label: 'Total Commission', value: `${totalCommission.toLocaleString()} RWF`, color: 'bg-green-50 text-green-600', icon: DollarSign },
            { label: 'Pending Properties', value: pendingProperties.length, color: 'bg-orange-50 text-orange-600', icon: Home },
            { label: 'Active Agreements', value: agreements.length, color: 'bg-purple-50 text-purple-600', icon: FileText },
          ].map(({ label, value, color, icon: Icon }) => (
            <div key={label} className={`bg-white rounded-2xl p-4 shadow-sm text-center ${label === 'Total Commission' ? 'col-span-2 md:col-span-1' : ''}`}>
              <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                <Icon size={20} />
              </div>
              <div className="text-xl font-bold text-gray-900 font-display">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-6 bg-white shadow-sm rounded-2xl">
          <div className="flex border-b border-gray-100">
            {TABS.map(({ id, label, icon: Icon, color }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                  activeTab === id
                    ? `text-gray-900 border-b-2 border-primary-500 ${color}`
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={18} className="mx-auto mb-1" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'landlords' && (
            <motion.div
              key="landlords"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {loading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-32 shimmer rounded-2xl" />)
              ) : landlords.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <Users size={40} className="mx-auto mb-3 text-gray-300" />
                  <p>No landlords registered yet</p>
                </div>
              ) : (
                landlords.map((landlord) => (
                  <div key={landlord.id} className="p-6 bg-white shadow-sm rounded-2xl">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl">
                          <User size={24} className="text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{landlord.name}</h3>
                          <p className="text-sm text-gray-500">{landlord.email}</p>
                          <p className="text-sm text-gray-500">{landlord.phone}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">Commission Rate</div>
                        <div className="font-bold text-green-600">{((landlord.commissionRate || 0.1) * 100)}%</div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="mb-3 font-semibold text-gray-900">Properties ({landlord.properties?.length || 0})</h4>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {landlord.properties?.map((property) => (
                          <div key={property.id} className="p-3 border rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Home size={16} className="text-gray-400" />
                              <span className="text-sm font-medium text-gray-900 line-clamp-1">{property.title}</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className={`px-2 py-1 rounded-full font-bold ${
                                property.status === 'approved' ? 'bg-green-100 text-green-700' :
                                property.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                              }`}>
                                {property.status}
                              </span>
                              <span className="text-gray-500">{property.price?.toLocaleString()} RWF/mo</span>
                            </div>
                          </div>
                        )) || <p className="text-sm text-gray-400">No properties listed</p>}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'reservations' && (
            <motion.div
              key="reservations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {loading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-24 shimmer rounded-2xl" />)
              ) : reservations.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <Calendar size={40} className="mx-auto mb-3 text-gray-300" />
                  <p>No reservations yet</p>
                </div>
              ) : (
                reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    onClick={() => setSelectedReservation(reservation)}
                    className="p-6 transition-shadow bg-white shadow-sm cursor-pointer rounded-2xl hover:shadow-md"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-xl">
                          <User size={20} className="text-green-500" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{reservation.studentName}</h3>
                          <p className="text-sm text-gray-500">{reservation.studentEmail}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        reservation.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                        reservation.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {reservation.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm md:grid-cols-4">
                      <div>
                        <span className="text-gray-500">Property</span>
                        <p className="font-medium text-gray-900 line-clamp-1">{reservation.propertyTitle}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Move-in Date</span>
                        <p className="font-medium text-gray-900">{new Date(reservation.moveInDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Duration</span>
                        <p className="font-medium text-gray-900">{reservation.duration} months</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Commission</span>
                        <p className="font-medium text-green-600">
                          {reservation.commission ? `${reservation.commission.toLocaleString()} RWF` : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'agreements' && (
            <motion.div
              key="agreements"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {loading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-24 shimmer rounded-2xl" />)
              ) : agreements.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <FileText size={40} className="mx-auto mb-3 text-gray-300" />
                  <p>No agreements yet</p>
                </div>
              ) : (
                agreements.map((agreement) => (
                  <div key={agreement.id} className="p-6 bg-white shadow-sm rounded-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-gray-900">{agreement.title}</h3>
                      <span className="px-3 py-1 text-xs font-bold text-blue-700 bg-blue-100 rounded-full">
                        {agreement.status}
                      </span>
                    </div>
                    <p className="mb-4 text-sm text-gray-600">{agreement.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Student: {agreement.studentName}</span>
                      <span>Landlord: {agreement.landlordName}</span>
                      <span>Created: {new Date(agreement.createdAt?.toDate()).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))
              )}
            </motion.div>
          )}

          {activeTab === 'finance' && (
            <motion.div
              key="finance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="p-6 bg-white shadow-sm rounded-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-xl">
                    <TrendingUp size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Commission History</h2>
                    <p className="text-sm text-gray-500">10% commission from confirmed reservations</p>
                  </div>
                </div>

                {loading ? (
                  [...Array(5)].map((_, i) => <div key={i} className="h-16 mb-3 shimmer rounded-xl" />)
                ) : finance.length === 0 ? (
                  <div className="py-12 text-center text-gray-400">
                    <DollarSign size={40} className="mx-auto mb-3 text-gray-300" />
                    <p>No commission records yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {finance.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg">
                            <DollarSign size={16} className="text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Commission from Reservation</p>
                            <p className="text-sm text-gray-500">
                              Payment: {record.paymentAmount?.toLocaleString()} RWF •
                              Date: {new Date(record.createdAt?.toDate()).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600">+{record.amount?.toLocaleString()} RWF</div>
                          <div className="text-xs text-gray-500">10% commission</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'properties' && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {loading ? (
                [...Array(3)].map((_, i) => <div key={i} className="h-32 shimmer rounded-2xl" />)
              ) : pendingProperties.length === 0 ? (
                <div className="py-12 text-center text-gray-400">
                  <CheckCircle size={40} className="mx-auto mb-3 text-green-300" />
                  <p>All properties reviewed!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* left: list */}
                  <div className="space-y-4">
                    {pendingProperties.map((property) => (
                      <div
                        key={property.id}
                        onClick={() => setSelected(property)}
                        className="p-6 transition-shadow bg-white shadow-sm cursor-pointer rounded-2xl hover:shadow-md">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 overflow-hidden bg-gray-100 rounded-xl">
                              {property.images?.[0] && (
                                <Image src={property.images[0]} alt="" width={64} height={64} className="object-cover w-full h-full" />
                              )}
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">{property.title}</h3>
                              <p className="text-gray-500">{property.location}</p>
                              <p className="font-semibold text-primary-500">{property.price?.toLocaleString()} RWF/mo</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 text-xs font-bold text-yellow-700 bg-yellow-100 rounded-full">
                            Pending Review
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePropertyAction(property.id, 'rejected'); }}
                            className="flex items-center justify-center flex-1 gap-2 py-2 font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl"
                          >
                            <X size={16} />
                            Reject
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); handlePropertyAction(property.id, 'approved'); }}
                            className="flex items-center justify-center flex-1 gap-2 py-2 font-bold text-white bg-green-500 hover:bg-green-600 rounded-xl"
                          >
                            <Check size={16} />
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* right: selected detail panel */}
                  <div>
                    {selected ? (
                      <motion.div
                        key={selected.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="overflow-hidden bg-white shadow-sm rounded-2xl"
                      >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                          <h2 className="text-lg font-bold text-gray-900 font-display">Review Listing</h2>
                          <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">
                            <X size={18} />
                          </button>
                        </div>
                        <div className="p-5 overflow-y-auto max-h-[600px] space-y-5">
                          {/* content same as before */}
                          {selected.images?.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                              {selected.images.slice(0, 6).map((img, i) => (
                                <div key={i} className="overflow-hidden aspect-square rounded-xl">
                                  <Image src={img} alt="" width={100} height={100} className="object-cover w-full h-full" />
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Title</span>
                              <span className="max-w-xs font-semibold text-right text-gray-900">{selected.title}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Location</span>
                              <span className="font-semibold text-gray-900">{selected.location}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Rent</span>
                              <span className="font-semibold text-primary-500">{selected.price?.toLocaleString()} RWF/mo</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Type</span>
                              <span className="font-semibold text-gray-900 capitalize">{selected.type}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Landlord</span>
                              <span className="font-semibold text-gray-900">{selected.landlordName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Phone</span>
                              <span className="font-semibold text-gray-900">{selected.landlordPhone}</span>
                            </div>
                            {selected.amenities?.length > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-500">Amenities</span>
                                <span className="font-semibold text-gray-900">{selected.amenities.join(', ')}</span>
                              </div>
                            )}
                          </div>
                          {selected.description && (
                            <div className="p-3 text-sm text-gray-600 bg-gray-50 rounded-xl">
                              {selected.description}
                            </div>
                          )}
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">
                              Admin Note (required for rejection)
                            </label>
                            <textarea
                              value={note}
                              onChange={e => setNote(e.target.value)}
                              placeholder="Add verification notes or rejection reason..."
                              rows={3}
                              className="text-sm resize-none input-field"
                            />
                          </div>
                          <div className="flex gap-3">
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => { handleReject(selected.id); }}
                              className="flex items-center justify-center flex-1 gap-2 py-3 font-bold text-white bg-red-500 hover:bg-red-600 rounded-2xl"
                            >
                              <X size={18} />
                              Reject
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => { handleApprove(selected.id); }}
                              className="flex items-center justify-center flex-1 gap-2 py-3 font-bold text-white bg-secondary-500 hover:bg-secondary-600 rounded-2xl"
                            >
                              <Check size={18} />
                              Approve & Verify
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="py-20 text-center text-gray-400">
                        <Eye size={40} className="mx-auto mb-3" />
                        <p>Select a property from the left list to view details</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reservation Modal */}
        <AnimatePresence>
          {selectedReservation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md p-6 bg-white rounded-2xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Review Reservation</h2>
                  <button onClick={() => setSelectedReservation(null)} className="text-gray-400 hover:text-gray-600">
                    <X size={20} />
                  </button>
                </div>

                <div className="mb-6 space-y-4">
                  <div>
                    <label className="block mb-1 text-sm font-bold text-gray-700">Student</label>
                    <p className="text-gray-900">{selectedReservation.studentName}</p>
                    <p className="text-sm text-gray-500">{selectedReservation.studentEmail}</p>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-bold text-gray-700">Property</label>
                    <p className="text-gray-900">{selectedReservation.propertyTitle}</p>
                  </div>

                  {selectedReservation.status === 'pending' && (
                    <div>
                      <label className="block mb-1 text-sm font-bold text-gray-700">Payment Amount (RWF)</label>
                      <input
                        type="number"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter total payment amount"
                        className="input-field"
                      />
                      <p className="mt-1 text-xs text-gray-500">10% commission will be calculated automatically</p>
                    </div>
                  )}

                  <div>
                    <label className="block mb-1 text-sm font-bold text-gray-700">Admin Note</label>
                    <textarea
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      placeholder="Add notes..."
                      rows={3}
                      className="resize-none input-field"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleReservationAction(selectedReservation.id, 'cancelled')}
                    className="flex-1 py-3 font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReservationAction(selectedReservation.id, 'confirmed', paymentAmount)}
                    className="flex-1 py-3 font-bold text-white bg-green-500 hover:bg-green-600 rounded-xl"
                  >
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}