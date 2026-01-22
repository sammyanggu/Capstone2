import React, { useState } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
// import CodeFeedback from '../../../../components/CodeFeedback';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import { toast } from 'react-toastify';
import { phpIcon } from '../../../../assets/icons/index.js';

export default function PhpIntermediate() {
  const { currentUser } = useAuth();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseStatus, setExerciseStatus] = useState({
    0: false,
    1: false,
    2: false,
    3: false
  });
  const [userCode, setUserCode] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [showError, setShowError] = useState(false);
  const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);

  React.useEffect(() => {
    const loadProgress = async () => {
      if (currentUser?.uid) {
        try {
          const newStatus = { ...exerciseStatus };
          for (let i = 0; i < 4; i++) {
            const progress = await getExerciseProgress(currentUser.uid, 'php', `intermediate-${i}`);
            if (progress && progress.isCompleted) {
              newStatus[i] = true;
            }
          }
          setExerciseStatus(newStatus);
          const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'php', 'intermediate');
          if (savedIndex !== null) {
            setCurrentExercise(savedIndex);
          }
        } catch (err) {
        }
      }
    };
    loadProgress();
  }, [currentUser]);

  React.useEffect(() => {
    const saveIndex = async () => {
      if (currentUser?.uid) {
        try {
          await saveCurrentExerciseIndex(currentUser.uid, 'php', 'intermediate', currentExercise);
        } catch (err) {
        }
      }
    };
    saveIndex();
  }, [currentExercise, currentUser]);

  React.useEffect(() => {
    setUserCode('');
  }, [currentExercise]);

  const exercises = [
    {
      title: "Working with Arrays",
      description: "Create and manipulate PHP arrays",
      task: "Create an array and loop through it",
      hints: [
        "Use array() or [] to create arrays",
        "Use foreach to loop through array elements",
        "Access array elements with $array[$index]"
      ],
      initialCode: `<?php
// Create an array of fruits
$fruits = array("Apple", "Banana", "Orange");

// Loop through and print each fruit

?>`,
      solution: `<?php
$fruits = array("Apple", "Banana", "Orange");
foreach ($fruits as $fruit) {
    echo $fruit . "\\n";
}
?>`
    },
    {
      title: "Functions",
      description: "Write and call PHP functions",
      task: "Create a function that calculates the sum of two numbers",
      hints: [
        "Use function keyword to define functions",
        "Functions take parameters inside parentheses",
        "Use return to return a value from function"
      ],
      initialCode: `<?php
// Define a function that adds two numbers
function add($a, $b) {
    // Your code here
}

// Call the function with values 5 and 3 and print result

?>`,
      solution: `<?php
function add($a, $b) {
    return $a + $b;
}
echo add(5, 3);
?>`
    },
    {
      title: "String Methods",
      description: "Use PHP string functions",
      task: "Use string functions to manipulate text",
      hints: [
        "strlen() returns the length of a string",
        "strtoupper() converts to uppercase",
        "substr() extracts part of a string",
        "str_replace() replaces text"
      ],
      initialCode: `<?php
$text = "Hello World";

// Print the length of the string
// Print the string in uppercase
// Print first 5 characters
// Replace "World" with "PHP"

?>`,
      solution: `<?php
$text = "Hello World";
echo strlen($text) . "\\n";
echo strtoupper($text) . "\\n";
echo substr($text, 0, 5) . "\\n";
echo str_replace("World", "PHP", $text);
?>`
    },
    {
      title: "Associative Arrays",
      description: "Work with key-value pairs in arrays",
      task: "Create and access an associative array",
      hints: [
        "Associative arrays use keys => values",
        "Access values using $array['key']",
        "Use foreach with key and value: foreach ($arr as $key => $value)"
      ],
      initialCode: `<?php
// Create an associative array for a person
$person = array(
    "name" => "John",
    "age" => 25,
    "city" => "New York"
);

// Print the person's name and age

?>`,
      solution: `<?php
$person = array(
    "name" => "John",
    "age" => 25,
    "city" => "New York"
);
echo "Name: " . $person["name"] . "\\n";
echo "Age: " . $person["age"];
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
        if (currentUser?.uid) {
          try {
            const levelKey = `intermediate-${currentExercise}`;
            await saveExerciseProgress(currentUser.uid, 'php', levelKey, userCode, true, 10);
          } catch (err) {
          }
        }

        if (currentExercise < exercises.length - 1) {
          const nextIndex = currentExercise + 1;
          setCurrentExercise(nextIndex);
          if (currentUser?.uid) {
            try {
              await saveCurrentExerciseIndex(currentUser.uid, 'php', 'intermediate', nextIndex);
            } catch (err) {
            }
          }
        } else if (currentExercise === exercises.length - 1 && currentUser?.uid) {
          toast.success('PHP Intermediate completed! 🎉');
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

  const canAccessExercise = (index) => {
    if (index === 0) return true;
    return exerciseStatus[index - 1];
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-16 bg-white/95 backdrop-blur z-10 border-b border-gray-300 pb-3">
        <div className="flex items-center gap-3 px-4 pt-4 pb-3">
          <img src={phpIcon} alt="PHP Logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-emerald-600">
            PHP Intermediate Exercises
          </h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-row gap-2 px-4">
          {exercises.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (canAccessExercise(index)) {
                  setCurrentExercise(index);
                } else {
                  setLockedExerciseIndex(index);
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                currentExercise === index
                  ? 'bg-emerald-600 text-white'
                  : canAccessExercise(index)
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              } ${exerciseStatus[index] ? 'ring-1 ring-green-500' : ''}`}
            >
              Exercise {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold text-emerald-600 mb-2">
            {exercises[currentExercise].title}
          </h2>
          <div className="bg-white rounded p-3 border border-gray-300">
            <h3 className="text-gray-800 font-medium mb-2">Instructions:</h3>
            <p className="text-gray-700 text-base">
              {exercises[currentExercise].description}
            </p>
          </div>

          <button
            onClick={toggleHints}
            className="mt-3 text-emerald-600 hover:text-emerald-700 flex items-center cursor-pointer text-sm bg-gray-50 px-3 py-2 rounded-md hover:bg-gray-100"
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
          <h3 className="text-white font-medium mb-3">⌨️ Code Editor</h3>
          <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <LiveHtmlEditor
                initialCode={userCode || exercises[currentExercise].initialCode}
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
                    const codeHasEcho = userCode.includes('echo');
                    const codeHasVar = userCode.includes('$');
                    if (codeHasEcho && codeHasVar) {
                      return <p className="text-green-400 text-sm">Great! Your code includes both a variable and an echo statement as required.</p>;
                    } else if (!codeHasEcho && !codeHasVar) {
                      return <p className="text-red-400 text-sm">Your code is missing both a variable (e.g., <code>$name</code>) and an echo statement.</p>;
                    } else if (!codeHasEcho) {
                      return <p className="text-red-400 text-sm">Your code is missing an echo statement.</p>;
                    } else {
                      return <p className="text-red-400 text-sm">Your code is missing a variable (e.g., <code>$name</code>).</p>;
                    }
                  })()
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSubmitCode}
              className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            >
              Submit
            </button>
            <button 
              className="px-4 py-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded text-sm font-medium border border-emerald-600 bg-white"
              onClick={() => document.getElementById('solution').classList.toggle('hidden')}
            >
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
          )}
        </div>

        {lockedExerciseIndex !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white p-6 rounded-lg shadow-xl border border-orange-500 max-w-sm">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-orange-600 mb-2">🔒 Exercise Locked</h3>
                <p className="text-gray-700 mb-4">Complete the previous exercise first!</p>
                <button
                  onClick={() => setLockedExerciseIndex(null)}
                  className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
