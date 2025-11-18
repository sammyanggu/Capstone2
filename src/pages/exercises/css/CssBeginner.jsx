import React, { useState, useEffect } from 'react';
import LiveHtmlEditor from '../../../components/LiveHtmlEditor';

export default function CssBeginner() {
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
    
    useEffect(() => {
        const savedStatus = localStorage.getItem('cssBeginnerStatus');
        if (savedStatus) {
            setExerciseStatus(JSON.parse(savedStatus));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cssBeginnerStatus', JSON.stringify(exerciseStatus));
    }, [exerciseStatus]);

    const exercises = [
        {
            title: "Basic CSS Syntax",
            description: "Learn how to write basic CSS rules",
            type: "coding",
            task: "Style the heading with red color and the paragraph with blue color.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <h1>Welcome to CSS</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            color: red;
        }
        p {
            color: blue;
        }
    </style>
</head>
<body>
    <h1>Welcome to CSS</h1>
    <p>This is a paragraph.</p>
</body>
</html>`,
            hints: [
                "Use h1 selector for the heading",
                "Use p selector for the paragraph",
                "The color property sets text color"
            ]
        },
        {
            title: "Font Properties",
            type: "coding",
            description: "Learn to style text with font properties",
            task: "Style the heading with font-size: 24px and font-family: Arial, and make the paragraph text bold.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <h1>Styling Fonts</h1>
    <p>This text should be bold.</p>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            font-size: 24px;
            font-family: Arial, sans-serif;
        }
        p {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Styling Fonts</h1>
    <p>This text should be bold.</p>
</body>
</html>`,
            hints: [
                "Use font-size to change text size",
                "Use font-family to change the font",
                "Use font-weight: bold for bold text"
            ]
        },
        {
            title: "Margin and Padding",
            type: "coding",
            description: "Understanding box model basics",
            task: "Add 20px padding to the heading and 10px margin to all sides of the paragraph.",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <h1>Box Model</h1>
    <p>This paragraph needs margin.</p>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            padding: 20px;
        }
        p {
            margin: 10px;
        }
    </style>
</head>
<body>
    <h1>Box Model</h1>
    <p>This paragraph needs margin.</p>
</body>
</html>`,
            hints: [
                "Use padding property for inner spacing",
                "Use margin property for outer spacing",
                "You can use shorthand for all sides"
            ]
        },
        {
            title: "Basic Colors and Backgrounds",
            type: "coding",
            description: "Working with colors and backgrounds",
            task: "Give the heading a yellow background and the paragraph a light gray background (use #f0f0f0).",
            initialCode: `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Add your CSS here */
        
    </style>
</head>
<body>
    <h1>Colors and Backgrounds</h1>
    <p>This needs a light gray background.</p>
</body>
</html>`,
            solution: `<!DOCTYPE html>
<html>
<head>
    <style>
        h1 {
            background-color: yellow;
        }
        p {
            background-color: #f0f0f0;
        }
    </style>
</head>
<body>
    <h1>Colors and Backgrounds</h1>
    <p>This needs a light gray background.</p>
</body>
</html>`,
            hints: [
                "Use background-color property",
                "Colors can be named (like 'yellow')",
                "Or use hex codes (like '#f0f0f0')"
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
            case 0: // Basic CSS Syntax
                const hasRedHeading = /h1\s*{\s*color\s*:\s*red\s*;?\s*}/i.test(userClean);
                const hasBlueParagraph = /p\s*{\s*color\s*:\s*blue\s*;?\s*}/i.test(userClean);
                correct = hasRedHeading && hasBlueParagraph;
                break;

            case 1: // Font Properties
                const hasHeadingFont = /h1\s*{[^}]*font-size\s*:\s*24px[^}]*}/i.test(userClean) &&
                                     /h1\s*{[^}]*font-family\s*:\s*arial/i.test(userClean);
                const hasBoldParagraph = /p\s*{[^}]*font-weight\s*:\s*bold[^}]*}/i.test(userClean);
                correct = hasHeadingFont && hasBoldParagraph;
                break;

            case 2: // Margin and Padding
                const hasHeadingPadding = /h1\s*{[^}]*padding\s*:\s*20px[^}]*}/i.test(userClean);
                const hasParagraphMargin = /p\s*{[^}]*margin\s*:\s*10px[^}]*}/i.test(userClean);
                correct = hasHeadingPadding && hasParagraphMargin;
                break;

            case 3: // Colors and Backgrounds
                const hasYellowBackground = /h1\s*{[^}]*background-color\s*:\s*yellow[^}]*}/i.test(userClean);
                const hasGrayBackground = /p\s*{[^}]*background-color\s*:\s*#f0f0f0[^}]*}/i.test(userClean);
                correct = hasYellowBackground && hasGrayBackground;
                break;
        }

        if (correct) {
            setExerciseStatus(prev => ({...prev, [currentExercise]: true}));
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
                    <h1 className="text-xl font-bold text-emerald-600 mb-3">CSS Beginner Exercises</h1>
                    
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
                        <h2 className="text-lg font-bold text-emerald-400 mb-1">{exercises[currentExercise].title}</h2>
                        <p className="text-slate-300 mb-3 text-sm">{exercises[currentExercise].description}</p>
                        
                        <div>
                            <div className="bg-slate-800/50 rounded p-4 mb-4 border border-slate-700/50">
                                <h3 className="text-lg font-semibold text-emerald-300 mb-2">Your Task:</h3>
                                <p className="text-slate-300">{exercises[currentExercise].task}</p>
                            </div>
                            
                            {/* Hints */}
                            <div className="mb-4">
                                <button 
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
                                    onClick={() => document.getElementById('hints').classList.toggle('hidden')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    Show Hints
                                </button>
                                <div id="hints" className="hidden mt-2 bg-slate-800/50 rounded p-4 border border-slate-700/50">
                                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                                        {exercises[currentExercise].hints?.map((hint, index) => (
                                            <li key={index} className="text-sm">{hint}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            
                            {/* Code Editor */}
                            <div className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden">
                                <LiveHtmlEditor 
                                    initialCode={exercises[currentExercise].initialCode}
                                    onChange={setUserCode}
                                />
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
                                    className="text-emerald-400 hover:text-emerald-300 text-sm font-medium flex items-center gap-2"
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

                            <div id="solution" className="hidden mt-4 bg-slate-800/50 rounded p-4 border border-slate-700/50">
                                <pre className="text-slate-300 text-sm">
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
