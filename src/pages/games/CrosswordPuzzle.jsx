// ...existing code...
import React, { useState } from 'react';

// Sample crossword data (coding-related)
const crosswordData = {
  grid: [
    // Each row is an array of cell objects: { letter, number (optional), isStartOfWord }
    [
      { letter: 'V', number: 1, isStartOfWord: true },
      { letter: 'A' },
      { letter: 'R' },
      { letter: ' ', isBlank: true },
      { letter: 'F', number: 2, isStartOfWord: true },
      { letter: 'O' },
      { letter: 'R' },
    ],
    [
      { letter: 'U' },
      { letter: ' ', isBlank: true },
      { letter: 'A' },
      { letter: ' ', isBlank: true },
      { letter: 'U' },
      { letter: ' ', isBlank: true },
      { letter: 'A' },
    ],
    [
      { letter: 'E' },
      { letter: 'L' },
      { letter: 'G' },
      { letter: ' ', isBlank: true },
      { letter: 'N' },
      { letter: 'O' },
      { letter: 'D' },
    ],
    [
      { letter: 'S' },
      { letter: ' ', isBlank: true },
      { letter: 'S' },
      { letter: ' ', isBlank: true },
      { letter: 'C' },
      { letter: ' ', isBlank: true },
      { letter: 'E' },
    ],
    [
      { letter: ' ', isBlank: true },
      { letter: ' ', isBlank: true },
      { letter: 'T', number: 3, isStartOfWord: true },
      { letter: 'E' },
      { letter: 'S' },
      { letter: 'T' },
      { letter: ' ', isBlank: true },
    ],
  ],
  clues: {
    across: [
      { number: 1, clue: 'JavaScript keyword for variable declaration' },
      { number: 2, clue: 'Loop type: ___ loop' },
      { number: 3, clue: 'To check your code, you should always ___ it' },
    ],
    down: [
      { number: 1, clue: 'Popular version control system (abbr.)' },
      { number: 2, clue: 'JavaScript runtime for server-side' },
    ],
  },
};

function getCellId(row, col) {
  return `cell-${row}-${col}`;
}

export default function CrosswordPuzzle() {
  const [inputGrid, setInputGrid] = useState(
    crosswordData.grid.map(row => row.map(cell => (cell.isBlank ? '' : '')))
  );
  const [showSolution, setShowSolution] = useState(false);

  const handleInput = (rowIdx, colIdx, value) => {
    if (!/^[A-Za-z]?$/.test(value)) return;
    setInputGrid(grid => {
      const newGrid = grid.map(r => [...r]);
      newGrid[rowIdx][colIdx] = value.toUpperCase();
      return newGrid;
    });
  };

  const checkCorrect = (rowIdx, colIdx) => {
    const cell = crosswordData.grid[rowIdx][colIdx];
    if (cell.isBlank) return true;
    return (
      inputGrid[rowIdx][colIdx].toUpperCase() === cell.letter.toUpperCase()
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 pt-20 pb-8">
      <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-200 flex flex-col md:flex-row gap-8 items-start">
        {/* Grid Section */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-2xl font-extrabold text-slate-800 mb-4 text-center">Coding Crossword Puzzle</h2>
          <div className="overflow-auto max-w-full">
            <table className="border-separate border-spacing-0 select-none" style={{background:'#fff'}}>
              <tbody>
                {crosswordData.grid.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, colIdx) => (
                      <td key={getCellId(rowIdx, colIdx)} className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 p-0">
                        {cell.isBlank ? (
                          <div className="w-full h-full bg-slate-300" style={{border:'1px solid #bbb', borderRadius:4}} />
                        ) : (
                          <div className="w-full h-full bg-white border border-slate-400 flex items-center justify-center relative" style={{borderRadius:4}}>
                            {cell.number && cell.isStartOfWord && (
                              <span className="absolute top-0 left-0 text-xs text-slate-500 font-bold pl-1 pt-1">{cell.number}</span>
                            )}
                            <input
                              className={`w-full h-full text-center text-lg md:text-2xl font-bold bg-transparent outline-none text-slate-800 ${checkCorrect(rowIdx, colIdx) ? '' : 'bg-red-200 animate-pulse'}`}
                              maxLength={1}
                              value={showSolution ? cell.letter : inputGrid[rowIdx][colIdx]}
                              onChange={e => handleInput(rowIdx, colIdx, e.target.value)}
                              disabled={showSolution}
                              style={{caretColor:'#10b981'}}
                            />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-4 mt-6">
            <button
              className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all shadow"
              onClick={() => setShowSolution(true)}
            >
              Show Solution
            </button>
            <button
              className="px-6 py-2 bg-yellow-500 text-slate-900 rounded-lg font-bold hover:bg-yellow-600 transition-all shadow"
              onClick={() => {
                setInputGrid(crosswordData.grid.map(row => row.map(cell => (cell.isBlank ? '' : ''))));
                setShowSolution(false);
              }}
            >
              Clear
            </button>
          </div>
        </div>
        {/* Clues Section */}
        <div className="flex-1 w-full max-w-md bg-white rounded-xl border border-slate-200 shadow p-4 overflow-y-auto max-h-[500px]">
          <h3 className="text-xl font-bold text-slate-700 mb-2 border-b pb-1">Across</h3>
          <ul className="mb-6">
            {crosswordData.clues.across.map(({ number, clue }) => (
              <li key={number} className="mb-2"><span className="font-bold text-emerald-600">{number}.</span> {clue}</li>
            ))}
          </ul>
          <h3 className="text-xl font-bold text-slate-700 mb-2 border-b pb-1">Down</h3>
          <ul>
            {crosswordData.clues.down.map(({ number, clue }) => (
              <li key={number} className="mb-2"><span className="font-bold text-emerald-600">{number}.</span> {clue}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
