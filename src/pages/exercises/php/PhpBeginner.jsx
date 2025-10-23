import React from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';
import '../../exercises/exercises.css';

export default function PhpBeginner() {
  const [currentExercise, setCurrentExercise] = React.useState(0);
  const [exerciseStatus, setExerciseStatus] = React.useState({
    0: false, 1: false, 2: false, 3: false, 4: false
  });
  const [userCode, setUserCode] = React.useState('');
  const [showHints, setShowHints] = React.useState(false);
  const [showCongrats, setShowCongrats] = React.useState(false);
  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    const savedStatus = localStorage.getItem('phpBeginnerStatus');
    if (savedStatus) {
      setExerciseStatus(JSON.parse(savedStatus));
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem('phpBeginnerStatus', JSON.stringify(exerciseStatus));
  }, [exerciseStatus]);

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
    } else {
      setShowError(true);
      setShowCongrats(false);
    }
  };

  const toggleHints = () => {
    setShowHints(!showHints);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Exercise navigation */}
      <div className="sticky top-16 bg-slate-900/95 backdrop-blur z-10 border-b border-slate-800 pb-3">
        <h1 className="text-2xl font-bold text-fuchsia-400 px-4 pt-4 pb-3">
          PHP Beginner Exercises
        </h1>
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
                }
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                currentExercise === index
                  ? 'bg-fuchsia-600 text-white shadow-md'
                  : index === 0 || exerciseStatus[index - 1]
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  : 'bg-slate-800/50 text-slate-500 cursor-not-allowed'
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
        <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
          <h2 className="text-xl font-bold text-fuchsia-400 mb-2">
            {exercises[currentExercise].title}
          </h2>
          <div className="bg-slate-900/50 rounded p-3 border border-slate-700">
            <h3 className="text-white font-medium mb-2">Instructions:</h3>
            <p className="text-slate-300 text-base leading-relaxed">
              {exercises[currentExercise].description}
            </p>
          </div>

          <button
            onClick={toggleHints}
            className="mt-3 text-fuchsia-400 hover:text-fuchsia-300 flex items-center cursor-pointer text-sm bg-slate-900/50 px-3 py-2 rounded-md hover:bg-slate-900 transition-colors"
          >
            <span className="mr-1.5">💡</span> {showHints ? 'Hide Hints' : 'Show Hints'}
        </button>

        {showHints && (
          <div className="mt-2 bg-slate-900/50 rounded p-3 border border-fuchsia-500/20">
            <h4 className="text-fuchsia-400 font-medium mb-2">Helpful Hints:</h4>
            <ul className="list-disc list-inside text-slate-300 space-y-2 text-sm">
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
          <div className="mb-4">
            <LiveHtmlEditor
            initialCode={userCode || exercises[currentExercise].starterCode}
            onChange={setUserCode}
            language="php"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmitCode}
            className="px-4 py-1.5 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
          {exerciseStatus[currentExercise] && (
            <span className="text-green-500 text-sm">✓ Completed</span>
          )}
        </div>

        {showError && (
          <div className="mt-2 p-2 bg-red-900/50 text-red-200 rounded text-sm">
            Not quite right. Try again!
          </div>
        )}
        {showCongrats && (
          <div className="mt-2 p-2 bg-green-900/50 text-green-200 rounded text-sm">
            🎉 Good job! Exercise complete. 
            {currentExercise < exercises.length - 1 && (
              <span> Try Exercise {currentExercise + 2} next!</span>
            )}
          </div>
        )}
      </div>
    </div>
  </div>)};
