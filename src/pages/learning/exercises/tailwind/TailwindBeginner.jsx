import React, { useState, useEffect, useRef } from 'react';
import LiveHtmlEditor from '../../../../components/LiveHtmlEditor';
import { useAuth } from '../../../../AuthContext';
import { saveCurrentExerciseIndex, getCurrentExerciseIndex, saveExerciseProgress, getExerciseProgress } from '../../../../utils/progressTracker';
import Confetti from '../../../../components/Confetti';

export default function TailwindBeginner() {
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
                        const progress = await getExerciseProgress(currentUser.uid, 'tailwind', `beginner-${i}`);
                        if (progress && progress.isCompleted) {
                            newStatus[i] = true;
                        }
                    }
                    setExerciseStatus(newStatus);
                    console.log('Loaded Tailwind beginner exercise statuses:', newStatus);
                    
                    const savedIndex = await getCurrentExerciseIndex(currentUser.uid, 'tailwind', 'beginner');
                    if (savedIndex !== null && savedIndex !== undefined) {
                        setCurrentExercise(savedIndex);
                    } else {
                        setCurrentExercise(0);
                    }
                } catch (err) {
                    console.error('Error loading Tailwind beginner exercise index:', err);
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
                    await saveCurrentExerciseIndex(currentUser.uid, 'tailwind', 'beginner', currentExercise);
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
            title: "Tailwind Flexbox Layout",
            description: "Learn Tailwind's flexbox utilities for creating layouts",
            task: "Create a responsive flex layout with 3 boxes that are displayed in a row on desktop and stack vertically on mobile.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Flexbox</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="p-8">
        <h1 class="text-3xl font-bold mb-8 text-gray-800">Flexbox Layout</h1>
        <!-- Add your flexbox layout here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Flexbox</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <div class="p-8">
        <h1 class="text-3xl font-bold mb-8 text-gray-800">Flexbox Layout</h1>
        <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1 bg-blue-500 p-6 rounded-lg text-white">
                <h2 class="text-xl font-bold mb-2">Box 1</h2>
                <p>This is the first box in the flex layout.</p>
            </div>
            <div class="flex-1 bg-green-500 p-6 rounded-lg text-white">
                <h2 class="text-xl font-bold mb-2">Box 2</h2>
                <p>This is the second box in the flex layout.</p>
            </div>
            <div class="flex-1 bg-purple-500 p-6 rounded-lg text-white">
                <h2 class="text-xl font-bold mb-2">Box 3</h2>
                <p>This is the third box in the flex layout.</p>
            </div>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use flex class for flex container",
                "Use flex-col for vertical, md:flex-row for horizontal on medium screens",
                "Use gap-4 for spacing between items",
                "Use flex-1 to make items equal width"
            ]
        },
        {
            title: "Tailwind Card Component",
            description: "Create a card component using Tailwind utilities",
            task: "Build a card with an image, title, description, and a button using Tailwind classes.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Card</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <h1 class="text-3xl font-bold mb-8">Card Component</h1>
    <!-- Add your card here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Card</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 p-8">
    <h1 class="text-3xl font-bold mb-8">Card Component</h1>
    <div class="max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
        <img src="https://via.placeholder.com/400x200" alt="Card Image" class="w-full h-48 object-cover">
        <div class="p-6">
            <h2 class="text-xl font-bold mb-2 text-gray-800">Product Title</h2>
            <p class="text-gray-600 mb-4">This is a description of the product or service.</p>
            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Learn More
            </button>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use rounded-lg for border radius",
                "Use shadow-lg for shadow effect",
                "Use overflow-hidden to clip image corners",
                "Use hover: prefix for hover states"
            ]
        },
        {
            title: "Tailwind Typography",
            description: "Master Tailwind's typography and text styling utilities",
            task: "Create a styled text section with heading, paragraph, and emphasis using Tailwind font, size, weight, and color utilities.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Typography</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white p-8">
    <div class="max-w-2xl">
        <!-- Add your typography here -->
    </div>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Typography</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white p-8">
    <div class="max-w-2xl">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Main Heading</h1>
        <p class="text-lg text-gray-700 mb-4">
            This is a paragraph with some <span class="font-bold text-blue-600">bold and colored text</span> to demonstrate typography.
        </p>
        <h2 class="text-2xl font-semibold text-gray-800 mb-2">Subheading</h2>
        <p class="text-gray-600 mb-4">Additional content with different text styles and colors.</p>
        <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-600">
            "This is an important quote that should stand out from regular text."
        </blockquote>
    </div>
</body>
</html>`,
            hints: [
                "Use text-4xl, text-2xl for different heading sizes",
                "Use font-bold, font-semibold for font weights",
                "Use text-gray-900, text-blue-600 for colors",
                "Use italic for emphasis"
            ]
        },
        {
            title: "Tailwind Grid Layout",
            description: "Create responsive grids using Tailwind's grid system",
            task: "Build a 3-column grid that becomes 2-column on tablets and 1-column on mobile devices.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Grid</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-8">Grid Layout</h1>
    <!-- Add your grid here -->
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tailwind Grid</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 p-8">
    <h1 class="text-3xl font-bold mb-8">Grid Layout</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-2">Item 1</h3>
            <p class="text-gray-600">First grid item</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-2">Item 2</h3>
            <p class="text-gray-600">Second grid item</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-2">Item 3</h3>
            <p class="text-gray-600">Third grid item</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-2">Item 4</h3>
            <p class="text-gray-600">Fourth grid item</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-2">Item 5</h3>
            <p class="text-gray-600">Fifth grid item</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-2">Item 6</h3>
            <p class="text-gray-600">Sixth grid item</p>
        </div>
    </div>
</body>
</html>`,
            hints: [
                "Use grid class for grid container",
                "Use grid-cols-1, md:grid-cols-2, lg:grid-cols-3 for responsive columns",
                "Use gap-6 for spacing between grid items",
                "Mobile-first approach: start with mobile layout"
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
            case 0: // Flexbox
                const hasFlex = /flex["\s]/i.test(userClean);
                const hasFlexCol = /flex-col/i.test(userClean);
                const hasGap = /gap-/i.test(userClean);
                correct = hasFlex && hasFlexCol && hasGap;
                break;

            case 1: // Card
                const hasRounded = /rounded-lg/i.test(userClean);
                const hasShadow = /shadow-lg/i.test(userClean);
                const hasButton = /<button[^>]*>/i.test(userClean);
                correct = hasRounded && hasShadow && hasButton;
                break;

            case 2: // Typography
                const hasText4xl = /text-4xl|text-3xl|text-2xl/i.test(userClean);
                const hasFontBold = /font-bold|font-semibold/i.test(userClean);
                const hasTextColor = /text-gray|text-blue/i.test(userClean);
                correct = hasText4xl && hasFontBold && hasTextColor;
                break;

            case 3: // Grid
                const hasGrid = /grid["\s]/i.test(userClean);
                const hasGridCols = /grid-cols-/i.test(userClean);
                const hasResponsive = /md:|lg:/i.test(userClean);
                correct = hasGrid && hasGridCols && hasResponsive;
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
                        const levelKey = `beginner-${currentExercise}`;
                        await saveExerciseProgress(currentUser.uid, 'tailwind', levelKey, userCode, true, 10);
                        console.log(`✅ Saved Tailwind exercise ${levelKey} completion`);
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
                            await saveCurrentExerciseIndex(currentUser.uid, 'tailwind', 'beginner', nextIndex);
                            console.log(`✅ Saved Tailwind beginner index: ${nextIndex}`);
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
                        <div className="text-center">
                            <h1 className="text-6xl font-bold text-emerald-600 mb-4">🎉 Congratulations! 🎉</h1>
                            <p className="text-3xl text-white">You've completed this exercise!</p>
                            {currentExercise < exercises.length - 1 && (
                                <p className="text-xl text-white mt-4">Moving to next exercise...</p>
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
                            <p className="text-gray-700 mb-4">This exercise has already been completed!</p>
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
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">Tailwind Beginner Exercises</h1>
                    
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
