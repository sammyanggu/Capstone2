import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import CodeFeedback from '../../../../components/CodeFeedback';
import PythonCodeExecutor from '../../../../components/PythonCodeExecutor';
import { toast } from 'react-toastify';

export default function PythonAdvanced() {
  const { currentUser } = useAuth();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseStatus, setExerciseStatus] = useState({
    0: false, 1: false, 2: false, 3: false
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userCode, setUserCode] = useState('');
  const [showError, setShowError] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
  const isInitialLoadRef = useRef(true);

  // Load current exercise index from Firebase
  useEffect(() => {
    const loadExerciseIndex = async () => {
      if (currentUser?.uid) {
        try {
          // Load completion status for each exercise (4 exercises for Python Advanced)
          const newStatus = { ...exerciseStatus };
          for (let i = 0; i < 4; i++) {
            const progress = await getExerciseProgress(currentUser.uid, 'python', `advanced-${i}`);
            if (progress && progress.isCompleted) {
              newStatus[i] = true;
            }
          }
          setExerciseStatus(newStatus);
          console.log('Loaded Python advanced exercise statuses:', newStatus);

          const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'python', 'advanced');
          if (savedIndex !== null && savedIndex !== undefined) {
            setCurrentExercise(savedIndex);
            console.log(`✅ Resumed from exercise ${savedIndex}`);
          }
          isInitialLoadRef.current = false;
        } catch (err) {
          console.error('Error loading Python advanced exercise index:', err);
          isInitialLoadRef.current = false;
        }
      } else {
        isInitialLoadRef.current = false;
      }
    };

    loadExerciseIndex();
  }, [currentUser]);

  // Save current exercise index to Firebase whenever it changes (but not during initial load)
  useEffect(() => {
    if (isInitialLoadRef.current) return;
    
    const saveIndex = async () => {
      if (currentUser?.uid) {
        try {
          await saveCurrentExerciseIndex(currentUser.uid, 'python', 'advanced', currentExercise);
        } catch (err) {
          console.error('Error saving current exercise index:', err);
        }
      }
    };

    saveIndex();
  }, [currentExercise, currentUser]);

  // Reset state when exercise changes
  useEffect(() => {
    setShowHints(false);
    setShowSolution(false);
    setUserCode('');
  }, [currentExercise]);

  const exercises = [
    {
      title: "Decorators",
      description: "Create and use a decorator function",
      type: "coding",
      task: "Write a decorator function that wraps another function and prints 'Before' before execution and 'After' after execution",
      initialCode: `# Write your decorator here\n`,
      solution: `def decorator(func):\n    def wrapper():\n        print("Before")\n        func()\n        print("After")\n    return wrapper\n\n@decorator\ndef greet():\n    print("Hello")\n\ngreet()`,
      hints: [
        "Decorators wrap a function to modify its behavior",
        "The @decorator syntax applies the decorator",
        "The wrapper function executes before and after the original function",
        "Use nested functions for decorators"
      ]
    },
    {
      title: "Class with Methods",
      description: "Creating a class with multiple methods",
      type: "coding",
      task: "Create a class 'Person' with name and age attributes, and a method greet() that returns a greeting",
      initialCode: `# Define your class here\n`,
      solution: `class Person:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n    \n    def greet(self):\n        return f"Hello, I'm {self.name} and I'm {self.age} years old"`,
      hints: [
        "Use 'class Person:' to define the class",
        "Use __init__ to initialize attributes",
        "Store name and age as self.name and self.age",
        "Create a greet() method that returns a string"
      ]
    },
    {
      title: "Generators",
      description: "Working with generator functions",
      type: "coding",
      task: "Write a generator function that yields numbers from 0 to n-1",
      initialCode: `# Write your generator here\n`,
      solution: `def count_up(n):\n    i = 0\n    while i < n:\n        yield i\n        i += 1\n\nfor num in count_up(3):\n    print(num)`,
      hints: [
        "Generators use 'yield' to produce values one at a time",
        "yield pauses and returns a value, remembering where it left off",
        "Create a while loop that yields values",
        "Each value is printed on a new line"
      ]
    },
    {
      title: "Exception Handling",
      description: "Handle errors gracefully",
      type: "coding",
      task: "Write a function that divides two numbers and handles the case when dividing by zero",
      initialCode: `# Write your function here\n`,
      solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "Cannot divide by zero"`,
      hints: [
        "Use try-except blocks to handle errors",
        "ZeroDivisionError occurs when dividing by 0",
        "Return a message if an error is caught",
        "Otherwise return the result of the division"
      ]
    }
  ];

  const handleCodeSubmit = async () => {
    const currentEx = exercises[currentExercise];
    setShowError(false);

    // Flexible validation based on exercise index and requirements
    let isCorrect = false;

    const code = userCode.trim();
    const codeLower = code.toLowerCase();

    if (currentExercise === 0) {
      // Exercise 0: Decorators - must use decorator syntax and wrapper function
      isCorrect = 
        codeLower.includes('def') &&
        codeLower.includes('@') &&
        codeLower.includes('wrapper') &&
        codeLower.includes('def') &&
        codeLower.includes('return');
    } else if (currentExercise === 1) {
      // Exercise 1: Class with methods - must define class Person with __init__ and method
      isCorrect = 
        codeLower.includes('class person') &&
        codeLower.includes('def __init__') &&
        codeLower.includes('self') &&
        codeLower.includes('def greet') &&
        codeLower.includes('return');
    } else if (currentExercise === 2) {
      // Exercise 2: Generators - must use yield keyword and function definition
      isCorrect = 
        codeLower.includes('def') &&
        codeLower.includes('yield') &&
        codeLower.includes('for') &&
        codeLower.includes('print');
    } else if (currentExercise === 3) {
      // Exercise 3: Exception handling - must use try-except blocks
      isCorrect = 
        codeLower.includes('def safe_divide') &&
        codeLower.includes('try') &&
        codeLower.includes('except') &&
        codeLower.includes('return');
    }

    if (isCorrect) {
      setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
      setShowCongrats(true);

      setTimeout(async () => {
        setShowCongrats(false);

        // Save exercise completion to Firebase
        if (currentUser?.uid) {
          try {
            const levelKey = `advanced-${currentExercise}`;
            await saveExerciseProgress(currentUser.uid, 'python', levelKey, userCode, true, 10);
            console.log(`✅ Saved Python exercise ${levelKey} completion`);
          } catch (err) {
            console.error('Error saving exercise completion:', err);
          }
        }

        if (currentExercise < exercises.length - 1) {
          const nextIndex = currentExercise + 1;
          setCurrentExercise(nextIndex);

          // Save the new index to Firebase
          if (currentUser?.uid) {
            try {
              await saveCurrentExerciseIndex(currentUser.uid, 'python', 'advanced', nextIndex);
              console.log(`✅ Saved Python advanced index: ${nextIndex}`);
            } catch (err) {
              console.error('Error saving new index:', err);
            }
          }
        } else if (currentExercise === exercises.length - 1 && currentUser?.uid) {
          toast.success('Python Advanced completed! 🎉');
        }
      }, 2000);
    } else {
      setShowError(true);
      toast.error('Not quite! Check your code and try again.');
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const canAccessExercise = (index) => {
    if (index === 0) return true;
    return exerciseStatus[index - 1] === true;
  };

  const currentExerciseData = exercises[currentExercise];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Congratulations Celebration */}
      {showCongrats && (
        <>
          <Confetti duration={3000} />
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 pointer-events-none" />
          <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-emerald-600 mb-4">🎉 Congratulations! 🎉</h1>
              <p className="text-3xl text-white">You've completed this exercise!</p>
              {currentExercise < exercises.length - 1 && (
                <p className="text-xl text-white mt-4">Moving to next exercise...</p>
              )}
            </div>
          </div>
        </>
      )}

      {/* Exercise Locked Modal */}
      {lockedExerciseIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl border border-orange-500 max-w-sm">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-orange-600 mb-2">🔒 Exercise Locked</h3>
              <p className="text-gray-700 mb-4">This exercise has already been completed!</p>
              <p className="text-gray-600 text-sm mb-4">
                You can reset your progress in the Settings page to retry this exercise.
              </p>
              <button
                onClick={() => setLockedExerciseIndex(null)}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-emerald-600 mb-3">Python Advanced Exercises</h1>
          
          {/* Exercise Navigation */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {exercises.map((ex, index) => (
              <button
                key={index}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  !canAccessExercise(index)
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : currentExercise === index
                    ? 'bg-emerald-500 text-white'
                    : exerciseStatus[index]
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                }`}
                onClick={() => {
                  if (!canAccessExercise(index)) {
                    setLockedExerciseIndex(index);
                    return;
                  }
                  setCurrentExercise(index);
                }}
                disabled={!canAccessExercise(index)}
              >
                Exercise {index + 1}
                {exerciseStatus[index] && (
                  <span className="ml-1">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Current Exercise */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
            <h2 className="text-lg font-bold text-emerald-600 mb-1">{currentExerciseData.title}</h2>
            <p className="text-gray-700 mb-3 text-sm">{currentExerciseData.description}</p>
            
            <div className="space-y-4">
                <div className="bg-gray-50 rounded p-4 mb-4 border border-gray-300">
                  <h3 className="text-lg font-semibold text-emerald-600 mb-3">Your Task:</h3>
                  <p className="text-gray-700 mb-4">{currentExerciseData.task}</p>
                  
                  {/* Code Editor and Output */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Code Editor */}
                    <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                      <div className="p-3 flex gap-2 items-center bg-slate-800 border-b border-slate-700/50">
                        <button
                          className="px-3 py-1 bg-slate-600 text-white rounded text-sm hover:bg-slate-700 transition-colors"
                          onClick={() => setUserCode('')}
                        >
                          Clear Code
                        </button>
                      </div>
                      {/* Code Editor Header */}
                      <div className="bg-slate-800 px-4 py-2 text-slate-300 text-sm border-b border-slate-700 flex justify-between items-center">
                        <span>Code Editor</span>
                      </div>
                      {/* Code Editor Area */}
                      <textarea
                        value={userCode || currentExerciseData.initialCode}
                        onChange={(e) => {
                          setUserCode(e.target.value);
                          setShowError(false);
                        }}
                        className="w-full h-96 p-3 font-mono text-sm bg-slate-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        style={{
                          resize: 'none',
                          overflowY: 'auto',
                          maxWidth: '100%',
                          whiteSpace: 'pre',
                          wordWrap: 'normal',
                          overflowX: 'auto'
                        }}
                        spellCheck="false"
                      />
                    </div>

                    {/* Output Display */}
                    <div>
                      <PythonCodeExecutor code={userCode} />
                    </div>
                  </div>

                  {/* AI Feedback Component */}
                  <div className="mt-4">
                    <CodeFeedback 
                      code={userCode} 
                      language="python" 
                      task={currentExerciseData.task}
                      exerciseId={currentExercise}
                      level="advanced"
                    />
                  </div>

                  {/* Submit and Solution Buttons */}
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={handleCodeSubmit}
                      className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer text-sm font-medium"
                    >
                      Submit Code
                    </button>

                    <button 
                      className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-2 px-4 py-1.5 border border-emerald-600 rounded bg-white"
                      onClick={() => setShowSolution(!showSolution)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      {showSolution ? 'Hide Solution' : 'Show Solution'}
                    </button>
                  </div>

                  {showError && (
                    <div className="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
                      <p>Not quite! Check your code and try again.</p>
                    </div>
                  )}
                  
                  {exerciseStatus[currentExercise] && (
                    <div className="mt-4 bg-green-50 border border-green-300 text-green-700 px-4 py-3 rounded">
                      <p>Correct! Great job!</p>
                    </div>
                  )}

                  {showSolution && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-300">
                      <p className="font-semibold text-blue-800 mb-2">Solution:</p>
                      <pre className="bg-slate-900 text-white p-3 rounded overflow-x-auto text-sm font-mono">
                        {currentExerciseData.solution}
                      </pre>
                    </div>
                  )}

                  {/* Hints */}
                  {!exerciseStatus[currentExercise] && (
                    <button
                      onClick={() => setShowHints(!showHints)}
                      className="w-full mt-4 py-2 px-4 text-emerald-600 font-semibold hover:bg-emerald-50 rounded-lg transition-all"
                    >
                      {showHints ? '▼ Hide Hints' : '▶ Show Hints'}
                    </button>
                  )}

                  {showHints && !exerciseStatus[currentExercise] && (
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-300">
                      <p className="font-semibold text-yellow-800 mb-2">Hints:</p>
                      <ul className="list-disc pl-5 text-yellow-800 space-y-1">
                        {currentExerciseData.hints.map((hint, index) => (
                          <li key={index}>{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
