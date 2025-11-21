// Home page. Welcome message, feature highlights.
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import AuthModal from '../components/AuthModal';
import LoadingScreen from '../components/LoadingScreen';

function Home() {
    const [isZooming, setIsZooming] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isLoadingAfterLogin, setIsLoadingAfterLogin] = useState(false);
    const navigate = useNavigate();
    const { currentUser, loading } = useAuth();

    // Redirect to profile if user is already logged in
    useEffect(() => {
        if (!loading && currentUser) {
            navigate('/profile');
        }
    }, [currentUser, loading, navigate]);

    useEffect(() => {
        // Load particles.js library
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        script.async = true;
        script.onload = () => {
            // Initialize particles after library loads, but only if the target element exists.
            try {
                const container = document.getElementById('particles');
                if (!container) {
                    // Target not present (navigated away or not rendered) — skip init.
                    return;
                }

                if (window.particlesJS) {
                    window.particlesJS("particles", {
                        particles: {
                            number: { value: 60 },
                            size: { value: 2 },
                            move: { speed: 1 },
                            color: { value: "#10b981" },
                            line_linked: {
                                enable: true,
                                distance: 150,
                                color: "#059669",
                                opacity: 0.4
                            }
                        }
                    });
                }
            } catch (err) {
                // Log the error but don't break the app
                // eslint-disable-next-line no-console
                console.error('Particles initialization failed:', err);
            }
        };
        document.body.appendChild(script);

        return () => {
            // Cleanup: remove script if needed
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const handleYesClick = () => {
        setIsZooming(true);
        // Show auth modal after zoom animation completes
        setTimeout(() => {
            setShowAuthModal(true);
        }, 1000);
    };

    // Render the homepage layout
    return (
        <>
            {/* Hero Section with Particles Animation */}
            <div className={`relative w-full h-screen overflow-hidden mb-0 max-w-[100vw] bg-slate-900 transition-transform duration-1000 ${isZooming ? 'scale-150' : 'scale-100'}`}>
                <div id="particles" className="absolute inset-0"></div>
                
                {/* Soft gradient glow effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute w-96 h-96 bg-gradient-to-r from-emerald-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
                        left: '-100px',
                        top: '-100px',
                        animation: 'floatGlow 12s infinite alternate ease-in-out'
                    }}></div>
                </div>

                {/* Hero content overlay */}
                <div className={`absolute inset-0 flex flex-col justify-center items-center z-10 transition-opacity duration-500 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
                    <h1 className="text-white text-5xl md:text-6xl font-bold text-center drop-shadow-lg" style={{
                        textShadow: '0 0 20px rgba(255,255,255,0.3)'
                    }}>
                        Ready to start your journey?
                    </h1>
                    
                    {/* Interactive Element */}
                    <div className="flex gap-6 mt-12">
                        <div
                            onClick={handleYesClick}
                            className="group relative cursor-pointer flex items-center gap-3 px-8 py-4 text-white font-bold text-lg transition-all duration-500 transform hover:scale-110"
                            style={{
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '2px solid rgba(16, 185, 129, 0.4)',
                                backdropFilter: 'blur(10px)',
                                borderRadius: '50px',
                                boxShadow: '0 0 40px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 60px rgba(16, 185, 129, 0.8), inset 0 0 30px rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.8)';
                                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 0 40px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                            }}
                        >
                            <span className="group-hover:opacity-100 opacity-70 transition-opacity">Let's Go</span>
                            <span className="text-2xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                        </div>
                    </div>
                </div>

                <style>{`
                    @keyframes floatGlow {
                        from { transform: translate(-200px, -150px); }
                        to   { transform: translate(200px, 150px); }
                    }
                `}</style>
            </div>

            {/* Auth Modal */}
            <AuthModal 
                isOpen={showAuthModal} 
                onClose={() => {
                    setShowAuthModal(false);
                    setIsZooming(false);
                }}
                onSuccess={(userData) => {
                    setShowAuthModal(false);
                    setIsLoadingAfterLogin(true);
                    // Show loading screen before reload
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }}
            />

            {/* Loading Screen */}
            {isLoadingAfterLogin && <LoadingScreen />}
        </>
    );
}

// Export the Home component
export default Home;