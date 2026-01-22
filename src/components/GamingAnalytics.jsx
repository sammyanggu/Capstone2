import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function GamingAnalytics({ userId }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const userRef = ref(db, `users/${userId}`);
        const snapshot = await get(userRef);
        
        if (snapshot.exists()) {
          const userData = snapshot.val();
          
          // Get quiz data from the correct progress path
          const quizProgressRef = ref(db, `users/${userId}/progress/quizzes`);
          const quizSnapshot = await get(quizProgressRef);
          const quizzes = quizSnapshot.exists() ? quizSnapshot.val() : {};
          
          let totalQuizzes = 0;
          let quizzesCompleted = 0;
          let totalScore = 0;
          let correctAnswers = 0;
          let totalQuestions = 0;
          let difficultyStats = { beginner: 0, intermediate: 0, advanced: 0 };
          
          Object.entries(quizzes).forEach(([key, quiz]) => {
            totalQuizzes++;
            if (quiz.completedAt) {
              quizzesCompleted++;
            }
            
            // Extract difficulty from key
            const difficulty = key.includes('beginner') ? 'beginner' : 
                             key.includes('intermediate') ? 'intermediate' : 'advanced';
            
            if (quiz.completedAt) {
              difficultyStats[difficulty]++;
            }
            
            totalScore += quiz.score || 0;
            correctAnswers += quiz.correctAnswers || 0;
            totalQuestions += quiz.totalQuestions || 0;
          });
          
          const achievements = userData.achievements || {};
          const achievementsCount = Object.keys(achievements).length;
          const badges = userData.badges || {};
          const badgesCount = Object.keys(badges).length;
          
          // Get leaderboard position (if available)
          const leaderboardRef = ref(db, 'leaderboard');
          const leaderboardSnapshot = await get(leaderboardRef);
          let rank = 0;
          
          if (leaderboardSnapshot.exists()) {
            const leaderboardData = leaderboardSnapshot.val();
            const sortedUsers = Object.entries(leaderboardData)
              .sort((a, b) => (b[1].score || 0) - (a[1].score || 0));
            rank = sortedUsers.findIndex(([uid]) => uid === userId) + 1 || 0;
          }
          
          setStats({
            quizzesCompleted,
            totalQuizzes: totalQuizzes || 1,
            totalScore,
            averageScore: quizzesCompleted > 0 ? Math.round(totalScore / quizzesCompleted) : 0,
            correctAnswers,
            totalQuestions: totalQuestions || 1,
            accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
            achievements: achievementsCount,
            badges: badgesCount,
            rank,
            difficultyBreakdown: [
              { name: 'Beginner', completed: difficultyStats.beginner },
              { name: 'Intermediate', completed: difficultyStats.intermediate },
              { name: 'Advanced', completed: difficultyStats.advanced }
            ]
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching gaming analytics:', error);
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
              
              // Get quiz data from the correct progress path
              const quizProgressRef = ref(db, `users/${userId}/progress/quizzes`);
              const quizSnapshot = await get(quizProgressRef);
              const quizzes = quizSnapshot.exists() ? quizSnapshot.val() : {};
              
              let totalQuizzes = 0;
              let quizzesCompleted = 0;
              let totalScore = 0;
              let correctAnswers = 0;
              let totalQuestions = 0;
              let difficultyStats = { beginner: 0, intermediate: 0, advanced: 0 };
              
              Object.entries(quizzes).forEach(([key, quiz]) => {
                totalQuizzes++;
                if (quiz.completedAt) {
                  quizzesCompleted++;
                }
                
                // Extract difficulty from key
                const difficulty = key.includes('beginner') ? 'beginner' : 
                                 key.includes('intermediate') ? 'intermediate' : 'advanced';
                
                if (quiz.completedAt) {
                  difficultyStats[difficulty]++;
                }
                
                totalScore += quiz.score || 0;
                correctAnswers += quiz.correctAnswers || 0;
                totalQuestions += quiz.totalQuestions || 0;
              });
              
              const achievements = userData.achievements || {};
              const achievementsCount = Object.keys(achievements).length;
              const badges = userData.badges || {};
              const badgesCount = Object.keys(badges).length;
              
              // Get leaderboard position (if available)
              const leaderboardRef = ref(db, 'leaderboard');
              const leaderboardSnapshot = await get(leaderboardRef);
              let rank = 0;
              
              if (leaderboardSnapshot.exists()) {
                const leaderboardData = leaderboardSnapshot.val();
                const sortedUsers = Object.entries(leaderboardData)
                  .sort((a, b) => (b[1].score || 0) - (a[1].score || 0));
                rank = sortedUsers.findIndex(([uid]) => uid === userId) + 1 || 0;
              }
              
              setStats({
                quizzesCompleted,
                totalQuizzes: totalQuizzes || 1,
                totalScore,
                averageScore: quizzesCompleted > 0 ? Math.round(totalScore / quizzesCompleted) : 0,
                correctAnswers,
                totalQuestions: totalQuestions || 1,
                accuracy: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0,
                achievements: achievementsCount,
                badges: badgesCount,
                rank,
                difficultyBreakdown: [
                  { name: 'Beginner', completed: difficultyStats.beginner },
                  { name: 'Intermediate', completed: difficultyStats.intermediate },
                  { name: 'Advanced', completed: difficultyStats.advanced }
                ]
              });
            }
          } catch (error) {
            console.error('Error updating gaming analytics:', error);
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
          <p className="text-gray-400 text-sm">Quizzes Completed</p>
          <p className="text-3xl font-bold text-purple-400">{stats.quizzesCompleted}/{stats.totalQuizzes}</p>
          <p className="text-gray-500 text-xs mt-2">{Math.round((stats.quizzesCompleted/stats.totalQuizzes)*100)}% complete</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Average Score</p>
          <p className="text-3xl font-bold text-blue-400">{stats.averageScore}%</p>
          <p className="text-gray-500 text-xs mt-2">from {stats.quizzesCompleted} quizzes</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Accuracy Rate</p>
          <p className="text-3xl font-bold text-emerald-400">{stats.accuracy}%</p>
          <p className="text-gray-500 text-xs mt-2">{stats.correctAnswers}/{stats.totalQuestions} correct</p>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <p className="text-gray-400 text-sm">Achievements</p>
          <p className="text-3xl font-bold text-yellow-400">{stats.achievements}</p>
          <p className="text-gray-500 text-xs mt-2">{stats.badges} badges earned</p>
        </div>
      </div>

      {/* Quiz Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quiz Completion by Difficulty</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.difficultyBreakdown}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
              <Bar dataKey="completed" fill="#a855f7" name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Quiz Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Completed', value: stats.quizzesCompleted },
                  { name: 'Remaining', value: stats.totalQuizzes - stats.quizzesCompleted }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                <Cell fill="#a855f7" />
                <Cell fill="#475569" />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Accuracy Breakdown */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Total Score</p>
            <p className="text-2xl font-bold text-yellow-400">{stats.totalScore}</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Correct Answers</p>
            <p className="text-2xl font-bold text-emerald-400">{stats.correctAnswers}/{stats.totalQuestions}</p>
          </div>
          
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-gray-400 text-sm mb-2">Global Rank</p>
            <p className="text-2xl font-bold text-purple-400">#{stats.rank || 'Unranked'}</p>
          </div>
        </div>

        {/* Accuracy Bar */}
        <div className="mt-6">
          <p className="text-white font-semibold mb-3">Answer Accuracy</p>
          <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${stats.accuracy}%` }}
            />
          </div>
          <p className="text-right text-gray-400 text-sm mt-2">{stats.accuracy}% Accuracy</p>
        </div>
      </div>
    </div>
  );
}
