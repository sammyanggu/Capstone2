import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Nav({ user, onSignOut }) {
    const [open, setOpen] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            // Fetch notifications when user is logged in
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
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="text-fuchsia-500 font-bold text-xl hover:text-fuchsia-400">
                        LearnDev    
                    </Link>

                    <div className="hidden sm:flex items-center gap-4 md:gap-5 lg:gap-6">
                        <Link to="/" className="nav-underline">Home</Link>
                        {user && <Link to="/docs" className="nav-underline">Documentation</Link>}
                        {user && <Link to="/exercises" className="nav-underline">Exercises</Link>}
                        {user && <Link to="/lessons" className="nav-underline">Lessons</Link>}

                        
                        {!user ? (
                            <Link to="/signin" className="btn1h lg:p-2">Sign In</Link>
                        ) : (
                            <>
                                <div className="relative">
                                    <button className="text-slate-200 hover:text-fuchsia-400 focus:outline-none">
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

                    <button 
                        className="sm:hidden ml-2 text-slate-200 focus:outline-none" 
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {open && (
                    <div className="sm:hidden flex flex-col gap-2 pb-2 animate-fade-in">
                        <Link to="/" className="text-slate-200 hover:text-fuchsia-400 px-2 py-1" onClick={() => setOpen(false)}>
                            Home
                        </Link>
                        {user && (
                            <>
                                <Link to="/docs" className="text-slate-200 hover:text-fuchsia-400 px-2 py-1" onClick={() => setOpen(false)}>
                                    Documentation
                                </Link>
                                <Link to="/exercises" className="text-slate-200 hover:text-fuchsia-400 px-2 py-1" onClick={() => setOpen(false)}>
                                    Exercises
                                </Link>
                                <Link to="/lessons" className="text-slate-200 hover:text-fuchsia-400 px-2 py-1" onClick={() => setOpen(false)}>
                                    Lessons
                                </Link>

                                <Link to="/profile" className="text-slate-200 hover:text-fuchsia-400 px-2 py-1" onClick={() => setOpen(false)}>
                                    Profile
                                </Link>
                                <Link to="/profile/settings" className="text-slate-200 hover:text-fuchsia-400 px-2 py-1" onClick={() => setOpen(false)}>
                                    Settings
                                </Link>
                                <button
                                    onClick={handleSignOutClick}
                                    className="btn1 w-full text-center mt-2"
                                >
                                    Sign Out
                                </button>
                            </>
                        )}
                        {!user && (
                            <Link to="/signin" className="btn1 w-full text-center" onClick={() => setOpen(false)}>
                                Sign In
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Nav;
