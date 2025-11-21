// Modal component for selecting user level (Beginner, Intermediate, Advanced)
import React from 'react';

export default function LevelModal({ isOpen, onClose, onSelectLevel, title, icon, color = "fuchsia" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`bg-slate-800 p-6 rounded-xl shadow-2xl transform transition-all duration-300 ease-in-out scale-100`}>
        <div className="flex justify-center mb-6">
          {icon && <img src={icon} alt={title} className="w-16 h-16 drop-shadow-lg" />}
        </div>
        <div className="flex flex-col gap-3 items-center">
          <button 
            className={`btn1h w-48 py-2 text-white font-bold hover:bg-${color}-500`}
            onClick={() => onSelectLevel('beginner')}
          >
            Beginner
          </button>
          <button 
            className={`btn1h w-48 py-2 text-white font-bold hover:bg-${color}-500`}
            onClick={() => onSelectLevel('intermediate')}
          >
            Intermediate
          </button>
          <button 
            className={`btn1h w-48 py-2 text-white font-bold hover:bg-${color}-500`}
            onClick={() => onSelectLevel('advanced')}
          >
            Advanced
          </button>
        </div>
        <button
          className={`mt-6 text-slate-400 hover:text-${color}-400 transition-colors text-sm font-medium`}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
