// Live HTML editor component for interactive code editing and preview
import React, { useState } from 'react';

export default function LiveHtmlEditor({ initialCode }) {
  // State to hold the current code in the editor
  const [code, setCode] = useState(initialCode);

  return (
    <div className="mb-6">
      {/* Label for the editor */}
      <label className="block text-fuchsia-300 font-semibold mb-2">Try it yourself:</label>
      {/* Textarea for code input */}
      <textarea
        className="w-full bg-slate-800 text-fuchsia-200 rounded p-3 font-mono text-sm mb-2 border border-slate-700 focus:outline-none focus:border-fuchsia-400 min-h-[120px]"
        value={code}
        onChange={e => setCode(e.target.value)}
        spellCheck={false}
      />
      {/* Live preview iframe */}
      <iframe
        className="bg-white rounded p-4 min-h-[60px] shadow-inner w-full"
        style={{ minHeight: 60, border: 0, color: '#111' }}
        srcDoc={`<body style='color:#111;'>${code}</body>`}
        sandbox="allow-scripts allow-same-origin"
        title="Live HTML Preview"
      />
    </div>
  );
}
