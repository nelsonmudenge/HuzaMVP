'use client';
// components/layout/Navbar.js
// ============================================================
// Responsive navbar with role-based navigation links,
// mobile menu, and smooth Framer Motion animations
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Search, User, LogOut, Menu, X, Shield, Building2, GraduationCap } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, userProfile, logout, isStudent, isLandlord, isAdmin } = useAuth();
  const pathname = usePathname();

  // Add shadow when scrolled
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  async function handleLogout() {
    await logout();
    toast.success('Logged out successfully');
  }

  // Dynamic nav links based on role
  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/properties', label: 'Browse', icon: Search },
    ...(isStudent ? [{ href: '/student', label: 'My Reservations', icon: GraduationCap }] : []),
    ...(isLandlord ? [{ href: '/landlord', label: 'Dashboard', icon: Building2 }] : []),
    ...(isAdmin ? [{ href: '/admin', label: 'Admin', icon: Shield }] : []),
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-display font-bold text-sm">H</span>
            </motion.div>
            <div>
              <span className="font-display font-bold text-lg text-gray-900">HUZA</span>
              <span className="hidden sm:block text-xs text-gray-500 -mt-1 font-body">Student Icumbi Connect</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    pathname === href
                      ? 'bg-primary-500 text-white shadow-md'
                      : 'text-gray-600 hover:bg-primary-50 hover:text-primary-500'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-xl">
                  <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {userProfile?.name?.[0] || user.email?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    {userProfile?.name?.split(' ')[0] || 'User'}
                  </span>
                  {userProfile?.role && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isAdmin ? 'bg-red-100 text-red-600' :
                      isLandlord ? 'bg-accent-50 text-accent-500' :
                      'bg-secondary-50 text-secondary-500'
                    }`}>
                      {userProfile.role}
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl text-sm font-semibold transition-all"
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <>
                <Link href="/auth/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-primary-500 font-semibold text-sm hover:bg-primary-50 rounded-xl transition-all"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link href="/auth/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 8px 20px rgba(0,123,255,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary-500 text-white font-semibold text-sm rounded-xl shadow-md transition-all"
                  >
                    Get Started
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-xl hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(({ href, label, icon: Icon }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${
                      pathname === href
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-700 hover:bg-primary-50'
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                </motion.div>
              ))}
              {!user && (
                <div className="flex gap-3 pt-2">
                  <Link href="/auth/login" className="flex-1">
                    <button className="w-full py-2.5 border border-primary-500 text-primary-500 rounded-xl font-semibold">Login</button>
                  </Link>
                  <Link href="/auth/signup" className="flex-1">
                    <button className="w-full py-2.5 bg-primary-500 text-white rounded-xl font-semibold">Sign Up</button>
                  </Link>
                </div>
              )}
              {user && (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl font-semibold"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
