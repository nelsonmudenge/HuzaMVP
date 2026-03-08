// lib/firestore.js
// ============================================================
// Firestore CRUD operations for properties, users, reservations
// ============================================================

import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  increment,
} from 'firebase/firestore';
import { db } from './firebase';

// ── PROPERTIES ──────────────────────────────────────────────

/** Create a new property listing */
export async function createProperty(data) {
  const ref = await addDoc(collection(db, 'properties'), {
    ...data,
    verified: false,
    status: 'pending', // pending | approved | rejected
    views: 0,
    inquiries: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Fetch all approved properties with optional filters */
export async function getProperties({ priceMax, location, amenities, type } = {}) {
  let q = query(
    collection(db, 'properties'),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  let properties = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Client-side filtering (Firestore free tier avoids composite indexes)
  if (priceMax) properties = properties.filter(p => p.price <= priceMax);
  if (location) properties = properties.filter(p =>
    p.location?.toLowerCase().includes(location.toLowerCase())
  );
  if (type) properties = properties.filter(p => p.type === type);
  if (amenities?.length) {
    properties = properties.filter(p =>
      amenities.every(a => p.amenities?.includes(a))
    );
  }
  return properties;
}

/** Fetch a single property by ID and increment view count */
export async function getProperty(id) {
  const ref = doc(db, 'properties', id);
  await updateDoc(ref, { views: increment(1) });
  const snap = await getDoc(ref);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

/** Get all properties for a specific landlord */
export async function getLandlordProperties(landlordId) {
  const q = query(
    collection(db, 'properties'),
    where('landlordId', '==', landlordId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Update a property */
export async function updateProperty(id, data) {
  const ref = doc(db, 'properties', id);
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
}

/** Delete a property */
export async function deleteProperty(id) {
  await deleteDoc(doc(db, 'properties', id));
}

/** Admin: get all pending properties */
export async function getPendingProperties() {
  const q = query(
    collection(db, 'properties'),
    where('status', '==', 'pending'),
    orderBy('createdAt', 'asc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Admin: approve or reject a listing */
export async function updatePropertyStatus(id, status, note = '') {
  await updateDoc(doc(db, 'properties', id), {
    status,
    verified: status === 'approved',
    adminNote: note,
    reviewedAt: serverTimestamp(),
  });
}

// ── RESERVATIONS ─────────────────────────────────────────────

/** Create a reservation (goes to admin, not landlord) */
export async function createReservation(data) {
  const ref = await addDoc(collection(db, 'reservations'), {
    ...data,
    status: 'pending', // pending | confirmed | cancelled | completed
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  // Increment property inquiry count
  await updateDoc(doc(db, 'properties', data.propertyId), {
    inquiries: increment(1),
  });
  return ref.id;
}

// duplicate helper functions removed - definitions appear later in the file


/** Get reservations for a landlord's properties */
export async function getLandlordReservations(landlordId) {
  const q = query(
    collection(db, 'reservations'),
    where('landlordId', '==', landlordId),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Update reservation status with commission calculation */
export async function updateReservationStatus(id, status, adminNote = '', paymentAmount = 0) {
  const updateData = {
    status,
    updatedAt: serverTimestamp(),
  };

  if (adminNote) updateData.adminNote = adminNote;
  if (status === 'confirmed' && paymentAmount > 0) {
    const commission = paymentAmount * 0.1; // 10% commission
    updateData.commission = commission;
    updateData.paymentAmount = paymentAmount;
    updateData.confirmedAt = serverTimestamp();

    // Record commission in admin finance history
    await addDoc(collection(db, 'admin-finance'), {
      type: 'commission',
      reservationId: id,
      amount: commission,
      paymentAmount,
      createdAt: serverTimestamp(),
    });
  }

  await updateDoc(doc(db, 'reservations', id), updateData);
}

// ── USER PROFILES ────────────────────────────────────────────

/** Create or update user profile in Firestore */
export async function upsertUserProfile(uid, data) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await updateDoc(ref, { ...data, updatedAt: serverTimestamp() });
  } else {
    await updateDoc(ref, {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch(() =>
      addDoc(collection(db, 'users'), { uid, ...data, createdAt: serverTimestamp() })
    );
  }
}

/** Get user profile */
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

// ── REAL-TIME LISTENERS ──────────────────────────────────────

/** Listen to admin reservations in real-time */
export function subscribeAdminReservations(callback) {
  const q = query(
    collection(db, 'reservations'),
    orderBy('createdAt', 'desc'),
    limit(50)
  );
  return onSnapshot(q, snap => {
    callback(snap.docs.map(d => ({ id: d.id, ...d.data() })));
  });
}

/** Get all reservations for admin review */
export async function getAllReservations(status = 'all') {
  let q;
  if (status === 'all') {
    q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
  } else {
    q = query(
      collection(db, 'reservations'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
  }
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Get all landlords with their properties */
export async function getAllLandlords() {
  const q = query(collection(db, 'users'), where('role', '==', 'landlord'));
  const snap = await getDocs(q);
  const landlords = snap.docs.map(d => ({ id: d.id, ...d.data() }));

  // Get properties for each landlord
  const landlordsWithProperties = await Promise.all(
    landlords.map(async (landlord) => {
      const properties = await getLandlordProperties(landlord.uid);
      return { ...landlord, properties };
    })
  );

  return landlordsWithProperties;
}

/** Get admin finance history */
export async function getAdminFinance() {
  const q = query(collection(db, 'admin-finance'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Create agreement record */
export async function createAgreement(data) {
  const ref = await addDoc(collection(db, 'agreements'), {
    ...data,
    status: 'active',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

/** Get all agreements */
export async function getAllAgreements() {
  const q = query(collection(db, 'agreements'), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/** Update user profile with commission agreement */
export async function updateUserWithCommission(uid, commissionRate = 0.1) {
  await updateDoc(doc(db, 'users', uid), {
    commissionRate,
    commissionAgreed: true,
    updatedAt: serverTimestamp(),
  });
}
