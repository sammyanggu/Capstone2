import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database';
import { db } from './firebase';
import { useAuth } from './AuthContext';
import AuthModal from './components/AuthModal';

function Nav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser, logout } = useAuth();
    const [dropdown, setDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showLearnDevMenu, setShowLearnDevMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    
    // Check if we're in a specific doc tutorial page
    const isInDocTutorial = location.pathname.includes('/docs/') && location.pathname !== '/docs/';

    // Close mobile menu when changing routes
    useEffect(() => {
        setShowMobileMenu(false);
        setShowLearnDevMenu(false);
    }, [location.pathname]);

    // Fetch notifications from Realtime Database
    useEffect(() => {
        if (currentUser) {
            const notificationsRef = ref(db, 'notifications');
            
            const unsubscribe = onValue(notificationsRef, (snapshot) => {
                const notifData = [];
                if (snapshot.exists()) {
                    snapshot.forEach(childSnapshot => {
                        const data = childSnapshot.val();
                        if (data.userId === currentUser.uid) {
                            notifData.push({
                                id: childSnapshot.key,
                                ...data
                            });
                        }
                    });
                }
                setNotifications(notifData);
            });

            return () => unsubscribe();
        }
    }, [currentUser]);

    const closeAllMenus = () => {
        setDropdown(false);
        setShowNotifications(false);
        setShowMobileMenu(false);
    };

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/');
            closeAllMenus();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    const handleMobileMenuClick = () => {
        setDropdown(false);
        setShowNotifications(false);
        setShowMobileMenu(!showMobileMenu);
    };

    const handleProfileClick = () => {
        setShowMobileMenu(false);
        setShowNotifications(false);
        setDropdown(!dropdown);
    };

    const handleNotificationsClick = () => {
        setShowMobileMenu(false);
        setDropdown(false);
        setShowNotifications(!showNotifications);
    };

    const handleSignOutClick = async () => {
        closeAllMenus();
        await handleSignOut();
    };

    const unreadNotifications = notifications.filter(n => !n.is_read).length;

    return (
        <nav className="bg-slate-900 fixed top-0 left-0 right-0 shadow-lg z-[100]">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-2 py-2">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo */}
                    <div className="flex-1 flex items-center justify-start">
                        <div className="flex items-center gap-4">
                            <Link to="/" className="flex items-center mr-4 sm:mr-6 lg:mr-8">
                                <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent">
                                    <span className="hidden sm:inline">Learn<span className="text-emerald-500">Dev</span></span>
                                    <span className="sm:hidden">L<span className="text-emerald-500">D</span></span>
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Navigation Links and Controls */}
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
                        {currentUser && (
                            <>
                                {/* Desktop Navigation */}
                                <div className="hidden sm:flex items-center gap-4 sm:gap-6 lg:gap-8">
                                    <Link to="/docs" className="text-lg sm:text-sm lg:text-lg font-bold text-emerald-700 hover:text-emerald-700 transition-colors whitespace-nowrap">Docs</Link>
                                    <Link to="/exercises" className="text-lg sm:text-sm lg:text-lg font-bold text-emerald-700 hover:text-emerald-700 transition-colors whitespace-nowrap">Exercises</Link>
                                    <Link to="/lessons" className="text-lg sm:text-sm lg:text-lg font-bold text-emerald-700 hover:text-emerald-700 transition-colors whitespace-nowrap">Lessons</Link>
                                </div>
                                
                                {/* Mobile Navigation Icons */}
                                <div className="sm:hidden flex items-center gap-4">
                                    <button 
                                        onClick={() => navigate('/docs')}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-emerald-700 hover:text-emerald-500 transition-colors"
                                        title="Documentation"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/exercises')}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-emerald-700 hover:text-emerald-500 transition-colors"
                                        title="Exercises"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7v10M18 7v10M8 12h8M4 9v6M20 9v6" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/lessons')}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-emerald-700 hover:text-emerald-500 transition-colors"
                                        title="Lessons"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </>
                        )}
                        {!currentUser ? (
                            <button
                                onClick={() => setShowAuthModal(true)}
                                className="ml-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white text-sm sm:text-base font-semibold transition-all duration-200"
                            >
                                Sign In
                            </button>
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
                                                        <div key={index} className="p-3 hover:bg-slate-700/50 border-b border-slate-700 last:border-0 text-sm text-emerald-700">
                                                            {notification}
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="p-3 text-sm text-emerald-700">No notifications</div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* User Profile */}
                                <div className="relative">
                                    <button onClick={handleProfileClick} className="flex items-center focus:outline-none cursor-pointer">
                                        <img
                                            src={currentUser.photoURL || '/react.svg'}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full border-2 border-emerald-700 shadow cursor-pointer"
                                        />
                                    </button>
                                    {dropdown && (
                                        <div className={`absolute right-0 mt-2 w-48 sm:w-56 bg-slate-800 rounded-lg shadow-xl py-2 z-[110] border border-slate-700 transition-all duration-200 transform origin-top ${
                                            dropdown 
                                                ? 'opacity-100 scale-100' 
                                                : 'opacity-0 scale-95 pointer-events-none'
                                        }`}>
                                            <div className="px-4 py-3 border-b border-slate-700">
                                                <p className="text-sm font-medium text-emerald-700">{currentUser.displayName || 'User'}</p>
                                                <p className="text-xs text-emerald-700 mt-1 truncate">{currentUser.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <button
                                                    onClick={() => { setDropdown(false); navigate('/profile'); }}
                                                    className="w-full px-4 py-2 text-sm text-left text-emerald-700 hover:bg-slate-700/50 hover:text-emerald-700 transition-colors flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    My Profile
                                                </button>
                                                <button
                                                    onClick={() => { setDropdown(false); navigate('/profile/settings'); }}
                                                    className="w-full px-4 py-2 text-sm text-left text-emerald-700 hover:bg-slate-700/50 hover:text-emerald-700 transition-colors flex items-center gap-2"
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
                                                    className="w-full px-4 py-2 text-sm text-left text-emerald-700 hover:bg-slate-700/50 hover:text-emerald-700 transition-colors flex items-center gap-2"
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

                {/* Backdrop for dropdowns */}
                {(dropdown || showNotifications || showMobileMenu) && (
                    <div 
                        className="fixed inset-0 bg-black/10 z-[90]" 
                        onClick={closeAllMenus} 
                    />
                )}
            </div>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => setShowAuthModal(false)}
                onSuccess={(userData) => {
                    setShowAuthModal(false);
                    // Force a page reload to ensure all states are updated
                    window.location.reload();
                }}
            />

            {/* Documentation Sidebar */}
            {isInDocTutorial && (
                <>
                    {/* Backdrop for sidebar */}
                    {showLearnDevMenu && (
                        <div 
                            className="fixed inset-0 bg-black/20 z-[45]" 
                            onClick={() => setShowLearnDevMenu(false)}
                        />
                    )}
                    
                    {/* Sidebar */}
                    <div className={`fixed top-[3.5rem] left-0 w-64 h-[calc(100vh-3.5rem)] bg-slate-900 z-[50] transform transition-transform duration-300 ease-in-out ${
                        showLearnDevMenu ? 'translate-x-0' : '-translate-x-full'
                    }`}>
                        <nav className="px-4 py-4">
                            <div className="space-y-4">
                                <div>
                                    <h2 className="text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-3">Getting Started</h2>
                                    <ul className="space-y-2 text-sm text-emerald-700">
                                        <li><a href="#html-introduction" className="block py-1 hover:text-emerald-500 transition-colors">Introduction</a></li>
                                        <li><a href="#html-editors" className="block py-1 hover:text-emerald-500 transition-colors">HTML Editors</a></li>
                                        <li><a href="#basic-examples" className="block py-1 hover:text-emerald-500 transition-colors">Basic Examples</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-3">Core Concepts</h2>
                                    <ul className="space-y-2 text-sm text-emerald-700">
                                        <li><a href="#elements-tags" className="block py-1 hover:text-emerald-500 transition-colors">Elements and Tags</a></li>
                                        <li><a href="#attributes" className="block py-1 hover:text-emerald-500 transition-colors">Attributes</a></li>
                                        <li><a href="#headings" className="block py-1 hover:text-emerald-500 transition-colors">Headings</a></li>
                                        <li><a href="#paragraphs" className="block py-1 hover:text-emerald-500 transition-colors">Paragraphs</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 className="text-emerald-500 text-xs font-semibold uppercase tracking-wider mb-3">Advanced Topics</h2>
                                    <ul className="space-y-2 text-sm text-emerald-700">
                                        <li><a href="#forms" className="block py-1 hover:text-emerald-500 transition-colors">Forms</a></li>
                                        <li><a href="#tables" className="block py-1 hover:text-emerald-500 transition-colors">Tables</a></li>
                                        <li><a href="#semantic" className="block py-1 hover:text-emerald-500 transition-colors">Semantic HTML</a></li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                </>
            )}
        </nav>
    );
}

export default Nav;