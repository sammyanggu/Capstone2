import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { ref, get } from 'firebase/database';
import { saveHubSummary } from '../../utils/progressTracker';
import { calculateUserRank } from '../../utils/rankCalculator';
import { useTheme } from '../../ThemeContext';

function GamesHub() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCrosswordDifficultyModal, setShowCrosswordDifficultyModal] = useState(false);
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalScore: 0,
    rank: 0,
    achievements: 0
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch user stats
        try {
          const userRef = ref(db, `users/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Calculate rank based on current quiz scores
            const userRank = await calculateUserRank(user.uid);
            
            const newStats = {
              totalQuizzes: data.quizzesCompleted || 0,
              totalScore: data.quizScore || 0,
              rank: userRank,
              achievements: data.achievements || 0
            };

            setStats(newStats);

            // persist hub summary for quick reads
            try {
              await saveHubSummary(user.uid, newStats);
            } catch (e) {
              console.warn('Could not save hub summary', e);
            }
          }
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      }
      setLoading(false);
    });

    // listen for progress updates to refresh stats
    const onProgressUpdated = async (e) => {
      try {
        const u = auth.currentUser;
        if (!u) return;
        const userRef = ref(db, `users/${u.uid}`);
        const snapshot = await get(userRef);
        if (!snapshot.exists()) return;
        const data = snapshot.val();
        
        // Calculate rank based on current quiz scores
        const userRank = await calculateUserRank(u.uid);
        
        const newStats = {
          totalQuizzes: data.quizzesCompleted || 0,
          totalScore: data.quizScore || 0,
          rank: userRank,
          achievements: data.achievements || 0
        };
        setStats(newStats);
        await saveHubSummary(u.uid, newStats);
      } catch (err) {
        console.error('Error refreshing games stats after progress update', err);
      }
    };

    window.addEventListener('progress-updated', onProgressUpdated);

    return () => {
      unsubscribe();
      window.removeEventListener('progress-updated', onProgressUpdated);
    };
  }, []);

  if (loading) {
    return (
      <div className={`relative w-full min-h-screen overflow-hidden ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} flex items-center justify-center`}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>
        <div className={`relative z-10 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} text-center`}>
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-lg">Loading Games Hub...</p>
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

  return (
    <div className={`relative w-full min-h-screen overflow-hidden bg-slate-900 text-white`}>
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
      <div className="relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              🎮 Games Hub
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} text-xs sm:text-sm md:text-base lg:text-lg font-semibold px-2`}>
              Test your skills, compete with others, and climb the leaderboard!
            </p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 md:mb-12">
            <div className={`rounded-lg p-3 sm:p-4 md:p-6 border backdrop-blur ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30' : 'bg-purple-100 border-purple-300'}`}>
              <div className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>📝 Quizzes Taken</div>
              <div className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-purple-900'}`}>{stats.totalQuizzes}</div>
            </div>
            <div className={`rounded-lg p-3 sm:p-4 md:p-6 border backdrop-blur ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-500/30' : 'bg-purple-100 border-purple-300'}`}>
              <div className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`}>📝 Quizzes Taken</div>
              <div className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-purple-900'}`}>{stats.totalQuizzes}</div>
            </div>
            <div className={`rounded-lg p-3 sm:p-4 md:p-6 border backdrop-blur ${theme === 'dark' ? 'bg-gradient-to-br from-pink-900/50 to-pink-800/30 border-pink-500/30' : 'bg-pink-100 border-pink-300'}`}>
              <div className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === 'dark' ? 'text-pink-400' : 'text-pink-700'}`}>⭐ Total Score</div>
              <div className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-pink-900'}`}>{stats.totalScore}</div>
            </div>
            <div className={`rounded-lg p-3 sm:p-4 md:p-6 border backdrop-blur ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-500/30' : 'bg-blue-100 border-blue-300'}`}>
              <div className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>🏆 Your Rank</div>
              <div className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>#{stats.rank || '-'}</div>
            </div>
            <div className={`rounded-lg p-3 sm:p-4 md:p-6 border backdrop-blur ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-500/30' : 'bg-orange-100 border-orange-300'}`}>
              <div className={`text-xs sm:text-sm font-semibold mb-1 sm:mb-2 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-700'}`}>🎖️ Achievements</div>
              <div className={`text-2xl sm:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-orange-900'}`}>{stats.achievements}</div>
            </div>
          </div>

          {/* Main Game Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {/* 4 Pics 1 Word Card */}
            <div
              onClick={() => navigate('/games/fourpicsoneword')}
              className={`group cursor-pointer ${theme === 'dark' ? 'bg-gradient-to-br from-purple-900/40 to-slate-900 border border-purple-500/30 hover:border-purple-500 hover:from-purple-900/60' : 'bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-300 hover:border-purple-500 hover:from-purple-200'} rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-purple-900'}`}>�️ 4 Pics 1 Word</h2>
                <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">�️</div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-purple-800'} mb-4 sm:mb-6 text-sm sm:text-base`}>
                Guess the word that connects all 4 images!
              </p>
              <div className="flex items-center justify-between">
                <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white' : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white'} font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1`}>
                  Play →
                </button>
              </div>
            </div>

            {/* Beginner Crossword Card */}
            <div
              onClick={() => setShowCrosswordDifficultyModal(true)}
              className={`group cursor-pointer ${theme === 'dark' ? 'bg-gradient-to-br from-cyan-900/40 to-slate-900 border border-cyan-500/30 hover:border-cyan-500 hover:from-cyan-900/60' : 'bg-gradient-to-br from-cyan-100 to-cyan-50 border border-cyan-300 hover:border-cyan-500 hover:from-cyan-200'} rounded-xl p-4 sm:p-6 md:p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className={`text-xl sm:text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-cyan-900'}`}>🧩 Crossword</h2>
                <div className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">✏️</div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-cyan-800'} mb-4 sm:mb-6 text-sm sm:text-base`}>
                Solve coding crossword puzzles!
              </p>
              <div className="flex items-center justify-between">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCrosswordDifficultyModal(true);
                  }}
                  className={`px-4 py-2 ${theme === 'dark' ? 'bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white' : 'bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white'} font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1`}>
                  Play →
                </button>
              </div>
            </div>

            {/* Leaderboard Card */}
            <div
              onClick={() => navigate('/games/leaderboard')}
              className={`group cursor-pointer ${theme === 'dark' ? 'bg-gradient-to-br from-pink-900/40 to-slate-900 border border-pink-500/30 hover:border-pink-500 hover:from-pink-900/60' : 'bg-gradient-to-br from-pink-100 to-pink-50 border border-pink-300 hover:border-pink-500 hover:from-pink-200'} rounded-xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-pink-900'}`}>🏆 Leaderboard</h2>
                <div className="text-4xl group-hover:scale-110 transition-transform">🥇</div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-pink-800'} mb-6 text-base`}>
                Compete globally and climb the ranks.
              </p>
              <div className="flex items-center justify-between">
                <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white' : 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white'} font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1`}>
                  View →
                </button>
              </div>
            </div>

            {/* Achievements Card */}
            <div
              onClick={() => navigate('/games/achievements')}
              className={`group cursor-pointer ${theme === 'dark' ? 'bg-gradient-to-br from-blue-900/40 to-slate-900 border border-blue-500/30 hover:border-blue-500 hover:from-blue-900/60' : 'bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-300 hover:border-blue-500 hover:from-blue-200'} rounded-xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>◆ Achievements</h2>
                <div className="text-4xl group-hover:scale-110 transition-transform">⭐</div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-blue-800'} mb-6 text-base`}>
                Unlock special achievements by completing challenges.
              </p>
              <div className="flex items-center justify-between">
                <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'} font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1`}>
                  View →
                </button>
              </div>
            </div>

            {/* Badges Card */}
            <div
              onClick={() => navigate('/games/badges')}
              className={`group cursor-pointer ${theme === 'dark' ? 'bg-gradient-to-br from-orange-900/40 to-slate-900 border border-orange-500/30 hover:border-orange-500 hover:from-orange-900/60' : 'bg-gradient-to-br from-orange-100 to-orange-50 border border-orange-300 hover:border-orange-500 hover:from-orange-200'} rounded-xl p-8 transition-all duration-300 transform hover:scale-105 shadow-2xl`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-orange-900'}`}>🎖️ Badges</h2>
                <div className="text-4xl group-hover:scale-110 transition-transform">◆️</div>
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-orange-800'} mb-6 text-base`}>
                Collect badges to showcase your skills.
              </p>
              <div className="flex items-center justify-between">
                <button className={`px-4 py-2 ${theme === 'dark' ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white' : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white'} font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1`}>
                  View →
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className={`${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg p-6 shadow-md`}>
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-3`}>📊 How It Works</h4>
              <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} font-medium`}>
                <li>✓ Take quizzes to test your knowledge</li>
                <li>✓ Earn points for correct answers</li>
                <li>✓ Compete with other learners</li>
                <li>✓ Unlock achievements & badges</li>
              </ul>
            </div>

            <div className={`${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg p-6 shadow-md`}>
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-3`}>🎯 Get Started</h4>
              <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} font-medium`}>
                <li>✓ Choose a difficulty level</li>
                <li>✓ Answer all questions</li>
                <li>✓ Get instant feedback</li>
                <li>✓ View your score & rank</li>
              </ul>
            </div>

            <div className={`${theme === 'dark' ? 'bg-slate-800 text-white' : 'bg-white'} rounded-lg p-6 shadow-md`}>
              <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-3`}>🏆 Tips to Win</h4>
              <ul className={`space-y-2 text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-800'} font-medium`}>
                <li>✓ Aim for perfect scores</li>
                <li>✓ Take different quizzes</li>
                <li>✓ Practice regularly</li>
                <li>✓ Learn from mistakes</li>
              </ul>
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => navigate('/')}
              className={`px-8 py-3 ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-900'} font-semibold rounded-lg transition-all`}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Crossword Difficulty Modal */}
      {showCrosswordDifficultyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className={`${theme === 'dark' ? 'bg-slate-800 border-2 border-cyan-500/50' : 'bg-white border-2 border-cyan-400'} rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all`}>
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>🧩 Crossword Puzzle</h2>
              <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Choose a difficulty level:</p>
            </div>

            <div className="space-y-4">
              {/* Hard Difficulty */}
              <button
                onClick={() => {
                  navigate('/games/crossword/hard');
                  setShowCrosswordDifficultyModal(false);
                }}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white'
                }`}
              >
                🔥 Hard
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-red-100' : 'text-red-100'}`}>Challenging puzzles for advanced learners</p>
              </button>

              {/* Easy Difficulty */}
              <button
                onClick={() => {
                  navigate('/games/crossword/easy');
                  setShowCrosswordDifficultyModal(false);
                }}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all transform hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white'
                }`}
              >
                ✨ Easy
                <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-emerald-100' : 'text-emerald-100'}`}>Perfect for beginners and practice</p>
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowCrosswordDifficultyModal(false)}
              className={`w-full mt-6 py-2 px-4 rounded-lg font-semibold transition-all ${
                theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes floatGlow {
          from { transform: translate(-200px, -150px); }
          to   { transform: translate(200px, 150px); }
        }
      `}</style>
    </div>
  );
}

export default GamesHub;
