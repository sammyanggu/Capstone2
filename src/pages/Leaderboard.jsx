import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'exercises'
  const [quizLeaderboard, setQuizLeaderboard] = useState([]);
  const [exercisesLeaderboard, setExercisesLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  // Mock data for fallback
  const mockQuizData = [
    { id: 1, name: 'Alex Chen', email: 'alex@example.com', score: 2850, completed_count: 45 },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', score: 2720, completed_count: 42 },
    { id: 3, name: 'Sam Cleofe', email: 'sam@example.com', score: 2590, completed_count: 38 },
    { id: 4, name: 'John Smith', email: 'john@example.com', score: 2410, completed_count: 35 },
    { id: 5, name: 'Emma Wilson', email: 'emma@example.com', score: 2150, completed_count: 30 },
  ];

  const mockExercisesData = [
    { id: 1, name: 'Alex Chen', email: 'alex@example.com', score: 3200, completed_count: 52 },
    { id: 2, name: 'Maria Garcia', email: 'maria@example.com', score: 2980, completed_count: 48 },
    { id: 3, name: 'Sam Cleofe', email: 'sam@example.com', score: 2750, completed_count: 44 },
    { id: 4, name: 'David Lee', email: 'david@example.com', score: 2620, completed_count: 40 },
    { id: 5, name: 'Lisa Anderson', email: 'lisa@example.com', score: 2400, completed_count: 36 },
  ];


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

  // Auto-refresh every 10 seconds for real-time updates
  useEffect(() => {
    const interval = setInterval(fetchAllLeaderboards, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllLeaderboards = async () => {
    try {
      // Fetch Quiz leaderboard
      const quizResponse = await fetch('http://localhost:8000/api/leaderboard.php?type=quiz', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (quizResponse.ok) {
        const quizData = await quizResponse.json();
        setQuizLeaderboard(Array.isArray(quizData) ? quizData : (quizData.data || mockQuizData));
      } else {
        setQuizLeaderboard(mockQuizData);
      }

      // Fetch Exercises leaderboard
      const exercisesResponse = await fetch('http://localhost:8000/api/leaderboard.php?type=exercises', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });

      if (exercisesResponse.ok) {
        const exercisesData = await exercisesResponse.json();
        setExercisesLeaderboard(Array.isArray(exercisesData) ? exercisesData : (exercisesData.data || mockExercisesData));
      } else {
        setExercisesLeaderboard(mockExercisesData);
      }
    } catch (err) {
      console.error('Error fetching leaderboards:', err);
      setQuizLeaderboard(mockQuizData);
      setExercisesLeaderboard(mockExercisesData);
      toast.info('Using demo leaderboard data');
    }
  };

  const currentLeaderboard = activeTab === 'quiz' ? quizLeaderboard : exercisesLeaderboard;

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-lg">Loading leaderboard...</div>
      </div>
    );
  }

  const userRank = getUserRank();
  const userStats = getUserStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Compete with learners around the world
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-0 mb-8 border-b border-purple-500/30 justify-center">
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-8 py-3 font-semibold text-lg transition-all duration-200 border-b-2 ${
              activeTab === 'quiz'
                ? 'text-purple-400 border-purple-400'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            📝 Quiz Rankings
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-8 py-3 font-semibold text-lg transition-all duration-200 border-b-2 ${
              activeTab === 'exercises'
                ? 'text-emerald-400 border-emerald-400'
                : 'text-gray-400 border-transparent hover:text-white'
            }`}
          >
            💪 Exercises Rankings
          </button>
        </div>

        {/* Current User Stats */}
        {userRank && userStats && (
          <div className={`mb-8 bg-gradient-to-r ${
            activeTab === 'quiz'
              ? 'from-purple-600/20 to-purple-400/10'
              : 'from-emerald-600/20 to-emerald-400/10'
          } border ${
            activeTab === 'quiz' ? 'border-purple-500/30' : 'border-emerald-500/30'
          } rounded-lg p-6`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Your Rank</p>
                <div className="flex items-center gap-4">
                  <div className={`text-4xl font-bold ${
                    activeTab === 'quiz' ? 'text-purple-400' : 'text-emerald-400'
                  }`}>
                    #{userRank}
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{currentUser?.displayName || 'You'}</p>
                    <p className="text-gray-400 text-sm">
                      {userStats.score} Points • {userStats.completed_count} {activeTab === 'quiz' ? 'Quizzes' : 'Exercises'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-5xl">
                {userRank === 1 ? '�' : userRank === 2 ? '🥈' : userRank === 3 ? '�🥉' : '🎖️'}
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-slate-800/50 rounded-lg shadow-xl overflow-hidden border border-slate-700/50 backdrop-blur-sm">
          <table className="w-full">
            <thead>
              <tr className={`bg-gradient-to-r ${
                activeTab === 'quiz'
                  ? 'from-purple-600/40 to-purple-700/40'
                  : 'from-emerald-600/40 to-emerald-700/40'
              }`}>
                <th className="px-6 py-4 text-left text-white font-semibold">Rank</th>
                <th className="px-6 py-4 text-left text-white font-semibold">Player</th>
                <th className="px-6 py-4 text-center text-white font-semibold">Score</th>
                <th className="px-6 py-4 text-center text-white font-semibold">
                  {activeTab === 'quiz' ? 'Quizzes' : 'Exercises'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {currentLeaderboard.length > 0 ? (
                currentLeaderboard.map((user, index) => (
                  <tr 
                    key={index}
                    className={`hover:bg-slate-700/30 transition-colors ${
                      currentUser?.email === user.email 
                        ? activeTab === 'quiz'
                          ? 'bg-purple-900/30'
                          : 'bg-emerald-900/30'
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
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${
                          activeTab === 'quiz'
                            ? 'from-purple-500 to-pink-500'
                            : 'from-emerald-500 to-teal-500'
                        } flex items-center justify-center font-bold text-white`}>
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className={`px-6 py-4 text-center font-bold text-lg ${
                      activeTab === 'quiz' ? 'text-purple-400' : 'text-emerald-400'
                    }`}>
                      {user.score}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-300 font-medium">
                      {user.completed_count}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
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
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-emerald-400 mb-3">📊 How Rankings Work</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Quiz Rankings: Based on total quiz scores earned</li>
              <li>✓ Exercise Rankings: Based on exercises completed</li>
              <li>✓ Rankings update in real-time</li>
              <li>✓ Compete fairly with other learners</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
            <h3 className="text-lg font-semibold text-purple-400 mb-3">🎯 Tips to Climb</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>✓ Complete more quizzes and exercises</li>
              <li>✓ Aim for perfect scores to earn bonus points</li>
              <li>✓ Try different skill levels for challenges</li>
              <li>✓ Keep learning and practicing consistently</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default Leaderboard;
