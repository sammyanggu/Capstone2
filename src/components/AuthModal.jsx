import { useState, useEffect } from 'react';
import { useAuth } from "../AuthContext";

export default function AuthModal({ isOpen, onClose, onSuccess }) {
    const { googleSignIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError("");
            
            const user = await googleSignIn();
            console.log('Google sign in successful:', user);
            
            if (onSuccess) onSuccess(user);
            onClose();
        } catch (error) {
            console.error('Google sign in error:', error);
            if (error.code === 'auth/popup-closed-by-user') {
                setError('Sign in cancelled. Please try again.');
            } else if (error.code === 'auth/network-request-failed') {
                setError('Network error. Please check your connection.');
            } else {
                setError(error.message || 'An error occurred during sign in.');
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                // Close modal when clicking outside
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="bg-slate-800 p-8 rounded-lg shadow-xl max-w-md w-full relative animate-modal-slide-up">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-300"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-emerald-500">Welcome Back</h2>
                    <p className="text-slate-400 text-sm mt-2">Sign in to continue learning</p>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-500 text-sm flex items-center">
                        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                <button
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-white hover:bg-gray-100 disabled:bg-white disabled:opacity-50 text-gray-800 rounded font-semibold flex items-center justify-center gap-2 transition-colors border border-gray-300"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    {loading ? 'Signing in...' : 'Sign in with Google'}
                </button>

                <p className="text-center text-slate-400 text-xs mt-6">
                    By signing in, you agree to continue learning with us
                </p>
            </div>
        </div>
    );
}