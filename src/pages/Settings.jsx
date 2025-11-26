import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { ref, update, get } from "firebase/database";
import { updateProfile } from "firebase/auth";
import { toast } from 'react-toastify';

function Settings() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetConfirmation, setResetConfirmation] = useState("");
  const confirmationText = "reset my progress";

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setDisplayName(firebaseUser.displayName || "");
        setEmail(firebaseUser.email || "");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: displayName,
      });

      // Update Realtime Database
      const userRef = ref(db, `users/${user.uid}`);
      await update(userRef, {
        displayName: displayName,
        updatedAt: Date.now(),
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetProgress = async () => {
    if (!user) return;

    // Check if confirmation text matches
    if (resetConfirmation !== confirmationText) {
      toast.error(`Please type "${confirmationText}" to confirm`);
      return;
    }

    setResetLoading(true);
    try {
      const userRef = ref(db, `users/${user.uid}`);
      
      // Reset all progress data
      await update(userRef, {
        points: 0,
        exercisesCompleted: 0,
        quizzesCompleted: 0,
        quizScore: 0,
        lessonsCompleted: 0,
        updatedAt: Date.now(),
      });

      // Clear progress in Firebase
      const progressRef = ref(db, `users/${user.uid}/progress`);
      const progressSnapshot = await get(progressRef);
      
      if (progressSnapshot.exists()) {
        // Delete all progress data
        await update(ref(db, `users/${user.uid}`), {
          progress: null,
        });
      }

      toast.success("Progress reset successfully! You can now retry all exercises.");
      setShowResetModal(false);
      setResetConfirmation("");
    } catch (error) {
      console.error("Error resetting progress:", error);
      toast.error("Failed to reset progress: " + error.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-emerald-600 mb-8">Settings</h1>

        {/* Main Grid Container - Side by side on large screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Edit Profile Section */}
          <div className="bg-slate-900 rounded-lg shadow-lg p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-emerald-600 mb-6">Edit Profile</h2>
            
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-800 text-white border border-slate-700 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="Enter your display name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Email (Read-only)
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-2 bg-slate-800 text-gray-400 border border-slate-700 rounded-lg cursor-not-allowed opacity-50"
                />
                <p className="text-xs text-gray-400 mt-2">Email cannot be changed here. Contact support to change your email.</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>

          {/* Reset Progress Section */}
          <div className="bg-slate-900 rounded-lg shadow-lg p-6 sm:p-8">
            <div className="flex flex-col h-full">
              <h2 className="text-2xl font-bold text-orange-600 mb-2">Reset Progress</h2>
              <p className="text-gray-300 mb-4">
                Reset all your progress to start over. This will:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mb-4 text-sm flex-1">
                <li>Clear all completed exercises</li>
                <li>Reset quiz scores</li>
                <li>Reset points and achievements</li>
                <li>Allow you to retry all exercises</li>
              </ul>
              <p className="text-red-400 text-sm mb-4">
                ⚠️ Warning: This action cannot be undone!
              </p>
              <button
                onClick={() => setShowResetModal(true)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
              >
                Reset All Progress
              </button>
            </div>
          </div>
        </div>

        {/* Reset Confirmation Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reset Progress?</h3>
              <p className="text-gray-600 mb-4">
                This action cannot be undone. All your progress, achievements, and quiz scores will be permanently deleted.
              </p>
              <p className="text-gray-700 font-semibold mb-3">
                Type <span className="text-red-600">"{confirmationText}"</span> to confirm:
              </p>
              <input
                type="text"
                value={resetConfirmation}
                onChange={(e) => setResetConfirmation(e.target.value)}
                placeholder={confirmationText}
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowResetModal(false);
                    setResetConfirmation("");
                  }}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetProgress}
                  disabled={resetLoading || resetConfirmation !== confirmationText}
                  className="flex-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resetLoading ? "Resetting..." : "Reset Progress"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Current User Info (Debug) */}
        {user && (
          <div className="mt-8 bg-slate-800 rounded-lg p-4">
            <p className="text-xs text-gray-400">
              Logged in as: <span className="text-emerald-400">{user.email}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Settings;
