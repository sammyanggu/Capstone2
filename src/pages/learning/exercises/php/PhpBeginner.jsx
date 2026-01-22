import React from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
// import CodeFeedback from '../../../../components/CodeFeedback';
import '../exercises.css';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, completeExercise, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import { toast } from 'react-toastify';
import { phpIcon } from '../../../../assets/icons/index.js';

export default function PhpBeginner() {
  const { currentUser } = useAuth();
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const [exerciseStatus, setExerciseStatus] = React.useState({
    0: false, 1: false, 2: false, 3: false, 4: false
  });
  const [userCode, setUserCode] = React.useState('');
  const [showHints, setShowHints] = React.useState(false);
  const [showCongrats, setShowCongrats] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [lockedExerciseIndex, setLockedExerciseIndex] = React.useState(null);
  const isInitialLoadRef = React.useRef(true);

  // Load current exercise index from Firebase
  React.useEffect(() => {
    const loadExerciseIndex = async () => {
      if (currentUser?.uid) {
        try {
          // Load completion status for each exercise (4 exercises for PHP)
          const newStatus = { ...exerciseStatus };
          for (let i = 0; i < 4; i++) {
            const progress = await getExerciseProgress(currentUser.uid, 'php', `beginner-${i}`);
            if (progress && progress.isCompleted) {
              newStatus[i] = true;
            }
          }
          setExerciseStatus(newStatus);


          const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'php', 'beginner');
          if (savedIndex !== null && savedIndex !== undefined) {
            setCurrentExercise(savedIndex);

          }
          isInitialLoadRef.current = false;
        } catch (err) {

          isInitialLoadRef.current = false;
        }
      } else {
        isInitialLoadRef.current = false;
      }
    };

    loadExerciseIndex();
  }, [currentUser]);

  // Save current exercise index to Firebase whenever it changes (but not during initial load)
  React.useEffect(() => {
    if (isInitialLoadRef.current) return;
    
    const saveIndex = async () => {
      if (currentUser?.uid) {
        try {
          await saveCurrentExerciseIndex(currentUser.uid, 'php', 'beginner', currentExercise);
        } catch (err) {

        }
      }
    };

    saveIndex();
  }, [currentExercise, currentUser]);

  // Reset userCode when exercise changes
  React.useEffect(() => {
    setUserCode('');
  }, [currentExercise]);

  const exercises = [
    {
      title: "Basic Output",
      description: "Write PHP code to display a greeting message",
      hints: [
        "Use the echo statement to output text",
        "Remember to start with <?php tag",
        "End statements with a semicolon"
      ],
      starterCode: `<?php
// Write your PHP code here to print a greeting

?>`,
      solution: `<?php
echo "Hello, World!";
?>`
    },
    {
      title: "Variables",
      description: "Create and use variables in PHP",
      hints: [
        "Variables in PHP start with $",
        "You can use single or double quotes for strings",
        "Use the dot (.) operator to concatenate strings"
      ],
      starterCode: `<?php
// Create name and age variables
$name = "";
$age = ;

// Print your message here

?>`,
      solution: `<?php
$name = "John";
$age = 25;
echo "My name is " . $name . " and I am " . $age . " years old.";
?>`
    },
    {
      title: "Math Operations",
      description: "Perform basic arithmetic operations",
      hints: [
        "Use basic operators: +, -, *, /",
        "Store results in variables",
        "Remember to convert numbers to strings for output"
      ],
      starterCode: `<?php
$num1 = 10;
$num2 = 5;

// Calculate and display the sum, difference,
// product, and quotient of these numbers

?>`,
      solution: `<?php
$num1 = 10;
$num2 = 5;
echo "Sum: " . ($num1 + $num2) . "\\n";
echo "Difference: " . ($num1 - $num2) . "\\n";
echo "Product: " . ($num1 * $num2) . "\\n";
echo "Quotient: " . ($num1 / $num2);
?>`
    },
    {
      title: "Conditionals",
      description: "Use if-else statements to check conditions",
      hints: [
        "Use if, elseif, and else statements",
        "Remember comparison operators: >, <, >=, <=, ==",
        "Curly braces {} are required for multi-line blocks"
      ],
      starterCode: `<?php
$score = 85;

// Write code to check the grade:
// 90 or above: print "Grade: A"
// 80-89: print "Grade: B"
// Below 80: print "Grade: C"

?>`,
      solution: `<?php
$score = 85;
if ($score >= 90) {
    echo "Grade: A";
} elseif ($score >= 80) {
    echo "Grade: B";
} else {
    echo "Grade: C";
}
?>`
    },
    {
      title: "Loops",
      description: "Create a loop to display numbers",
      hints: [
        "For loops have 3 parts: initialization, condition, increment",
        "Use $i++ to increment the counter",
        "Add \\n for new lines in the output"
      ],
      starterCode: `<?php
// Use a for loop to print numbers 1 to 5
// Format: "Number: 1" (and so on)

?>`,
      solution: `<?php
for ($i = 1; $i <= 5; $i++) {
    echo "Number: " . $i . "\\n";
}
?>`
    }
  ];

  const handleSubmitCode = () => {
    const cleanCode = (code) => {
      return code.toLowerCase()
        .replace(/[\n\t\r]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const userClean = cleanCode(userCode);
    const solutionClean = cleanCode(exercises[currentExercise].solution);

    if (userClean === solutionClean) {
      setExerciseStatus(prev => ({
        ...prev,
        [currentExercise]: true
      }));
      setShowCongrats(true);
      setShowError(false);
      
      setTimeout(async () => {
        setShowCongrats(false);
        
        // Save exercise completion to Firebase with unique levelKey
        if (currentUser?.uid) {
          try {
            const levelKey = `beginner-${currentExercise}`;
            await saveExerciseProgress(currentUser.uid, 'php', levelKey, userCode, true, 10);

          } catch (err) {

          }
        }
        
        if (currentExercise < exercises.length - 1) {
          const nextIndex = currentExercise + 1;
          setCurrentExercise(nextIndex);
          
          // Save the new index to Firebase
          if (currentUser?.uid) {
            try {
              await saveCurrentExerciseIndex(currentUser.uid, 'php', 'beginner', nextIndex);

            } catch (err) {

            }
          }
        } else if (currentExercise === exercises.length - 1 && currentUser?.uid) {
          // Save toast notification when all exercises are done
          toast.success('PHP Beginner completed! 🎉');
        }
      }, 2000);
    } else {
      setShowError(true);
      setShowCongrats(false);
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Exercise navigation */}
      <div className="sticky top-16 bg-white/95 backdrop-blur z-10 border-b border-gray-300 pb-3">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <img src={phpIcon} alt="PHP Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-emerald-600">
            PHP Beginner Exercises
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-2 px-4">
          {exercises.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index === 0 || exerciseStatus[index - 1]) {
                  setCurrentExercise(index);
                  setUserCode(exercises[index].starterCode);
                  setShowHints(false);
                  setShowCongrats(false);
                  setShowError(false);
                } else {
                  setLockedExerciseIndex(index);
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentExercise === index
                  ? 'bg-emerald-600 text-white shadow-md'
                  : index === 0 || exerciseStatus[index - 1]
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } ${exerciseStatus[index] ? 'ring-1 ring-green-500/50' : ''}`}
            >
              Exercise {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="p-4">
        {/* Exercise Title and Instructions */}
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold text-emerald-600 mb-2">
            {exercises[currentExercise].title}
          </h2>
          <div className="bg-white rounded p-3 border border-gray-300">
            <h3 className="text-gray-800 font-medium mb-2">Instructions:</h3>
            <p className="text-gray-700 text-base leading-relaxed">
              {exercises[currentExercise].description}
            </p>
          </div>

          <button
            onClick={toggleHints}
            className="mt-3 text-emerald-600 hover:text-emerald-700 flex items-center cursor-pointer text-sm bg-gray-50 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <span className="mr-1.5">💡</span> {showHints ? 'Hide Hints' : 'Show Hints'}
        </button>

        {showHints && (
          <div className="mt-2 bg-white rounded p-3 border border-gray-300">
            <h4 className="text-emerald-600 font-medium mb-2">Helpful Hints:</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
              {exercises[currentExercise].hints.map((hint, index) => (
                <li key={index}>{hint}</li>
              ))}
            </ul>
          </div>
        )}
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3 flex items-center">
            <span className="text-lg mr-2">⌨️</span>
            Code Editor
          </h3>
          <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <LiveHtmlEditor
                initialCode={userCode || exercises[currentExercise].starterCode}
                onChange={setUserCode}
                language="php"
              />
            </div>
            <div className="lg:col-span-1">
              {/* Hardcoded Feedback Logic - Dark background */}
              <div className="bg-slate-900 border border-slate-700 rounded p-4">
                <h4 className="font-bold mb-2 text-emerald-400">Feedback</h4>
                {userCode.trim() === '' ? (
                  <p className="text-gray-400 text-sm">Type your PHP code to get feedback.</p>
                ) : (
                  (() => {
                    // Per-exercise feedback logic
                    const code = userCode.trim();
                    if (currentExercise === 0) {
                      // Basic Output: just needs echo statement
                      if (!code.startsWith('<?php')) {
                        return <p className="text-red-400 text-sm">Your code must start with <code>&lt;?php</code>.</p>;
                      }
                      if (/echo\s+(["']).+?\1\s*;?/i.test(code)) {
                        return <p className="text-green-400 text-sm">Great! Your code prints a greeting using echo.</p>;
                      }
                      if (!code.includes('echo')) {
                        return <p className="text-red-400 text-sm">Your code is missing an <code>echo</code> statement.</p>;
                      }
                      return <p className="text-red-400 text-sm">Check your syntax for the echo statement.</p>;
                    }
                    if (currentExercise === 1) {
                      // Variables: needs $name, $age, and echo
                      const hasName = /\$name\s*=\s*['"]/i.test(code);
                      const hasAge = /\$age\s*=\s*\d+/i.test(code);
                      const hasEcho = /echo\s+/i.test(code);
                      if (hasName && hasAge && hasEcho) {
                        return <p className="text-green-400 text-sm">Great! You created variables and used echo.</p>;
                      }
                      if (!hasName && !hasAge) {
                        return <p className="text-red-400 text-sm">Add <code>$name</code> and <code>$age</code> variables.</p>;
                      }
                      if (!hasName) {
                        return <p className="text-red-400 text-sm">Add a <code>$name</code> variable.</p>;
                      }
                      if (!hasAge) {
                        return <p className="text-red-400 text-sm">Add an <code>$age</code> variable.</p>;
                      }
                      if (!hasEcho) {
                        return <p className="text-red-400 text-sm">Add an <code>echo</code> statement to print your message.</p>;
                      }
                      return <p className="text-red-400 text-sm">Check your variable and echo syntax.</p>;
                    }
                    if (currentExercise === 2) {
                      // Math Operations: needs +, -, *, / and echo
                      const hasSum = /\+/.test(code);
                      const hasDiff = /-/.test(code);
                      const hasProd = /\*/.test(code);
                      const hasQuot = /\//.test(code);
                      const hasEcho = /echo\s+/i.test(code);
                      if (hasSum && hasDiff && hasProd && hasQuot && hasEcho) {
                        return <p className="text-green-400 text-sm">Great! You performed all math operations and used echo.</p>;
                      }
                      if (!hasEcho) {
                        return <p className="text-red-400 text-sm">Add <code>echo</code> statements to display your results.</p>;
                      }
                      return <p className="text-red-400 text-sm">Make sure to use +, -, *, / for all operations.</p>;
                    }
                    if (currentExercise === 3) {
                      // Conditionals: needs if, elseif, else, echo
                      const hasIf = /if\s*\(/i.test(code);
                      const hasElseIf = /elseif\s*\(/i.test(code);
                      const hasElse = /else\s*\{/i.test(code);
                      const hasEcho = /echo\s+/i.test(code);
                      if (hasIf && hasElseIf && hasElse && hasEcho) {
                        return <p className="text-green-400 text-sm">Great! You used if, elseif, else, and echo.</p>;
                      }
                      if (!hasIf) {
                        return <p className="text-red-400 text-sm">Add an <code>if</code> statement.</p>;
                      }
                      if (!hasElseIf) {
                        return <p className="text-red-400 text-sm">Add an <code>elseif</code> statement.</p>;
                      }
                      if (!hasElse) {
                        return <p className="text-red-400 text-sm">Add an <code>else</code> statement.</p>;
                      }
                      if (!hasEcho) {
                        return <p className="text-red-400 text-sm">Add <code>echo</code> statements to print the grade.</p>;
                      }
                      return <p className="text-red-400 text-sm">Check your if-else syntax.</p>;
                    }
                    if (currentExercise === 4) {
                      // Loops: needs for, $i, echo
                      const hasFor = /for\s*\(/i.test(code);
                      const hasI = /\$i/.test(code);
                      const hasEcho = /echo\s+/i.test(code);
                      if (hasFor && hasI && hasEcho) {
                        return <p className="text-green-400 text-sm">Great! You used a for loop and echo to print numbers.</p>;
                      }
                      if (!hasFor) {
                        return <p className="text-red-400 text-sm">Add a <code>for</code> loop.</p>;
                      }
                      if (!hasI) {
                        return <p className="text-red-400 text-sm">Use a variable like <code>$i</code> as your loop counter.</p>;
                      }
                      if (!hasEcho) {
                        return <p className="text-red-400 text-sm">Add <code>echo</code> statements to print numbers.</p>;
                      }
                      return <p className="text-red-400 text-sm">Check your for loop and echo syntax.</p>;
                    }
                    return <p className="text-red-400 text-sm">Check your code for required statements.</p>;
                  })()
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
          <button
            onClick={handleSubmitCode}
            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
          <button 
            className="px-4 py-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded text-sm font-medium flex items-center gap-2 border border-emerald-600 bg-white"
            onClick={() => document.getElementById('solution').classList.toggle('hidden')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Show Solution
          </button>
        </div>

        {/* Responsive Modal for Wrong Answer */}
        {showError && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
            <div className="bg-white rounded-lg shadow-xl border border-red-500 max-w-xs w-full p-6 text-center">
              <h3 className="text-2xl font-bold text-red-600 mb-2">Wrong Answer</h3>
              <p className="text-gray-700 mb-4">Try again!</p>
              <button
                onClick={() => setShowError(false)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Solution Box */}
        <div id="solution" className="hidden mt-4 bg-white rounded p-4 border border-gray-300">
          <pre className="text-gray-800 text-sm overflow-x-auto">
            <code>{exercises[currentExercise].solution}</code>
          </pre>
        </div>

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
            )}        {/* Exercise Locked Modal */}
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
      </div>
    </div>
  </div>)};


