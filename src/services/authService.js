import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

export const signUp = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (name) {
      await updateFirebaseProfile(user, { displayName: name });
    }

    const userData = {
      name: name || email.split('@')[0],
      email: email,
      favoriteGenres: [],
      hasCompletedOnboarding: false,
      createdAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'users', user.uid), userData);
    } catch (firestoreError) {
    }

    return {
      uid: user.uid,
      email: user.email,
      name: name || user.displayName || email.split('@')[0],
      favoriteGenres: [],
    };
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    const userData = userDoc.data();

    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName || userData?.name || email.split('@')[0],
      favoriteGenres: userData?.favoriteGenres || [],
    };
  } catch (error) {
    throw error;
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (uid, updates) => {
  try {
    await setDoc(doc(db, 'users', uid), updates, { merge: true });
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    throw error;
  }
};

