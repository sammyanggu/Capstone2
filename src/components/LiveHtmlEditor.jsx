// Live HTML editor component for interactive code editing and preview
import React, { useState } from 'react';

export default function LiveHtmlEditor({ initialCode, onChange }) {
  // State to hold the current code in the editor
  const [code, setCode] = useState(initialCode);

  // Call the onChange prop whenever code changes
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  };

  return (
    <div className="mb-6">
      {/* Label for the editor */}
      <label className="block text-fuchsia-300 font-semibold mb-2">Try it yourself:</label>
      {/* Code editor container */}
      <div className="space-y-4">
        {/* Textarea for code input */}
        <textarea
          className="w-full bg-slate-800 text-fuchsia-200 rounded p-3 font-mono text-sm border border-slate-700 focus:outline-none focus:border-fuchsia-400"
          style={{
            height: 'auto',
            minHeight: '400px',
            maxHeight: '600px',
            resize: 'vertical',
            overflowY: 'auto'
          }}
          value={code}
          onChange={e => handleCodeChange(e.target.value)}
          spellCheck={false}
        />
        {/* Live preview iframe */}
        <iframe
          className="bg-white rounded p-4 shadow-inner w-full mt-4"
          style={{ 
            height: '400px',
            border: '1px solid #e2e8f0',
            color: '#111',
            overflowY: 'auto'
          }}
          srcDoc={`
            <head>
              <style>
                body { color: #111; }
                /* Ensure black text on white backgrounds */
                [style*="background: white"], [style*="background-color: white"],
                [style*="background:#fff"], [style*="background-color:#fff"],
                [style*="background:#ffffff"], [style*="background-color:#ffffff"] {
                  color: #000 !important;
                }
              </style>
            </head>
            <body>${code}</body>
          `}
          sandbox="allow-scripts allow-same-origin"
          title="Live HTML Preview"
        />
      </div>
    </div>
  );
}
