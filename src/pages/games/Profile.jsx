import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { ref, get, set } from 'firebase/database';
import { useAuth } from '../../AuthContext';
import { updateProfile } from 'firebase/auth';
import { calculateUserRank } from '../../utils/rankCalculator';

function GameProfile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
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
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [currentUser, navigate]);

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-gradient-to-br from-purple-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-purple-500/30">
            <p className="text-purple-400 text-xs sm:text-sm mb-1 sm:mb-2">Quizzes Completed</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{profile.quizzesCompleted}</p>
          </div>
          <div className="bg-gradient-to-br from-pink-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-pink-500/30">
            <p className="text-pink-400 text-xs sm:text-sm mb-1 sm:mb-2">Quiz Score</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{profile.quizScore}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-blue-500/30">
            <p className="text-blue-400 text-xs sm:text-sm mb-1 sm:mb-2">Your Rank</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">#{profile.rank || '-'}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-900/40 to-slate-900 rounded-lg p-3 sm:p-4 md:p-6 border border-orange-500/30">
            <p className="text-orange-400 text-xs sm:text-sm mb-1 sm:mb-2">Achievements</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">{profile.achievements}</p>
          </div>
        </div>

        {/* Back Button */}
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
