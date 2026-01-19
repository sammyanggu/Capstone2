import { collection, addDoc, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { firestore, auth } from '../firebase';

/**
 * Save AI feedback history to Firestore
 * @param {string} exerciseId - Exercise identifier (e.g., 'html-beginner-1')
 * @param {string} code - User's code
 * @param {string} feedback - AI feedback text
 * @param {string} language - Programming language
 * @returns {Promise<string>} Document ID
 */
export async function saveAIFeedback(exerciseId, code, feedback, language) {
  try {
    if (!auth.currentUser) {
      console.warn('User not authenticated, skipping feedback save');
      return null;
    }

    const feedbackRef = collection(firestore, 'aiFeedback');
    const docId = await addDoc(feedbackRef, {
      userId: auth.currentUser.uid,
      exerciseId,
      code,
      feedback,
      language,
      timestamp: new Date(),
      codeLength: code.length,
    });

    console.log('✓ Feedback saved to Firestore:', docId.id);
    return docId.id;
  } catch (error) {
    // Silently fail - don't block the user
    console.error('Firestore save failed (non-critical):', error.message);
    return null;
  }
}

/**
 * Get latest AI feedback for an exercise
 * @param {string} exerciseId - Exercise identifier
 * @returns {Promise<Object|null>} Latest feedback object or null
 */
export async function getLatestAIFeedback(exerciseId) {
  try {
    if (!auth.currentUser) {
      return null;
    }

    const feedbackRef = collection(firestore, 'aiFeedback');
    const q = query(
      feedbackRef,
      where('userId', '==', auth.currentUser.uid),
      where('exerciseId', '==', exerciseId),
      orderBy('timestamp', 'desc'),
      limit(1)
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }

    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp),
    };
  } catch (error) {
    console.error('❌ Error fetching feedback:', error);
    return null;
  }
}

/**
 * Get all AI feedback history for an exercise
 * @param {string} exerciseId - Exercise identifier
 * @param {number} limitCount - Maximum number of records to fetch
 * @returns {Promise<Array>} Array of feedback objects
 */
export async function getAIFeedbackHistory(exerciseId, limitCount = 10) {
  try {
    if (!auth.currentUser) {
      return [];
    }

    const feedbackRef = collection(firestore, 'aiFeedback');
    const q = query(
      feedbackRef,
      where('userId', '==', auth.currentUser.uid),
      where('exerciseId', '==', exerciseId),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp),
    }));
  } catch (error) {
    console.error('❌ Error fetching feedback history:', error);
    return [];
  }
}
