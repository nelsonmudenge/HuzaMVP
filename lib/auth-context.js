// lib/auth-context.js
// ============================================================
// React context for Firebase Authentication state management.
// Provides user object, role, and auth methods across the app.
// ============================================================

'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch extended profile (role, etc.) from Firestore
        const profileSnap = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (profileSnap.exists()) {
          setUserProfile(profileSnap.data());
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /** Register with email/password + role */
  async function register({ email, password, name, role, commissionRate = 0, commissionAgreed = true }) {
    const { user: newUser } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(newUser, { displayName: name });

    // Store role and profile in Firestore
    await setDoc(doc(db, 'users', newUser.uid), {
      uid: newUser.uid,
      name,
      email,
      role, // 'student' | 'landlord' | 'admin'
      commissionRate, // 10% for landlords
      commissionAgreed,
      createdAt: serverTimestamp(),
      verified: false,
    });

    return newUser;
  }

  /** Sign in */
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /** Google Sign In */
  async function loginWithGoogle(role = 'student') {
    const provider = new GoogleAuthProvider();
    const { user: googleUser } = await signInWithPopup(auth, provider);

    // Create profile if first time
    const profileRef = doc(db, 'users', googleUser.uid);
    const snap = await getDoc(profileRef);
    if (!snap.exists()) {
      await setDoc(profileRef, {
        uid: googleUser.uid,
        name: googleUser.displayName,
        email: googleUser.email,
        role,
        createdAt: serverTimestamp(),
        verified: false,
      });
    }
    return googleUser;
  }

  /** Sign out */
  async function logout() {
    await signOut(auth);
  }

  const value = {
    user,
    userProfile,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    isStudent: userProfile?.role === 'student',
    isLandlord: userProfile?.role === 'landlord',
    isAdmin: userProfile?.role === 'admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
