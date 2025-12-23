import React, { useState, useEffect } from 'react';
import { useTheme } from '../../ThemeContext';

// Badge images from public folder
const badgeImages = [
  { id: 1, name: 'First Steps', image: '/assets/badges/b2/custom1.png' },
  { id: 2, name: 'HTML Master', image: '/assets/badges/b2/custom2.png' },
  { id: 3, name: 'CSS Expert', image: '/assets/badges/b2/custom3.png' },
  { id: 4, name: 'JS Legend', image: '/assets/badges/b2/custom4.png' },
  { id: 5, name: 'Quick Learner', image: '/assets/badges/b2/custom5.png' },
  { id: 6, name: 'Quiz Master', image: '/assets/badges/b2/custom6.png' },
  { id: 7, name: 'Streak Keeper', image: '/assets/badges/b2/custom7.png' },
  { id: 8, name: 'Problem Solver', image: '/assets/badges/b2/custom8.png' },
  { id: 9, name: 'Rising Star', image: '/assets/badges/b2/custom9.png' },
  { id: 10, name: 'Elite Coder', image: '/assets/badges/b2/custom10.png' },
];

function Badges() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex items-center justify-center pt-20">
        <div className="text-white text-center">
          <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg">Loading Badges...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 pt-20">
      {/* Gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/30 to-transparent rounded-full blur-3xl animate-pulse" style={{
          left: '-100px',
          top: '-100px',
          animation: 'floatGlow 12s infinite alternate ease-in-out'
        }}></div>
        <div className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse" style={{
          right: '-100px',
          bottom: '-100px',
          animation: 'floatGlow 15s infinite alternate ease-in-out 2s'
        }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              🎖️ Badges
            </h1>
            <p className="text-gray-300 text-lg md:text-xl">
              Collect exclusive badges for your accomplishments!
            </p>
          </div>

          {/* Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {badgeImages.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center gap-3 p-4 bg-gradient-to-br from-purple-900/40 to-pink-900/40 border border-purple-500/30 rounded-lg hover:border-purple-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
              >
                <div className="relative w-16 h-16 overflow-hidden rounded-lg group-hover:scale-110 transition-transform">
                  <img 
                    src={badge.image} 
                    alt={badge.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/badges/placeholder.svg';
                    }}
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-purple-400">{badge.name}</p>
                </div>
              </div>
            ))}
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
  );
}

export default Badges;
