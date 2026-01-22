import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuth } from './AuthContext';

function GameNav() {
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
            <div className="w-full px-3 sm:px-4 lg:px-8 py-2 max-w-7xl mx-auto">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    {/* Logo - Left Side */}
                    <button onClick={() => navigate('/')} className="flex items-center flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-wide bg-gradient-to-r from-purple-700 to-purple-400 bg-clip-text text-transparent">
                            <span className="hidden sm:inline">Learn<span className="text-purple-500">Dev</span></span>
                            <span className="sm:hidden">L<span className="text-purple-500">D</span></span>
                        </span>
                    </button>

                    {/* Navigation Links and Controls - Right Side */}
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 flex-shrink-0">
                        {currentUser && (
                            <>
                                {/* Desktop Navigation - Games Only */}
                                <div className="hidden lg:flex items-center gap-8">
                                    <Link to="/games" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap">Play</Link>
                                    <Link to="/games/leaderboard" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap">Leaderboard</Link>
                                    <Link to="/games/achievements" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap">Achievements</Link>
                                    <Link to="/games/badges" className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap">Badges</Link>
                                    <button 
                                        onClick={() => navigate('/games')}
                                        className="text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap"
                                    >
                                        ← Back to Games Hub
                                    </button>
                                </div>

                                {/* Mobile Navigation Icons with Labels */}
                                <div className="lg:hidden flex items-center gap-2 overflow-x-auto">
                                    <button 
                                        onClick={() => navigate('/games')}
                                        className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap text-sm group"
                                        title="Play"
                                    >
                                        <div className="text-cyan-400 text-lg flex items-center justify-center flex-shrink-0">🎮</div>
                                        <span className="hidden sm:inline text-cyan-400 group-hover:text-cyan-300">Play</span>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/games/leaderboard')}
                                        className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap text-sm group"
                                        title="Leaderboard"
                                    >
                                        <div className="w-5 h-5 text-orange-400 text-xl flex items-center justify-center flex-shrink-0">🏆</div>
                                        <span className="hidden sm:inline text-orange-400 group-hover:text-orange-300">Rank</span>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/games/achievements')}
                                        className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap text-sm group"
                                        title="Achievements"
                                    >
                                        <div className="w-5 h-5 text-pink-400 text-xl flex items-center justify-center flex-shrink-0">⭐</div>
                                        <span className="hidden sm:inline text-yellow-400 group-hover:text-yellow-300">Achieve</span>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/games/badges')}
                                        className="flex items-center gap-2 px-3 py-2 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap text-sm group"
                                        title="Badges"
                                    >
                                        <div className="w-5 h-5 text-pink-400 text-lg flex items-center justify-center flex-shrink-0">🎖️</div>
                                        <span className="hidden sm:inline text-pink-400 group-hover:text-pink-300">Badges</span>
                                    </button>
                                    <button 
                                        onClick={() => navigate('/games')}
                                        className="flex items-center gap-1 px-3 py-2 hover:bg-slate-800 rounded-lg text-purple-400 hover:text-purple-300 transition-colors whitespace-nowrap text-sm"
                                        title="Back to Games Hub"
                                    >
                                        <span className="text-lg">←</span>
                                        <span className="hidden sm:inline">Back</span>
                                    </button>
                                </div>

                                {/* User Profile Dropdown */}
                                <div className="relative">
                                    <button onClick={() => setDropdown(!dropdown)} className="flex items-center focus:outline-none cursor-pointer">
                                        <img
                                            src={currentUser.photoURL || '/react.svg'}
                                            alt="Profile"
                                            className="w-9 h-9 rounded-full border-2 border-purple-700 shadow cursor-pointer"
                                        />
                                    </button>
                                    {dropdown && (
                                        <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-slate-800 rounded-lg shadow-xl py-2 z-[110] border border-slate-700">
                                            <div className="px-4 py-3 border-b border-slate-700">
                                                <p className="text-sm font-medium text-purple-400">{currentUser.displayName || 'User'}</p>
                                                <p className="text-xs text-purple-400 mt-1 truncate">{currentUser.email}</p>
                                            </div>
                                            <div className="py-2">
                                                <button
                                                    onClick={() => { setDropdown(false); navigate('/games/profile'); }}
                                                    className="w-full px-4 py-2 text-sm text-left text-purple-400 hover:bg-slate-700/50 hover:text-purple-300 transition-colors flex items-center gap-2"
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
                                                    className="w-full px-4 py-2 text-sm text-left text-purple-400 hover:bg-slate-700/50 hover:text-purple-300 transition-colors flex items-center gap-2"
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

export default GameNav;
