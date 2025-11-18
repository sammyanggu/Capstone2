import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { ref, query, orderByChild, equalTo, get, update } from "firebase/database";
import { toast } from 'react-toastify';
import ProgressStats from "../components/ProgressStats";

const sections = [
  { key: "progress", label: "Progress" },
  { key: "achievements", label: "Achievements" },
  { key: "badges", label: "Badges" },
  { key: "edit", label: "Edit Profile" },
];

function Profile() {
  const [active, setActive] = useState("progress");
  const [user, setUser] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [badges, setBadges] = useState([]);
  const [groupedBadges, setGroupedBadges] = useState({});
  const [equippedBadge, setEquippedBadge] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUnearned, setShowUnearned] = useState(true);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        console.log('Your user ID:', firebaseUser.uid);
        
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
          // Fetch user badges from Realtime Database
          const badgesRef = ref(db, 'badges');
          const badgesSnapshot = await get(badgesRef);
          const badgesData = [];
          
          if (badgesSnapshot.exists()) {
            badgesSnapshot.forEach(childSnapshot => {
              const data = childSnapshot.val();
              if (data.userId === firebaseUser.uid) {
                badgesData.push({
                  id: childSnapshot.key,
                  ...data
                });
              }
            });
          }
          
          setBadges(badgesData || []);
          
          // Group badges by type
          const grouped = {};
          badgesData.forEach(badge => {
            const type = badge.type || 'other';
            if (!grouped[type]) grouped[type] = [];
            grouped[type].push(badge);
          });
          setGroupedBadges(grouped);
          
          // Find equipped badge
          const equipped = badgesData.find(badge => badge.isEquipped);
          if (equipped) setEquippedBadge(equipped);
        } catch (error) {
          console.error("Error fetching badges:", error);
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
                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-emerald-700 shadow-lg"
              />
              {equippedBadge && (
                <img
                  src={equippedBadge.icon}
                  alt="Equipped Badge"
                  className="absolute -bottom-2 -right-2 w-10 h-10"
                />
              )}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-700 mb-1 sm:mb-2 text-center">
              {user.displayName || "User"}
            </div>
            <div className="text-xs sm:text-sm text-emerald-700 mb-6 sm:mb-8 text-center break-all">
              {user.email}
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
                {equippedBadge && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-emerald-700 mb-4">Current Badge</h3>
                    <div className="bg-slate-800 p-6 rounded-lg inline-block">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img 
                            src={equippedBadge.icon} 
                            alt={equippedBadge.name} 
                            className="w-16 h-16"
                          />
                          <div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded" 
                            style={{ backgroundColor: equippedBadge.tierColor }}>
                            {equippedBadge.tier.toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-300">{equippedBadge.name}</h4>
                          <p className="text-sm text-emerald-200">{equippedBadge.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {user && <ProgressStats userId={user.uid} />}
              </div>
            )}

            {active === "edit" && (
              <div>
                <h2 className="text-2xl font-bold text-emerald-700 mb-4">
                  Edit Profile
                </h2>
                <p className="text-emerald-700">Profile editing form goes here.</p>
              </div>
            )}

            {active === "achievements" && (
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-2 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-emerald-700">
                    Achievements
                  </h2>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="text-emerald-700 whitespace-nowrap">
                      <span className="font-bold">Total Points:</span> {totalPoints}
                    </div>
                    <select 
                      className="w-full sm:w-auto bg-slate-700 text-emerald-700 rounded px-3 py-1.5 text-sm"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories</option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="javascript">JavaScript</option>
                    </select>
                    <label className="flex items-center gap-2 text-emerald-700 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={showUnearned}
                        onChange={(e) => setShowUnearned(e.target.checked)}
                        className="form-checkbox text-emerald-700"
                      />
                      Show Unearned
                    </label>
                  </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                          width: `${(achievements.filter(a => a.isEarned).length / achievements.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                  <div className="bg-slate-800 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-transform">
                    <h3 className="text-base sm:text-lg font-semibold text-emerald-300 mb-2">
                      Badges Progress
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <p className="text-3xl font-bold text-emerald-400">
                        {badges.filter(b => b.isEarned).length}
                      </p>
                      <p className="text-lg text-emerald-300">/ {badges.length}</p>
                    </div>
                    <div className="mt-2 h-2 bg-slate-700 rounded overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-500"
                        style={{ 
                          width: `${(badges.filter(b => b.isEarned).length / badges.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {achievements
                    .filter(a => selectedCategory === 'all' || (a.type || '').toLowerCase() === selectedCategory)
                    .filter(a => showUnearned || a.isEarned)
                    .map((achievement) => (
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
                            {!achievement.isEarned && achievement.progress.max > 1 && (
                              <div className="mt-2">
                                <div className="h-2 bg-slate-700 rounded overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 transition-all duration-500"
                                    style={{ width: `${achievement.progressPercentage}%` }}
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

            {active === "badges" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-blue-400">
                    Badges
                  </h2>
                  <select 
                    className="w-full sm:w-auto bg-slate-700 text-blue-300 rounded px-3 py-1.5 text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="javascript">JavaScript</option>
                  </select>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-2">Equipped Badge</h3>
                  {equippedBadge ? (
                    <div className="bg-slate-800 p-4 rounded-lg inline-block relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10" style={{ 
                        backgroundColor: equippedBadge.tierColor,
                        backgroundImage: `linear-gradient(45deg, ${equippedBadge.tierColor} 25%, transparent 25%, transparent 50%, ${equippedBadge.tierColor} 50%, ${equippedBadge.tierColor} 75%, transparent 75%, transparent)`,
                        backgroundSize: '20px 20px'
                      }}></div>
                      <div className="relative flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={equippedBadge.icon} 
                            alt={equippedBadge.name} 
                            className="w-16 h-16 transform hover:scale-110 transition-transform"
                          />
                          <div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded" 
                            style={{ backgroundColor: equippedBadge.tierColor }}>
                            {equippedBadge.tier.toUpperCase()}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-emerald-700">{equippedBadge.name}</h4>
                          <p className="text-sm text-emerald-700">{equippedBadge.description}</p>
                          <p className="text-xs text-emerald-700 mt-1">Type: {equippedBadge.type || 'General'}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-emerald-700">No badge equipped</p>
                  )}
                </div>

                {Object.entries(groupedBadges)
                  .filter(([type]) => selectedCategory === 'all' || type.toLowerCase() === selectedCategory)
                  .map(([type, typeBadges]) => (
                    <div key={type} className="mb-8">
                      <h3 className="text-lg font-semibold text-emerald-700 mb-4 capitalize">
                        {type} Badges
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                        {typeBadges.map((badge) => (
                          <div 
                            key={badge.id} 
                            className={`bg-slate-800 p-3 sm:p-4 rounded-lg relative transform hover:scale-105 transition-transform ${
                              badge.isEarned ? '' : 'opacity-75'
                            }`}
                          >
                            <div className="absolute inset-0 opacity-10 rounded-lg" style={{ 
                              backgroundColor: badge.tierColor,
                              backgroundImage: badge.isEarned ? `linear-gradient(45deg, ${badge.tierColor} 25%, transparent 25%, transparent 50%, ${badge.tierColor} 50%, ${badge.tierColor} 75%, transparent 75%, transparent)` : 'none',
                              backgroundSize: '20px 20px'
                            }}></div>
                            <div className="relative flex items-center gap-3">
                              <div className="relative">
                                <img 
                                  src={badge.icon} 
                                  alt={badge.name} 
                                  className={`w-12 h-12 transform hover:scale-110 transition-transform ${!badge.isEarned && 'grayscale'}`}
                                />
                                <div className="absolute -top-1 -right-1 px-2 py-0.5 text-xs rounded" 
                                  style={{ backgroundColor: badge.tierColor }}>
                                  {badge.tier.toUpperCase()}
                                </div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-emerald-700">{badge.name}</h4>
                                <p className="text-sm text-emerald-700">{badge.description}</p>
                                {badge.isEarned ? (
                                  <>
                                    <p className="text-xs text-emerald-700 mt-1">
                                      Earned: {new Date(badge.dateEarned).toLocaleDateString()}
                                    </p>
                                    <button
                                      onClick={async () => {
                                        try {
                                          // Unequip previous badge if any
                                          if (equippedBadge?.id) {
                                            const oldBadgeRef = ref(db, 'badges/' + equippedBadge.id);
                                            await update(oldBadgeRef, { isEquipped: false });
                                          }
                                          
                                          // Equip new badge
                                          const newBadgeRef = ref(db, 'badges/' + badge.id);
                                          await update(newBadgeRef, { isEquipped: true });
                                          
                                          setEquippedBadge(badge);
                                          toast.success('Badge equipped successfully!');
                                        } catch (error) {
                                          console.error("Error equipping badge:", error);
                                          toast.error('Failed to equip badge');
                                        }
                                      }}
                                      className={`mt-2 px-3 py-1 rounded transition-colors ${
                                        equippedBadge?.id === badge.id
                                          ? 'bg-emerald-800 text-white cursor-not-allowed'
                                          : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                                      }`}
                                      disabled={equippedBadge?.id === badge.id}
                                    >
                                      {equippedBadge?.id === badge.id ? 'Equipped' : 'Equip'}
                                    </button>
                                  </>
                                ) : (
                                  <div className="mt-2">
                                    <p className="text-xs text-emerald-700">Requirements:</p>
                                    <ul className="text-xs text-blue-200 list-disc list-inside">
                                      {badge.requiredAchievements.map((req, idx) => (
                                        <li key={idx}>{req}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}

export default Profile;