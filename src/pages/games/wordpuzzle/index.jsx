import React, { useState } from 'react';

// Coding-themed crossword puzzle data
const crosswordData = {
  grid: [
    [
      { letter: 'V', number: 1, isStartOfWord: true },
      { letter: 'A' },
      { letter: 'R' },
      { isBlank: true },
      { letter: 'C', number: 2, isStartOfWord: true },
      { letter: 'L', number: 3, isStartOfWord: true },
      { letter: 'A' },
      { letter: 'S', number: 4, isStartOfWord: true },
      { letter: 'S' },
    ],
    [
      { letter: 'I' },
      { isBlank: true },
      { letter: 'R' },
      { isBlank: true },
      { letter: 'O' },
      { isBlank: true },
      { letter: 'O' },
      { isBlank: true },
      { letter: 'O' },
    ],
    [
      { letter: 'E', number: 5, isStartOfWord: true },
      { letter: 'N' },
      { letter: 'U' },
      { letter: 'M' },
      { letter: 'E' },
      { letter: 'R' },
      { letter: 'A' },
      { letter: 'T' },
      { letter: 'E' },
    ],
    [
      { isBlank: true },
      { letter: 'R', number: 6, isStartOfWord: true },
      { letter: 'E' },
      { letter: 'A' },
      { letter: 'C' },
      { letter: 'T' },
      { isBlank: true },
      { isBlank: true },
      { isBlank: true },
    ],
    [
      { letter: 'L', number: 7, isStartOfWord: true },
      { letter: 'O' },
      { letter: 'O' },
      { letter: 'P' },
      { isBlank: true },
      { letter: 'D', number: 8, isStartOfWord: true },
      { letter: 'A' },
      { letter: 'T' },
      { letter: 'A' },
    ],
    [
      { isBlank: true },
      { letter: 'P', number: 9, isStartOfWord: true },
      { letter: 'Y' },
      { letter: 'T' },
      { letter: 'H' },
      { letter: 'O' },
      { letter: 'N' },
      { isBlank: true },
      { isBlank: true },
    ],
  ],
  clues: {
    across: [
      { number: 1, clue: 'JavaScript keyword for variable declaration' },
      { number: 2, clue: 'Markup language acronym' },
      { number: 3, clue: 'OOP concept: blueprint for objects' },
      { number: 4, clue: 'Object-oriented programming term' },
      { number: 5, clue: 'To iterate through a list' },
      { number: 6, clue: 'Popular JavaScript library' },
      { number: 7, clue: 'Control structure for repetition' },
      { number: 8, clue: 'Information stored in variables' },
      { number: 9, clue: 'Popular programming language' },
    ],
    down: [
      { number: 1, clue: 'Management system for code versions' },
      { number: 2, clue: 'Notation: hypertext transfer protocol' },
      { number: 3, clue: 'Instructions followed by computers' },
      { number: 4, clue: 'Function of a variable or class' },
      { number: 5, clue: 'Textual content in programs' },
      { number: 6, clue: 'Programming interface (abbr.)' },
      { number: 7, clue: 'Programming paradigm: ___ oriented' },
      { number: 8, clue: 'Process of finding and fixing bugs' },
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
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 p-4 min-h-screen pt-24">
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl p-3 sm:p-4 md:p-6 lg:p-8 border border-slate-200 flex flex-col overflow-hidden" style={{maxHeight: 'calc(100vh - 120px)'}}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 mb-4 text-center flex-shrink-0">Coding Crossword Puzzle</h2>
        
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 min-h-0 flex-1 overflow-hidden">
          {/* Grid Section */}
          <div className="flex-1 flex flex-col items-center justify-center min-w-0 overflow-auto">
            <div className="flex justify-center">
              <table className="border-separate border-spacing-0 select-none" style={{background:'#fff'}}>
                <tbody>
                  {crosswordData.grid.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((cell, colIdx) => (
                        <td key={getCellId(rowIdx, colIdx)} className="relative w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 p-0">
                          {cell.isBlank ? (
                            <div className="w-full h-full bg-slate-300" style={{border:'1px solid #bbb', borderRadius:4}} />
                          ) : (
                            <div className="w-full h-full bg-white border border-slate-400 flex items-center justify-center relative" style={{borderRadius:4}}>
                              {cell.number && cell.isStartOfWord && (
                                <span className="absolute top-0 left-0 text-xs text-slate-800 font-bold pl-1 pt-0.5">{cell.number}</span>
                              )}
                              <input
                                className={`w-full h-full text-center text-xs sm:text-sm md:text-base font-bold bg-transparent outline-none text-slate-800 ${checkCorrect(rowIdx, colIdx) ? '' : 'bg-red-200 animate-pulse'}`}
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
          </div>

          {/* Clues Section */}
          <div className="flex-1 w-full bg-white rounded-xl border border-slate-200 shadow p-3 md:p-4 overflow-y-auto max-h-72 sm:max-h-96 md:max-h-[500px] lg:max-h-[600px] min-w-0">
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 md:mb-3 border-b pb-2">Across</h3>
            <ul className="mb-4 md:mb-6 space-y-1 md:space-y-2">
              {crosswordData.clues.across.map(({ number, clue }) => (
                <li key={number} className="text-xs md:text-sm"><span className="font-bold text-emerald-600">{number}.</span> <span className="text-slate-700">{clue}</span></li>
              ))}
            </ul>
            <h3 className="text-base md:text-lg font-bold text-slate-800 mb-2 md:mb-3 border-b pb-2">Down</h3>
            <ul className="space-y-1 md:space-y-2">
              {crosswordData.clues.down.map(({ number, clue }) => (
                <li key={number} className="text-xs md:text-sm"><span className="font-bold text-emerald-600">{number}.</span> <span className="text-slate-700">{clue}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Buttons at bottom */}
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-4 flex-shrink-0">
          <button
            className="px-3 sm:px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-emerald-700 transition-all shadow"
            onClick={() => setShowSolution(true)}
          >
            Show Solution
          </button>
          <button
            className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-xs sm:text-sm hover:bg-blue-600 transition-all shadow"
            onClick={() => {
              // Submit check
              const allCorrect = crosswordData.grid.every((row, rowIdx) =>
                row.every((cell, colIdx) => {
                  if (cell.isBlank) return true;
                  return inputGrid[rowIdx][colIdx].toUpperCase() === cell.letter.toUpperCase();
                })
              );
              if (allCorrect && inputGrid.some((row, rowIdx) => row.some((val, colIdx) => val && !crosswordData.grid[rowIdx][colIdx].isBlank))) {
                alert('🎉 Congratulations! You solved the crossword!');
              } else {
                alert('Some answers are incorrect. Try again!');
              }
            }}
          >
            Submit
          </button>
          <button
            className="px-3 sm:px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg font-bold text-xs sm:text-sm hover:bg-yellow-600 transition-all shadow"
            onClick={() => {
              setInputGrid(crosswordData.grid.map(row => row.map(cell => (cell.isBlank ? '' : ''))));
              setShowSolution(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
