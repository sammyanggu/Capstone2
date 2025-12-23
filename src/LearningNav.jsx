import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function LearningNav() {
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth();
    const [dropdown, setDropdown] = useState(false);

    const handleSignOut = async () => {
        try {
            await logout();
            navigate('/');
            setDropdown(false);
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <nav className="bg-slate-900 fixed top-0 left-0 right-0 shadow-lg z-[100]">
            <div className="w-full px-3 sm:px-4 lg:px-8 py-2">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo - Left Side */}
                    <button onClick={() => navigate('/')} className="flex items-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide bg-gradient-to-r from-emerald-700 to-emerald-400 bg-clip-text text-transparent">
                            <span className="hidden sm:inline">Learn<span className="text-emerald-500">Dev</span></span>
                            <span className="sm:hidden">L<span className="text-emerald-500">D</span></span>
                        </span>
                    </button>

                    {/* Navigation Links and Controls - Right Side */}
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 flex-shrink-0">
                        {currentUser && (
                            <>
                                {/* Desktop Navigation - Learning Only */}
                                <div className="hidden lg:flex items-center gap-8">
                                    <Link to="/docs" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap">Docs</Link>
                                    <Link to="/exercises" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap">Exercises</Link>
                                    <Link to="/lessons" className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap">Lessons</Link>
                                    <button 
                                        onClick={() => navigate('/learning')}
                                        className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors whitespace-nowrap"
                                    >
                                        ← Back to Learning Hub
                                    </button>
                                </div>

                                {/* Mobile Navigation Icons */}
                                <div className="lg:hidden flex items-center gap-3">
                                    <button 
                                        onClick={() => navigate('/docs')}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
                                        title="Documentation"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/exercises')}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
                                        title="Exercises"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 7v10M18 7v10M8 12h8M4 9v6M20 9v6" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/lessons')}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
                                        title="Lessons"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/learning')}
                                        className="p-2 hover:bg-slate-800 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors"
                                        title="Back to Learning Hub"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* User Profile Dropdown */}
                                <div className="relative">
                                    <button onClick={() => setDropdown(!dropdown)} className="flex items-center focus:outline-none cursor-pointer">
                                        <img
                                            src={currentUser.photoURL || '/react.svg'}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full border-2 border-emerald-700 shadow cursor-pointer"
                                        />
                                    </button>
                                    {dropdown && (
                                        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-slate-800 rounded-lg shadow-xl py-2 z-[110] border border-slate-700">
                                            <div className="px-4 py-3 border-b border-slate-700">
                                                <p className="text-sm font-medium text-emerald-400">{currentUser.displayName || 'User'}</p>
                                                <p className="text-xs text-emerald-400 mt-1 truncate">{currentUser.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <button
                                                    onClick={() => { setDropdown(false); window.location.href = '/profile'; }}
                                                    className="w-full px-4 py-2 text-sm text-left text-emerald-400 hover:bg-slate-700/50 hover:text-emerald-300 transition-colors flex items-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                    My Profile
                                                </button>
                                            </div>
                                            <div className="border-t border-slate-700 pt-2">
                                                <button
                                                    onClick={handleSignOut}
                                                    className="w-full px-4 py-2 text-sm text-left text-emerald-400 hover:bg-slate-700/50 hover:text-emerald-300 transition-colors flex items-center gap-2"
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
                {dropdown && (
                    <div 
                        className="fixed inset-0 bg-black/10 z-[90]" 
                        onClick={() => setDropdown(false)} 
                    />
                )}
            </div>
        </nav>
    );
}

export default LearningNav;
