import { db } from './config';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export const getUserDocRef = (uid) => doc(db, 'users', uid);
export const getUserDataDocRef = (uid) => doc(db, 'users', uid, 'data', 'main');

export const saveUserData = async (uid, data) => {
  try {
    const docRef = getUserDataDocRef(uid);
    await setDoc(docRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

export const getUserData = async (uid) => {
  try {
    const docRef = getUserDataDocRef(uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

export const subscribeUserData = (uid, onUpdate) => {
  const docRef = getUserDataDocRef(uid);
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      onUpdate(docSnap.data());
    } else {
      onUpdate(null);
    }
  }, (error) => {
    console.error("Error subscribing to user data:", error);
  });
};

export const createUserProfile = async (uid, profileData) => {
  try {
    const docRef = getUserDocRef(uid);
    await setDoc(docRef, {
      ...profileData,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  } catch (error) {
    console.error("Error creating user profile:", error);
  }
};
