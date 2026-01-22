import React, { useState, useEffect, useRef } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
// import CodeFeedback from '../../../../components/CodeFeedback';
import Confetti from '../../../../components/Confetti';
import { useAuth } from '../../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex, saveExerciseProgress, getExerciseProgress } from '../../../../utils/progressTracker';

export default function CssIntermediate() {
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
                        const progress = await getExerciseProgress(currentUser.uid, 'css', `intermediate-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);

                    
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'css', 'intermediate');
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
                    await saveCurrentExerciseIndex(currentUser.uid, 'css', 'intermediate', currentExercise);
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
            title: "Flexbox Layout",
            description: "Create a flexible navigation menu using flexbox",
            type: "coding",
            task: "Create a horizontal navigation menu with 4 items using flexbox. The items should be evenly spaced and centered vertically.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add your CSS here */
        nav {
            background-color: #333;
            padding: 1rem;
        }
        
        .menu {
            /* Add flexbox properties */
        }
        
        .menu-item {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
        }
    </style>
</head>
<body>
    <nav>
        <div class="menu">
            <a href="#" class="menu-item">Home</a>
            <a href="#" class="menu-item">About</a>
            <a href="#" class="menu-item">Services</a>
            <a href="#" class="menu-item">Contact</a>
        </div>
    </nav>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        nav {
            background-color: #333;
            padding: 1rem;
        }
        
        .menu {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .menu-item {
            color: white;
            text-decoration: none;
            padding: 0.5rem 1rem;
        }
    </style>
</head>
<body>
    <nav>
        <div class="menu">
            <a href="#" class="menu-item">Home</a>
            <a href="#" class="menu-item">About</a>
            <a href="#" class="menu-item">Services</a>
            <a href="#" class="menu-item">Contact</a>
        </div>
    </nav>
</body>
</html>`,
            hints: [
                "Use display: flex on the container",
                "Use justify-content for horizontal spacing",
                "Use align-items for vertical alignment"
            ]
        },
        {
            title: "CSS Positioning",
            type: "coding",
            description: "Learn to position elements with CSS",
            task: "Create a fixed header at the top and position a 'back to top' button in the bottom right corner.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            min-height: 200vh;
            padding-top: 60px;
        }
        
        header {
            /* Position the header */
            background-color: #333;
            color: white;
            padding: 1rem;
        }
        
        .back-to-top {
            /* Position the button */
            background-color: #ff4081;
            color: white;
            padding: 1rem;
            border-radius: 50%;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <header>
        <h1>Fixed Header</h1>
    </header>
    
    <a href="#" class="back-to-top">↑</a>
    
    <div style="padding: 2rem;">
        <h2>Scroll down...</h2>
        <p>Content goes here...</p>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            min-height: 200vh;
            padding-top: 60px;
        }
        
        header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background-color: #333;
            color: white;
            padding: 1rem;
            z-index: 100;
        }
        
        .back-to-top {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #ff4081;
            color: white;
            padding: 1rem;
            border-radius: 50%;
            text-decoration: none;
            z-index: 99;
        }
    </style>
</head>
<body>
    <header>
        <h1>Fixed Header</h1>
    </header>
    
    <a href="#" class="back-to-top">↑</a>
    
    <div style="padding: 2rem;">
        <h2>Scroll down...</h2>
        <p>Content goes here...</p>
    </div>
</body>
</html>`,
            hints: [
                "Use position: fixed for elements that should stay in place",
                "Set top, right, bottom, or left for positioning",
                "Don't forget to use z-index for stacking order"
            ]
        },
        {
            title: "CSS Grid Layout",
            type: "coding",
            description: "Create a responsive grid layout",
            task: "Create a 2x2 grid of cards with equal spacing. Cards should stack on mobile (below 600px).",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .grid-container {
            /* Add grid properties */
            max-width: 800px;
            margin: 0 auto;
            padding: 1rem;
        }
        
        .card {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        /* Add media query for mobile */
        
    </style>
</head>
<body style="background-color: #f0f0f0;">
    <div class="grid-container">
        <div class="card">
            <h3>Card 1</h3>
            <p>Content here...</p>
        </div>
        <div class="card">
            <h3>Card 2</h3>
            <p>Content here...</p>
        </div>
        <div class="card">
            <h3>Card 3</h3>
            <p>Content here...</p>
        </div>
        <div class="card">
            <h3>Card 4</h3>
            <p>Content here...</p>
        </div>
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        .grid-container {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
            max-width: 800px;
            margin: 0 auto;
            padding: 1rem;
        }
        
        .card {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        @media (max-width: 600px) {
            .grid-container {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body style="background-color: #f0f0f0;">
    <div class="grid-container">
        <div class="card">
            <h3>Card 1</h3>
            <p>Content here...</p>
        </div>
        <div class="card">
            <h3>Card 2</h3>
            <p>Content here...</p>
        </div>
        <div class="card">
            <h3>Card 3</h3>
            <p>Content here...</p>
        </div>
        <div class="card">
            <h3>Card 4</h3>
            <p>Content here...</p>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use display: grid on the container",
                "Use grid-template-columns for the layout",
                "Use gap for spacing between items",
                "Use media queries for responsiveness"
            ]
        },
        {
            title: "CSS Transitions and Transforms",
            type: "coding",
            description: "Add smooth transitions and transforms to elements",
            task: "Create a card that scales up and changes color smoothly on hover.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background-color: #f0f0f0;
        }
        
        .card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            /* Add transition and transform properties */
        }
        
        /* Add hover styles */
        
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>Hover Me!</h2>
            <p>This card should animate on hover.</p>
        </div>
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
            background-color: #f0f0f0;
        }
        
        .card {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .card:hover {
            transform: scale(1.05);
            background-color: #ff4081;
            color: white;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>Hover Me!</h2>
            <p>This card should animate on hover.</p>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use transition property for smooth animations",
                "Use transform: scale() for size changes",
                "Combine multiple properties in the transition"
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
            case 0: // Flexbox Layout
                const hasFlexbox = /display\s*:\s*flex/.test(userClean);
                const hasJustifyContent = /justify-content\s*:\s*(space-between|space-around|space-evenly)/.test(userClean);
                const hasAlignItems = /align-items\s*:\s*center/.test(userClean);
                correct = hasFlexbox && hasJustifyContent && hasAlignItems;
                break;

            case 1: // CSS Positioning
                const hasFixedHeader = /header\s*{[^}]*position\s*:\s*fixed[^}]*}/.test(userClean);
                const hasHeaderPositioning = /header\s*{[^}]*(top\s*:\s*0)[^}]*}/.test(userClean);
                const hasFixedButton = /back-to-top\s*{[^}]*position\s*:\s*fixed[^}]*}/.test(userClean);
                const hasButtonPositioning = /back-to-top\s*{[^}]*(bottom|right)\s*:\s*\d+/.test(userClean);
                correct = hasFixedHeader && hasHeaderPositioning && hasFixedButton && hasButtonPositioning;
                break;

            case 2: // CSS Grid Layout
                const hasGrid = /display\s*:\s*grid/.test(userClean);
                const hasGridColumns = /grid-template-columns\s*:\s*repeat\s*\(\s*2\s*,\s*1fr\s*\)/.test(userClean);
                const hasMediaQuery = /@media\s*\(\s*max-width\s*:\s*600px\s*\)/.test(userClean);
                const hasMobileLayout = /grid-template-columns\s*:\s*1fr/.test(userClean);
                correct = hasGrid && hasGridColumns && hasMediaQuery && hasMobileLayout;
                break;

            case 3: // Transitions and Transforms
                const hasTransition = /transition\s*:\s*all/.test(userClean);
                const hasTransform = /transform\s*:\s*scale/.test(userClean);
                const hasHoverStyles = /:hover\s*{[^}]*}/.test(userClean);
                const hasColorChange = /:hover\s*{[^}]*background-color/.test(userClean);
                correct = hasTransition && hasTransform && hasHoverStyles && hasColorChange;
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
                        const levelKey = `intermediate-${currentExercise}`;
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
                            await saveCurrentExerciseIndex(currentUser.uid, 'css', 'intermediate', nextIndex);

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
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">CSS Intermediate Exercises</h1>
                    
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


