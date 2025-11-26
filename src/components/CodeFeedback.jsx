import React from 'react';

export default function CodeFeedback({ code = '', language = 'php', task = '' }) {
  const [issues, setIssues] = React.useState([]);
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const handler = setTimeout(() => analyzeWithAI(code, language, task), 600);
    return () => clearTimeout(handler);
  }, [code, language, task]);

  async function analyzeWithAI(src, lang, taskDesc) {
    if (!src || src.trim().length === 0) {
      setIssues([{ level: 'info', message: 'No code yet — start typing to get AI feedback.' }]);
      setGenerating(false);
      setError('');
      return;
    }

    setGenerating(true);
    setError('');

    try {
      // Call local Vertex AI API server for code review
      const response = await fetch('http://localhost:3001/api/review-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: src,
          language: lang,
          task: taskDesc
        })
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      const feedback = data.feedback || [];
      setIssues(feedback.length > 0 ? feedback : [{ level: 'success', message: '✨ Code looks great!' }]);
      setGenerating(false);
    } catch (err) {
      console.error('❌ AI Review Error:', err);
      setError(`Error: ${err.message}`);
      setGenerating(false);
    }
  }

  const colorFor = (level) => {
    switch (level) {
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      case 'info': return 'text-sky-400';
      case 'hint': return 'text-indigo-300';
      case 'success': return 'text-emerald-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="mt-4 relative">
      {generating && (
        <div className="absolute -top-16 right-0 z-30">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-sky-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 22c1.5-1 2-2 2-3 0-2-3-3-3-5 0-3 4-4 6-4s5 1 5 3c0 2-1 3-1 4 0 1 1 2 2 3H7z" fill="white" opacity="0.95" />
              </svg>
            </div>
            <div className="text-xs text-sky-300 font-semibold animate-bounce">
              AI thinking<span className="inline-block animation-dots">...</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold text-emerald-300">AI Assistant</h4>
          <span className="text-xs text-gray-400">{issues.length} item(s)</span>
        </div>

        {error && (
          <div className="mb-2 p-2 bg-red-900/30 border border-red-700/50 rounded text-red-300 text-xs">
            {error}
          </div>
        )}

        <div className="space-y-2 text-sm">
          {generating && issues.length === 0 ? (
            <div className="text-slate-300 italic text-xs">Analyzing your code with AI...</div>
          ) : issues.length === 0 ? (
            <div className="text-slate-300 text-xs">The AI assistant will provide feedback here.</div>
          ) : (
            issues.map((it, idx) => (
              <div key={idx} className="flex gap-2 items-start">
                <div className={`shrink-0 ${colorFor(it.level)} font-bold text-lg`}>
                  {it.level === 'warning' || it.level === 'error' ? '' : it.level === 'info' ? 'ℹ' : it.level === 'hint' ? '' : ''}
                </div>
                <div className="flex-1 text-slate-200 text-xs leading-relaxed">{it.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
