import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const categories = [
    { id: 'all', name: 'All Languages', icon: '🌐' },
    { id: 'html', name: 'HTML', icon: '🏷️' },
    { id: 'css', name: 'CSS', icon: '🎨' },
    { id: 'javascript', name: 'JavaScript', icon: '⚡' },
    { id: 'php', name: 'PHP', icon: '🐘' },
  ];

  // Mock leaderboard data - replace with API call
  const mockLeaderboardData = [
    { id: 1, name: 'Alex Chen', avatar: '👨‍💻', points: 2850, language: 'all', exercises: 45, level: 'Advanced' },
    { id: 2, name: 'Maria Garcia', avatar: '👩‍💻', points: 2720, language: 'all', exercises: 42, level: 'Advanced' },
    { id: 3, name: 'Sam Cleofe', avatar: '🧑‍💻', points: 2590, language: 'all', exercises: 38, level: 'Intermediate' },
    { id: 4, name: 'John Smith', avatar: '👨‍🎓', points: 2410, language: 'all', exercises: 35, level: 'Intermediate' },
    { id: 5, name: 'Emma Wilson', avatar: '👩‍🎓', points: 2150, language: 'all', exercises: 30, level: 'Beginner' },
    { id: 6, name: 'Carlos Rodriguez', avatar: '🧑‍🚀', points: 1980, language: 'all', exercises: 28, level: 'Beginner' },
    { id: 7, name: 'Lisa Anderson', avatar: '👩‍🔬', points: 1820, language: 'all', exercises: 25, level: 'Beginner' },
    { id: 8, name: 'Michael Brown', avatar: '👨‍🏫', points: 1650, language: 'all', exercises: 22, level: 'Beginner' },
    { id: 9, name: 'Sophie Martin', avatar: '👩‍💼', points: 1450, language: 'all', exercises: 20, level: 'Beginner' },
    { id: 10, name: 'David Lee', avatar: '👨‍💼', points: 1290, language: 'all', exercises: 18, level: 'Beginner' },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      if (user) {
        // TODO: Fetch real leaderboard data from API
        // For now, use mock data
        fetchLeaderboardData();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/leaderboard?category=${selectedCategory}`);
      // const data = await response.json();
      
      setLeaderboardData(mockLeaderboardData);
      
      // Find current user's rank
      const userRank = mockLeaderboardData.findIndex(user => user.name === 'Sam Cleofe') + 1;
      setCurrentUserRank(userRank);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast.error('Failed to load leaderboard');
    }
  };

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredData(leaderboardData);
    } else {
      setFilteredData(leaderboardData.filter(user => user.language === selectedCategory));
    }
  }, [selectedCategory, leaderboardData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
            🏆 Leaderboard
          </h1>
          <p className="text-gray-400 text-lg">
            Top performers in the coding challenge
          </p>
        </div>

        {/* Current User Stats */}
        {currentUserRank && (
          <div className="mb-8 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 border border-emerald-500/30 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Your Rank</p>
                <div className="flex items-center gap-3">
                  <div className="text-4xl font-bold text-emerald-400">#{currentUserRank}</div>
                  <div>
                    <p className="text-lg font-semibold">Sam Cleofe</p>
                    <p className="text-gray-400 text-sm">2,590 Points • 38 Exercises</p>
                  </div>
                </div>
              </div>
              <div className="text-5xl">🥉</div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedCategory === category.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'bg-slate-800 text-gray-300 hover:bg-slate-700'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Leaderboard Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">Rank</th>
                <th className="text-left py-4 px-4 text-gray-400 font-semibold">User</th>
                <th className="text-center py-4 px-4 text-gray-400 font-semibold">Level</th>
                <th className="text-center py-4 px-4 text-gray-400 font-semibold">Exercises</th>
                <th className="text-right py-4 px-4 text-gray-400 font-semibold">Points</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((user, index) => (
                <tr
                  key={user.id}
                  className={`border-b border-slate-800 hover:bg-slate-800/50 transition-colors ${
                    user.name === 'Sam Cleofe' ? 'bg-emerald-900/20' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold w-8 text-center">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{user.avatar}</div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.language === 'all' ? 'All Langs' : user.language}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.level === 'Advanced'
                        ? 'bg-red-500/20 text-red-300'
                        : user.level === 'Intermediate'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-green-500/20 text-green-300'
                    }`}>
                      {user.level}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="text-gray-300">{user.exercises}</span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <span className="text-lg font-bold text-emerald-400">{user.points.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No data available for this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
