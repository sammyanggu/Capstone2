import React from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
// import CodeFeedback from '../../../../components/CodeFeedback';
import Confetti from '../../../../components/Confetti';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';

export default function JsAdvanced() {
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
  const [lockedExerciseIndex, setLockedExerciseIndex] = React.useState(null);
  const isInitialLoadRef = React.useRef(true);

  // Load current exercise index from Firebase
  React.useEffect(() => {
    const loadExerciseIndex = async () => {
      if (currentUser?.uid) {
        try {
          // Load completion status for each exercise (5 exercises for JS)
          const newStatus = { ...exerciseStatus };
          for (let i = 0; i < 5; i++) {
            const progress = await getExerciseProgress(currentUser.uid, 'javascript', `advanced-${i}`);
            if (progress && progress.isCompleted) {
              newStatus[i] = true;
            }
          }
          setExerciseStatus(newStatus);


          const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'javascript', 'advanced');
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
          await saveCurrentExerciseIndex(currentUser.uid, 'javascript', 'advanced', currentExercise);
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

  const handleCodeSubmit = () => {
    const cleanCode = (code) => {
      return code.toLowerCase()
        .replace(/[\n\t\r]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const userClean = cleanCode(userCode);
    let correct = false;

    switch(currentExercise) {
      case 0: // Async/Await
        const hasAsync = /async\s+function/.test(userClean);
        const hasAwait = /await\s+fetch/.test(userClean);
        const hasTryCatch = /try\s*{.*?}\s*catch/.test(userClean);
        correct = hasAsync && hasAwait && hasTryCatch;
        break;

      case 1: // Promises and Chaining
        const hasPromiseChain = /\.then\s*\(.*?\).*?\.then\s*\(/.test(userClean);
        const hasCatchHandler = /\.catch\s*\(/.test(userClean);
        const hasPromiseOrThen = /promise\.(resolve|all|race)|(string\(.*?\)\.split)/.test(userClean);
        correct = hasPromiseChain && hasCatchHandler && hasPromiseOrThen;
        break;

      case 2: // Drag and Drop
        const hasDragAttribute = /draggable\s*=\s*["']?true|setattribute\s*\(\s*["']draggable/.test(userClean);
        const hasDragListeners = /addeventlistener\s*\(\s*["']drag(start|over|drop)/.test(userClean);
        const hasPreventDefault = /preventdefault/.test(userClean);
        correct = hasDragAttribute && hasDragListeners && hasPreventDefault;
        break;

      case 3: // Classes and Inheritance
        const hasClass = /class\s+shape/.test(userClean);
        const hasExtends = /extends\s+shape/.test(userClean);
        const hasSuper = /super\s*\(/.test(userClean);
        correct = hasClass && hasExtends && hasSuper;
        break;

      case 4: // Error Handling and Custom Errors
        const hasCustomError = /class.*?error/.test(userClean);
        const hasThrow = /throw\s+new/.test(userClean);
        const hasErrorHandling = /catch\s*\(.*?\)\s*{/.test(userClean);
        correct = hasCustomError && hasThrow && hasErrorHandling;
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
            const levelKey = `advanced-${currentExercise}`;
            await saveExerciseProgress(currentUser.uid, 'javascript', levelKey, userCode, true, 10);

          } catch (err) {

          }
        }
        
        if (currentExercise < exercises.length - 1) {
          const nextIndex = currentExercise + 1;
          setCurrentExercise(nextIndex);
          
          // Save the new index to Firebase
          if (currentUser?.uid) {
            try {
              await saveCurrentExerciseIndex(currentUser.uid, 'javascript', 'advanced', nextIndex);

            } catch (err) {

            }
          }
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
      title: "Async/Await and API Calls",
      instructions: "Create a function that fetches user data from an API using async/await",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>API Data Fetcher</title>
  <style>
    .error { color: red; }
    .loading { color: blue; }
  </style>
</head>
<body>
  <input type="number" id="userId" placeholder="Enter user ID">
  <button onclick="fetchUserData()">Fetch User</button>
  <div id="result"></div>
  
  <script>
    // Create an async function to fetch user data from:
    // https://jsonplaceholder.typicode.com/users/[id]
    // Handle loading, success, and error states
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>API Data Fetcher</title>
  <style>
    .error { color: red; }
    .loading { color: blue; }
  </style>
</head>
<body>
  <input type="number" id="userId" placeholder="Enter user ID">
  <button onclick="fetchUserData()">Fetch User</button>
  <div id="result"></div>
  
  <script>
    async function fetchUserData() {
      const result = document.getElementById("result");
      const userId = document.getElementById("userId").value;
      
      result.className = "loading";
      result.textContent = "Loading...";
      
      try {
        const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${userId}\`);
        if (!response.ok) throw new Error('User not found');
        
        const userData = await response.json();
        result.className = "";
        result.textContent = \`Name: \${userData.name}\\nEmail: \${userData.email}\`;
      } catch (error) {
        result.className = "error";
        result.textContent = \`Error: \${error.message}\`;
      }
    }
  </script>
</body>
</html>`,
      hints: [
        "Use async/await for API calls",
        "Handle response with try/catch",
        "Show loading and error states"
      ]
    },
    {
      title: "Promise Chaining",
      instructions: "Create multiple promises that depend on each other's results",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Promise Chain Exercise</title>
</head>
<body>
  <button onclick="startProcess()">Start Process</button>
  <ul id="log"></ul>
  
  <script>
    // Create a chain of promises that:
    // 1. Generates a random number (1-100)
    // 2. Doubles it if even, triples if odd
    // 3. Converts to string and reverses it
    // Log each step to the list
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Promise Chain Exercise</title>
</head>
<body>
  <button onclick="startProcess()">Start Process</button>
  <ul id="log"></ul>
  
  <script>
    function addLog(text) {
      const li = document.createElement('li');
      li.textContent = text;
      document.getElementById('log').appendChild(li);
    }

    function startProcess() {
      document.getElementById('log').innerHTML = '';
      
      Promise.resolve()
        .then(() => {
          const num = Math.floor(Math.random() * 100) + 1;
          addLog(\`Generated number: \${num}\`);
          return num;
        })
        .then(num => {
          const result = num % 2 === 0 ? num * 2 : num * 3;
          addLog(\`\${num} is \${num % 2 === 0 ? 'even' : 'odd'}, result: \${result}\`);
          return result;
        })
        .then(num => {
          const reversed = String(num).split('').reverse().join('');
          addLog(\`Reversed: \${reversed}\`);
          return reversed;
        })
        .catch(error => {
          addLog(\`Error: \${error.message}\`);
        });
    }
  </script>
</body>
</html>`,
      hints: [
        "Use .then() for promise chaining",
        "Pass values through the chain",
        "Add error handling with .catch()"
      ]
    },
    {
      title: "Drag and Drop Interface",
      instructions: "Create a drag and drop interface for reordering items",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Drag and Drop</title>
  <style>
    .draggable {
      padding: 10px;
      margin: 5px;
      border: 1px solid #ccc;
      cursor: move;
    }
    .over { background: #e0e0e0; }
  </style>
</head>
<body>
  <div id="container">
    <div class="draggable">Item 1</div>
    <div class="draggable">Item 2</div>
    <div class="draggable">Item 3</div>
  </div>
  
  <script>
    // Implement drag and drop functionality:
    // 1. Make items draggable
    // 2. Handle drag and drop events
    // 3. Reorder items on drop
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Drag and Drop</title>
  <style>
    .draggable {
      padding: 10px;
      margin: 5px;
      border: 1px solid #ccc;
      cursor: move;
    }
    .over { background: #e0e0e0; }
  </style>
</head>
<body>
  <div id="container">
    <div class="draggable">Item 1</div>
    <div class="draggable">Item 2</div>
    <div class="draggable">Item 3</div>
  </div>
  
  <script>
    const items = document.querySelectorAll('.draggable');
    let draggedItem = null;

    items.forEach(item => {
      item.setAttribute('draggable', true);
      
      item.addEventListener('dragstart', function(e) {
        draggedItem = this;
        setTimeout(() => this.style.opacity = '0.5', 0);
      });

      item.addEventListener('dragend', function() {
        draggedItem = null;
        this.style.opacity = '1';
      });

      item.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('over');
      });

      item.addEventListener('dragleave', function() {
        this.classList.remove('over');
      });

      item.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('over');
        
        if (this !== draggedItem) {
          const container = document.getElementById('container');
          const allItems = [...container.children];
          const draggedIdx = allItems.indexOf(draggedItem);
          const droppedIdx = allItems.indexOf(this);
          
          if (draggedIdx < droppedIdx) {
            this.parentNode.insertBefore(draggedItem, this.nextSibling);
          } else {
            this.parentNode.insertBefore(draggedItem, this);
          }
        }
      });
    });
  </script>
</body>
</html>`,
      hints: [
        "Use draggable attribute and drag events",
        "Handle dragover to allow drops",
        "Use insertBefore for reordering"
      ]
    },
    {
      title: "Object-Oriented Programming",
      instructions: "Create a shape hierarchy with inheritance",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Shape Classes</title>
  <style>
    canvas { border: 1px solid black; }
  </style>
</head>
<body>
  <canvas id="canvas" width="400" height="300"></canvas>
  <div>
    <button onclick="drawCircle()">Draw Circle</button>
    <button onclick="drawRectangle()">Draw Rectangle</button>
  </div>
  
  <script>
    // Create Shape, Circle, and Rectangle classes
    // Shape should have position and draw method
    // Circle and Rectangle should inherit from Shape
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Shape Classes</title>
  <style>
    canvas { border: 1px solid black; }
  </style>
</head>
<body>
  <canvas id="canvas" width="400" height="300"></canvas>
  <div>
    <button onclick="drawCircle()">Draw Circle</button>
    <button onclick="drawRectangle()">Draw Rectangle</button>
  </div>
  
  <script>
    class Shape {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }
      
      draw(ctx) {
        throw new Error('Draw method must be implemented');
      }
    }
    
    class Circle extends Shape {
      constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
      }
      
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
    class Rectangle extends Shape {
      constructor(x, y, width, height) {
        super(x, y);
        this.width = width;
        this.height = height;
      }
      
      draw(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
    }
    
    const ctx = document.getElementById('canvas').getContext('2d');
    
    function drawCircle() {
      const circle = new Circle(200, 150, 50);
      circle.draw(ctx);
    }
    
    function drawRectangle() {
      const rect = new Rectangle(150, 100, 100, 100);
      rect.draw(ctx);
    }
  </script>
</body>
</html>`,
      hints: [
        "Create base Shape class with common properties",
        "Use extends for inheritance",
        "Call super() in child constructors"
      ]
    },
    {
      title: "Custom Error Handling",
      instructions: "Create custom error types and validation system",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Form Validation with Custom Errors</title>
  <style>
    .error { color: red; }
  </style>
</head>
<body>
  <form id="userForm">
    <div>
      <input type="text" id="username" placeholder="Username">
      <span id="usernameError" class="error"></span>
    </div>
    <div>
      <input type="number" id="age" placeholder="Age">
      <span id="ageError" class="error"></span>
    </div>
    <button type="submit">Submit</button>
  </form>
  
  <script>
    // Create custom error classes and validation
    // Add try/catch with different error types
    // Show appropriate error messages
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Form Validation with Custom Errors</title>
  <style>
    .error { color: red; }
  </style>
</head>
<body>
  <form id="userForm">
    <div>
      <input type="text" id="username" placeholder="Username">
      <span id="usernameError" class="error"></span>
    </div>
    <div>
      <input type="number" id="age" placeholder="Age">
      <span id="ageError" class="error"></span>
    </div>
    <button type="submit">Submit</button>
  </form>
  
  <script>
    class ValidationError extends Error {
      constructor(field, message) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
      }
    }
    
    class AgeError extends ValidationError {
      constructor(message) {
        super('age', message);
        this.name = 'AgeError';
      }
    }
    
    class UsernameError extends ValidationError {
      constructor(message) {
        super('username', message);
        this.name = 'UsernameError';
      }
    }
    
    function validateForm(username, age) {
      if (username.length < 3) {
        throw new UsernameError('Username must be at least 3 characters');
      }
      
      if (username.match(/[^a-zA-Z0-9]/)) {
        throw new UsernameError('Username can only contain letters and numbers');
      }
      
      if (age < 18) {
        throw new AgeError('Must be 18 or older');
      }
      
      if (age > 120) {
        throw new AgeError('Invalid age');
      }
    }
    
    document.getElementById('userForm').addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      document.getElementById('usernameError').textContent = '';
      document.getElementById('ageError').textContent = '';
      
      const username = document.getElementById('username').value;
      const age = Number(document.getElementById('age').value);
      
      try {
        validateForm(username, age);
        alert('Form submitted successfully!');
        this.reset();
      } catch (error) {
        if (error instanceof ValidationError) {
          document.getElementById(\`\${error.field}Error\`).textContent = error.message;
        } else {

        }
      }
    });
  </script>
</body>
</html>`,
      hints: [
        "Create custom error classes with inheritance",
        "Use descriptive error messages",
        "Handle different error types separately"
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

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="bg-gray-100 rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-emerald-600 mb-3">JavaScript Advanced Exercises</h1>
          
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
                onClick={() => document.getElementById('hints-advanced').classList.toggle('hidden')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Show Hints
              </button>
              <div id="hints-advanced" className="hidden mt-2 bg-gray-50 rounded p-4 border border-gray-300">
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
                    onClick={() => setUserCode(exercises[currentExercise].initialCode)}
                  >
                    Clear Demo
                  </button>
                </div>
                <LiveHtmlEditor
                  initialCode={userCode || exercises[currentExercise].initialCode}
                  solution={exercises[currentExercise].solution}
                  onChange={setUserCode}
                />
              </div>
              <div className="lg:col-span-1">
                {/* Hardcoded Feedback Logic */}
                <div className="bg-slate-50 border border-slate-200 rounded p-4">
                  <h4 className="font-bold mb-2 text-emerald-700">Feedback</h4>
                  {userCode.trim() === '' ? (
                    <p className="text-gray-500 text-sm">Type your JavaScript code to get feedback.</p>
                  ) : (
                    (() => {
                      const codeHasVar = userCode.includes('let ') || userCode.includes('const ') || userCode.includes('var ');
                      const codeHasFunction = userCode.includes('function') || userCode.includes('=>');
                      if (codeHasVar && codeHasFunction) {
                        return <p className="text-green-700 text-sm">Great! Your code includes both a variable and a function as required.</p>;
                      } else if (!codeHasVar && !codeHasFunction) {
                        return <p className="text-red-700 text-sm">Your code is missing both a variable declaration (<code>let</code>, <code>const</code>, or <code>var</code>) and a function.</p>;
                      } else if (!codeHasVar) {
                        return <p className="text-red-700 text-sm">Your code is missing a variable declaration (<code>let</code>, <code>const</code>, or <code>var</code>).</p>;
                      } else {
                        return <p className="text-red-700 text-sm">Your code is missing a function definition.</p>;
                      }
                    })()
                  )}
                </div>
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


