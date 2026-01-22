import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function LearningAnalytics({ userId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          
          // Get exercise data from the correct progress path
          const exerciseProgressRef = ref(db, `users/${userId}/progress/exercises`);
          const exerciseSnapshot = await get(exerciseProgressRef);
          const exercises = exerciseSnapshot.exists() ? exerciseSnapshot.val() : {};
          
          // Get lesson data from the correct progress path
          const lessonProgressRef = ref(db, `users/${userId}/progress/lessons`);
          const lessonSnapshot = await get(lessonProgressRef);
          const lessons = lessonSnapshot.exists() ? lessonSnapshot.val() : {};
          
          let completedExercises = 0;
          let totalExercises = 0;
          let languageStats = {};
          
          // Process exercise data
          Object.entries(exercises).forEach(([language, levels]) => {
            if (typeof levels === 'object') {
              Object.entries(levels).forEach(([level, exercise]) => {
                if (typeof exercise === 'object') {
                  totalExercises++;
                  if (exercise.isCompleted) {
                    completedExercises++;
                  }
                  
                  // Track by language
                  if (!languageStats[language]) {
                    languageStats[language] = { completed: 0, total: 0 };
                  }
                  languageStats[language].total++;
                  if (exercise.isCompleted) {
                    languageStats[language].completed++;
                  }
                }
              });
            }
          });
          
          // Process lesson data
          let completedLessons = 0;
          let totalLessons = 0;
          Object.values(lessons).forEach((lessonCategory) => {
            if (typeof lessonCategory === 'object') {
              Object.values(lessonCategory).forEach((lesson) => {
                if (typeof lesson === 'object') {
                  totalLessons++;
                  if (lesson.isCompleted || lesson.completed) {
                    completedLessons++;
                  }
                }
              });
            }
          });
          
          setStats({
            completedExercises,
            totalExercises: totalExercises || 1,
            completedLessons,
            totalLessons: totalLessons || 1,
            languages: Object.entries(languageStats).map(([name, data]) => ({
              name: name.charAt(0).toUpperCase() + name.slice(1),
              completed: data.completed,
              total: data.total,
              percentage: Math.round((data.completed / data.total) * 100)
            })),
            exerciseCompletionRate: Math.round((completedExercises / (totalExercises || 1)) * 100) || 0,
            lessonCompletionRate: Math.round((completedLessons / (totalLessons || 1)) * 100) || 0,
            totalPoints: userData.totalPoints || 0,
            currentRank: userData.currentRank || 1
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching learning analytics:', error);
        setLoading(false);
      }
    };

    if (userId) {
      fetchAnalytics();
    }
  }, [userId]);

  // Listen for progress updates
  useEffect(() => {
    const handler = () => {
      if (userId) {
        // Refresh analytics when progress is updated
        const fetchAnalytics = async () => {
          try {
            const userRef = ref(db, `users/${userId}`);
            const snapshot = await get(userRef);
            
            if (snapshot.exists()) {
              const userData = snapshot.val();
              
              // Get exercise data from the correct progress path
              const exerciseProgressRef = ref(db, `users/${userId}/progress/exercises`);
              const exerciseSnapshot = await get(exerciseProgressRef);
              const exercises = exerciseSnapshot.exists() ? exerciseSnapshot.val() : {};
              
              // Get lesson data from the correct progress path
              const lessonProgressRef = ref(db, `users/${userId}/progress/lessons`);
              const lessonSnapshot = await get(lessonProgressRef);
              const lessons = lessonSnapshot.exists() ? lessonSnapshot.val() : {};
              
              let completedExercises = 0;
              let totalExercises = 0;
              let languageStats = {};
              
              // Process exercise data
              Object.entries(exercises).forEach(([language, levels]) => {
                if (typeof levels === 'object') {
                  Object.entries(levels).forEach(([level, exercise]) => {
                    if (typeof exercise === 'object') {
                      totalExercises++;
                      if (exercise.isCompleted) {
                        completedExercises++;
                      }
                      
                      // Track by language
                      if (!languageStats[language]) {
                        languageStats[language] = { completed: 0, total: 0 };
                      }
                      languageStats[language].total++;
                      if (exercise.isCompleted) {
                        languageStats[language].completed++;
                      }
                    }
                  });
                }
              });
              
              // Process lesson data
              let completedLessons = 0;
              let totalLessons = 0;
              Object.values(lessons).forEach((lessonCategory) => {
                if (typeof lessonCategory === 'object') {
                  Object.values(lessonCategory).forEach((lesson) => {
                    if (typeof lesson === 'object') {
                      totalLessons++;
                      if (lesson.isCompleted || lesson.completed) {
                        completedLessons++;
                      }
                    }
                  });
                }
              });
              
              setStats({
                completedExercises,
                totalExercises: totalExercises || 1,
                completedLessons,
                totalLessons: totalLessons || 1,
                languages: Object.entries(languageStats).map(([name, data]) => ({
                  name: name.charAt(0).toUpperCase() + name.slice(1),
                  completed: data.completed,
                  total: data.total,
                  percentage: Math.round((data.completed / data.total) * 100)
                })),
                exerciseCompletionRate: Math.round((completedExercises / (totalExercises || 1)) * 100) || 0,
                lessonCompletionRate: Math.round((completedLessons / (totalLessons || 1)) * 100) || 0,
                totalPoints: userData.totalPoints || 0,
                currentRank: userData.currentRank || 1
              });
            }
          } catch (error) {
            console.error('Error updating learning analytics:', error);
          }
        };
        fetchAnalytics();
      }
    };

    window.addEventListener('progress-updated', handler);
    return () => window.removeEventListener('progress-updated', handler);
  }, [userId]);

  if (loading) {
    return <div className="text-center text-gray-400">Loading analytics...</div>;
  }

  if (!stats) {
    return <div className="text-center text-gray-400">No analytics data available</div>;
  }

  return (
    <div className="space-y-6">
      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Exercises Completed</p>
          <p className="text-3xl font-bold text-emerald-400">{stats.completedExercises}/{stats.totalExercises}</p>
          <p className="text-gray-500 text-xs mt-2">{stats.exerciseCompletionRate}% complete</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Lessons Completed</p>
          <p className="text-3xl font-bold text-blue-400">{stats.completedLessons}/{stats.totalLessons}</p>
          <p className="text-gray-500 text-xs mt-2">{stats.lessonCompletionRate}% complete</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Total Points</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.totalPoints}</p>
          <p className="text-gray-500 text-xs mt-2">points earned</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Current Rank</p>
          <p className="text-3xl font-bold text-purple-400">#{stats.currentRank}</p>
          <p className="text-gray-500 text-xs mt-2">global rank</p>
        </div>
      </div>

      {/* Language Progress */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Progress by Language</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.languages}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
            <Legend />
            <Bar dataKey="completed" fill="#10b981" name="Completed" />
            <Bar dataKey="total" fill="#475569" name="Total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Completion Rate Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Exercise Completion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Completed', value: stats.completedExercises },
                  { name: 'Pending', value: stats.totalExercises - stats.completedExercises }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#10b981" />
                <Cell fill="#475569" />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Lesson Completion</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Completed', value: stats.completedLessons },
                  { name: 'Pending', value: stats.totalLessons - stats.completedLessons }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#3b82f6" />
                <Cell fill="#475569" />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Language Breakdown Table */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Language Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-gray-400 font-semibold">Language</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">Completed</th>
                <th className="text-center py-3 px-4 text-gray-400 font-semibold">Total</th>
                <th className="text-right py-3 px-4 text-gray-400 font-semibold">Progress</th>
              </tr>
            </thead>
            <tbody>
              {stats.languages.map((lang, idx) => (
                <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                  <td className="py-3 px-4 text-white font-medium">{lang.name}</td>
                  <td className="py-3 px-4 text-center text-emerald-400">{lang.completed}</td>
                  <td className="py-3 px-4 text-center text-gray-400">{lang.total}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                      <span className="text-emerald-400 font-semibold text-sm w-12 text-right">{lang.percentage}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
