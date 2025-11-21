import { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { 
  ref, 
  set, 
  get
} from 'firebase/database';
import { auth, db, provider } from './firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user in Realtime Database after Firebase auth registration
  const createUserDocument = async (user, additionalData = {}) => {
    if (!user) return;

    const userRef = ref(db, 'users/' + user.uid);
    const userSnapshot = await get(userRef);

    // Only create if doesn't exist
    if (!userSnapshot.exists()) {
      try {
        await set(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || additionalData.name || '',
          username: additionalData.username || '',
          photoURL: user.photoURL || '',
          points: 0,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          ...additionalData
        });
      } catch (error) {
        console.error('Error creating user document:', error);
      }
    }
  };

  // Google sign-in
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserDocument(result.user, {
        name: result.user.displayName
      });
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign out
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user data from Realtime Database
        try {
          const userRef = ref(db, 'users/' + user.uid);
          const userSnapshot = await get(userRef);
          if (userSnapshot.exists()) {
            setCurrentUser({
              ...user,
              ...userSnapshot.val()
            });
          } else {
            setCurrentUser(user);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    googleSignIn,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
