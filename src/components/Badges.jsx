import React from 'react';

const Badges = ({ selectedBadge, onSelectBadge, equippedBadge }) => {
  // Badge designs - each has a unique design that frames the avatar
  const badges = [
    {
      id: 'none',
      name: 'No Badge',
      description: 'Default avatar',
      svg: null, // No border
    },
    // Gold Tier Badges
    {
      id: 'gold_blue',
      name: 'Azure Crown',
      description: 'Blue noble crown',
      color: '#3B82F6',
      borderStyle: 'radial-gradient(circle, #60A5FA 0%, #3B82F6 50%, #1E40AF 100%)',
      icon: '👑',
    },
    {
      id: 'gold_red',
      name: 'Crimson Crown',
      description: 'Red noble crown',
      color: '#EF4444',
      borderStyle: 'radial-gradient(circle, #FCA5A5 0%, #EF4444 50%, #991B1B 100%)',
      icon: '👑',
    },
    {
      id: 'gold_yellow',
      name: 'Golden Crown',
      description: 'Yellow noble crown',
      color: '#FBBF24',
      borderStyle: 'radial-gradient(circle, #FCD34D 0%, #FBBF24 50%, #B45309 100%)',
      icon: '👑',
    },
    {
      id: 'gold_orange',
      name: 'Amber Crown',
      description: 'Orange noble crown',
      color: '#F97316',
      borderStyle: 'radial-gradient(circle, #FDBA74 0%, #F97316 50%, #92400E 100%)',
      icon: '👑',
    },
    {
      id: 'gold_purple',
      name: 'Violet Crown',
      description: 'Purple noble crown',
      color: '#A855F7',
      borderStyle: 'radial-gradient(circle, #D8B4FE 0%, #A855F7 50%, #581C87 100%)',
      icon: '👑',
    },
    // Emerald Tier Badges
    {
      id: 'emerald_unicorn',
      name: 'Mystical Unicorn',
      description: 'Magical unicorn horn frame',
      borderStyle: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)',
      icon: '🦄',
    },
    {
      id: 'emerald_butterfly',
      name: 'Butterfly Wings',
      description: 'Colorful butterfly frame',
      borderStyle: 'linear-gradient(135deg, #06B6D4 0%, #EC4899 100%)',
      icon: '🦋',
    },
    {
      id: 'emerald_flower',
      name: 'Flower Crown',
      description: 'Beautiful flower frame',
      borderStyle: 'linear-gradient(135deg, #FBBF24 0%, #EC4899 100%)',
      icon: '🌸',
    },
    {
      id: 'emerald_magic',
      name: 'Magic Circle',
      description: 'Mystical magic circle',
      borderStyle: 'linear-gradient(135deg, #06B6D4 0%, #A855F7 100%)',
      icon: '✨',
    },
    {
      id: 'emerald_rainbow',
      name: 'Rainbow Aura',
      description: 'Multi-colored rainbow',
      borderStyle: 'conic-gradient(from 0deg, #FF0000, #FF7F00, #FFFF00, #00FF00, #0000FF, #4B0082, #9400D3, #FF0000)',
      icon: '🌈',
    },
    // Diamond Tier Badges
    {
      id: 'diamond_star',
      name: 'Stellar Badge',
      description: 'Star-studded border',
      borderStyle: 'radial-gradient(circle, #60A5FA 0%, #3B82F6 50%, #1E40AF 100%)',
      icon: '⭐',
    },
    {
      id: 'diamond_fire',
      name: 'Inferno Badge',
      description: 'Flaming fire border',
      borderStyle: 'radial-gradient(circle, #FCA5A5 0%, #DC2626 50%, #7F1D1D 100%)',
      icon: '🔥',
    },
    {
      id: 'diamond_ice',
      name: 'Frost Badge',
      description: 'Icy crystalline border',
      borderStyle: 'radial-gradient(circle, #A5F3FC 0%, #06B6D4 50%, #0C4A6E 100%)',
      icon: '❄️',
    },
    {
      id: 'diamond_thunder',
      name: 'Thunder Badge',
      description: 'Electric lightning border',
      borderStyle: 'radial-gradient(circle, #FBBF24 0%, #F59E0B 50%, #92400E 100%)',
      icon: '⚡',
    },
    {
      id: 'diamond_nature',
      name: 'Nature Badge',
      description: 'Green nature border',
      borderStyle: 'radial-gradient(circle, #86EFAC 0%, #22C55E 50%, #15803D 100%)',
      icon: '🌿',
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Avatar Badges</h3>
      <p className="text-sm text-gray-600">Select a badge to equip as your avatar border</p>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {badges.map((badge) => (
          <button
            key={badge.id}
            onClick={() => onSelectBadge(badge.id)}
            className={`relative p-3 rounded-lg border-2 transition-all ${
              equippedBadge === badge.id
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-300 bg-white hover:border-emerald-300'
            }`}
            title={badge.name}
          >
            {/* Badge Preview */}
            <div className="relative w-12 h-12 mx-auto">
              {badge.id === 'none' ? (
                <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl">
                  👤
                </div>
              ) : (
                <>
                  {/* Badge Border Frame */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: badge.borderStyle,
                      padding: '2px',
                    }}
                  >
                    {/* Avatar Circle */}
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-lg text-white font-bold">
                      {badge.icon}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Badge Name */}
            <p className="mt-2 text-xs font-medium text-gray-700 text-center truncate">
              {badge.name}
            </p>

            {/* Equipped Badge Indicator */}
            {equippedBadge === badge.id && (
              <div className="absolute top-0 right-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                ✓
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Badge Info */}
      {selectedBadge && selectedBadge !== 'none' && (
        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
          <p className="text-sm text-emerald-900">
            <span className="font-semibold">Selected:</span> {
              badges.find(b => b.id === selectedBadge)?.name
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default Badges;
