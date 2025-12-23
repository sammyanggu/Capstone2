import React, { useState } from 'react';

const Badges = ({ selectedBadge, onSelectBadge, equippedBadge }) => {
  const [showBadges, setShowBadges] = useState(false);

  // Badge designs - each has a unique design that frames the avatar
  const badges = [
    {
      id: 'none',
      name: 'No Badge',
      description: 'Default avatar',
      image: null, // No border
      locked: false,
    },
    {
      id: 'badge1',
      name: 'Badge 1',
      description: 'First badge',
      image: '/assets/badges/b1/2212.w032.n002.722B.p15.722-removebg-preview.png',
      locked: true,
    },
    {
      id: 'badge2',
      name: 'Badge 2',
      description: 'Second badge',
      image: '/assets/badges/b1/2212.w032.n002.722B.p15.722__1_-removebg-preview.png',
      locked: true,
    },
    {
      id: 'badge3',
      name: 'Badge 3',
      description: 'Third badge',
      image: '/assets/badges/b1/2212.w032.n002.722B.p15.722__2_-removebg-preview.png',
      locked: true,
    },
    // Add more badges as needed
  ];

  return (
    <div className="space-y-6">
      <button
        onClick={() => setShowBadges(!showBadges)}
        className="w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all"
      >
        {showBadges ? 'Hide Badges' : 'Show Badges'}
      </button>

      {showBadges && (
        <div className="mt-6 p-4 bg-gray-900 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Avatar Badges</h3>
          <p className="text-sm text-gray-300">Select a badge to equip as your avatar border</p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-4">
            {badges.map((badge) => (
              <button
                key={badge.id}
                onClick={() => {
                  if (!badge.locked) {
                    onSelectBadge(badge.id);
                  }
                }}
                className={`relative p-3 rounded-lg border-2 transition-all shadow-md ${
                  equippedBadge === badge.id
                    ? 'border-emerald-500 bg-emerald-50 text-gray-900'
                    : 'border-gray-300 bg-gray-800 hover:border-emerald-300'
                } ${badge.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                title={badge.name}
              >
                {/* Badge Preview */}
                <div className="relative w-16 h-16 mx-auto">
                  {badge.image ? (
                    <img
                      src={badge.image}
                      alt={badge.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-xl">
                      👤
                    </div>
                  )}
                </div>

                {/* Badge Name */}
                <p className="mt-2 text-xs font-medium text-center truncate">
                  {badge.name}
                </p>

                {/* Locked Indicator */}
                {badge.locked && (
                  <div className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    🔒
                  </div>
                )}

                {/* Equipped Badge Indicator */}
                {equippedBadge === badge.id && !badge.locked && (
                  <div className="absolute top-0 right-0 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Badge Info */}
          {selectedBadge && selectedBadge !== 'none' && (
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-900">
                <span className="font-semibold">Selected:</span> {
                  badges.find(b => b.id === selectedBadge)?.name
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Badges;
