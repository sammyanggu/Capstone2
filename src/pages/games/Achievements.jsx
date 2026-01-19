import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { ref, get } from 'firebase/database';
import { useTheme } from '../../ThemeContext';

// Sample achievements data with icons and descriptions
const sampleAchievements = [
  {
    id: 'first-quiz',
    name: 'Quiz Pioneer',
    description: 'Completed your first quiz successfully',
    icon: '🚀',
    category: 'milestone'
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    description: 'Scored 100% on a quiz',
    icon: '💯',
    category: 'score'
  },
  {
    id: 'html-master',
    name: 'HTML Master',
    description: 'Completed all HTML quizzes with 80%+',
    icon: '🏗️',
    category: 'language'
  },
  {
    id: 'css-wizard',
    name: 'CSS Wizard',
    description: 'Completed all CSS quizzes with 80%+',
    icon: '🎨',
    category: 'language'
  },
  {
    id: 'js-ninja',
    name: 'JavaScript Ninja',
    description: 'Completed all JavaScript quizzes with 80%+',
    icon: '⚡',
    category: 'language'
  },
  {
    id: 'speed-runner',
    name: 'Speed Runner',
    description: 'Completed 5 quizzes in a single day',
    icon: '⏱️',
    category: 'challenge'
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Completed quizzes for 7 days in a row',
    icon: '👑',
    category: 'streak'
  },
  {
    id: 'exercise-master',
    name: 'Exercise Master',
    description: 'Completed 25 exercises',
    icon: '💪',
    category: 'practice'
  },
  {
    id: 'documentation-expert',
    name: 'Documentation Expert',
    description: 'Read all available documentation tutorials',
    icon: '📚',
    category: 'learning'
  },
  {
    id: 'all-languages',
    name: 'Polyglot',
    description: 'Scored 80%+ on all language categories',
    icon: '🌍',
    category: 'mastery'
  },
  // B1 Folder Badges - Rank-based Achievements
  {
    id: 'bronze-rank',
    name: 'Bronze Rank',
    description: 'Achieved Bronze Rank by earning 500 points',
    icon: '🥉',
    image: '/assets/badges/b1/Bronze.png',
    category: 'rank'
  },
  {
    id: 'silver1-rank',
    name: 'Silver I',
    description: 'Achieved Silver I Rank by earning 1,000 points',
    icon: '🥈',
    image: '/assets/badges/b1/Silver1.png',
    category: 'rank'
  },
  {
    id: 'silver2-rank',
    name: 'Silver II',
    description: 'Achieved Silver II Rank by earning 1,500 points',
    icon: '🥈',
    image: '/assets/badges/b1/Silver2.png',
    category: 'rank'
  },
  {
    id: 'silver3-rank',
    name: 'Silver III',
    description: 'Achieved Silver III Rank by earning 2,000 points',
    icon: '🥈',
    image: '/assets/badges/b1/Silver3.png',
    category: 'rank'
  },
  {
    id: 'silver4-rank',
    name: 'Silver IV',
    description: 'Achieved Silver IV Rank by earning 2,500 points',
    icon: '🥈',
    image: '/assets/badges/b1/Silver4.png',
    category: 'rank'
  },
  {
    id: 'silver5-rank',
    name: 'Silver V',
    description: 'Achieved Silver V Rank by earning 3,000 points',
    icon: '🥈',
    image: '/assets/badges/b1/Silver5.png',
    category: 'rank'
  },
  {
    id: 'gold-rank',
    name: 'Gold Rank',
    description: 'Achieved Gold Rank by earning 5,000 points',
    icon: '🥇',
    image: '/assets/badges/b1/Gold.png',
    category: 'rank'
  },
  {
    id: 'emerald-rank',
    name: 'Emerald Rank',
    description: 'Achieved Emerald Rank by earning 7,500 points',
    icon: '💎',
    image: '/assets/badges/b1/Emerald.png',
    category: 'rank'
  },
  {
    id: 'challenger-rank',
    name: 'Challenger',
    description: 'Achieved Challenger Rank - The ultimate achievement!',
    icon: '👑',
    image: '/assets/badges/b1/Challenger.png',
    category: 'rank'
  }
];

function Achievements() {
  const { theme } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const achievementsRef = ref(db, `users/${user.uid}/achievements`);
          const snapshot = await get(achievementsRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setAchievements(Object.entries(data).map(([key, value]) => ({
              id: key,
              ...value
            })));
          } else {
            // If no achievements in database, use sample data
            setAchievements(sampleAchievements);
          }
        } catch (error) {
          console.error('Error fetching achievements:', error);
          // Use sample data on error
          setAchievements(sampleAchievements);
        }
      } else {
        // If no user logged in, still show sample achievements
        setAchievements(sampleAchievements);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center pt-20">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading Achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 pt-20">
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
              ⭐ Achievements
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Unlock special achievements by completing challenges!
            </p>
          </div>

          {/* Rank Badges Section */}
          {achievements.some(a => a.category === 'rank') && (
            <>
              <div className="mb-16">
                <h2 className="text-3xl font-bold text-purple-400 mb-8 flex items-center gap-2">
                  <span className="text-2xl">👑</span> Rank Badges
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                  {achievements
                    .filter(a => a.category === 'rank')
                    .map((achievement) => (
                      <div
                        key={achievement.id}
                        className="group relative flex flex-col items-center"
                      >
                        <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 p-2">
                          {achievement.image && (
                            <img 
                              src={achievement.image} 
                              alt={achievement.name}
                              className="w-full h-full object-cover rounded"
                            />
                          )}
                        </div>
                        <p className="text-center font-bold text-purple-400 mt-3 text-sm">{achievement.name}</p>
                        
                        {/* Hover tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-40 p-3 rounded-lg bg-slate-800 border border-purple-500/30 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                          <p className="text-xs text-gray-300 text-center">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}

          {/* Other Achievements Section */}
          <div>
            <h2 className="text-3xl font-bold text-purple-400 mb-8 flex items-center gap-2">
              <span className="text-2xl">✨</span> Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements
                .filter(a => a.category !== 'rank')
                .length > 0 ? (
                achievements
                  .filter(a => a.category !== 'rank')
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-lg p-6 hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
                    >
                      <div className="flex items-start gap-4">
                        {achievement.image ? (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform relative">
                            <img 
                              src={achievement.image} 
                              alt={achievement.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className="text-5xl group-hover:scale-110 transition-transform">{achievement.icon || '🏅'}</div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-purple-400 mb-1">{achievement.name}</h3>
                          <p className="text-gray-300 text-sm mb-3">{achievement.description}</p>
                          {achievement.category && (
                            <div className="inline-block">
                              <span className="bg-purple-500/30 text-purple-300 text-xs px-3 py-1 rounded-full">
                                {achievement.category}
                              </span>
                            </div>
                          )}
                          {achievement.unlockedAt && (
                            <p className="text-purple-300 text-xs mt-3">
                              ✓ Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">No achievements unlocked yet. Complete quizzes to earn achievements!</p>
                </div>
              )}
            </div>
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

export default Achievements;
