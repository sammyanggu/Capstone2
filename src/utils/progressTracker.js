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
export const updateQuizScore = async (userId, scoreToAdd) => {
  if (!userId) {
    console.error('User ID is required to update quiz score');
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

      await update(userRef, {
        quizScore: newQuizScore,
        quizzesCompleted: currentQuizzesCompleted + 1,
        updatedAt: Date.now()
      });

      return true;
    }

    return false;
  } catch (error) {
    console.error('Error updating quiz score:', error);
    return false;
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

    // Update user's total quiz score
    await updateQuizScore(userId, score);

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

