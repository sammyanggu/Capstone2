import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

function PublicUserProfile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [equippedBadges, setEquippedBadges] = useState([]);

  const isDark = theme === 'dark';

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const userRef = ref(db, `users/${userId}`);
        const userSnap = await get(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.val();
          setUser({
            uid: userId,
            username: userData.username || 'Anonymous',
            photoURL: userData.photoURL || null,
            bio: userData.bio || 'No bio yet',
            totalPoints: userData.totalPoints || 0,
            badges: userData.badges || {},
            quizzes: userData.quizzes || {},
            exercises: userData.exercises || {},
          });

          // Calculate stats
          const quizzes = Object.values(userData.quizzes || {});
          const wins = quizzes.filter(q => q.won).length;
          const total = quizzes.length;
          const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

          let exercisesCompleted = 0;
          const exercises = userData.exercises || {};
          Object.values(exercises).forEach((lang) => {
            if (typeof lang === 'object') {
              Object.values(lang).forEach((level) => {
                if (typeof level === 'object') {
                  Object.values(level).forEach((exercise) => {
                    if (exercise.isCompleted) exercisesCompleted++;
                  });
                }
              });
            }
          });

          setStats({
            quizWins: wins,
            quizTotal: total,
            winRate,
            exercisesCompleted,
          });

          // Get equipped badges
          const equipped = Object.entries(userData.badges || {})
            .filter(([_, badge]) => badge && badge.earned && badge.equipped)
            .map(([_, badge]) => badge);
          setEquippedBadges(equipped);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-xl font-semibold">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={`min-h-screen pt-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 text-center py-12">
          <h1 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            User Not Found
          </h1>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            The user you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate('/discover')}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600"
          >
            Back to Discovery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 pb-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-md mb-8`}>
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.username}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-4xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {user.username}
                </h1>
                <p className={`text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {user.bio}
                </p>
              </div>
            </div>
            {currentUser?.uid !== userId && (
              <button
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
              >
                Follow
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded p-4 text-center`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {user.totalPoints}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Points
              </p>
            </div>
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded p-4 text-center`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {stats?.quizWins || 0}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Quiz Wins
              </p>
            </div>
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded p-4 text-center`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                {stats?.winRate || 0}%
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Win Rate
              </p>
            </div>
            <div className={`${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded p-4 text-center`}>
              <p className={`text-2xl font-bold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                {stats?.exercisesCompleted || 0}
              </p>
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Exercises
              </p>
            </div>
          </div>
        </div>

        {/* Equipped Badges */}
        {equippedBadges.length > 0 && (
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-md mb-8`}>
            <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🏆 Badges
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
              {equippedBadges.map((badge, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-3xl">
                    {badge.icon || '🏅'}
                  </div>
                  <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {badge.name || 'Badge'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-8 shadow-md`}>
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            🎯 Recent Achievements
          </h2>
          <div className={`text-center py-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <p className="text-lg">Keep practicing to unlock achievements!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicUserProfile;
