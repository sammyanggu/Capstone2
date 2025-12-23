import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { ref, get } from 'firebase/database';
import { getUserExerciseProgress, getUserLessonProgress } from '../../utils/progressTracker';
import { useTheme } from '../../ThemeContext';

function LearningHub() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    lessonsCompleted: 0,
    exercisesCompleted: 0,
    totalProgress: 0,
    hoursLearned: 0
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const lessonProgress = await getUserLessonProgress(user.uid);
          const exerciseProgress = await getUserExerciseProgress(user.uid);
          
          setStats({
            lessonsCompleted: Object.values(lessonProgress || {}).filter(l => l.completed).length,
            exercisesCompleted: Object.values(exerciseProgress || {}).filter(e => e.completed).length,
            totalProgress: Math.round(((Object.values(lessonProgress || {}).filter(l => l.completed).length + Object.values(exerciseProgress || {}).filter(e => e.completed).length) / 20) * 100),
            hoursLearned: Math.floor((Object.values(lessonProgress || {}).length * 1.5) + (Object.values(exerciseProgress || {}).length * 0.5))
          });
        } catch (error) {
          console.error('Error fetching progress:', error);
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
          <p className="mt-4 text-lg">Loading Learning Hub...</p>
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
        <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
          left: '-100px',
          top: '-100px',
          animation: 'floatGlow 12s infinite alternate ease-in-out'
        }}></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{
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
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
              📚 Learning Hub
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Master web development through structured lessons, tutorials, and hands-on exercises.
            </p>
          </div>

          {/* Learning Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/30 rounded-lg p-6 border border-emerald-500/30 backdrop-blur">
              <div className="text-emerald-400 text-sm font-semibold mb-2">📖 Lessons</div>
              <div className="text-3xl font-bold text-white">{stats.lessonsCompleted}</div>
            </div>
            <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-lg p-6 border border-green-500/30 backdrop-blur">
              <div className="text-green-400 text-sm font-semibold mb-2">💪 Exercises</div>
              <div className="text-3xl font-bold text-white">{stats.exercisesCompleted}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-6 border border-blue-500/30 backdrop-blur">
              <div className="text-blue-400 text-sm font-semibold mb-2">⏱️ Hours</div>
              <div className="text-3xl font-bold text-white">{stats.hoursLearned}</div>
            </div>
            <div className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/30 rounded-lg p-6 border border-cyan-500/30 backdrop-blur">
              <div className="text-cyan-400 text-sm font-semibold mb-2">📊 Progress</div>
              <div className="text-3xl font-bold text-white">{stats.totalProgress}%</div>
            </div>
          </div>

          {/* Main Learning Resources */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Lessons Card */}
            <div
              onClick={() => navigate('/lessons')}
              className="group cursor-pointer bg-gradient-to-br from-emerald-900/40 to-slate-900 rounded-xl p-8 border border-emerald-500/30 hover:border-emerald-500 hover:from-emerald-900/60 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">🎓 Lessons</h2>
                <div className="text-5xl group-hover:scale-110 transition-transform">📖</div>
              </div>
              <p className="text-gray-300 mb-6">
                Structured learning paths that guide you from basics to advanced concepts. Each lesson includes explanations and examples.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-emerald-400 font-semibold">
                  • {stats.lessonsCompleted} completed
                </div>
                <button className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all transform hover:translate-x-1">
                  Learn →
                </button>
              </div>
            </div>

            {/* Exercises Card */}
            <div
              onClick={() => navigate('/exercises')}
              className="group cursor-pointer bg-gradient-to-br from-green-900/40 to-slate-900 rounded-xl p-8 border border-green-500/30 hover:border-green-500 hover:from-green-900/60 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">💪 Exercises</h2>
                <div className="text-5xl group-hover:scale-110 transition-transform">⚡</div>
              </div>
              <p className="text-gray-300 mb-6">
                Practice with real coding exercises. Test your skills with HTML, CSS, JavaScript, and more. Get instant feedback.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-green-400 font-semibold">
                  • {stats.exercisesCompleted} completed
                </div>
                <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all transform hover:translate-x-1">
                  Practice →
                </button>
              </div>
            </div>

            {/* Documentation Card */}
            <div
              onClick={() => navigate('/docs')}
              className="group cursor-pointer bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-xl p-8 border border-blue-500/30 hover:border-blue-500 hover:from-blue-900/60 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">📚 Docs</h2>
                <div className="text-5xl group-hover:scale-110 transition-transform">📖</div>
              </div>
              <p className="text-gray-300 mb-6">
                Reference documentation for HTML, CSS, JavaScript, PHP, Bootstrap, and Tailwind CSS. Quick lookup for syntax and best practices.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-blue-400 font-semibold">
                  • 6 technologies
                </div>
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all transform hover:translate-x-1">
                  Explore →
                </button>
              </div>
            </div>
          </div>

          {/* Learning Paths */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700/50 backdrop-blur mb-12">
            <h3 className="text-2xl font-bold text-white mb-6">🎯 Learning Paths</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>🌍</span> Web Basics
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Learn HTML, CSS, and JavaScript fundamentals. Perfect for beginners.
                </p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">0% Complete</p>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-700/50">
                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <span>🎨</span> Frontend Mastery
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  Master CSS, Bootstrap, and Tailwind CSS for beautiful websites.
                </p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-full rounded-full" style={{ width: '0%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">0% Complete</p>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">📚 Learning Strategies</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Start with the basics</li>
                <li>✓ Code along with tutorials</li>
                <li>✓ Complete all exercises</li>
                <li>✓ Build your own projects</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">🎯 How to Get Started</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Choose a learning path</li>
                <li>✓ Watch video lessons</li>
                <li>✓ Read the documentation</li>
                <li>✓ Practice with exercises</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">💡 Pro Tips</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✓ Code every single day</li>
                <li>✓ Don't skip the exercises</li>
                <li>✓ Build projects as you learn</li>
                <li>✓ Join a community</li>
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

export default LearningHub;
