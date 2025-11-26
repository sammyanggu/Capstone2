import React from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';

export default function JsIntermediate() {
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

  // Save progress to localStorage
  React.useEffect(() => {
    const savedStatus = localStorage.getItem('jsIntermediateStatus');
    if (savedStatus) {
      setExerciseStatus(JSON.parse(savedStatus));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('jsIntermediateStatus', JSON.stringify(exerciseStatus));
  }, [exerciseStatus]);

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
      setTimeout(() => {
        setShowCongrats(false);
        if (currentExercise < exercises.length - 1) {
          setCurrentExercise(currentExercise + 1);
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
      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white p-6 rounded-lg shadow-xl border border-emerald-500 animate-bounce">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-emerald-500 mb-2">🎉 Congratulations! 🎉</h3>
              <p className="text-gray-700">You've completed this exercise!</p>
              {currentExercise < exercises.length - 1 && (
                <p className="text-gray-600 text-sm mt-2">Moving to next exercise...</p>
              )}
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
                onClick={() => canAccessExercise(index) && setCurrentExercise(index)}
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
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCodeSubmit}
              className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer text-sm font-medium"
            >
              Submit Code
            </button>

            {/* Error Message */}
            {showError && (
              <div className="mt-4 bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded animate-shake">
                <p>Not quite right! Check the requirements and try again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
