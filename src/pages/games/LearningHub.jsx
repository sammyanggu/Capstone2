import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { ref, get } from 'firebase/database';
import { getUserExerciseProgress, getUserLessonProgress, saveHubSummary } from '../../utils/progressTracker';
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

          // lessonProgress is structured by category -> lessons; flatten counts
          const lessonsCompleted = Object.values(lessonProgress || {}).reduce((acc, category) => {
            if (!category) return acc;
            return acc + Object.values(category).filter(l => l && (l.isCompleted || l.completed)).length;
          }, 0);

          const totalLessonEntries = Object.values(lessonProgress || {}).reduce((acc, category) => {
            if (!category) return acc;
            return acc + Object.values(category).length;
          }, 0);

          // exerciseProgress is structured by type -> levels -> entries; flatten counts
          const exercisesCompleted = Object.values(exerciseProgress || {}).reduce((acc, type) => {
            if (!type) return acc;
            return acc + Object.values(type).reduce((innerAcc, levelObj) => {
              if (!levelObj) return innerAcc;
              return innerAcc + Object.values(levelObj).filter(e => e && (e.isCompleted || e.completed)).length;
            }, 0);
          }, 0);

          const totalExerciseEntries = Object.values(exerciseProgress || {}).reduce((acc, type) => {
            if (!type) return acc;
            return acc + Object.values(type).reduce((innerAcc, levelObj) => {
              return innerAcc + (levelObj ? Object.values(levelObj).length : 0);
            }, 0);
          }, 0);

          const totalProgress = Math.round(((lessonsCompleted + exercisesCompleted) / 20) * 100);
          const hoursLearned = Math.floor((totalLessonEntries * 1.5) + (totalExerciseEntries * 0.5));

          const newStats = {
            lessonsCompleted,
            exercisesCompleted,
            totalProgress,
            hoursLearned
          };

          setStats(newStats);

          // persist a hub summary for quick reads
          try {
            await saveHubSummary(user.uid, newStats);
          } catch (e) {
            console.warn('Could not save hub summary', e);
          }
        } catch (error) {
          console.error('Error fetching progress:', error);
        }
      }
      setLoading(false);
    });

    // Listen for progress updates dispatched by progressTracker so the hub refreshes automatically
    const onProgressUpdated = async (e) => {
      try {
        const u = auth.currentUser;
        if (!u) return;
        const lessonProgress = await getUserLessonProgress(u.uid);
        const exerciseProgress = await getUserExerciseProgress(u.uid);

        const lessonsCompleted = Object.values(lessonProgress || {}).reduce((acc, category) => {
          if (!category) return acc;
          return acc + Object.values(category).filter(l => l && (l.isCompleted || l.completed)).length;
        }, 0);

        const totalLessonEntries = Object.values(lessonProgress || {}).reduce((acc, category) => {
          if (!category) return acc;
          return acc + Object.values(category).length;
        }, 0);

        const exercisesCompleted = Object.values(exerciseProgress || {}).reduce((acc, type) => {
          if (!type) return acc;
          return acc + Object.values(type).reduce((innerAcc, levelObj) => {
            if (!levelObj) return innerAcc;
            return innerAcc + Object.values(levelObj).filter(e => e && (e.isCompleted || e.completed)).length;
          }, 0);
        }, 0);

        const totalExerciseEntries = Object.values(exerciseProgress || {}).reduce((acc, type) => {
          if (!type) return acc;
          return acc + Object.values(type).reduce((innerAcc, levelObj) => {
            return innerAcc + (levelObj ? Object.values(levelObj).length : 0);
          }, 0);
        }, 0);

        const totalProgress = Math.round(((lessonsCompleted + exercisesCompleted) / 20) * 100);
        const hoursLearned = Math.floor((totalLessonEntries * 1.5) + (totalExerciseEntries * 0.5));

        const newStats = { lessonsCompleted, exercisesCompleted, totalProgress, hoursLearned };
        setStats(newStats);
        await saveHubSummary(u.uid, newStats);
      } catch (err) {
        console.error('Error refreshing stats after progress update', err);
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
    <div className={`w-full min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-gray-50 text-slate-900'}`}>
      {/* Content */}
      <div className="w-full pt-28 pb-12 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="text-4xl font-bold mb-2 text-emerald-400">
              📚 Learning Hub
            </h1>
            <p className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Master web development through structured lessons, tutorials, and hands-on exercises.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
            {/* Lessons Card */}
            <div
              onClick={() => navigate('/lessons')}
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md ${
                theme === 'dark'
                  ? 'bg-slate-800 border-emerald-500/20 hover:border-emerald-500'
                  : 'bg-white border-gray-200 hover:border-emerald-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">🎓 Lessons</h2>
                <div className="text-3xl">📖</div>
              </div>
              <p className={`text-sm mb-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Structured learning paths from basics to advanced concepts with explanations and examples.
              </p>
              <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded transition-colors text-sm">
                Learn →
              </button>
            </div>

            {/* Exercises Card */}
            <div
              onClick={() => navigate('/exercises')}
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md ${
                theme === 'dark'
                  ? 'bg-slate-800 border-green-500/20 hover:border-green-500'
                  : 'bg-white border-gray-200 hover:border-green-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">💪 Exercises</h2>
                <div className="text-3xl">⚡</div>
              </div>
              <p className={`text-sm mb-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Practice real coding exercises with HTML, CSS, JavaScript and more. Get instant feedback.
              </p>
              <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition-colors text-sm">
                Practice →
              </button>
            </div>

            {/* Documentation Card */}
            <div
              onClick={() => navigate('/docs')}
              className={`p-6 rounded-lg border cursor-pointer transition-all duration-300 hover:shadow-md ${
                theme === 'dark'
                  ? 'bg-slate-800 border-blue-500/20 hover:border-blue-500'
                  : 'bg-white border-gray-200 hover:border-blue-500'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">📚 Docs</h2>
                <div className="text-3xl">📖</div>
              </div>
              <p className={`text-sm mb-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Reference documentation for HTML, CSS, JavaScript, PHP, Bootstrap, and Tailwind CSS.
              </p>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors text-sm">
                Explore →
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className={`px-6 py-2 rounded font-semibold transition-colors text-sm ${
                theme === 'dark'
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-gray-300 hover:bg-gray-400 text-slate-900'
              }`}
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningHub;