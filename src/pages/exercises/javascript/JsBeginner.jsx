import React from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';

export default function JsBeginner() {
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
    const savedStatus = localStorage.getItem('jsBeginnerStatus');
    if (savedStatus) {
      setExerciseStatus(JSON.parse(savedStatus));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('jsBeginnerStatus', JSON.stringify(exerciseStatus));
  }, [exerciseStatus]);

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
    <div className="min-h-screen bg-slate-900 pt-16">
      {/* Congratulations Modal */}
      {showCongrats && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-slate-800 p-6 rounded-lg shadow-xl border border-fuchsia-500 animate-bounce">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-fuchsia-400 mb-2">🎉 Congratulations! 🎉</h3>
              <p className="text-slate-300">You've completed this exercise!</p>
              {currentExercise < exercises.length - 1 && (
                <p className="text-slate-400 text-sm mt-2">Moving to next exercise...</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-4 max-w-4xl">
        <div className="bg-slate-800/50 rounded-lg shadow-lg p-4 mb-4">
          <h1 className="text-xl font-bold text-fuchsia-400 mb-3">JavaScript Beginner Exercises</h1>
          
          {/* Exercise Navigation */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {exercises.map((ex, index) => (
              <button
                key={index}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  !canAccessExercise(index)
                    ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                    : currentExercise === index
                    ? 'bg-fuchsia-500 text-white'
                    : exerciseStatus[index]
                    ? 'bg-green-500 text-white hover:bg-green-600'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
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
          <div className="bg-slate-900/50 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-bold text-fuchsia-400 mb-1">{exercises[currentExercise].title}</h2>
            <p className="text-slate-300 mb-3 text-sm">{exercises[currentExercise].instructions}</p>
            
            {/* Hints */}
            <div className="mb-4">
              <button 
                className="text-fuchsia-400 hover:text-fuchsia-300 text-sm font-medium flex items-center gap-2"
                onClick={() => document.getElementById('hints-beginner').classList.toggle('hidden')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                Show Hints
              </button>
              <div id="hints-beginner" className="hidden mt-2 bg-slate-800/50 rounded p-4 border border-slate-700/50">
                <ul className="list-disc list-inside text-slate-300 space-y-1">
                  {exercises[currentExercise].hints.map((hint, index) => (
                    <li key={index} className="text-sm">{hint}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Code Editor */}
            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden mb-4">
              <LiveHtmlEditor
                initialCode={exercises[currentExercise].initialCode}
                solution={exercises[currentExercise].solution}
                onChange={setUserCode}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleCodeSubmit}
              className="px-4 py-2 bg-fuchsia-500 text-white rounded hover:bg-fuchsia-600 transition-colors cursor-pointer text-sm font-medium"
            >
              Submit Code
            </button>

            {/* Error Message */}
            {showError && (
              <div className="mt-4 bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 rounded animate-shake">
                <p>Not quite right! Check the requirements and try again.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
