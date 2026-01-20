import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import CodeFeedback from '../../../../components/CodeFeedback';
import PythonCodeExecutor from '../../../../components/PythonCodeExecutor';
import { toast } from 'react-toastify';

export default function PythonBeginner() {
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
          // Load completion status for each exercise (4 exercises for Python Beginner)
          const newStatus = { ...exerciseStatus };
          for (let i = 0; i < 4; i++) {
            const progress = await getExerciseProgress(currentUser.uid, 'python', `beginner-${i}`);
            if (progress && progress.isCompleted) {
              newStatus[i] = true;
            }
          }
          setExerciseStatus(newStatus);
          console.log('Loaded Python beginner exercise statuses:', newStatus);

          const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'python', 'beginner');
          if (savedIndex !== null && savedIndex !== undefined) {
            setCurrentExercise(savedIndex);
            console.log(`✅ Resumed from exercise ${savedIndex}`);
          }
          isInitialLoadRef.current = false;
        } catch (err) {
          console.error('Error loading Python beginner exercise index:', err);
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
          await saveCurrentExerciseIndex(currentUser.uid, 'python', 'beginner', currentExercise);
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
      title: "Hello, Python!",
      description: "Write a simple program to print a greeting",
      type: "coding",
      task: "Write a Python program that prints 'Hello, World!'",
      initialCode: `# Write your code below\n`,
      solution: `print("Hello, World!")`,
      hints: [
        "Use the print() function to output text",
        "Put your message inside quotes",
        "Don't forget the parentheses after print"
      ]
    },
    {
      title: "Your First Print Statement",
      description: "Write a Python program to print a message",
      type: "coding",
      task: "Write a Python program that prints 'I love coding!'",
      initialCode: `# Write your code below\n`,
      solution: `print("I love coding!")`,
      hints: [
        "Use the print() function to output text",
        "Put your message inside quotes",
        "Don't forget the parentheses after print"
      ]
    },
    {
      title: "Working with Variables",
      description: "Create variables and print them",
      type: "coding",
      task: "Create variables 'name' with value 'Alice' and 'age' with value 25, then print both of them",
      initialCode: `# Create your variables here\n`,
      solution: `name = "Alice"\nage = 25\nprint(name, age)`,
      hints: [
        "Use the = operator to assign values to variables",
        "Create a variable 'name' with a string value",
        "Create a variable 'age' with a number value",
        "Use print() to display both variables separated by a comma"
      ]
    },
    {
      title: "Creating Variables",
      description: "Create and use variables in Python",
      type: "coding",
      task: "Create a variable 'favorite_food' with your favorite food and print it",
      initialCode: `# Create and print your favorite food\n`,
      solution: `favorite_food = "pizza"\nprint(favorite_food)`,
      hints: [
        "Use the = operator to assign a value to a variable",
        "Variable names should be lowercase with underscores",
        "Use print() to display the variable"
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
      // Exercise 0: Must print "Hello, World!"
      isCorrect = codeLower.includes('print') && code.includes('"Hello, World!"');
    } else if (currentExercise === 1) {
      // Exercise 1: Must print "I love coding!"
      isCorrect = codeLower.includes('print') && code.includes('"I love coding!"');
    } else if (currentExercise === 2) {
      // Exercise 2: Must create variables and print them
      isCorrect = 
        codeLower.includes('name') && 
        codeLower.includes('alice') && 
        codeLower.includes('age') && 
        codeLower.includes('25') && 
        codeLower.includes('print');
    } else if (currentExercise === 3) {
      // Exercise 3: Must create favorite_food variable and print it
      isCorrect = 
        codeLower.includes('favorite_food') && 
        codeLower.includes('print') &&
        code.includes('='); // Has assignment operator
    }

    if (isCorrect) {
      setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
      setShowCongrats(true);

      setTimeout(async () => {
        setShowCongrats(false);

        // Save exercise completion to Firebase
        if (currentUser?.uid) {
          try {
            const levelKey = `beginner-${currentExercise}`;
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
              await saveCurrentExerciseIndex(currentUser.uid, 'python', 'beginner', nextIndex);
              console.log(`✅ Saved Python beginner index: ${nextIndex}`);
            } catch (err) {
              console.error('Error saving new index:', err);
            }
          }
        } else if (currentExercise === exercises.length - 1 && currentUser?.uid) {
          toast.success('Python Beginner completed! 🎉');
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
                        <div className="text-center px-4">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-emerald-600 mb-2 sm:mb-4">🎉 Congratulations! 🎉</h1>
                            <p className="text-lg sm:text-2xl md:text-3xl text-white">You've completed this exercise!</p>
                            {currentExercise < exercises.length - 1 && (
                                <p className="text-sm sm:text-base md:text-lg text-white mt-2 sm:mt-4">Moving to next exercise...</p>
                            )}
                        </div>
                    </div>
                </>
            )}      {/* Exercise Locked Modal */}
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

      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-emerald-600 mb-3">Python Beginner Exercises</h1>
          
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
                  
                  {/* Code Editor and Output with AI Feedback */}
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                    {/* Left Column: Code Editor */}
                    <div className="lg:col-span-2">
                      <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden h-full flex flex-col">
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
                          className="flex-1 p-4 font-mono text-sm bg-slate-800 text-white border-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          style={{
                            resize: 'none',
                            overflowY: 'auto',
                            maxWidth: '100%',
                            whiteSpace: 'pre',
                            wordWrap: 'normal',
                            overflowX: 'auto',
                            minHeight: '400px'
                          }}
                          spellCheck="false"
                        />
                      </div>
                    </div>

                    {/* Middle Column: Output Display */}
                    <div className="lg:col-span-1">
                      <div className="h-full flex flex-col">
                        <PythonCodeExecutor code={userCode} />
                      </div>
                    </div>

                    {/* Right Column: AI Feedback */}
                    <div className="lg:col-span-1">
                      <CodeFeedback 
                        code={userCode} 
                        language="python" 
                        task={currentExerciseData.task}
                        exerciseId={currentExercise}
                        level="beginner"
                      />
                    </div>
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
