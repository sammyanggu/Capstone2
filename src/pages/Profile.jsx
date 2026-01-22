import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { ref, query, orderByChild, equalTo, get, update, set } from "firebase/database";
import { toast } from 'react-toastify';
import { useTheme } from "../ThemeContext";
import ProgressStats from "../components/ProgressStats";
import { getUserExerciseProgress, getUserLessonProgress } from '../utils/progressTracker';

const sections = [
  { key: "progress", label: "Progress" },
];

function Profile() {
  const { theme } = useTheme();
  const [active, setActive] = useState("progress");
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [selectedBorderColor, setSelectedBorderColor] = useState("emerald");
  const [totalPoints, setTotalPoints] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [debugExerciseProgress, setDebugExerciseProgress] = useState(null);
  const [debugLessonProgress, setDebugLessonProgress] = useState(null);

  const borderColors = [
    { name: "Emerald", value: "emerald", hex: "#047857" },
    { name: "Blue", value: "blue", hex: "#1e40af" },
    { name: "Purple", value: "purple", hex: "#6b21a8" },
    { name: "Gold", value: "gold", hex: "#b45309" },
    { name: "Red", value: "red", hex: "#b91c1c" },
    { name: "Pink", value: "pink", hex: "#be185d" },
  ];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        
        try {
          // Load border color preference from database
          const userBorderRef = ref(db, `users/${firebaseUser.uid}/preferences/borderColor`);
          const borderSnapshot = await get(userBorderRef);
          if (borderSnapshot.exists()) {
            setSelectedBorderColor(borderSnapshot.val());
          }
        } catch (error) {
          console.error("Error loading border color preference:", error);
        }

        try {
          // Fetch user achievements from Realtime Database
          const achievementsRef = ref(db, `users/${firebaseUser.uid}/achievements`);
          const achievementsSnapshot = await get(achievementsRef);
          const achievementsData = [];
          
          if (achievementsSnapshot.exists()) {
            achievementsSnapshot.forEach(childSnapshot => {
              const data = childSnapshot.val();
              achievementsData.push({
                id: childSnapshot.key,
                ...data
              });
            });
          }
          
          setAchievements(achievementsData || []);
          
          // Calculate total points
          const total = achievementsData.reduce((sum, achievement) => sum + (achievement.points || 0), 0);
          setTotalPoints(total);
        } catch (error) {
          console.error("Error fetching achievements:", error);
          setAchievements([]);
          setTotalPoints(0);
        }

        try {
          // Fetch notifications from Realtime Database
          const notificationsRef = ref(db, `users/${firebaseUser.uid}/notifications`);
          const notificationsSnapshot = await get(notificationsRef);
          const notificationsData = [];
          
          if (notificationsSnapshot.exists()) {
            notificationsSnapshot.forEach(childSnapshot => {
              const data = childSnapshot.val();
              notificationsData.push({
                id: childSnapshot.key,
                ...data
              });
            });
          }
          
          setNotifications(notificationsData || []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
          setNotifications([]);
        }

        try {
          // Fetch notification settings from Realtime Database
          const notificationSettingsRef = ref(db, `users/${firebaseUser.uid}/settings/notifications`);
          const notificationSettingsSnapshot = await get(notificationSettingsRef);
          
          if (notificationSettingsSnapshot.exists()) {
            setNotificationSettings(notificationSettingsSnapshot.val());
          }
        } catch (error) {
          console.error("Error fetching notification settings:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      {!user ? (
        <div className={`flex flex-col items-center justify-center min-h-[60vh] ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
          <h2 className="text-2xl font-bold mb-2">No user found</h2>
          <p className="mb-4">Please sign in to view your profile.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen px-2 sm:px-4 pb-8 pt-20 sm:pt-24 gap-4 sm:gap-6 w-full">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 bg-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col items-center lg:sticky lg:top-24 lg:h-fit">
            <div className="relative mb-6">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  style={{ borderColor: borderColors.find(c => c.value === selectedBorderColor)?.hex || "#047857" }}
                  className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 shadow-lg transition-all duration-300"
                  onError={(e) => {
                    console.error("Image failed to load:", user.photoURL);
                    e.target.src = "/react.svg";
                  }}
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 shadow-lg flex items-center justify-center bg-slate-700 text-emerald-400 text-4xl">
                  👤
                </div>
              )}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 mb-1 sm:mb-2 text-center">
              {user.displayName || "User"}
            </div>
            <div className="text-xs sm:text-sm text-emerald-700 mb-6 sm:mb-8 text-center break-all">
              {user.email}
            </div>

            {/* Progress and Achievements Navigation */}
            <div className="w-full flex flex-col gap-2">
              {sections.map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActive(section.key)}
                  className={`w-full py-2 rounded-lg font-semibold transition-all flex items-center justify-center gap-2
                  ${active === section.key ? `bg-slate-700 text-emerald-400` : `text-slate-300 hover:bg-slate-700`}`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 bg-slate-900 rounded-xl p-4 sm:p-6 lg:p-8 overflow-hidden">
            {/* Progress Stats */}
            {active === "progress" && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4">
                  Your Progress
                </h2>
                <ProgressStats
                  userId={user.uid}
                  onDebugExerciseProgress={setDebugExerciseProgress}
                  onDebugLessonProgress={setDebugLessonProgress}
                />
              </div>
            )}

            {/* Debug Exercise Progress */}
            {debugExerciseProgress && (
              <div className="mt-8 p-4 bg-slate-800 rounded-lg">
                <h3 className="text-emerald-400 font-semibold mb-2">
                  Debug Exercise Progress
                </h3>
                <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                  {JSON.stringify(debugExerciseProgress, null, 2)}
                </pre>
              </div>
            )}

            {/* Debug Lesson Progress */}
            {debugLessonProgress && (
              <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                <h3 className="text-emerald-400 font-semibold mb-2">
                  Debug Lesson Progress
                </h3>
                <pre className="text-slate-300 text-sm whitespace-pre-wrap">
                  {JSON.stringify(debugLessonProgress, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;