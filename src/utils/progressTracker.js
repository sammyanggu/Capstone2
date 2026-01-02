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
    console.error('❌ User ID is required to save progress');
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

    console.log('📝 Saving progress to Firebase:', {
      path: `users/${userId}/progress/exercises/${exerciseType}/${level}`,
      data: progressData
    });

    await set(progressRef, progressData);
    console.log('✅ Progress saved successfully');

    // Update user's total points if exercise is completed
    if (isCompleted) {
      await updateUserPoints(userId, points);
    }

    // Dispatch a global event so UI can react (e.g., refresh stats)
    try {
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('progress-updated', { detail: { userId, type: 'exercise', exerciseType, level, isCompleted } }));
      }
    } catch (e) {
      // ignore dispatch errors in non-browser environments
    }

    // Recompute and persist hub summary so all pages have up-to-date aggregate stats
    try {
      const lessonProgress = await getUserLessonProgress(userId);
      const exerciseProgress = await getUserExerciseProgress(userId);

      const lessonsCompleted = Object.values(lessonProgress || {}).filter(l => l.isCompleted || l.completed).length;
      const exercisesCompleted = Object.values(exerciseProgress || {}).reduce((acc, curr) => {
        // curr may be map of levels; count completed across levels
        if (typeof curr === 'object') {
          return acc + Object.values(curr).filter(l => l.isCompleted || l.completed).length;
        }
        return acc;
      }, 0);

      const totalProgress = Math.round(((lessonsCompleted + exercisesCompleted) / 20) * 100);
      const hoursLearned = Math.floor((Object.values(lessonProgress || {}).length * 1.5) + (Object.values(exerciseProgress || {}).length * 0.5));

      const summary = { lessonsCompleted, exercisesCompleted, totalProgress, hoursLearned };
      await saveHubSummary(userId, summary);
    } catch (e) {
      // don't fail the save if hub summary update fails
      console.warn('Could not update hub summary after exercise save', e);
    }

    return true;
  } catch (error) {
    console.error('❌ Error saving exercise progress:', error);
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
    console.error('❌ User ID is required to fetch progress');
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
    console.error('❌ Error fetching exercise progress:', error);
    return null;
  }
};

/**
 * Update user's total points and exercise count
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
      const currentData = userSnapshot.val();
      const currentPoints = currentData.points || 0;
      const currentExercisesCompleted = currentData.exercisesCompleted || 0;
      const newPoints = currentPoints + pointsToAdd;

      await update(userRef, {
        points: newPoints,
        exercisesCompleted: currentExercisesCompleted + 1,
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

/**
 * Save lesson progress
 * @param {string} userId - User's Firebase UID
 * @param {string} category - Lesson category (html, css, javascript, etc)
 * @param {string} lessonTitle - Lesson title
 * @param {number} progressPercent - Progress percentage (0-100)
 * @param {boolean} isCompleted - Whether lesson is completed
 */
export const saveLessonProgress = async (
  userId,
  category,
  lessonTitle,
  progressPercent = 0,
  isCompleted = false,
  currentTime = 0
) => {
  if (!userId) {
    console.error('User ID is required to save lesson progress');
    return false;
  }

  try {
    const progressRef = ref(
      db,
      `users/${userId}/progress/lessons/${category}/${lessonTitle.replace(/\//g, '_')}`
    );

    const progressData = {
      category,
      lessonTitle,
      progressPercent: Math.min(100, Math.max(0, progressPercent)),
      currentTime: Math.max(0, currentTime), // Save resume point (in seconds)
      isCompleted,
      lastModified: Date.now(),
      completedAt: isCompleted ? Date.now() : null
    };

    await set(progressRef, progressData);
    // Dispatch a global event so UI can react (e.g., refresh stats)
    try {
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('progress-updated', { detail: { userId, type: 'lesson', category } }));
      }
    } catch (e) {
      // ignore dispatch errors in non-browser environments
    }

    // Recompute and persist hub summary so all pages have up-to-date aggregate stats
    try {
      const lessonProgress = await getUserLessonProgress(userId);
      const exerciseProgress = await getUserExerciseProgress(userId);

      const lessonsCompleted = Object.values(lessonProgress || {}).reduce((acc, curr) => {
        if (typeof curr === 'object') {
          return acc + Object.values(curr).filter(l => l.isCompleted || l.completed).length;
        }
        return acc;
      }, 0);

      const exercisesCompleted = Object.values(exerciseProgress || {}).reduce((acc, curr) => {
        if (typeof curr === 'object') {
          return acc + Object.values(curr).filter(e => e.isCompleted || e.completed).length;
        }
        return acc;
      }, 0);

      const totalProgress = Math.round(((lessonsCompleted + exercisesCompleted) / 20) * 100);
      const hoursLearned = Math.floor((Object.values(lessonProgress || {}).length * 1.5) + (Object.values(exerciseProgress || {}).length * 0.5));

      const summary = { lessonsCompleted, exercisesCompleted, totalProgress, hoursLearned };
      await saveHubSummary(userId, summary);
    } catch (e) {
      console.warn('Could not update hub summary after lesson save', e);
    }

    return true;
  } catch (error) {
    console.error('Error saving lesson progress:', error);
    return false;
  }
};

/**
 * Get lesson progress
 * @param {string} userId - User's Firebase UID
 * @param {string} category - Lesson category
 * @param {string} lessonTitle - Lesson title
 */
export const getLessonProgress = async (userId, category, lessonTitle) => {
  if (!userId) {
    console.error('User ID is required to fetch lesson progress');
    return null;
  }

  try {
    const progressRef = ref(
      db,
      `users/${userId}/progress/lessons/${category}/${lessonTitle.replace(/\//g, '_')}`
    );

    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    console.error('Error fetching lesson progress:', error);
    return null;
  }
};

/**
 * Get all lesson progress for a category
 * @param {string} userId - User's Firebase UID
 * @param {string} category - Lesson category
 */
export const getCategoryLessonProgress = async (userId, category) => {
  if (!userId) {
    console.error('User ID is required');
    return null;
  }

  try {
    const progressRef = ref(db, `users/${userId}/progress/lessons/${category}`);
    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    console.error('Error fetching category lesson progress:', error);
    return null;
  }
};

/**
 * Get all lesson progress for user
 * @param {string} userId - User's Firebase UID
 */
export const getUserLessonProgress = async (userId) => {
  if (!userId) {
    console.error('User ID is required');
    return null;
  }

  try {
    const progressRef = ref(db, `users/${userId}/progress/lessons`);
    const snapshot = await get(progressRef);

    if (snapshot.exists()) {
      return snapshot.val();
    }

    return null;
  } catch (error) {
    console.error('Error fetching user lesson progress:', error);
    return null;
  }
};

/**
 * Get lesson completion stats
 * @param {string} userId - User's Firebase UID
 */
export const getLessonStats = async (userId) => {
  if (!userId) {
    console.error('User ID is required');
    return null;
  }

  try {
    const progressRef = ref(db, `users/${userId}/progress/lessons`);
    const snapshot = await get(progressRef);

    if (!snapshot.exists()) {
      return {
        totalLessons: 0,
        completedLessons: 0,
        averageProgress: 0,
        byCategory: {}
      };
    }

    const allProgress = snapshot.val();
    let totalLessons = 0;
    let completedLessons = 0;
    let totalProgress = 0;
    const byCategory = {};

    Object.keys(allProgress).forEach(category => {
      byCategory[category] = {
        completed: 0,
        total: 0,
        averageProgress: 0
      };

      const lessons = allProgress[category];
      Object.values(lessons).forEach(lessonData => {
        totalLessons++;
        byCategory[category].total++;
        totalProgress += lessonData.progressPercent || 0;

        if (lessonData.isCompleted) {
          completedLessons++;
          byCategory[category].completed++;
        }

        byCategory[category].averageProgress =
          (byCategory[category].averageProgress + (lessonData.progressPercent || 0)) /
          (byCategory[category].total || 1);
      });
    });

    return {
      totalLessons,
      completedLessons,
      averageProgress: totalLessons > 0 ? Math.round(totalProgress / totalLessons) : 0,
      byCategory
    };
  } catch (error) {
    console.error('Error getting lesson stats:', error);
    return null;
  }
};

/**
 * Update user's quiz score
 * @param {string} userId - User's Firebase UID
 * @param {number} scoreToAdd - Quiz score to add
 */
export const updateQuizScore = async (userId, scoreToAdd, quizCategory = null) => {
  if (!userId) {
    console.error('❌ User ID is required to update quiz score');
    return false;
  }

  try {
    const userRef = ref(db, `users/${userId}`);
    const userSnapshot = await get(userRef);

    if (userSnapshot.exists()) {
      const currentData = userSnapshot.val();
      const currentQuizScore = currentData.quizScore || 0;
      const currentQuizzesCompleted = currentData.quizzesCompleted || 0;
      const newQuizScore = currentQuizScore + scoreToAdd;

      const updateData = {
        quizScore: newQuizScore,
        quizzesCompleted: currentQuizzesCompleted + 1,
        updatedAt: Date.now()
      };

      // Track best scores for specific quiz categories to enable badge conditions
      if (quizCategory) {
        const categoryKey = quizCategory.toLowerCase();
        
        if (categoryKey.includes('html')) {
          const currentBest = currentData.htmlBestScore || 0;
          updateData.htmlBestScore = Math.max(currentBest, scoreToAdd);
        } else if (categoryKey.includes('css')) {
          const currentBest = currentData.cssBestScore || 0;
          updateData.cssBestScore = Math.max(currentBest, scoreToAdd);
        } else if (categoryKey.includes('javascript') || categoryKey.includes('js')) {
          const currentBest = currentData.jsBestScore || 0;
          updateData.jsBestScore = Math.max(currentBest, scoreToAdd);
        }

        // Track high scores for badge condition
        if (scoreToAdd >= 90) {
          const highScoresCount = currentData.highScoresCount || 0;
          updateData.highScoresCount = highScoresCount + 1;
        }
      }

      await update(userRef, updateData);
      console.log(`✅ Updated quiz score for user ${userId}: +${scoreToAdd} points (now ${newQuizScore})`);

      // Rank is calculated dynamically in the Leaderboard component
      // No need to persist to database - it's computed from quiz scores

      return true;
    } else {
      console.error(`❌ User document doesn't exist for ${userId}. User may not be properly initialized in Firebase.`);
      return false;
    }
  } catch (error) {
    console.error('❌ Error updating quiz score:', error);
    return false;
  }
};

/**
 * Save a hub-level summary for quick access in the UI
 * @param {string} userId
 * @param {object} summary - arbitrary summary object to store (lessonsCompleted, exercisesCompleted, totalPoints, hoursLearned, etc)
 */
export const saveHubSummary = async (userId, summary = {}) => {
  if (!userId) {
    console.error('User ID is required to save hub summary');
    return false;
  }

  try {
    const hubRef = ref(db, `users/${userId}/hubSummary`);
    await set(hubRef, { ...summary, updatedAt: Date.now() });
    // notify UI listeners
    try {
      if (typeof window !== 'undefined' && window.dispatchEvent) {
        window.dispatchEvent(new CustomEvent('hub-summary-updated', { detail: { userId, summary } }));
      }
    } catch (e) {}

    return true;
  } catch (error) {
    console.error('Error saving hub summary:', error);
    return false;
  }
};

/**
 * Get hub summary for user
 * @param {string} userId
 */
export const getHubSummary = async (userId) => {
  if (!userId) {
    console.error('User ID is required to fetch hub summary');
    return null;
  }

  try {
    const hubRef = ref(db, `users/${userId}/hubSummary`);
    const snapshot = await get(hubRef);
    if (snapshot.exists()) return snapshot.val();
    return null;
  } catch (error) {
    console.error('Error fetching hub summary:', error);
    return null;
  }
};

/**
 * Save quiz progress
 * @param {string} userId - User's Firebase UID
 * @param {string} quizCategory - Quiz category
 * @param {number} score - Quiz score
 * @param {number} totalQuestions - Total questions in quiz
 * @param {number} correctAnswers - Number of correct answers
 */
export const saveQuizProgress = async (
  userId,
  quizCategory,
  score,
  totalQuestions,
  correctAnswers
) => {
  if (!userId) {
    console.error('User ID is required to save quiz progress');
    return false;
  }

  try {
    const progressRef = ref(
      db,
      `users/${userId}/progress/quizzes/${quizCategory}`
    );

    const progressData = {
      category: quizCategory,
      score,
      totalQuestions,
      correctAnswers,
      percentage: Math.round((correctAnswers / totalQuestions) * 100),
      completedAt: Date.now()
    };

    await set(progressRef, progressData);

    // Update user's total quiz score and track category-specific best scores
    await updateQuizScore(userId, score, quizCategory);

    return true;
  } catch (error) {
    console.error('Error saving quiz progress:', error);
    return false;
  }
};

/**
 * Save the current exercise index (which exercise user is on)
 * @param {string} userId - User's Firebase UID
 * @param {string} exerciseType - Type of exercise (html, css, javascript, php)
 * @param {string} level - Difficulty level (beginner, intermediate, advanced)
 * @param {number} currentExerciseIndex - The index of the current exercise
 */
export const saveCurrentExerciseIndex = async (userId, exerciseType, level, currentExerciseIndex) => {
  if (!userId) {
    console.error('❌ User ID is required to save current exercise index');
    return false;
  }

  try {
    const currentExerciseRef = ref(
      db,
      `users/${userId}/progress/exerciseState/${exerciseType}/${level}/currentIndex`
    );

    await set(currentExerciseRef, currentExerciseIndex);
    console.log(`📝 Saved current exercise index: ${exerciseType}-${level} => ${currentExerciseIndex}`);

    return true;
  } catch (error) {
    console.error('❌ Error saving current exercise index:', error);
    return false;
  }
};

/**
 * Get the current exercise index for user
 * @param {string} userId - User's Firebase UID
 * @param {string} exerciseType - Type of exercise (html, css, javascript, php)
 * @param {string} level - Difficulty level (beginner, intermediate, advanced)
 */
export const getCurrentExerciseIndex = async (userId, exerciseType, level) => {
  if (!userId) {
    console.error('❌ User ID is required to fetch current exercise index');
    return null;
  }

  try {
    const currentExerciseRef = ref(
      db,
      `users/${userId}/progress/exerciseState/${exerciseType}/${level}/currentIndex`
    );

    const snapshot = await get(currentExerciseRef);

    if (snapshot.exists()) {
      console.log(`✅ Loaded current exercise index: ${snapshot.val()}`);
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error('❌ Error fetching current exercise index:', error);
    return null;
  }
};

/**
 * Calculate and update user's rank based on quiz scores
 * Rank is based on position in the leaderboard (sorted by quiz score descending)
 * @param {string} userId - User's Firebase UID
 */
export const updateUserRank = async (userId) => {
  if (!userId) {
    console.error('❌ User ID is required to update rank');
    return false;
  }

  try {
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);

    if (usersSnapshot.exists()) {
      const allUsers = usersSnapshot.val();
      
      // Create array of users with their quiz scores
      const usersWithScores = Object.entries(allUsers)
        .map(([uid, userData]) => ({
          uid,
          quizScore: userData.quizScore || 0,
          email: userData.email || ''
        }))
        .filter(user => user.email) // Only consider users with email (actual users)
        .sort((a, b) => b.quizScore - a.quizScore); // Sort by score descending

      // Find user's rank (1-based index)
      const userRankIndex = usersWithScores.findIndex(u => u.uid === userId);
      const userRank = userRankIndex !== -1 ? userRankIndex + 1 : 0;

      // Update user's rank in database
      const userRef = ref(db, `users/${userId}`);
      await update(userRef, {
        rank: userRank,
        updatedAt: Date.now()
      });

      console.log(`✅ Updated rank for user ${userId}: Rank #${userRank}`);
      return true;
    } else {
      console.error('❌ No users found in database');
      return false;
    }
  } catch (error) {
    console.error('❌ Error updating user rank:', error);
    return false;
  }
};

/**
 * Update ranks for all users in the database
 * This should be called periodically or after quiz/points updates
 */
export const updateAllUserRanks = async () => {
  try {
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);

    if (usersSnapshot.exists()) {
      const allUsers = usersSnapshot.val();
      
      // Create array of users with their quiz scores
      const usersWithScores = Object.entries(allUsers)
        .map(([uid, userData]) => ({
          uid,
          quizScore: userData.quizScore || 0,
          email: userData.email || ''
        }))
        .filter(user => user.email) // Only consider users with email (actual users)
        .sort((a, b) => b.quizScore - a.quizScore); // Sort by score descending

      // Update rank for each user
      const updatePromises = usersWithScores.map((user, index) => {
        const userRef = ref(db, `users/${user.uid}`);
        return update(userRef, {
          rank: index + 1,
          updatedAt: Date.now()
        });
      });

      await Promise.all(updatePromises);
      console.log(`✅ Updated ranks for all ${usersWithScores.length} users`);
      return true;
    } else {
      console.error('❌ No users found in database');
      return false;
    }
  } catch (error) {
    console.error('❌ Error updating all user ranks:', error);
    return false;
  }
};

