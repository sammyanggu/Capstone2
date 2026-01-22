import React, { useState, useEffect, useRef } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
// import CodeFeedback from '../../../../components/CodeFeedback';
import Confetti from '../../../../components/Confetti';
import { useAuth } from '../../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex, saveExerciseProgress, getExerciseProgress } from '../../../../utils/progressTracker';

export default function CssAdvanced() {
    const { currentUser } = useAuth();
    const [currentExercise, setCurrentExercise] = useState(0);
    const [exerciseStatus, setExerciseStatus] = useState({
        0: false,
        1: false,
        2: false,
        3: false
    });
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [showError, setShowError] = useState(false);
    const [showCongrats, setShowCongrats] = useState(false);
    const [userCode, setUserCode] = useState('');
    const [lockedExerciseIndex, setLockedExerciseIndex] = useState(null);
    const isInitialLoadRef = useRef(true);
    
    // Load current exercise index from Firebase
    useEffect(() => {
        const loadExerciseIndex = async () => {
            if (currentUser?.uid) {
                try {
                    // Load completion status for each exercise
                    const newStatus = { ...exerciseStatus };
                    for (let i = 0; i < 4; i++) {
                        const progress = await getExerciseProgress(currentUser.uid, 'css', `advanced-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);

                    
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'css', 'advanced');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);

                    } else {
                        setCurrentExercise(0);
                    }
                } catch (err) {

                } finally {
                    isInitialLoadRef.current = false;
                }
            }
        };

        loadExerciseIndex();
    }, [currentUser]);

    // Save current exercise index to Firebase whenever it changes
    useEffect(() => {
        const saveIndex = async () => {
            if (currentUser?.uid && !isInitialLoadRef.current) {
                try {
                    await saveCurrentExerciseIndex(currentUser.uid, 'css', 'advanced', currentExercise);
                } catch (err) {

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
            title: "CSS Animations",
            description: "Create a complex animation sequence",
            type: "coding",
            task: "Create a loading spinner animation that transitions through multiple colors and rotates continuously.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            /* Add animation properties */
        }
        
        /* Add keyframes animation */
        
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .spinner {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 4px solid transparent;
            border-top-color: #ff4081;
            animation: spin 1s linear infinite,
                       colorChange 3s linear infinite;
        }
        
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        @keyframes colorChange {
            0% { border-top-color: #ff4081; }
            33% { border-top-color: #3f51b5; }
            66% { border-top-color: #4caf50; }
            100% { border-top-color: #ff4081; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
    </div>
</body>
</html>`,
            hints: [
                "Use @keyframes for custom animations",
                "Combine multiple animations with comma separation",
                "Use transform: rotate for spinning effect"
            ]
        },
        {
            title: "CSS Custom Properties",
            type: "coding",
            description: "Create a theme switcher using CSS variables",
            task: "Create a light/dark theme switcher using CSS custom properties (variables). The theme should affect background, text color, and accent colors.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add root variables */
        
        body {
            margin: 0;
            min-height: 100vh;
            /* Use CSS variables */
        }
        
        .card {
            padding: 2rem;
            border-radius: 8px;
            margin: 2rem;
            /* Use CSS variables */
        }
        
        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            /* Use CSS variables */
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Theme Switcher</h2>
        <p>This content should change with the theme.</p>
        <button onclick="toggleTheme()">Toggle Theme</button>
    </div>

    <script>
        function toggleTheme() {
            document.documentElement.classList.toggle('dark-theme');
        }
    </script>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        :root {
            --bg-color: #ffffff;
            --text-color: #333333;
            --card-bg: #f0f0f0;
            --accent-color: #ff4081;
        }
        
        .dark-theme {
            --bg-color: #1a1a1a;
            --text-color: #ffffff;
            --card-bg: #333333;
            --accent-color: #ff79b0;
        }
        
        body {
            margin: 0;
            min-height: 100vh;
            background-color: var(--bg-color);
            color: var(--text-color);
            transition: all 0.3s ease;
        }
        
        .card {
            padding: 2rem;
            border-radius: 8px;
            margin: 2rem;
            background-color: var(--card-bg);
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        button {
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: var(--accent-color);
            color: white;
            transition: all 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="card">
        <h2>Theme Switcher</h2>
        <p>This content should change with the theme.</p>
        <button onclick="toggleTheme()">Toggle Theme</button>
    </div>

    <script>
        function toggleTheme() {
            document.documentElement.classList.toggle('dark-theme');
        }
    </script>
</body>
</html>`,
            hints: [
                "Define variables in :root selector",
                "Use var(--variable-name) to use variables",
                "Create a dark-theme class to override variables"
            ]
        },
        {
            title: "CSS Grid Areas",
            type: "coding",
            description: "Create a complex layout using CSS Grid areas",
            task: "Create a responsive dashboard layout with header, sidebar, main content, and footer using CSS Grid areas. Layout should stack on mobile.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
        }
        
        .dashboard {
            min-height: 100vh;
            /* Add grid properties */
        }
        
        /* Style grid areas */
        
        /* Add media query for mobile */
        
    </style>
</head>
<body>
    <div class="dashboard">
        <header>Dashboard Header</header>
        <nav class="sidebar">Sidebar Navigation</nav>
        <main>Main Content Area</main>
        <footer>Dashboard Footer</footer>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            min-height: 100vh;
        }
        
        .dashboard {
            min-height: 100vh;
            display: grid;
            grid-template-areas:
                "header header"
                "sidebar main"
                "footer footer";
            grid-template-columns: 250px 1fr;
            grid-template-rows: auto 1fr auto;
        }
        
        header {
            grid-area: header;
            background: #333;
            color: white;
            padding: 1rem;
        }
        
        .sidebar {
            grid-area: sidebar;
            background: #f0f0f0;
            padding: 1rem;
            border-right: 1px solid #ddd;
        }
        
        main {
            grid-area: main;
            padding: 1rem;
        }
        
        footer {
            grid-area: footer;
            background: #333;
            color: white;
            padding: 1rem;
            text-align: center;
        }
        
        @media (max-width: 768px) {
            .dashboard {
                grid-template-areas:
                    "header"
                    "sidebar"
                    "main"
                    "footer";
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <header>Dashboard Header</header>
        <nav class="sidebar">Sidebar Navigation</nav>
        <main>Main Content Area</main>
        <footer>Dashboard Footer</footer>
    </div>
</body>
</html>`,
            hints: [
                "Use grid-template-areas for layout",
                "Define areas with grid-area property",
                "Use different template areas for mobile"
            ]
        },
        {
            title: "CSS Clip-path and Shapes",
            type: "coding",
            description: "Create complex shapes using CSS",
            task: "Create an interactive button with a creative shape using clip-path and transform on hover.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .button {
            padding: 1.5rem 3rem;
            font-size: 1.2rem;
            border: none;
            color: white;
            cursor: pointer;
            /* Add shape and animation properties */
        }
    </style>
</head>
<body>
    <div class="container">
        <button class="button">Hover Me</button>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #1a1a1a;
        }
        
        .button {
            padding: 1.5rem 3rem;
            font-size: 1.2rem;
            border: none;
            color: white;
            cursor: pointer;
            background: linear-gradient(45deg, #ff4081, #3f51b5);
            clip-path: polygon(
                10% 0%,
                90% 0%,
                100% 50%,
                90% 100%,
                10% 100%,
                0% 50%
            );
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: scale(1.1) rotate(-2deg);
            clip-path: polygon(
                0% 0%,
                100% 0%,
                90% 100%,
                10% 100%
            );
            background: linear-gradient(45deg, #3f51b5, #ff4081);
        }
    </style>
</head>
<body>
    <div class="container">
        <button class="button">Hover Me</button>
    </div>
</body>
</html>`,
            hints: [
                "Use clip-path with polygon() for custom shapes",
                "Combine transform properties for hover effects",
                "Use transitions for smooth shape changes"
            ]
        }
    ];

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
            case 0: // CSS Animations
                const hasKeyframes = /@keyframes\s+(spin|colorchange)/.test(userClean);
                const hasAnimation = /animation\s*:/.test(userClean);
                const hasRotate = /rotate\s*\(\s*360deg\s*\)/.test(userClean);
                const hasColorTransition = /border-(top-)?color/.test(userClean);
                correct = hasKeyframes && hasAnimation && hasRotate && hasColorTransition;
                break;

            case 1: // CSS Custom Properties
                const hasRootVariables = /:root\s*{[^}]*--/.test(userClean);
                const hasDarkTheme = /\.dark-theme\s*{[^}]*--/.test(userClean);
                const usesVarFunction = /var\s*\(\s*--/.test(userClean);
                const hasTransition = /transition/.test(userClean);
                correct = hasRootVariables && hasDarkTheme && usesVarFunction && hasTransition;
                break;

            case 2: // CSS Grid Areas
                const hasGridTemplate = /grid-template-areas/.test(userClean);
                const hasNamedAreas = /grid-area\s*:\s*(header|sidebar|main|footer)/.test(userClean);
                const hasMediaQuery = /@media/.test(userClean);
                const hasMobileLayout = /grid-template-columns\s*:\s*1fr/.test(userClean);
                correct = hasGridTemplate && hasNamedAreas && hasMediaQuery && hasMobileLayout;
                break;

            case 3: // Clip-path and Shapes
                const hasClipPath = /clip-path\s*:\s*polygon/.test(userClean);
                const hasTransform = /transform\s*:\s*scale/.test(userClean);
                const hasHoverEffect = /:hover/.test(userClean);
                const hasGradient = /linear-gradient/.test(userClean);
                correct = hasClipPath && hasTransform && hasHoverEffect && hasGradient;
                break;
        }

        if (correct) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
            setShowCongrats(true);
            setTimeout(async () => {
                setShowCongrats(false);
                
                // Save exercise completion to Firebase with unique levelKey
                if (currentUser?.uid) {
                    try {
                        const levelKey = `advanced-${currentExercise}`;
                        await saveExerciseProgress(currentUser.uid, 'css', levelKey, userCode, true, 10);

                    } catch (err) {

                    }
                }
                
                if (currentExercise < exercises.length - 1) {
                    const nextIndex = currentExercise + 1;
                    setCurrentExercise(nextIndex);
                    
                    // Save the new index to Firebase
                    if (currentUser?.uid) {
                        try {
                            await saveCurrentExerciseIndex(currentUser.uid, 'css', 'advanced', nextIndex);

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
            )}

            {/* Exercise Locked Modal */}
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
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">CSS Advanced Exercises</h1>
                    
                    {/* Exercise Navigation */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                        {exercises.map((ex, index) => (
                            <button
                                key={index}
                                className={`px-3 py-1.5 rounded-lg text-sm ${
                                    !canAccessExercise(index)
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : currentExercise === index
                                        ? 'bg-emerald-500 text-white hover:bg-emerald-600'
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
                    <div className="bg-white rounded-lg p-4 mb-4">
                        <h2 className="text-lg font-bold text-emerald-600 mb-1">{exercises[currentExercise].title}</h2>
                        <p className="text-gray-700 mb-3 text-sm">{exercises[currentExercise].description}</p>
                        
                        <div>
                            <div className="bg-white rounded p-4 mb-4 border border-gray-300">
                                <h3 className="text-lg font-semibold text-emerald-600 mb-2">Your Task:</h3>
                                <p className="text-gray-700">{exercises[currentExercise].task}</p>
                            </div>
                            
                            {/* Hints */}
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
                            
                            {/* Code Editor */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2 bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
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
                                        onChange={setUserCode}
                                    />
                                </div>
                            </div>

                            {/* AI Feedback */}
                            <div className="mt-4">
                                {/* Hardcoded Feedback Logic */}
                                <div className="bg-slate-50 border border-slate-200 rounded p-4">
                                    <h4 className="font-bold mb-2 text-emerald-700">Feedback</h4>
                                    {userCode.trim() === '' ? (
                                        <p className="text-gray-500 text-sm">Type your CSS code to get feedback.</p>
                                    ) : (
                                        (() => {
                                            const codeHasSelector = userCode.includes('body') || userCode.includes('.container');
                                            const codeHasColor = userCode.includes('color:') || userCode.includes('background-color:');
                                            if (codeHasSelector && codeHasColor) {
                                                return <p className="text-green-700 text-sm">Great! Your CSS includes a selector and a color property.</p>;
                                            } else if (!codeHasSelector && !codeHasColor) {
                                                return <p className="text-red-700 text-sm">Your code is missing both a selector (e.g., <code>body</code> or <code>.container</code>) and a color property (e.g., <code>color:</code> or <code>background-color:</code>).</p>;
                                            } else if (!codeHasSelector) {
                                                return <p className="text-red-700 text-sm">Your code is missing a CSS selector (e.g., <code>body</code> or <code>.container</code>).</p>;
                                            } else {
                                                return <p className="text-red-700 text-sm">Your code is missing a color property (e.g., <code>color:</code> or <code>background-color:</code>).</p>;
                                            }
                                        })()
                                    )}
                                </div>
                            </div>

                            {/* Submit and Solution Buttons */}
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
                                <div className="mt-4 bg-red-900/30 border border-red-700/50 text-red-200 px-4 py-3 rounded animate-shake">
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


