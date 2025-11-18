import { ref, set, get, update } from 'firebase/database';
import { db } from '../firebase';

/**
 * Save exercise progress to database
 * @param {string} userId - User's Firebase UID
 * @param {string} exerciseType - Type of exercise (html, css, javascript, php, bootstrap, tailwind)
 * @param {string} level - Difficulty level (beginner, intermediate, advanced)
 * @param {string} code - User's code solution
 * @param {boolean} isCompleted - Whether the exercise is completed
 * @param {number} points - Points earned (if completed)
 */
export const saveExerciseProgress = async (
  userId,
  exerciseType,
  level,
  code,
  isCompleted = false,
  points = 0
) => {
  if (!userId) {
    console.error('User ID is required to save progress');
    return false;
  }

  try {
    const progressRef = ref(
      db,
      `users/${userId}/progress/exercises/${exerciseType}/${level}`
    );

    const progressData = {
      exerciseType,
      level,
      code,
      isCompleted,
      points,
      lastModified: Date.now(),
      submittedAt: isCompleted ? Date.now() : null
    };

    await set(progressRef, progressData);

    // Update user's total points if exercise is completed
    if (isCompleted) {
      await updateUserPoints(userId, points);
    }

    return true;
  } catch (error) {
    console.error('Error saving exercise progress:', error);
    return false;
  }
};

/**
 * Get exercise progress from database
 * @param {string} userId - User's Firebase UID
 * @param {string} exerciseType - Type of exercise
 * @param {string} level - Difficulty level
 */
export const getExerciseProgress = async (userId, exerciseType, level) => {
  if (!userId) {
    console.error('User ID is required to fetch progress');
    return null;
  }

  try {
    const progressRef = ref(
      db,
      `users/${userId}/progress/exercises/${exerciseType}/${level}`
    );

    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    console.error('Error fetching exercise progress:', error);
    return null;
  }
};

/**
 * Update user's total points
 * @param {string} userId - User's Firebase UID
 * @param {number} pointsToAdd - Points to add
 */
export const updateUserPoints = async (userId, pointsToAdd) => {
  if (!userId) {
    console.error('User ID is required to update points');
    return false;
  }

  try {
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      const currentPoints = userSnapshot.val().points || 0;
      const newPoints = currentPoints + pointsToAdd;

      await update(userRef, {
        points: newPoints,
        updatedAt: Date.now()
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error updating user points:', error);
    return false;
  }
};

/**
 * Get all exercise progress for a user
 * @param {string} userId - User's Firebase UID
 */
export const getUserExerciseProgress = async (userId) => {
  if (!userId) {
    console.error('User ID is required');
    return null;
  }

  try {
    const progressRef = ref(db, `users/${userId}/progress/exercises`);
    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    console.error('Error fetching user exercise progress:', error);
    return null;
  }
};

/**
 * Mark exercise as completed
 * @param {string} userId - User's Firebase UID
 * @param {string} exerciseType - Type of exercise
 * @param {string} level - Difficulty level
 * @param {number} points - Points to award
 */
export const completeExercise = async (userId, exerciseType, level, points = 10) => {
  return saveExerciseProgress(userId, exerciseType, level, '', true, points);
};

/**
 * Get exercise completion stats
 * @param {string} userId - User's Firebase UID
 */
export const getCompletionStats = async (userId) => {
  if (!userId) {
    console.error('User ID is required');
    return null;
  }

  try {
    const progressRef = ref(db, `users/${userId}/progress/exercises`);
    const snapshot = await get(progressRef);

    if (!snapshot.exists()) {
      return {
        totalCompleted: 0,
        totalPoints: 0,
        byType: {}
      };
    }

    const allProgress = snapshot.val();
    let totalCompleted = 0;
    let totalPoints = 0;
    const byType = {};

    // Iterate through all exercise types
    Object.keys(allProgress).forEach(type => {
      byType[type] = { completed: 0, total: 0 };

      Object.values(allProgress[type]).forEach(levelData => {
        byType[type].total++;
        if (levelData.isCompleted) {
          totalCompleted++;
          byType[type].completed++;
          totalPoints += levelData.points || 0;
        }
      });
    });

    return {
      totalCompleted,
      totalPoints,
      byType
    };
  } catch (error) {
    console.error('Error getting completion stats:', error);
    return null;
  }
};
