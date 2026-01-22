import React, { useState } from 'react';
import { getAIHint } from '../utils/aiHintService';

export default function AIHintButton({ code = '', language = 'html' }) {
  const [hint, setHint] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(false);

  const handleGetHint = async () => {
    if (!code || !code.trim()) {
      setError('Please write some code first');
      return;
    }

    setError('');
    setHint('');
    setLoading(true);

    try {
      const result = await getAIHint(code, language);

      if (typeof result === 'string' && !result.startsWith('⚠️') && !result.startsWith('Error')) {
        setHint(result);
        setShowHint(true);
      } else {
        setError(result || 'Failed to get hint');
      }
    } catch (err) {
      setError(err.message || 'Failed to get hint');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <button
        onClick={handleGetHint}
        disabled={loading}
        className="px-3 py-2 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {loading ? '⏳ Getting hint...' : '💡 Get AI Hint'}
      </button>

      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 text-sm rounded">
          {error}
        </div>
      )}

      {showHint && hint && (
        <div className="mt-2 p-3 bg-blue-50 border border-blue-300 rounded text-sm">
          <p className="text-blue-900 font-semibold mb-1">💡 Hint:</p>
          <p className="text-blue-800">{hint}</p>
          <button
            onClick={() => setShowHint(false)}
            className="text-xs text-blue-600 hover:text-blue-800 mt-2 underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
