import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { ref, get } from 'firebase/database';
import { useTheme } from '../../ThemeContext';

function GamesHub() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
            setStats({
              totalQuizzes: data.quizzesCompleted || 0,
              totalScore: data.quizScore || 0,
              rank: data.rank || 0,
              achievements: data.achievements || 0
            });
          }
        } catch (error) {
          console.error('Error fetching user stats:', error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
            left: '-100px',
            top: '-100px',
            animation: 'floatGlow 12s infinite alternate ease-in-out'
          }}></div>
        </div>
        <div className="relative z-10 text-white text-center">
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
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900">
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
      <div className="relative z-10 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              🎮 Games Hub
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Test your skills, compete with others, and climb the leaderboard!
            </p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-6 border border-purple-500/30 backdrop-blur">
              <div className="text-purple-400 text-sm font-semibold mb-2">📝 Quizzes Taken</div>
              <div className="text-3xl font-bold text-white">{stats.totalQuizzes}</div>
            </div>
            <div className="bg-gradient-to-br from-pink-900/50 to-pink-800/30 rounded-lg p-6 border border-pink-500/30 backdrop-blur">
              <div className="text-pink-400 text-sm font-semibold mb-2">⭐ Total Score</div>
              <div className="text-3xl font-bold text-white">{stats.totalScore}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-6 border border-blue-500/30 backdrop-blur">
              <div className="text-blue-400 text-sm font-semibold mb-2">🏆 Your Rank</div>
              <div className="text-3xl font-bold text-white">#{stats.rank || '-'}</div>
            </div>
            <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 rounded-lg p-6 border border-orange-500/30 backdrop-blur">
              <div className="text-orange-400 text-sm font-semibold mb-2">🎖️ Achievements</div>
              <div className="text-3xl font-bold text-white">{stats.achievements}</div>
            </div>
          </div>

          {/* Main Game Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Quiz Card */}
            <div
              onClick={() => navigate('/games/quiz')}
              className="group cursor-pointer bg-gradient-to-br from-purple-900/40 to-slate-900 rounded-xl p-8 border border-purple-500/30 hover:border-purple-500 hover:from-purple-900/60 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">📝 Quizzes</h2>
                <div className="text-4xl group-hover:scale-110 transition-transform">📚</div>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Test your knowledge and earn points.
              </p>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1">
                  Play →
                </button>
              </div>
            </div>

            {/* Leaderboard Card */}
            <div
              onClick={() => navigate('/games/leaderboard')}
              className="group cursor-pointer bg-gradient-to-br from-pink-900/40 to-slate-900 rounded-xl p-8 border border-pink-500/30 hover:border-pink-500 hover:from-pink-900/60 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">🏆 Leaderboard</h2>
                <div className="text-4xl group-hover:scale-110 transition-transform">🥇</div>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Compete globally and climb the ranks.
              </p>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1">
                  View →
                </button>
              </div>
            </div>

            {/* Achievements Card */}
            <div
              onClick={() => navigate('/games/achievements')}
              className="group cursor-pointer bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-xl p-8 border border-blue-500/30 hover:border-blue-500 hover:from-blue-900/60 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">� Achievements</h2>
                <div className="text-4xl group-hover:scale-110 transition-transform">⭐</div>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Unlock special achievements by completing challenges.
              </p>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1">
                  View →
                </button>
              </div>
            </div>

            {/* Badges Card */}
            <div
              onClick={() => navigate('/games/badges')}
              className="group cursor-pointer bg-gradient-to-br from-orange-900/40 to-slate-900 rounded-xl p-8 border border-orange-500/30 hover:border-orange-500 hover:from-orange-900/60 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">🎖️ Badges</h2>
                <div className="text-4xl group-hover:scale-110 transition-transform">�️</div>
              </div>
              <p className="text-gray-300 mb-6 text-sm">
                Collect badges to showcase your skills.
              </p>
              <div className="flex items-center justify-between">
                <button className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold text-sm rounded-lg transition-all transform hover:translate-x-1">
                  View →
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">📊 How It Works</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Take quizzes to test your knowledge</li>
                <li>✓ Earn points for correct answers</li>
                <li>✓ Compete with other learners</li>
                <li>✓ Unlock achievements & badges</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🎯 Get Started</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Choose a difficulty level</li>
                <li>✓ Answer all questions</li>
                <li>✓ Get instant feedback</li>
                <li>✓ View your score & rank</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🏆 Tips to Win</h4>
              <ul className="space-y-2 text-sm text-gray-700">
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
              className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition-all"
            >
              ← Back to Home
            </button>
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

export default GamesHub;
