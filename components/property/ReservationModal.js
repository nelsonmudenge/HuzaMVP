'use client';
// components/property/ReservationModal.js
// ============================================================
// Multi-step gamified reservation modal with smooth transitions
// Steps: Details → Personal Info → Confirm → Success
// ============================================================

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Phone, MessageSquare, Check, Loader2, Star } from 'lucide-react';
import { createReservation } from '@/lib/firestore';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

const STEPS = [
  { id: 1, label: 'Dates', icon: Calendar },
  { id: 2, label: 'Details', icon: User },
  { id: 3, label: 'Confirm', icon: Check },
];

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir < 0 ? 300 : -300, opacity: 0 }),
};

export default function ReservationModal({ property, onClose }) {
  const { user, userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    moveInDate: '',
    duration: '3',
    name: userProfile?.name || '',
    phone: '',
    studentId: '',
    university: '',
    message: '',
  });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function next() {
    setDir(1);
    setStep(s => s + 1);
  }

  function back() {
    setDir(-1);
    setStep(s => s - 1);
  }

  async function submit() {
    if (!user) { toast.error('Please login to reserve'); return; }
    setLoading(true);
    try {
      await createReservation({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: property.location,
        price: property.price,
        landlordId: property.landlordId, // Keep for reference but admin handles
        landlordName: property.landlordName,
        studentId: user.uid,
        studentName: form.name,
        studentEmail: userProfile?.email || '',
        studentPhone: form.phone,
        studentId_num: form.studentId,
        university: form.university,
        message: form.message,
        moveInDate: form.moveInDate,
        duration: Number(form.duration),
        totalEstimate: property.price * Number(form.duration),
      });
      setSuccess(true);
    } catch (err) {
      toast.error('Reservation failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ y: 100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 100, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl z-10"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
          >
            <X size={16} />
          </button>
          <p className="text-primary-100 text-sm font-medium mb-1">Reserve Now</p>
          <h2 className="font-display font-bold text-xl line-clamp-1">{property.title}</h2>
          <p className="text-primary-100 text-sm mt-1">{property.price?.toLocaleString()} RWF/month</p>

          {/* Step Progress */}
          {!success && (
            <div className="flex items-center gap-2 mt-4">
              {STEPS.map((s, i) => {
                const Icon = s.icon;
                const done = step > s.id;
                const active = step === s.id;
                return (
                  <div key={s.id} className="flex items-center gap-2">
                    <motion.div
                      animate={{
                        scale: active ? 1.1 : 1,
                        background: done ? '#28A745' : active ? '#fff' : 'rgba(255,255,255,0.3)',
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      <Icon size={15} className={done ? 'text-white' : active ? 'text-primary-500' : 'text-white/60'} />
                    </motion.div>
                    <span className={`text-xs font-semibold ${active ? 'text-white' : 'text-white/60'}`}>
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 && (
                      <div className={`flex-1 h-0.5 w-6 rounded ${step > s.id ? 'bg-secondary-400' : 'bg-white/20'}`} />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={dir}>
            {success ? (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.1 }}
                  className="w-20 h-20 bg-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check size={40} className="text-white" />
                </motion.div>
                <h3 className="font-display font-bold text-2xl text-gray-900 mb-2">Reservation Sent!</h3>
                <p className="text-gray-500 text-sm mb-2">
                  Your reservation request for <strong>{property.title}</strong> has been submitted.
                </p>
                <p className="text-gray-400 text-xs mb-6">
                  The landlord will contact you within 24 hours at <strong>{form.phone}</strong>.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 bg-primary-500 text-white rounded-xl font-bold"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : step === 1 ? (
              <motion.div key="step1" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <h3 className="font-display font-bold text-lg mb-4">When would you like to move in?</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Move-in Date</label>
                    <input
                      type="date"
                      value={form.moveInDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={e => update('moveInDate', e.target.value)}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Duration (months)</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['1', '3', '6', '12'].map(d => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => update('duration', d)}
                          className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                            form.duration === d
                              ? 'bg-primary-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-primary-50'
                          }`}
                        >
                          {d}mo
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Estimate */}
                  <div className="bg-primary-50 rounded-xl p-3 flex justify-between items-center">
                    <span className="text-sm text-gray-600">Estimated total</span>
                    <span className="font-bold text-primary-500">
                      {(property.price * Number(form.duration))?.toLocaleString()} RWF
                    </span>
                  </div>
                </div>
                <button
                  onClick={next}
                  disabled={!form.moveInDate}
                  className="w-full mt-6 py-3 bg-primary-500 disabled:opacity-50 text-white rounded-xl font-bold"
                >
                  Continue →
                </button>
              </motion.div>
            ) : step === 2 ? (
              <motion.div key="step2" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <h3 className="font-display font-bold text-lg mb-4">Tell us about yourself</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Full Name</label>
                    <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your full name" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Phone Number</label>
                    <input type="tel" value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+250 7XX XXX XXX" className="input-field" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Student ID</label>
                      <input type="text" value={form.studentId} onChange={e => update('studentId', e.target.value)} placeholder="e.g. STU2024001" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">University</label>
                      <input type="text" value={form.university} onChange={e => update('university', e.target.value)} placeholder="e.g. UR, INES" className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Message to Landlord</label>
                    <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Introduce yourself..." rows={3} className="input-field resize-none" />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={back} className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold">← Back</button>
                  <button
                    onClick={next}
                    disabled={!form.name || !form.phone}
                    className="flex-1 py-3 bg-primary-500 disabled:opacity-50 text-white rounded-xl font-bold"
                  >Continue →</button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="step3" custom={dir} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ type: 'spring', stiffness: 300, damping: 30 }}>
                <h3 className="font-display font-bold text-lg mb-4">Confirm Reservation</h3>
                <div className="space-y-3 mb-6">
                  {[
                    { label: 'Property', value: property.title },
                    { label: 'Location', value: property.location },
                    { label: 'Move-in Date', value: form.moveInDate },
                    { label: 'Duration', value: `${form.duration} months` },
                    { label: 'Your Name', value: form.name },
                    { label: 'Phone', value: form.phone },
                    { label: 'Total Estimate', value: `${(property.price * Number(form.duration))?.toLocaleString()} RWF`, highlight: true },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className={`flex justify-between items-center py-2 border-b border-gray-50 ${highlight ? 'font-bold text-primary-500' : ''}`}>
                      <span className="text-sm text-gray-500">{label}</span>
                      <span className={`text-sm ${highlight ? 'text-primary-500 font-bold' : 'text-gray-900 font-medium'}`}>{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mb-4 text-center">
                  By confirming, you agree to our terms. The landlord will verify your details and contact you.
                </p>
                <div className="flex gap-3">
                  <button onClick={back} className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-bold">← Back</button>
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="flex-1 py-3 bg-secondary-500 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
                    {loading ? 'Sending...' : 'Confirm'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
