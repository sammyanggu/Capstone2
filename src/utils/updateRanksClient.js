/**
 * Update all user ranks in Firebase
 * This script can be run from the browser console or as part of the app initialization
 */

import { ref, get, update } from 'firebase/database';
import { db } from './src/firebase.js';

export async function updateAllUserRanksClient() {
  try {
    console.log('🔄 Starting to update user ranks...');
    
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      console.log('❌ No users found in database');
      return false;
    }

    const allUsers = usersSnapshot.val();
    
    // Create array of users with their quiz scores
    const usersWithScores = Object.entries(allUsers)
      .map(([uid, userData]) => ({
        uid,
        displayName: userData.displayName || 'Anonymous',
        email: userData.email || '',
        quizScore: userData.quizScore || 0
      }))
      .filter(user => user.email) // Only consider users with email (actual users)
      .sort((a, b) => b.quizScore - a.quizScore); // Sort by score descending

    console.log(`\n📊 Found ${usersWithScores.length} users to rank`);
    console.log('\n📋 Top 10 Users by Quiz Score:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Rank | Name                      | Quiz Score');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    usersWithScores.slice(0, 10).forEach((user, index) => {
      const rank = index + 1;
      const paddedName = user.displayName.padEnd(25);
      console.log(`${rank.toString().padEnd(4)} | ${paddedName} | ${user.quizScore}`);
    });

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

    // Update rank for each user
    console.log('🔄 Updating ranks...');
    let updatedCount = 0;

    const updatePromises = usersWithScores.map((user, index) => {
      const userRef = ref(db, `users/${user.uid}`);
      const newRank = index + 1;
      
      return update(userRef, {
        rank: newRank,
        updatedAt: Date.now()
      }).then(() => {
        updatedCount++;
        if (index < 10) {
          console.log(`✅ Updated ${user.displayName}: Rank #${newRank}`);
        } else if (index === 10) {
          console.log('...');
        }
        return true;
      });
    });

    await Promise.all(updatePromises);

    console.log(`\n✅ Successfully updated ranks for ${updatedCount} users!\n`);
    return true;
  } catch (error) {
    console.error('❌ Error updating ranks:', error.message);
    console.error(error);
    return false;
  }
}

