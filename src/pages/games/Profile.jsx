import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { ref, get, set } from 'firebase/database';
import { useAuth } from '../../AuthContext';
import { updateProfile } from 'firebase/auth';
import { calculateUserRank } from '../../utils/rankCalculator';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function GameProfile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [profile, setProfile] = useState({
    displayName: '',
    email: '',
    bio: '',
    quizzesCompleted: 0,
    quizScore: 0,
    rank: 0,
    achievements: 0
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [quizProgressData, setQuizProgressData] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    const fetchProfile = async () => {
      try {
        const userRef = ref(db, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          // Calculate rank based on current quiz scores
          const userRank = await calculateUserRank(currentUser.uid);
          
          setProfile({
            displayName: currentUser.displayName || '',
            email: currentUser.email || '',
            bio: data.bio || '',
            quizzesCompleted: data.quizzesCompleted || 0,
            quizScore: data.quizScore || 0,
            rank: userRank,
            achievements: data.achievements || 0
          });
          setEditData({
            displayName: currentUser.displayName || '',
            bio: data.bio || ''
          });

          // Generate analytics data from quiz progress
          const quizProgressRef = ref(db, `users/${currentUser.uid}/progress/quizzes`);
          const quizProgressSnapshot = await get(quizProgressRef);
          
          let quizzes = [];
          if (quizProgressSnapshot.exists()) {
            const quizzesData = quizProgressSnapshot.val();
            console.log('📊 Quiz Progress Data:', quizzesData);
            
            // Collect all quiz attempts with their timestamps
            const allAttempts = [];
            Object.entries(quizzesData).forEach(([category, attempts]) => {
              console.log(`📊 Category "${category}":`, attempts);
              
              // attempts is now an object with timestamps as keys
              if (typeof attempts === 'object' && attempts !== null) {
                Object.entries(attempts).forEach(([timestamp, attemptData]) => {
                  allAttempts.push({
                    timestamp: parseInt(timestamp),
                    category,
                    attemptData
                  });
                });
              }
            });
            
            // Sort by timestamp ascending (oldest first)
            allAttempts.sort((a, b) => a.timestamp - b.timestamp);
            
            // Convert to chart data with sequential quiz numbers
            quizzes = allAttempts.map((attempt, index) => ({
              name: `Quiz ${index + 1}`,
              category: attempt.category.replace(/-/g, ' ').toUpperCase(),
              score: attempt.attemptData.percentage || attempt.attemptData.score || 0,
              timestamp: attempt.timestamp
            }));
            
            console.log('📈 Transformed quiz data for chart:', quizzes);
            console.log('📈 Total quiz attempts:', quizzes.length);
          } else {
            console.log('⚠️ No quizzes found in Firebase at path:', `users/${currentUser.uid}/progress/quizzes`);
          }
          
          // If no quizzes, show mock data
          if (quizzes.length === 0) {
            quizzes = [
              { name: 'Quiz 1', score: 85 },
              { name: 'Quiz 2', score: 90 },
              { name: 'Quiz 3', score: 88 },
              { name: 'Quiz 4', score: 92 }
            ];
          }
          
          setQuizProgressData(quizzes);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [currentUser, navigate]);

  // Listen for progress updates to refresh quiz data in real-time
  useEffect(() => {
    const handleProgressUpdate = () => {
      if (currentUser) {
        const fetchQuizProgress = async () => {
          try {
            const quizProgressRef = ref(db, `users/${currentUser.uid}/progress/quizzes`);
            const quizProgressSnapshot = await get(quizProgressRef);
            
            let quizzes = [];
            if (quizProgressSnapshot.exists()) {
              const quizzesData = quizProgressSnapshot.val();
              console.log('📊 [Real-time] Quiz Progress Data:', quizzesData);
              
              // Collect all quiz attempts with their timestamps
              const allAttempts = [];
              Object.entries(quizzesData).forEach(([category, attempts]) => {
                console.log(`📊 [Real-time] Category "${category}":`, attempts);
                
                // attempts is now an object with timestamps as keys
                if (typeof attempts === 'object' && attempts !== null) {
                  Object.entries(attempts).forEach(([timestamp, attemptData]) => {
                    allAttempts.push({
                      timestamp: parseInt(timestamp),
                      category,
                      attemptData
                    });
                  });
                }
              });
              
              // Sort by timestamp ascending (oldest first)
              allAttempts.sort((a, b) => a.timestamp - b.timestamp);
              
              // Convert to chart data with sequential quiz numbers
              quizzes = allAttempts.map((attempt, index) => ({
                name: `Quiz ${index + 1}`,
                category: attempt.category.replace(/-/g, ' ').toUpperCase(),
                score: attempt.attemptData.percentage || attempt.attemptData.score || 0,
                timestamp: attempt.timestamp
              }));
              
              console.log('📈 [Real-time] Transformed quiz data for chart:', quizzes);
              console.log('📈 [Real-time] Total quiz attempts:', quizzes.length);
            }
            
            setQuizProgressData(quizzes);

            // Also update the main profile stats
            const userRef = ref(db, `users/${currentUser.uid}`);
            const userSnapshot = await get(userRef);
            if (userSnapshot.exists()) {
              const data = userSnapshot.val();
              const userRank = await calculateUserRank(currentUser.uid);
              
              setProfile(prev => ({
                ...prev,
                quizzesCompleted: data.quizzesCompleted || prev.quizzesCompleted,
                quizScore: data.quizScore || prev.quizScore,
                rank: userRank
              }));
            }
          } catch (error) {
            console.error('Error updating quiz progress:', error);
          }
        };
        
        fetchQuizProgress();
      }
    };

    window.addEventListener('progress-updated', handleProgressUpdate);
    return () => window.removeEventListener('progress-updated', handleProgressUpdate);
  }, [currentUser]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: editData.displayName
      });

      const userRef = ref(db, `users/${currentUser.uid}`);
      await set(userRef, {
        ...profile,
        ...editData
      });

      setProfile({
        ...profile,
        ...editData
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 pt-16 sm:pt-20 pb-8 sm:pb-12">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">🎮 Game Profile</h1>
          <p className="text-gray-400 text-sm sm:text-base">Your gaming statistics and achievements</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 rounded-xl p-4 sm:p-6 md:p-8 border border-purple-500/30 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 md:gap-8">
            {/* Avatar */}
            <img
              src={currentUser?.photoURL || '/react.svg'}
              alt="Profile"
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-purple-500 flex-shrink-0"
            />

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              {!isEditing ? (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 break-words">{profile.displayName}</h2>
                  <p className="text-gray-400 mb-2 sm:mb-4 text-sm sm:text-base break-all">{profile.email}</p>
                  <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">{profile.bio}</p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base rounded-lg transition-colors"
                  >
                    Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-300 mb-2">Display Name</label>
                      <input
                        type="text"
                        value={editData.displayName}
                        onChange={(e) => setEditData({...editData, displayName: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 sm:px-3 py-2 text-sm sm:text-base text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm text-gray-300 mb-2">Bio</label>
                      <textarea
                        value={editData.bio}
                        onChange={(e) => setEditData({...editData, bio: e.target.value})}
                        className="w-full bg-slate-800 border border-slate-700 rounded px-2 sm:px-3 py-2 text-sm sm:text-base text-white h-20 sm:h-24"
                      />
                    </div>
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={handleSaveProfile}
                        className="px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base rounded-lg transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 sm:px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm sm:text-base rounded-lg transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 sm:mb-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-purple-400 border-b-2 border-purple-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Overview
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-purple-500/30 group cursor-help" title="Total number of quizzes you have completed">
                  <p className="text-purple-400 text-xs sm:text-sm mb-1 sm:mb-2">Quizzes Completed</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{profile.quizzesCompleted}</p>
                  <p className="text-xs text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Total quizzes attempted</p>
                </div>
                <div className="bg-gradient-to-br from-pink-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-pink-500/30 group cursor-help" title="Your average or last quiz score out of 100">
                  <p className="text-pink-400 text-xs sm:text-sm mb-1 sm:mb-2">Quiz Score</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{profile.quizScore}</p>
                  <p className="text-xs text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Score out of 100</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-blue-500/30 group cursor-help" title="Your position on the leaderboard based on quiz performance">
                  <p className="text-blue-400 text-xs sm:text-sm mb-1 sm:mb-2">Your Rank</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">#{profile.rank || '-'}</p>
                  <p className="text-xs text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Leaderboard position</p>
                </div>
                <div className="bg-gradient-to-br from-orange-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-orange-500/30 group cursor-help" title="Special achievements earned from quizzes and challenges">
                  <p className="text-orange-400 text-xs sm:text-sm mb-1 sm:mb-2">Achievements</p>
                  <p className="text-2xl sm:text-3xl font-bold text-white">{profile.achievements}</p>
                  <p className="text-xs text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Badges unlocked</p>
                </div>
              </div>

              {/* Analytics Charts */}
              <div className="grid grid-cols-1 gap-6">
                {/* Quiz Progress Chart - Full Width */}
                <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 rounded-lg p-4 sm:p-6 border border-purple-500/30">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-2">📊 Quiz Progress</h3>
                    <p className="text-sm text-slate-300">Your quiz scores over time - Shows how you're improving across attempts</p>
                  </div>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={quizProgressData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#404854" />
                      <XAxis stroke="#9ca3af" label={{ value: 'Quiz Number', position: 'insideBottomRight', offset: -5, fill: '#9ca3af' }} />
                      <YAxis stroke="#9ca3af" label={{ value: 'Score', angle: -90, position: 'insideLeft', fill: '#9ca3af' }} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                        labelStyle={{ color: '#fff' }}
                        formatter={(value) => [`${value}%`, 'Score']}
                        content={({ active, payload }) => {
                          if (active && payload && payload[0]) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-slate-900 border border-slate-700 p-2 rounded text-sm">
                                <p className="text-white font-semibold">{data.name}</p>
                                <p className="text-purple-400">{data.category}</p>
                                <p className="text-green-400">{data.score}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="score" stroke="#a78bfa" strokeWidth={2} name="Score" dot={{ fill: '#a78bfa', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div className="mt-3 text-xs text-slate-400">
                    💡 Tip: Your score progress helps you track improvement. Higher scores mean better mastery!
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate('/games')}
          className="px-4 sm:px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base rounded-lg transition-colors"
        >
          ← Back to Games Hub
        </button>
      </div>
    </div>
  );
}

export default GameProfile;
