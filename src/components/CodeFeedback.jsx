import React from 'react';
import { generateSmartFeedback } from '../services/smartAIFeedback';

export default function CodeFeedback({ code = '', language = 'php', task = '', exerciseId = '', level = 'beginner', correctAnswer = '' }) {
  const [feedback, setFeedback] = React.useState('');
  const [displayedFeedback, setDisplayedFeedback] = React.useState('');
  const [feedbackType, setFeedbackType] = React.useState('');
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState('');
  const debounceRef = React.useRef(null);
  const lastRequestRef = React.useRef('');
  const typingRef = React.useRef(null);

  // Typing effect - display feedback character by character
  React.useEffect(() => {
    if (!feedback) {
      setDisplayedFeedback('');
      return;
    }

    // Clear existing typing animation
    if (typingRef.current) {
      clearInterval(typingRef.current);
    }

    let currentIndex = 0;
    const typingSpeed = 15; // milliseconds per character

    typingRef.current = setInterval(() => {
      if (currentIndex < feedback.length) {
        setDisplayedFeedback(feedback.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingRef.current);
      }
    }, typingSpeed);

    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current);
      }
    };
  }, [feedback]);

  // Auto-trigger smart AI feedback with debounce
  React.useEffect(() => {
    // Clear existing timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Only trigger if code changed
    const codeSignature = `${code}|${language}|${task}`;
    if (codeSignature === lastRequestRef.current) {
      return; // Same as last request, skip
    }

    // Show "generating" immediately when code changes
    if (code.trim()) {
      setGenerating(true);
      setFeedback('');
      setDisplayedFeedback('');
    }

    // Set debounce for 2 seconds (wait longer to avoid rate limiting)
    debounceRef.current = setTimeout(() => {
      triggerSmartFeedback(code, language, exerciseId, level, task, correctAnswer);
    }, 2000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [code, language, task, level, exerciseId, correctAnswer]);

  function triggerSmartFeedback(src, lang, exId, difficulty, taskDesc, correctAns = '') {
    try {
      // Generate smart conditional feedback (now async)
      generateSmartFeedback(src, lang, exId, difficulty, taskDesc, correctAns)
        .then(feedbackResult => {
          setFeedback(feedbackResult.feedback);
          setFeedbackType(feedbackResult.type);
          setGenerating(false);
          setError('');
        })
        .catch(err => {
          setError(`Error generating feedback`);
          setFeedback('');
          setDisplayedFeedback('');
          setGenerating(false);
        });
    } catch (err) {
      setError(`Error: ${err.message}`);
      setFeedback('');
      setDisplayedFeedback('');
      setGenerating(false);
    }
  }

  return (
    <div className="w-full mt-4">
      {/* Loading indicator - responsive positioning */}
      {generating && (
        <div className="mb-2 flex items-center gap-2">
          <div className="w-4 h-4 bg-gradient-to-br from-indigo-500 to-sky-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-sky-300 font-semibold">AI analyzing your code...</span>
        </div>
      )}

      {/* Feedback panel - responsive design */}
      <div className="rounded-lg p-3 sm:p-4 border bg-slate-900/80 border-slate-700">
        <div className="flex items-center justify-between gap-2 mb-3">
          <h4 className="text-sm font-semibold truncate text-emerald-300">
            ✨ AI Feedback
          </h4>
          {generating && <div className="animate-spin h-4 w-4 border-2 border-sky-500 border-t-transparent rounded-full"></div>}
        </div>

        {error && (
          <div className="mb-3 p-2 bg-red-900/30 border border-red-700/50 rounded text-red-300 text-xs">
            {error}
          </div>
        )}

        {/* Feedback content - responsive text sizing */}
        <div className="space-y-2 text-xs sm:text-sm max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-800 text-slate-100">
          {!feedback && !generating ? (
            <div className="text-slate-400 italic text-xs">
              Start typing to get AI feedback on your code.
            </div>
          ) : displayedFeedback || generating ? (
            <div className="leading-relaxed whitespace-pre-wrap">
              {displayedFeedback}
              {generating && displayedFeedback && <span className="animate-pulse">▌</span>}
            </div>
          ) : null}
        </div>
      </div>

      {/* Mobile-optimized spacing */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 3px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(71, 85, 105, 0.7);
        }
      `}</style>
    </div>
  );
}
