// LeetCode-style coding exercises page
// Uses Monaco Editor and Judge0 API for code execution
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

// Judge0 API endpoint and headers
const JUDGE0_API = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';
const JUDGE0_HEADERS = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Replace with your RapidAPI key
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
};

// List of coding problems
const PROBLEMS = [
  {
    id: 1,
    title: 'Sum of Two Numbers',
    difficulty: 'Easy',
    description: 'Write a function that returns the sum of two numbers.',
    input: 'a = 2, b = 3',
    output: '5',
    starterCode: 'def sum_two_numbers(a, b):\n    # Write your code here\n    return 0',
    language: 'python',
    languageId: 71,
    testInput: '2 3',
    expectedOutput: '5\n',
  },
  {
    id: 2,
    title: 'Reverse a String',
    difficulty: 'Easy',
    description: 'Write a function that reverses a string.',
    input: 's = "hello"',
    output: '"olleh"',
    starterCode: 'def reverse_string(s):\n    # Write your code here\n    return ""',
    language: 'python',
    languageId: 71,
    testInput: 'hello',
    expectedOutput: 'olleh\n',
  },
  // Add more problems as needed
];

export default function ExercisesLeetCode() {
  // State for selected problem
  const [selected, setSelected] = useState(PROBLEMS[0]);
  // State for code in editor
  const [code, setCode] = useState(selected.starterCode);
  // State for output, error, loading, and result
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  // Handle problem selection
  const handleSelect = (problem) => {
    setSelected(problem);
    setCode(problem.starterCode);
    setOutput('');
    setError('');
    setResult('');
  };

  // Handle code execution (run button)
  const handleRun = async () => {
    setLoading(true);
    setOutput('');
    setError('');
    setResult('');
    try {
      // Submit code to Judge0 API
      const response = await axios.post(
        JUDGE0_API,
        {
          source_code: code,
          language_id: selected.languageId,
          stdin: selected.testInput,
        },
        { headers: JUDGE0_HEADERS }
      );
      // Set output/result
      setOutput(response.data.stdout || '');
      setResult(response.data.status.description);
    } catch (err) {
      setError('Error running code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen pt-28 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Problem List */}
        <aside className="w-full md:w-72 bg-slate-800 rounded-lg p-4 mb-4 md:mb-0">
          <h2 className="text-fuchsia-400 font-bold mb-3 text-lg">Problems</h2>
          <ul className="flex flex-col gap-2">
            {PROBLEMS.map((p) => (
              <li key={p.id}>
                <button
                  className={`w-full text-left px-3 py-2 rounded transition font-semibold ${selected.id === p.id ? 'bg-fuchsia-700/20 text-fuchsia-300' : 'hover:bg-slate-700 text-slate-200'}`}
                  onClick={() => handleSelect(p)}
                >
                  {p.title} <span className={`ml-2 text-xs ${p.difficulty === 'Easy' ? 'text-green-400' : p.difficulty === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>{p.difficulty}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>
        {/* Problem Details & Editor */}
        <main className="flex-1 bg-slate-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-fuchsia-400 mb-2">{selected.title}</h2>
          <div className="mb-4 text-slate-200">
            <p>{selected.description}</p>
            <div className="mt-2 text-sm">
              <div><span className="font-semibold">Input:</span> {selected.input}</div>
              <div><span className="font-semibold">Output:</span> {selected.output}</div>
            </div>
          </div>
          <Editor
            height="200px"
            defaultLanguage={selected.language}
            language={selected.language}
            value={code}
            onChange={v => setCode(v)}
            theme="vs-dark"
          />
          <button
            className="btn1h mt-4 px-6 py-2"
            onClick={handleRun}
            disabled={loading}
          >
            {loading ? 'Running...' : 'Run Code'}
          </button>
          {output && (
            <div className="mt-4 bg-slate-900 text-fuchsia-200 rounded p-4">
              <strong>Output:</strong>
              <pre>{output}</pre>
              {result && <div className={`mt-2 font-bold ${result === 'Passed!' ? 'text-green-400' : 'text-red-400'}`}>{result}</div>}
            </div>
          )}
          {error && (
            <div className="mt-4 bg-red-900 text-red-200 rounded p-4">
              <strong>Error:</strong>
              <pre>{error}</pre>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
