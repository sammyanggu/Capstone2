import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { ref, query, orderByChild, equalTo, get, update, set } from "firebase/database";
import { toast } from 'react-toastify';
import ProgressStats from "../components/ProgressStats";
import Badges from "../components/Badges";
import { getUserExerciseProgress, getUserLessonProgress } from '../utils/progressTracker';

const sections = [
  { key: "progress", label: "Progress" },
  { key: "achievements", label: "Achievements" },
];

function Profile() {
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
          const achievementsRef = ref(db, 'achievements');
          const achievementsSnapshot = await get(achievementsRef);
          const achievementsData = [];
          
          if (achievementsSnapshot.exists()) {
            achievementsSnapshot.forEach(childSnapshot => {
              const data = childSnapshot.val();
              if (data.userId === firebaseUser.uid) {
                achievementsData.push({
                  id: childSnapshot.key,
                  ...data
                });
              }
            });
          }
          
          setAchievements(achievementsData || []);
          
          // Calculate total points
          const total = achievementsData.reduce((sum, achievement) => sum + (achievement.points || 0), 0);
          setTotalPoints(total);
        } catch (error) {
          console.error("Error fetching achievements:", error);
        }

        try {
          // Fetch notifications from Realtime Database
          const notificationsRef = ref(db, 'notifications');
          const notificationsSnapshot = await get(notificationsRef);
          const notificationsData = [];
          
          if (notificationsSnapshot.exists()) {
            notificationsSnapshot.forEach(childSnapshot => {
              const data = childSnapshot.val();
              if (data.userId === firebaseUser.uid) {
                notificationsData.push({
                  id: childSnapshot.key,
                  ...data
                });
              }
            });
          }
          
          setNotifications(notificationsData || []);
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {!user ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-emerald-700">
          <h2 className="text-2xl font-bold mb-2">No user found</h2>
          <p className="mb-4">Please sign in to view your profile.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row min-h-screen px-2 sm:px-4 pb-8 pt-20 sm:pt-24 gap-4 sm:gap-6 w-full">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 bg-slate-800 rounded-xl p-4 sm:p-6 lg:p-8 flex flex-col items-center lg:sticky lg:top-24 lg:h-fit">
            <div className="relative mb-6">
              <img
                src={user.photoURL || "/react.svg"}
                alt="Profile"
                style={{ borderColor: borderColors.find(c => c.value === selectedBorderColor)?.hex || "#047857" }}
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 shadow-lg transition-all duration-300"
              />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 mb-1 sm:mb-2 text-center">
              {user.displayName || "User"}
            </div>
            <div className="text-xs sm:text-sm text-emerald-700 mb-6 sm:mb-8 text-center break-all">
              {user.email}
            </div>

            {/* Badge Border Selector */}
            <div className="w-full mb-6 pb-6 border-b border-slate-700">
              <p className="text-sm font-semibold text-emerald-700 mb-3">Avatar Border</p>
              <div className="grid grid-cols-3 gap-2">
                {borderColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={async () => {
                      setSelectedBorderColor(color.value);
                      if (user) {
                        try {
                          const userBorderRef = ref(db, `users/${user.uid}/preferences/borderColor`);
                          await set(userBorderRef, color.value);
                          toast.success(`Border changed to ${color.name}!`);
                        } catch (error) {
                          console.error("Error saving border color:", error);
                          toast.error("Failed to save border color");
                        }
                      }
                    }}
                    className={`h-8 rounded-lg border-2 transition-all ${
                      selectedBorderColor === color.value
                        ? "ring-2 ring-offset-2 ring-emerald-400"
                        : "border-slate-600 hover:border-slate-500"
                    }`}
                    style={{
                      backgroundColor: color.hex,
                      borderColor: selectedBorderColor === color.value ? color.hex : "inherit"
                    }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            <nav className="flex flex-row lg:flex-col gap-2 sm:gap-3 w-full overflow-x-auto scrollbar-none lg:overflow-visible pb-2 lg:pb-0">
              {sections.map((s) => (
                <button
                  key={s.key}
                  className={`whitespace-nowrap px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base flex-1 lg:flex-auto ${
                    active === s.key 
                    ? "bg-emerald-700 text-white shadow-md" 
                    : "hover:bg-slate-700/50 text-emerald-700"
                  }`}
                  onClick={() => setActive(s.key)}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-xl p-3 sm:p-6 lg:p-8">
            {active === "progress" && (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-700 mb-4 sm:mb-8">
                  Learning Progress
                </h2>
                {user && <ProgressStats userId={user.uid} />}
              </div>
            )}

            {active === "achievements" && (
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">
                    Achievements
                  </h2>
                  <div className="text-emerald-700 whitespace-nowrap">
                    <span className="font-bold">Total Points:</span> {totalPoints}
                  </div>
                </div>

                {/* Stats Overview */}
                <div className="bg-slate-800 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform">
                  <h3 className="text-base sm:text-lg font-semibold text-emerald-700 mb-2">
                    Achievements Progress
                  </h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-bold text-emerald-700">
                      {achievements.filter(a => a.isEarned).length}
                    </p>
                    <p className="text-lg text-emerald-700">/ {achievements.length}</p>
                  </div>
                  <div className="mt-2 h-2 bg-slate-700 rounded overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 transition-all duration-500"
                      style={{ 
                        width: `${achievements.length > 0 ? (achievements.filter(a => a.isEarned).length / achievements.length) * 100 : 0}%` 
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`bg-slate-800 p-3 sm:p-4 rounded-lg relative transform hover:scale-105 transition-transform ${
                        achievement.isEarned ? 'border-2 border-emerald-700' : 'opacity-75'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={achievement.icon} 
                            alt={achievement.name} 
                            className={`w-12 h-12 ${!achievement.isEarned && 'grayscale'}`}
                          />
                          {achievement.isEarned && (
                            <div className="absolute -top-1 -right-1 bg-emerald-700 rounded-full p-1">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-emerald-300">
                            {achievement.name}
                          </h3>
                          <p className="text-sm text-emerald-200">
                            {achievement.description}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-sm text-emerald-400">
                              {achievement.points} points
                            </p>
                            {achievement.dateEarned && (
                              <p className="text-xs text-emerald-200">
                                Earned: {new Date(achievement.dateEarned).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                          {!achievement.isEarned && achievement.progress && achievement.progress.max > 1 && (
                            <div className="mt-2">
                              <div className="h-2 bg-slate-700 rounded overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all duration-500"
                                  style={{ width: `${(achievement.progress.current / achievement.progress.max) * 100}%` }}
                                />
                              </div>
                              <p className="text-xs text-blue-200 mt-1">
                                Progress: {achievement.progress.current} / {achievement.progress.max}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default Profile;