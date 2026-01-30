import React, { useState } from 'react';

// Hard Difficulty Crossword Puzzle Data - More compact and efficient layout
const hardCrosswordData = {
  grid: [
    [
      { letter: 'H', number: 1, isStartOfWord: true },
      { letter: 'T' },
      { letter: 'M' },
      { letter: 'L' },
      { isBlank: true },
      { isBlank: true },
      { isBlank: true },
    ],
    [
      { letter: 'Y', number: 2, isStartOfWord: true },
      { letter: 'T' },
      { letter: 'H' },
      { letter: 'O' },
      { letter: 'N' },
      { isBlank: true },
      { isBlank: true },
    ],
    [
      { letter: 'S', number: 3, isStartOfWord: true },
      { letter: 'E' },
      { letter: 'M' },
      { letter: 'I' },
      { letter: 'C' },
      { letter: 'O' },
      { letter: 'L' },
      { letter: 'O' },
      { letter: 'N' },
    ],
    [
      { letter: 'W', number: 4, isStartOfWord: true },
      { letter: 'H' },
      { letter: 'I' },
      { letter: 'L' },
      { letter: 'E' },
      { isBlank: true },
      { letter: 'F', number: 5, isStartOfWord: true },
      { letter: 'O' },
      { letter: 'R' },
    ],
    [
      { isBlank: true },
      { isBlank: true },
      { letter: 'I', number: 6, isStartOfWord: true },
      { letter: 'N' },
      { letter: 'T' },
      { isBlank: true },
      { letter: 'U', number: 7, isStartOfWord: true },
      { letter: 'N' },
      { letter: 'C' },
      { letter: 'T' },
      { letter: 'I' },
      { letter: 'O' },
      { letter: 'N' },
    ],
    [
      { letter: 'A', number: 8, isStartOfWord: true },
      { letter: 'R' },
      { letter: 'R' },
      { letter: 'A' },
      { letter: 'Y' },
      { isBlank: true },
      { isBlank: true },
      { isBlank: true },
      { isBlank: true },
    ],
    [
      { letter: 'B', number: 9, isStartOfWord: true },
      { letter: 'O' },
      { letter: 'O' },
      { letter: 'L' },
      { letter: 'E' },
      { letter: 'A' },
      { letter: 'N' },
      { isBlank: true },
      { isBlank: true },
    ],
  ],
  clues: {
    across: [
      { number: 1, clue: 'Web markup language (4 letters)' },
      { number: 2, clue: 'Simple, indented language (6 letters)' },
      { number: 3, clue: 'Statement ender (9 letters)' },
      { number: 4, clue: 'Loop condition (5 letters)' },
      { number: 5, clue: 'Loop type (3 letters)' },
      { number: 6, clue: 'Whole number type (3 letters)' },
      { number: 7, clue: 'Reusable code block (8 letters)' },
      { number: 8, clue: 'Data structure (5 letters)' },
      { number: 9, clue: 'True or false (7 letters)' },
    ],
    down: [
      { number: 1, clue: 'Server-side language' },
      { number: 2, clue: 'Control flow statement' },
    ],
  },
  answers: {
    1: 'HTML',
    2: 'PYTHON',
    3: 'SEMICOLON',
    4: 'WHILE',
    5: 'FOR',
    6: 'INT',
    7: 'FUNCTION',
    8: 'ARRAY',
    9: 'BOOLEAN',
  },
};

// Easy Difficulty Crossword Puzzle Data - Simpler, more compact layout
const easyCrosswordData = {
  grid: [
    [
      { letter: 'P', number: 1, isStartOfWord: true },
      { letter: 'Y' },
      { letter: 'T' },
      { letter: 'H' },
      { letter: 'O' },
      { letter: 'N' },
      { isBlank: true },
    ],
    [
      { letter: 'U', number: 2, isStartOfWord: true },
      { isBlank: true },
      { isBlank: true },
      { isBlank: true },
      { isBlank: true },
      { letter: 'F', number: 3, isStartOfWord: true },
      { letter: 'O' },
      { letter: 'R' },
    ],
    [
      { letter: 'N', number: 4, isStartOfWord: true },
      { letter: 'U' },
      { letter: 'M' },
      { letter: 'B' },
      { letter: 'E' },
      { letter: 'R' },
      { isBlank: true },
    ],
    [
      { letter: 'L', number: 5, isStartOfWord: true },
      { letter: 'O' },
      { letter: 'O' },
      { letter: 'P' },
      { isBlank: true },
      { isBlank: true },
      { isBlank: true },
    ],
    [
      { letter: 'O', number: 6, isStartOfWord: true },
      { letter: 'U' },
      { letter: 'T' },
      { letter: 'P' },
      { letter: 'U' },
      { letter: 'T' },
      { isBlank: true },
    ],
    [
      { letter: 'P', number: 7, isStartOfWord: true },
      { letter: 'R' },
      { letter: 'I' },
      { letter: 'N' },
      { letter: 'T' },
      { isBlank: true },
      { isBlank: true },
    ],
  ],
  clues: {
    across: [
      { number: 1, clue: 'Popular language (6 letters)' },
      { number: 2, clue: 'Reusable code block (8 letters)' },
      { number: 4, clue: 'Type of data (6 letters)' },
      { number: 5, clue: 'Code structure (4 letters)' },
      { number: 6, clue: 'Program result (6 letters)' },
      { number: 7, clue: 'Display text (5 letters)' },
    ],
    down: [
      { number: 1, clue: 'Iteration statement' },
      { number: 3, clue: 'Control flow type' },
    ],
  },
  answers: {
    1: 'PYTHON',
    2: 'FUNCTION',
    3: 'FOR',
    4: 'NUMBER',
    5: 'LOOP',
    6: 'OUTPUT',
    7: 'PRINT',
  },
};

function getCellId(row, col) {
  return `cell-${row}-${col}`;
}

function BeginnerCrossword({ difficulty = 'hard' }) {
  const puzzleData = difficulty === 'easy' ? easyCrosswordData : hardCrosswordData;
  const difficultyLabel = difficulty === 'easy' ? '✨ Easy' : '🔥 Hard';
  
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedCell, setSelectedCell] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleCellChange = (row, col, value) => {
    const cellId = getCellId(row, col);
    const letter = value.toUpperCase().slice(0, 1);
    setUserAnswers({
      ...userAnswers,
      [cellId]: letter,
    });

    // Auto-move to next cell
    if (letter && col < puzzleData.grid[row].length - 1) {
      const nextCellId = getCellId(row, col + 1);
      document.getElementById(nextCellId)?.focus();
    }
  };

  const checkAnswers = () => {
    let allCorrect = true;
    puzzleData.grid.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (!cell.isBlank && cell.letter) {
          const cellId = getCellId(r, c);
          const userLetter = userAnswers[cellId] || '';
          if (userLetter !== cell.letter) {
            allCorrect = false;
          }
        }
      });
    });

    if (allCorrect) {
      setCompleted(true);
    } else {
      alert('Some answers are incorrect. Try again!');
    }
  };

  const resetPuzzle = () => {
    setUserAnswers({});
    setSelectedCell(null);
    setShowAnswers(false);
    setCompleted(false);
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🧩 Coding Crossword - {difficultyLabel}</h1>
          <p className="text-gray-600">{difficulty === 'easy' ? 'Perfect for beginners! Solve simple coding concepts' : 'Challenge yourself with advanced programming concepts!'}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crossword Grid */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
              <div className="mb-6 flex gap-4">
                <button
                  onClick={checkAnswers}
                  disabled={completed}
                  className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white rounded-lg font-semibold transition"
                >
                  ✓ Check Answers
                </button>
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  {showAnswers ? '🙈 Hide Answers' : '👁️ Show Answers'}
                </button>
                <button
                  onClick={resetPuzzle}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition"
                >
                  🔄 Reset
                </button>
              </div>

              {/* Success Message */}
              {completed && (
                <div className="mb-6 p-4 bg-emerald-100 border border-emerald-500 rounded-lg">
                  <p className="text-emerald-700 font-bold text-lg">🎉 Congratulations! You solved the puzzle!</p>
                </div>
              )}

              {/* Crossword Grid */}
              <div className="inline-block">
                {puzzleData.grid.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex">
                    {row.map((cell, colIdx) => {
                      const cellId = getCellId(rowIdx, colIdx);
                      const userAnswer = userAnswers[cellId] || '';
                      const isCorrect = !cell.isBlank && userAnswer === cell.letter;
                      const isWrong = !cell.isBlank && userAnswer && userAnswer !== cell.letter;

                      if (cell.isBlank) {
                        return <div key={colIdx} className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gray-800"></div>;
                      }

                      return (
                        <div key={colIdx} className="relative">
                          <input
                            id={cellId}
                            type="text"
                            maxLength="1"
                            value={userAnswer || (showAnswers ? cell.letter : '')}
                            onChange={(e) => handleCellChange(rowIdx, colIdx, e.target.value)}
                            onFocus={() => setSelectedCell(cellId)}
                            className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 text-center font-bold text-sm sm:text-base md:text-lg border-2 uppercase
                              ${selectedCell === cellId ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'}
                              ${isCorrect ? 'bg-emerald-100 border-emerald-500' : ''}
                              ${isWrong ? 'bg-red-100 border-red-500' : ''}
                              focus:outline-none focus:ring-2 focus:ring-blue-500
                            `}
                          />
                          {cell.number && (
                            <span className="absolute top-0.5 left-0.5 text-xs font-bold text-gray-600">{cell.number}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="mt-8 flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white border-2 border-gray-300"></div>
                  <span>Empty</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-emerald-100 border-2 border-emerald-500"></div>
                  <span>Correct</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 border-2 border-red-500"></div>
                  <span>Incorrect</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clues Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">📋 Clues</h2>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-700 mb-3 pb-2 border-b-2 border-blue-500">Across →</h3>
                <div className="space-y-3">
                  {puzzleData.clues.across.map((clue) => (
                    <div key={clue.number} className="text-sm">
                      <span className="font-bold text-blue-600">{clue.number}.</span>
                      <span className="text-gray-700"> {clue.clue}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-700 mb-3 pb-2 border-b-2 border-purple-500">Down ↓</h3>
                <div className="space-y-3">
                  {difficulty === 'hard' ? (
                    <>
                      <div className="text-sm">
                        <span className="font-bold text-purple-600">1.</span>
                        <span className="text-gray-700"> A programming language often used for web development</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold text-purple-600">2.</span>
                        <span className="text-gray-700"> A language known for simplicity and indentation</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold text-purple-600">3.</span>
                        <span className="text-gray-700"> A reusable block of code</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold text-purple-600">4.</span>
                        <span className="text-gray-700"> A common structure to store multiple values</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-sm">
                        <span className="font-bold text-purple-600">2.</span>
                        <span className="text-gray-700"> What you use to loop through code</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold text-purple-600">6.</span>
                        <span className="text-gray-700"> Reusable block of code</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Key */}
        <div className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-200">
          <details className="cursor-pointer">
            <summary className="font-bold text-blue-700 text-lg hover:text-blue-800">
              📚 Answer Key (Click to expand)
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-3">Across:</h4>
                <ul className="space-y-1 text-gray-700">
                  {difficulty === 'hard' ? (
                    <>
                      <li>1. HTML</li>
                      <li>3. PYTHON</li>
                      <li>4. SEMICOLON</li>
                      <li>5. WHILE</li>
                      <li>6. INT</li>
                      <li>7. FUNCTION</li>
                      <li>8. ARRAY</li>
                      <li>9. BOOLEAN</li>
                    </>
                  ) : (
                    <>
                      <li>1. PYTHON</li>
                      <li>3. NUMBER</li>
                      <li>4. LOOP</li>
                      <li>5. FOR</li>
                      <li>7. OUTPUT</li>
                      <li>8. PRINT</li>
                    </>
                  )}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-700 mb-3">Down:</h4>
                <ul className="space-y-1 text-gray-700">
                  {difficulty === 'hard' ? (
                    <>
                      <li>1. HTML (web)</li>
                      <li>2. PYTHON</li>
                      <li>3. FUNCTION</li>
                      <li>4. ARRAY</li>
                    </>
                  ) : (
                    <>
                      <li>2. VARIABLE</li>
                      <li>6. FUNCTION</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}

export default BeginnerCrossword;
