import React from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import CodeFeedback from '../../../../components/CodeFeedback';
import Confetti from '../../../../components/Confetti';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';

export default function JsIntermediate() {
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
            const progress = await getExerciseProgress(currentUser.uid, 'javascript', `intermediate-${i}`);
            if (progress && progress.isCompleted) {
              newStatus[i] = true;
            }
          }
          setExerciseStatus(newStatus);
          console.log('Loaded JavaScript intermediate exercise statuses:', newStatus);

          const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'javascript', 'intermediate');
          if (savedIndex !== null && savedIndex !== undefined) {
            setCurrentExercise(savedIndex);
            console.log(`✅ Resumed from exercise ${savedIndex}`);
          }
          isInitialLoadRef.current = false;
        } catch (err) {
          console.error('Error loading JS intermediate exercise index:', err);
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
          await saveCurrentExerciseIndex(currentUser.uid, 'javascript', 'intermediate', currentExercise);
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
      case 0: // Array Methods
        const hasFilter = /filter\s*\(/.test(userClean);
        const hasMap = /map\s*\(/.test(userClean);
        const hasNumberParsing = /number\s*\(/.test(userClean);
        correct = hasFilter && hasMap && hasNumberParsing;
        break;

      case 1: // Object Manipulation
        const hasObjectCreation = /new\s+person/.test(userClean);
        const hasMethodCall = /person\.getfullname/.test(userClean);
        const hasThis = /this\./.test(userClean);
        correct = hasObjectCreation && hasMethodCall && hasThis;
        break;

      case 2: // Event Handlers
        const hasEventListener = /addeventlistener/.test(userClean);
        const hasPreventDefault = /preventdefault/.test(userClean);
        const hasMultipleHandlers = (userClean.match(/addeventlistener/g) || []).length >= 2;
        correct = hasEventListener && hasPreventDefault && hasMultipleHandlers;
        break;

      case 3: // Form Validation
        const hasEmailValidation = /email.*?@/.test(userClean);
        const hasPasswordCheck = /password.*?length/.test(userClean);
        const hasErrorDisplay = /error.*?textcontent/.test(userClean);
        correct = hasEmailValidation && hasPasswordCheck && hasErrorDisplay;
        break;

      case 4: // Local Storage
        const hasSetItem = /setitem/.test(userClean);
        const hasGetItem = /getitem/.test(userClean);
        const hasJSONParse = /json\.parse/.test(userClean);
        correct = hasSetItem && hasGetItem && hasJSONParse;
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
            const levelKey = `intermediate-${currentExercise}`;
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
              await saveCurrentExerciseIndex(currentUser.uid, 'javascript', 'intermediate', nextIndex);
              console.log(`✅ Saved JavaScript intermediate index: ${nextIndex}`);
            } catch (err) {
              console.error('Error saving new index:', err);
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
      title: "Array Methods",
      instructions: "Create a function that filters numbers from an array and doubles them",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Array Methods Exercise</title>
</head>
<body>
  <div>
    <p>Input array: ["1", "apple", "2", "banana", "3"]</p>
    <button onclick="processArray()">Process Array</button>
    <p id="result"></p>
  </div>
  
  <script>
    // Write a function that:
    // 1. Filters out non-numbers
    // 2. Converts strings to numbers
    // 3. Doubles each number
    function processArray() {
      const arr = ["1", "apple", "2", "banana", "3"];
      // Your code here
      
    }
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Array Methods Exercise</title>
</head>
<body>
  <div>
    <p>Input array: ["1", "apple", "2", "banana", "3"]</p>
    <button onclick="processArray()">Process Array</button>
    <p id="result"></p>
  </div>
  
  <script>
    function processArray() {
      const arr = ["1", "apple", "2", "banana", "3"];
      const result = arr
        .filter(item => !isNaN(Number(item)))
        .map(num => Number(num) * 2);
      document.getElementById("result").textContent = JSON.stringify(result);
    }
  </script>
</body>
</html>`,
      hints: [
        "Use filter() to keep only items that can be converted to numbers",
        "Use map() to transform the filtered items",
        "Use Number() to convert strings to numbers"
      ]
    },
    {
      title: "Object Methods",
      instructions: "Create a Person class with methods to get full name and age",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Object Methods Exercise</title>
</head>
<body>
  <button onclick="createPerson()">Create Person</button>
  <p id="personInfo"></p>
  
  <script>
    // Create a Person class with:
    // - firstName, lastName, birthYear properties
    // - getFullName() and getAge() methods
    class Person {
      // Your code here
      
    }
    
    function createPerson() {
      const person = new Person("John", "Doe", 1990);
      const info = document.getElementById("personInfo");
      info.textContent = \`Name: \${person.getFullName()}, Age: \${person.getAge()}\`;
    }
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Object Methods Exercise</title>
</head>
<body>
  <button onclick="createPerson()">Create Person</button>
  <p id="personInfo"></p>
  
  <script>
    class Person {
      constructor(firstName, lastName, birthYear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
      }
      
      getFullName() {
        return \`\${this.firstName} \${this.lastName}\`;
      }
      
      getAge() {
        const currentYear = new Date().getFullYear();
        return currentYear - this.birthYear;
      }
    }
    
    function createPerson() {
      const person = new Person("John", "Doe", 1990);
      const info = document.getElementById("personInfo");
      info.textContent = \`Name: \${person.getFullName()}, Age: \${person.getAge()}\`;
    }
  </script>
</body>
</html>`,
      hints: [
        "Use constructor() to initialize properties",
        "Use this keyword to access instance properties",
        "Create methods using the class syntax"
      ]
    },
    {
      title: "Event Handlers",
      instructions: "Create a form with multiple event handlers",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Event Handlers Exercise</title>
  <style>
    .error { color: red; }
    .success { color: green; }
  </style>
</head>
<body>
  <form id="myForm">
    <input type="text" id="username" placeholder="Username">
    <button type="submit">Submit</button>
  </form>
  <p id="status"></p>
  
  <script>
    // Add event handlers for:
    // 1. Form submission
    // 2. Input focus/blur
    // 3. Input validation
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Event Handlers Exercise</title>
  <style>
    .error { color: red; }
    .success { color: green; }
  </style>
</head>
<body>
  <form id="myForm">
    <input type="text" id="username" placeholder="Username">
    <button type="submit">Submit</button>
  </form>
  <p id="status"></p>
  
  <script>
    const form = document.getElementById("myForm");
    const input = document.getElementById("username");
    const status = document.getElementById("status");
    
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      if (input.value.length >= 3) {
        status.textContent = "Form submitted successfully!";
        status.className = "success";
      }
    });
    
    input.addEventListener("focus", function() {
      status.textContent = "Type at least 3 characters";
      status.className = "";
    });
    
    input.addEventListener("blur", function() {
      if (input.value.length < 3) {
        status.textContent = "Username too short!";
        status.className = "error";
      }
    });
  </script>
</body>
</html>`,
      hints: [
        "Use addEventListener for each event",
        "Remember to prevent form submission default behavior",
        "Update status message based on different events"
      ]
    },
    {
      title: "Form Validation",
      instructions: "Create a registration form with email and password validation",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Form Validation Exercise</title>
  <style>
    .error { color: red; font-size: 0.8em; }
  </style>
</head>
<body>
  <form id="registrationForm">
    <div>
      <input type="email" id="email" placeholder="Email">
      <span id="emailError" class="error"></span>
    </div>
    <div>
      <input type="password" id="password" placeholder="Password">
      <span id="passwordError" class="error"></span>
    </div>
    <button type="submit">Register</button>
  </form>
  
  <script>
    // Add validation for:
    // 1. Valid email format
    // 2. Password length and complexity
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Form Validation Exercise</title>
  <style>
    .error { color: red; font-size: 0.8em; }
  </style>
</head>
<body>
  <form id="registrationForm">
    <div>
      <input type="email" id="email" placeholder="Email">
      <span id="emailError" class="error"></span>
    </div>
    <div>
      <input type="password" id="password" placeholder="Password">
      <span id="passwordError" class="error"></span>
    </div>
    <button type="submit">Register</button>
  </form>
  
  <script>
    const form = document.getElementById("registrationForm");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    
    function validateEmail(email) {
      return email.includes("@") && email.includes(".");
    }
    
    function validatePassword(password) {
      return password.length >= 8;
    }
    
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      let isValid = true;
      
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      if (!validateEmail(email)) {
        emailError.textContent = "Please enter a valid email";
        isValid = false;
      } else {
        emailError.textContent = "";
      }
      
      if (!validatePassword(password)) {
        passwordError.textContent = "Password must be at least 8 characters";
        isValid = false;
      } else {
        passwordError.textContent = "";
      }
      
      if (isValid) {
        alert("Registration successful!");
        form.reset();
      }
    });
  </script>
</body>
</html>`,
      hints: [
        "Check email format using string methods",
        "Validate password length and complexity",
        "Show error messages for invalid fields"
      ]
    },
    {
      title: "Local Storage",
      instructions: "Create a note-taking app that saves notes to localStorage",
      initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>Note Taking App</title>
</head>
<body>
  <textarea id="noteInput" placeholder="Write your note"></textarea>
  <button onclick="saveNote()">Save Note</button>
  <button onclick="loadNotes()">Load Notes</button>
  <div id="notesList"></div>
  
  <script>
    // Implement:
    // 1. Saving notes to localStorage
    // 2. Loading notes from localStorage
    // 3. Displaying saved notes
    // Your code here
    
  </script>
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html>
<head>
  <title>Note Taking App</title>
</head>
<body>
  <textarea id="noteInput" placeholder="Write your note"></textarea>
  <button onclick="saveNote()">Save Note</button>
  <button onclick="loadNotes()">Load Notes</button>
  <div id="notesList"></div>
  
  <script>
    function saveNote() {
      const noteInput = document.getElementById("noteInput");
      const note = noteInput.value.trim();
      
      if (note) {
        const notes = JSON.parse(localStorage.getItem("notes") || "[]");
        notes.push({ text: note, date: new Date().toLocaleString() });
        localStorage.setItem("notes", JSON.stringify(notes));
        noteInput.value = "";
        loadNotes();
      }
    }
    
    function loadNotes() {
      const notesList = document.getElementById("notesList");
      const notes = JSON.parse(localStorage.getItem("notes") || "[]");
      
      notesList.innerHTML = notes
        .map(note => \`<p><strong>\${note.date}</strong>: \${note.text}</p>\`)
        .join("");
    }
    
    // Load notes on page load
    loadNotes();
  </script>
</body>
</html>`,
      hints: [
        "Use localStorage.setItem() to save notes",
        "Use localStorage.getItem() to retrieve notes",
        "Use JSON.parse() and JSON.stringify() for storage"
      ]
    }
  ];
  
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

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="bg-gray-100 rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-emerald-600 mb-3">JavaScript Intermediate Exercises</h1>
          
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
                onClick={() => document.getElementById('hints-intermediate').classList.toggle('hidden')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Show Hints
              </button>
              <div id="hints-intermediate" className="hidden mt-2 bg-gray-50 rounded p-4 border border-gray-300">
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
                <CodeFeedback 
                  code={userCode}
                  language="javascript"
                  task={exercises[currentExercise].task}
                  exerciseId={`javascript-intermediate-${currentExercise}`}
                  level="intermediate"
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
