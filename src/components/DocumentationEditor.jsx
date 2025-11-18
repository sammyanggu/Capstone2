import React from 'react';

export default function DocumentationEditor({ code, showOutput = true }) {
  return (
    <div className="mb-6 w-full overflow-hidden">
      <div className={`grid grid-cols-1 ${showOutput ? 'md:grid-cols-2' : ''} gap-4`}>
        {/* Code display */}
        <div className="min-h-[400px] w-full">
          <div className="bg-slate-800 rounded-t px-4 py-2 text-slate-300 text-sm border-b border-slate-700">
            Code Example
          </div>
          <pre className="w-full h-[400px] bg-slate-800 text-white rounded-b p-3 font-mono text-sm border-x border-b border-slate-700 overflow-auto">
            {code}
          </pre>
        </div>

        {/* Output preview */}
        {showOutput && (
          <div className="min-h-[400px]">
            <div className="bg-slate-800 rounded-t px-4 py-2 text-slate-300 text-sm border-b border-slate-700">
              Output
            </div>
            <iframe
              className="w-full h-[400px] bg-slate-800 rounded-b"
              style={{ 
                border: '1px solid #334155',
                borderTop: 'none'
              }}
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      body {
                        color: #111;
                        margin: 0;
                        padding: 16px;
                        font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
                      }
                      pre {
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        margin: 0;
                      }
                    </style>
                  </head>
                  <body><pre>${code}</pre></body>
                </html>
              `}
              sandbox="allow-scripts allow-same-origin"
              title="Example Output"
            />
          </div>
        )}
      </div>
    </div>
  );
}