import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import brainLogo from './assets/brain_icon.svg';

function Nav({ user, onSignOut }) {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost/capstone-backend/api/notifications.php?userId=${user.uid}`)
                .then(response => {
                    setNotifications(response.data || []);
                })
                .catch(error => console.error("Error fetching notifications:", error));
        }
    }, [user]);

    const handleProfileClick = () => {
        setShowNotifications(false);
        setDropdown(!dropdown);
    };

    const handleNotificationsClick = () => {
        setDropdown(false);
        setShowNotifications(!showNotifications);
    };

    const handleSignOutClick = async () => {
        setDropdown(false);
        await onSignOut();
        navigate('/');
    };

    const unreadNotifications = notifications.filter(n => !n.is_read).length;

    return (
        <nav className="bg-slate-800 fixed top-0 left-0 right-0 shadow-lg z-[100]">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-start">
                        <Link to="/" className="flex items-center gap-2 sm:gap-3 mr-4 sm:mr-6 lg:mr-8">
                            <img src={brainLogo} alt="LearnDev Brain Logo" className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9" />
                            <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">
                                Learn<span className="text-sky-500">Dev</span>
                                <span className="text-sky-500 ml-0.5">&gt;</span>
                            </span>
                        </Link>
                    </div>

                    {/* Navigation Links and Controls */}
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                        {user && (
                            <>
                                <Link to="/docs" className="text-xs sm:text-sm lg:text-md font-bold text-blue-500 hover:text-sky-400 transition-colors whitespace-nowrap">Docs</Link>
                                <Link to="/exercises" className="text-xs sm:text-sm lg:text-md font-bold text-blue-500 hover:text-sky-400 transition-colors whitespace-nowrap">Exercises</Link>
                                <Link to="/lessons" className="text-xs sm:text-sm lg:text-md font-bold text-blue-500 hover:text-sky-400 transition-colors whitespace-nowrap">Lessons</Link>
                            </>
                        )}

                        {!user ? (
                            <Link to="/signin" className="ml-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm sm:text-base font-semibold transition-all duration-200">Sign In</Link>
                        ) : (
                            <>
                                {/* Notifications */}
                                <div className="relative">
                                    <button 
                                        onClick={handleNotificationsClick}
                                        className="text-slate-200 hover:text-sky-500 focus:outline-none cursor-pointer"
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
                                        <div className="absolute right-0 mt-2 w-72 md:w-96 bg-slate-800 rounded-lg shadow-xl py-2 border border-slate-700 z-[110]">
                                            <div className="max-h-[calc(100vh-6rem)] overflow-y-auto">
                                                {notifications.length > 0 ? (
                                                    notifications.map((notification, index) => (
                                                        <div key={index} className="p-3 hover:bg-slate-700/50 border-b border-slate-700 last:border-0 text-sm text-blue-300">
                                                            {notification.message}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-3 text-sm text-blue-300">No notifications</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* User Profile */}
                                <div className="relative">
                                    <button onClick={handleProfileClick} className="flex items-center focus:outline-none cursor-pointer">
                                        <img
                                            src={user.photoURL || '/src/assets/react.svg'}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full border-2 border-blue-400 shadow cursor-pointer"
                                        />
                                    </button>
                                    {dropdown && (
                                        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-slate-800 rounded-lg shadow-xl py-2 z-[110] border border-slate-700">
                                            <div className="px-4 py-3 border-b border-slate-700">
                                                <p className="text-sm font-medium text-blue-400">{user.displayName || 'User'}</p>
                                                <p className="text-xs text-blue-300 mt-1 truncate">{user.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <button
                                                    onClick={() => { setDropdown(false); navigate('/profile'); }}
                                                    className="w-full px-4 py-2 text-sm text-left text-blue-400 hover:bg-slate-700/50 hover:text-sky-400 transition-colors flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    My Profile
                                                </button>
                                                <button
                                                    onClick={() => { setDropdown(false); navigate('/profile/settings'); }}
                                                    className="w-full px-4 py-2 text-sm text-left text-blue-400 hover:bg-slate-700/50 hover:text-sky-400 transition-colors flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Settings
                                                </button>
                                            </div>
                                            <div className="border-t border-slate-700 pt-2">
                                                <button
                                                    onClick={handleSignOutClick}
                                                    className="w-full px-4 py-2 text-sm text-left text-blue-400 hover:bg-slate-700/50 hover:text-sky-400 transition-colors flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Backdrop */}
                {(dropdown || showNotifications) && (
                    <div 
                        className="fixed inset-0 bg-black/10 z-[90]" 
                        onClick={() => {
                            setDropdown(false);
                            setShowNotifications(false);
                        }} 
                    />
                )}
            </div>
        </nav>
    );
}

export default Nav;