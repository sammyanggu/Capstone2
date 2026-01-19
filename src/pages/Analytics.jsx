import { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { ref, get } from 'firebase/database';
import { db } from '../firebase';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useTheme } from '../ThemeContext';

function Analytics() {
  const { currentUser } = useAuth();
  const { theme } = useTheme();
  const [loading, setLoading] = useState(true);
  const [gameStats, setGameStats] = useState([]);
  const [learningStats, setLearningStats] = useState([]);
  const [quizData, setQuizData] = useState({ won: 0, lost: 0, total: 0, winRate: 0 });
  const [pointsData, setPointsData] = useState([]);
  const [exerciseData, setExerciseData] = useState({ completed: 0, total: 0 });

  useEffect(() => {
    const loadAnalytics = async () => {
      if (!currentUser?.uid) return;

      try {
        // Load game stats
        const quizRef = ref(db, `users/${currentUser.uid}/quizzes`);
        const quizSnap = await get(quizRef);
        if (quizSnap.exists()) {
          const quizzes = quizSnap.val();
          let won = 0, lost = 0;
          Object.values(quizzes).forEach((quiz) => {
            if (quiz.won) won++;
            else lost++;
          });
          const total = won + lost;
          const winRate = total > 0 ? ((won / total) * 100).toFixed(1) : 0;
          setQuizData({ won, lost, total, winRate });
        }

        // Load learning/exercise stats
        const exercisesRef = ref(db, `users/${currentUser.uid}/exercises`);
        const exercisesSnap = await get(exercisesRef);
        if (exercisesSnap.exists()) {
          const exercises = exercisesSnap.val();
          let completed = 0;
          Object.values(exercises).forEach((lang) => {
            if (typeof lang === 'object') {
              Object.values(lang).forEach((level) => {
                if (typeof level === 'object') {
                  Object.values(level).forEach((exercise) => {
                    if (exercise.isCompleted) completed++;
                  });
                }
              });
            }
          });
          setExerciseData({ completed, total: 100 }); // Assuming ~100 total exercises
        }

        // Load points history
        const pointsRef = ref(db, `users/${currentUser.uid}/points`);
        const pointsSnap = await get(pointsRef);
        if (pointsSnap.exists()) {
          const points = pointsSnap.val();
          setPointsData(
            Object.entries(points || {}).map(([date, value]) => ({
              date,
              points: value,
            }))
          );
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading analytics:', error);
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [currentUser?.uid]);

  const COLORS = ['#10b981', '#f59e0b'];
  const isDark = theme === 'dark';
  const textColor = isDark ? '#e5e7eb' : '#1f2937';
  const gridColor = isDark ? '#374151' : '#e5e7eb';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen pt-20 pb-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className={`text-4xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          📊 Analytics Dashboard
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Quiz Wins
            </h3>
            <p className={`text-3xl font-bold mt-2 text-emerald-500`}>{quizData.won}</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              out of {quizData.total} total
            </p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Win Rate
            </h3>
            <p className={`text-3xl font-bold mt-2 text-blue-500`}>{quizData.winRate}%</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              overall performance
            </p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Exercises Completed
            </h3>
            <p className={`text-3xl font-bold mt-2 text-purple-500`}>{exerciseData.completed}</p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              exercises
            </p>
          </div>

          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <h3 className={`text-sm font-semibold ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Completion Rate
            </h3>
            <p className={`text-3xl font-bold mt-2 text-orange-500`}>
              {exerciseData.total > 0 ? ((exerciseData.completed / exerciseData.total) * 100).toFixed(1) : 0}%
            </p>
            <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              learning progress
            </p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quiz Win Rate Chart */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              🎮 Quiz Performance
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Won', value: quizData.won },
                    { name: 'Lost', value: quizData.lost },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Exercise Completion Chart */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 shadow-md`}>
            <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              📚 Exercise Completion
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    name: 'Exercises',
                    completed: exerciseData.completed,
                    remaining: exerciseData.total - exerciseData.completed,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="name" stroke={textColor} />
                <YAxis stroke={textColor} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#fff',
                    border: `1px solid ${isDark ? '#374151' : '#e5e7eb'}`,
                  }}
                  labelStyle={{ color: textColor }}
                />
                <Legend />
                <Bar dataKey="completed" stackId="a" fill="#10b981" />
                <Bar dataKey="remaining" stackId="a" fill="#d1d5db" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tips Section */}
        <div className={`${isDark ? 'bg-gray-800' : 'bg-blue-50'} rounded-lg p-6 border-l-4 border-blue-500`}>
          <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            💡 Tips to Improve Your Stats
          </h3>
          <ul className={`mt-4 space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <li>✅ Complete more exercises to increase your completion rate</li>
            <li>✅ Practice regularly to improve your quiz win rate</li>
            <li>✅ Review lesson materials before taking quizzes</li>
            <li>✅ Challenge yourself with harder difficulty levels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
