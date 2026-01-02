import { initializeApp, cert } from 'firebase-admin/app';
import { getDatabase, ref, get, update } from 'firebase-admin/database';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

// Initialize Firebase Admin
const serviceAccountPath = process.env.FIREBASE_ADMIN_SDK_PATH || './firebase-key.json';

if (!fs.existsSync(serviceAccountPath)) {
  console.error(`❌ Firebase Admin SDK key not found at ${serviceAccountPath}`);
  console.error('Please set FIREBASE_ADMIN_SDK_PATH environment variable or place firebase-key.json in the root directory');
  process.exit(1);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://bsit-default-rtdb.firebaseio.com'
});

const db = getDatabase(app);

/**
 * Update ranks for all users in the database
 */
async function updateAllRanks() {
  try {
    console.log('🔄 Starting to update user ranks...');
    
    const usersRef = ref(db, 'users');
    const usersSnapshot = await get(usersRef);

    if (!usersSnapshot.exists()) {
      console.log('❌ No users found in database');
      return;
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
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating ranks:', error.message);
    console.error(error);
    process.exit(1);
  }
}

// Run the update
updateAllRanks();
