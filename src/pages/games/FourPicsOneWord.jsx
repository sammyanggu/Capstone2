
import React, { useState } from 'react';

// Level data: images and answer (from public/assets/4pics-images folder)
const levels = [
  {
    images: [
      '/assets/4pics-images/level-1/1 (1).jpg',
      '/assets/4pics-images/level-1/1 (2).jpg',
      '/assets/4pics-images/level-1/1 (3).jpg',
      '/assets/4pics-images/level-1/1 (4).jpg',
    ],
    answer: 'html',
  },
  {
    images: [
      '/assets/4pics-images/level-2/2 (1).jpg',
      '/assets/4pics-images/level-2/2 (2).jpg',
      '/assets/4pics-images/level-2/2 (3).jpg',
      '/assets/4pics-images/level-2/2 (4).jpg',
    ],
    answer: 'css',
  },
  {
    images: [
      '/assets/4pics-images/level-3/3 (1).jpg',
      '/assets/4pics-images/level-3/3 (2).jpg',
      '/assets/4pics-images/level-3/3 (3).jpg',
      '/assets/4pics-images/level-3/3 (4).jpg',
    ],
    answer: 'form',
  },
  {
    images: [
      '/assets/4pics-images/level-4/4 (1).jpg',
      '/assets/4pics-images/level-4/4 (1).png',
      '/assets/4pics-images/level-4/4 (2).jpg',
      '/assets/4pics-images/level-4/4 (3).jpg',
    ],
    answer: 'function',
  },
  {
    images: [
      '/assets/4pics-images/level-5/5 (1).avif',
      '/assets/4pics-images/level-5/5 (1).jpg',
      '/assets/4pics-images/level-5/5 (2).avif',
      '/assets/4pics-images/level-5/5 (3).avif',
    ],
    answer: 'database',
  },
  {
    images: [
      '/assets/4pics-images/level-6/6 (1).avif',
      '/assets/4pics-images/level-6/6 (1).jpg',
      '/assets/4pics-images/level-6/6 (2).jpg',
      '/assets/4pics-images/level-6/6 (3).jpg',
    ],
    answer: 'getpost',
  },
  {
    images: [
      '/assets/4pics-images/level-7/7 (1).avif',
      '/assets/4pics-images/level-7/7 (1).jpg',
      '/assets/4pics-images/level-7/7 (1).png',
      '/assets/4pics-images/level-7/7 (2).jpg',
    ],
    answer: 'classes',
  },
  {
    images: [
      '/assets/4pics-images/level-8/8 (1).avif',
      '/assets/4pics-images/level-8/8 (1).jpg',
      '/assets/4pics-images/level-8/8 (1).png',
      '/assets/4pics-images/level-8/8 (2).jpg',
    ],
    answer: 'navbar',
  },
  {
    images: [
      '/assets/4pics-images/level-9/9 (1).avif',
      '/assets/4pics-images/level-9/9 (1).jpg',
      '/assets/4pics-images/level-9/9 (1).png',
      '/assets/4pics-images/level-9/9 (2).jpg',
    ],
    answer: 'frameworks',
  },
  {
    images: [
      '/assets/4pics-images/level-10/10 (1).avif',
      '/assets/4pics-images/level-10/10 (1).jpg',
      '/assets/4pics-images/level-10/10 (1).png',
      '/assets/4pics-images/level-10/10 (2).avif',
    ],
    answer: 'event listener',
  },
];

function shuffleArray(arr) {
  // Fisher-Yates shuffle
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


export default function FourPicsOneWord() {
  const [level, setLevel] = useState(0);
  const [slots, setSlots] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [used, setUsed] = useState([]);
  const [allLetters, setAllLetters] = useState([]);

  const answer = levels[level].answer.toUpperCase();
  const answerLength = answer.length;


  // Always include all answer letters, fill with randoms, then shuffle
  React.useEffect(() => {
    setSlots(Array(answerLength).fill(''));
    setUsed([]);
    setFeedback('');
    const answerArr = answer.split("");
    const extraLetters = [];
    const alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");
    // Fill up to at least 10 or answerLength+4
    let needed = Math.max(10, answerLength + 4) - answerArr.length;
    let i = 0;
    while (extraLetters.length < needed && i < alphabet.length) {
      const letter = alphabet[i];
      // Don't add if already in answer (for uniqueness)
      if (!answerArr.includes(letter)) {
        extraLetters.push(letter);
      }
      i++;
    }
    const all = shuffleArray([...answerArr, ...extraLetters]);
    setAllLetters(all);
    // eslint-disable-next-line
  }, [level]);

  const handleLetterClick = (letter, idx) => {
    if (used.includes(idx)) return;
    const firstEmpty = slots.findIndex(s => s === '');
    if (firstEmpty === -1) return;
    const newSlots = [...slots];
    newSlots[firstEmpty] = letter;
    setSlots(newSlots);
    setUsed([...used, idx]);
  };

  const handleClear = () => {
    setSlots(Array(answerLength).fill(''));
    setUsed([]);
    setFeedback('');
  };

  const handleSubmit = () => {
    if (slots.join('') === answer) {
      setFeedback('✅ Correct!');
    } else {
      setFeedback('❌ Try again!');
    }
  };

  const handleNext = () => {
    setLevel((prev) => (prev + 1) % levels.length);
    setSlots([]);
    setUsed([]);
    setFeedback('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 pt-20 pb-4">
      <div className="w-full max-w-lg mx-auto bg-slate-900 rounded-2xl shadow-2xl p-4 border border-slate-700 flex flex-col items-center" style={{minHeight: '440px'}}>
        <div className="flex items-center justify-between w-full mb-4">
          <div style={{ width: 32 }}></div>
          <h2 className="text-xl font-extrabold text-center flex-1 text-slate-100 drop-shadow-lg">Level {level + 1}</h2>
          <div style={{ width: 32 }}></div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full max-w-xs mx-auto mb-4">
          {levels[level].images.map((img, idx) => (
            <div key={idx} className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center overflow-hidden border-2 border-emerald-400 shadow-md">
              <img src={img} alt="pic" className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-1 mb-3 w-full">
          {slots.map((letter, idx) => (
            <div key={idx} className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center text-2xl font-extrabold border-2 border-emerald-400 text-emerald-300 shadow-sm">
              {letter}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1 mb-3 w-full">
          {allLetters.map((letter, idx) => (
            <button
              key={idx}
              className={`w-10 h-10 rounded-lg bg-slate-800 border-2 border-slate-600 text-lg font-extrabold text-slate-100 hover:bg-emerald-700 hover:text-white transition-all shadow ${used.includes(idx) ? 'opacity-30 pointer-events-none' : ''}`}
              onClick={() => handleLetterClick(letter, idx)}
              disabled={used.includes(idx)}
              style={{transform: 'perspective(100px) scaleZ(1.03)'}}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-3 mb-3 w-full">
          <button onClick={handleClear} className="px-4 py-2 bg-yellow-500 text-slate-900 rounded-lg font-bold hover:bg-yellow-600 transition-all shadow">Clear</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all shadow">Submit</button>
        </div>
        {/* 3D Modal for correct answer */}
        {feedback.startsWith('✅') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div
              className="bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-3xl shadow-2xl flex flex-col items-center animate-pop-modal w-11/12 max-w-lg md:max-w-xl lg:max-w-2xl p-6 md:p-10 lg:p-14"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0,255,128,0.3), 0 1.5px 8px 0 rgba(0,0,0,0.2)',
                animation: 'popModal 0.5s cubic-bezier(.22,1.61,.36,1)'
              }}
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 drop-shadow-lg animate-bounce">🎉</div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">Correct!</div>
              {level === levels.length - 1 ? (
                <div className="px-8 py-5 bg-gradient-to-br from-slate-900 to-slate-700 text-emerald-300 font-extrabold rounded-2xl shadow-2xl text-xl md:text-2xl border-2 border-emerald-400 text-center">
                  Next level coming soon!
                </div>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-10 py-5 bg-gradient-to-br from-slate-900 to-slate-700 text-emerald-300 font-extrabold rounded-2xl shadow-2xl text-xl md:text-2xl hover:scale-105 hover:bg-emerald-600 transition-all border-2 border-emerald-400"
                  style={{transform: 'perspective(100px) scaleZ(1.07)'}}
                >
                  Next Level
                </button>
              )}
            </div>
            <style>{`
              @keyframes popModal {
                0% { opacity: 0; transform: scale(0.7); }
                60% { opacity: 1; transform: scale(1.08); }
                80% { transform: scale(0.97); }
                100% { opacity: 1; transform: scale(1); }
              }
              .animate-pop-modal {
                animation: popModal 0.5s cubic-bezier(.22,1.61,.36,1);
              }
            `}</style>
          </div>
        )}
        {/* Feedback for wrong answer */}
        {feedback && !feedback.startsWith('✅') && (
          <div className="text-center text-base font-bold text-red-400 mt-2">{feedback}</div>
        )}
      </div>
    </div>
  );
}
