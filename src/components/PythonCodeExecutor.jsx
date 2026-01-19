import React, { useState, useEffect } from 'react';

/**
 * PythonCodeExecutor - Simulates Python code execution and displays output
 * Supports print() statements and basic Python operations
 */
export default function PythonCodeExecutor({ code = '' }) {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  useEffect(() => {
    if (!code || code.trim().length === 0) {
      setOutput('');
      setError('');
      return;
    }

    // Debounce execution
    const timer = setTimeout(() => {
      executePythonCode(code);
    }, 1000);

    return () => clearTimeout(timer);
  }, [code]);

  const executePythonCode = (pythonCode) => {
    setIsExecuting(true);
    setError('');
    setOutput('');

    try {
      // Simple Python print() statement simulator
      const output = simulatePythonExecution(pythonCode);
      setOutput(output);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  const simulatePythonExecution = (code) => {
    // Extract all print statements and their outputs
    const printRegex = /print\s*\((.*?)\)/g;
    const outputs = [];
    let match;

    // Check for syntax errors first
    if (!code.includes('print(') && code.trim().length > 0) {
      // If there's code but no print, don't show error just empty output
      return '';
    }

    // Extract and evaluate print statements
    while ((match = printRegex.exec(code)) !== null) {
      try {
        const arg = match[1].trim();
        
        // Handle string literals
        if ((arg.startsWith('"') && arg.endsWith('"')) || (arg.startsWith("'") && arg.endsWith("'"))) {
          // Remove quotes and output the string
          const stringValue = arg.slice(1, -1);
          outputs.push(stringValue);
        } else if (!isNaN(arg)) {
          // Handle numbers
          outputs.push(arg);
        } else {
          // Try to evaluate as variable (simple approach)
          try {
            // Create a safe function to evaluate variable
            const varMatch = code.match(new RegExp(`${arg}\\s*=\\s*["']([^"']+)["']`));
            if (varMatch) {
              outputs.push(varMatch[1]);
            } else {
              // Try numeric value
              const numMatch = code.match(new RegExp(`${arg}\\s*=\\s*(\\d+)`));
              if (numMatch) {
                outputs.push(numMatch[1]);
              } else {
                // Multiple variables being printed
                const multiVarPattern = /print\s*\((.*?)\)/;
                const multiMatch = code.match(multiVarPattern);
                if (multiMatch && multiMatch[1].includes(',')) {
                  const varNames = multiMatch[1].split(',').map(v => v.trim());
                  const varValues = varNames.map(varName => {
                    const strMatch = code.match(new RegExp(`${varName}\\s*=\\s*["']([^"']+)["']`));
                    if (strMatch) return strMatch[1];
                    
                    const numMatch = code.match(new RegExp(`${varName}\\s*=\\s*(\\d+)`));
                    if (numMatch) return numMatch[1];
                    
                    return varName;
                  });
                  return varValues.join(' ');
                }
                outputs.push(arg);
              }
            }
          } catch (e) {
            outputs.push(arg);
          }
        }
      } catch (err) {
        console.error('Error parsing print statement:', err);
      }
    }

    return outputs.join('\n');
  };

  return (
    <div className="w-full">
      <div className="bg-slate-800 rounded-t px-4 py-2 text-slate-300 text-sm border-b border-slate-700 flex justify-between items-center">
        <span>Output</span>
        {isExecuting && <span className="text-blue-400 text-xs animate-pulse">Running...</span>}
      </div>
      
      <div className="bg-slate-900 rounded-b p-4 min-h-[120px] font-mono text-sm text-white border border-slate-700 border-t-0">
        {error ? (
          <div className="text-red-400">
            <p className="font-semibold mb-2">❌ Error:</p>
            <p>{error}</p>
          </div>
        ) : output ? (
          <div className="text-green-400 whitespace-pre-wrap break-words">
            {output}
          </div>
        ) : (
          <div className="text-slate-500 italic">
            Write a print() statement to see output here...
          </div>
        )}
      </div>
    </div>
  );
}
