import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, query, orderByChild, limitToFirst, get } from 'firebase/database';
import { db } from '../firebase';
import { useTheme } from '../ThemeContext';
import { useAuth } from '../AuthContext';

function UserSearch() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const isDark = theme === 'dark';

  // Load top users on component mount
  useEffect(() => {
    const loadTopUsers = async () => {
      try {
        const usersRef = ref(db, 'users');
        const usersSnap = await get(usersRef);
        
        if (usersSnap.exists()) {
          const usersData = usersSnap.val();
          const usersList = Object.entries(usersData)
            .map(([uid, data]) => ({
              uid,
              username: data.username || 'Anonymous',
              photoURL: data.photoURL || null,
              totalPoints: data.totalPoints || 0,
              badges: data.badges || {},
              quizzes: data.quizzes || {},
              exercises: data.exercises || {},
            }))
            .filter(user => user.uid !== currentUser?.uid) // Exclude current user
            .sort((a, b) => b.totalPoints - a.totalPoints)
            .slice(0, 12); // Top 12 users

          setTopUsers(usersList);
        }
      } catch (error) {
        console.error('Error loading top users:', error);
      }
    };

    loadTopUsers();
  }, [currentUser?.uid]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    try {
      const usersRef = ref(db, 'users');
      const usersSnap = await get(usersRef);

      if (usersSnap.exists()) {
        const usersData = usersSnap.val();
        const results = Object.entries(usersData)
          .map(([uid, data]) => ({
            uid,
            username: data.username || 'Anonymous',
            photoURL: data.photoURL || null,
            totalPoints: data.totalPoints || 0,
            badges: data.badges || {},
            quizzes: data.quizzes || {},
            exercises: data.exercises || {},
          }))
          .filter(
            user =>
              user.uid !== currentUser?.uid &&
              user.username.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .sort((a, b) => b.totalPoints - a.totalPoints);

        setSearchResults(results);
      }
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const getUserStats = (user) => {
    const quizzes = Object.values(user.quizzes || {});
    const wins = quizzes.filter(q => q.won).length;
    const total = quizzes.length;
    const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

    let exercisesCompleted = 0;
    const exercises = user.exercises || {};
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

    return { wins, total, winRate, exercisesCompleted };
  };

  const UserCard = ({ user }) => {
    const stats = getUserStats(user);
    const badgeCount = Object.values(user.badges || {}).filter(b => b && b.earned).length;

    return (
      <div
        className={`${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} rounded-lg p-6 shadow-md transition-all cursor-pointer border border-transparent hover:border-emerald-500`}
        onClick={() => navigate(`/user/${user.uid}`)}
      >
        <div className="flex items-center gap-4 mb-4">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.username}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="flex-1">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.username}
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              ⭐ {user.totalPoints} points
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-sm font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
              {stats.wins}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quiz Wins
            </p>
          </div>
          <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-sm font-semibold ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {stats.winRate}%
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Win Rate
            </p>
          </div>
          <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className={`text-sm font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
              {badgeCount}
            </p>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Badges
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen pt-20 pb-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          🔍 Discover Users
        </h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search for users by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 px-4 py-3 rounded-lg border-2 focus:outline-none focus:border-emerald-500 ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Search Results or Top Users */}
        <div>
          {searched ? (
            <>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Search Results {searchResults.length > 0 && `(${searchResults.length})`}
              </h2>
              {searchResults.length === 0 ? (
                <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <p className="text-xl">No users found matching "{searchQuery}"</p>
                  <p className="text-sm mt-2">Try searching for a different username</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((user) => (
                    <UserCard key={user.uid} user={user} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                🏆 Top Users
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topUsers.map((user) => (
                  <UserCard key={user.uid} user={user} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSearch;
