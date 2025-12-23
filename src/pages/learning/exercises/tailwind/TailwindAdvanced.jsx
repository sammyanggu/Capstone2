import React, { useState, useEffect } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import { useAuth } from '../../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex, completeExercise } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';

export default function TailwindAdvanced() {
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

    useEffect(() => {
        const savedStatus = localStorage.getItem('tailwindAdvancedStatus');
        if (savedStatus) {
            setExerciseStatus(JSON.parse(savedStatus));
        }
    }, []);

    useEffect(() => {
        const loadExerciseIndex = async () => {
            if (currentUser?.uid) {
                try {
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'tailwind', 'advanced');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                    }
                } catch (err) {
                    console.error('Error loading Tailwind advanced exercise index:', err);
                }
            }
        };
        loadExerciseIndex();
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('tailwindAdvancedStatus', JSON.stringify(exerciseStatus));
    }, [exerciseStatus]);

    useEffect(() => {
        const saveIndex = async () => {
            if (currentUser?.uid) {
                try {
                    await saveCurrentExerciseIndex(currentUser.uid, 'tailwind', 'advanced', currentExercise);
                } catch (err) {
                    console.error('Error saving current exercise index:', err);
                }
            }
        };
        saveIndex();
    }, [currentExercise, currentUser]);

    const exercises = [
        {
            title: "Tailwind Complex Layouts",
            description: "Create advanced multi-column layouts with Tailwind",
            task: "Build a complex dashboard layout with header, sidebar, and main content area with proper grid and responsive behavior.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Add your dashboard layout here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-64 bg-gray-800 text-white p-6">
            <h1 class="text-2xl font-bold mb-8">Dashboard</h1>
            <nav class="space-y-4">
                <a href="#" class="block p-2 hover:bg-gray-700 rounded">Home</a>
                <a href="#" class="block p-2 hover:bg-gray-700 rounded">Analytics</a>
                <a href="#" class="block p-2 hover:bg-gray-700 rounded">Settings</a>
            </nav>
        </div>
        <!-- Main Content -->
        <div class="flex-1 flex flex-col">
            <!-- Header -->
            <div class="bg-white shadow p-6 border-b border-gray-200">
                <h2 class="text-3xl font-bold text-gray-800">Welcome to Dashboard</h2>
            </div>
            <!-- Content -->
            <div class="flex-1 p-6">
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-gray-800">Card 1</h3>
                        <p class="text-gray-600 mt-2">Dashboard content card</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-gray-800">Card 2</h3>
                        <p class="text-gray-600 mt-2">Dashboard content card</p>
                    </div>
                    <div class="bg-white p-6 rounded-lg shadow">
                        <h3 class="text-lg font-bold text-gray-800">Card 3</h3>
                        <p class="text-gray-600 mt-2">Dashboard content card</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use flex and h-screen for full-height layout",
                "Use w-64 for fixed sidebar width",
                "Use flex-1 to make content area fill remaining space",
                "Combine grid layout with sidebar for complex designs"
            ]
        },
        {
            title: "Tailwind Animations",
            description: "Create animations using Tailwind's animation utilities",
            task: "Build animated elements using Tailwind's animation utilities like animate-spin, animate-bounce, and custom animations.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Animations</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Animations Demo</h1>
    <!-- Add animated elements here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Animations</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Animations Demo</h1>
    <div class="space-y-8">
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">Spinning</h2>
            <div class="inline-block">
                <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">Bouncing</h2>
            <div class="inline-block">
                <div class="animate-bounce h-8 w-8 bg-green-500 rounded-full"></div>
            </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h2 class="text-xl font-bold mb-4">Pulse</h2>
            <div class="inline-block">
                <div class="animate-pulse h-8 w-8 bg-purple-500 rounded"></div>
            </div>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use animate-spin for rotating elements",
                "Use animate-bounce for bouncing motion",
                "Use animate-pulse for fading effect",
                "Combine with SVG or div elements for animated content"
            ]
        },
        {
            title: "Tailwind Container Queries",
            description: "Use responsive design with proper container sizing",
            task: "Create a responsive card layout that adapts based on container width using Tailwind's responsive breakpoints effectively.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Responsive</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white p-4">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Responsive Design</h1>
    <!-- Add your responsive cards here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Responsive</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white p-4">
    <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Responsive Design</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div class="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg text-white">
            <h3 class="text-lg font-bold mb-2">Responsive 1</h3>
            <p class="text-sm">Adapts to screen size</p>
        </div>
        <div class="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg text-white">
            <h3 class="text-lg font-bold mb-2">Responsive 2</h3>
            <p class="text-sm">Mobile to desktop</p>
        </div>
        <div class="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-lg text-white">
            <h3 class="text-lg font-bold mb-2">Responsive 3</h3>
            <p class="text-sm">Flexible layout</p>
        </div>
        <div class="bg-gradient-to-br from-pink-400 to-pink-600 p-6 rounded-lg text-white">
            <h3 class="text-lg font-bold mb-2">Responsive 4</h3>
            <p class="text-sm">Scales smoothly</p>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use sm:, md:, lg:, xl: prefixes for breakpoints",
                "Mobile-first approach: design for mobile first",
                "Use grid-cols-1 sm:grid-cols-2 md:grid-cols-3 for responsive grids",
                "Test responsiveness at different screen sizes"
            ]
        },
        {
            title: "Tailwind Advanced Styling",
            description: "Master complex styling with Tailwind utilities",
            task: "Create a styled component with multiple layers including borders, shadows, gradients, and overlay effects.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Advanced Styling</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 p-8">
    <h1 class="text-4xl font-bold text-white mb-8">Advanced Styling</h1>
    <!-- Add your advanced styled component here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Advanced Styling</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 p-8">
    <h1 class="text-4xl font-bold text-white mb-8">Advanced Styling</h1>
    <div class="relative max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
        <!-- Gradient background -->
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-75"></div>
        
        <!-- Content overlay -->
        <div class="relative p-8 bg-black/30 backdrop-blur-sm text-white">
            <h2 class="text-3xl font-bold mb-4">Advanced Card</h2>
            <p class="text-lg mb-6">This card combines gradients, overlays, and backdrop blur.</p>
            <div class="flex gap-2">
                <button class="px-6 py-2 bg-white/20 hover:bg-white/30 border border-white/40 rounded-lg transition">
                    Action 1
                </button>
                <button class="px-6 py-2 bg-white/20 hover:bg-white/30 border border-white/40 rounded-lg transition">
                    Action 2
                </button>
            </div>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use relative and absolute positioning for layering",
                "Use backdrop-blur for glassmorphism effects",
                "Combine opacity with colors for overlay effects",
                "Use rounded-2xl and overflow-hidden for polished corners"
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
            case 0: // Complex layouts
                const hasFlex = /flex["\s]/i.test(userClean);
                const hasGrid = /grid/i.test(userClean);
                const hasSidebar = /w-[0-9]/i.test(userClean);
                correct = hasFlex && (hasGrid || hasSidebar);
                break;

            case 1: // Animations
                const hasAnimation = /animate-/i.test(userClean);
                const hasAnimClass = /animate-spin|animate-bounce|animate-pulse/i.test(userClean);
                correct = hasAnimation || hasAnimClass;
                break;

            case 2: // Responsive
                const hasResponsiveGrid = /grid-cols/i.test(userClean);
                const hasBreakpoint = /sm:|md:|lg:|xl:/i.test(userClean);
                correct = hasResponsiveGrid && hasBreakpoint;
                break;

            case 3: // Advanced styling
                const hasOverlay = /absolute|relative|inset/i.test(userClean);
                const hasBackdrop = /backdrop-blur|bg-black|opacity/i.test(userClean);
                correct = hasOverlay && hasBackdrop;
                break;
        }

        if (correct) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
            setShowCongrats(true);
            
            // Save progress to Firebase
            if (currentUser?.uid) {
                completeExercise(currentUser.uid, 'tailwind', 'advanced', 10);
            }
            
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

    return (
        <div className="min-h-screen bg-white pt-16">
            {showCongrats && (
                <>
                    <Confetti duration={3000} />
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 pointer-events-none" />
                    <div className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none">
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-emerald-600 mb-4">🎉 Congratulations! 🎉</h1>
                            <p className="text-3xl text-gray-800">You've completed this exercise!</p>
                            {currentExercise < exercises.length - 1 && (
                                <p className="text-xl text-gray-600 mt-4">Moving to next exercise...</p>
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
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">Tailwind Advanced Exercises</h1>
                    
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
                                <div className="lg:col-span-3 bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                    <LiveHtmlEditor 
                                        initialCode={exercises[currentExercise].initialCode}
                                        onChange={setUserCode}
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
                                    className="text-emerald-600 hover:text-emerald-700 text-sm font-medium flex items-center gap-2"
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
