'use client';
// app/auth/signup/page.js
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Loader2, GraduationCap, Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const { register, loginWithGoogle } = useAuth();
  const [step, setStep] = useState(1); // 1: role select, 2: form, 3: commission agreement (landlords only)
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [commissionAgreed, setCommissionAgreed] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });

  function update(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (role === 'landlord' && !commissionAgreed) {
      toast.error('Please agree to the commission terms');
      return;
    }
    setLoading(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        name: form.name,
        role,
        commissionRate: role === 'landlord' ? 0.1 : 0,
        commissionAgreed: role === 'landlord' ? commissionAgreed : true
      });
      toast.success('Account created! Welcome to HUZA 🎉');
      router.push(role === 'landlord' ? '/landlord' : '/properties');
    } catch (err) {
      const msg =
        err.code === 'auth/email-already-in-use' ? 'Email already in use' :
        'Registration failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const ROLES = [
    {
      id: 'student',
      label: 'Student',
      desc: 'I\'m looking for off-campus housing',
      icon: GraduationCap,
      color: 'from-primary-500 to-blue-600',
    },
    {
      id: 'landlord',
      label: 'Landlord',
      desc: 'I have properties to list',
      icon: Building2,
      color: 'from-accent-500 to-orange-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-blue-700 flex items-center justify-center p-6">
      <div className="absolute inset-0 hero-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="inline-flex items-center gap-3 text-white">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                <GraduationCap size={28} />
              </div>
              <div className="text-left">
                <div className="font-display font-extrabold text-2xl">HUZA</div>
                <div className="text-white/70 text-sm">Student Icumbi Connect</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
              >
                <h1 className="font-display font-extrabold text-2xl text-gray-900 mb-1">Join HUZA</h1>
                <p className="text-gray-500 text-sm mb-7">How will you be using HUZA?</p>

                <div className="space-y-4">
                  {ROLES.map(({ id, label, desc, icon: Icon, color }) => (
                    <motion.button
                      key={id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setRole(id);
                        setStep(id === 'landlord' ? 2 : 3); // Skip commission step for students
                      }}
                      className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all ${
                        role === id ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center shrink-0`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      <div className="text-left flex-1">
                        <div className="font-display font-bold text-gray-900 text-lg">{label}</div>
                        <div className="text-gray-500 text-sm">{desc}</div>
                      </div>
                      <ArrowRight size={18} className="text-gray-400" />
                    </motion.button>
                  ))}
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-primary-500 font-bold hover:underline">Sign in</Link>
                </div>
              </motion.div>
            ) : step === 2 ? (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
              >
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1"
                >
                  ← Back
                </button>
                <h1 className="font-display font-extrabold text-2xl text-gray-900 mb-1">
                  Commission Agreement
                </h1>
                <p className="text-gray-500 text-sm mb-7">
                  Please read and agree to our commission terms
                </p>

                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-blue-900 mb-3">HUZA Commission Terms</h3>
                  <div className="text-blue-800 text-sm space-y-2">
                    <p>• We charge a <strong>10% commission</strong> on all successful property rentals</p>
                    <p>• Commission is calculated from the total payment amount</p>
                    <p>• You only need to list properties - we handle all reservations and payments</p>
                    <p>• We contact you directly via phone for coordination</p>
                    <p>• Commission is paid only when a reservation is confirmed</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-6">
                  <input
                    type="checkbox"
                    id="commission"
                    checked={commissionAgreed}
                    onChange={(e) => setCommissionAgreed(e.target.checked)}
                    className="mt-1 w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <label htmlFor="commission" className="text-sm text-gray-700">
                    I agree to the 10% commission terms and understand that HUZA will handle all reservations and payments on my behalf.
                  </label>
                </div>

                <motion.button
                  onClick={() => setStep(3)}
                  disabled={!commissionAgreed}
                  whileHover={{ scale: commissionAgreed ? 1.01 : 1 }}
                  whileTap={{ scale: commissionAgreed ? 0.99 : 1 }}
                  className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
                >
                  I Agree - Continue
                  <ArrowRight size={18} />
                </motion.button>
              </motion.div>
            ) : step === 3 ? (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
              >
                <button
                  onClick={() => setStep(role === 'landlord' ? 2 : 1)}
                  className="text-sm text-gray-400 hover:text-gray-600 mb-4 flex items-center gap-1"
                >
                  ← Back
                </button>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Full Name</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        placeholder="Your full name"
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        placeholder="you@example.com"
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={form.password}
                        onChange={e => update('password', e.target.value)}
                        placeholder="Min 6 characters"
                        className="input-field pl-10 pr-11"
                        required
                      />
                      <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1.5">Confirm Password</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="password"
                        value={form.confirm}
                        onChange={e => update('confirm', e.target.value)}
                        placeholder="••••••••"
                        className="input-field pl-10"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-4 bg-primary-500 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 disabled:opacity-60 shadow-lg shadow-blue-200"
                  >
                    {loading ? <Loader2 size={20} className="animate-spin" /> : null}
                    {loading ? 'Creating account...' : 'Create Account'}
                  </motion.button>
                </form>

                <p className="mt-4 text-xs text-gray-400 text-center">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
