import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { ref, get, update } from "firebase/database";
import { toast } from 'react-toastify';

function Notifications() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        await fetchNotifications(firebaseUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchNotifications = async (userId) => {
    try {
      setLoading(true);
      const notificationsRef = ref(db, 'notifications');
      const snapshot = await get(notificationsRef);
      const notifData = [];

      if (snapshot.exists()) {
        snapshot.forEach(childSnapshot => {
          const data = childSnapshot.val();
          if (data.userId === userId) {
            notifData.push({
              id: childSnapshot.key,
              ...data,
              timestamp: data.timestamp || new Date().toISOString()
            });
          }
        });
      }

      // Sort by timestamp descending (newest first)
      notifData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setNotifications(notifData);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      const notifRef = ref(db, `notifications/${notificationId}`);
      await update(notifRef, { is_read: true });
      
      // Update local state
      setNotifications(notifications.map(notif =>
        notif.id === notificationId ? { ...notif, is_read: true } : notif
      ));
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast.error("Failed to update notification");
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifs = notifications.filter(n => !n.is_read);
      
      for (const notif of unreadNotifs) {
        const notifRef = ref(db, `notifications/${notif.id}`);
        await update(notifRef, { is_read: true });
      }

      setNotifications(notifications.map(notif => ({ ...notif, is_read: true })));
      toast.success("All notifications marked as read");
    } catch (error) {
      console.error("Error marking all as read:", error);
      toast.error("Failed to update notifications");
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-20 pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-emerald-400">Notifications</h1>
          {notifications.filter(n => !n.is_read).length > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent"></div>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-semibold text-slate-300 mb-2">No Notifications Yet</h2>
            <p className="text-slate-400">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all ${
                  notification.is_read
                    ? 'bg-slate-800 border-l-slate-600 hover:bg-slate-700/50'
                    : 'bg-slate-800 border-l-emerald-500 hover:bg-slate-700/70'
                }`}
                onClick={() => !notification.is_read && markAsRead(notification.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-emerald-400">
                        {notification.title || 'Notification'}
                      </h3>
                      {!notification.is_read && (
                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-slate-300 mb-2">
                      {notification.message || notification.body || 'No message content'}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {formatDate(notification.timestamp)}
                    </p>
                  </div>
                  {!notification.is_read && (
                    <div className="ml-4 w-3 h-3 bg-emerald-500 rounded-full flex-shrink-0 mt-1"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notifications;
