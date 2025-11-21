import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function Nav({ user, onSignOut }) {
    const location = useLocation();
    const [dropdown, setDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost/capstone-backend/api/notifications.php?userId=${user.uid}`)
                .then(response => {
                    setNotifications(response.data || []);
                })
                .catch(error => console.error("Error fetching notifications:", error));
        }
    }, [user]);

    const handleProfileClick = () => setDropdown(!dropdown);

    const handleSignOutClick = async () => {
        setDropdown(false);
        await onSignOut();
        navigate('/');
    };

    const unreadNotifications = notifications.filter(n => !n.is_read).length;

    return (
        <nav className="bg-slate-800 fixed top-0 left-0 right-0 shadow-lg z-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-14">
                    {/* Back button for small screens and logo for large screens */}
                    <div className="flex items-center gap-3">
                        {location.pathname !== '/' && (
                            <button 
                                onClick={() => window.history.back()}
                                className="sm:hidden p-2 -ml-2 text-slate-200 hover:text-fuchsia-400 focus:outline-none transition-colors"
                                aria-label="Go back"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}
                        <Link to="/" className="hidden sm:block font-bold text-xl text-fuchsia-500 hover:text-fuchsia-400 transition-colors tracking-wide">
                            LearnDev
                        </Link>
                    </div>

                    {/* Navigation for medium and large screens */}
                    <div className="hidden sm:flex items-center gap-6">
                        {user && (
                            <>
                                <Link to="/docs" className="text-slate-200 hover:text-fuchsia-400 transition-colors">Docs</Link>
                                <Link to="/lessons" className="text-slate-200 hover:text-fuchsia-400 transition-colors">Lessons</Link>
                            </>
                        )}

                        {!user ? (
                            <Link to="/signin" className="btn1h lg:p-2">Sign In</Link>
                        ) : (
                            <>
                                <div className="relative">
                                    <button 
                                        onClick={() => setShowNotifications(!showNotifications)}
                                        className="text-slate-200 hover:text-fuchsia-400 focus:outline-none"
                                    >
                                        <div className="relative">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                            </svg>
                                            {unreadNotifications > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs flex items-center justify-center text-white">
                                                    {unreadNotifications}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                    {showNotifications && (
                                        <div className="dd mt-2">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification, index) => (
                                                    <div key={index} className="p-2 hover:bg-slate-100">
                                                        {notification.message}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-2 text-gray-500">No notifications</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="relative">
                                    <button onClick={handleProfileClick} className="flex items-center focus:outline-none cursor-pointer">
                                        <img
                                            src={user.photoURL || '/src/assets/react.svg'}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full border-2 border-fuchsia-400 shadow"
                                        />
                                    </button>
                                    {dropdown && (
                                        <div className="dd">
                                            <button
                                                onClick={() => { setDropdown(false); navigate('/profile'); }}
                                                className="ddbtn"
                                            >
                                                My Profile
                                            </button>
                                            <button
                                                onClick={() => { setDropdown(false); navigate('/profile/settings'); }}
                                                className="ddbtn"
                                            >
                                                Settings
                                            </button>
                                            <button
                                                onClick={handleSignOutClick}
                                                className="ddbtn"
                                            >
                                                Sign Out
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile navigation */}
                    <div className="sm:hidden flex items-center gap-4">
                        {user && (
                            <>
                                <div className="flex items-center gap-4">
                                    <Link to="/docs" className="text-slate-200 hover:text-fuchsia-400">Docs</Link>
                                    <Link to="/lessons" className="text-slate-200 hover:text-fuchsia-400">Lessons</Link>
                                </div>
                                <div className="relative">
                                    <button onClick={handleProfileClick} className="flex items-center focus:outline-none cursor-pointer">
                                        <img
                                            src={user.photoURL || '/src/assets/react.svg'}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full border-2 border-fuchsia-400 shadow"
                                        />
                                    </button>
                                    {dropdown && (
                                        <div className="dd absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg border border-slate-700 focus:outline-none z-50">
                                            <div className="p-3 border-b border-slate-700">
                                                <p className="text-slate-200 font-medium">{user.displayName || 'User'}</p>
                                            </div>
                                            <div className="py-1">
                                                <Link 
                                                    to="/profile" 
                                                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700" 
                                                    onClick={() => setDropdown(false)}
                                                >
                                                    Progress
                                                </Link>
                                                <Link 
                                                    to="/profile/achievements" 
                                                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700" 
                                                    onClick={() => setDropdown(false)}
                                                >
                                                    Achievements
                                                </Link>
                                                <Link 
                                                    to="/profile/badges" 
                                                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700" 
                                                    onClick={() => setDropdown(false)}
                                                >
                                                    Badges
                                                </Link>
                                                <Link 
                                                    to="/exercises" 
                                                    className="block px-4 py-2 text-sm text-slate-200 hover:bg-slate-700" 
                                                    onClick={() => setDropdown(false)}
                                                >
                                                    Exercises
                                                </Link>
                                            </div>
                                            <div className="py-1 border-t border-slate-700">
                                                <button 
                                                    onClick={handleSignOutClick}
                                                    className="block w-full text-left px-4 py-2 text-sm text-slate-200 hover:bg-slate-700"
                                                >
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                        {!user && (
                            <Link to="/signin" className="btn1h px-4 py-2 text-white bg-fuchsia-600 hover:bg-fuchsia-700 rounded-md transition-colors">Sign In</Link>
                        )}
                    </div>
                </div>

                {/* Backdrop for dropdown */}
                {dropdown && (
                    <div className="fixed inset-0 bg-transparent z-40" onClick={() => setDropdown(false)} />
                )}
            </div>
        </nav>
    );
}

export default Nav;