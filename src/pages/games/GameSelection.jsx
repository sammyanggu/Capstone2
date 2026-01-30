import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function GameSelection() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-purple-300">Choose a Game</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl">
        <button
          onClick={() => navigate('/games/quiz')}
          className="bg-slate-800 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-purple-700 hover:border-purple-400"
        >
          <span className="text-5xl mb-4">📝</span>
          <span className="text-xl font-semibold text-purple-300">Quiz</span>
          <span className="text-gray-400 mt-2 text-sm">Test your knowledge with multiple choice questions.</span>
        </button>
        <button
          onClick={() => navigate('/games/crossword/hard')}
          className="bg-slate-800 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-purple-700 hover:border-purple-400"
        >
          <span className="text-5xl mb-4">🧩</span>
          <span className="text-xl font-semibold text-purple-300">Crossword</span>
          <span className="text-gray-400 mt-2 text-sm">Solve coding crossword puzzles with difficulty levels.</span>
        </button>
        <button
          onClick={() => navigate('/games/fourpicsoneword')}
          className="bg-slate-800 rounded-xl shadow-lg p-8 flex flex-col items-center hover:scale-105 transition-transform border-2 border-purple-700 hover:border-purple-400"
        >
          <span className="text-5xl mb-4">🖼️</span>
          <span className="text-xl font-semibold text-purple-300">4 Pics 1 Word</span>
          <span className="text-gray-400 mt-2 text-sm">Guess the word that connects 4 images.</span>
        </button>
      </div>
    </div>
  );
}