import React, { useState } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import CodeFeedback from '../../../../components/CodeFeedback';
import { useAuth } from '../../../../AuthContext';
import { saveExerciseProgress, getExerciseProgress, saveCurrentExerciseIndex, getCurrentExerciseIndex } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';
import { toast } from 'react-toastify';
import { phpIcon } from '../../../../assets/icons/index.js';

const initialCode = `<?php
// PHP Intermediate Exercises
// Complete the following tasks:

// Task 1: Create an array of user data and loop through it
$users = [
    ['name' => 'John', 'age' => 25],
    ['name' => 'Jane', 'age' => 30]
];

// Your code here to display user information

// Task 2: Create a function that checks if a number is prime
function isPrime($number) {
    // Your code here
}

// Task 3: Work with POST data (simulated)
$_POST['username'] = 'testuser';
$_POST['email'] = 'test@example.com';

// Validate and display the form data
// Your code here

?>`;

const PhpIntermediate = () => {
    const { currentUser } = useAuth();
    const [currentExercise, setCurrentExercise] = useState(0);
    const [exerciseStatus, setExerciseStatus] = useState({
        0: false, 1: false, 2: false, 3: false
    });
    const [code, setCode] = useState(initialCode);
    const [output, setOutput] = useState('');
    const [showCongrats, setShowCongrats] = useState(false);
    const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
    const isInitialLoadRef = React.useRef(true);

    const exercises = [
        {
            title: "Arrays and Loops",
            description: "Practice working with arrays and different types of loops in PHP.",
            tasks: [
                "Create an associative array with user data",
                "Use foreach to display all user information",
                "Calculate and display average age"
            ],
            starterCode: `<?php
$users = [
    ['name' => 'John', 'age' => 25],
    ['name' => 'Jane', 'age' => 30]
];

// Display user information
// Your code here

// Calculate and display average age
// Your code here
?>`,
            solution: `<?php
$users = [
    ['name' => 'John', 'age' => 25],
    ['name' => 'Jane', 'age' => 30],
    ['name' => 'Bob', 'age' => 35]
];

// Display user information
foreach ($users as $user) {
    echo "Name: " . $user['name'] . ", Age: " . $user['age'] . "\\n";
}

// Calculate average age
$totalAge = 0;
$count = count($users);
foreach ($users as $user) {
    $totalAge += $user['age'];
}
$averageAge = $totalAge / $count;
echo "Average age: " . $averageAge;
?>`
        },
        {
            title: "Functions and Logic",
            description: "Create functions with complex logic and calculations.",
            tasks: [
                "Write a function to check if a number is prime",
                "Create a function that finds factors of a number",
                "Implement error handling with try-catch"
            ],
            starterCode: `<?php
function isPrime($number) {
    // Your code here
}

function getFactors($number) {
    // Your code here
}

// Test your functions here
?>`,
            solution: `<?php
function isPrime($number) {
    if ($number < 2) return false;
    for ($i = 2; $i <= sqrt($number); $i++) {
        if ($number % $i == 0) return false;
    }
    return true;
}

function getFactors($number) {
    $factors = [];
    for ($i = 1; $i <= $number; $i++) {
        if ($number % $i == 0) {
            $factors[] = $i;
        }
    }
    return $factors;
}

try {
    $num = 17;
    echo "Is $num prime? " . (isPrime($num) ? "Yes" : "No") . "\\n";
    echo "Factors of 12: " . implode(", ", getFactors(12));
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>`
        },
        {
            title: "Form Handling",
            description: "Learn to handle form data and validate input.",
            tasks: [
                "Validate username (alphanumeric only)",
                "Check if email format is valid",
                "Display appropriate error messages"
            ],
            starterCode: `<?php
$_POST['username'] = 'testuser123';
$_POST['email'] = 'test@example.com';

$errors = [];

// Validate username (alphanumeric only)
// Your code here

// Validate email
// Your code here

// Display results
// Your code here
?>`,
            solution: `<?php
$_POST['username'] = 'testuser123';
$_POST['email'] = 'test@example.com';

$errors = [];

// Validate username (alphanumeric only)
if (!preg_match('/^[a-zA-Z0-9]+$/', $_POST['username'])) {
    $errors[] = "Username must be alphanumeric";
}

// Validate email
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Email format is invalid";
}

if (empty($errors)) {
    echo "Username: " . $_POST['username'] . "\\n";
    echo "Email: " . $_POST['email'] . "\\n";
    echo "Validation passed!";
} else {
    foreach ($errors as $error) {
        echo "Error: " . $error . "\\n";
    }
}
?>`
        },
        {
            title: "File Operations",
            description: "Work with file reading and writing operations.",
            tasks: [
                "Create a function to read from a text file",
                "Write data to a file with proper error handling",
                "List all files in a directory"
            ],
            starterCode: `<?php
function readFile($filename) {
    // Your code here
}

function writeFile($filename, $data) {
    // Your code here
}

function listFiles($directory) {
    // Your code here
}
?>`,
            solution: `<?php
function readFile($filename) {
    if (!file_exists($filename)) {
        return "File not found";
    }
    return file_get_contents($filename);
}

function writeFile($filename, $data) {
    try {
        file_put_contents($filename, $data);
        return "File written successfully";
    } catch (Exception $e) {
        return "Error: " . $e->getMessage();
    }
}

function listFiles($directory) {
    if (!is_dir($directory)) {
        return "Directory not found";
    }
    $files = scandir($directory);
    return array_filter($files, function($f) { return $f !== '.' && $f !== '..'; });
}

// Example usage
echo "File operations example";
?>`
        }
    ];

    // Load current exercise index from Firebase
    React.useEffect(() => {
        const loadExerciseIndex = async () => {
            if (currentUser?.uid) {
                try {
                    // Load completion status for each exercise (4 exercises for PHP)
                    const newStatus = { ...exerciseStatus };
                    for (let i = 0; i < 4; i++) {
                        const progress = await getExerciseProgress(currentUser.uid, 'php', `intermediate-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);
                    console.log('Loaded PHP intermediate exercise statuses:', newStatus);

                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'php', 'intermediate');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                        console.log(`✅ Resumed from exercise ${savedIndex}`);
                    }
                    isInitialLoadRef.current = false;
                } catch (err) {
                    console.error('Error loading PHP intermediate exercise index:', err);
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
                    await saveCurrentExerciseIndex(currentUser.uid, 'php', 'intermediate', currentExercise);
                } catch (err) {
                    console.error('Error saving current exercise index:', err);
                }
            }
        };

        saveIndex();
    }, [currentExercise, currentUser]);

    // Reset code when exercise changes
    React.useEffect(() => {
        setCode(exercises[currentExercise]?.starterCode || initialCode);
    }, [currentExercise]);

    const canAccessExercise = (index) => {
        if (index === 0) return true;
        return exerciseStatus[index - 1] === true;
    };

    const handleSubmitCode = () => {
        // Mark as complete
        setExerciseStatus(prev => ({
            ...prev,
            [currentExercise]: true
        }));
        setShowCongrats(true);
        
        setTimeout(async () => {
            setShowCongrats(false);
            
            // Save exercise completion to Firebase with unique levelKey
            if (currentUser?.uid) {
                try {
                    const levelKey = `intermediate-${currentExercise}`;
                    await saveExerciseProgress(currentUser.uid, 'php', levelKey, code, true, 10);
                    console.log(`✅ Saved PHP intermediate exercise ${levelKey} completion`);
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
                        await saveCurrentExerciseIndex(currentUser.uid, 'php', 'intermediate', nextIndex);
                        console.log(`✅ Saved PHP intermediate index: ${nextIndex}`);
                    } catch (err) {
                        console.error('Error saving new index:', err);
                    }
                }
            } else if (currentExercise === exercises.length - 1 && currentUser?.uid) {
                toast.success('PHP Intermediate completed! 🎉');
            }
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Exercise navigation */}
            <div className="sticky top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur z-10 border-b border-gray-300 dark:border-gray-700 pb-3">
                <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                    <img src={phpIcon} alt="PHP Logo" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
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
                                    setCode('');
                                } else {
                                    setLockedExerciseIndex(index);
                                }
                            }}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                currentExercise === index
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : canAccessExercise(index)
                                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
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
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                        {exercises[currentExercise].title}
                    </h2>
                    <div className="bg-white dark:bg-gray-700 rounded p-3 border border-gray-300 dark:border-gray-600">
                        <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-2">Description:</h3>
                        <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                            {exercises[currentExercise].description}
                        </p>
                        
                        <h3 className="text-gray-800 dark:text-gray-200 font-medium mt-3 mb-2">Tasks:</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                            {exercises[currentExercise].tasks.map((task, idx) => (
                                <li key={idx}>{task}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="bg-slate-800/50 dark:bg-slate-900 rounded-lg p-4">
                    <h3 className="text-white font-medium mb-3 flex items-center">
                        <span className="text-lg mr-2">⌨️</span>
                        Code Editor
                    </h3>
                    <div className="mb-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                            <LiveHtmlEditor
                                initialCode={code || exercises[currentExercise]?.starterCode || initialCode}
                                onChange={setCode}
                                language="php"
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <CodeFeedback 
                                code={code}
                                language="php"
                                task={exercises[currentExercise]?.task}
                                exerciseId={`php-intermediate-${currentExercise}`}
                                level="intermediate"
                            />
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
                            onClick={() => document.getElementById('solution-intermediate').classList.toggle('hidden')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            Show Solution
                        </button>
                    </div>

                    {/* Solution Box */}
                    <div id="solution-intermediate" className="hidden mt-4 bg-white dark:bg-gray-700 rounded p-4 border border-gray-300 dark:border-gray-600">
                        <pre className="text-gray-800 dark:text-gray-200 text-sm overflow-x-auto">
                            <code>{exercises[currentExercise].solution || 'No solution available'}</code>
                        </pre>
                    </div>
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
            )}                {/* Exercise Locked Modal */}
                {lockedExerciseIndex !== null && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl border border-orange-500 max-w-sm">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-orange-600 mb-2">🔒 Exercise Locked</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">Complete the previous exercise first!</p>
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
    );
};

export default PhpIntermediate;
