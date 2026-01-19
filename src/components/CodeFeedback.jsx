import React from 'react';
import { generateSmartFeedback } from '../services/smartAIFeedback';
import { saveAIFeedback } from '../utils/aiFeedbackTracker';

export default function CodeFeedback({ code = '', language = 'php', task = '', exerciseId = '', level = 'beginner' }) {
  const [feedback, setFeedback] = React.useState('');
  const [feedbackType, setFeedbackType] = React.useState('');
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState('');
  const debounceRef = React.useRef(null);
  const lastRequestRef = React.useRef('');

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

    // Set debounce for 1 second (faster for real-time feedback)
    debounceRef.current = setTimeout(() => {
      triggerSmartFeedback(code, language, exerciseId, level, task);
    }, 1000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [code, language, task, level, exerciseId]);

  function triggerSmartFeedback(src, lang, exId, difficulty, taskDesc) {
    setGenerating(true);
    setError('');
    lastRequestRef.current = `${src}|${lang}|${taskDesc}`;

    try {
      // Generate smart conditional feedback
      const feedbackResult = generateSmartFeedback(src, lang, exId, difficulty, taskDesc);
      
      setFeedback(feedbackResult.feedback);
      setFeedbackType(feedbackResult.type);
      setGenerating(false);

      // Save to Firebase if feedback is meaningful (non-blocking)
      if (exId && feedbackResult.feedback && feedbackResult.shouldShow) {
        saveAIFeedback(exId, src, feedbackResult.feedback, lang).catch(err => {
          console.error('Error saving feedback:', err);
        });
      }
    } catch (err) {
      console.error('AI Feedback Error:', err);
      setError(`Error: ${err.message}`);
      setFeedback('');
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
          ) : feedback && !generating ? (
            <div className="leading-relaxed whitespace-pre-wrap">
              {feedback}
            </div>
          ) : generating && !feedback ? (
            <div className="text-slate-400 text-xs">Generating feedback...</div>
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
