import React, { useState, useEffect } from 'react';
import { getCompletionStats, getLessonStats } from '../utils/progressTracker';

const ProgressStats = ({ userId }) => {
  const [exerciseStats, setExerciseStats] = useState(null);
  const [lessonStats, setLessonStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const [exercises, lessons] = await Promise.all([
          getCompletionStats(userId),
          getLessonStats(userId)
        ]);
        setExerciseStats(exercises);
        setLessonStats(lessons);
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchStats();
    }

    // Listen for progress updates so we can refresh stats automatically
    const handler = (e) => {
      try {
        const detail = e?.detail || {};
        if (!detail || !detail.userId) {
          // If no userId provided, just refresh
          fetchStats();
          return;
        }
        if (detail.userId === userId) {
          fetchStats();
        }
      } catch (err) {
        console.error('Error handling progress-updated event:', err);
      }
    };

    window.addEventListener('progress-updated', handler);

    return () => {
      window.removeEventListener('progress-updated', handler);
    };
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-slate-400">Loading progress...</div>
      </div>
    );
  }

  const exerciseTypes = ['html', 'css', 'javascript', 'php', 'bootstrap', 'tailwind'];
  const exerciseLabels = {
    html: 'HTML',
    css: 'CSS',
    javascript: 'JavaScript',
    php: 'PHP',
    bootstrap: 'Bootstrap',
    tailwind: 'Tailwind'
  };

  const categoryColors = {
    html: 'from-orange-500 to-orange-600',
    css: 'from-blue-500 to-blue-600',
    javascript: 'from-yellow-500 to-yellow-600',
    php: 'from-purple-500 to-purple-600',
    bootstrap: 'from-indigo-500 to-indigo-600',
    tailwind: 'from-cyan-500 to-cyan-600',
  };

  return (
    <div className="space-y-8">
      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exercises Overview */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Exercise Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Overall Completion</span>
                <span className="text-emerald-400 font-bold">
                  {exerciseStats?.totalCompleted || 0} / {
                    Object.values(exerciseStats?.byType || {}).reduce((sum, t) => sum + t.total, 0) || 0
                  }
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2.5 rounded-full transition-all"
                  style={{
                    width: `${
                      Object.values(exerciseStats?.byType || {}).reduce((sum, t) => sum + t.total, 0) > 0
                        ? (exerciseStats?.totalCompleted || 0) /
                          Object.values(exerciseStats?.byType || {}).reduce((sum, t) => sum + t.total, 0) *
                          100
                        : 0
                    }%`
                  }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              <p>Total Points: <span className="text-emerald-400 font-bold">{exerciseStats?.totalPoints || 0}</span></p>
            </div>
          </div>
        </div>

        {/* Lessons Overview */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Lesson Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300">Average Progress</span>
                <span className="text-emerald-400 font-bold">{lessonStats?.averageProgress || 0}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2.5 rounded-full transition-all"
                  style={{ width: `${lessonStats?.averageProgress || 0}%` }}
                ></div>
              </div>
            </div>
            <div className="text-sm text-slate-400">
              <p>Completed: <span className="text-emerald-400 font-bold">{lessonStats?.completedLessons || 0} / {lessonStats?.totalLessons || 0}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Breakdown */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-emerald-400 mb-4">Exercises by Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exerciseTypes.map((type) => {
            const stats = exerciseStats?.byType?.[type];
            if (!stats || stats.total === 0) return null;

            const percentage = Math.round((stats.completed / stats.total) * 100);

            return (
              <div key={type} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-200">{exerciseLabels[type]}</h4>
                    <p className="text-sm text-slate-400">{stats.completed}/{stats.total} completed</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-emerald-400">{percentage}%</p>
                  </div>
                </div>
                <div className="w-full bg-slate-600 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${categoryColors[type]} h-2 rounded-full transition-all`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lesson Breakdown by Category */}
      {lessonStats?.byCategory && Object.keys(lessonStats.byCategory).length > 0 && (
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Lessons by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(lessonStats.byCategory).map(([category, stats]) => {
              const displayLabel = {
                html: 'HTML',
                css: 'CSS',
                javascript: 'JavaScript',
                php: 'PHP',
                bootstrap: 'Bootstrap',
                tailwind: 'Tailwind'
              }[category] || category;

              return (
                <div key={category} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold text-slate-200">{displayLabel}</h4>
                      <p className="text-sm text-slate-400">{stats.completed}/{stats.total} completed</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-400">{Math.round(stats.averageProgress)}%</p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-600 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${categoryColors[category]} h-2 rounded-full transition-all`}
                      style={{ width: `${stats.averageProgress}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressStats;
