import React, { useState, useEffect } from 'react';

export default function LiveHtmlEditor({ initialCode = '', onChange, solution }) {
  const [code, setCode] = useState(initialCode);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (event) => {
    const newCode = event.target.value;
    setCode(newCode);
    try {
      // Debug: log that the editor is emitting change events
      console.log('LiveHtmlEditor onChange ->', newCode.substring(0, 200));
      if (onChange) {
        onChange(newCode);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mb-6 w-full overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Code editor */}
        <div className="min-h-[400px] w-full">
          <div className="bg-slate-800 rounded-t px-4 py-2 text-slate-300 text-sm border-b border-slate-700 flex justify-between items-center">
            <span>Code Editor</span>
            {error && <span className="text-white text-xs">{error}</span>}
          </div>
          <textarea
            className="w-full h-[400px] bg-slate-800 text-white rounded-b p-3 font-mono text-sm border-x border-b border-slate-700 focus:outline-none focus:border-slate-800"
            style={{
              resize: 'none',
              overflowY: 'auto',
              maxWidth: '100%',
              whiteSpace: 'pre',
              wordWrap: 'normal',
              overflowX: 'auto'
            }}
            value={code}
            onChange={handleCodeChange}
            spellCheck={false}
          />
        </div>

        {/* Output preview */}
        <div className="min-h-[400px]">
          <div className="bg-slate-800 rounded-t px-4 py-2 text-slate-300 text-sm border-b border-slate-700">
            Output
          </div>
          <iframe
            className="w-full h-[400px] bg-white rounded-b"
            style={{ 
              border: '1px solid #334155',
              borderTop: 'none',
              background: '#ffffff'
            }}
            srcDoc={`
              <!DOCTYPE html>
              <html>
                <head>
                  <style>
                    body {
                      background: #ffffff;
                      color: #000000;
                      margin: 0;
                      padding: 16px;
                      font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
                    }
                  </style>
                </head>
                <body>${code}</body>
              </html>
            `}
            sandbox="allow-scripts allow-same-origin"
            title="Live Preview"
          />
        </div>
      </div>
    </div>
  );
}
