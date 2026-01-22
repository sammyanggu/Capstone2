/**
 * Utility functions for calculating user rank based on quiz scores
 * This avoids needing to persist rank to database (which has permission issues)
 */

import { ref, get } from 'firebase/database';
import { db } from '../firebase';

/**
 * Calculate a specific user's rank based on quiz score leaderboard
 * @param {string} userId - User's Firebase UID
 * @returns {Promise<number>} User's rank (1-based), or 0 if not found
 */
export const calculateUserRank = async (userId) => {
  try {
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      console.warn('⚠️ No users found in database');
      return 0;
    }

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

    return userRank;
  } catch (error) {
    console.error('❌ Error calculating user rank:', error);
    return 0;
  }
};

/**
 * Get all users sorted by quiz score (for leaderboard)
 * @returns {Promise<Array>} Array of users with rank
 */
export const getLeaderboard = async () => {
  try {
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      return [];
    }

    const allUsers = usersSnapshot.val();
    
    // Create array of users with their quiz scores
    const usersWithScores = Object.entries(allUsers)
      .map(([uid, userData]) => ({
        uid,
        displayName: userData.displayName || 'Anonymous',
        email: userData.email || '',
        quizScore: userData.quizScore || 0,
        quizzesCompleted: userData.quizzesCompleted || 0
      }))
      .filter(user => user.email) // Only consider users with email (actual users)
      .sort((a, b) => b.quizScore - a.quizScore); // Sort by score descending

    // Add rank to each user
    return usersWithScores.map((user, index) => ({
      ...user,
      rank: index + 1
    }));
  } catch (error) {
    console.error('❌ Error fetching leaderboard:', error);
    return [];
  }
};

