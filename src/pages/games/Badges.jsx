import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { ref, get, set } from 'firebase/database';
import { useTheme } from '../../ThemeContext';

// Badge definitions with unlock conditions
const badgeDefinitions = [
  { 
    id: 1, 
    name: 'First Steps', 
    image: '/assets/badges/b2/custom1.png',
    description: 'Complete your first quiz',
    condition: (stats) => (stats.quizzesCompleted || 0) >= 1
  },
  { 
    id: 2, 
    name: 'HTML Master', 
    image: '/assets/badges/b2/custom2.png',
    description: 'Score 80%+ on HTML quiz',
    condition: (stats) => stats.htmlMastery >= 80
  },
  { 
    id: 3, 
    name: 'CSS Expert', 
    image: '/assets/badges/b2/custom3.png',
    description: 'Score 80%+ on CSS quiz',
    condition: (stats) => stats.cssMastery >= 80
  },
  { 
    id: 4, 
    name: 'JS Legend', 
    image: '/assets/badges/b2/custom4.png',
    description: 'Score 80%+ on JavaScript quiz',
    condition: (stats) => stats.jsMastery >= 80
  },
  { 
    id: 5, 
    name: 'Quick Learner', 
    image: '/assets/badges/b2/custom5.png',
    description: 'Complete 5 quizzes',
    condition: (stats) => (stats.quizzesCompleted || 0) >= 5
  },
  { 
    id: 6, 
    name: 'Quiz Master', 
    image: '/assets/badges/b2/custom6.png',
    description: 'Score 90%+ on 3 different quizzes',
    condition: (stats) => (stats.highScoresCount || 0) >= 3
  },
  { 
    id: 7, 
    name: 'Streak Keeper', 
    image: '/assets/badges/b2/custom7.png',
    description: 'Complete 10 quizzes',
    condition: (stats) => (stats.quizzesCompleted || 0) >= 10
  },
  { 
    id: 8, 
    name: 'Problem Solver', 
    image: '/assets/badges/b2/custom8.png',
    description: 'Complete all exercise types',
    condition: (stats) => (stats.exerciseTypesCompleted || 0) >= 6
  },
  { 
    id: 9, 
    name: 'Rising Star', 
    image: '/assets/badges/b2/custom9.png',
    description: 'Earn 500 total quiz points',
    condition: (stats) => (stats.totalQuizPoints || 0) >= 500
  },
  { 
    id: 10, 
    name: 'Elite Coder', 
    image: '/assets/badges/b2/custom10.png',
    description: 'Complete 20 quizzes',
    condition: (stats) => (stats.quizzesCompleted || 0) >= 20
  },
];

function Badges() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [userStats, setUserStats] = useState({});

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserBadges(user.uid);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loadUserBadges = async (userId) => {
    try {
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        // Build stats object for badge checking
        const stats = {
          quizzesCompleted: data.quizzesCompleted || 0,
          totalQuizPoints: data.quizScore || 0,
          htmlMastery: data.htmlBestScore || 0,
          cssMastery: data.cssBestScore || 0,
          jsMastery: data.jsBestScore || 0,
          highScoresCount: data.highScoresCount || 0,
          exerciseTypesCompleted: data.exerciseTypesCompleted || 0,
        };

        setUserStats(stats);

        // Check which badges should be unlocked
        const newUnlockedBadges = badgeDefinitions
          .filter(badge => badge.condition(stats))
          .map(badge => badge.id);

        setUnlockedBadges(newUnlockedBadges);

        // Save unlocked badges to Firebase
        const badgesRef = ref(db, `users/${userId}/badges`);
        await set(badgesRef, {
          unlockedIds: newUnlockedBadges,
          lastUpdated: Date.now()
        });
      }
    } catch (error) {
      console.error('Error loading user badges:', error);
    }
  };

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center pt-20">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading Badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full min-h-screen overflow-hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'} pt-20`}>
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
          left: '-100px',
          top: '-100px',
          animation: 'floatGlow 12s infinite alternate ease-in-out'
        }}></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{
          right: '-100px',
          bottom: '-100px',
          animation: 'floatGlow 15s infinite alternate ease-in-out 2s'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              🎖️ Badges
            </h1>
            <p className={`text-lg md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Collect exclusive badges for your accomplishments! {unlockedBadges.length}/{badgeDefinitions.length} unlocked
            </p>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {badgeDefinitions.map((badge) => {
              const isUnlocked = unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-all duration-300 group ${
                    isUnlocked
                      ? theme === 'dark'
                        ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 hover:border-purple-500/60 hover:shadow-lg hover:shadow-purple-500/20'
                        : 'bg-purple-100 border border-purple-300 hover:shadow-lg'
                      : theme === 'dark'
                      ? 'bg-slate-800/40 border border-slate-700/30 opacity-50'
                      : 'bg-gray-200 border border-gray-300 opacity-50'
                  }`}
                  title={badge.description}
                >
                  <div className={`relative w-16 h-16 overflow-hidden rounded-lg group-hover:scale-110 transition-transform ${!isUnlocked && 'grayscale'}`}>
                    <img 
                      src={badge.image} 
                      alt={badge.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/assets/badges/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-bold ${isUnlocked ? (theme === 'dark' ? 'text-purple-400' : 'text-purple-700') : (theme === 'dark' ? 'text-gray-500' : 'text-gray-600')}`}>
                      {badge.name}
                    </p>
                    {!isUnlocked && (
                      <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        🔒 Locked
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatGlow {
          from { transform: translate(-200px, -150px); }
          to   { transform: translate(200px, 150px); }
        }
      `}</style>
    </div>
  );
}

export default Badges;
