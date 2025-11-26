import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
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
      
      const unsubscribe = onValue(usersRef, (snapshot) => {
        if (snapshot.exists()) {
          const allUsers = snapshot.val();
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

          // Sort by score descending
          quizData.sort((a, b) => b.score - a.score);

          setQuizLeaderboard(quizData);
        } else {
          // No data yet, show empty leaderboards
          setQuizLeaderboard([]);
        }
      });

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
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
               Leaderboard
            </h1>
            <p className="text-gray-300 text-lg">
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
            <div className="mb-8 bg-white rounded-lg p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-gray-600 text-sm mb-2">Your Rank</p>
                  <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-emerald-600">
                      #{userRank}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">{currentUser?.displayName || 'You'}</p>
                      <p className="text-gray-600 text-sm">
                        {userStats.score} Points • {userStats.completed_count} Quizzes
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-5xl">
                  {userRank === 1 ? '🥇' : userRank === 2 ? '🥈' : userRank === 3 ? '🥉' : '🎖️'}
                </div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <table className="w-full">
            <thead>
              <tr className="bg-emerald-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Rank</th>
                <th className="px-6 py-4 text-left text-gray-700 font-semibold">Player</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Score</th>
                <th className="px-6 py-4 text-center text-gray-700 font-semibold">Quizzes</th>
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
                    <td className="px-6 py-4">
                      <span className="text-xl font-bold">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center font-bold text-white">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center font-bold text-lg text-emerald-600">
                      {user.score}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-700 font-medium">
                      {user.completed_count}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="text-5xl mb-4">📊</div>
                    <p>No leaderboard data available yet</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

          {/* Stats Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <h3 className="text-lg font-semibold text-emerald-600 mb-3">📊 How Rankings Work</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Quiz Rankings: Based on total quiz scores earned</li>
                <li>✓ Exercise Rankings: Based on exercises completed</li>
                <li>✓ Rankings update in real-time</li>
                <li>✓ Compete fairly with other learners</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md">
              <h3 className="text-lg font-semibold text-emerald-600 mb-3">🎯 Tips to Climb</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Complete more quizzes and exercises</li>
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
