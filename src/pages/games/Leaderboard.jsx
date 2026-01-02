import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import { ref, onValue, query, orderByChild } from 'firebase/database';
import { toast } from 'react-toastify';

const Leaderboard = () => {
  const [quizLeaderboard, setQuizLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        fetchAllLeaderboards();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Realtime Firebase listener
  const fetchAllLeaderboards = () => {
    try {
      // Fetch all users and calculate leaderboards from progress
      const usersRef = ref(db, 'users');
      
      const unsubscribe = onValue(
        usersRef,
        (snapshot) => {
          console.log('📊 Leaderboard snapshot exists:', snapshot.exists());
          
          if (snapshot.exists()) {
            const allUsers = snapshot.val();
            console.log('👥 Total users in database:', Object.keys(allUsers).length);
            
            const quizData = [];

            Object.entries(allUsers).forEach(([userId, userData]) => {
              const userInfo = {
                uid: userId,
                name: userData.displayName || 'Anonymous',
                email: userData.email || '',
                quizScore: userData.quizScore || 0,
                quizzesCompleted: userData.quizzesCompleted || 0,
                lastUpdated: userData.updatedAt || Date.now()
              };

              // Build quiz leaderboard (sorted by quiz score)
              if (userInfo.quizScore > 0 || userInfo.email) {
                quizData.push({
                  ...userInfo,
                  score: userInfo.quizScore,
                  completed_count: userInfo.quizzesCompleted
                });
              }
            });

            console.log('🏆 Quiz leaderboard entries:', quizData.length);
            
            // Sort by score descending
            quizData.sort((a, b) => b.score - a.score);
            
            console.log('📈 Top 3 users:', quizData.slice(0, 3));

            setQuizLeaderboard(quizData);
          } else {
            // No data yet, show empty leaderboards
            console.warn('⚠️ No leaderboard data available yet');
            setQuizLeaderboard([]);
          }
        },
        (error) => {
          console.error('❌ Error loading leaderboard:', error);
          console.error('Error code:', error.code);
          console.error('Error message:', error.message);
          toast.error('Failed to load leaderboard: ' + error.message);
          setQuizLeaderboard([]);
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error('Error setting up leaderboard listener:', error);
      toast.error('Failed to load leaderboard');
    }
  };

  // Remove the interval-based polling
  useEffect(() => {
    const unsubscribe = fetchAllLeaderboards();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const currentLeaderboard = quizLeaderboard;

  const getUserRank = () => {
    if (!currentUser) return null;
    const index = currentLeaderboard.findIndex(u => u.email === currentUser.email);
    return index !== -1 ? index + 1 : null;
  };

  const getUserStats = () => {
    if (!currentUser) return null;
    return currentLeaderboard.find(u => u.email === currentUser.email);
  };

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
        {/* Soft gradient glow effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>
        <div className="relative z-10 text-white text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg">Loading leaderboard...</p>
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

  const userRank = getUserRank();
  const userStats = getUserStats();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
      {/* Soft gradient glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
          left: '-100px',
          top: '-100px',
          animation: 'floatGlow 12s infinite alternate ease-in-out'
        }}></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 text-white">
               Leaderboard
            </h1>
            <p className="text-gray-300 text-sm sm:text-base md:text-lg px-2">
              Compete with learners around the world
            </p>
          </div>

          {/* Tab Navigation - Removed, showing only Quiz */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-emerald-400 text-center">
              🏆 Quiz Rankings
            </h2>
          </div>

          {/* Current User Stats */}
          {userRank && userStats && (
            <div className="mb-8 bg-white rounded-lg p-4 md:p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-600 text-xs md:text-sm mb-2">Your Rank</p>
                  <div className="flex items-center gap-2 md:gap-4">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-600">
                      #{userRank}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-base md:text-lg font-semibold text-gray-800 truncate">{currentUser?.displayName || 'You'}</p>
                      <p className="text-xs md:text-sm text-gray-600 truncate">
                        {userStats.score} Points • {userStats.completed_count} Quizzes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-4xl md:text-5xl flex-shrink-0">
                  {userRank === 1 ? '🥇' : userRank === 2 ? '🥈' : userRank === 3 ? '🥉' : '🎖️'}
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table - Responsive */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <div className="hidden md:block overflow-x-auto">
              {/* Desktop View - Table */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-emerald-50 border-b border-gray-200">
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-gray-700 font-semibold text-xs md:text-sm">Rank</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-left text-gray-700 font-semibold text-xs md:text-sm">Player</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center text-gray-700 font-semibold text-xs md:text-sm">Score</th>
                    <th className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center text-gray-700 font-semibold text-xs md:text-sm">Quizzes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentLeaderboard.length > 0 ? (
                    currentLeaderboard.map((user, index) => (
                      <tr 
                        key={index}
                        className={`hover:bg-gray-50 transition-colors ${
                          currentUser?.email === user.email 
                            ? 'bg-emerald-50'
                            : ''
                        }`}
                      >
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
                          <span className="text-lg md:text-xl font-bold">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                          </span>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4">
                          <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white text-xs md:text-sm flex-shrink-0">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-800 truncate text-xs md:text-base">{user.name}</p>
                              <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center font-bold text-emerald-600 text-sm md:text-lg">
                          {user.score}
                        </td>
                        <td className="px-3 sm:px-4 md:px-6 py-3 md:py-4 text-center text-gray-700 font-medium text-sm md:text-base">
                          {user.completed_count}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-3 sm:px-4 md:px-6 py-8 md:py-12 text-center text-gray-500">
                        <div className="text-4xl md:text-5xl mb-2 md:mb-4">📊</div>
                        <p className="text-sm md:text-base">No leaderboard data available yet</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile View - Card List */}
            <div className="md:hidden">
              {currentLeaderboard.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {currentLeaderboard.map((user, index) => (
                    <div 
                      key={index}
                      className={`p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-3 ${
                        currentUser?.email === user.email 
                          ? 'bg-emerald-50'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="text-base sm:text-lg font-bold text-emerald-600 flex-shrink-0 w-6 sm:w-8 text-center">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                        </div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white flex-shrink-0 text-xs sm:text-sm">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-800 text-xs sm:text-sm truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-emerald-600 text-sm sm:text-base">{user.score}</p>
                        <p className="text-xs text-gray-500">{user.completed_count} Q</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <div className="text-5xl mb-4">📊</div>
                  <p>No leaderboard data available yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Stats Info */}
          <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-md">
              <h3 className="text-base md:text-lg font-semibold text-emerald-600 mb-3">📊 How Rankings Work</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700">
                <li>✓ Quiz Rankings: Based on total quiz scores earned</li>
                <li>✓ Rankings update in real-time</li>
                <li>✓ Compete fairly with other learners</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 md:p-6 border border-gray-200 shadow-md">
              <h3 className="text-base md:text-lg font-semibold text-emerald-600 mb-3">🎯 Tips to Climb</h3>
              <ul className="space-y-2 text-xs md:text-sm text-gray-700">
                <li>✓ Aim for perfect scores to earn bonus points</li>
                <li>✓ Try different skill levels for challenges</li>
                <li>✓ Keep learning and practicing consistently</li>
              </ul>
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

export default Leaderboard;
