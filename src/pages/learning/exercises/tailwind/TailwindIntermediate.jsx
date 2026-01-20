import React, { useState, useEffect, useRef } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import CodeFeedback from '../../../../components/CodeFeedback';
import { useAuth } from '../../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex, saveExerciseProgress, getExerciseProgress } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';

export default function TailwindIntermediate() {
    const { currentUser } = useAuth();
    const [currentExercise, setCurrentExercise] = useState(0);
    const [exerciseStatus, setExerciseStatus] = useState({
        0: false,
        1: false,
        2: false,
        3: false
    });
    const [userCode, setUserCode] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
    const isInitialLoadRef = useRef(true);

    useEffect(() => {
        const loadExerciseIndex = async () => {
            if (currentUser?.uid) {
                try {
                    // Load completion status for each exercise
                    const newStatus = { ...exerciseStatus };
                    for (let i = 0; i < 4; i++) {
                        const progress = await getExerciseProgress(currentUser.uid, 'tailwind', `intermediate-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);
                    console.log('Loaded Tailwind intermediate exercise statuses:', newStatus);
                    
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'tailwind', 'intermediate');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                    } else {
                        setCurrentExercise(0);
                    }
                } catch (err) {
                    console.error('Error loading Tailwind intermediate exercise index:', err);
                } finally {
                    isInitialLoadRef.current = false;
                }
            }
        };
        loadExerciseIndex();
    }, [currentUser]);

    useEffect(() => {
        const saveIndex = async () => {
            if (currentUser?.uid && !isInitialLoadRef.current) {
                try {
                    await saveCurrentExerciseIndex(currentUser.uid, 'tailwind', 'intermediate', currentExercise);
                } catch (err) {
                    console.error('Error saving current exercise index:', err);
                }
            }
        };
        saveIndex();
    }, [currentExercise, currentUser]);

    // Reset userCode when exercise changes
    useEffect(() => {
        setUserCode('');
    }, [currentExercise]);

    const exercises = [
        {
            title: "Tailwind Dark Mode",
            description: "Master Tailwind's dark mode utilities for theme switching",
            task: "Create a component that shows different styles for light and dark modes using the dark: prefix.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Dark Mode</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white dark:bg-gray-900">
    <div class="p-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Dark Mode Demo</h1>
        <!-- Add your dark mode component here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Dark Mode</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white dark:bg-gray-900">
    <div class="p-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">Dark Mode Demo</h1>
        <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-300 dark:border-gray-700">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Card with Dark Mode</h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4">This card automatically adjusts colors based on light or dark mode.</p>
            <button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded">
                Dark Mode Button
            </button>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use dark: prefix to apply styles in dark mode",
                "Apply dark styles to text colors like text-gray-600 dark:text-gray-300",
                "Dark mode styles apply to background, borders, and buttons",
                "Ensure sufficient contrast in both light and dark modes"
            ]
        },
        {
            title: "Tailwind Custom Spacing",
            description: "Learn to use custom spacing and padding values",
            task: "Create a layout with custom spacing using Tailwind's spacing scale (p-4, gap-6, etc) to create a well-balanced design.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Spacing</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-8">Spacing Exercise</h1>
    <!-- Add your spacing layout here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Spacing</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-6">
    <h1 class="text-3xl font-bold mb-8">Spacing Exercise</h1>
    <div class="flex flex-col gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4 text-gray-800">Item with padding</h2>
            <p class="text-gray-600">This item has p-6 padding</p>
        </div>
        <div class="bg-white p-8 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-6 text-gray-800">Item with more padding</h2>
            <p class="text-gray-600">This item has p-8 padding and mb-6 margin</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-2 text-gray-800">Item with less padding</h2>
            <p class="text-gray-600">This item has p-4 padding and mb-2 margin</p>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use p- prefix for padding (p-4, p-6, p-8)",
                "Use m- prefix for margin (mb-2, mb-4, mb-6)",
                "Use gap- for spacing between flex/grid items",
                "Spacing scale: 0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16..."
            ]
        },
        {
            title: "Tailwind Hover and Focus States",
            description: "Create interactive elements with hover and focus effects",
            task: "Build a form with input fields that have hover and focus states with proper styling and transitions.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Interactive</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-6">Interactive Form</h1>
    <form class="max-w-md">
        <!-- Add form inputs with hover and focus states -->
    </form>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Interactive</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-6">Interactive Form</h1>
    <form class="max-w-md bg-white p-6 rounded-lg shadow">
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" placeholder="Enter your email" class="w-full px-4 py-2 border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
        </div>
        <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input type="password" placeholder="Enter password" class="w-full px-4 py-2 border border-gray-300 rounded hover:border-blue-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition">
        </div>
        <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200">
            Submit
        </button>
    </form>
</body>
</html>`,
            hints: [
                "Use hover: prefix for hover states (hover:border-blue-400)",
                "Use focus: prefix for focus states (focus:border-blue-500)",
                "Use active: prefix for active states (active:bg-blue-700)",
                "Use transition for smooth animations between states"
            ]
        },
        {
            title: "Tailwind Gradient Backgrounds",
            description: "Create beautiful gradient backgrounds and effects",
            task: "Design a hero section with a gradient background and overlaid text content.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Gradients</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <!-- Add your hero section with gradient here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Gradients</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-5xl font-bold text-white mb-4">Gradient Hero</h1>
            <p class="text-xl text-white mb-6">This section uses a beautiful gradient background</p>
            <button class="bg-white text-purple-600 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
                Get Started
            </button>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use bg-gradient-to-* for gradient direction (to-r, to-b, to-t, to-l)",
                "Use from-, via-, and to- for gradient colors",
                "Use h-screen or h-64 for height sizing",
                "Use flex, items-center, justify-center for content positioning"
            ]
        }
    ];

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
            case 0: // Dark mode
                const hasDark = /dark:/i.test(userClean);
                const hasCardClass = /bg-white.*dark:bg|rounded|shadow/i.test(userClean);
                correct = hasDark && hasCardClass;
                break;

            case 1: // Spacing
                const hasPadding = /p-[0-9]/i.test(userClean);
                const hasMargin = /m[b-t]?-[0-9]/i.test(userClean);
                const hasGap = /gap-[0-9]/i.test(userClean);
                correct = hasPadding && (hasMargin || hasGap);
                break;

            case 2: // Hover/Focus
                const hasHover = /hover:/i.test(userClean);
                const hasFocus = /focus:/i.test(userClean);
                const hasInput = /input|type=/i.test(userClean);
                correct = hasHover && hasFocus && hasInput;
                break;

            case 3: // Gradient
                const hasGradient = /bg-gradient-to-/i.test(userClean);
                const hasGradientColor = /from-|to-|via-/i.test(userClean);
                const hasFlexCenter = /flex.*items-center|justify-center/i.test(userClean);
                correct = hasGradient && hasGradientColor && hasFlexCenter;
                break;
        }

        if (correct) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
            setShowCongrats(true);
            setTimeout(async () => {
                setShowCongrats(false);
                
                // Save exercise completion to Firebase
                if (currentUser?.uid) {
                    try {
                        const levelKey = `intermediate-${currentExercise}`;
                        await saveExerciseProgress(currentUser.uid, 'tailwind', levelKey, userCode, true, 10);
                        console.log(`✅ Saved Tailwind intermediate exercise completion`);
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
                            await saveCurrentExerciseIndex(currentUser.uid, 'tailwind', 'intermediate', nextIndex);
                            console.log(`✅ Saved Tailwind intermediate index: ${nextIndex}`);
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

    return (
        <div className="min-h-screen bg-white pt-16">
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

            {lockedExerciseIndex !== null && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
                    <div className="bg-white p-6 rounded-lg shadow-xl border border-orange-500 max-w-sm">
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-orange-600 mb-2">🔒 Exercise Locked</h3>
                            <p className="text-gray-700 mb-4">Complete the previous exercise first to unlock this one.</p>
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

            <div className="container mx-auto px-4 py-4 max-w-4xl">
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">Tailwind Intermediate Exercises</h1>
                    
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
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-300 text-gray-700'
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
                                {exerciseStatus[index] && <span className="ml-1">✓</span>}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
                        <h2 className="text-lg font-bold text-emerald-600 mb-1">{exercises[currentExercise].title}</h2>
                        <p className="text-gray-700 mb-3 text-sm">{exercises[currentExercise].description}</p>
                        
                        <div>
                            <div className="bg-white rounded p-4 mb-4 border border-gray-300">
                                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Your Task:</h3>
                                <p className="text-gray-700">{exercises[currentExercise].task}</p>
                            </div>
                            
                            <div className="mb-4">
                                <button 
                                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-2"
                                    onClick={() => document.getElementById('hints').classList.toggle('hidden')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    Show Hints
                                </button>
                                <div id="hints" className="hidden mt-2 bg-white rounded p-4 border border-gray-300">
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {exercises[currentExercise].hints?.map((hint, index) => (
                                            <li key={index} className="text-sm">{hint}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                    <LiveHtmlEditor 
                                        initialCode={exercises[currentExercise].initialCode}
                                        onChange={setUserCode}
                                    />
                                </div>
                                <div className="lg:col-span-1">
                                    <CodeFeedback 
                                        code={userCode}
                                        language="html"
                                        task={exercises[currentExercise].task}
                                        exerciseId={`tailwind-intermediate-${currentExercise}`}
                                        level="intermediate"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 flex gap-4">
                                <button
                                    onClick={handleCodeSubmit}
                                    className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors cursor-pointer text-sm font-medium"
                                >
                                    Submit Code
                                </button>

                                <button 
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2 px-4 py-1.5 border border-emerald-400 rounded bg-white"
                                    onClick={() => document.getElementById('solution').classList.toggle('hidden')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    Show Solution
                                </button>
                            </div>

                            {showError && (
                                <div className="mt-4 bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded animate-shake">
                                    <p>Not quite right! Check the requirements and try again.</p>
                                </div>
                            )}

                            <div id="solution" className="hidden mt-4 bg-white rounded p-4 border border-gray-300">
                                <pre className="text-gray-800 text-sm overflow-x-auto">
                                    <code>{exercises[currentExercise].solution}</code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
