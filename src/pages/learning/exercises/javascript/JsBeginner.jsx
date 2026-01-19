import React from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import CodeFeedback from '../../../../components/CodeFeedback';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, completeExercise, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import { toast } from 'react-toastify';

export default function JsBeginner() {
  const { currentUser } = useAuth();
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const [exerciseStatus, setExerciseStatus] = React.useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false
  });
  const [showError, setShowError] = React.useState(false);
  const [showCongrats, setShowCongrats] = React.useState(false);
  const [userCode, setUserCode] = React.useState('');
  const [codeByExercise, setCodeByExercise] = React.useState({
    0: '', 1: '', 2: '', 3: '', 4: ''
  });
  const saveTimeoutRef = React.useRef(null);
  const [isSaving, setIsSaving] = React.useState(false);
  const [lockedExerciseIndex, setLockedExerciseIndex] = React.useState(null);
  const isInitialLoadRef = React.useRef(true);

  // Load progress from database
  React.useEffect(() => {
    const loadProgress = async () => {
      if (currentUser) {
        try {
          // Load completion status for each exercise (5 exercises for JS)
          const newStatus = { ...exerciseStatus };
          for (let i = 0; i < 5; i++) {
            const progress = await getExerciseProgress(currentUser.uid, 'javascript', `beginner-${i}`);
            if (progress && progress.isCompleted) {
              newStatus[i] = true;
            }
          }
          setExerciseStatus(newStatus);
          console.log('Loaded JavaScript beginner exercise statuses:', newStatus);

          // Load current exercise index
          const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'javascript', 'beginner');
          if (savedIndex !== null && savedIndex !== undefined) {
            setCurrentExercise(savedIndex);
            console.log(`✅ Resumed from exercise ${savedIndex}`);
          } else {
            setCurrentExercise(0);
          }
          isInitialLoadRef.current = false;
        } catch (error) {
          console.error('Error loading JavaScript beginner progress:', error);
          isInitialLoadRef.current = false;
        }
      } else {
        isInitialLoadRef.current = false;
      }
    };
    loadProgress();
  }, [currentUser]);

  // Save current exercise index to Firebase whenever it changes (but not during initial load)
  React.useEffect(() => {
    if (isInitialLoadRef.current) return;
    
    const saveIndex = async () => {
      if (currentUser?.uid) {
        try {
          await saveCurrentExerciseIndex(currentUser.uid, 'javascript', 'beginner', currentExercise);
        } catch (err) {
          console.error('Error saving current exercise index:', err);
        }
      }
    };

    saveIndex();
  }, [currentExercise, currentUser]);

  // Reset userCode when exercise changes
  React.useEffect(() => {
    setUserCode('');
  }, [currentExercise]);

  // Save progress to database when code changes with debouncing
  const saveProgress = (code) => {
    if (!currentUser) return;
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout for auto-save (debounce for 1 second)
    saveTimeoutRef.current = setTimeout(() => {
      setIsSaving(true);
      const levelKey = `beginner-${currentExercise}`;
      saveExerciseProgress(currentUser.uid, 'javascript', levelKey, code, false, 0)
        .then((success) => {
          if (success) {
            console.log('JS progress saved successfully');
          } else {
            console.error('Failed to save JS progress');
            toast.error('Failed to save progress');
          }
          setIsSaving(false);
        })
        .catch((error) => {
          console.error('Error saving JS progress:', error);
          toast.error('Error saving progress');
          setIsSaving(false);
        });
    }, 1000);
  };

  const handleCodeSubmit = () => {
    // Clean up the code for comparison by removing whitespace and converting to lowercase
    const cleanCode = (code) => {
      return code.toLowerCase()
        .replace(/[\n\t\r]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const userClean = cleanCode(userCode);
    let correct = false;

    switch(currentExercise) {
      case 0: // Basic Function and DOM
        const hasGreetFunction = /function\s+greet\s*\(\s*\)/.test(userClean);
        const hasPrompt = /prompt\s*\([^)]*\)/.test(userClean);
        const hasTextContent = /textcontent\s*=/.test(userClean);
        correct = hasGreetFunction && hasPrompt && hasTextContent;
        break;

      case 1: // Numbers and Math
        const hasCalculateFunction = /function\s+calculate\s*\(\s*\)/.test(userClean);
        const hasNumberConversion = /number\s*\(/.test(userClean);
        const hasAddition = /[+]/.test(userClean);
        correct = hasCalculateFunction && hasNumberConversion && hasAddition;
        break;

      case 2: // Strings and Text
        const hasReverseFunction = /function\s+reversetext\s*\(\s*\)/.test(userClean);
        const hasSplitReverse = /split\s*\(\s*['"]['"]\s*\).*?reverse\s*\(\s*\)/.test(userClean);
        const hasJoin = /join\s*\(\s*['"]['"]\s*\)/.test(userClean);
        correct = hasReverseFunction && hasSplitReverse && hasJoin;
        break;

      case 3: // Conditionals
        const hasCheckAgeFunction = /function\s+checkage\s*\(\s*\)/.test(userClean);
        const hasIfStatement = /if\s*\([^)]*\)/.test(userClean);
        const hasAgeComparison = />=[^=]?\s*18/.test(userClean);
        correct = hasCheckAgeFunction && hasIfStatement && hasAgeComparison;
        break;

      case 4: // Arrays and Loops
        const hasGenerateFunction = /function\s+generatelist\s*\(\s*\)/.test(userClean);
        const hasForLoop = /for\s*\([^)]*\)/.test(userClean);
        const hasAppendChild = /appendchild\s*\(/.test(userClean);
        correct = hasGenerateFunction && hasForLoop && hasAppendChild;
        break;
    }

    if (correct) {
      setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
      setShowError(false);
      setShowCongrats(true);
      
      setTimeout(async () => {
        setShowCongrats(false);
        
        // Save exercise completion to Firebase with unique levelKey
        if (currentUser?.uid) {
          try {
            const levelKey = `beginner-${currentExercise}`;
            await saveExerciseProgress(currentUser.uid, 'javascript', levelKey, userCode, true, 10);
            console.log(`✅ Saved JavaScript exercise ${levelKey} completion`);
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
              await saveCurrentExerciseIndex(currentUser.uid, 'javascript', 'beginner', nextIndex);
              console.log(`✅ Saved JavaScript beginner index: ${nextIndex}`);
            } catch (err) {
              console.error('Error saving new index:', err);
            }
          }
        } else if (currentExercise === exercises.length - 1 && currentUser?.uid) {
          // Save toast notification when all exercises are done
          toast.success('JavaScript Beginner completed! 🎉');
        }
      }, 2000);
    } else {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
    }
  };

  const canAccessExercise = (index) => {
    if (index === 0) return true;
    return exerciseStatus[index - 1] === true;
  };

  const exercises = [
    {
      title: "Basic Function and DOM",
      instructions: "Write JavaScript code to display a greeting message",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Exercise</title>
</head>
<body>
  <button onclick="greet()">Say Hello</button>
  <p id="greeting"></p>
  
  <script>
    // Write your function here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>JavaScript Exercise</title>
</head>
<body>
  <button onclick="greet()">Say Hello</button>
  <p id="greeting"></p>
  
  <script>
    function greet() {
      const name = prompt("What's your name?");
      document.getElementById("greeting").textContent = "Hello, " + name + "!";
    }
  </script>
</body>
</html>`,
      hints: [
        "Create a function named greet()",
        "Use prompt() to get user input",
        "Update the text content using getElementById()"
      ]
    },
    {
      title: "Numbers and Math",
      instructions: "Create a simple calculator that adds two numbers and displays the result",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Calculator Exercise</title>
</head>
<body>
  <input type="number" id="num1" placeholder="First number">
  <input type="number" id="num2" placeholder="Second number">
  <button onclick="calculate()">Add Numbers</button>
  <p id="result"></p>
  
  <script>
    // Write your calculator function here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Calculator Exercise</title>
</head>
<body>
  <input type="number" id="num1" placeholder="First number">
  <input type="number" id="num2" placeholder="Second number">
  <button onclick="calculate()">Add Numbers</button>
  <p id="result"></p>
  
  <script>
    function calculate() {
      const num1 = Number(document.getElementById("num1").value);
      const num2 = Number(document.getElementById("num2").value);
      const sum = num1 + num2;
      document.getElementById("result").textContent = "Result: " + sum;
    }
  </script>
</body>
</html>`,
      hints: [
        "Use Number() to convert string inputs to numbers",
        "Get input values using .value property",
        "Display the sum in the result paragraph"
      ]
    },
    {
      title: "Strings and Text",
      instructions: "Create a text reverser that takes input and displays it backwards",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Text Reverser</title>
</head>
<body>
  <input type="text" id="textInput" placeholder="Enter text">
  <button onclick="reverseText()">Reverse</button>
  <p id="output"></p>
  
  <script>
    // Write your reverse function here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Text Reverser</title>
</head>
<body>
  <input type="text" id="textInput" placeholder="Enter text">
  <button onclick="reverseText()">Reverse</button>
  <p id="output"></p>
  
  <script>
    function reverseText() {
      const text = document.getElementById("textInput").value;
      const reversed = text.split('').reverse().join('');
      document.getElementById("output").textContent = reversed;
    }
  </script>
</body>
</html>`,
      hints: [
        "Split the string into an array of characters",
        "Use reverse() to reverse the array",
        "Join the characters back into a string"
      ]
    },
    {
      title: "Conditionals",
      instructions: "Create an age checker that tells if someone is old enough to vote (18+)",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Age Checker</title>
</head>
<body>
  <input type="number" id="age" placeholder="Enter your age">
  <button onclick="checkAge()">Check Eligibility</button>
  <p id="result"></p>
  
  <script>
    // Write your age checking function here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Age Checker</title>
</head>
<body>
  <input type="number" id="age" placeholder="Enter your age">
  <button onclick="checkAge()">Check Eligibility</button>
  <p id="result"></p>
  
  <script>
    function checkAge() {
      const age = Number(document.getElementById("age").value);
      const result = document.getElementById("result");
      if (age >= 18) {
        result.textContent = "You are eligible to vote!";
      } else {
        result.textContent = "You must be 18 or older to vote.";
      }
    }
  </script>
</body>
</html>`,
      hints: [
        "Use if/else statement to check age",
        "Remember to convert input to a number",
        "Display appropriate message based on age"
      ]
    },
    {
      title: "Arrays and Loops",
      instructions: "Create a number list generator that creates a list of numbers from 1 to N",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Number List Generator</title>
</head>
<body>
  <input type="number" id="count" placeholder="Enter a number">
  <button onclick="generateList()">Generate List</button>
  <ul id="numberList"></ul>
  
  <script>
    // Write your list generator function here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Number List Generator</title>
</head>
<body>
  <input type="number" id="count" placeholder="Enter a number">
  <button onclick="generateList()">Generate List</button>
  <ul id="numberList"></ul>
  
  <script>
    function generateList() {
      const count = Number(document.getElementById("count").value);
      const list = document.getElementById("numberList");
      list.innerHTML = "";
      for (let i = 1; i <= count; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        list.appendChild(li);
      }
    }
  </script>
</body>
</html>`,
      hints: [
        "Use a for loop to count from 1 to N",
        "Create li elements using createElement",
        "Append each number as a list item"
      ]
    }
  ];

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

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="bg-gray-100 rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-emerald-600 mb-3">JavaScript Beginner Exercises</h1>
          
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
            <h2 className="text-lg font-bold text-emerald-600 mb-1">{exercises[currentExercise].title}</h2>
            <p className="text-gray-700 mb-3 text-sm">{exercises[currentExercise].instructions}</p>
            
            {/* Hints */}
            <div className="mb-4">
              <button 
                className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-2"
                onClick={() => document.getElementById('hints-beginner').classList.toggle('hidden')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Show Hints
              </button>
              <div id="hints-beginner" className="hidden mt-2 bg-gray-50 rounded p-4 border border-gray-300">
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {exercises[currentExercise].hints.map((hint, index) => (
                    <li key={index} className="text-sm">{hint}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
              <div className="lg:col-span-2 bg-white rounded-lg border border-gray-300 overflow-hidden">
                <div className="p-3 flex gap-2 items-center">
                  <button
                    className="px-3 py-1 bg-slate-600 text-white rounded text-sm"
                    onClick={() => {
                      const initial = exercises[currentExercise].initialCode;
                      setUserCode(initial);
                      setCodeByExercise(prev => ({...prev, [currentExercise]: initial}));
                    }}
                  >
                    Clear Demo
                  </button>
                </div>
                <LiveHtmlEditor
                  initialCode={codeByExercise[currentExercise] || exercises[currentExercise].initialCode}
                  solution={exercises[currentExercise].solution}
                  onChange={(code) => {
                    setUserCode(code);
                    setCodeByExercise(prev => ({...prev, [currentExercise]: code}));
                    saveProgress(code);
                  }}
                />
              </div>
              <div className="lg:col-span-1">
                <CodeFeedback 
                  code={userCode}
                  language="javascript"
                  task={exercises[currentExercise].task}
                  exerciseId={`javascript-beginner-${currentExercise}`}
                  level="beginner"
                />
              </div>
            </div>

            {/* Submit Button and Show Solution */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCodeSubmit}
                className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer text-sm font-medium"
              >
                Submit Code
              </button>

              <button 
                className="px-4 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded text-sm font-medium flex items-center gap-2 border border-emerald-600 bg-white"
                onClick={() => document.getElementById('solution').classList.toggle('hidden')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Show Solution
              </button>
            </div>

            {/* Error Message */}
            {showError && (
              <div className="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded animate-shake">
                <p>Not quite right! Check the requirements and try again.</p>
              </div>
            )}

            {/* Solution Box */}
            <div id="solution" className="hidden mt-4 bg-white rounded p-4 border border-gray-300">
              <pre className="text-gray-800 text-sm overflow-x-auto">
                <code>{exercises[currentExercise].solution}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
